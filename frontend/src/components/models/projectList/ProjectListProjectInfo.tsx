import React, { FCX, useMemo } from 'react'
import { AVATAR_STYLE } from 'consts/avatarStyle'
import styled from 'styled-components'
import { calculateMinSizeBasedOnFigma } from 'utils/calculateSizeBasedOnFigma'
import { useCalculateOverUsers } from 'hooks/useCalculateOverUsers'
import { UserAvatarIcon } from 'components/ui/avatar/UserAvatarIcon'
import { UserCount } from 'components/ui/avatar/UserCount'
import type { UserData } from 'types/userData'
import { UsersQuery } from 'pages/projectList/projectList.gen'

type Props = {
  story?: string
  overview?: string
  selectProject: number
  groupsProject: UsersQuery['user']['groups']
}

export const ProjectListProjectInfo: FCX<Props> = ({
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
  const userData: UserData = useMemo(
    () => groupsProject[selectProject].project.groups.map(group => group.user),
    [groupsProject, selectProject],
  )
  const { maxBoxes, overUsersCount, containerRef, avatarRef } = useCalculateOverUsers(
    userData.length,
  )

  // TODO: ユーザーが多い時の挙動を確かめるテスト用。本番では消す
  // const testUserData: UserData = [...Array(10)].map(() => userData[0])
  // const { maxBoxes, overUsersCount, containerRef, avatarRef } = useCalculateOverUsers(
  //   testUserData.length,
  // )

  return (
    <StyledProjectInfoContainer>
      {projectInfoTitle('特徴')}
      <StyledStyledProjectInfoTextStory>{story}</StyledStyledProjectInfoTextStory>
      {projectInfoTitle('依頼内容')}
      <StyledStyledProjectInfoTextOverview>{overview}</StyledStyledProjectInfoTextOverview>
      {projectInfoTitle('パーティーメンバー')}
      <StyledPartyContainer ref={containerRef}>
        {/* TODO: userが多い時のテスト用, 本番では消す */}
        {/* {testUserData.map((data, index) => {
          const boxCount = index + 1
          if (boxCount < maxBoxes) {
            return (
              <div key={index} ref={avatarRef}>
                <UserAvatarIcon
                  avatarStyleType={AVATAR_STYLE.LIST}
                  iconImage={data.icon_image}
                  name={data.name}
                  occupation={occupationList[data.occupation_id]}
                />
              </div>
            )
          } else if (boxCount === maxBoxes) {
            return (
              <div key={index}>
                <UserCount
                  avatarStyleType={AVATAR_STYLE.LIST}
                  userCount={overUsersCount}
                  userData={testUserData}
                />
              </div>
            )
          }
        })} */}
        {userData.map((data, index) => {
          const boxCount = index + 1
          if (boxCount < maxBoxes) {
            return (
              <div key={index} ref={avatarRef}>
                <UserAvatarIcon
                  avatarStyleType={AVATAR_STYLE.LIST}
                  iconImage={data.icon_image}
                  name={data.name}
                  occupation={data.occupation.name}
                />
              </div>
            )
          } else if (boxCount === maxBoxes) {
            return (
              <div key={index}>
                <UserCount
                  avatarStyleType={AVATAR_STYLE.LIST}
                  userCount={overUsersCount}
                  userData={userData}
                />
              </div>
            )
          }
        })}
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
  font-size: ${calculateMinSizeBasedOnFigma(16)};
  color: ${({ theme }) => theme.COLORS.CHOCOLATE};
`

const StyledProjectInfoContainer = styled.div`
  grid-row: 2 / 3;
  grid-column: 2 / 3;
`

const StyledStyledProjectInfoText = styled.p`
  margin-bottom: ${calculateMinSizeBasedOnFigma(12)};
  text-align: justify;
  font-size: ${calculateMinSizeBasedOnFigma(16)};
`

const StyledStyledProjectInfoTextStory = styled(StyledStyledProjectInfoText)`
  height: ${calculateMinSizeBasedOnFigma(72)};
`

const StyledStyledProjectInfoTextOverview = styled(StyledStyledProjectInfoText)`
  height: ${calculateMinSizeBasedOnFigma(180)};
`

const StyledPartyContainer = styled.div`
  display: flex;
  position: relative;
  gap: 0 ${calculateMinSizeBasedOnFigma(6)};
`
