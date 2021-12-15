import { useMemo, useCallback } from 'react'
import { useGetCurrentUserData } from 'hooks/useGetCurrentUserData'
import { useTaskCommentForm } from 'hooks/useTaskCommentForm'
import { GetCurrentUserQuery } from 'pages/projectDetail/getUser.gen'
import { useAddChatMutation } from 'pages/projectDetail/projectDetail.gen'
import toast from 'utils/toast/toast'

type UseTaskAddCommentReturn = {
  register: ReturnType<typeof useTaskCommentForm>['register']
  disabled: ReturnType<typeof useTaskCommentForm>['disabled']
  myData: GetCurrentUserQuery['user'] | undefined
  onClickSendButton: () => void
}

/**
 * コメントの追加処理を行う
 */
export const useTaskAddComment = (id: string): UseTaskAddCommentReturn => {
  const { currentUserData } = useGetCurrentUserData()
  const { register, handleSubmit, setValue, value, disabled } = useTaskCommentForm()
  const myData = useMemo(() => currentUserData.data?.user, [currentUserData.data?.user])

  const [addChat] = useAddChatMutation({
    onCompleted(data) {
      toast.success('コメントを投稿しました')
    },
    onError(err) {
      toast.error('コメントの投稿に失敗しました')
    },
  })

  const onClickSendButton = useCallback(() => {
    if (!myData?.id) return
    addChat({
      variables: {
        taskId: Number(id),
        userId: myData.id,
        comment: value,
      },
    })
    setValue('comment', '', { shouldValidate: true })
  }, [myData, value])

  return { myData, register, disabled, onClickSendButton: handleSubmit(onClickSendButton) }
}
