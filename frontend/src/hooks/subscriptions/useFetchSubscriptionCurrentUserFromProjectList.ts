import { useEffect, Dispatch, SetStateAction } from 'react'
import { GetCurrentUserQuery } from 'pages/projectDetail/getUser.gen'
import { useUpdateUserByTaskSubscription } from 'hooks/subscriptions/useUserByTaskSubscription'
import { Notifications } from 'types/notification'
import { useNotificationSubscription } from './useNotificationSubscription'

export const useFetchSubscriptionCurrentUserDataFromProjectList = (
  setUserData: Dispatch<SetStateAction<GetCurrentUserQuery['user'] | undefined>>,
  setNotifications: Dispatch<SetStateAction<Notifications>>,
) => {
  const { updateUserByTask } = useUpdateUserByTaskSubscription()
  useNotificationSubscription(setNotifications)

  useEffect(() => {
    setUserData(updateUserByTask)
  }, [updateUserByTask])
}
