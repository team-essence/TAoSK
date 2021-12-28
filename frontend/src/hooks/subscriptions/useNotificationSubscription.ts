import { useEffect, Dispatch, SetStateAction } from 'react'
import { useAuthContext } from 'providers/AuthProvider'
import {
  useNewNotificationsByCreateProjectSubScSubscription,
  useNewNotificationsSubScSubscription,
} from 'pages/projectDetail/getUser.gen'
import { Notifications } from 'types/notification'

export const useNotificationSubscription = (
  setNotifications: Dispatch<SetStateAction<Notifications>>,
) => {
  const { currentUser } = useAuthContext()

  const newNotifications = useNewNotificationsSubScSubscription({
    variables: {
      user_id: String(currentUser?.uid),
    },
  })
  const newNotificationsByCreateProject = useNewNotificationsByCreateProjectSubScSubscription({
    variables: {
      user_id: String(currentUser?.uid),
    },
  })
  useEffect(() => {
    if (!newNotifications.data) return

    const notifications: Notifications = newNotifications.data.newInvitation.map(invitation => {
      return {
        ...invitation.project,
        createAt: invitation.created_at,
      }
    })
    setNotifications(notifications)
  }, [newNotifications.data])

  useEffect(() => {
    if (!newNotificationsByCreateProject.data) return

    const notifications: Notifications =
      newNotificationsByCreateProject.data.newInvitationByCreateProject.map(invitation => {
        return {
          ...invitation.project,
          createAt: invitation.created_at,
        }
      })
    setNotifications(notifications)
  }, [newNotificationsByCreateProject.data])
}
