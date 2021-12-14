import { useState, useEffect, useMemo, useCallback, Dispatch, SetStateAction } from 'react'
import { StatusParam } from 'types/status'
import { useUpdateTaskParametersMutation } from 'pages/projectDetail/projectDetail.gen'
import { INITIAL_STATUS_COUNTS } from 'consts/status'
import toast from 'utils/toast/toast'
import { isEqual } from 'utils/isEqual'

type StatusCounts = Record<StatusParam, number>

type UseTaskStatusPointEditFormReturn = {
  statusCounts: StatusCounts
  setStatusCounts: Dispatch<SetStateAction<StatusCounts>>
  disabled: boolean
  onClickSaveButton: () => void
}
type UseTaskStatusPointEditForm = (args: {
  id: string
  initialStatusCounts: StatusCounts
}) => UseTaskStatusPointEditFormReturn

let cachedNewStatusCounts: StatusCounts = { ...INITIAL_STATUS_COUNTS }
let cachedStatusCounts: StatusCounts = { ...INITIAL_STATUS_COUNTS }

/**
 * タスク編集モーダルのステータスポイントの変更処理を行う
 */
export const useTaskStatusPointEditForm: UseTaskStatusPointEditForm = ({
  id,
  initialStatusCounts,
}) => {
  const [newStatusCounts, setNewStatusCounts] = useState<StatusCounts>(
    isEqual(cachedNewStatusCounts, INITIAL_STATUS_COUNTS)
      ? { ...initialStatusCounts }
      : { ...cachedNewStatusCounts },
  )
  const [statusCounts, setStatusCounts] = useState<StatusCounts>(
    isEqual(cachedStatusCounts, INITIAL_STATUS_COUNTS)
      ? { ...initialStatusCounts }
      : { ...cachedStatusCounts },
  )
  const disabled = useMemo(
    () => isEqual(statusCounts, newStatusCounts),
    [statusCounts, newStatusCounts],
  )
  const [updateTaskParameterMutation] = useUpdateTaskParametersMutation({
    onCompleted(data) {
      const { technology, solution, achievement, motivation, design, plan } =
        data.updateTaskParameters
      const newValue = {
        technology,
        solution,
        achievement,
        motivation,
        design,
        plan,
      }
      setNewStatusCounts({ ...newValue })
      cachedNewStatusCounts = { ...newValue }
      toast.success('パラメーターを変更しました')
    },
    onError(err) {
      toast.success('パラメーターの変更に失敗しました')
    },
  })

  const onClickSaveButton = useCallback(() => {
    updateTaskParameterMutation({
      variables: {
        taskId: Number(id),
        ...statusCounts,
      },
    })
  }, [statusCounts])

  useEffect(() => {
    return () => {
      cachedStatusCounts = { ...statusCounts }
    }
  }, [statusCounts])

  return {
    statusCounts,
    setStatusCounts,
    disabled,
    onClickSaveButton,
  }
}
