import React, { FC } from 'react'
import { StatusParam } from 'types/status'
import { convertParamIntoJp } from 'utils/convertParamIntoJp'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'
import Status from 'utils/status/status'
import styled, { css } from 'styled-components'

type Props = {
  param: StatusParam
  value: number
}

export const EmployeeStatus: FC<Props> = ({ param, value }) => {
  const rank = Status.toRank(value)
  const proficiency = Status.toRemainderStatus(value)

  return (
    <StyledContainer param={param}>
      <StyledParamContainer>
        <StyledImage src={`/svg/status-${param}.svg`} alt="weapon" />
        <StyledParam>{convertParamIntoJp(param)}</StyledParam>
      </StyledParamContainer>
      <StyledRankContainer>
        <StyledRank>{rank}</StyledRank>
        <StyledRank>{proficiency}</StyledRank>
      </StyledRankContainer>
    </StyledContainer>
  )
}

const StyledContainer = styled.div<{ param: string }>`
  min-width: ${calculateMinSizeBasedOnFigmaWidth(88)};
  padding: ${calculateMinSizeBasedOnFigmaWidth(4)};
  border: 2px solid ${({ theme }) => theme.COLORS.BRANDY};
  border-radius: 4px;
  ${({ param, theme }) => {
    switch (param) {
      case 'technology':
        return css`
          background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
            ${theme.COLORS.STATUS.TECHNOLOGY};
        `
      case 'achievement':
        return css`
          background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
            ${theme.COLORS.STATUS.ACHIEVEMENT};
        `
      case 'solution':
        return css`
          background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
            ${theme.COLORS.STATUS.SOLUTION};
        `
      case 'motivation':
        return css`
          background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
            ${theme.COLORS.STATUS.MOTIVATION};
        `
      case 'design':
        return css`
          background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
            ${theme.COLORS.STATUS.DESIGN};
        `
      case 'plan':
        return css`
          background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
            ${theme.COLORS.STATUS.PLAN};
        `
      default:
        return css`
          background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
            ${theme.COLORS.MINE_SHAFT};
        `
    }
  }}
`
const StyledFlexContainer = styled.div`
  display: flex;
  align-items: center;
`
const StyledParamContainer = styled(StyledFlexContainer)`
  gap: ${calculateMinSizeBasedOnFigmaWidth(4)};
  justify-content: center;
`
const StyledRankContainer = styled(StyledFlexContainer)`
  gap: ${calculateMinSizeBasedOnFigmaWidth(8)};
  justify-content: center;
  border: 2px solid ${({ theme }) => theme.COLORS.BRANDY};
  border-radius: 2px;
  background-color: ${({ theme }) => theme.COLORS.MATTERHORN};
`
const StyledImage = styled.img`
  aspect-ratio: 1/1;
  width: ${calculateMinSizeBasedOnFigmaWidth(14)};
  height: ${calculateMinSizeBasedOnFigmaWidth(14)};
  object-fit: cover;
`
const StyledParam = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_14};
  font-weight: ${({ theme }) => theme.FONT_WEIGHTS.BOLD};
  color: ${({ theme }) => theme.COLORS.WHITE};
  background: linear-gradient(0deg, #2c2c2c, #2c2c2c 100%);
  -webkit-background-clip: text;
  -webkit-text-stroke: 2px transparent;
`
const StyledRank = styled.p`
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_12};
  font-weight: ${({ theme }) => theme.FONT_WEIGHTS.BOLD};
  color: ${({ theme }) => theme.COLORS.WHITE};
`
