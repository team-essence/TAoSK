import { Dispatch, SetStateAction, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { DropResult } from 'react-beautiful-dnd'
import { assertStatusParam } from 'types/status'
import { List } from 'types/list'
import { DROP_TYPE } from 'consts/dropType'
import {
  useUpdateTaskSortMutation,
  useUpdateListSortMutation,
  useEndTaskSubScSubscription,
} from 'pages/projectDetail//projectDetail.gen'
import { useSetWeaponJson } from 'hooks/useSetWeaponJson'
import { useCompleteAnimation } from 'hooks/useCompleteAnimation'
import { useGetCurrentUserData } from 'hooks/useGetCurrentUserData'
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
}

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
  const { data } = useEndTaskSubScSubscription({
    variables: {
      project_id: String(projectId),
      user_id: String(currentUser?.uid),
    },
  })

  useEffect(() => {
    if (!data) return

    const { is_completed, high_status_name } = data.endTask
    if (!is_completed) return
    if (assertStatusParam(high_status_name)) {
      setWeapon(high_status_name)
      setIsCompleted(true)
    }
  }, [data])

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

  const handleDroppedColumnList: HandleDroppedColumnList = async ({
    destinationIndex,
    sourceIndex,
    listsCopy,
  }) => {
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
  }

  const onDragEnd = async (result: DropResult) => {
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

    const sortedListsCopy = getRefreshedListsVertical(listsCopy)
    const tasksInfoToUpdate = adjustTasksInfoToUpdate(sortedListsCopy)

    logger.table([...tasksInfoToUpdate])

    setLists(listsCopy)
    await updateTaskSort({
      variables: {
        updateTasks: {
          tasks: tasksInfoToUpdate,
          project_id: String(projectId),
          user_id: firebaseCurrentUser?.uid ?? '',
        },
      },
    })
  }

  return { onDragEnd }
}
