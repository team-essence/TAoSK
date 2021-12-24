import React, { FC } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { DEFAULT_USER } from 'consts/defaultImages'
import { useAuthContext } from 'providers/AuthProvider'
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
import { useGetCurrentUserData } from 'hooks/useGetCurrentUserData'

export const MyPage: FC = () => {
  const { currentUser } = useAuthContext()
  const { id } = useParams()
  const { currentUserData, notifications } = useGetCurrentUserData()

  if (!currentUser) return <Navigate to="/" />
  if (currentUser.uid !== id) return <Navigate to="/" />

  return (
    <>
      <LazyLoading />
      <ProjectListHeader
        iconImage={currentUserData.data?.user.icon_image ?? DEFAULT_USER}
        name={currentUserData.data?.user.name ?? ''}
        uid={currentUserData.data?.user.id ?? ''}
        totalExp={currentUserData.data?.user.exp ?? 0}
        notifications={notifications}
      />

      <StyledMyPageContainer>
        <StyledMyPageGridContainer>
          <MyPageUserInfo
            iconImage={currentUserData.data?.user.icon_image ?? DEFAULT_USER}
            name={currentUserData.data?.user.name ?? ''}
            uid={currentUserData.data?.user.id ?? ''}
            company={currentUserData.data?.user.company ?? ''}
            totalExp={currentUserData.data?.user.exp ?? 0}
            occupation={currentUserData.data?.user.occupation.name ?? ''}
            hp={currentUserData.data?.user.hp ?? 100}
            mp={currentUserData.data?.user.mp ?? 100}
          />

          <MyPageStatus
            technology={currentUserData.data?.user.technology ?? 0}
            solution={currentUserData.data?.user.solution ?? 0}
            achievement={currentUserData.data?.user.achievement ?? 0}
            motivation={currentUserData.data?.user.motivation ?? 0}
            design={currentUserData.data?.user.design ?? 0}
            plan={currentUserData.data?.user.plan ?? 0}
          />

          <MyPageTags
            interests={currentUserData.data?.user.interests ?? []}
            certifications={currentUserData.data?.user.certifications ?? []}
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
