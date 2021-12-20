import { useEffect } from 'react'
import { useGetCurrentUserLazyQuery } from 'pages/projectDetail/getUser.gen'
import { useAuthContext } from 'providers/AuthProvider'

type UseGetCurrentUserDataReturn = {
  getCurrentUser: ReturnType<typeof useGetCurrentUserLazyQuery>[0]
  currentUserData: ReturnType<typeof useGetCurrentUserLazyQuery>[1]
  firebaseCurrentUser: ReturnType<typeof useAuthContext>['currentUser']
}

/**
 * 現在のユーザーデータを返す
 */
export const useGetCurrentUserData = (): UseGetCurrentUserDataReturn => {
  const { currentUser: firebaseCurrentUser } = useAuthContext()
  const [getCurrentUser, currentUserData] = useGetCurrentUserLazyQuery({})

  useEffect(() => {
    if (!firebaseCurrentUser) return
    getCurrentUser({
      variables: {
        id: firebaseCurrentUser.uid,
      },
    })
  }, [firebaseCurrentUser])

  return { getCurrentUser, currentUserData, firebaseCurrentUser }
}
