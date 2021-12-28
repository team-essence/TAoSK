import { useEffect, Dispatch, SetStateAction } from 'react'
import { useAuthContext } from 'providers/AuthProvider'
import {
  GetCurrentUserQuery,
  useUpdateUserDataByCertificationSubScSubscription,
  useUpdateUserDataByInterestSubScSubscription,
  useUpdateUserDataSubScSubscription,
} from 'pages/projectDetail/getUser.gen'
import { useUpdateUserByTaskSubscription } from 'hooks/subscriptions/useUserByTaskSubscription'
import { Notifications } from 'types/notification'
import { useNotificationSubscription } from './useNotificationSubscription'

export const useFetchSubscriptionCurrentUserDataFromMyPage = (
  setUserData: Dispatch<SetStateAction<GetCurrentUserQuery['user'] | undefined>>,
  setNotifications: Dispatch<SetStateAction<Notifications>>,
) => {
  const { currentUser } = useAuthContext()
  const { updateUserByTask } = useUpdateUserByTaskSubscription()
  useNotificationSubscription(setNotifications)

  const updateUserData = useUpdateUserDataSubScSubscription({
    variables: {
      user_id: String(currentUser?.uid),
    },
  })
  const updateUserDataByCertification = useUpdateUserDataByCertificationSubScSubscription({
    variables: {
      user_id: String(currentUser?.uid),
    },
  })
  const updateUserDataByInterest = useUpdateUserDataByInterestSubScSubscription({
    variables: {
      user_id: String(currentUser?.uid),
    },
  })

  useEffect(() => {
    setUserData(updateUserByTask)
  }, [updateUserByTask])

  useEffect(() => {
    setUserData(updateUserData.data?.updateUserData)
  }, [updateUserData.data])

  useEffect(() => {
    setUserData(updateUserDataByCertification.data?.updateUserDataByCertification)
  }, [updateUserDataByCertification.data])

  useEffect(() => {
    setUserData(updateUserDataByInterest.data?.updateUserDataByInterest)
  }, [updateUserDataByInterest.data])
}
