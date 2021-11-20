import React, { FC } from 'react'
import styled from 'styled-components'

type Props = {
  text: string
  outerAspect: Record<'width' | 'height', string>
  innerAspect: Record<'width' | 'height', string>
  outerBgColor: string
  innerBgColor: string
  color: string
}

export const CoarseButton: FC<Props> = ({
  text,
  outerAspect,
  innerAspect,
  outerBgColor,
  innerBgColor,
  color,
}) => {
  return (
    <StyledButton {...outerAspect} color={color}>
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
  width: ${props => props.width};
  height: ${props => props.height};
  border-radius: 2px;
  background-image: url('grain.png');
  color: ${props => props.color};
  font-size: ${({ theme }) => theme.fontSizes.size_14};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`
const StyledOuterMask = styled.div<StyledAspect & StyledBgColor>`
  ${centeringFlexStyle}
  width: ${props => props.width};
  height: ${props => props.height};
  border-radius: 2px;
  background-color: ${props => props.bgColor};
`
const StyledInnerWrapper = styled.div<StyledAspect>`
  ${centeringFlexStyle}
  width: ${props => props.width};
  height: ${props => props.height};
  border-radius: 2px;
  background-image: url('grain.png');
`
const StyledInnerMask = styled.div<StyledAspect & StyledBgColor>`
  ${centeringFlexStyle}
  width: ${props => props.width};
  height: ${props => props.height};
  border: solid 0.2px ${({ theme }) => theme.colors.brandy};
  border-radius: 2px;
  background-color: ${props => props.bgColor};
`
