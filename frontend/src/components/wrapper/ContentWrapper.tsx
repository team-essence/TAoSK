import React, { FC, ReactNode } from 'react'
import styled from 'styled-components'

type Props = {
  children: ReactNode
}

export const ContentWrapper: FC<Props> = ({ children }) => {
  return <Wrapper>{children}</Wrapper>
}

const Wrapper = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`
