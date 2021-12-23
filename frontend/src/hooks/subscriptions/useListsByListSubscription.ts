import { useUpdateListByListSubscriptionSubscription } from 'pages/projectDetail/projectDetail.gen'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import type { List } from 'types/list'
import logger from 'utils/debugger/logger'

type UseListByListSubscription = {
  updatedListsByList: List[]
}

export const useListsByListSubscription = (): UseListByListSubscription => {
  const { id: projectId } = useParams()
  const [updatedListsByList, setUpdatedListsByList] = useState<List[]>([])
  const { data, loading, error } = useUpdateListByListSubscriptionSubscription({
    variables: {
      project_id: String(projectId),
    },
  })

  useEffect(() => {
    if (!data) return
    logger.debug('update list by list subscription')
    const sortList: List[] = data.updateListByList.map(list => {
      const tasks = list.tasks.map(task => {
        const allocations = task.allocations.map(allocation => {
          return {
            id: allocation.user.id,
            name: allocation.user.name,
            icon_image: allocation.user.icon_image,
            occupation: allocation.user.occupation,
          }
        })

        return {
          id: task.id,
          title: task.title,
          overview: task.overview,
          technology: task.technology,
          achievement: task.achievement,
          solution: task.solution,
          motivation: task.motivation,
          plan: task.plan,
          design: task.design,
          vertical_sort: task.vertical_sort,
          end_date: task.end_date,
          chatCount: task.chatCount,
          completed_flg: task.completed_flg,
          allocations,
        }
      })

      return {
        id: list.id,
        list_id: list.list_id,
        sort_id: list.listSorts[0].id,
        index: list.listSorts[0].task_list,
        title: list.name,
        tasks: tasks.sort((a, b) => a.vertical_sort - b.vertical_sort),
      }
    })

    sortList.sort((a, b) => a.index - b.index)
    setUpdatedListsByList(sortList)
  }, [data])

  return { updatedListsByList }
}
