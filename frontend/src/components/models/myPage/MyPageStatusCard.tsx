import React, { FC } from 'react'
import styled, { css } from 'styled-components'
import {
  achievementLabelColor,
  designLabelColor,
  motivationLabelColor,
  planLabelColor,
  solutionLabelColor,
  technologyLabelColor,
} from 'styles/myPageStatusLabel/LabelColor'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import status from 'utils/status/status'

type Props = {
  className?: string
  statusType: STATUS_TYPE
  statValue: number
}

export const STATUS_TYPE = {
  TECHNOLOGY: technologyLabelColor,
  SOLUTION: solutionLabelColor,
  ACHIEVEMENT: achievementLabelColor,
  MOTIVATION: motivationLabelColor,
  DESIGN: designLabelColor,
  PLAN: planLabelColor,
} as const
type STATUS_TYPE = typeof STATUS_TYPE[keyof typeof STATUS_TYPE]

export const MyPageStatusCard: FC<Props> = ({ className, statusType, statValue }) => {
  const defaultImgFolder = '/svg/myPageStatus'

  const statusTitle = (statusType: STATUS_TYPE) => {
    switch (statusType) {
      case STATUS_TYPE.TECHNOLOGY:
        return '技術力'
      case STATUS_TYPE.SOLUTION:
        return '解決力'
      case STATUS_TYPE.ACHIEVEMENT:
        return '達成力'
      case STATUS_TYPE.MOTIVATION:
        return '意欲'
      case STATUS_TYPE.DESIGN:
        return 'デザイン'
      case STATUS_TYPE.PLAN:
        return '設計力'
    }
  }

  const statusImg = (statusType: STATUS_TYPE) => {
    switch (statusType) {
      case STATUS_TYPE.TECHNOLOGY:
        return `${defaultImgFolder}/technology.svg`
      case STATUS_TYPE.SOLUTION:
        return `${defaultImgFolder}/solution.svg`
      case STATUS_TYPE.ACHIEVEMENT:
        return `${defaultImgFolder}/achievement.svg`
      case STATUS_TYPE.MOTIVATION:
        return `${defaultImgFolder}/motivation.svg`
      case STATUS_TYPE.DESIGN:
        return `${defaultImgFolder}/design.svg`
      case STATUS_TYPE.PLAN:
        return `${defaultImgFolder}/plan.svg`
    }
  }

  return (
    <StyledStatusCardContainer className={className}>
      <img src={statusImg(statusType)} alt="武器アイコン" />
      <h5>{statusTitle(statusType)}</h5>

      <StyledStatusLabel statusType={statusType}>
        <p>
          <span>{status.toRank(statValue)}</span>
          {status.toRemainderStatus(statValue)}
        </p>
      </StyledStatusLabel>
    </StyledStatusCardContainer>
  )
}

const StyledStatusCardContainer = styled.div`
  position: relative;
  width: ${calculateMinSizeBasedOnFigmaWidth(188)};
  height: ${calculateMinSizeBasedOnFigmaWidth(32)};
  border-radius: ${calculateMinSizeBasedOnFigmaWidth(3)};
  background: ${({ theme }) => theme.COLORS.BIZARRE};
  border: solid 1px ${({ theme }) => theme.COLORS.TOBACCO_BROWN};
  display: flex;
  align-items: center;
  overflow: hidden;

  img {
    margin-left: 8px;
  }

  h5 {
    margin-left: ${calculateMinSizeBasedOnFigmaWidth(8)};
    font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_14};
    color: ${({ theme }) => theme.COLORS.TOBACCO_BROWN};
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: ${calculateMinSizeBasedOnFigmaWidth(3)};

    ${({ theme }) => css`
      background: linear-gradient(
        180deg,
        ${convertIntoRGBA(theme.COLORS.BLACK, 0.15)},
        ${convertIntoRGBA(theme.COLORS.BLACK, 0)} 4.69%,
        ${convertIntoRGBA(theme.COLORS.BLACK, 0)} 57.81%,
        ${convertIntoRGBA(theme.COLORS.BLACK, 0.15)} 100%
      );
      z-index: ${theme.Z_INDEX.INDEX_1};
    `}
  }
`

const StyledStatusLabel = styled.div<{ statusType: STATUS_TYPE }>`
  position: absolute;
  left: ${calculateMinSizeBasedOnFigmaWidth(100)};
  width: ${calculateMinSizeBasedOnFigmaWidth(76.43)};
  height: 150%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(8.35deg);

  ${({ statusType }) =>
    css`
      background: linear-gradient(${statusType});
    `}

  p {
    width: ${calculateMinSizeBasedOnFigmaWidth(40)};
    display: flex;
    justify-content: space-between;

    transform: rotate(-8.35deg);
    font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_14};
    color: ${({ theme }) => theme.COLORS.WHITE};
  }
`
