import { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import { useForm, UseFormRegister, FieldError } from 'react-hook-form'
import { useGetCurrentUserData } from 'hooks/useGetCurrentUserData'
import { firebaseAuth } from 'utils/lib/firebase/firebaseAuth'
import toast from 'utils/toast/toast'

type FormInput = { email: string }

type UseAccountSettingFormReturn = {
  register: UseFormRegister<FormInput>
  error: FieldError | undefined
  currentEmail: string
  disabled: boolean
  handleChangeEmail: () => void
  initialize: () => void
}

/**
 * react-hook-formを使ったemail変更処理
 */
export const useChangeEmailForm = (): UseAccountSettingFormReturn => {
  const shouldInitialize = useRef<boolean>(true)
  const [isUploading, setIsUploading] = useState<boolean>(false)
  const { firebaseCurrentUser } = useGetCurrentUserData()
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormInput>({
    mode: 'onChange',
  })
  const email = watch('email')
  const currentEmail = useMemo(() => firebaseCurrentUser?.email ?? '', [firebaseCurrentUser?.email])
  const disabled = useMemo(
    () => !!errors.email || currentEmail === email || isUploading,
    [currentEmail, errors.email, email, isUploading],
  )
  const initialize = useCallback(
    () => setValue('email', currentEmail, { shouldValidate: true }),
    [currentEmail],
  )

  const handleChangeEmail = useCallback(async () => {
    if (errors.email) return
    setIsUploading(true)
    // FIXME: メールアドレスの変更ができない
    await firebaseAuth
      .changeEmail(email)
      .then(() => toast.success('メールアドレスを変更しました'))
      .catch(() => toast.error('メールアドレスの変更に失敗しました'))
      .finally(() => setIsUploading(false))
  }, [email, errors.email])

  useEffect(() => {
    if (shouldInitialize.current && currentEmail) {
      initialize()
      shouldInitialize.current = false
    }
  }, [currentEmail])

  return {
    register,
    error: errors.email,
    currentEmail,
    disabled,
    handleChangeEmail,
    initialize,
  }
}
