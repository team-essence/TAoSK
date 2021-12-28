import { useCallback, useState, useRef, MutableRefObject } from 'react'

type PromiseResult = { hasAgreed: boolean }

type UseHandleProjectCloseModalReturn = {
  shouldOpenProjectCloseModal: boolean
  onClickProjectCloseBtn: () => void
  onClickCancelBtn: () => void
  handleProjectCloseConfirmModalPromise: () => Promise<PromiseResult>
  hasClickedProjectCloseBtn: MutableRefObject<boolean>
  hasClickedCancelBtn: MutableRefObject<boolean>
}

/** プロジェクトを閉じるときに表示される確認モーダルにおける、表示/非表示の状態管理と、はい/いいえを押下した時の処理 */
export const useHandleProjectCloseConfirmModal = (): UseHandleProjectCloseModalReturn => {
  const [shouldOpenProjectCloseModal, setShouldOpenProjectCloseModal] = useState<boolean>(false)
  const hasClickedProjectCloseBtn = useRef<boolean>(false)
  const hasClickedCancelBtn = useRef<boolean>(false)
  const outsideResolverRef = useRef<
    ((value: PromiseResult | PromiseLike<PromiseResult>) => void) | null
  >(null)

  const onClickProjectCloseBtn = useCallback(() => {
    if (!outsideResolverRef.current) return
    hasClickedProjectCloseBtn.current = true
    outsideResolverRef.current({ hasAgreed: true })
    setShouldOpenProjectCloseModal(false)
  }, [outsideResolverRef.current])

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
  }
}
