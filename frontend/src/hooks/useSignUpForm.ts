import { useState, useRef, useEffect } from 'react'
import { useForm, UseFormRegister, UseFormHandleSubmit, UseFormGetValues } from 'react-hook-form'

type FormInputs = Record<'name' | 'company' | 'occupation' | 'email' | 'password', string>

type UseSignUpFormReturn<T> = {
  register: UseFormRegister<T>
  handleSubmit: UseFormHandleSubmit<T>
  getValues: UseFormGetValues<T>
  isDisabled: boolean
}
type UseSignUpForm = () => UseSignUpFormReturn<FormInputs>

export const useSignUpForm: UseSignUpForm = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormInputs>({
    mode: 'onChange',
  })
  const [isDisabled, setIsDisabled] = useState<boolean>(true)
  const isFirst = useRef<boolean>(true)
  const watchAllFields = watch()

  useEffect(() => {
    const initializeInputValues = () => {
      setValue('name', '', { shouldValidate: true })
      setValue('company', '', { shouldValidate: true })
      setValue('occupation', '', { shouldValidate: true })
      setValue('email', '', { shouldValidate: true })
      setValue('password', '', { shouldValidate: true })
    }
    const hasError = Object.keys(errors).length

    if (isFirst.current) {
      initializeInputValues()
      isFirst.current = false
    } else if (hasError) {
      setIsDisabled(true)
    } else {
      setIsDisabled(false)
    }
  }, [watchAllFields, setValue, errors])

  return { register, handleSubmit, getValues, isDisabled }
}
