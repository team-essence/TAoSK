import React, { FCX } from 'react'
import styled, { css } from 'styled-components'
import { yrsa } from 'styles/fontFamily/fontFamily'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'
import status from 'utils/status/status'

type Props = {
  technology: number
  solution: number
  achievement: number
  motivation: number
  design: number
  plan: number
}

type StatusType = 'technology' | 'solution' | 'achievement' | 'motivation' | 'design' | 'plan'

export const ProjectMyStatuses: FCX<Props> = ({
  className,
  technology,
  solution,
  achievement,
  motivation,
  design,
  plan,
}) => {
  return (
    <StyledProjectMyStatusesContainer className={className}>
      <StyledProjectMyStatusContainer statusType="technology">
        <StyledStatusRank>{status.toRank(technology)}</StyledStatusRank>
        <StyledStatusRankNum>{status.toRemainderStatus(technology)}</StyledStatusRankNum>
        <StyledStatusName>技術力</StyledStatusName>
      </StyledProjectMyStatusContainer>

      <StyledProjectMyStatusContainer statusType="solution">
        <StyledStatusRank>{status.toRank(solution)}</StyledStatusRank>
        <StyledStatusRankNum>{status.toRemainderStatus(solution)}</StyledStatusRankNum>
        <StyledStatusName>解決力</StyledStatusName>
      </StyledProjectMyStatusContainer>

      <StyledProjectMyStatusContainer statusType="achievement">
        <StyledStatusRank>{status.toRank(achievement)}</StyledStatusRank>
        <StyledStatusRankNum>{status.toRemainderStatus(achievement)}</StyledStatusRankNum>
        <StyledStatusName>達成力</StyledStatusName>
      </StyledProjectMyStatusContainer>

      <StyledProjectMyStatusContainer statusType="plan">
        <StyledStatusRank>{status.toRank(plan)}</StyledStatusRank>
        <StyledStatusRankNum>{status.toRemainderStatus(plan)}</StyledStatusRankNum>
        <StyledStatusName>設計力</StyledStatusName>
      </StyledProjectMyStatusContainer>

      <StyledProjectMyStatusContainer statusType="motivation">
        <StyledStatusRank>{status.toRank(motivation)}</StyledStatusRank>
        <StyledStatusRankNum>{status.toRemainderStatus(motivation)}</StyledStatusRankNum>
        <StyledStatusName>意欲</StyledStatusName>
      </StyledProjectMyStatusContainer>

      <StyledProjectMyStatusContainer statusType="design">
        <StyledStatusRank>{status.toRank(design)}</StyledStatusRank>
        <StyledStatusRankNum>{status.toRemainderStatus(design)}</StyledStatusRankNum>
        <StyledStatusDesignName>デザイン</StyledStatusDesignName>
      </StyledProjectMyStatusContainer>
    </StyledProjectMyStatusesContainer>
  )
}

const StyledProjectMyStatusesContainer = styled.div`
  display: flex;
`
const StyledProjectMyStatusContainer = styled.div<{ statusType: StatusType }>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: ${calculateMinSizeBasedOnFigmaWidth(82)};
  height: ${calculateMinSizeBasedOnFigmaWidth(82)};
  padding-left: ${calculateMinSizeBasedOnFigmaWidth(7)};
  margin-left: ${calculateMinSizeBasedOnFigmaWidth(-2.5)};
  background: url(${({ statusType }) => `/svg/projectStatuses/${statusType}.svg`});
  background-size: cover;
  background-repeat: no-repeat;
  overflow: hidden;
`
const StyledStatusText = styled.p`
  ${({ theme }) => css`
    width: ${calculateMinSizeBasedOnFigmaWidth(58)};
    text-align: center;
    font-size: ${theme.FONT_SIZES.SIZE_16};
    color: ${theme.COLORS.WHITE};
    font-weight: ${theme.FONT_WEIGHTS.BOLD};
    padding-bottom: ${calculateMinSizeBasedOnFigmaWidth(12)};
    background: linear-gradient(0deg, ${theme.COLORS.MINE_SHAFT}, ${theme.COLORS.MINE_SHAFT} 100%);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    -webkit-text-stroke: 3px transparent;
    z-index: ${theme.Z_INDEX.INDEX_2};
  `}
`
const StyledStatusAnimationText = styled(StyledStatusText)`
  position: absolute;
  top: 32%;
  text-align: center;
  transform: translateX(-68%) translateY(-32%);
  transition: all 0.2s;
`
const StyledStatusRank = styled(StyledStatusAnimationText)`
  left: 68%;
  line-height: ${calculateMinSizeBasedOnFigmaWidth(32)};
  font-family: ${yrsa};
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_40};
  ${StyledProjectMyStatusContainer}:hover & {
    left: 168%;
  }
`
const StyledStatusRankNum = styled(StyledStatusAnimationText)`
  left: -68%;
  line-height: ${calculateMinSizeBasedOnFigmaWidth(32)};
  font-family: ${yrsa};
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_40};
  ${StyledProjectMyStatusContainer}:hover & {
    left: 68%;
  }
`
const StyledStatusName = styled(StyledStatusText)`
  line-height: ${calculateMinSizeBasedOnFigmaWidth(27)};
  font-weight: ${({ theme }) => theme.FONT_WEIGHTS.MEDIUM};
`
const StyledStatusDesignName = styled(StyledStatusName)`
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_14};
`
