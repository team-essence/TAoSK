import React, { FC, MouseEvent } from 'react'
import styled from 'styled-components'

type Props = {
  className?: string
  text: string
  aspect: Record<'width' | 'height', string>
  outerBgColor: string
  innerBgColor: string
  color: string
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
  onClick,
  isDisabled,
}) => {
  return (
    <StyledButton
      className={className}
      {...aspect}
      color={color}
      onClick={onClick}
      disabled={isDisabled}>
      <StyledOuterMask bgColor={outerBgColor}>
        <StyledInnerWrapper>
          <StyledInnerMask bgColor={innerBgColor}>{text}</StyledInnerMask>
        </StyledInnerWrapper>
      </StyledOuterMask>
    </StyledButton>
  )
}

type StyledAspect = Record<'width' | 'height', string>
type StyledFontColor = Record<'color', string>
type StyledBgColor = Record<'bgColor', string>

const centeringFlexStyle = `
  display: flex;
  justify-content: center;
  align-items: center;
`
const StyledButton = styled.button<StyledAspect & StyledFontColor>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-radius: 2px;
  background-image: url('grain.png');
  color: ${({ color }) => color};
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_14};
  font-weight: ${({ theme }) => theme.FONT_WEIGHTS.MEDIUM};
`
const StyledOuterMask = styled.div<StyledBgColor>`
  ${centeringFlexStyle}
  width: 100%;
  height: 100%;
  border-radius: 2px;
  background-color: ${({ bgColor }) => bgColor};
`
const StyledInnerWrapper = styled.div`
  ${centeringFlexStyle}
  width: calc(100% - 4px);
  height: calc(100% - 4px);
  border-radius: 2px;
  background-image: url('grain.png');
`
const StyledInnerMask = styled.div<StyledBgColor>`
  ${centeringFlexStyle}
  width: 100%;
  height: 100%;
  border: solid 0.2px ${({ theme }) => theme.COLORS.BRANDY};
  border-radius: 2px;
  background-color: ${({ bgColor }) => bgColor};
`
