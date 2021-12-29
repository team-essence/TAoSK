import { useCallback, useState, useRef, MutableRefObject } from 'react'
import { useCompleteProjectMutation } from 'pages/projectDetail//projectDetail.gen'
import toast from 'utils/toast/toast'
import logger from 'utils/debugger/logger'

type PromiseResult = { hasAgreed: boolean }

type UseHandleProjectCloseModalReturn = {
  shouldOpenProjectCloseModal: boolean
  onClickProjectCloseBtn: () => void
  onClickCancelBtn: () => void
  handleProjectCloseConfirmModalPromise: () => Promise<PromiseResult>
  hasClickedProjectCloseBtn: MutableRefObject<boolean>
  hasClickedCancelBtn: MutableRefObject<boolean>
  hasClearedProject: boolean
}

/** プロジェクトを閉じるときに表示される確認モーダルにおける、表示/非表示の状態管理と、はい/いいえを押下した時の処理 */
export const useHandleProjectCloseConfirmModal = (
  project_id: string | undefined,
  user_id: string | undefined,
): UseHandleProjectCloseModalReturn => {
  const [hasClearedProject, setHasClearedProject] = useState<boolean>(false)
  const [completeProject] = useCompleteProjectMutation({
    onCompleted(data) {
      logger.debug(data)
      setHasClearedProject(true)
    },
    onError(err) {
      logger.debug(err)
      toast.error('プロジェクトの完了に失敗しました')
    },
  })

  const [shouldOpenProjectCloseModal, setShouldOpenProjectCloseModal] = useState<boolean>(false)
  const hasClickedProjectCloseBtn = useRef<boolean>(false)
  const hasClickedCancelBtn = useRef<boolean>(false)
  const outsideResolverRef = useRef<
    ((value: PromiseResult | PromiseLike<PromiseResult>) => void) | null
  >(null)

  const onClickProjectCloseBtn = useCallback(async () => {
    if (!outsideResolverRef.current) return
    hasClickedProjectCloseBtn.current = true
    outsideResolverRef.current({ hasAgreed: true })
    if (!project_id || !user_id) return
    await completeProject({
      variables: {
        endProject: {
          project_id,
          user_id,
        },
      },
    })
    setShouldOpenProjectCloseModal(false)
  }, [outsideResolverRef.current, project_id, user_id])

  const onClickCancelBtn = useCallback(() => {
    if (!outsideResolverRef.current) return
    hasClickedCancelBtn.current = true
    outsideResolverRef.current({ hasAgreed: false })
    setShouldOpenProjectCloseModal(false)
  }, [outsideResolverRef.current])

  const handleProjectCloseConfirmModalPromise = (): Promise<PromiseResult> => {
    return new Promise(resolve => {
      setShouldOpenProjectCloseModal(true)
      outsideResolverRef.current = resolve
    })
  }

  return {
    shouldOpenProjectCloseModal,
    onClickProjectCloseBtn,
    onClickCancelBtn,
    handleProjectCloseConfirmModalPromise,
    hasClickedProjectCloseBtn,
    hasClickedCancelBtn,
    hasClearedProject,
  }
}
