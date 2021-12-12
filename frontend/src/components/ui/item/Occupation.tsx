import React, { FCX } from 'react'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'
import styled, { css } from 'styled-components'

type StyleSize = 'small' | 'normal' | 'large'

type Props = {
  occupation: string
  size: StyleSize
}

export const Occupation: FCX<Props> = ({ className, occupation, size }) => {
  return (
    <StyledOccupation className={className} size={size}>
      {occupation}
    </StyledOccupation>
  )
}

const StyledOccupation = styled.div<{ size: StyleSize }>`
  text-align: center;
  font-weight: ${({ theme }) => theme.FONT_WEIGHTS.BOLD};
  color: ${({ theme }) => theme.COLORS.WHITE};
  background-color: ${({ theme }) => theme.COLORS.MATTERHORN};
  ${({ size, theme }) => {
    switch (size) {
      case 'small':
        return css`
          font-size: ${theme.FONT_SIZES.SIZE_10};
          border: 1px solid ${theme.COLORS.BRANDY};
          border-radius: 4px;
          padding: 0 ${calculateMinSizeBasedOnFigmaWidth(4)};
        `
      case 'normal':
        return css`
          font-size: ${theme.FONT_SIZES.SIZE_14};
          border: 2px solid ${theme.COLORS.BRANDY};
          border-radius: 4px;
          padding: 0 ${calculateMinSizeBasedOnFigmaWidth(8)};
        `
      case 'large':
        return css`
          font-size: ${theme.FONT_SIZES.SIZE_10};
          border: 1px solid ${theme.COLORS.BRANDY};
          border-radius: 4px;
          padding: 0 ${calculateMinSizeBasedOnFigmaWidth(4)};
        `
    }
  }}
`
