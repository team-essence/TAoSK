import React, { FC } from 'react'
import styled from 'styled-components'

type Props = {
  error: Error
}

export const ErrorScreen: FC<Props> = ({ error }) => {
  return (
    <StyledErrorContainer>
      <h3>we are sorry... something went wrong.</h3>
      <p>we cannot process your request at this moment.。</p>
      <p>ERROR: {error.message}</p>
    </StyledErrorContainer>
  )
}

const StyledErrorContainer = styled.div`
  background-color: ${({ theme }) => theme.COLORS.SEA_PINK};
  border: double 4px ${({ theme }) => theme.COLORS.TOTEM_POLE};
  color: ${({ theme }) => theme.COLORS.TOTEM_POLE};
  padding: 1em;
`
