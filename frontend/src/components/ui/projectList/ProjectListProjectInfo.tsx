import { AVATAR_STYLE } from 'consts/avatarStyle'
import { occupationList } from 'consts/occupationList'
import React, { FC, useMemo } from 'react'
import styled from 'styled-components'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'
import { calculateMinSizeBasedOnFigmaHeight } from 'utils/calculateSizeBasedOnFigma'
import { calculateVhBasedOnFigma } from 'utils/calculateSizeBasedOnFigma'
import { useCalculateOverUsers } from 'hooks/useCalculateOverUsers'
import { UserAvatarIcon } from 'components/ui/avatar/UserAvatarIcon'
import { UserCount } from 'components/ui/avatar/UserCount'
import type { UserDatas } from 'types/userDatas'

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
  const userDatas: UserDatas = useMemo(
    () => groupsProject[selectProject].project.groups.map(group => group.user),
    [groupsProject, selectProject],
  )
  // const { maxBoxes, overUsersCount, containerRef, avatarRef } = useCalculateOverUsers(
  //   userDatas.length,
  // )

  // TODO: テスト用。後で消す
  const testUserDatas: UserDatas = [...Array(10)].map(() => userDatas[0])
  const { maxBoxes, overUsersCount, containerRef, avatarRef } = useCalculateOverUsers(
    testUserDatas.length,
  )

  return (
    <StyledProjectInfoContainer>
      {projectInfoTitle('特徴')}
      <StyledStyledProjectInfoTextStory>{story}</StyledStyledProjectInfoTextStory>
      {projectInfoTitle('依頼内容')}
      <StyledStyledProjectInfoTextOverview>{overview}</StyledStyledProjectInfoTextOverview>
      {projectInfoTitle('パーティーメンバー')}
      <StyledPartyContainer ref={containerRef}>
        {/* TODO: userが多い時のテスト用 */}
        {testUserDatas.map((data, index) => {
          const boxCount = index + 1
          if (boxCount < maxBoxes) {
            return (
              <div key={index} ref={avatarRef}>
                {/* TODO: queryでoccupation_idから職業が取れるようになったらそっちを使うようにする */}
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
                  userDatas={testUserDatas}
                />
              </div>
            )
          }
        })}
        {/* TODO: 上のテスト用を消したらこっちのコメントアウトを外す */}
        {/* TODO: groupをやめてuserDatasに変更する */}
        {/* {groupsProject[selectProject].project.groups.map((group, index) => {
          if (index > 4) return

          return (
            <UserAvatarIcon
              avatarStyleType={AVATAR_STYLE.LIST}
              iconImage={userData.icon_image}
              name={userData.name}
              occupation={occupationList[userData.occupation_id]}
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
        )} */}
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
    width: ${calculateMinSizeBasedOnFigmaWidth(98)};
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

const StyledStyledProjectInfoTextStory = styled(StyledStyledProjectInfoText)`
  height: ${calculateVhBasedOnFigma(72)};
`

const StyledStyledProjectInfoTextOverview = styled(StyledStyledProjectInfoText)`
  height: ${calculateVhBasedOnFigma(180)};
`

const StyledPartyContainer = styled.div`
  display: flex;
  position: relative;
  gap: 0 ${calculateMinSizeBasedOnFigmaWidth(6)};
`
