import { useCallback, Dispatch, SetStateAction } from 'react'
import { useDeleteTaskMutation } from 'pages/projectDetail/projectDetail.gen'
import { usePopover } from 'hooks/usePopover'
import toast from 'utils/toast/toast'
import logger from 'utils/debugger/logger'

type UseDeleteTaskReturn = {
  onClickDeleteButton: () => void
} & ReturnType<typeof usePopover>

type UseDeleteTask = (args: {
  id: string
  setShouldShowEditModal: Dispatch<SetStateAction<boolean>>
}) => UseDeleteTaskReturn

/**
 * タスクを削除する
 */
export const useDeleteTask: UseDeleteTask = ({ id, setShouldShowEditModal }) => {
  const { anchorEl, openPopover, closePopover } = usePopover()

  // TODO: 成功していてもなぜか削除できていない。修正する
  const [deleteTaskMutation] = useDeleteTaskMutation({
    onCompleted(data) {
      setShouldShowEditModal(false)
      toast.success('タスクを削除しました')
    },
    onError(err) {
      logger.debug(err)
      toast.error('タスクの削除に失敗しました')
    },
  })

  const onClickDeleteButton = useCallback(() => {
    deleteTaskMutation({
      variables: { taskId: Number(id) },
    })
    closePopover()
  }, [])

  return { onClickDeleteButton, anchorEl, openPopover, closePopover }
}
