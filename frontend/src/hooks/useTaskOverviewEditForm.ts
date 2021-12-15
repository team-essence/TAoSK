import { useState, useEffect, useCallback, useMemo, Dispatch, SetStateAction } from 'react'
import { useForm, UseFormRegister, FieldError } from 'react-hook-form'
import { useUpdateTaskOverviewMutation } from 'pages/projectDetail/projectDetail.gen'
import toast from 'utils/toast/toast'
import type { FieldType } from 'types/formField'

type FormInputs = { overview: string }

type UseTaskOverviewEditFormReturn<T> = {
  state: FieldType
  setState: Dispatch<SetStateAction<FieldType>>
  newOverview: string
  onClickSaveButton: () => void
  disabled: boolean
  register: UseFormRegister<T>
  error: FieldError | undefined
}

type UseTaskOverviewEditForm<T> = {
  (args: { id: string; initialOverview: string }): UseTaskOverviewEditFormReturn<T>
}

/**
 * タスク編集モーダルの概要変更処理を行う
 */
export const useTaskOverviewEditForm: UseTaskOverviewEditForm<FormInputs> = ({
  id,
  initialOverview,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<FormInputs>({ mode: 'onChange' })
  const [updateTaskOverview] = useUpdateTaskOverviewMutation({
    onCompleted(data) {
      setNewOverview(data.updateTaskOverview.overview)
      setState('view')
      toast.success('概要を変更しました')
    },
    onError(err) {
      toast.error('概要の変更に失敗しました')
    },
  })

  const [state, setState] = useState<FieldType>('view')
  const [newOverview, setNewOverview] = useState<string>(initialOverview)
  const value = watch('overview')
  const hasError = useMemo(() => !!errors.overview, [errors.overview])
  const disabled = useMemo(() => newOverview === value || hasError, [newOverview, value, hasError])

  const onClickSaveButton = useCallback(() => {
    updateTaskOverview({
      variables: {
        taskId: Number(id),
        overview: value,
      },
    })
  }, [value])

  useEffect(() => {
    setValue('overview', initialOverview, { shouldValidate: true })
  }, [])

  return {
    state,
    setState,
    newOverview,
    onClickSaveButton: handleSubmit(onClickSaveButton),
    register,
    error: errors['overview'],
    disabled,
  }
}
