import { useMemo, useCallback, Dispatch, SetStateAction } from 'react'
import { useParams } from 'react-router-dom'
import { DropResult } from 'react-beautiful-dnd'
import { assertStatusParam } from 'types/status'
import { List } from 'types/list'
import { DROP_TYPE } from 'consts/dropType'
import {
  useUpdateTaskSortMutation,
  useUpdateListSortMutation,
} from 'pages/projectDetail//projectDetail.gen'
import { useSetWeaponJson } from 'hooks/useSetWeaponJson'
import { useCompleteAnimation } from 'hooks/useCompleteAnimation'
import { useGetCurrentUserData } from 'hooks/useGetCurrentUserData'
import { removeFromList, addToList, reorder } from 'utils/handleListOrder'
import toast from 'utils/toast/toast'
import logger from 'utils/debugger/logger'

type UseProjectDetailDragEndArg = {
  list: List[]
  setList: Dispatch<SetStateAction<List[]>>
  setWeapon: ReturnType<typeof useSetWeaponJson>['setWeapon']
  setIsCompleted: ReturnType<typeof useCompleteAnimation>['setIsCompleted']
  firebaseCurrentUser: ReturnType<typeof useGetCurrentUserData>['firebaseCurrentUser']
}

type UseProjectDetailDragEndReturn = {
  onDragEnd: (result: DropResult) => Promise<void>
}

type UseProjectDetailDragEnd = (arg: UseProjectDetailDragEndArg) => UseProjectDetailDragEndReturn

export const useProjectDetailDragEnd: UseProjectDetailDragEnd = ({
  list,
  setList,
  setWeapon,
  setIsCompleted,
  firebaseCurrentUser,
}) => {
  const { id: projectId } = useParams()
  const [updateTaskSort] = useUpdateTaskSortMutation({
    onCompleted(data) {
      logger.table(data.updateTaskSort)
      const { is_completed, high_status_name } = data.updateTaskSort
      if (!is_completed) return
      if (assertStatusParam(high_status_name)) {
        setWeapon(high_status_name)
        setIsCompleted(true)
      }
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

  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return
    const { source, destination, type } = result
    const destinationDroppableId = Number(destination.droppableId)
    const sourceDroppableId = Number(source.droppableId)
    const destinationIndex = destination.index
    const sourceIndex = source.index
    if (destinationDroppableId === sourceDroppableId && destinationIndex === sourceIndex) return

    const listCopy = [...list]

    if (type === DROP_TYPE.COLUMN) {
      if (destinationIndex === 0) {
        toast.warning('未着手は固定されています')
        return
      }
      if (destinationIndex === list.length - 1) {
        toast.warning('完了は固定されています')
        return
      }
      const result = reorder(listCopy, sourceIndex, destinationIndex)
      setList(result)
      const updateListSort = result.map((list, index) => {
        return {
          id: list.sort_id,
          task_list: index,
        }
      })
      await updateList({
        variables: {
          listSort: updateListSort,
        },
      })
      return
    }

    const [removedElement, newSourceList] = removeFromList(
      listCopy[sourceDroppableId].tasks,
      sourceIndex,
    )

    listCopy[sourceDroppableId].tasks = newSourceList

    const destinationTask = listCopy[destinationDroppableId].tasks
    listCopy[destinationDroppableId].tasks = addToList(
      destinationTask,
      destinationIndex,
      removedElement,
    )

    const sortListCopy = listCopy.map(list => {
      const sortList = list.tasks.map((task, index) => {
        task.vertical_sort = index
        return task
      })

      list.tasks = sortList
      return list
    })

    //TODO: 完了にカードが移動したらcompleted_flgをtrueにする処理を書く必要あり
    const updateTasks = sortListCopy.map((list, index, { length }) => {
      logger.debug(length)
      return list.tasks.map((task, taskIndex) => {
        return {
          id: task.id,
          list_id: list.list_id,
          vertical_sort: taskIndex,
          completed_flg: index === length - 1 ? true : false,
        }
      })
    })
    // return

    const joinUpdateTasks = []
    for (let index = 0; index < updateTasks.length; index++) {
      joinUpdateTasks.push(...updateTasks[index])
    }

    logger.table([...joinUpdateTasks])
    await updateTaskSort({
      variables: {
        updateTasks: {
          tasks: joinUpdateTasks,
          project_id: String(projectId),
          user_id: firebaseCurrentUser?.uid ?? '',
        },
      },
    })

    setList(listCopy)
  }

  return { onDragEnd }
}
