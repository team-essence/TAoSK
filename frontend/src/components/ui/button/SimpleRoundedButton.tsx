import React, { FC, MouseEvent } from 'react'
import styled from 'styled-components'

type Props = {
  className?: string
  text: string
  onClick?: (e: MouseEvent) => void
}

export const SimpleRoundedButton: FC<Props> = ({ className, text, onClick }) => {
  return (
    <StyledButton className={className} onClick={onClick}>
      {text}
    </StyledButton>
  )
}

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`
