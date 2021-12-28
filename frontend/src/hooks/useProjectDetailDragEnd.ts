import { Dispatch, SetStateAction, useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { DropResult } from 'react-beautiful-dnd'
import { assertStatusParam } from 'types/status'
import { List } from 'types/list'
import { DROP_TYPE } from 'consts/dropType'
import {
  useUpdateTaskSortMutation,
  useUpdateListSortMutation,
  useEndTaskSubscription,
} from 'pages/projectDetail//projectDetail.gen'
import { useSetWeaponJson } from 'hooks/useSetWeaponJson'
import { useCompleteAnimation } from 'hooks/useCompleteAnimation'
import { useGetCurrentUserData } from 'hooks/useGetCurrentUserData'
import { useHandleProjectCloseConfirmModal } from 'hooks/useHandleProjectCloseConfirmModal'
import { reorderList, getRefreshedListsVertical } from 'utils/controlList'
import { moveTask, adjustTasksInfoToUpdate } from 'utils/controlTask'
import toast from 'utils/toast/toast'
import logger from 'utils/debugger/logger'
import { useAuthContext } from 'providers/AuthProvider'

type UseProjectDetailDragEndArg = {
  lists: List[]
  setLists: Dispatch<SetStateAction<List[]>>
  setWeapon: ReturnType<typeof useSetWeaponJson>['setWeapon']
  setIsCompleted: ReturnType<typeof useCompleteAnimation>['setIsCompleted']
  firebaseCurrentUser: ReturnType<typeof useGetCurrentUserData>['firebaseCurrentUser']
}

type UseProjectDetailDragEndReturn = {
  onDragEnd: (result: DropResult) => Promise<void>
  shouldOpenProjectCloseModal: boolean
} & Pick<
  ReturnType<typeof useHandleProjectCloseConfirmModal>,
  'onClickCancelBtn' | 'onClickProjectCloseBtn'
>

type UseProjectDetailDragEnd = (arg: UseProjectDetailDragEndArg) => UseProjectDetailDragEndReturn

type HandleDroppedColumnList = (args: {
  destinationIndex: number
  sourceIndex: number
  listsCopy: List[]
}) => Promise<void>

/** タスク一覧画面で、リスト/タスクをドラッグ&ドロップで移動した際の処理 */
export const useProjectDetailDragEnd: UseProjectDetailDragEnd = ({
  lists,
  setLists,
  setWeapon,
  setIsCompleted,
  firebaseCurrentUser,
}) => {
  const { id: projectId } = useParams()
  const { currentUser } = useAuthContext()
  const [dropResult, setDropResult] = useState<DropResult | null>(null)
  const {
    shouldOpenProjectCloseModal,
    onClickProjectCloseBtn,
    onClickCancelBtn,
    handleProjectCloseConfirmModalPromise,
    hasClickedProjectCloseBtn,
    hasClickedCancelBtn,
  } = useHandleProjectCloseConfirmModal()
  const { data } = useEndTaskSubscription({
    variables: {
      project_id: String(projectId),
      user_id: String(currentUser?.uid),
    },
  })
  const [updateTaskSort] = useUpdateTaskSortMutation({
    onCompleted(data) {
      logger.debug(data)
    },
    onError(err) {
      logger.debug(err)
      toast.error('タスクの移動に失敗しました')
    },
  })
  const [updateList] = useUpdateListSortMutation({
    onError(err) {
      toast.error('リスト更新に失敗しました')
    },
  })

  const handleDroppedColumnList: HandleDroppedColumnList = useCallback(
    async ({ destinationIndex, sourceIndex, listsCopy }) => {
      if (destinationIndex === 0) {
        toast.warning('未着手は固定されています')
        return
      }
      if (destinationIndex === lists.length - 1) {
        toast.warning('完了は固定されています')
        return
      }
      const result = reorderList(listsCopy, sourceIndex, destinationIndex)
      setLists(result)
      const updateListSort = result.map((list, index) => ({
        id: list.sort_id,
        task_list: index,
      }))

      await updateList({ variables: { listSort: updateListSort } })
    },
    [lists],
  )

  const onDragEnd = useCallback(
    async (result: DropResult) => {
      if (!result.destination) return
      const { source, destination, type } = result
      const destinationDroppableId = Number(destination.droppableId)
      const sourceDroppableId = Number(source.droppableId)
      const destinationIndex = destination.index
      const sourceIndex = source.index
      if (destinationDroppableId === sourceDroppableId && destinationIndex === sourceIndex) return

      const listsCopy = [...lists]

      if (type === DROP_TYPE.COLUMN) {
        handleDroppedColumnList({ destinationIndex, sourceIndex, listsCopy })
        return
      }

      moveTask({
        listsCopy,
        sourceDroppableId,
        sourceIndex,
        destinationDroppableId,
        destinationIndex,
      })

      if (dropResult) {
        setDropResult(null)
        return
      }

      const sortedListsCopy = getRefreshedListsVertical(listsCopy)
      const tasksInfoToUpdate = adjustTasksInfoToUpdate(sortedListsCopy)
      const isAboutToMoveLastTaskToCompleted = tasksInfoToUpdate.every(task => task.completed_flg)

      if (isAboutToMoveLastTaskToCompleted) {
        setDropResult(result)
        const { hasAgreed } = await handleProjectCloseConfirmModalPromise()
        if (!hasAgreed) return
      }

      logger.table([...tasksInfoToUpdate])

      setLists([...listsCopy])
      await updateTaskSort({
        variables: {
          updateTasks: {
            tasks: tasksInfoToUpdate,
            project_id: String(projectId),
            user_id: firebaseCurrentUser?.uid ?? '',
          },
        },
      })
    },
    [lists, dropResult],
  )

  useEffect(() => {
    const revertDragEndResult = () => {
      if (!hasClickedCancelBtn.current || !dropResult) return
      const temp = dropResult.destination
      dropResult.destination = dropResult.source
      dropResult.source = temp ?? dropResult.source
      onDragEnd(dropResult)
      hasClickedCancelBtn.current = false
    }

    revertDragEndResult()
  }, [hasClickedCancelBtn.current])

  // これがないと完了したタスクでもアサインの更新ができてしまう
  useEffect(() => {
    if (!data) return

    const { is_completed, high_status_name } = data.endTask
    if (!is_completed) return
    if (assertStatusParam(high_status_name) && !hasClickedProjectCloseBtn.current) {
      setWeapon(high_status_name)
      setIsCompleted(true)
    }
  }, [data])

  return { onDragEnd, shouldOpenProjectCloseModal, onClickProjectCloseBtn, onClickCancelBtn }
}
