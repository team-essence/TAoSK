import { useMemo, useCallback } from 'react'
import { UseFormRegister } from 'react-hook-form'
import { useGetCurrentUserData } from 'hooks/useGetCurrentUserData'
import { useTaskCommentForm } from 'hooks/useTaskCommentForm'
import { GetCurrentUserQuery } from 'pages/projectDetail/getUser.gen'
import { useAddChatMutation } from 'pages/projectDetail/projectDetail.gen'
import toast from 'utils/toast/toast'

type FormInputs = { comment: string }

type UseTaskAddCommentReturn = {
  register: UseFormRegister<FormInputs>
  myData: GetCurrentUserQuery['user'] | undefined
  disabled: boolean
  onClickSendButton: () => void
}

export const useTaskAddComment = (id: string): UseTaskAddCommentReturn => {
  const { currentUserData } = useGetCurrentUserData()
  const { register, handleSubmit, value, disabled } = useTaskCommentForm()
  const myData = useMemo(() => currentUserData.data?.user, [currentUserData.data?.user])

  const [addChat] = useAddChatMutation({
    onCompleted(data) {
      toast.success('コメントを投稿しました')
    },
    onError(err) {
      console.log(err)
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
  }, [myData, value])

  return { myData, register, disabled, onClickSendButton: handleSubmit(onClickSendButton) }
}
