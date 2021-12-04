import React, { FC } from 'react'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'
import styled, { css } from 'styled-components'

type StyleSize = 'small' | 'normal' | 'large'

type Props = {
  level: number
  size: StyleSize
}

export const Level: FC<Props> = ({ level, size }) => {
  return <StyledLevel size={size}>{`lv.${level}`}</StyledLevel>
}

const StyledLevel = styled.div<{ size: StyleSize }>`
  text-align: center;
  font-weight: ${({ theme }) => theme.FONT_WEIGHTS.BOLD};
  color: ${({ theme }) => theme.COLORS.WHITE};
  background-color: ${({ theme }) => theme.COLORS.MATTERHORN};
  ${({ size, theme }) => {
    switch (size) {
      case 'small':
        return css`
          min-width: ${calculateMinSizeBasedOnFigmaWidth(32)};
          font-size: ${theme.FONT_SIZES.SIZE_10};
          border: 1px solid ${theme.COLORS.BRANDY};
          border-radius: 4px;
          padding: 0 ${calculateMinSizeBasedOnFigmaWidth(4)};
        `
      case 'normal':
        return css`
          min-width: ${calculateMinSizeBasedOnFigmaWidth(32)};
          font-size: ${theme.FONT_SIZES.SIZE_10};
          border: 1px solid ${theme.COLORS.BRANDY};
          border-radius: 4px;
          padding: 0 ${calculateMinSizeBasedOnFigmaWidth(4)};
        `
      case 'large':
        return css`
          min-width: ${calculateMinSizeBasedOnFigmaWidth(32)};
          font-size: ${theme.FONT_SIZES.SIZE_10};
          border: 1px solid ${theme.COLORS.BRANDY};
          border-radius: 4px;
          padding: 0 ${calculateMinSizeBasedOnFigmaWidth(4)};
        `
    }
  }}
`
