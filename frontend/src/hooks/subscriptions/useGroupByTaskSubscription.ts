import { useUpdateGroupsByTaskSubScSubscription } from 'pages/projectDetail/projectDetail.gen'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GetUserQuery } from 'pages/mypage/mypage.gen'

type GroupsList = Omit<GetUserQuery['user'], 'company' | 'memo' | 'invitations'>[]

type UseGroupByTaskSubscription = {
  updateGroupListByTask: GroupsList
}

export const useGroupByTaskSubscription = (): UseGroupByTaskSubscription => {
  const { id: projectId } = useParams()
  const [updateGroupListByTask, setUpdateGroupListByTask] = useState<GroupsList>([])

  const { data, loading, error } = useUpdateGroupsByTaskSubScSubscription({
    variables: {
      project_id: String(projectId),
    },
  })

  useEffect(() => {
    if (!data) return
    setUpdateGroupListByTask([...data.updateGroupsByTask.map(group => ({ ...group.user }))])
  }, [data])

  return { updateGroupListByTask }
}
