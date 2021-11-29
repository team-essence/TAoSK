import React, { FC, useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuthContext } from 'providers/AuthProvider'
import { useUsersLazyQuery } from './projectList.gen'
import { RatingView } from 'react-simple-star-rating'
import styled from 'styled-components'
import date from 'utils/date/date'
import { MonsterAvatar } from 'components/models/monster/MonsterAvatar'
import { ProjectListHeader } from 'components/ui/header/ProjectListHeader'
import { calculateVwBasedOnFigma } from 'utils/calculateVwBasedOnFigma'
import { calculateVhBasedOnFigma } from 'utils/calculateVhBaseOnFigma'
import { Loading } from 'components/ui/loading/Loading'
import { UserAvatarIcon } from 'components/ui/avatar/UserAvatarIcon'
import { UserCount } from 'components/ui/avatar/UserCount'
import { BUTTON_COLOR_TYPE, ComplicateButton } from 'components/ui/button/ComplicateButton'
import logger from 'utils/debugger/logger'
import { occupationList } from 'consts/occupationList'
import { AVATAR_STYLE } from 'consts/avatarStyle'
import { Group } from 'types/graphql.gen'

export const ProjectList: FC = () => {
  const { currentUser } = useAuthContext()
  const router = useNavigate()
  const [getUserById, userData] = useUsersLazyQuery()
  const [selectProject, setSelectProject] = useState(0)

  useEffect(() => {
    if (!currentUser) return
    getUserById({ variables: { id: currentUser.uid } })
  }, [currentUser])

  const projectInfoTitle = (title: string) => {
    return (
      <StyledProjectInfoTitleContainer>
        <img src="/svg/project-detail_title-arrow_left.svg" alt="左矢印" />
        <StyledProjectInfoTitle>{title}</StyledProjectInfoTitle>
        <img src="/svg/project-detail_title-arrow_right.svg" alt="右矢印" />
      </StyledProjectInfoTitleContainer>
    )
  }

  const handleTransitionToProject = (id: string) => {
    router(`/projects/${id}`)
  }

  if (!currentUser) return <Navigate to="/signup" />

  if (!userData.data) return <Loading />

  return (
    <>
      <ProjectListHeader />
      <StyledProjectListPageContainer>
        <StyledProjectListContainer>
          <StyledProjectListWrapper>
            <StyledCreateProjectButton>
              <ComplicateButton
                buttonColorType={BUTTON_COLOR_TYPE.YELLOW}
                text="プロジェクト作成"
                onClick={() => logger.debug('hoge')}
              />
            </StyledCreateProjectButton>

            <StyledProjectList>
              <StyledProject></StyledProject>
            </StyledProjectList>
          </StyledProjectListWrapper>
        </StyledProjectListContainer>

        <StyledProjectDetailContainer>
          {userData.data.user.groups && (
            <StyledProjectDetail>
              <StyledProjectTitleContainer>
                <StyledProjectTitle>
                  {userData.data.user.groups[selectProject].project.name}
                </StyledProjectTitle>

                <StyledProjectOptionContainer>
                  <StyledProjectOption />
                </StyledProjectOptionContainer>
              </StyledProjectTitleContainer>

              <StyledMonsterContainer>
                <MonsterAvatar />

                <StyledMonsterStatusContainer>
                  <StyledMonsterStatus>
                    <h4>種族</h4>
                    <p>{userData.data.user.groups[selectProject].project.monster.specie.name}</p>
                  </StyledMonsterStatus>
                  <StyledMonsterStatus>
                    <h4>危険度</h4>
                    <RatingContainer>
                      <RatingView
                        ratingValue={userData.data.user.groups[selectProject].project.difficulty}>
                        <img src="/svg/star.svg" alt="スター" />
                      </RatingView>
                    </RatingContainer>
                  </StyledMonsterStatus>
                  <StyledMonsterStatus>
                    <h4>制限期限</h4>
                    <p>
                      {date.formatDay(userData.data.user.groups[selectProject].project.end_date)}
                    </p>
                  </StyledMonsterStatus>
                </StyledMonsterStatusContainer>
              </StyledMonsterContainer>

              <StyledComplicateButtonContainer>
                <ComplicateButton
                  buttonColorType={BUTTON_COLOR_TYPE.RED}
                  text="クエスト開始"
                  onClick={() =>
                    handleTransitionToProject(userData.data!.user.groups[selectProject].project.id)
                  }
                />
              </StyledComplicateButtonContainer>

              <StyledProjectInfoContainer>
                {projectInfoTitle('特徴')}
                <StyledStyledProjectInfoText>
                  {userData.data.user.groups[selectProject].project.monster.story}
                </StyledStyledProjectInfoText>
                {projectInfoTitle('依頼内容')}
                <StyledStyledProjectInfoText>
                  {userData.data.user.groups[selectProject].project.overview}
                </StyledStyledProjectInfoText>
                {projectInfoTitle('パーティーメンバー')}
                <StyledPartyContainer>
                  {userData.data.user.groups[selectProject].project.groups.map((group, index) => {
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

                  {userData.data.user.groups[selectProject].project.groups.length > 5 && (
                    <UserCount
                      userCount={userData.data.user.groups[selectProject].project.groups.length - 5}
                      groups={userData.data.user.groups[selectProject].project.groups}
                      avatarStyleType={AVATAR_STYLE.LIST}
                    />
                  )}
                </StyledPartyContainer>
              </StyledProjectInfoContainer>
            </StyledProjectDetail>
          )}
        </StyledProjectDetailContainer>
        <StyledProjectListBackground />
      </StyledProjectListPageContainer>
    </>
  )
}

const StyledProjectListPageContainer = styled.div`
  padding-top: ${({ theme }) => theme.HEADER_HEIGHT};
  display: flex;
  width: 100%;
  color: ${({ theme }) => theme.COLORS.SHIP_GRAY};
`

const StyledProjectListContainer = styled.div`
  position: relative;
  margin-top: ${calculateVhBasedOnFigma(3)};
  width: ${calculateVwBasedOnFigma(437)};
  height: ${calculateVhBasedOnFigma(770)};
  background: url('project-list_background.png');
  background-position: cover;
  background-size: cover;
  background-repeat: no-repeat;
`

const StyledProjectListWrapper = styled.div`
  position: absolute;
  top: ${calculateVwBasedOnFigma(120)};
  left: 50%;
  transform: translateX(-54%);
  width: ${calculateVwBasedOnFigma(356)};
  height: ${calculateVhBasedOnFigma(564)};
  background: #fff;
`

const StyledCreateProjectButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledProjectList = styled.ul``

const StyledProject = styled.li``

const StyledProjectDetailContainer = styled.div`
  margin-top: ${calculateVhBasedOnFigma(3)};
  width: ${calculateVwBasedOnFigma(971)};
  height: ${calculateVhBasedOnFigma(823)};
  background: url('svg/project-detail_background.svg');
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledProjectListBackground = styled.div`
  z-index: ${({ theme }) => theme.Z_INDEX.INDEX_MINUS_1};
  position: fixed;
  top: ${({ theme }) => theme.HEADER_HEIGHT};
  left: 0;
  width: 100vw;
  height: calc(100vh - ${({ theme }) => theme.HEADER_HEIGHT});
  background: url('images/project-list-page_background.webp');
  background-attachment: fixed;
  background-position: cover;
  background-size: 100% 100%;
  background-repeat: no-repeat;
`

const StyledProjectDetail = styled.div`
  width: ${calculateVhBasedOnFigma(813)};
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 1fr ${calculateVhBasedOnFigma(40)} auto;
`

const StyledComplicateButtonContainer = styled.div`
  grid-row: 4 / 5;
  grid-column: 1 / 3;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledProjectTitleContainer = styled.div`
  grid-row: 1 / 2;
  grid-column: 1 / 3;
  border-bottom: solid 1px ${({ theme }) => theme.COLORS.SILVER2};
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const StyledProjectTitle = styled.h2`
  font-size: ${calculateVhBasedOnFigma(24)};
`

const StyledProjectOptionContainer = styled.div`
  margin-right: ${calculateVhBasedOnFigma(12)};
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

const StyledProjectOption = styled.div`
  position: relative;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ theme }) => theme.COLORS.BLACK};

  &::before {
    content: '';
    position: absolute;
    right: 10px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${({ theme }) => theme.COLORS.BLACK};
  }

  &::after {
    content: '';
    left: 10px;
    position: absolute;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${({ theme }) => theme.COLORS.BLACK};
  }
`

const StyledMonsterContainer = styled.div`
  grid-row: 2 / 3;
  grid-column: 1 / 2;
`

const StyledMonsterStatusContainer = styled.div`
  width: ${calculateVhBasedOnFigma(346)};
  border-top: solid 1px ${({ theme }) => theme.COLORS.SILVER2};
  border-bottom: solid 1px ${({ theme }) => theme.COLORS.SILVER2};
`

const StyledMonsterStatus = styled.div`
  padding: ${calculateVhBasedOnFigma(6)} 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${calculateVhBasedOnFigma(16)};

  &:nth-child(2) {
    border-top: solid 1px ${({ theme }) => theme.COLORS.SILVER2};
    border-bottom: solid 1px ${({ theme }) => theme.COLORS.SILVER2};
  }
`

const RatingContainer = styled.div`
  span {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const StyledProjectInfoContainer = styled.div`
  grid-row: 2 / 3;
  grid-column: 2 / 3;
`

const StyledStyledProjectInfoText = styled.p`
  margin-bottom: ${calculateVhBasedOnFigma(12)};
  text-align: justify;
  font-size: ${calculateVhBasedOnFigma(16)};
`

const StyledProjectInfoTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    opacity: 0.2;
    width: ${calculateVwBasedOnFigma(98)};
  }
`

const StyledProjectInfoTitle = styled.h3`
  font-size: ${calculateVhBasedOnFigma(16)};
  color: ${({ theme }) => theme.COLORS.CHOCOLATE};
`

const StyledPartyContainer = styled.div`
  display: flex;
  gap: 0 ${calculateVwBasedOnFigma(6)};
`
