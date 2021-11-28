import React, { FC, MouseEvent } from 'react'
import styled from 'styled-components'
import { generateStyleBasedOnFigma } from 'utils/calculateVwBasedOnFigma'
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

export const SimpleRoundedButton: FC<Props> = ({
  className,
  text,
  width,
  height,
  ...WrapperStyles
}) => {
  return (
    <StyledButton className={className} aspect={{ width, height }} {...WrapperStyles}>
      {text}
    </StyledButton>
  )
}

type StyledButtonProps = Omit<Props, 'text' | 'width' | 'height'> & {
  aspect: Pick<Props, 'width' | 'height'>
}

const StyledButton = styled.button<StyledButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius};
  background-color: ${({ bgColor }) => bgColor};
  color: ${({ fontColor }) => fontColor};
  text-align: center;
  ${({ aspect }) =>
    generateStyleBasedOnFigma`
      width: ${aspect.width};
      height: ${aspect.height};
    `}
`
StyledButton.defaultProps = {
  aspect: {
    width: '120px',
    height: '40px',
  },
  border: 'none',
  borderRadius: '2px',
  bgColor: theme.COLORS.DODGER_BLUE,
  fontColor: theme.COLORS.WHITE,
}
