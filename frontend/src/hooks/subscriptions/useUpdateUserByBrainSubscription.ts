import { GetCurrentUserQuery, useUpdateUpdateUserDataByBrainSubscription } from 'pages/projectDetail/getUser.gen'
import { useAuthContext } from 'providers/AuthProvider'
import { useEffect, useState } from 'react'
import logger from 'utils/debugger/logger'

type UseUpdateUserByBrainSubscription = {
  updateUserByBrain: GetCurrentUserQuery['user'] | undefined
}

export const useUpdateUserByBrainSubscription = (): UseUpdateUserByBrainSubscription => {
  const { currentUser } = useAuthContext()
  const [updateUserByBrain, setUpdateUserByBrain] = useState<GetCurrentUserQuery['user']>()

  const { data } = useUpdateUpdateUserDataByBrainSubscription({
    variables: {
      user_id: String(currentUser?.uid),
    },
  })

  useEffect(() => {
    if (!data) return

    logger.debug(data.updateUserDataByBrain)
    setUpdateUserByBrain({ ...data.updateUserDataByBrain })
  }, [data])

  return { updateUserByBrain }
}
