import { List } from 'types/list'

/** リストの順番を変更した際の処理 */
export const reorderList = (lists: List[], startIndex: number, endIndex: number): List[] => {
  const copiedLists = [...lists]

  const previousItem = copiedLists[endIndex]
  const [removed] = copiedLists.splice(startIndex, 1)

  if (previousItem) {
    removed.index = previousItem.index
  }
  copiedLists.splice(endIndex, 0, removed)
  return copiedLists
}

/** DB上のタスクの順番をアップデートする際に使う、vertical_sortの値を更新する */
export const getRefreshedListsVertical = (lists: List[]): List[] =>
  lists.map(list => {
    const sortedList = list.tasks.map((task, index) => {
      task.vertical_sort = index
      return task
    })

    list.tasks = sortedList
    return list
  })
