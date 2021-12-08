import React, { FC } from 'react'
import styled, { css } from 'styled-components'
import { calculateMinSizeBasedOnFigma } from 'utils/calculateSizeBasedOnFigma'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import { strokeTextShadow } from 'utils/strokeTextShadow'

type Props = {
  className?: string
  onClick?: () => void
  disabled?: boolean
  text: string
}

export const ModalButton: FC<Props> = ({ className, onClick, text, disabled = false }) => {
  return (
    <StyledButton className={className} onClick={onClick} disabled={disabled}>
      <StyledText>{text}</StyledText>
    </StyledButton>
  )
}

const StyledButton = styled.button<{ disabled: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${calculateMinSizeBasedOnFigma(160)};
  height: ${calculateMinSizeBasedOnFigma(40)};
  background-image: url('/svg/gold-button.svg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  ${({ theme }) => css`
    filter: drop-shadow(
        0 ${calculateMinSizeBasedOnFigma(4)} ${calculateMinSizeBasedOnFigma(4)}
          ${convertIntoRGBA(theme.COLORS.BLACK, 0.25)}
      )
      drop-shadow(
        0 ${calculateMinSizeBasedOnFigma(1.5)} ${calculateMinSizeBasedOnFigma(1)}
          ${convertIntoRGBA(theme.COLORS.BLACK, 0.25)}
      );
  `}

  ${({ disabled }) => {
    if (disabled) {
      return css`
        filter: grayscale(80%) opacity(0.5);
      `
    } else {
      return css`
        &:hover {
          opacity: 0.8;
        }
        &:active {
          filter: brightness(0.5);
        }
      `
    }
  }}
`

const StyledText = styled.p`
  height: ${calculateMinSizeBasedOnFigma(30)};
  text-align: center;
  ${({ theme }) => css`
    ${strokeTextShadow('1.2px', theme.COLORS.MONDO)}
    color: ${theme.COLORS.WHITE};
    font-size: ${theme.FONT_SIZES.SIZE_20};
    font-weight: ${theme.FONT_WEIGHTS.BOLD};
  `}
`
