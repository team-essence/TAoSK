import { useMemo, useState, Dispatch, SetStateAction } from 'react'
import { useForm, UseFormRegister, UseFormHandleSubmit, UseFormSetValue } from 'react-hook-form'
import type { FieldType } from 'types/formField'

type FormInputs = { comment: string }

type UseTaskCommentFormReturn = {
  register: UseFormRegister<FormInputs>
  handleSubmit: UseFormHandleSubmit<FormInputs>
  value: string
  setValue: UseFormSetValue<FormInputs>
  state: FieldType
  setState: Dispatch<SetStateAction<FieldType>>
  disabled: boolean
}

/**
 * react-hook-formを使った、コメントのinputフォームを扱うためのフック
 */
export const useTaskCommentForm = (): UseTaskCommentFormReturn => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
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
    setValue,
    state,
    setState,
    disabled,
  }
}
