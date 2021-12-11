import React, { FCX, MouseEvent } from 'react'
import styled from 'styled-components'

type Props = {
  text: string
  onClick?: (e: MouseEvent) => void
}

export const SimpleRoundedButton: FCX<Props> = ({ className, text, onClick }) => {
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
