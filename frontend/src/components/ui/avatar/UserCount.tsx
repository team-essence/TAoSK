import React, { FC } from 'react'
import styled, { css } from 'styled-components'
import { calculateVhBasedOnFigma } from 'utils/calculateVhBaseOnFigma'
import { calculateVwBasedOnFigma } from 'utils/calculateVwBasedOnFigma'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'

type Props = {
  userCount: number
  styleType: STYLE_TYPE
}

export const STYLE_TYPE = {
  LIST: 'list',
  MODAL: 'modal',
  TASK: 'task',
} as const

type STYLE_TYPE = typeof STYLE_TYPE[keyof typeof STYLE_TYPE]

export const UserCount: FC<Props> = ({ userCount, styleType }) => {
  if (styleType === STYLE_TYPE.LIST)
    return (
      <StyledUserCountListContainer>
        <StyledCountText styleType={styleType}>+{userCount}</StyledCountText>
      </StyledUserCountListContainer>
    )
  else if (styleType === STYLE_TYPE.MODAL)
    return (
      <StyledUserCountModalContainer>
        <StyledCountText styleType={styleType}>+{userCount}</StyledCountText>
      </StyledUserCountModalContainer>
    )
  else
    return (
      <StyledUserCountTaskContainer>
        <StyledCountText styleType={styleType}>+{userCount}</StyledCountText>
      </StyledUserCountTaskContainer>
    )
}

const StyledUserCountListContainer = styled.div`
  width: ${calculateVhBasedOnFigma(50)};
  height: ${calculateVhBasedOnFigma(50)};
  border: solid 2px ${({ theme }) => theme.COLORS.ZINNWALDITE};
  background: ${({ theme }) => theme.COLORS.MINE_SHAFT2};
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledUserCountModalContainer = styled.div`
  width: ${calculateVwBasedOnFigma(40)};
  height: ${calculateVwBasedOnFigma(40)};
  background: ${({ theme }) => theme.COLORS.WHITE};
  border-radius: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledUserCountTaskContainer = styled.div`
  width: ${calculateVwBasedOnFigma(24)};
  height: ${calculateVwBasedOnFigma(24)};
  border: solid 1px ${({ theme }) => convertIntoRGBA(theme.COLORS.MONDO, 0.6)};
  border-radius: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledCountText = styled.p<{ styleType: STYLE_TYPE }>`
  text-align: center;
  ${({ styleType, theme }) =>
    styleType === STYLE_TYPE.TASK &&
    css`
      color: ${theme.COLORS.MINE_SHAFT};
      font-size: ${theme.FONT_SIZES.SIZE_10};
    `}
  ${({ styleType, theme }) =>
    styleType === STYLE_TYPE.MODAL &&
    css`
      color: ${theme.COLORS.MONDO};
      font-size: ${theme.FONT_SIZES.SIZE_14};
    `}
  ${({ styleType, theme }) =>
    styleType === STYLE_TYPE.LIST &&
    css`
      color: ${theme.COLORS.WHITE};
    `}
`
