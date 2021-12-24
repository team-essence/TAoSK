import { useUpdateGroupsByOnlineSubscription } from 'pages/projectDetail/projectDetail.gen'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GetUserQuery } from 'pages/mypage/mypage.gen'

type GroupsList = Omit<GetUserQuery['user'], 'company' | 'memo' | 'invitations'>[]

type UseChatSubscription = {
  updateGroupList: GroupsList
}

export const useOnlineSubscription = (): UseChatSubscription => {
  const { id: projectId } = useParams()
  const [updateGroupList, setUpdateGroupList] = useState<GroupsList>([])

  const { data, loading, error } = useUpdateGroupsByOnlineSubscription({
    variables: {
      project_id: String(projectId),
    },
  })

  useEffect(() => {
    if (!data) return
    setUpdateGroupList({ ...data.updateGroupsByOnline.map(group => ({ ...group.user })) })
  }, [data])

  return { updateGroupList }
}
