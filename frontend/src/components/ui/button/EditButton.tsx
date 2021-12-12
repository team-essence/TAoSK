import React, { FCX } from 'react'
import styled from 'styled-components'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'

type Props = {
  onClick: () => void
}

export const EditButton: FCX<Props> = ({ className, onClick }) => {
  return (
    <StyledEditButton className={className} onClick={onClick}>
      編集
    </StyledEditButton>
  )
}

export const StyledEditButton = styled.button`
  width: ${calculateMinSizeBasedOnFigmaWidth(72)};
  height: ${calculateMinSizeBasedOnFigmaWidth(32)};
  background: url('/svg/edit-button.svg');
  background-size: cover;
  background-repeat: no-repeat;
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_14};
  color: ${({ theme }) => theme.COLORS.WHITE};
  font-weight: ${({ theme }) => theme.FONT_WEIGHTS.BOLD};
`
