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
        iconImage={currentUserData?.icon_image ?? DEFAULT_USER}
        name={currentUserData?.name ?? ''}
        uid={currentUserData?.id ?? ''}
        totalExp={currentUserData?.exp ?? 0}
        notifications={notifications}
      />

      <StyledMyPageContainer>
        <StyledMyPageGridContainer>
          <MyPageUserInfo
            iconImage={currentUserData?.icon_image ?? DEFAULT_USER}
            name={currentUserData?.name ?? ''}
            uid={currentUserData?.id ?? ''}
            company={currentUserData?.company ?? ''}
            totalExp={currentUserData?.exp ?? 0}
            occupation={currentUserData?.occupation.name ?? ''}
            hp={currentUserData?.hp ?? 100}
            mp={currentUserData?.mp ?? 100}
          />

          <MyPageStatus
            technology={currentUserData?.technology ?? 0}
            solution={currentUserData?.solution ?? 0}
            achievement={currentUserData?.achievement ?? 0}
            motivation={currentUserData?.motivation ?? 0}
            design={currentUserData?.design ?? 0}
            plan={currentUserData?.plan ?? 0}
          />

          <MyPageTags
            interests={currentUserData?.interests ?? []}
            certifications={currentUserData?.certifications ?? []}
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
