import { occupationList } from 'consts/occupationList'
import { BAR_TYPE } from 'consts/bar'
import React, { FC } from 'react'
import styled, { css } from 'styled-components'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'
import exp from 'utils/exp/exp'

type Props = {
  className?: string
  iconImage: string
  occupationId: number
  name: string
  totalExp: number
  hp: number
  mp: number
}

export const ProjectMyInfo: FC<Props> = ({
  className,
  iconImage,
  occupationId,
  name,
  totalExp,
  hp,
  mp,
}) => {
  return (
    <StyledProjectMyInfoContainer className={className}>
      <StyledUserIconImgContainer>
        <img src={iconImage} alt={name} />
      </StyledUserIconImgContainer>

      <StyledUserOccupationContainer>
        <p>{occupationList[occupationId]}</p>
        <img src="/svg/user-name_background.svg" alt="ユーザ名の背景画像" />
      </StyledUserOccupationContainer>

      <StyledUserContainer>
        <h6>{name}</h6>

        <StyledLevelContainer>
          <p>lv.{exp.toLevel(totalExp)}</p>
        </StyledLevelContainer>
      </StyledUserContainer>

      <StyledStatusesContainer>
        <StyledStatusHPContainer>
          <h4>HP</h4>

          <StyledStatusBackground color={BAR_TYPE.HP_BG} width={133}>
            <StyledStatusBar color={BAR_TYPE.HP} width={129} rate={hp} isSilver={true}>
              <p>{hp}/100</p>
            </StyledStatusBar>
          </StyledStatusBackground>
        </StyledStatusHPContainer>

        <StyledStatusMPContainer>
          <h4>MP</h4>

          <StyledStatusBackground color={BAR_TYPE.MP_BG} width={133}>
            <StyledStatusBar color={BAR_TYPE.MP} width={129} rate={mp} isSilver={true}>
              <p>{mp}/100</p>
            </StyledStatusBar>
          </StyledStatusBackground>
        </StyledStatusMPContainer>

        <StyledStatusEXPContainer>
          <h4>EXP</h4>

          <StyledStatusBackground color={BAR_TYPE.EXP_BG} width={293}>
            <StyledStatusBar
              color={BAR_TYPE.EXP}
              width={289}
              rate={exp.toRemainderExp(totalExp)}></StyledStatusBar>
          </StyledStatusBackground>
        </StyledStatusEXPContainer>
      </StyledStatusesContainer>

      <StyledProjectMyInfoBackground
        src="/svg/project-detail-my-info_background.svg"
        alt="自分の情報の背景画像"
      />
    </StyledProjectMyInfoContainer>
  )
}

const StyledProjectMyInfoContainer = styled.div`
  position: relative;
  margin-top: 250px;
  width: ${calculateMinSizeBasedOnFigmaWidth(436)};
  height: ${calculateMinSizeBasedOnFigmaWidth(110)};
`

const StyledUserIconImgContainer = styled.div`
  position: absolute;
  top: ${calculateMinSizeBasedOnFigmaWidth(1)};
  left: ${calculateMinSizeBasedOnFigmaWidth(7)};
  width: ${calculateMinSizeBasedOnFigmaWidth(102)};
  height: ${calculateMinSizeBasedOnFigmaWidth(102)};

  img {
    width: ${calculateMinSizeBasedOnFigmaWidth(102)};
    height: ${calculateMinSizeBasedOnFigmaWidth(102)};
    border-radius: ${calculateMinSizeBasedOnFigmaWidth(4)};
    object-fit: cover;
    border: solid ${calculateMinSizeBasedOnFigmaWidth(2)} ${({ theme }) => theme.COLORS.ZINNWALDITE};
  }
`

const StyledUserOccupationContainer = styled.div`
  position: absolute;
  left: ${calculateMinSizeBasedOnFigmaWidth(7)};
  bottom: ${calculateMinSizeBasedOnFigmaWidth(7)};
  width: ${calculateMinSizeBasedOnFigmaWidth(102)};
  height: ${calculateMinSizeBasedOnFigmaWidth(24)};

  p {
    position: absolute;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: ${({ theme }) => theme.FONT_WEIGHTS.MEDIUM};
    color: ${({ theme }) => theme.COLORS.WHITE};
  }

  img {
    width: ${calculateMinSizeBasedOnFigmaWidth(102)};
    height: ${calculateMinSizeBasedOnFigmaWidth(24)};
    object-fit: cover;
  }
`

const StyledUserContainer = styled.div`
  position: absolute;
  top: ${calculateMinSizeBasedOnFigmaWidth(14)};
  left: ${calculateMinSizeBasedOnFigmaWidth(130)};
  width: ${calculateMinSizeBasedOnFigmaWidth(290)};
  display: grid;
  grid-template-columns: auto auto;
  justify-content: space-between;

  h6 {
    font-weight: ${({ theme }) => theme.FONT_WEIGHTS.BOLD};
    font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_20};
    color: ${({ theme }) => theme.COLORS.WHITE};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`

