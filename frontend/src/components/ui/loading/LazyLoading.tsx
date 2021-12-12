import React, { FCX, useLayoutEffect, useState } from 'react'
import { Loading } from 'components/ui/loading/Loading'
import styled from 'styled-components'

export const LazyLoading: FCX = () => {
  const [isLoading, setIsLoading] = useState(true)

  useLayoutEffect(() => {
    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
    sleep(4000).then(() => setIsLoading(false))
  }, [])

  return (
    <>
      {isLoading && (
        <StyledContainer>
          <Loading />
        </StyledContainer>
      )}
    </>
  )
}

const StyledContainer = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: ${({ theme }) => theme.Z_INDEX.LOADING};
`
