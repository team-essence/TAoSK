import React, { forwardRef, ForwardRefExoticComponent, RefAttributes } from 'react'
import styled from 'styled-components'

export const TaskCompleteAnimation: ForwardRefExoticComponent<RefAttributes<HTMLDivElement>> =
  forwardRef<HTMLDivElement>((_, ref) => {
    return (
      <StyledContainer>
        <StyledAnimation ref={ref} />
      </StyledContainer>
    )
  })

TaskCompleteAnimation.displayName = 'TaskCompleteAnimation'

const StyledContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2000;
`
const StyledAnimation = styled.div`
  width: 100%;
`
