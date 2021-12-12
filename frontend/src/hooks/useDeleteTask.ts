import { useState, useCallback, Dispatch, SetStateAction } from 'react'
import { useDeleteTaskMutation } from 'pages/projectDetail/projectDetail.gen'
import toast from 'utils/toast/toast'

type UseDeleteTaskReturn = {
  onClickDeleteButton: () => void
  shouldShowConfirmPopup: boolean
  setShouldShowConfirmPopup: Dispatch<SetStateAction<boolean>>
}

type UseDeleteTask = (args: {
  id: string
  setShouldShowEditModal: Dispatch<SetStateAction<boolean>>
}) => UseDeleteTaskReturn

export const useDeleteTask: UseDeleteTask = ({ id, setShouldShowEditModal }) => {
  const [shouldShowConfirmPopup, setShouldShowConfirmPopup] = useState<boolean>(false)

  // TODO: 成功していてもなぜか削除できていない。修正する
  const [deleteTaskMutation] = useDeleteTaskMutation({
    onCompleted(data) {
      setShouldShowEditModal(false)
      toast.success('タスクを削除しました')
    },
    onError(err) {
      toast.success('タスクの削除に失敗しました')
    },
  })

  const onClickDeleteButton = useCallback(() => {
    deleteTaskMutation({
      variables: { taskId: Number(id) },
    })
    setShouldShowConfirmPopup(false)
  }, [])

  return { onClickDeleteButton, shouldShowConfirmPopup, setShouldShowConfirmPopup }
}
