import React, { FCX, ComponentProps } from 'react'
import styled, { css } from 'styled-components'
import { CoarseButton } from 'components/ui/button/CoarseButton'
import { calculateMinSizeBasedOnFigma } from 'utils/calculateSizeBasedOnFigma'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import { strokeTextShadow } from 'utils/strokeTextShadow'

type Props = ComponentProps<typeof CoarseButton>

export const CoarseRedOxideButton: FCX<Props> = ({ disabled = false, ...props }) => {
  return <StyledCoarseButton {...props} disabled={disabled} />
}

type Disabled = { disabled: boolean }
const StyledCoarseButton = styled(CoarseButton).attrs<Disabled>(({ disabled }) => ({
  disabled,
}))<Disabled>`
  width: ${calculateMinSizeBasedOnFigma(64)};
  height: ${calculateMinSizeBasedOnFigma(32)};
  ${({ disabled, theme }) => {
    if (disabled) {
      return css`
        text-shadow: none;
        color: ${theme.COLORS.SILVER};
        > div {
          background-color: ${convertIntoRGBA(theme.COLORS.ALTO, 0.55)};
          > div > div {
            border: solid 0.2px ${theme.COLORS.BRANDY};
            background-color: ${convertIntoRGBA(theme.COLORS.NOBEL, 0.64)};
          }
        }
      `
    } else {
      return css`
        ${strokeTextShadow('1px', theme.COLORS.MONDO)};
        color: ${theme.COLORS.WHITE};
        > div {
          background-color: ${convertIntoRGBA(theme.COLORS.TEMPTRESS, 0.2)};
          > div > div {
            border: solid 0.2px ${theme.COLORS.BRANDY};
            background-color: ${convertIntoRGBA(theme.COLORS.RED_OXIDE, 0.45)};
          }
        }
      `
    }
  }}
`
