import { useState, useMemo, useCallback, Dispatch, SetStateAction } from 'react'
import { StatusParam } from 'types/status'
import { useUpdateTaskParametersMutation } from 'pages/projectDetail/projectDetail.gen'
import toast from 'utils/toast/toast'
import { checkObjEqual } from 'utils/checkObjEqual'

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

/**
 * タスク編集モーダルのステータスポイントの変更処理を行う
 */
export const useTaskStatusPointEditForm: UseTaskStatusPointEditForm = ({
  id,
  initialStatusCounts,
}) => {
  const [newStatusCounts, setNewStatusCounts] = useState<StatusCounts>(initialStatusCounts)
  const [statusCounts, setStatusCounts] = useState<StatusCounts>(initialStatusCounts)
  const disabled = useMemo(
    () => checkObjEqual(statusCounts, newStatusCounts),
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
      toast.success('パラメーターを変更しました')
    },
    onError(err) {
      toast.error('パラメーターの変更に失敗しました')
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

  return {
    statusCounts,
    setStatusCounts,
    disabled,
    onClickSaveButton,
  }
}
