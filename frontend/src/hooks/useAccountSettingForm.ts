import { useRef, useEffect, useMemo, useCallback } from 'react'
import { useForm, UseFormRegister, FieldErrors, UseFormSetValue } from 'react-hook-form'
import { useGetCurrentUserData } from 'hooks/useGetCurrentUserData'
import { firebaseAuth } from 'utils/lib/firebase/firebaseAuth'
import toast from 'utils/toast/toast'

type FormInputs = Record<'name' | 'email', string>

type UseAccountSettingFormReturn = {
  register: UseFormRegister<FormInputs>
  setValue: UseFormSetValue<FormInputs>
  errors: FieldErrors<FormInputs>
  currentName: string
  currentEmail: string
  disabledName: boolean
  disabledEmail: boolean
  handleChangeEmail: () => void
}

/**
 * react-hook-formを使った登録処理の初期設定を行う
 * @returns {boolean} isDisabled - 登録ボタンをdisabledにするか
 * @returns {Object} {
 *  register,
 *  handleSubmit,
 *  getValues,
 *  errors,
 *  trigger
 *  } - react-hook-fromの公式ページを参照
 */
export const useAccountSettingForm = (): UseAccountSettingFormReturn => {
  const { currentUserData, firebaseCurrentUser } = useGetCurrentUserData()
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormInputs>({
    mode: 'onChange',
  })
  const { name, email } = watch()
  const currentName = useMemo(
    () => currentUserData.data?.user.name ?? '',
    [currentUserData.data?.user.name],
  )
  const currentEmail = useMemo(() => firebaseCurrentUser?.email ?? '', [firebaseCurrentUser?.email])
  const shouldInitialize = useRef<boolean>(true)
  const disabledName = useMemo(
    () => !!errors.name || currentName === name,
    [currentName, errors.name, name],
  )
  const disabledEmail = useMemo(
    () => !!errors.email || currentEmail === email,
    [currentEmail, errors.email, email],
  )

  const handleChangeEmail = useCallback(async () => {
    if (errors.email) return
    await firebaseAuth
      .changeEmail(email)
      .then(() => toast.success('送信完了しました'))
      .catch(() => toast.error('送信に失敗しました'))
  }, [email, errors.email])

  useEffect(() => {
    if (shouldInitialize.current && currentName && currentEmail) {
      setValue('name', currentName, { shouldValidate: true })
      setValue('email', currentEmail, { shouldValidate: true })
      shouldInitialize.current = false
    }
  }, [currentName, currentEmail])

  return {
    register,
    errors,
    setValue,
    currentName,
    currentEmail,
    disabledName,
    disabledEmail,
    handleChangeEmail,
  }
}
