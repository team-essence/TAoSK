import { useEffect, Dispatch, SetStateAction } from 'react'
import { GetCurrentUserQuery } from 'pages/projectDetail/getUser.gen'
import { useUpdateUserByTaskSubscription } from 'hooks/subscriptions/useUserByTaskSubscription'
import { RANK_INTERVAL } from 'consts/rank'
import { Notifications } from 'types/notification'
import logger from 'utils/debugger/logger'
import toast from 'utils/toast/toast'
import Exp from 'utils/exp/exp'
import { useNotificationSubscription } from './useNotificationSubscription'
import { useUpdateUserByBrainSubscription } from './useUpdateUserByBrainSubscription'

export const useFetchSubscriptionCurrentUserDataFromProjectDetail = (
  currentUserData: GetCurrentUserQuery['user'] | undefined,
  setUserData: Dispatch<SetStateAction<GetCurrentUserQuery['user'] | undefined>>,
  setNotifications: Dispatch<SetStateAction<Notifications>>,
) => {
  const { updateUserByTask } = useUpdateUserByTaskSubscription()
  const { updateUserByBrain } = useUpdateUserByBrainSubscription()
  useNotificationSubscription(setNotifications)

  useEffect(() => {
    logger.debug(updateUserByTask)
    if (!updateUserByTask) return

    if (currentUserData && Exp.toLevel(updateUserByTask.exp) > Exp.toLevel(currentUserData.exp)) {
      toast.success('レベルが上がりました')
    }

    if (
      currentUserData &&
      (updateUserByTask.technology / RANK_INTERVAL > currentUserData.technology / RANK_INTERVAL ||
        updateUserByTask.solution / RANK_INTERVAL > currentUserData.solution / RANK_INTERVAL ||
        updateUserByTask.achievement / RANK_INTERVAL >
          currentUserData.achievement / RANK_INTERVAL ||
        updateUserByTask.plan / RANK_INTERVAL > currentUserData.plan / RANK_INTERVAL ||
        updateUserByTask.technology / RANK_INTERVAL > currentUserData.technology / RANK_INTERVAL ||
        updateUserByTask.technology / RANK_INTERVAL > currentUserData.technology / RANK_INTERVAL)
    ) {
      toast.success('ランクアップ')
    }

    setUserData({ ...updateUserByTask })
  }, [updateUserByTask])

  useEffect(() => {
    if (!updateUserByBrain) return
    setUserData({ ...updateUserByBrain })
  }, [updateUserByBrain])
}
