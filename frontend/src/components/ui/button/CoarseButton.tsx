import React, { FC, MouseEvent } from 'react'
import styled, { css } from 'styled-components'
import { theme } from 'styles/theme'

type BgSrc = 'grain.png' | 'light-grain.png'
type Props = {
  className?: string
  text: string
  aspect: Record<'width' | 'height', string>
  outerBgColor: string
  innerBgColor: string
  color: string
  border?: string
  bgSrcs?: Record<'outer' | 'inner', BgSrc>
  onClick?: (e: MouseEvent) => void
  isDisabled?: boolean
}

export const CoarseButton: FC<Props> = ({
  className,
  text,
  aspect,
  outerBgColor,
  innerBgColor,
  color,
  border = `solid 1px ${theme.COLORS.BRANDY}`,
  bgSrcs = { inner: '/grain.png', outer: '/grain.png' },
  onClick,
  isDisabled = false,
}) => {
  return (
    <StyledButton
      className={className}
      {...aspect}
      color={color}
      bgSrc={bgSrcs.outer}
      onClick={onClick}
      disabled={isDisabled}>
      <StyledOuterMask bgColor={outerBgColor}>
        <StyledInnerWrapper bgSrc={bgSrcs.inner}>
          <StyledInnerMask border={border} bgColor={innerBgColor}>
            {text}
          </StyledInnerMask>
        </StyledInnerWrapper>
      </StyledOuterMask>
    </StyledButton>
  )
}

type FontColor = { color: string }
type BgColor = { bgColor: string }
type BgImageUrl = { bgSrc: string }
type Border = { border: string }
type ButtonStyle = Record<'width' | 'height', string> &
  FontColor &
  BgImageUrl & { disabled: boolean }

const centeringFlexStyle = `
  display: flex;
  justify-content: center;
  align-items: center;
`
const StyledButton = styled.button<ButtonStyle>`
  border-radius: 2px;

  ${({ width, height, color, bgSrc, theme }) => css`
    width: ${width};
    height: ${height};
    background-image: url(${bgSrc});
    color: ${color};
    font-size: ${theme.FONT_SIZES.SIZE_14};
    font-weight: ${theme.FONT_WEIGHTS.MEDIUM};
  `}

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
    `}
`
const StyledOuterMask = styled.div<BgColor>`
  ${centeringFlexStyle}
  width: 100%;
  height: 100%;
  border-radius: 2px;
  background-color: ${({ bgColor }) => bgColor};
`
const StyledInnerWrapper = styled.div<BgImageUrl>`
  ${centeringFlexStyle}
  width: calc(100% - 4px);
  height: calc(100% - 4px);
  border-radius: 2px;
  background-image: url(${({ bgSrc }) => bgSrc});
`
const StyledInnerMask = styled.div<BgColor & Border>`
  ${centeringFlexStyle}
  width: 100%;
  height: 100%;
  border: ${({ border }) => border};
  border-radius: 2px;
  background-color: ${({ bgColor }) => bgColor};
`
