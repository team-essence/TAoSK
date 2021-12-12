import { useState, useEffect, useCallback, useMemo, Dispatch, SetStateAction } from 'react'
import { useForm, UseFormRegister, FieldError } from 'react-hook-form'

type FormInputs = { title: string }
type FieldType = 'view' | 'edit'

type UseTaskTitleEditFormReturn<T> = {
  state: FieldType
  setState: Dispatch<SetStateAction<FieldType>>
  newTitle: string
  onClickSaveButton: () => void
  disabled: boolean
  register: UseFormRegister<T>
  error: FieldError | undefined
}

type UseTaskTitleEditForm<T> = {
  (args: { initialTitle: string }): UseTaskTitleEditFormReturn<T>
}

/**
 * タスクのタイトル編集関連処理の初期設定を行う
 */
export const useTaskTitleEditForm: UseTaskTitleEditForm<FormInputs> = ({ initialTitle }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<FormInputs>({ mode: 'onChange' })

  const [state, setState] = useState<FieldType>('view')
  const [newTitle, setNewTitle] = useState<string>(initialTitle)
  const value = watch('title')
  const hasError = useMemo(() => !!errors.title, [errors.title])
  const disabled = useMemo(() => newTitle === value || hasError, [newTitle, value, hasError])

  const onClickSaveButton = useCallback(() => {
    setNewTitle(value)
    setState('view')
  }, [value])

  useEffect(() => {
    setValue('title', initialTitle, { shouldValidate: true })
  }, [])

  return {
    state,
    setState,
    newTitle,
    onClickSaveButton,
    register,
    error: errors['title'],
    disabled,
  }
}
