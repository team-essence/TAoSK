import { useEffect, Dispatch, SetStateAction } from 'react'
import { GetCurrentUserQuery } from 'pages/projectDetail/getUser.gen'
import { useUpdateUserByTaskSubscription } from 'hooks/subscriptions/useUserByTaskSubscription'
import { Notifications } from 'types/notification'
import logger from 'utils/debugger/logger'
import toast from 'utils/toast/toast'
import Exp from 'utils/exp/exp'
import { useNotificationSubscription } from './useNotificationSubscription'

export const useFetchSubscriptionCurrentUserDataFromProjectDetail = (
  currentUserData: GetCurrentUserQuery['user'] | undefined,
  setUserData: Dispatch<SetStateAction<GetCurrentUserQuery['user'] | undefined>>,
  setNotifications: Dispatch<SetStateAction<Notifications>>,
) => {
  const { updateUserByTask } = useUpdateUserByTaskSubscription()
  useNotificationSubscription(setNotifications)

  useEffect(() => {
    logger.debug(updateUserByTask, 'hogehoge')
    if (!updateUserByTask) return

    if (currentUserData && Exp.toLevel(updateUserByTask.exp) > Exp.toLevel(currentUserData.exp)) {
      toast.success(
        'レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！レベルアップ！！！！！',
      )
    }

    setUserData(updateUserByTask)
  }, [updateUserByTask])
}