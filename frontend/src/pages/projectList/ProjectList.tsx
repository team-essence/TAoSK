import React, { FC, useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuthContext } from 'providers/AuthProvider'
import { useUsersLazyQuery } from './projectList.gen'
import styled from 'styled-components'
import { ProjectListHeader } from 'components/ui/header/ProjectListHeader'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'
import { calculateMinSizeBasedOnFigmaHeight } from 'utils/calculateSizeBasedOnFigma'
import { Loading } from 'components/ui/loading/Loading'
import { BUTTON_COLOR_TYPE, ComplicateButton } from 'components/ui/button/ComplicateButton'
import logger from 'utils/debugger/logger'
import { ACTIVE_STATUS, ProjectListItem } from 'components/ui/projectList/ProjectListItem'
import { ProjectListMonster } from 'components/ui/projectList/ProjectListMonster'
import { ProjectListProjectInfo } from 'components/ui/projectList/ProjectListProjectInfo'
import { calculateVhBasedOnFigma } from 'utils/calculateSizeBasedOnFigma'
import { calculateVwBasedOnFigma } from 'utils/calculateSizeBasedOnFigma'
import { Notifications } from 'types/notification'

export const ProjectList: FC = () => {
  const { currentUser } = useAuthContext()
  const router = useNavigate()
  const [getUserById, userData] = useUsersLazyQuery({
    onCompleted(data) {
      const notifications = data.user.invitations.map(invitation => {
        return {
          id: invitation.project.id,
          name: invitation.project.name,
          createAt: invitation.created_at,
        }
      })
      setNotifications(notifications)
    },
  })
  const [selectProject, setSelectProject] = useState(0)
  const [notifications, setNotifications] = useState<Notifications>([])

  useEffect(() => {
    if (!currentUser) return
    getUserById({ variables: { id: currentUser.uid } })
  }, [currentUser])

  const handleTransitionToProject = (id: string) => {
    router(`/projects/${id}`)
  }

  if (!currentUser) return <Navigate to="/signup" />

  if (!userData.data) return <Loading />

  return (
    <>
      <ProjectListHeader
        iconImage={userData.data.user.icon_image}
        name={userData.data.user.name}
        uid={userData.data.user.id}
        totalExp={userData.data.user.exp}
        notifications={notifications}
      />

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

            <StyledProjectListScroll>
              <StyledProjectList>
                {userData.data.user.groups.map((group, index) => (
                  <StyledProject key={index} onClick={() => setSelectProject(index)}>
                    <ProjectListItem
                      activeStatue={
                        index === selectProject ? ACTIVE_STATUS.ACTIVE : ACTIVE_STATUS.NOT_ACTIVE
                      }
                      isEnd={group.project.project_end_flg}
                      projectTitle={group.project.name}
                      startDate={group.project.created_at}
                      endDate={group.project.end_date}
                    />
                  </StyledProject>
                ))}
              </StyledProjectList>
            </StyledProjectListScroll>
          </StyledProjectListWrapper>
        </StyledProjectListContainer>

        <StyledProjectDetailContainer>
          {!!userData.data.user.groups.length && (
            <StyledProjectDetail>
              <StyledProjectTitleContainer>
                <StyledProjectTitle>
                  {userData.data.user.groups[selectProject].project.name}
                </StyledProjectTitle>

                <StyledProjectOptionContainer>
                  <StyledProjectOption />
                </StyledProjectOptionContainer>
              </StyledProjectTitleContainer>

              <ProjectListMonster
                specie={userData.data.user.groups[selectProject].project.monster.specie.name}
                difficulty={userData.data.user.groups[selectProject].project.difficulty}
                limitDeadline={userData.data.user.groups[selectProject].project.end_date}
              />

              <StyledComplicateButtonContainer>
                <ComplicateButton
                  buttonColorType={BUTTON_COLOR_TYPE.RED}
                  text="クエスト開始"
                  onClick={() =>
                    handleTransitionToProject(userData.data!.user.groups[selectProject].project.id)
                  }
                />
              </StyledComplicateButtonContainer>

              <ProjectListProjectInfo
                story={userData.data.user.groups[selectProject].project.monster.story}
                overview={userData.data.user.groups[selectProject].project.overview}
                selectProject={selectProject}
                groupsProject={userData.data.user.groups}
              />
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
  margin-top: ${calculateMinSizeBasedOnFigmaWidth(3)};
  margin-left: ${calculateMinSizeBasedOnFigmaHeight(-10)};
  width: ${calculateMinSizeBasedOnFigmaWidth(437)};
  height: ${calculateMinSizeBasedOnFigmaHeight(786)};
  background: url('/svg/project-list_background.svg');
  background-position: cover;
  background-size: cover;
  background-repeat: no-repeat;
`

const StyledProjectListWrapper = styled.div`
  position: absolute;
  top: ${calculateMinSizeBasedOnFigmaWidth(120)};
  left: 50%;
  transform: translateX(-52%);
  width: ${calculateMinSizeBasedOnFigmaWidth(460)};
  height: ${calculateMinSizeBasedOnFigmaHeight(584)};
`

const StyledCreateProjectButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: ${calculateMinSizeBasedOnFigmaHeight(24)};
`

const StyledProjectListScroll = styled.div`
  display: flex;
  justify-content: center;
  overflow-y: scroll;
  direction: rtl;
  height: calc(100% - ${calculateMinSizeBasedOnFigmaHeight(52)});
`

const StyledProjectList = styled.ul`
  width: ${calculateMinSizeBasedOnFigmaWidth(396)};
`

const StyledProject = styled.li`
  cursor: pointer;
`

const StyledProjectDetailContainer = styled.div`
  padding: 28px;
  margin-top: ${calculateVhBasedOnFigma(28)};
  width: ${calculateVwBasedOnFigma(977)};
  min-height: ${calculateVhBasedOnFigma(758)};
  background: url('/svg/project-detail_background.svg');
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
  background: url('/images/project-list-page_background.webp');
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
  border-bottom: solid 1px ${({ theme }) => theme.COLORS.SILVER};
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
