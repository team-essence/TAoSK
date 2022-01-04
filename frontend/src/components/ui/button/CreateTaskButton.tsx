import React, { FCX } from 'react'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'
import styled, { css } from 'styled-components'

type Props = {
  onClick: () => void
  disabled: boolean
}

export const CreateTaskButton: FCX<Props> = ({ onClick, disabled }) => {
  return (
    <StyledContainer onClick={onClick} disabled={disabled}>
      + タスクを追加
    </StyledContainer>
  )
}

const StyledContainer = styled.button<{ disabled: boolean }>`
  position: relative;
  width: 100%;
  height: ${calculateMinSizeBasedOnFigmaWidth(40)};

  ${({ theme }) =>
    css`
      z-index: ${theme.Z_INDEX.INDEX_2};
      font-size: ${theme.FONT_SIZES.SIZE_14};
      font-weight: ${theme.FONT_WEIGHTS.BOLD};
      border-radius: 2px;
      background-color: ${theme.COLORS.LINEN};
    `}

  ${({ theme, disabled }) => {
    if (disabled) {
      return css`
        cursor: not-allowed;
        border: 1px solid ${convertIntoRGBA(theme.COLORS.MONDO, 0.2)};
        color: ${convertIntoRGBA(theme.COLORS.SHIP_COVE, 0.4)};
      `
    } else {
      return css`
        cursor: pointer;
        border: 1px solid ${convertIntoRGBA(theme.COLORS.MONDO, 0.6)};
        color: ${theme.COLORS.SHIP_COVE};
      `
    }
  }}
`
