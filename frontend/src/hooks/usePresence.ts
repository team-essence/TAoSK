import { useEffect } from 'react'
import { useAuthContext } from 'providers/AuthProvider'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetUserByIdLazyQuery } from 'pages/auth/document.gen'
import { useUpdateOnlineFlagMutation } from 'pages/projectDetail/projectDetail.gen'

/**
 * ログインユーザーに変更があった時に画面遷移を行う
 */
export const usePresence = (): void => {
  const { currentUser } = useAuthContext()
  const { id: projectId } = useParams()
  const [updateOnlineFlag] = useUpdateOnlineFlagMutation()

  const handleBeforeUnloadEvent = async (userId: string, projectId: string, isOnline: boolean) => {
    await updateOnlineFlag({
      variables: {
        id: userId,
        project_id: projectId,
        isOnline: isOnline,
      },
    })
  }

  useEffect(() => {
    if (!currentUser || !window || !projectId) return

    handleBeforeUnloadEvent(currentUser.uid, projectId, true)

    window.addEventListener('beforeunload', () =>
      handleBeforeUnloadEvent(currentUser.uid, projectId, false),
    )

    return () => {
      window.removeEventListener('beforeunload', () =>
        handleBeforeUnloadEvent(currentUser.uid, projectId, false),
      )
    }
  }, [currentUser, window, projectId])
}
