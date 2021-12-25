import { List } from 'types/list'

export const reorderList = (lists: List[], startIndex: number, endIndex: number): List[] => {
  const result = Array.from(lists)

  const previousItem = result[endIndex]
  const [removed] = result.splice(startIndex, 1)

  if (previousItem) {
    removed.index = previousItem.index
  }
  result.splice(endIndex, 0, removed)
  return result
}

export const getRefreshedListsVertical = (lists: List[]): List[] =>
  lists.map(list => {
    const sortedList = list.tasks.map((task, index) => {
      task.vertical_sort = index
      return task
    })

    list.tasks = sortedList
    return list
  })
