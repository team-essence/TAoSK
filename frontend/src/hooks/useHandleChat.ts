import { useState, useCallback, Dispatch, SetStateAction } from 'react'
import { useUpdateChatMutation, useDeleteChatMutation } from 'pages/projectDetail/projectDetail.gen'
import toast from 'utils/toast/toast'
import type { Chat } from 'types/chat'

type FieldType = 'view' | 'edit'

type UseHandleChatReturn = {
  state: FieldType
  setState: Dispatch<SetStateAction<FieldType>>
  onClickDeleteButton: () => void
}

export const useHandleChat = (taskId: string, chatId: string): UseHandleChatReturn => {
  const [updateChat] = useUpdateChatMutation({
    onCompleted(data) {
      toast.success('コメントを更新しました')
    },
    onError(err) {
      toast.error('コメントの更新に失敗しました')
    },
  })
  const [deleteChat] = useDeleteChatMutation({
    onCompleted(data) {
      toast.success('コメントを削除しました')
    },
    onError(err) {
      toast.error('コメントの削除に失敗しました')
    },
  })

  const [state, setState] = useState<FieldType>('view')

  const onClickDeleteButton = useCallback(() => {
    deleteChat({
      variables: {
        taskId: Number(taskId),
        chatId: Number(chatId),
      },
    })
  }, [taskId])

  return { state, setState, onClickDeleteButton }
}
