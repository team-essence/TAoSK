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
import exp from 'utils/exp/exp'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import { occupationList } from 'consts/occupationList'

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
          <StyledUserTopContainer>
            <StyledUserWrapper>
              <StyledUserImageContainer>
                <img src={userQuery.data.user.icon_image} alt={userQuery.data?.user.name} />
              </StyledUserImageContainer>

              <StyledUserInfoContainer>
                <StyledUserDataContainer>
                  <StyledLevelContainer>
                    <StyledLevelLabel>lv.</StyledLevelLabel>
                    <StyledLevel>{exp.toLevel(userQuery.data.user.exp)}</StyledLevel>
                  </StyledLevelContainer>

                  <StyledUserNameAndUidContainer>
                    <StyledUserName>{userQuery.data.user.name}</StyledUserName>
                    <StyledUserUid>@{userQuery.data.user.id}</StyledUserUid>
                  </StyledUserNameAndUidContainer>
                </StyledUserDataContainer>

                <StyledCompanyContainer>
                  <p>{userQuery.data.user.company}</p>
                </StyledCompanyContainer>

                <StyledOccupationContainer>
                  <p>{occupationList[userQuery.data.user.occupation_id]}</p>
                </StyledOccupationContainer>

                <StyledParameterContainer>
                  <StyledStatusBarContainer>
                    <h5>HP</h5>
                    <p>{userQuery.data.user.hp}/100</p>
                    <StyledHpBar rate={userQuery.data.user.hp} />
                  </StyledStatusBarContainer>

                  <StyledStatusBarContainer>
                    <h5>MP</h5>
                    <p>{userQuery.data.user.mp}/100</p>
                    <StyledMpBar rate={userQuery.data.user.mp} />
                  </StyledStatusBarContainer>
                </StyledParameterContainer>
              </StyledUserInfoContainer>
            </StyledUserWrapper>

            <img src="/svg/my-page-user_background.svg" alt="ユーザバックグラウンド" />
          </StyledUserTopContainer>

          <StyledUserLeftContainer>
            <img src="/svg/user-status_background.svg" alt="ステータスバックグランド" />
          </StyledUserLeftContainer>

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

const StyledUserTopContainer = styled.div`
  position: relative;
  grid-column: 1 / 3;
  grid-row: 1 / 2;

  img {
    width: ${calculateMinSizeBasedOnFigmaWidth(942)};
  }
`

const StyledUserLeftContainer = styled.div`
  grid-column: 1 / 2;
  grid-row: 2 / 3;

  img {
    width: ${calculateMinSizeBasedOnFigmaWidth(345)};
  }
`

const StyledUserRightContainer = styled.div`
  grid-column: 2 / 3;
  grid-row: 2 / 3;

  img {
    width: ${calculateMinSizeBasedOnFigmaWidth(535)};
  }
`

const StyledUserWrapper = styled.div`
  position: absolute;
  top: 48%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: fit-content;

  display: flex;
  gap: 0px ${calculateMinSizeBasedOnFigmaWidth(47)};
`

const StyledUserImageContainer = styled.div`
  width: ${calculateMinSizeBasedOnFigmaWidth(240)};
  height: ${calculateMinSizeBasedOnFigmaWidth(240)};

  img {
    width: ${calculateMinSizeBasedOnFigmaWidth(240)};
    height: ${calculateMinSizeBasedOnFigmaWidth(240)};
    object-fit: cover;
    border-radius: 6px;
    box-shadow: 0 0 0 1px ${({ theme }) => theme.COLORS.MINE_SHAFT};
    border: solid 3px ${({ theme }) => theme.COLORS.ZINNWALDITE};
  }
`

const StyledLevelContainer = styled.div`
  position: relative;
  background: ${({ theme }) => theme.COLORS.CHOCOLATE};
  width: ${calculateMinSizeBasedOnFigmaWidth(85)};
  height: ${calculateMinSizeBasedOnFigmaWidth(48)};
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:after {
    position: absolute;
    content: '';
    width: ${calculateMinSizeBasedOnFigmaWidth(89)};
    height: ${calculateMinSizeBasedOnFigmaWidth(52)};
    top: ${calculateMinSizeBasedOnFigmaWidth(-2)};
    left: ${calculateMinSizeBasedOnFigmaWidth(-2)};
    background: linear-gradient(to bottom, #eac4a6 0%, #d7cbc1 60%, #eac4a6 100%);
    z-index: ${({ theme }) => theme.Z_INDEX.INDEX_MINUS_1};
    border-radius: 4px;
  }
`

