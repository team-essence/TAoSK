import { useUpdateChatSubScSubscription } from 'pages/projectDetail/projectDetail.gen'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Chat } from 'types/chat'
import logger from 'utils/debugger/logger'

type UseChatSubscription = {
  updatedChatList: Chat[]
}

export const useChatSubscription = (taskId: string): UseChatSubscription => {
  const { id: projectId } = useParams()
  const [updatedChatList, setUpdatedChatList] = useState<Chat[]>([])

  const { data, loading, error } = useUpdateChatSubScSubscription({
    variables: {
      project_id: String(projectId),
      task_id: taskId,
    },
  })

  useEffect(() => {
    logger.debug('use chat subscription')
    if (!data) return
    setUpdatedChatList(data.updateChatSubscription)
  }, [data])

  return { updatedChatList }
}
