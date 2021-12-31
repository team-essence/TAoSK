import React, { FCX } from 'react'
import { useDisplayStatus } from 'hooks/useDisplayStatus'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'
import { convertParamIntoJp } from 'utils/convertParamIntoJp'
import { StatusParam } from 'types/status'
import styled, { css } from 'styled-components'
import { statusTextTransition } from 'styles/animation/projectMyStatusTransition'
import { yrsa } from 'styles/fontFamily/fontFamily'

type Props = {
  statusNum: number
  statusType: StatusParam
  isTaskCompleted: boolean
}

export const ProjectMyStatus: FCX<Props> = ({
  className,
  statusNum,
  statusType,
  isTaskCompleted,
}) => {
  const { rank, statusNumToDisplay, shouldDisplayNum } = useDisplayStatus(
    statusNum,
    isTaskCompleted,
  )

  return (
    <StyledProjectMyStatusContainer className={className} statusType={statusType}>
      <StyledStatusTextWrapper>
        <StyledStatusRankNum shouldDisplayNum={shouldDisplayNum}>
          {statusNumToDisplay}
        </StyledStatusRankNum>
        <StyledStatusRank shouldDisplayNum={shouldDisplayNum}>{rank}</StyledStatusRank>
      </StyledStatusTextWrapper>

      {statusType === 'design' ? (
        <StyledStatusDesignName>デザイン</StyledStatusDesignName>
      ) : (
        <StyledStatusName>{convertParamIntoJp(statusType)}</StyledStatusName>
      )}
    </StyledProjectMyStatusContainer>
  )
}

const StyledProjectMyStatusContainer = styled.div<{ statusType: StatusParam }>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${calculateMinSizeBasedOnFigmaWidth(82)};
  height: ${calculateMinSizeBasedOnFigmaWidth(82)};
  padding-left: ${calculateMinSizeBasedOnFigmaWidth(7)};
  padding-bottom: ${calculateMinSizeBasedOnFigmaWidth(2)};
  background: url(${({ statusType }) => `/svg/projectStatuses/${statusType}.svg`});
  background-size: cover;
  background-repeat: no-repeat;
`
const StyledStatusTextWrapper = styled.div`
  overflow-x: clip;
  position: relative;
  width: ${calculateMinSizeBasedOnFigmaWidth(58)};
  height: ${calculateMinSizeBasedOnFigmaWidth(32)};
`
const StyledStatusText = styled.p`
  ${({ theme }) => css`
    width: 100%;
    text-align: center;
    font-size: ${theme.FONT_SIZES.SIZE_16};
    color: ${theme.COLORS.WHITE};
    font-weight: ${theme.FONT_WEIGHTS.BOLD};
    background: linear-gradient(0deg, ${theme.COLORS.MINE_SHAFT}, ${theme.COLORS.MINE_SHAFT} 100%);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    -webkit-text-stroke: 3px transparent;
    z-index: ${theme.Z_INDEX.INDEX_2};
  `}
`
const StyledStatusAnimationText = styled(StyledStatusText)`
  position: absolute;
  top: ${calculateMinSizeBasedOnFigmaWidth(2)};
  width: 100%;
  text-align: center;
  line-height: ${calculateMinSizeBasedOnFigmaWidth(32)};
  font-family: ${yrsa};
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_40};
  ${statusTextTransition}
`
const StyledStatusRank = styled(StyledStatusAnimationText)<{ shouldDisplayNum: boolean }>`
  transform: translateX(0%);

  ${StyledProjectMyStatusContainer}:hover & {
    transform: translateX(100%);
  }
  ${({ shouldDisplayNum }) =>
    shouldDisplayNum &&
    css`
      transform: translateX(100%);
    `}
`
const StyledStatusRankNum = styled(StyledStatusAnimationText)<{ shouldDisplayNum: boolean }>`
  transform: translateX(-100%);

  ${StyledProjectMyStatusContainer}:hover & {
    transform: translateX(0%);
  }
  ${({ shouldDisplayNum }) =>
    shouldDisplayNum &&
    css`
      transform: translateX(0%);
    `}
`
const StyledStatusName = styled(StyledStatusText)`
  line-height: ${calculateMinSizeBasedOnFigmaWidth(27)};
  font-weight: ${({ theme }) => theme.FONT_WEIGHTS.MEDIUM};
`
const StyledStatusDesignName = styled(StyledStatusName)`
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_14};
`
