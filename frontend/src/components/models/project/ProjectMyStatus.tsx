import React, { FCX } from 'react'
import styled, { css } from 'styled-components'
import { yrsa } from 'styles/fontFamily/fontFamily'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'
import { convertParamIntoJp } from 'utils/convertParamIntoJp'
import status from 'utils/status/status'
import { StatusParam } from 'types/status'

type Props = {
  statusNum: number
  statusType: StatusParam
}

export const ProjectMyStatus: FCX<Props> = ({ className, statusNum, statusType }) => {
  return (
    <StyledProjectMyStatusContainer className={className} statusType={statusType}>
      <StyledStatusRank>{status.toRank(statusNum)}</StyledStatusRank>
      <StyledStatusRankNum>{status.toRemainderStatus(statusNum)}</StyledStatusRankNum>

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
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: ${calculateMinSizeBasedOnFigmaWidth(82)};
  height: ${calculateMinSizeBasedOnFigmaWidth(82)};
  padding-left: ${calculateMinSizeBasedOnFigmaWidth(7)};
  background: url(${({ statusType }) => `/svg/projectStatuses/${statusType}.svg`});
  background-size: cover;
  background-repeat: no-repeat;
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
