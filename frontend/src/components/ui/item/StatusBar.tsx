import React, { FC } from 'react'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'
import styled, { css } from 'styled-components'

type StatusType = 'HP' | 'MP'
type StyleSize = 'small' | 'normal' | 'large'

type Props = {
  type: StatusType
  size: StyleSize
  rate: number
  onlineFlg: boolean
}

export const StatusBar: FC<Props> = ({ type, size, rate, onlineFlg }) => {
  return <StyledStatusBar type={type} size={size} rate={rate} onlineFlg={onlineFlg} />
}

const StyledBar = styled.div<Props>`
  position: relative;
  ${({ size }) => {
    switch (size) {
      case 'small':
        return css`
          width: ${calculateMinSizeBasedOnFigmaWidth(64)};
          height: ${calculateMinSizeBasedOnFigmaWidth(6)};
        `
      case 'normal':
        return css`
          width: ${calculateMinSizeBasedOnFigmaWidth(133)};
          height: ${calculateMinSizeBasedOnFigmaWidth(12)};
        `
      case 'large':
        return css`
          width: ${calculateMinSizeBasedOnFigmaWidth(305)};
          height: ${calculateMinSizeBasedOnFigmaWidth(13)};
        `
    }
  }}
`
const StyledStatusBar = styled(StyledBar)`
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: ${calculateMinSizeBasedOnFigmaWidth(100)};
    background: ${({ theme }) => theme.COLORS.SILVER};
  }
  &::after {
    content: '';
    position: absolute;
    top: 0;
    width: ${({ rate }) => rate}%;
    height: 100%;
    border-radius: ${calculateMinSizeBasedOnFigmaWidth(100)};
    ${({ type, onlineFlg, theme }) =>
      onlineFlg
        ? type === 'HP'
          ? css`
              background: ${theme.COLORS.HP};
            `
          : type === 'MP' &&
            css`
              background: ${theme.COLORS.MP};
            `
        : css`
            background: ${theme.COLORS.SILVER};
          `}
  }
`
