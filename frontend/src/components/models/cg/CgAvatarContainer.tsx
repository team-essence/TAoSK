import React, { FCX, ReactNode } from 'react'
import styled from 'styled-components'

export const CgAvatarContainer: FCX = ({ className, children }) => {
  return <StyledCgAvatarContainer className={className}>{children}</StyledCgAvatarContainer>
}

const StyledCgAvatarContainer = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  cursor: grab;
  display: flex;
  align-items: center;
  justify-content: center;

  &:active {
    cursor: grabbing;
  }
`
