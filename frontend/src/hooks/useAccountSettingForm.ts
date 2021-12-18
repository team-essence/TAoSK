import { useState, useRef, useEffect } from 'react'
import {
  useForm,
  UseFormRegister,
  UseFormHandleSubmit,
  UseFormGetValues,
  FieldErrors,
  UseFormTrigger,
  UseFormSetValue,
} from 'react-hook-form'

type FormInputs = Record<'name' | 'email', string>

type UseAccountSettingFormArg = {
  initialName: string
  initialUserIcon: string
}

type UseAccountSettingFormReturn<T> = {
  register: UseFormRegister<T>
  handleSubmit: UseFormHandleSubmit<T>
  setValue: UseFormSetValue<FormInputs>
  getValues: UseFormGetValues<T>
  isDisabled: boolean
  errors: FieldErrors
  trigger: UseFormTrigger<T>
}

type UseAccountSettingForm<T> = (arg: UseAccountSettingFormArg) => UseAccountSettingFormReturn<T>

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
export const useAccountSettingForm: UseAccountSettingForm<FormInputs> = ({
  initialName,
  initialUserIcon,
}) => {
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
  }
}
