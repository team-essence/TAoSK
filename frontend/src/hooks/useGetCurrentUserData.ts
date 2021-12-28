import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { GetCurrentUserQuery, useGetCurrentUserLazyQuery } from 'pages/projectDetail/getUser.gen'
import { useAuthContext } from 'providers/AuthProvider'
import { Notifications } from 'types/notification'

type UseGetCurrentUserDataReturn = {
  getCurrentUser: ReturnType<typeof useGetCurrentUserLazyQuery>[0]
  currentUserData: GetCurrentUserQuery['user'] | undefined
  firebaseCurrentUser: ReturnType<typeof useAuthContext>['currentUser']
  notifications: Notifications
  setUserData: Dispatch<SetStateAction<GetCurrentUserQuery['user'] | undefined>>
  setNotifications: Dispatch<SetStateAction<Notifications>>
}

/**
 * 現在のユーザーデータを返す
 */
export const useGetCurrentUserData = (): UseGetCurrentUserDataReturn => {
  const { currentUser: firebaseCurrentUser } = useAuthContext()
  const [getCurrentUser, currentUserData] = useGetCurrentUserLazyQuery({
    onCompleted(data) {
      const notifications: Notifications = data.user.invitations.map(invitation => {
        return {
          ...invitation.project,
          createAt: invitation.created_at,
        }
      })
      setNotifications(notifications)
    },
  })
  const [userData, setUserData] = useState<GetCurrentUserQuery['user']>()
  const [notifications, setNotifications] = useState<Notifications>([])

  useEffect(() => {
    if (!firebaseCurrentUser) return
    getCurrentUser({
      variables: {
        id: firebaseCurrentUser.uid,
      },
    })
  }, [firebaseCurrentUser])

  useEffect(() => {
    setUserData(currentUserData.data?.user)
  }, [currentUserData])

  return {
    getCurrentUser,
    currentUserData: userData,
    firebaseCurrentUser,
    notifications,
    setUserData,
    setNotifications,
  }
}
