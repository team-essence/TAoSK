import { useCallback, useEffect } from 'react'
import { useTaskCommentForm } from 'hooks/useTaskCommentForm'
import { useUpdateChatMutation, useDeleteChatMutation } from 'pages/projectDetail/projectDetail.gen'
import toast from 'utils/toast/toast'

type UseHandleChatReturn = {
  register: ReturnType<typeof useTaskCommentForm>['register']
  disabled: ReturnType<typeof useTaskCommentForm>['disabled']
  state: ReturnType<typeof useTaskCommentForm>['state']
  setState: ReturnType<typeof useTaskCommentForm>['setState']
  onClickDeleteButton: () => void
  onClickUpdateButton: () => void
}

export const useHandleChat = ({
  taskId,
  chatId,
  initialValue,
}: Record<'taskId' | 'chatId' | 'initialValue', string>): UseHandleChatReturn => {
  const { register, handleSubmit, state, setState, value, setValue, disabled } =
    useTaskCommentForm()
  const [updateChat] = useUpdateChatMutation({
    onCompleted(data) {
      setState('view')
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

  const onClickDeleteButton = useCallback(() => {
    deleteChat({
      variables: {
        taskId: Number(taskId),
        chatId: Number(chatId),
      },
    })
  }, [taskId, chatId])

  const onClickUpdateButton = useCallback(() => {
    updateChat({
      variables: {
        taskId: Number(taskId),
        chatId: Number(chatId),
        comment: value,
      },
    })
  }, [taskId, chatId, value])

  useEffect(() => {
    if (state === 'edit') setValue('comment', initialValue, { shouldValidate: true })
  }, [state])

  return {
    register,
    disabled,
    state,
    setState,
    onClickDeleteButton,
    onClickUpdateButton: handleSubmit(onClickUpdateButton),
  }
}
