import { useState, useRef, useEffect } from 'react'
import {
  useForm,
  UseFormRegister,
  UseFormHandleSubmit,
  UseFormGetValues,
  FieldErrors,
  UseFormTrigger,
} from 'react-hook-form'

type FormInputs = Record<
  'name' | 'company' | 'occupation' | 'email' | 'password' | 're-password',
  string
>

type UseSignUpFormReturn<T> = {
  register: UseFormRegister<T>
  handleSubmit: UseFormHandleSubmit<T>
  getValues: UseFormGetValues<T>
  isDisabled: boolean
  errors: FieldErrors
  trigger: UseFormTrigger<T>
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
export const useSignUpForm = (): UseSignUpFormReturn<FormInputs> => {
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
  const [isDisabled, setIsDisabled] = useState<boolean>(true)
  const isComponentMounted = useRef<boolean>(false)
  const watchAllFields = watch()

  useEffect(() => {
    const initializeInputValues = () => {
      setValue('name', '', { shouldValidate: true })
      setValue('company', '', { shouldValidate: true })
      setValue('occupation', '', { shouldValidate: true })
      setValue('email', '', { shouldValidate: true })
      setValue('password', '', { shouldValidate: true })
      setValue('re-password', '', { shouldValidate: true })
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

  return { register, handleSubmit, getValues, isDisabled, errors, trigger }
}
