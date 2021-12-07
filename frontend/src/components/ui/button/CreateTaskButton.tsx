import React, { FC } from 'react'
import { theme } from 'styles/theme'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'
import styled from 'styled-components'

type Props = {
  onClick: () => void
}

export const CreateTaskButton: FC<Props> = ({ onClick }) => {
  return <StyledContainer onClick={onClick}>+ タスクを追加</StyledContainer>
}

const StyledContainer = styled.button`
  position: relative;
  width: 100%;
  height: ${calculateMinSizeBasedOnFigmaWidth(40)};
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_14};
  font-weight: ${({ theme }) => theme.FONT_WEIGHTS.BOLD};
  color: ${({ theme }) => theme.COLORS.SHIP_COVE};
  border: 1px solid ${convertIntoRGBA(theme.COLORS.MONDO, 0.6)};
  border-radius: 2px;
  background-color: ${({ theme }) => theme.COLORS.LINEN};
  cursor: pointer;
  z-index: ${({ theme }) => theme.Z_INDEX.INDEX_2};
`
