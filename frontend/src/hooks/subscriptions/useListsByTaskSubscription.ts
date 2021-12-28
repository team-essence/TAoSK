import { useUpdateListSubScSubscription } from 'pages/projectDetail/projectDetail.gen'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import type { List } from 'types/list'
import logger from 'utils/debugger/logger'

type UseListByTaskSubscription = {
  updatedLists: List[]
  updatedMonsterHPRemaining: number
  updatedMonsterTotalHP: number
  updatedIsTasks: boolean
}

export const useListsByTaskSubscription = (): UseListByTaskSubscription => {
  const { id: projectId } = useParams()
  const [updatedLists, setUpdatedLists] = useState<List[]>([])
  const [updatedMonsterHPRemaining, setUpdatedMonsterHPRemaining] = useState(0)
  const [updatedMonsterTotalHP, setUpdatedMonsterTotalHP] = useState(0)
  const [updatedIsTasks, setUpdatedIsTasks] = useState(false)
  const { data, loading, error } = useUpdateListSubScSubscription({
    variables: {
      project_id: String(projectId),
    },
  })

  useEffect(() => {
    if (!data) return

    setUpdatedMonsterHPRemaining(0)
    setUpdatedMonsterTotalHP(0)

    const sortList: List[] = data.updateList.map(list => {
      const tasks = list.tasks.map(task => {
        const totalStatusPoint =
          task.technology +
          task.achievement +
          task.solution +
          task.motivation +
          task.plan +
          task.design

        setUpdatedMonsterHPRemaining(updatedMonsterHPRemaining => {
          if (task.completed_flg) return updatedMonsterHPRemaining
          return updatedMonsterHPRemaining + totalStatusPoint
        })
        setUpdatedMonsterTotalHP(updatedMonsterTotalHP => updatedMonsterTotalHP + totalStatusPoint)

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

      logger.debug(tasks.length, 'タスクの数')
      setUpdatedIsTasks(isTasks => {
        if (isTasks) return isTasks
        return !!tasks.length
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
    logger.debug(sortList, 'sortlist')
    setUpdatedLists(sortList)
  }, [data])

  return { updatedLists, updatedMonsterHPRemaining, updatedMonsterTotalHP, updatedIsTasks }
}
