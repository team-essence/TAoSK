import { useEffect, useCallback, useState } from 'react'
import { useGetChatsLazyQuery } from 'pages/projectDetail/projectDetail.gen'
import { useGetCurrentUserData } from 'hooks/useGetCurrentUserData'
import type { Chat } from 'types/chat'
import toast from 'utils/toast/toast'

type UseHandleChatsReturn = {
  chats: Chat[]
  judgeIsYourComment: (id: string) => boolean
}

export const useHandleChats = (id: string): UseHandleChatsReturn => {
  const [getChatsLazyQuery, chatsData] = useGetChatsLazyQuery()
  const { currentUserData } = useGetCurrentUserData()
  const [chats, setChats] = useState<Chat[]>([])

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
    setChats(chatsData.data?.getChats ?? [])
  }, [chatsData.data])

  return { chats, judgeIsYourComment }
}
