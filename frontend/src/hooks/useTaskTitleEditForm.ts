import { useState, useEffect, useCallback, useMemo, Dispatch, SetStateAction } from 'react'
import { useForm, UseFormRegister, FieldError } from 'react-hook-form'
import { useUpdateTaskTitleMutation } from 'pages/projectDetail/projectDetail.gen'
import toast from 'utils/toast/toast'
import type { FieldType } from 'types/formField'

type FormInputs = { title: string }

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
  (args: { id: string; initialTitle: string }): UseTaskTitleEditFormReturn<T>
}

/**
 * タスクのタイトル編集関連処理の初期設定を行う
 */
export const useTaskTitleEditForm: UseTaskTitleEditForm<FormInputs> = ({ id, initialTitle }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<FormInputs>({ mode: 'onChange' })
  const [updateTaskTitle] = useUpdateTaskTitleMutation({
    onCompleted(data) {
      setNewTitle(data.updateTaskTitle.title)
      setState('view')
      toast.success('タイトルを変更しました')
    },
    onError(err) {
      toast.error('タイトルの変更に失敗しました')
    },
  })

  const [state, setState] = useState<FieldType>('view')
  const [newTitle, setNewTitle] = useState<string>(initialTitle)
  const value = watch('title')
  const hasError = useMemo(() => !!errors.title, [errors.title])
  const disabled = useMemo(() => newTitle === value || hasError, [newTitle, value, hasError])

  const onClickSaveButton = useCallback(() => {
    updateTaskTitle({
      variables: {
        taskId: Number(id),
        title: value,
      },
    })
  }, [value])

  useEffect(() => {
    setValue('title', initialTitle, { shouldValidate: true })
  }, [])

  return {
    state,
    setState,
    newTitle,
    onClickSaveButton: handleSubmit(onClickSaveButton),
    register,
    error: errors['title'],
    disabled,
  }
}
