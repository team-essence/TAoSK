import { useMemo, useState, Dispatch, SetStateAction } from 'react'
import { useForm, UseFormRegister, UseFormHandleSubmit } from 'react-hook-form'

type FormInputs = { comment: string }
type FieldType = 'view' | 'edit'

type UseTaskCommentFormReturn = {
  register: UseFormRegister<FormInputs>
  handleSubmit: UseFormHandleSubmit<FormInputs>
  value: string
  state: FieldType
  setState: Dispatch<SetStateAction<FieldType>>
  disabled: boolean
}

export const useTaskCommentForm = (): UseTaskCommentFormReturn => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormInputs>({ mode: 'onChange' })
  const value = watch('comment')
  const hasError = useMemo(() => !!errors.comment, [errors.comment])
  const disabled = useMemo(() => !value || hasError, [value, hasError])
  const [state, setState] = useState<FieldType>('view')

  return {
    register,
    handleSubmit,
    value,
    state,
    setState,
    disabled,
  }
}
