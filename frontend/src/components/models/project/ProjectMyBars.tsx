import React, { FCX } from 'react'
import styled, { css } from 'styled-components'
import { BAR_TYPE } from 'consts/bar'
import { yanoneKaffeesatz } from 'styles/fontFamily/fontFamily'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'
import exp from 'utils/exp/exp'

type Props = {
  hp: number
  mp: number
  totalExp: number
}

export const ProjectMyBars: FCX<Props> = ({ className, hp, mp, totalExp }) => {
  return (
    <StyledProjectMyBarsContainer className={className}>
      <StyledStatusHPBarContainer>
        <h4>HP</h4>
        <StyledStatusBackground color={BAR_TYPE.HP_BG} width={133}>
          <StyledStatusBar color={BAR_TYPE.HP} width={129} rate={hp} isSilver={true}>
            <p>{hp}/100</p>
          </StyledStatusBar>
        </StyledStatusBackground>
      </StyledStatusHPBarContainer>
      <StyledStatusMPBarContainer>
        <h4>MP</h4>
        <StyledStatusBackground color={BAR_TYPE.MP_BG} width={133}>
          <StyledStatusBar color={BAR_TYPE.MP} width={129} rate={mp} isSilver={true}>
            <p>{mp}/100</p>
          </StyledStatusBar>
        </StyledStatusBackground>
      </StyledStatusMPBarContainer>
      <StyledStatusEXPBarContainer>
        <h4>EXP</h4>
        <StyledStatusBackground color={BAR_TYPE.EXP_BG} width={293}>
          <StyledStatusBar
            isSilver={true}
            color={BAR_TYPE.EXP}
            width={289}
            rate={exp.toRemainderExp(totalExp)}></StyledStatusBar>
        </StyledStatusBackground>
      </StyledStatusEXPBarContainer>
    </StyledProjectMyBarsContainer>
  )
}

const StyledProjectMyBarsContainer = styled.div`
  position: absolute;
  top: ${calculateMinSizeBasedOnFigmaWidth(69)};
  left: ${calculateMinSizeBasedOnFigmaWidth(112)};
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: 1fr 1fr;
  gap: 5px 0;
`
const StyledStatusBarContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
  gap: 0 ${calculateMinSizeBasedOnFigmaWidth(2)};
  font-family: ${yanoneKaffeesatz};
  h4 {
    position: relative;
    top: ${calculateMinSizeBasedOnFigmaWidth(1)};
    font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_18};
    font-weight: ${({ theme }) => theme.FONT_WEIGHTS.BOLD};
    color: ${({ theme }) => theme.COLORS.WHITE};
    line-height: 0;
  }
`
const StyledStatusHPBarContainer = styled(StyledStatusBarContainer)`
  padding-left: ${calculateMinSizeBasedOnFigmaWidth(7)};
  justify-content: flex-start;
`
const StyledStatusMPBarContainer = styled(StyledStatusBarContainer)`
  justify-content: flex-end;
`
const StyledStatusEXPBarContainer = styled(StyledStatusBarContainer)`
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
