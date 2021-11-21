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

export const SimpleRoundedButton: FC<Props> = ({ className, text, ...WrapperStyles }) => {
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
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius};
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ fontColor }) => fontColor};
  text-align: center;
`
StyledButton.defaultProps = {
  width: '120px',
  height: '40px',
  border: 'none',
  borderRadius: '2px',
  bgColor: theme.COLORS.DODGER_BLUE,
  fontColor: theme.COLORS.WHITE,
}
