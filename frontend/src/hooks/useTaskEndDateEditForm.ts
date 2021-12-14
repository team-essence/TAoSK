import { useState, useEffect, ChangeEventHandler } from 'react'
import { useForm, UseFormRegister } from 'react-hook-form'
import { useUpdateTaskEndDateMutation } from 'pages/projectDetail/projectDetail.gen'
import toast from 'utils/toast/toast'

type FormInputs = { date: string }

type UseTaskEndDateEditFormReturn<T> = {
  onChange: ChangeEventHandler<HTMLInputElement>
  register: UseFormRegister<T>
}

type UseTaskEndDateEditForm<T> = {
  (args: { id: string; initialEndDate: string }): UseTaskEndDateEditFormReturn<T>
}

/**
 * タスク編集モーダルの日付変更処理を行う
 */
export const useTaskEndDateEditForm: UseTaskEndDateEditForm<FormInputs> = ({
  id,
  initialEndDate,
}) => {
  const { register, setValue } = useForm<FormInputs>({ mode: 'onChange' })
  const [newEndDate, setNewEndDate] = useState<string>(initialEndDate)
  const [updateTaskEndDate] = useUpdateTaskEndDateMutation({
    onCompleted(data) {
      setNewEndDate(data.updateTaskEndDate.end_date)
      toast.success('日付を変更しました')
    },
    onError(err) {
      toast.success('日付の変更に失敗しました')
    },
  })

  const onChange: ChangeEventHandler<HTMLInputElement> = e => {
    if (e.target.value === newEndDate) return
    updateTaskEndDate({
      variables: {
        taskId: Number(id),
        end_date: e.target.value,
      },
    })
  }

  useEffect(() => {
    setValue('date', initialEndDate, { shouldValidate: true })
  }, [])

  return {
    onChange,
    register,
  }
}
