import React, { FCX } from 'react'
import styled from 'styled-components'

export const MobileScreen: FCX = () => {
  return <StyledContainer />
}

const StyledContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  min-height: -webkit-fill-available;
  background: url('/images/mobile/mobile-bg.svg') center center;
  background-repeat: no-repeat;
  background-size: cover;
`
