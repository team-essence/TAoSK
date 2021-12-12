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
        <StyledStatusName>技術力</StyledStatusName>
      </StyledProjectMyStatusContainer>

      <StyledProjectMyStatusContainer statusType="solution">
        <StyledStatusRank>{status.toRank(solution)}</StyledStatusRank>
        <StyledStatusName>解決力</StyledStatusName>
      </StyledProjectMyStatusContainer>

      <StyledProjectMyStatusContainer statusType="achievement">
        <StyledStatusRank>{status.toRank(achievement)}</StyledStatusRank>
        <StyledStatusName>達成力</StyledStatusName>
      </StyledProjectMyStatusContainer>

      <StyledProjectMyStatusContainer statusType="plan">
        <StyledStatusRank>{status.toRank(plan)}</StyledStatusRank>
        <StyledStatusName>設計力</StyledStatusName>
      </StyledProjectMyStatusContainer>

      <StyledProjectMyStatusContainer statusType="motivation">
        <StyledStatusRank>{status.toRank(motivation)}</StyledStatusRank>
        <StyledStatusName>意欲</StyledStatusName>
      </StyledProjectMyStatusContainer>

      <StyledProjectMyStatusContainer statusType="design">
        <StyledStatusRank>{status.toRank(design)}</StyledStatusRank>
        <StyledStatusDesignName>デザイン</StyledStatusDesignName>
      </StyledProjectMyStatusContainer>
    </StyledProjectMyStatusesContainer>
  )
}

const StyledProjectMyStatusesContainer = styled.div`
  display: flex;
`

const StyledProjectMyStatusContainer = styled.div<{ statusType: StatusType }>`
  padding-left: ${calculateMinSizeBasedOnFigmaWidth(7)};
  margin-left: ${calculateMinSizeBasedOnFigmaWidth(-2.5)};
  width: ${calculateMinSizeBasedOnFigmaWidth(82)};
  height: ${calculateMinSizeBasedOnFigmaWidth(82)};
  background: url(${({ statusType }) => `/svg/projectStatuses/${statusType}.svg`});
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const StyledStatusText = styled.p`
  color: ${({ theme }) => theme.COLORS.WHITE};

  ${({ theme }) => css`
    width: ${calculateMinSizeBasedOnFigmaWidth(58)};
    text-align: center;
    z-index: ${theme.Z_INDEX.INDEX_2};
    font-size: ${theme.FONT_SIZES.SIZE_16};
    color: ${theme.COLORS.WHITE};
    font-weight: ${theme.FONT_WEIGHTS.BOLD};
    background: linear-gradient(0deg, ${theme.COLORS.MINE_SHAFT}, ${theme.COLORS.MINE_SHAFT} 100%);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    -webkit-text-stroke: 3px transparent;
  `}
`

const StyledStatusRank = styled(StyledStatusText)`
  line-height: ${calculateMinSizeBasedOnFigmaWidth(32)};
  font-family: ${yrsa};
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_40};
`

const StyledStatusName = styled(StyledStatusText)`
  line-height: ${calculateMinSizeBasedOnFigmaWidth(27)};
  font-weight: ${({ theme }) => theme.FONT_WEIGHTS.MEDIUM};
`

const StyledStatusDesignName = styled(StyledStatusName)`
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_14};
`
