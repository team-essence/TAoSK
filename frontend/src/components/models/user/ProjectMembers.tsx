import React, { FC } from 'react'
import { GetProjectQuery } from 'pages/projectList/projectDetail/projectDetail.gen'
import { OnlineStatusLabel } from 'components/models/user/OnlineStatusLabel'

type Groups = Pick<GetProjectQuery['getProjectById'], 'groups'>

type Props = {
  className?: string
} & Partial<Groups>

export const ProjectMembers: FC<Props> = ({ groups }) => {
  return (
    <div>
      <OnlineStatusLabel label="オンライン" status={true} />
      {groups?.map(
        (group, index) =>
          group.user.online_flg && (
            <div key={index}>
              <p>{group.user.name}</p>
              <p>{group.user.icon_image}</p>
              <p>{group.user.id}</p>
              <p>{group.user.mp}</p>
              <p>{group.user.hp}</p>
              <p>{group.user.occupation_id}</p>
              <p>{JSON.stringify(group.user.online_flg)}</p>
            </div>
          ),
      )}
      <OnlineStatusLabel label="オフライン" status={false} />
      {groups?.map(
        (group, index) =>
          !group.user.online_flg && (
            <div key={index}>
              <p>{group.user.name}</p>
              <p>{group.user.icon_image}</p>
              <p>{group.user.id}</p>
              <p>{group.user.mp}</p>
              <p>{group.user.hp}</p>
              <p>{group.user.occupation_id}</p>
              <p>{JSON.stringify(group.user.online_flg)}</p>
            </div>
          ),
      )}
    </div>
  )
}
