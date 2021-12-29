import React, { FCX } from 'react'
import styled, { css } from 'styled-components'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import { calculateMinSizeBasedOnFigmaHeight } from 'utils/calculateSizeBasedOnFigma'

type Props = {
  onClick: () => void
  disabled: boolean
}

export const CreateListButton: FCX<Props> = ({ className, onClick, disabled }) => {
  return (
    <StyledCreateListButton className={className} onClick={onClick} disabled={disabled}>
      <StyledInnerWrapper>+ リストを追加</StyledInnerWrapper>
    </StyledCreateListButton>
  )
}

const StyledCreateListButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: ${calculateMinSizeBasedOnFigmaHeight(270)};
  height: ${calculateMinSizeBasedOnFigmaHeight(44)};
  ${({ theme }) =>
    css`
      background-color: ${theme.COLORS.LINEN};
      border: solid 1px ${theme.COLORS.RIVER_BED};
      border-radius: 2px;
      box-shadow: -4px 4px 2px ${convertIntoRGBA(theme.COLORS.BLACK, 0.5)};
      font-size: ${theme.FONT_SIZES.SIZE_14};
      font-weight: ${theme.FONT_WEIGHTS.BOLD};
      color: ${theme.COLORS.SHIP_COVE};
    `}
`
const StyledInnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: calc(100% - ${calculateMinSizeBasedOnFigmaHeight(4)});
  height: calc(100% - ${calculateMinSizeBasedOnFigmaHeight(4)});
  ${({ theme }) =>
    css`
      background-color: ${theme.COLORS.LINEN};
      border: solid 2px ${theme.COLORS.RIVER_BED};
      border-radius: 2px;
    `}
`
