import { useState, useRef, useEffect } from 'react'
import {
  useForm,
  UseFormRegister,
  UseFormHandleSubmit,
  UseFormGetValues,
  FieldErrors,
  UseFormTrigger,
} from 'react-hook-form'

// TODO: dateの型に関しては一応stringとしてる、適切な型があれば変える
type FormInputs = Record<'title' | 'overview' | 'date', string>

type UseTaskCreateFormReturn<T> = {
  register: UseFormRegister<T>
  handleSubmit: UseFormHandleSubmit<T>
  getValues: UseFormGetValues<T>
  isDisabled: boolean
  errors: FieldErrors
  trigger: UseFormTrigger<T>
}

/**
 * react-hook-formを使ったタスク追加処理の初期設定を行う
 * @returns {boolean} isDisabled - 登録ボタンをdisabledにするか
 * @returns {Object} {
 *  register,
 *  handleSubmit,
 *  getValues,
 *  errors,
 *  trigger
 *  } - react-hook-fromの公式ページを参照
 */
export const useTaskCreateForm = (): UseTaskCreateFormReturn<FormInputs> => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = useForm<FormInputs>({ mode: 'onChange' })
  const [isDisabled, setIsDisabled] = useState<boolean>(true)
  const isComponentMounted = useRef<boolean>(false)
  const watchAllFields = watch()

  useEffect(() => {
    const initializeInputValues = () => {
      setValue('title', '', { shouldValidate: true })
      setValue('overview', '', { shouldValidate: true })
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
