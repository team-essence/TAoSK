import { GetUserQuery } from 'pages/mypage/mypage.gen'
import { useUpdateUserByTaskSubScSubscription } from 'pages/projectDetail/projectDetail.gen'
import { useAuthContext } from 'providers/AuthProvider'
import { useEffect, useState } from 'react'

type UseUpdateUserByTaskSubscription = {
  updateUserByTask: GetUserQuery['user'] | undefined
}

export const useUpdateUserByTaskSubscription = (): UseUpdateUserByTaskSubscription => {
  const { currentUser } = useAuthContext()
  const [updateUserByTask, setUpdateUserByTask] = useState<GetUserQuery['user']>()

  const { data } = useUpdateUserByTaskSubScSubscription({
    variables: {
      user_id: String(currentUser?.uid),
    },
  })

  useEffect(() => {
    setUpdateUserByTask(
      data?.updateUserByTask
        .filter(user => {
          return user.id == String(currentUser?.uid)
        })
        .shift() ?? undefined,
    )
  }, [data])

  return { updateUserByTask }
}
