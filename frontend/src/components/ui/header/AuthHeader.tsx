import React, { FC } from 'react'
import { theme } from 'styles/theme'
import styled from 'styled-components'

export const AuthHeader: FC = () => {
  return (
    <StyledHeaderWrapper>
      <StyledLogoWrapper>
        <img src="svg/logo-transparent-background.svg" alt="" />
      </StyledLogoWrapper>
    </StyledHeaderWrapper>
  )
}

const StyledLogoWrapper = styled.div`
  object-fit: contain;
  width: 100%;
  height: 43px;
`

const StyledHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 28px;
  width: 100vw;
  height: 70px;
  background-color: ${theme.colors.mineShaft};
`
