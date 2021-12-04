import React, { FC } from 'react'
import { PopoverProps } from 'types/popover'
import { theme } from 'styles/theme'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'
import { BasicPopover } from 'components/ui/modal/BasicPopover'
import { EmployeeStatus } from 'components/models/employee/EmployeeStatus'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'

type Props = {
  className?: string
  technology: number
  achievement: number
  motivation: number
  solution: number
  plan: number
  design: number
} & PopoverProps

export const EmployeePopover: FC<Props> = ({
  anchorEl,
  vertical,
  horizontal,
  handleClose,
  technology,
  achievement,
  motivation,
  solution,
  plan,
  design,
}) => {
  const params = [
    { param: 'technology', value: technology },
    { param: 'achievement', value: achievement },
    { param: 'solution', value: solution },
    { param: 'motivation', value: motivation },
    { param: 'design', value: design },
    { param: 'plan', value: plan },
  ]
  const paramsSortedIntoThreeMaxValues = params
    .sort((prev, current) => (prev.value < current.value ? 1 : -1))
    .slice(0, 3)

  return (
    <BasicPopover
      anchorEl={anchorEl}
      vertical={vertical}
      horizontal={horizontal}
      handleClose={handleClose}>
      <StyledContainer>
        <StyledUpperRow>上段</StyledUpperRow>
        <StyledBorder />
        <StyledLowerRow>
          <div>
            <StyledH4>ステータス</StyledH4>
            <StyledBorder />
            <StyledEmployeeStatus>
              {paramsSortedIntoThreeMaxValues.map((item, index) => (
                <EmployeeStatus key={index} {...item} />
              ))}
            </StyledEmployeeStatus>
          </div>
          <div>
            <StyledH4>興味あること</StyledH4>
            <StyledBorder />
          </div>
          <div>
            <StyledH4>資格</StyledH4>
            <StyledBorder />
          </div>
        </StyledLowerRow>
      </StyledContainer>
    </BasicPopover>
  )
}

const StyledContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.COLORS.BRANDY};
  background-color: ${({ theme }) => theme.COLORS.MINE_SHAFT};
  border-radius: 4px;
`
const StyledUpperRow = styled.div`
  /* border: 1px solid ${({ theme }) => theme.COLORS.BRANDY};
  background-color: ${({ theme }) => theme.COLORS.MINE_SHAFT};
  border-radius: 4px; */
`
const StyledLowerRow = styled.div`
  width: 100%;
  max-height: ${calculateMinSizeBasedOnFigmaWidth(320)};
  padding: ${calculateMinSizeBasedOnFigmaWidth(16)};
  overflow-x: hidden;
  overflow-y: auto;
`
const StyledH4 = styled.h4`
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_14};
  font-weight: ${({ theme }) => theme.FONT_WEIGHTS.BOLD};
  color: ${({ theme }) => theme.COLORS.WHITE};
`
const StyledBorder = styled.div`
  border: 1px solid ${convertIntoRGBA(theme.COLORS.BRANDY, 0.6)};
  border-radius: 4px;
`

const StyledEmployeeStatus = styled.div`
  display: flex;
  gap: ${calculateMinSizeBasedOnFigmaWidth(8)};
`
const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_14};
  font-weight: ${({ theme }) => theme.FONT_WEIGHTS.BOLD};
  color: ${convertIntoRGBA(theme.COLORS.MINE_SHAFT, 0.6)};
`
const StyledText = styled.p`
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_14};
  font-weight: ${({ theme }) => theme.FONT_WEIGHTS.BOLD};
  color: ${convertIntoRGBA(theme.COLORS.MINE_SHAFT, 0.6)};
`
