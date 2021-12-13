import React, { FC, useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { DEFAUT_USER } from 'consts/defaultImages'
import { Notifications } from 'types/notification'
import { useAuthContext } from 'providers/AuthProvider'
import { useGetUserLazyQuery } from './mypage.gen'
import { ProjectListHeader } from 'components/ui/header/ProjectListHeader'
import {
  calculateMinSizeBasedOnFigmaHeight,
  calculateMinSizeBasedOnFigmaWidth,
} from 'utils/calculateSizeBasedOnFigma'
import { MyPageUserInfo } from 'components/models/myPage/MyPageUserInfo'
import { MyPageStatus } from 'components/models/myPage/MyPageStatus'
import { MyPageTags } from 'components/models/myPage/MyPageTags'
import { LazyLoading } from 'components/ui/loading/LazyLoading'
import styled, { css } from 'styled-components'

export const MyPage: FC = () => {
  const { currentUser } = useAuthContext()
  const { id } = useParams()
  const [notifications, setNotifications] = useState<Notifications>([])
  const [getUserById, userQuery] = useGetUserLazyQuery({
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

  useEffect(() => {
    if (!currentUser) return
    getUserById({ variables: { id: currentUser.uid } })
  }, [currentUser, getUserById])

  if (!currentUser) return <Navigate to="/" />
  if (currentUser.uid !== id) return <Navigate to="/" />

  return (
    <>
      <LazyLoading />
      <ProjectListHeader
        iconImage={userQuery.data?.user.icon_image ?? DEFAUT_USER}
        name={userQuery.data?.user.name ?? ''}
        uid={userQuery.data?.user.id ?? ''}
        totalExp={userQuery.data?.user.exp ?? 0}
        notifications={notifications}
      />

      <StyledMyPageContainer>
        <StyledMyPageGridContainer>
          <MyPageUserInfo
            iconImage={userQuery.data?.user.icon_image ?? DEFAUT_USER}
            name={userQuery.data?.user.name ?? ''}
            uid={userQuery.data?.user.id ?? ''}
            company={userQuery.data?.user.company ?? ''}
            totalExp={userQuery.data?.user.exp ?? 0}
            occupation={userQuery.data?.user.occupation.name ?? ''}
            hp={userQuery.data?.user.hp ?? 100}
            mp={userQuery.data?.user.mp ?? 100}
          />

          <MyPageStatus
            technology={userQuery.data?.user.technology ?? 0}
            solution={userQuery.data?.user.solution ?? 0}
            achievement={userQuery.data?.user.achievement ?? 0}
            motivation={userQuery.data?.user.motivation ?? 0}
            design={userQuery.data?.user.design ?? 0}
            plan={userQuery.data?.user.plan ?? 0}
          />

          <MyPageTags
            interests={userQuery.data?.user.interests ?? []}
            certifications={userQuery.data?.user.certifications ?? []}
          />
        </StyledMyPageGridContainer>
      </StyledMyPageContainer>

      <StyledMyPageBackground />
    </>
  )
}

const StyledMyPageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledMyPageGridContainer = styled.div`
  padding-top: calc(
    ${({ theme }) => theme.HEADER_HEIGHT} + ${calculateMinSizeBasedOnFigmaHeight(20)}
  );
  margin: auto;
  width: fit-content;
  display: grid;
  grid-template-columns: ${calculateMinSizeBasedOnFigmaWidth(345)} ${calculateMinSizeBasedOnFigmaWidth(
      535,
    )};
  grid-template-rows: auto auto;
  gap: 0px 45px;
`

const StyledMyPageBackground = styled.div`
  ${({ theme }) => css`
    z-index: ${theme.Z_INDEX.INDEX_MINUS_1};
    top: ${theme.HEADER_HEIGHT};
    height: calc(100vh - ${theme.HEADER_HEIGHT});
  `};

  position: fixed;
  left: 0;
  width: 100vw;
  background: url('/images/my-page_background.webp');
  background-attachment: fixed;
  background-position: cover;
  background-size: 100% 100%;
  background-repeat: no-repeat;
`
