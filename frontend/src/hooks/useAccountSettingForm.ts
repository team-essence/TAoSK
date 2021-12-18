import { useState, useRef, useEffect, useMemo, useCallback } from 'react'
import {
  useForm,
  UseFormRegister,
  UseFormHandleSubmit,
  UseFormGetValues,
  FieldErrors,
  UseFormTrigger,
  UseFormSetValue,
} from 'react-hook-form'
import { useGetCurrentUserData } from 'hooks/useGetCurrentUserData'
import { firebaseAuth } from 'utils/lib/firebase/firebaseAuth'
import toast from 'utils/toast/toast'

type FormInputs = Record<'name' | 'email', string>

type UseAccountSettingFormReturn<T> = {
  register: UseFormRegister<T>
  handleSubmit: UseFormHandleSubmit<T>
  setValue: UseFormSetValue<FormInputs>
  getValues: UseFormGetValues<T>
  isDisabled: boolean
  errors: FieldErrors
  trigger: UseFormTrigger<T>
  currentName: string
  currentEmail: string
  handleChangePassword: () => void
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
export const useAccountSettingForm = (): UseAccountSettingFormReturn<FormInputs> => {
  const { currentUserData, firebaseCurrentUser } = useGetCurrentUserData()
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = useForm<FormInputs>({
    mode: 'onChange',
  })
  const currentName = useMemo(
    () => currentUserData.data?.user.name ?? '',
    [currentUserData.data?.user.name],
  )
  const currentEmail = useMemo(() => firebaseCurrentUser?.email ?? '', [firebaseCurrentUser?.email])
  const [isDisabled, setIsDisabled] = useState<boolean>(true)
  const isComponentMounted = useRef<boolean>(false)
  const shouldInitialize = useRef<boolean>(true)
  const watchAllFields = watch()

  const handleChangeEmail = useCallback(async () => {
    await firebaseAuth
      .changeEmail(watchAllFields.email)
      .then(() => toast.success('送信完了しました'))
      .catch(() => toast.error('送信に失敗しました'))
  }, [watchAllFields.email])

  const handleChangePassword = useCallback(async () => {
    await firebaseAuth
      .changePassword(watchAllFields.name)
      .then(() => toast.success('送信完了しました'))
      .catch(() => toast.error('送信に失敗しました'))
  }, [watchAllFields.name])

  useEffect(() => {
    if (shouldInitialize.current && currentName && currentEmail) {
      setValue('name', currentName, { shouldValidate: true })
      setValue('email', currentEmail, { shouldValidate: true })
      shouldInitialize.current = false
    }
  }, [currentName, currentEmail])

  useEffect(() => {
    const initializeInputValues = () => {
      setValue('name', '', { shouldValidate: true })
      setValue('email', '', { shouldValidate: true })
    }
    const hasError = Object.keys(errors).length

    if (!isComponentMounted.current) {
      initializeInputValues()
      isComponentMounted.current = true
    } else if (hasError) {
      setIsDisabled(true)
    } else {
      setIsDisabled(false)
    }
  }, [watchAllFields, errors])

  return {
    register,
    handleSubmit,
    getValues,
    isDisabled,
    errors,
    trigger,
    setValue,
    currentName,
    currentEmail,
    handleChangePassword,
  }
}