const StyledLevelContainer = styled.div`
  position: relative;
  border-radius: ${calculateMinSizeBasedOnFigmaWidth(4)};
  z-index: ${({ theme }) => theme.Z_INDEX.INDEX_2};
  width: fit-content;
  height: ${calculateMinSizeBasedOnFigmaWidth(28)};

  &::before {
    position: absolute;
    content: '';
    width: calc(100% + ${calculateMinSizeBasedOnFigmaWidth(4)});
    height: calc(100% + ${calculateMinSizeBasedOnFigmaWidth(4)});
    top: 0;
    top: ${calculateMinSizeBasedOnFigmaWidth(-2)};
    left: ${calculateMinSizeBasedOnFigmaWidth(-2)};
    background: linear-gradient(to bottom, #eac4a6 0%, #d7cbc1 60%, #eac4a6 100%);
    z-index: ${({ theme }) => theme.Z_INDEX.INDEX_MINUS_1};
    border-radius: 4px;
  }

  &::after {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    top: 0;
    background: ${({ theme }) => theme.COLORS.MATTERHORN};
    z-index: ${({ theme }) => theme.Z_INDEX.INDEX_MINUS_1};
    border-radius: 4px;
  }

  p {
    margin: 0 ${calculateMinSizeBasedOnFigmaWidth(6)};
    font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_18};
    font-weight: ${({ theme }) => theme.FONT_WEIGHTS.BLACK};
    color: ${({ theme }) => theme.COLORS.WHITE};
  }
`

const StyledProjectMyInfoBackground = styled.img`
  width: ${calculateMinSizeBasedOnFigmaWidth(436)};
  height: ${calculateMinSizeBasedOnFigmaWidth(110)};
  object-fit: contain;
`

const StyledStatusesContainer = styled.div`
  position: absolute;
  top: 69px;
  left: 112px;
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: 1fr 1fr;
  gap: 5px 0;
`

const StyledStatusContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
  gap: 0 ${calculateMinSizeBasedOnFigmaWidth(2)};
  font-family: 'Yanone Kaffeesatz', 'Inter', 'BlinkMacSystemFont', 'Hiragino Kaku Gothic ProN',
    'Hiragino Sans', Meiryo, sans-serif;

  h4 {
    position: relative;
    top: ${calculateMinSizeBasedOnFigmaWidth(1)};
    font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_18};
    font-weight: ${({ theme }) => theme.FONT_WEIGHTS.BOLD};
    color: ${({ theme }) => theme.COLORS.WHITE};
    line-height: 0;
  }
`

const StyledStatusHPContainer = styled(StyledStatusContainer)`
  padding-left: ${calculateMinSizeBasedOnFigmaWidth(7)};
  justify-content: flex-start;
`
const StyledStatusMPContainer = styled(StyledStatusContainer)`
  justify-content: flex-end;
`
const StyledStatusEXPContainer = styled(StyledStatusContainer)`
  grid-column: 1 / 3;
`

const StyledStatusBackground = styled.div<{ color: BAR_TYPE; width: number }>`
  position: relative;
  border-radius: ${calculateMinSizeBasedOnFigmaWidth(100)};
  width: ${({ width }) => calculateMinSizeBasedOnFigmaWidth(width)};
  height: ${calculateMinSizeBasedOnFigmaWidth(12)};
  background: ${({ color }) => color};
`

const StyledStatusBar = styled.div<{
  color: BAR_TYPE
  width: number
  rate: number
  isSilver?: boolean
}>`
  position: absolute;
  top: 0;
  right: 0;
  width: ${({ width }) => calculateMinSizeBasedOnFigmaWidth(width)};
  height: ${calculateMinSizeBasedOnFigmaWidth(12)};

  p {
    position: absolute;
    bottom: -5px;
    right: ${calculateMinSizeBasedOnFigmaWidth(1)};

    ${({ theme }) => css`
      width: ${calculateMinSizeBasedOnFigmaWidth(58)};
      text-align: center;
      z-index: ${theme.Z_INDEX.INDEX_2};
      font-size: ${theme.FONT_SIZES.SIZE_16};
      color: ${theme.COLORS.WHITE};
      font-weight: ${theme.FONT_WEIGHTS.BOLD};
      background: linear-gradient(
        0deg,
        ${theme.COLORS.MINE_SHAFT},
        ${theme.COLORS.MINE_SHAFT} 100%
      );
      background-size: 200% 200%;
      -webkit-background-clip: text;
      -webkit-text-stroke: 3px transparent;
    `}
  }

  &::before {
    content: '';
    border-radius: ${calculateMinSizeBasedOnFigmaWidth(100)};
    position: absolute;
    width: 100%;
    height: 100%;

    ${({ theme, isSilver }) => css`
      ${isSilver &&
      css`
        background: ${theme.COLORS.SILVER};
      `}
    `}
  }

  &::after {
    content: '';
    border-radius: ${calculateMinSizeBasedOnFigmaWidth(100)};
    background: ${({ color }) => color};
    position: absolute;
    width: ${({ rate }) => rate}%;
    height: 100%;
  }
`
