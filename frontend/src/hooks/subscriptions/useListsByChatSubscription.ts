import { useUpdateListByChatSubscription } from 'pages/projectDetail/projectDetail.gen'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import type { List } from 'types/list'
import logger from 'utils/debugger/logger'

type UseListsByChatSubscription = {
  updatedListsByChat: List[]
}

export const useListsByChatSubscription = (): UseListsByChatSubscription => {
  const { id: projectId } = useParams()
  const [updatedListsByChat, setUpdatedListsByChat] = useState<List[]>([])
  const { data, loading, error } = useUpdateListByChatSubscription({
    variables: {
      project_id: String(projectId),
    },
  })

  useEffect(() => {
    if (!data) return
    logger.debug('update list by list subscription')
    const sortList: List[] = data.updateListByChat.map(list => {
      const tasks = list.tasks.map(task => {
        const allocations = task.allocations.map(allocation => ({
          ...allocation.user,
        }))

        return {
          ...task,
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
    setUpdatedListsByChat(sortList)
  }, [data])

  return { updatedListsByChat }
}
