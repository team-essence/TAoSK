import React, { FCX, useEffect, useRef } from 'react'
import Plan from 'components/models/task/animation/config/anim_plan.json'
import lottie from 'lottie-web'
import styled from 'styled-components'

export const TaskHammerAnimetion: FCX = () => {
  const element = useRef<HTMLDivElement>(null)

  useEffect(() => {
    lottie.loadAnimation({
      container: element.current as HTMLDivElement,
      renderer: 'svg',
      loop: false,
      animationData: Plan,
    })
    return () => lottie.stop()
  }, [])

  return (
    <StyledContainer>
      <StyledPlan ref={element} />
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2000;
`
const StyledPlan = styled.div`
  width: 100%;
`
