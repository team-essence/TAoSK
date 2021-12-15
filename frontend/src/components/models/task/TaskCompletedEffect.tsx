import React, { FCX, useEffect } from 'react'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'
import plan from './config/anim_plan.json'
import lottie from 'lottie-web'
import styled from 'styled-components'

type Props = {
  id: string
}

export const TaskCompletedEffect: FCX<Props> = ({ id }) => {
  return (
    <StyledContainer>
      <StyledContainerA>
        <StyledNowLoading id={id} />
      </StyledContainerA>
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  /* width: 100vw;
  height: 100vh; */
  z-index: 20000;
`
const StyledContainerA = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
`
const StyledNowLoading = styled.div`
  width: 100%;
`
