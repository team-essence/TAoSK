import { occupationList } from 'consts/occupationList'
import React, { FC } from 'react'
import styled, { css } from 'styled-components'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import exp from 'utils/exp/exp'

type Props = {
  className?: string
  iconImage: string
  name: string
  uid: string
  company: string
  totalExp: number
  occupationId: number
  hp: number
  mp: number
}

export const MyPageUserInfo: FC<Props> = ({
  className,
  iconImage,
  name,
  uid,
  company,
  totalExp,
  occupationId,
  hp,
  mp,
}) => {
  return (
    <StyledMyPageUserInfoContainer className={className}>
      <StyledUserWrapper>
        <StyledUserImageContainer>
          <img src={iconImage} alt={name} />
        </StyledUserImageContainer>

        <StyledUserInfoContainer>
          <StyledUserDataContainer>
            <StyledLevelContainer>
              <StyledLevelLabel>lv.</StyledLevelLabel>
              <StyledLevel>{exp.toLevel(totalExp)}</StyledLevel>
            </StyledLevelContainer>

            <StyledUserNameAndUidContainer>
              <StyledUserName>{name}</StyledUserName>
              <StyledUserUid>@{uid}</StyledUserUid>
            </StyledUserNameAndUidContainer>
          </StyledUserDataContainer>

          <StyledCompanyContainer>
            <p>{company}</p>
          </StyledCompanyContainer>

          <StyledOccupationContainer>
            <p>{occupationList[occupationId]}</p>
          </StyledOccupationContainer>

          <StyledParameterContainer>
            <StyledStatusBarContainer>
              <h5>HP</h5>
              <p>{hp}/100</p>
              <StyledHpBar rate={hp} />
            </StyledStatusBarContainer>

            <StyledStatusBarContainer>
              <h5>MP</h5>
              <p>{mp}/100</p>
              <StyledMpBar rate={mp} />
            </StyledStatusBarContainer>
          </StyledParameterContainer>
        </StyledUserInfoContainer>
      </StyledUserWrapper>

      <StyledMyPageUserInfoBackground
        src="/svg/my-page-user_background.svg"
        alt="ユーザバックグラウンド"
      />
    </StyledMyPageUserInfoContainer>
  )
}

const StyledMyPageUserInfoContainer = styled.div`
  position: relative;
  grid-column: 1 / 3;
  grid-row: 1 / 2;
`

const StyledMyPageUserInfoBackground = styled.img`
  width: ${calculateMinSizeBasedOnFigmaWidth(942)};
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
    right: 0;
    width: calc(100% + ${calculateMinSizeBasedOnFigmaWidth(4)});
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
    right: 0;
    width: calc(100% + ${calculateMinSizeBasedOnFigmaWidth(4)});
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
