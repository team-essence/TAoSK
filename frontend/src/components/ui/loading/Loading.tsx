import React, { FC, useEffect } from 'react'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'
import nowLoading from './loading.json'
import lottie from 'lottie-web'
import styled from 'styled-components'

export const Loading: FC = () => {
  useEffect(() => {
    lottie.loadAnimation({
      container: document.querySelector('#now-loading') as HTMLDivElement,
      animationData: nowLoading,
      renderer: 'svg',
    })
  }, [])

  return (
    <StyledContainer>
      <StyledNowLoading id="now-loading" />
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  display: flex;
  place-items: center;
  height: 100vh;
  background-color: #2c2c2c;
`
const StyledNowLoading = styled.div`
  width: ${calculateMinSizeBasedOnFigmaWidth(800)};
  margin: 0 auto;
`
