import React, { FCX, ReactNode } from 'react'
import styled from 'styled-components'

type Props = {
  children: ReactNode
}

export const ContentWrapper: FCX<Props> = ({ children }) => {
  return (
    <>
      <Wrapper>{children}</Wrapper>
      <StyledBackground />
    </>
  )
}

const StyledBackground = styled.div`
  z-index: ${({ theme }) => theme.Z_INDEX.TAILED_DISPLAY};
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.COLORS.BLACK};
`
const Wrapper = styled.div`
  overflow: hidden;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.MAX_WIDTH};
  height: 100vw;
`
