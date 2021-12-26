import { useUpdateGroupsByGroupSubscription } from 'pages/projectDetail/projectDetail.gen'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GetUserQuery } from 'pages/mypage/mypage.gen'

type GroupsList = Omit<GetUserQuery['user'], 'company' | 'memo' | 'invitations'>[]

type UseGroupByGroupSubscription = {
  updateGroupByGroup: GroupsList
}

export const useGroupByGroupSubscription = (): UseGroupByGroupSubscription => {
  const { id: projectId } = useParams()
  const [updateGroupByGroup, setUpdateGroupByGroup] = useState<GroupsList>([])

  const { data, loading, error } = useUpdateGroupsByGroupSubscription({
    variables: {
      project_id: String(projectId),
    },
  })

  useEffect(() => {
    if (!data) return
    setUpdateGroupByGroup([...data.updateGroupsByGroup.map(group => ({ ...group.user }))])
  }, [data])

  return { updateGroupByGroup }
}
