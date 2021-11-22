import { useState, useRef, useEffect } from 'react'
import { useForm, UseFormRegister, UseFormHandleSubmit, UseFormGetValues } from 'react-hook-form'

type FormInputs = Record<'email' | 'password', string>

type UseSignInFormReturn<T> = {
  register: UseFormRegister<T>
  handleSubmit: UseFormHandleSubmit<T>
  getValues: UseFormGetValues<T>
  isDisabled: boolean
}

export const useSignInForm = (): UseSignInFormReturn<FormInputs> => {
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
  const isComponentMounted = useRef<boolean>(false)
  const watchAllFields = watch()

  useEffect(() => {
    const initializeInputValues = () => {
      setValue('email', '', { shouldValidate: true })
      setValue('password', '', { shouldValidate: true })
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
  }, [watchAllFields, setValue, errors])

  return { register, handleSubmit, getValues, isDisabled }
}
