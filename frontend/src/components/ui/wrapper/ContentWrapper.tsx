import React, { FCX, ReactNode } from 'react'
import styled from 'styled-components'

type Props = {
  children: ReactNode
}

export const ContentWrapper: FCX<Props> = ({ children }) => {
  return <Wrapper>{children}</Wrapper>
}

const Wrapper = styled.div`
  max-width: 2560px;
  margin: 0 auto;
`
