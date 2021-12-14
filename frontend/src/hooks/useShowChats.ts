import { useEffect, useCallback, useState } from 'react'
import {
  useGetChatsLazyQuery,
  useUpdateChatMutation,
  useDeleteChatMutation,
} from 'pages/projectDetail/projectDetail.gen'
import { useGetCurrentUserData } from 'hooks/useGetCurrentUserData'
import type { Chat } from 'types/chat'
import toast from 'utils/toast/toast'

type UseShowChatsReturn = {
  chatList: Chat[]
  judgeIsYourComment: (id: string) => boolean
  // onClickDeleteButton: (chatId: number | string) => void
}

export const useShowChats = (id: string): UseShowChatsReturn => {
  const [getChatsLazyQuery, chatsData] = useGetChatsLazyQuery()
  // const [updateChat] = useUpdateChatMutation({
  //   onCompleted(data) {
  //     toast.success('コメントを更新しました')
  //   },
  //   onError(err) {
  //     toast.error('コメントの更新に失敗しました')
  //   },
  // })
  // const [deleteChat] = useDeleteChatMutation({
  //   onCompleted(data) {
  //     toast.success('コメントを削除しました')
  //   },
  //   onError(err) {
  //     toast.error('コメントの削除に失敗しました')
  //   },
  // })
  const { currentUserData } = useGetCurrentUserData()
  const [chatList, setChatList] = useState<Chat[]>([])
  // const [state, setState] = useState<FieldType>('view')

  const judgeIsYourComment = useCallback(
    (id: string) => {
      return id === currentUserData.data?.user.id
    },
    [currentUserData.data],
  )

  // const onClickDeleteButton = useCallback(
  //   (chatId: number | string) => {
  //     deleteChat({
  //       variables: {
  //         taskId: Number(id),
  //         chatId: Number(chatId),
  //       },
  //     })
  //   },
  //   [id],
  // )

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