const StyledLevelLabel = styled.p`
  position: absolute;
  top: ${calculateMinSizeBasedOnFigmaWidth(-4)};
  left: ${calculateMinSizeBasedOnFigmaWidth(2)};
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_14};
  font-weight: ${({ theme }) => theme.FONT_WEIGHTS.BOLD};
`

const StyledLevel = styled.p`
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_40};
  font-weight: ${({ theme }) => theme.FONT_WEIGHTS.BOLD};
`

const StyledUserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const StyledUserDataContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0 12px;
`

const StyledUserNameAndUidContainer = styled.div``

const StyledUserName = styled.h4`
  color: ${({ theme }) => theme.COLORS.FONT.BLACK};
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_24};
  font-weight: ${({ theme }) => theme.FONT_WEIGHTS.BOLD};
`

const StyledUserUid = styled.p`
  color: ${({ theme }) => theme.COLORS.SCORPION};
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_14};
  font-weight: ${({ theme }) => theme.FONT_WEIGHTS.LIGHT};
`

const StyledUserInfoWrapper = styled.div`
  padding: 6px 0;
  background: ${({ theme }) => convertIntoRGBA(theme.COLORS.COD_GRAY, 0.11)};
  width: ${calculateMinSizeBasedOnFigmaWidth(426)};
`

const StyledCompanyContainer = styled(StyledUserInfoWrapper)`
  text-align: center;
`

const StyledOccupationContainer = styled(StyledUserInfoWrapper)`
  text-align: center;
  font-weight: ${({ theme }) => theme.FONT_WEIGHTS.BOLD};
`

const StyledParameterContainer = styled(StyledUserInfoWrapper)`
  padding: ${calculateMinSizeBasedOnFigmaWidth(17)} 0;
  display: flex;
  flex-direction: column;
  gap: ${calculateMinSizeBasedOnFigmaWidth(16)} 0;
`

const StyledStatusBarContainer = styled.div`
  margin: 0 auto;
  position: relative;
  display: flex;
  align-items: center;
  gap: 0 ${calculateMinSizeBasedOnFigmaWidth(9)};
  width: fit-content;

  h5 {
    color: ${({ theme }) => theme.COLORS.MINE_SHAFT};
    font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_14};
    font-weight: ${({ theme }) => theme.FONT_WEIGHTS.BLACK};
  }

  p {
    font-family: 'Yanone Kaffeesatz', 'Inter', 'BlinkMacSystemFont', 'Hiragino Kaku Gothic ProN',
      'Hiragino Sans', Meiryo, sans-serif;
    position: absolute;
    right: 0;
    ${({ theme }) => css`
      width: ${calculateMinSizeBasedOnFigmaWidth(58)};
      text-align: center;
      z-index: ${theme.Z_INDEX.INDEX_2};
      font-size: ${theme.FONT_SIZES.SIZE_18};
      color: ${theme.COLORS.WHITE};
      font-weight: ${theme.FONT_WEIGHTS.MEDIUM};
      background: linear-gradient(
        0deg,
        ${theme.COLORS.MINE_SHAFT},
        ${theme.COLORS.MINE_SHAFT} 100%
      );
      background-size: 200% 200%;
      -webkit-background-clip: text;
      -webkit-text-stroke: 4px transparent;
    `}
  }
`

const StyledBar = styled.div`
  position: relative;
  width: ${calculateMinSizeBasedOnFigmaWidth(305)};
  height: ${calculateMinSizeBasedOnFigmaWidth(13)};
`

const StyledHpBar = styled(StyledBar)<{ rate: number }>`
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: ${calculateMinSizeBasedOnFigmaWidth(-4)};
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.COLORS.HP_BG};
    border-radius: ${calculateMinSizeBasedOnFigmaWidth(100)};
    z-index: ${({ theme }) => theme.Z_INDEX.INDEX_MINUS_1};
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    width: ${({ rate }) => rate}%;
    height: 100%;
    background: ${({ theme }) => theme.COLORS.HP};
    border-radius: ${calculateMinSizeBasedOnFigmaWidth(100)};
  }
`

const StyledMpBar = styled(StyledBar)<{ rate: number }>`
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: ${calculateMinSizeBasedOnFigmaWidth(-4)};
    width: 100%;
    height: 100%;
    background: ${({ theme }) => theme.COLORS.MP_BG};
    border-radius: ${calculateMinSizeBasedOnFigmaWidth(100)};
    z-index: ${({ theme }) => theme.Z_INDEX.INDEX_MINUS_1};
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    width: ${({ rate }) => rate}%;
    height: 100%;
    background: ${({ theme }) => theme.COLORS.MP};
    border-radius: ${calculateMinSizeBasedOnFigmaWidth(100)};
  }
`
