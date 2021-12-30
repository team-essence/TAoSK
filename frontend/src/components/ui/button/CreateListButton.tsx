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
      <StyledInnerWrapper disabled={disabled}>+ リストを追加</StyledInnerWrapper>
    </StyledCreateListButton>
  )
}

const StyledCreateListButton = styled.button<{ disabled: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: ${calculateMinSizeBasedOnFigmaHeight(270)};
  height: ${calculateMinSizeBasedOnFigmaHeight(44)};
  ${({ theme }) =>
    css`
      background-color: ${theme.COLORS.LINEN};
      border-radius: 2px;
      box-shadow: -4px 4px 2px ${convertIntoRGBA(theme.COLORS.BLACK, 0.5)};
      font-size: ${theme.FONT_SIZES.SIZE_14};
      font-weight: ${theme.FONT_WEIGHTS.BOLD};
    `}

  ${({ theme, disabled }) => {
    if (disabled) {
      return css`
        cursor: not-allowed;
        border: solid 1px ${convertIntoRGBA(theme.COLORS.RIVER_BED, 0.4)};
        color: ${convertIntoRGBA(theme.COLORS.SHIP_COVE, 0.4)};
      `
    } else {
      return css`
        cursor: pointer;
        border: solid 1px ${theme.COLORS.RIVER_BED};
        color: ${theme.COLORS.SHIP_COVE};
      `
    }
  }}
`
const StyledInnerWrapper = styled.div<{ disabled: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: calc(100% - ${calculateMinSizeBasedOnFigmaHeight(4)});
  height: calc(100% - ${calculateMinSizeBasedOnFigmaHeight(4)});
  ${({ theme, disabled }) =>
    css`
      background-color: ${theme.COLORS.LINEN};
      border: solid 2px ${convertIntoRGBA(theme.COLORS.RIVER_BED, disabled ? 0.4 : 1)};
      border-radius: 2px;
    `}
`
