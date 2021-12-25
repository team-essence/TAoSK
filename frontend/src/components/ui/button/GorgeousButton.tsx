import React, { FCX } from 'react'
import styled, { css } from 'styled-components'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'
import { calculateMinSizeBasedOnFigmaHeight } from 'utils/calculateSizeBasedOnFigma'

type Props = {
  buttonColorType: BUTTON_COLOR_TYPE
  text: string
  onClick: () => void
}

export const BUTTON_COLOR_TYPE = {
  RED: 'button_red.svg',
  YELLOW: 'bottom_yellow.svg',
} as const
type BUTTON_COLOR_TYPE = typeof BUTTON_COLOR_TYPE[keyof typeof BUTTON_COLOR_TYPE]

export const GorgeousButton: FCX<Props> = ({ className, buttonColorType, text, onClick }) => {
  return (
    <StyledGorgeousButton className={className} onClick={onClick}>
      <img src={`/svg/${buttonColorType}`} alt="ボタン画像" />
      <StyledGorgeousButtonText>{text}</StyledGorgeousButtonText>
    </StyledGorgeousButton>
  )
}

const StyledGorgeousButton = styled.button`
  position: relative;
  width: ${calculateMinSizeBasedOnFigmaWidth(314)};

  img {
    width: ${calculateMinSizeBasedOnFigmaWidth(314)};
    display: block;
    object-fit: contain;
  }
`

const StyledGorgeousButtonText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
  font-size: ${calculateMinSizeBasedOnFigmaHeight(20)};

  ${({ theme }) => css`
    width: 100%;
    font-weight: ${theme.FONT_WEIGHTS.BOLD};
    color: ${theme.COLORS.WHITE};
    background: linear-gradient(
      180deg,
      ${theme.COLORS.FALU_RED},
      ${theme.COLORS.BITTER_COCOA_BROWN} 52.55%,
      ${theme.COLORS.SWEET_COCOA_BROWN} 90.8%
    );
    background-size: 100% 100%;
    -webkit-background-clip: text;
    -webkit-text-stroke: 4px transparent;
  `}
`
