import React, { FCX, forwardRef, Ref } from 'react'
import styled from 'styled-components'

type Props = {
  ref: Ref<HTMLDivElement>
}

export const TaskCompleteAnimation: FCX<Props> = forwardRef<HTMLDivElement, Omit<Props, 'ref'>>(
  (_, ref) => {
    return (
      <StyledContainer>
        <StyledAnimation ref={ref} />
      </StyledContainer>
    )
  },
)

TaskCompleteAnimation.displayName = 'TaskCompleteAnimation'

const StyledContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: ${({ theme }) => theme.Z_INDEX.EFFECT};
`
const StyledAnimation = styled.div`
  width: 100%;
`
