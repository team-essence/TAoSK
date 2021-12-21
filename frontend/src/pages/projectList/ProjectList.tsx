import React, { FC, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { DEFAULT_USER } from 'consts/defaultImages'
import { useAuthContext } from 'providers/AuthProvider'
import { useUsersLazyQuery } from './projectList.gen'
import { ContentWrapper } from 'components/ui/wrapper/ContentWrapper'
import { ProjectListHeader } from 'components/ui/header/ProjectListHeader'
import { ProjectListCreateModal } from 'components/models/projectList/ProjectListCreateModal'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'
import { calculateMinSizeBasedOnFigmaHeight } from 'utils/calculateSizeBasedOnFigma'
import { BUTTON_COLOR_TYPE, ComplicateButton } from 'components/ui/button/ComplicateButton'
import { ACTIVE_STATUS, ProjectListItem } from 'components/models/projectList/ProjectListItem'
import { LazyLoading } from 'components/ui/loading/LazyLoading'
import { Notifications } from 'types/notification'
import styled from 'styled-components'
import { ProjectListDetail } from 'components/models/projectList/ProjectListDetail'

export const ProjectList: FC = () => {
  const { currentUser } = useAuthContext()
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
  const [shouldShowModal, setShouldShowModal] = useState<boolean>(false)

  useEffect(() => {
    if (!currentUser) return
    getUserById({ variables: { id: currentUser.uid } })
  }, [currentUser])

  if (!currentUser) return <Navigate to="/signup" />

  return (
    <>
      <LazyLoading />
      <ContentWrapper>
        <ProjectListHeader
          iconImage={userData.data?.user.icon_image ?? DEFAULT_USER}
          name={userData.data?.user.name ?? ''}
          uid={userData.data?.user.id ?? ''}
          totalExp={userData.data?.user.exp ?? 0}
          notifications={notifications}
        />

        <StyledProjectListPageContainer>
          <StyledProjectListContainer>
            <StyledProjectListWrapper>
              <StyledCreateProjectButton>
                <ComplicateButton
                  buttonColorType={BUTTON_COLOR_TYPE.YELLOW}
                  text="プロジェクト作成"
                  onClick={() => setShouldShowModal(true)}
                />
              </StyledCreateProjectButton>

              <StyledProjectListScroll>
                <StyledProjectList>
                  {userData.data?.user.groups.map((group, index) => (
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

          <ProjectListDetail
            isJoiningProject={!!userData.data?.user.groups.length}
            userQuery={userData.data}
            selectProject={selectProject}
            openModal={() => setShouldShowModal(true)}
          />

          <StyledProjectListBackground />
        </StyledProjectListPageContainer>

        <ProjectListCreateModal
          shouldShow={shouldShowModal}
          closeModal={() => setShouldShowModal(false)}
        />
      </ContentWrapper>
    </>
  )
}

const StyledProjectListPageContainer = styled.div`
  position: relative;
  display: flex;
  padding-top: ${({ theme }) => theme.HEADER_HEIGHT};
  max-width: ${({ theme }) => theme.MAX_WIDTH};
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

const StyledProjectListBackground = styled.div`
  z-index: ${({ theme }) => theme.Z_INDEX.INDEX_MINUS_1};
  position: absolute;
  top: ${({ theme }) => theme.HEADER_HEIGHT};
  left: 0;
  max-width: ${({ theme }) => theme.MAX_WIDTH};
  width: 100vw;
  height: calc(100vh - ${({ theme }) => theme.HEADER_HEIGHT});
  background: url('/images/project-list-page_background.webp');
  background-attachment: fixed;
  background-size: 100% 100%;
  background-repeat: no-repeat;
`
