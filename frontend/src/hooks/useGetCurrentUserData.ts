import { useEffect, useState } from 'react'
import {
  useGetCurrentUserLazyQuery,
  useNewNotificationsSubScSubscription,
} from 'pages/projectDetail/getUser.gen'
import { useAuthContext } from 'providers/AuthProvider'
import { Notifications } from 'types/notification'
import logger from 'utils/debugger/logger'

type UseGetCurrentUserDataReturn = {
  getCurrentUser: ReturnType<typeof useGetCurrentUserLazyQuery>[0]
  currentUserData: ReturnType<typeof useGetCurrentUserLazyQuery>[1]
  firebaseCurrentUser: ReturnType<typeof useAuthContext>['currentUser']
  notifications: Notifications
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
  const [notifications, setNotifications] = useState<Notifications>([])
  const newNotifications = useNewNotificationsSubScSubscription({
    variables: {
      user_id: String(firebaseCurrentUser?.uid),
    },
  })

  useEffect(() => {
    if (!firebaseCurrentUser) return
    getCurrentUser({
      variables: {
        id: firebaseCurrentUser.uid,
      },
    })
  }, [firebaseCurrentUser])

  useEffect(() => {
    if (!newNotifications.data) return
    logger.debug(newNotifications.data)

    const notifications: Notifications = newNotifications.data.newInvitation.map(invitation => {
      return {
        ...invitation.project,
        createAt: invitation.created_at,
      }
    })
    setNotifications(notifications)
  }, [newNotifications.data])

  return { getCurrentUser, currentUserData, firebaseCurrentUser, notifications }
}
