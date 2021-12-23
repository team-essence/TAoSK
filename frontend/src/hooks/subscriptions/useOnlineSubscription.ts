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
    setUpdateGroupList(
      data.updateGroupsByOnline.map(group => {
        return {
          id: group.user.id,
          name: group.user.name,
          icon_image: group.user.icon_image,
          hp: group.user.hp,
          mp: group.user.mp,
          exp: group.user.exp,
          online_flg: group.user.online_flg,
          technology: group.user.technology,
          achievement: group.user.achievement,
          motivation: group.user.motivation,
          solution: group.user.solution,
          plan: group.user.plan,
          design: group.user.design,
          interests: group.user.interests,
          certifications: group.user.certifications,
          occupation: group.user.occupation,
        }
      }),
    )
  }, [data])

  return { updateGroupList }
}
