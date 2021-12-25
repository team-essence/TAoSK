import { Task } from 'types/task'
import { List } from 'types/list'

export const removeFromList = (list: Task[], index: number): [Task, Task[]] => {
  const result = Array.from(list)
  const [removed] = result.splice(index, 1)
  return [removed, result]
}

export const addToList = (list: Task[], index: number, element: Task) => {
  const result = Array.from(list)
  result.splice(index, 0, element)
  return result
}

export const reorder = (array: List[], startIndex: number, endIndex: number): List[] => {
  const result = Array.from(array)

  const previousItem = result[endIndex]
  const [removed] = result.splice(startIndex, 1)

  if (previousItem) {
    removed.index = previousItem.index
  }
  result.splice(endIndex, 0, removed)
  return result
}
