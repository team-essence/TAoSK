import { useRef, useMemo, useCallback, useEffect } from 'react'
import { useGetCurrentUserData } from 'hooks/useGetCurrentUserData'
import { useForm, UseFormRegister, FieldError } from 'react-hook-form'
import { useUpdateUserNameMutation } from 'pages/mypage/mypage.gen'
import toast from 'utils/toast/toast'

type FormInput = { name: string }

type UseUpdateUserNameFormReturn = {
  register: UseFormRegister<FormInput>
  error: FieldError | undefined
  disabled: boolean
  handleUpdateUserNameMutation: () => void
  initialize: () => void
}

/**
 * react-hook-formを使ったユーザーネーム変更処理
 */
export const useUpdateUserNameForm = (): UseUpdateUserNameFormReturn => {
  const shouldInitialize = useRef<boolean>(true)
  const { currentUserData } = useGetCurrentUserData()
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormInput>({
    mode: 'onChange',
  })
  const name = watch('name')
  const currentName = useMemo(
    () => currentUserData.data?.user.name ?? '',
    [currentUserData.data?.user.name],
  )
  const disabled = useMemo(
    () => !!errors.name || currentName === name,
    [currentName, errors.name, name],
  )
  const initialize = useCallback(
    () => setValue('name', currentName, { shouldValidate: true }),
    [currentName],
  )

  const [updateUserNameMutation] = useUpdateUserNameMutation({
    onCompleted(data) {
      toast.success('冒険者名を変更しました')
    },
    onError(err) {
      toast.error('冒険者名の変更に失敗しました')
    },
  })

  const handleUpdateUserNameMutation = useCallback(() => {
    if (errors.name || !currentUserData.data?.user.id) return
    updateUserNameMutation({
      variables: {
        name,
        id: currentUserData.data.user.id,
      },
    })
  }, [name, errors.name, currentUserData.data?.user.id])

  useEffect(() => {
    if (shouldInitialize.current && currentName) {
      initialize()
      shouldInitialize.current = false
    }
  }, [currentName])

  return {
    register,
    error: errors.name,
    disabled,
    handleUpdateUserNameMutation,
    initialize,
  }
}
