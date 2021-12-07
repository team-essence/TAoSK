import { List } from 'types/list'
import { SearchTask } from 'types/task'
import logger from 'utils/debugger/logger'

/**
 * タスク名で検索
 *
 * @param {List[]} list [検索前のリスト]
 * @param {string} value [検索する文字]
 * @return {SearchTask[]} {検索後のタスク一覧}
 */
export const taskSearch = (list: List[], value: string): SearchTask[] => {
  const toUpperCaseValue = value.toUpperCase()

  return list.map(item => {
    const tasks = item.tasks.filter(task => {
      return task.title.toUpperCase().includes(toUpperCaseValue) && !!toUpperCaseValue
    })

    return {
      title: item.title,
      lint_index: item.index,
      tasks,
      isTask: !!tasks.length,
    }
  })
}
