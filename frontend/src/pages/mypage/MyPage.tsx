import React, { FC, useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useAuthContext } from 'providers/AuthProvider'
import { useGetUserLazyQuery } from './mypage.gen'
import styled, { css } from 'styled-components'
import { ProjectListHeader } from 'components/ui/header/ProjectListHeader'
import { Loading } from 'components/ui/loading/Loading'
import {
  calculateMinSizeBasedOnFigmaHeight,
  calculateMinSizeBasedOnFigmaWidth,
} from 'utils/calculateSizeBasedOnFigma'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import { technologyLabelColor } from 'styles/myPageStatusLabel/LabelColor'
import { MyPageUserInfo } from 'components/models/myPage/MyPageUserInfo'
import { MyPageStatus } from 'components/models/myPage/MyPageStatus'
import { MyPageStatusCard } from 'components/models/myPage/MyPageStatusCard'

export const MyPage: FC = () => {
  const { currentUser } = useAuthContext()
  const { id } = useParams()
  const [getUserById, userQuery] = useGetUserLazyQuery()

  useEffect(() => {
    if (!currentUser) return
    getUserById({ variables: { id: currentUser.uid } })
  }, [currentUser, getUserById])

  if (!currentUser) return <Navigate to="/signup" />
  if (currentUser.uid !== id) return <Navigate to="/" />
  if (!userQuery.data) return <Loading />

  return (
    <>
      <ProjectListHeader />

      <StyledMyPageContainer>
        <StyledMyPageGridContainer>
          <MyPageUserInfo
            iconImage={userQuery.data.user.icon_image}
            name={userQuery.data.user.name}
            uid={userQuery.data.user.id}
            company={userQuery.data.user.company}
            totalExp={userQuery.data.user.exp}
            occupationId={userQuery.data.user.occupation_id}
            hp={userQuery.data.user.hp}
            mp={userQuery.data.user.mp}
          />

          <MyPageStatus
            technology={userQuery.data.user.technology}
            solution={userQuery.data.user.solution}
            achievement={userQuery.data.user.achievement}
            motivation={userQuery.data.user.motivation}
            design={userQuery.data.user.design}
            plan={userQuery.data.user.plan}
          />

          <StyledUserRightContainer>
            <img src="/svg/user-tags_background.svg" alt="タグバックグラウンド" />
          </StyledUserRightContainer>
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

const StyledUserRightContainer = styled.div`
  grid-column: 2 / 3;
  grid-row: 2 / 3;

  img {
    width: ${calculateMinSizeBasedOnFigmaWidth(535)};
  }
`
