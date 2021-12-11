import React, { FCX } from 'react'
import { DEFAUT_USER } from 'consts/defaultImages'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'
import styled, { css } from 'styled-components'

type StyleSize = 'small' | 'normal' | 'large'

type Props = {
  image: string
  size: StyleSize
}

export const Avatar: FCX<Props> = ({ className, image, size }) => {
  return (
    <StyledAvatar
      className={className}
      size={size}
      src={image ? image : DEFAUT_USER}
      alt="avatar"
    />
  )
}

const StyledAvatar = styled.img<{ size: StyleSize }>`
  aspect-ratio: 1 / 1;
  object-fit: cover;
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  ${({ size, theme }) => {
    switch (size) {
      case 'small':
        return css`
          width: ${calculateMinSizeBasedOnFigmaWidth(41)};
          height: ${calculateMinSizeBasedOnFigmaWidth(41)};
          border: 1px solid ${theme.COLORS.BRANDY};
          border-radius: 4px;
        `
      case 'normal':
        return css`
          width: ${calculateMinSizeBasedOnFigmaWidth(80)};
          height: ${calculateMinSizeBasedOnFigmaWidth(80)};
          border: 2px solid ${({ theme }) => theme.COLORS.BRANDY};
          border-radius: 2px;
        `
      case 'large':
        return css`
          width: ${calculateMinSizeBasedOnFigmaWidth(41)};
          height: ${calculateMinSizeBasedOnFigmaWidth(41)};
          border: 1px solid ${theme.COLORS.BRANDY};
          border-radius: 4px;
        `
    }
  }}
`
