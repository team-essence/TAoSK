import { useEffect } from 'react'
import { useGetCurrentUserLazyQuery } from 'pages/projectDetail/getUser.gen'
import { useAuthContext } from 'providers/AuthProvider'

type UseGetCurrentUserDataReturn = {
  getCurrentUser: ReturnType<typeof useGetCurrentUserLazyQuery>[0]
  currentUserData: ReturnType<typeof useGetCurrentUserLazyQuery>[1]
}

/**
 * 現在のユーザーデータを返す
 */
export const useGetCurrentUserData = (): UseGetCurrentUserDataReturn => {
  const { currentUser } = useAuthContext()
  const [getCurrentUser, currentUserData] = useGetCurrentUserLazyQuery({})

  useEffect(() => {
    if (!currentUser) return
    getCurrentUser({
      variables: {
        id: currentUser.uid,
      },
    })
  }, [currentUser])

  return { getCurrentUser, currentUserData }
}
