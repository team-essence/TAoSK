import { useMemo, useCallback } from 'react'
import { useForm, UseFormRegister } from 'react-hook-form'
import { useGetCurrentUserData } from 'hooks/useGetCurrentUserData'
import { GetCurrentUserQuery } from 'pages/projectDetail/getUser.gen'
import { useAddChatMutation } from 'pages/projectDetail/projectDetail.gen'
import toast from 'utils/toast/toast'

type FormInputs = { comment: string }

type UseTaskAddCommentFormReturn = {
  register: UseFormRegister<FormInputs>
  myData: GetCurrentUserQuery['user'] | undefined
  disabled: boolean
  onClickSendButton: () => void
}

export const useTaskAddCommentForm = (id: string): UseTaskAddCommentFormReturn => {
  const { currentUserData } = useGetCurrentUserData()
  const myData = useMemo(() => currentUserData.data?.user, [currentUserData.data?.user])

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<FormInputs>({ mode: 'onChange' })
  const value = watch('comment')
  const hasError = useMemo(() => !!errors.comment, [errors.comment])
  const disabled = useMemo(() => !value || hasError, [value, hasError])

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
