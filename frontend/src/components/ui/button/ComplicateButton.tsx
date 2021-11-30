import React, { FC } from 'react'
import styled, { css } from 'styled-components'
import { calculateMinSizeBasedOnFigma } from 'utils/calculateMinSizeBasedOnFigma'
import { calculateMinSizeBasedOnFigmaHeight } from 'utils/calculateMinSizeBasedOnFigmaHeight'

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

export const ComplicateButton: FC<Props> = ({ buttonColorType, text, onClick }) => {
  return (
    <StyledComplicateButton onClick={onClick}>
      <img src={`/svg/${buttonColorType}`} alt="ボタン画像" />
      <StyledComplicateButtonText>{text}</StyledComplicateButtonText>
    </StyledComplicateButton>
  )
}

const StyledComplicateButton = styled.button`
  position: relative;
  width: ${calculateMinSizeBasedOnFigma(314)};

  img {
    width: ${calculateMinSizeBasedOnFigma(314)};
    display: block;
    object-fit: contain;
  }
`

const StyledComplicateButtonText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
  font-size: ${calculateMinSizeBasedOnFigmaHeight(20)};

  ${({ theme }) => css`
    width: 100%;
    font-weight: ${theme.FONT_WEIGHTS.BOLD};
    color: ${theme.COLORS.WHITE};
    background: linear-gradient(180deg, #7b1616, #342422 52.55%, #4a201f 90.8%);
    background-size: 100% 100%;
    -webkit-background-clip: text;
    -webkit-text-stroke: 4px transparent;
  `}
`
