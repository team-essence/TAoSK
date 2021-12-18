import React, { FCX } from 'react'
import styled, { css } from 'styled-components'
import { calculateMinSizeBasedOnFigma } from 'utils/calculateSizeBasedOnFigma'

type Props = { onClick?: () => void }

export const CancelButton: FCX<Props> = ({ className, onClick }) => {
  return (
    <StyledCancelButton className={className} onClick={onClick}>
      <StyledCancelText>キャンセル</StyledCancelText>
    </StyledCancelButton>
  )
}

const StyledCancelButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
`
const StyledCancelText = styled.p`
  position: relative;
  ${({ theme }) =>
    css`
      font-size: ${theme.FONT_SIZES.SIZE_12};
      font-weight: ${theme.FONT_WEIGHTS.MEDIUM};
      color: ${theme.COLORS.TOBACCO_BROWN};
    `}

  &:after {
    content: '';
    position: absolute;
    bottom: ${calculateMinSizeBasedOnFigma(1.5)};
    left: 0;
    ${({ theme }) =>
      css`
        width: 100%;
        height: 0.5px;
        background-color: ${theme.COLORS.TOBACCO_BROWN};
      `}
  }
`
