import React, { FCX } from 'react'
import { useCompleteAnimation } from 'hooks/useCompleteAnimation'
import technology from 'components/models/task/animation/config/anim_technology.json'
import styled from 'styled-components'

export const TaskSwordAnimetion: FCX = () => {
  const { anchorEl } = useCompleteAnimation<HTMLDivElement>(technology)

  return (
    <StyledContainer>
      <StyledPlan ref={anchorEl} />
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
