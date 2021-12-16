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
      {/* <StyledContainerA> */}
      <StyledNowLoading id={id} />
      {/* </StyledContainerA> */}
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  position: fixed;
  /* display: grid;
  place-items: center; */
  top: 0;
  left: 0;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2000;
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
