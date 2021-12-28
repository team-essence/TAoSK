import { useEffect, Dispatch, SetStateAction } from 'react'
import { useAuthContext } from 'providers/AuthProvider'
import {
  GetCurrentUserQuery,
  useUpdateUserDataByCreateProjectSubscription,
} from 'pages/projectDetail/getUser.gen'
import { useUpdateUserByTaskSubscription } from 'hooks/subscriptions/useUserByTaskSubscription'
import { Notifications } from 'types/notification'
import { useNotificationSubscription } from './useNotificationSubscription'

export const useFetchSubscriptionCurrentUserDataFromProjectList = (
  setUserData: Dispatch<SetStateAction<GetCurrentUserQuery['user'] | undefined>>,
  setNotifications: Dispatch<SetStateAction<Notifications>>,
) => {
  const { currentUser } = useAuthContext()
  const { updateUserByTask } = useUpdateUserByTaskSubscription()
  useNotificationSubscription(setNotifications)

  const updateUserDataByCreateProject = useUpdateUserDataByCreateProjectSubscription({
    variables: {
      user_id: String(currentUser?.uid),
    },
  })

  useEffect(() => {
    setUserData(updateUserByTask)
  }, [updateUserByTask])

  useEffect(() => {
    setUserData(updateUserDataByCreateProject.data?.projectCreate)
  }, [updateUserDataByCreateProject.data])
}
