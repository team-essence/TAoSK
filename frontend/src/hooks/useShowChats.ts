import { useEffect, useCallback, useState } from 'react'
import { useGetChatsLazyQuery } from 'pages/projectDetail/projectDetail.gen'
import { useGetCurrentUserData } from 'hooks/useGetCurrentUserData'
import type { Chat } from 'types/chat'
import { useChatSubscription } from './subscriptions/useChatSubscription'
import logger from 'utils/debugger/logger'

type UseShowChatsReturn = {
  chatList: Chat[]
  judgeIsYourComment: (id: string) => boolean
}

/**
 * コメントの一覧を取得する
 */
export const useShowChats = (id: string): UseShowChatsReturn => {
  const [getChatsLazyQuery, chatsData] = useGetChatsLazyQuery()
  const { currentUserData } = useGetCurrentUserData()
  const [chatList, setChatList] = useState<Chat[]>([])
  const { updatedChatList } = useChatSubscription(id)

  const judgeIsYourComment = useCallback(
    (id: string) => {
      return id === currentUserData?.id
    },
    [currentUserData],
  )

  useEffect(() => {
    getChatsLazyQuery({
      variables: {
        taskId: Number(id),
      },
    })
  }, [])

  useEffect(() => {
    setChatList(chatsData.data?.getChats ?? [])
  }, [chatsData.data])

  useEffect(() => {
    logger.debug(updatedChatList)
    setChatList(updatedChatList)
  }, [updatedChatList])

  return { chatList, judgeIsYourComment }
}
