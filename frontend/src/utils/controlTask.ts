import { Task } from 'types/task'
import { List } from 'types/list'
import { UpdateTask } from 'types/graphql.gen'

type MoveTask = (arg: {
  listsCopy: List[]
  sourceDroppableId: number
  sourceIndex: number
  destinationDroppableId: number
  destinationIndex: number
}) => void

const removeFromList = (list: Task[], index: number): [Task, Task[]] => {
  const result = Array.from(list)
  const [removed] = result.splice(index, 1)
  return [removed, result]
}

const addToList = (list: Task[], index: number, element: Task) => {
  const result = Array.from(list)
  result.splice(index, 0, element)
  return result
}

/** タスクを移動する処理 */
export const moveTask: MoveTask = ({
  listsCopy,
  sourceDroppableId,
  sourceIndex,
  destinationDroppableId,
  destinationIndex,
}) => {
  const [removedElement, newSourceList] = removeFromList(
    listsCopy[sourceDroppableId].tasks,
    sourceIndex,
  )
  listsCopy[sourceDroppableId].tasks = newSourceList

  const destinationTask = listsCopy[destinationDroppableId].tasks

  listsCopy[destinationDroppableId].tasks = addToList(
    destinationTask,
    destinationIndex,
    removedElement,
  )
}

/** DB上のタスクの順番をアップデートする時に引数として使えるよう整形する */
export const adjustTasksInfoToUpdate = (lists: List[]): UpdateTask[] => {
  const tasksInfo = []

  for (let listIndex = 0; listIndex < lists.length; listIndex++) {
    const list = lists[listIndex]
    const tasks = list.tasks

    for (let taskIndex = 0; taskIndex < tasks.length; taskIndex++) {
      const task = tasks[taskIndex]

      tasksInfo.push({
        id: task.id,
        list_id: list.list_id,
        vertical_sort: taskIndex,
        completed_flg: listIndex === lists.length - 1 ? true : false,
      })
    }
  }

  return tasksInfo
}
