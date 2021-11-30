import { AVATAR_STYLE } from 'consts/avatarStyle'
import { occupationList } from 'consts/occupationList'
import React, { FC } from 'react'
import styled from 'styled-components'
import { calculateMinSizeBasedOnFigma } from 'utils/calculateMinSizeBasedOnFigma'
import { calculateMinSizeBasedOnFigmaHeight } from 'utils/calculateMinSizeBasedOnFigmaHeight'
import { UserAvatarIcon } from '../avatar/UserAvatarIcon'
import { UserCount } from '../avatar/UserCount'

type Props = {
  story: string
  overview: string
  selectProject: number
  groupsProject: {
    __typename?: 'Group' | undefined
    id: string
    project: {
      __typename?: 'Project' | undefined
      id: string
      name: string
      overview: string
      created_at: any
      end_date: any
      project_end_flg: boolean
      difficulty: number
      groups: {
        __typename?: 'Group' | undefined
        id: string
        user: {
          __typename?: 'User' | undefined
          id: string
          name: string
          icon_image: string
          occupation_id: number
        }
      }[]
      monster: {
        __typename?: 'Monster' | undefined
        id: string
        name: string
        story: string
        specie: {
          __typename?: 'Specie' | undefined
          id: string
          name: string
        }
      }
    }
  }[]
}

export const ProjectListProjectInfo: FC<Props> = ({
  story,
  overview,
  selectProject,
  groupsProject,
}) => {
  const projectInfoTitle = (title: string) => {
    return (
      <StyledProjectInfoTitleContainer>
        <img src="/svg/project-detail_title-arrow_left.svg" alt="左矢印" />
        <StyledProjectInfoTitle>{title}</StyledProjectInfoTitle>
        <img src="/svg/project-detail_title-arrow_right.svg" alt="右矢印" />
      </StyledProjectInfoTitleContainer>
    )
  }

  return (
    <StyledProjectInfoContainer>
      {projectInfoTitle('特徴')}
      <StyledStyledProjectInfoText>{story}</StyledStyledProjectInfoText>
      {projectInfoTitle('依頼内容')}
      <StyledStyledProjectInfoText>{overview}</StyledStyledProjectInfoText>
      {projectInfoTitle('パーティーメンバー')}
      <StyledPartyContainer>
        {groupsProject[selectProject].project.groups.map((group, index) => {
          if (index > 4) return

          return (
            <UserAvatarIcon
              avatarStyleType={AVATAR_STYLE.LIST}
              iconImage={group.user.icon_image}
              name={group.user.name}
              occupation={occupationList[group.user.occupation_id]}
              key={index}
            />
          )
        })}

        {groupsProject[selectProject].project.groups.length > 5 && (
          <UserCount
            userCount={groupsProject[selectProject].project.groups.length - 5}
            groups={groupsProject[selectProject].project.groups}
            avatarStyleType={AVATAR_STYLE.LIST}
          />
        )}
      </StyledPartyContainer>
    </StyledProjectInfoContainer>
  )
}

const StyledProjectInfoTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    opacity: 0.2;
    width: ${calculateMinSizeBasedOnFigma(98)};
  }
`

const StyledProjectInfoTitle = styled.h3`
  font-size: ${calculateMinSizeBasedOnFigmaHeight(16)};
  color: ${({ theme }) => theme.COLORS.CHOCOLATE};
`

const StyledProjectInfoContainer = styled.div`
  grid-row: 2 / 3;
  grid-column: 2 / 3;
`

const StyledStyledProjectInfoText = styled.p`
  margin-bottom: ${calculateMinSizeBasedOnFigmaHeight(12)};
  text-align: justify;
  font-size: ${calculateMinSizeBasedOnFigmaHeight(16)};
`

const StyledPartyContainer = styled.div`
  display: flex;
  gap: 0 ${calculateMinSizeBasedOnFigma(6)};
`
