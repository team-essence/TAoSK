import { useEffect, useState } from 'react'
import {
  GetCurrentUserQuery,
  useGetCurrentUserLazyQuery,
  useNewNotificationsByCreateProjectSubScSubscription,
  useNewNotificationsSubScSubscription,
} from 'pages/projectDetail/getUser.gen'
import { useAuthContext } from 'providers/AuthProvider'
import { Notifications } from 'types/notification'
import logger from 'utils/debugger/logger'
import { useUpdateUserByTaskSubscription } from './subscriptions/useUserByTaskSubscription'
import toast from 'utils/toast/toast'
import Exp from 'utils/exp/exp'

type UseGetCurrentUserDataReturn = {
  getCurrentUser: ReturnType<typeof useGetCurrentUserLazyQuery>[0]
  currentUserData: GetCurrentUserQuery['user'] | undefined
  firebaseCurrentUser: ReturnType<typeof useAuthContext>['currentUser']
  notifications: Notifications
}

/**
 * 現在のユーザーデータを返す
 */
export const useGetCurrentUserData = (): UseGetCurrentUserDataReturn => {
  const { currentUser: firebaseCurrentUser } = useAuthContext()
  const { updateUserByTask } = useUpdateUserByTaskSubscription()
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
  const newNotifications = useNewNotificationsSubScSubscription({
    variables: {
      user_id: String(firebaseCurrentUser?.uid),
    },
  })
  const newNotificationsByCreateProject = useNewNotificationsByCreateProjectSubScSubscription({
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
    setUserData(currentUserData.data?.user)
  }, [currentUserData])

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

  useEffect(() => {
    if (!newNotificationsByCreateProject.data) return
    logger.debug(newNotificationsByCreateProject.data)

    const notifications: Notifications =
      newNotificationsByCreateProject.data.newInvitationByCreateProject.map(invitation => {
        return {
          ...invitation.project,
          createAt: invitation.created_at,
        }
      })
    setNotifications(notifications)
  }, [newNotificationsByCreateProject.data])

  useEffect(() => {
    logger.debug(updateUserByTask)
    if (!updateUserByTask) return

    if (userData && Exp.toLevel(updateUserByTask.exp) > Exp.toLevel(userData.exp)) {
      toast.success(
        'レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！',
      )
    }

    setUserData(updateUserByTask)
  }, [updateUserByTask])

  return { getCurrentUser, currentUserData: userData, firebaseCurrentUser, notifications }
}
