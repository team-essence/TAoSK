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

export const getTasksInfoToUpdate = (lists: List[]): UpdateTask[] => {
  return lists
    .map((list, listIndex, { length }) => {
      const tasks = list.tasks

      for (let taskIndex = 0; taskIndex < tasks.length; taskIndex++) {
        const task = tasks[taskIndex]

        return {
          id: task.id,
          list_id: list.list_id,
          vertical_sort: taskIndex,
          completed_flg: listIndex === length - 1 ? true : false,
        }
      }
    })
    .filter((v): v is UpdateTask => !!v)
}
