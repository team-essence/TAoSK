import React, { FC, MouseEvent } from 'react'
import styled from 'styled-components'
import { theme } from 'styles/theme'

type Props = {
  className?: string
  width?: string
  height?: string
  border?: string
  borderRadius?: string
  bgColor?: string
  fontColor?: string
  text: string
  onClick?: (v: MouseEvent) => void
}

export const SimpleRadiusButton: FC<Props> = ({ className, text, ...WrapperStyles }) => {
  return (
    <StyledButton className={className} {...WrapperStyles}>
      {text}
    </StyledButton>
  )
}

type StyledButtonProps = Omit<Props, 'text'>

const StyledButton = styled.div<StyledButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${props => props.width};
  height: ${props => props.height};
  border: ${props => props.border};
  border-radius: ${props => props.borderRadius};
  background-color: ${props => props.bgColor};
  color: ${props => props.fontColor};
  text-align: center;
`
StyledButton.defaultProps = {
  width: '120px',
  height: '40px',
  border: 'none',
  borderRadius: '2px',
  bgColor: theme.colors.dodgerBlue,
  fontColor: theme.colors.white,
}
