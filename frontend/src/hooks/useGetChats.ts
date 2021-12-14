import { useEffect, useCallback } from 'react'
import { useGetChatsLazyQuery } from 'pages/projectDetail/projectDetail.gen'
import { useGetCurrentUserData } from 'hooks/useGetCurrentUserData'
import toast from 'utils/toast/toast'

type UseGetChatsReturn = {
  chatsData: ReturnType<typeof useGetChatsLazyQuery>[1]
  judgeIsYourComment: (id: string) => boolean
}

export const useGetChats = (id: string): UseGetChatsReturn => {
  const [getChatsLazyQuery, chatsData] = useGetChatsLazyQuery()
  const { currentUserData } = useGetCurrentUserData()
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

  return { chatsData, judgeIsYourComment }
}
