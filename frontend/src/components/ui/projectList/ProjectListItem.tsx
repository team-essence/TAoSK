import React, { FC } from 'react'
import styled, { css } from 'styled-components'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateMinSizeBasedOnFigmaWidth'
import { calculateMinSizeBasedOnFigmaHeight } from 'utils/calculateMinSizeBasedOnFigmaWidth'
import date from 'utils/date/date'

type Props = {
  className?: string
  isEnd: boolean
  activeStatue: ACTIVE_STATUS
  projectTitle: string
  startDate: string
  endDate: string
}

const PROJECT_STATUS_TYPE = {
  PROGRESS: 'progress',
  END: 'end',
} as const
type PROJECT_STATUS_TYPE = typeof PROJECT_STATUS_TYPE[keyof typeof PROJECT_STATUS_TYPE]

export const ACTIVE_STATUS = {
  ACTIVE: '-active',
  NOT_ACTIVE: '',
} as const
type ACTIVE_STATUS = typeof ACTIVE_STATUS[keyof typeof ACTIVE_STATUS]

export const ProjectListItem: FC<Props> = ({
  className,
  isEnd,
  activeStatue,
  projectTitle,
  startDate,
  endDate,
}) => {
  const projectStatus = isEnd ? PROJECT_STATUS_TYPE.END : PROJECT_STATUS_TYPE.PROGRESS

  return (
    <StyledProjectListItemContainer className={className} activeStatue={activeStatue}>
      <img src={`/svg/project_${projectStatus + activeStatue}.svg`} alt="プロジェクトアイテム" />
      <StyledDragonHeadImg src="/svg/dragon-head_1.svg" alt="ドラゴンの顔" />

      <StyledProjectInfoContainer>
        <StyledProjectTitle>{projectTitle}</StyledProjectTitle>
        <StyledProjectSpan>{date.projectSpan(startDate, endDate)}</StyledProjectSpan>
      </StyledProjectInfoContainer>
    </StyledProjectListItemContainer>
  )
}

const StyledProjectListItemContainer = styled.div<{ activeStatue: ACTIVE_STATUS }>`
  position: relative;
  left: ${calculateMinSizeBasedOnFigmaWidth(0)};
  transition: all 0.3s cubic-bezier(0, 0.39, 0.17, 0.95);

  ${({ activeStatue }) =>
    activeStatue === ACTIVE_STATUS.ACTIVE &&
    css`
      transition: all 0.2s cubic-bezier(0.32, 1, 0.66, 0.99);
      left: ${calculateMinSizeBasedOnFigmaWidth(30)};
    `}

  ${({ activeStatue }) =>
    activeStatue === ACTIVE_STATUS.NOT_ACTIVE &&
    css`
      &:hover {
        left: ${calculateMinSizeBasedOnFigmaWidth(10)};
      }
    `}
`

const StyledDragonHeadImg = styled.img`
  width: ${calculateMinSizeBasedOnFigmaWidth(42)};
  height: ${calculateMinSizeBasedOnFigmaWidth(42)};
  position: absolute;
  top: ${calculateMinSizeBasedOnFigmaWidth(12)};
  left: ${calculateMinSizeBasedOnFigmaWidth(16)};
`

const StyledProjectInfoContainer = styled.div`
  position: absolute;
  top: 50%;
  left: ${calculateMinSizeBasedOnFigmaWidth(76)};
  transform: translateY(-64%);
`

const StyledProjectTitle = styled.h5`
  ${({ theme }) => css`
    font-weight: ${theme.FONT_WEIGHTS.BOLD};
    font-size: ${theme.FONT_SIZES.SIZE_14};
    color: ${theme.COLORS.CHOCOLATE};
    text-align: left;
  `}
`

const StyledProjectSpan = styled.p`
  margin-top: ${calculateMinSizeBasedOnFigmaHeight(5)};
  text-align: left;

  ${({ theme }) => css`
    font-weight: ${theme.FONT_WEIGHTS.NORMAL};
    font-size: ${theme.FONT_SIZES.SIZE_10};
    color: ${theme.COLORS.CHOCOLATE};
  `}
`
