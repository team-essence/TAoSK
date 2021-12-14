import { useEffect, useCallback, useState } from 'react'
import { useGetChatsLazyQuery } from 'pages/projectDetail/projectDetail.gen'
import { useGetCurrentUserData } from 'hooks/useGetCurrentUserData'
import type { Chat } from 'types/chat'

type UseShowChatsReturn = {
  chatList: Chat[]
  judgeIsYourComment: (id: string) => boolean
}

export const useShowChats = (id: string): UseShowChatsReturn => {
  const [getChatsLazyQuery, chatsData] = useGetChatsLazyQuery()
  const { currentUserData } = useGetCurrentUserData()
  const [chatList, setChatList] = useState<Chat[]>([])

  const judgeIsYourComment = useCallback(
    (id: string) => {
      return id === currentUserData.data?.user.id
    },
    [currentUserData.data],
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

  return { chatList, judgeIsYourComment }
}
