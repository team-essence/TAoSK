import { useEffect } from 'react'
import { useGetChatsLazyQuery } from 'pages/projectDetail/projectDetail.gen'
import toast from 'utils/toast/toast'

type UseGetChatsReturn = {
  chatsData: ReturnType<typeof useGetChatsLazyQuery>[1]
}

export const useGetChats = (id: string): UseGetChatsReturn => {
  const [getChatsLazyQuery, chatsData] = useGetChatsLazyQuery()

  useEffect(() => {
    getChatsLazyQuery({
      variables: {
        taskId: Number(id),
      },
    })
  }, [])

  return { chatsData }
}
