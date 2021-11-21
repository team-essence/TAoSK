import React, { FC, MouseEvent } from 'react'
import styled from 'styled-components'

type Props = {
  className?: string
  text: string
  outerAspect: Record<'width' | 'height', string>
  innerAspect: Record<'width' | 'height', string>
  outerBgColor: string
  innerBgColor: string
  color: string
  onClick?: (e: MouseEvent) => void
  isDisabled?: boolean
}

export const CoarseButton: FC<Props> = ({
  className,
  text,
  outerAspect,
  innerAspect,
  outerBgColor,
  innerBgColor,
  color,
  onClick,
  isDisabled,
}) => {
  return (
    <StyledButton
      className={className}
      {...outerAspect}
      color={color}
      onClick={onClick}
      disabled={isDisabled}>
      <StyledOuterMask {...outerAspect} bgColor={outerBgColor}>
        <StyledInnerWrapper {...innerAspect}>
          <StyledInnerMask {...innerAspect} bgColor={innerBgColor}>
            {text}
          </StyledInnerMask>
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
  font-size: ${({ theme }) => theme.fontSizes.size_14};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`
const StyledOuterMask = styled.div<StyledAspect & StyledBgColor>`
  ${centeringFlexStyle}
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-radius: 2px;
  background-color: ${({ bgColor }) => bgColor};
`
const StyledInnerWrapper = styled.div<StyledAspect>`
  ${centeringFlexStyle}
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-radius: 2px;
  background-image: url('grain.png');
`
const StyledInnerMask = styled.div<StyledAspect & StyledBgColor>`
  ${centeringFlexStyle}
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border: solid 0.2px ${({ theme }) => theme.colors.brandy};
  border-radius: 2px;
  background-color: ${({ bgColor }) => bgColor};
`
