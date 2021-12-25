import React, { FCX } from 'react'
import styled, { css } from 'styled-components'
import { calculateMinSizeBasedOnFigma } from 'utils/calculateSizeBasedOnFigma'

type Props = { onClick?: () => void }

export const InputCancelButton: FCX<Props> = ({ className, onClick }) => {
  return (
    <StyledInputCancelButton className={className} onClick={onClick}>
      <StyledCancelText>キャンセル</StyledCancelText>
    </StyledInputCancelButton>
  )
}

const StyledInputCancelButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
`
const StyledCancelText = styled.p`
  position: relative;
  &:hover {
    opacity: 0.7;
  }

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
    width: 100%;
    height: 0.5px;
    background-color: ${({ theme }) => theme.COLORS.TOBACCO_BROWN};
  }
`
