import React, { FC } from 'react'
import styled from 'styled-components'

export const Loading: FC = () => {
  return (
    <StyledContainer>
      <StyledLoader />
    </StyledContainer>
  )
}

// 仮置きだからテーマは弄ってないくてベタがき。
const StyledContainer = styled.div`
  height: 100vh;
  align-items: center;
  background-color: #1d1f20;
  display: flex;
  justify-content: center;
`

const StyledLoader = styled.div`
  animation: rotate 1s infinite;
  height: 50px;
  width: 50px;
  &::before,
  &::after {
    border-radius: 50%;
    content: '';
    display: block;
    height: 20px;
    width: 20px;
  }
  &::before {
    animation: ball1 1s infinite;
    background-color: #cb2025;
    box-shadow: 30px 0 0 #f8b334;
    margin-bottom: 10px;
  }
  &::after {
    animation: ball2 1s infinite;
    background-color: #00a096;
    box-shadow: 30px 0 0 #97bf0d;
  }
  @keyframes rotate {
    0% {
      -webkit-transform: rotate(0deg) scale(0.8);
      -moz-transform: rotate(0deg) scale(0.8);
    }
    50% {
      -webkit-transform: rotate(360deg) scale(1.2);
      -moz-transform: rotate(360deg) scale(1.2);
    }
    100% {
      -webkit-transform: rotate(720deg) scale(0.8);
      -moz-transform: rotate(720deg) scale(0.8);
    }
  }
  @keyframes ball1 {
    0% {
      box-shadow: 30px 0 0 #f8b334;
    }
    50% {
      box-shadow: 0 0 0 #f8b334;
      margin-bottom: 0;
      -webkit-transform: translate(15px, 15px);
      -moz-transform: translate(15px, 15px);
    }
    100% {
      box-shadow: 30px 0 0 #f8b334;
      margin-bottom: 10px;
    }
  }
  @keyframes ball2 {
    0% {
      box-shadow: 30px 0 0 #97bf0d;
    }
    50% {
      box-shadow: 0 0 0 #97bf0d;
      margin-top: -20px;
      -webkit-transform: translate(15px, 15px);
      -moz-transform: translate(15px, 15px);
    }
    100% {
      box-shadow: 30px 0 0 #97bf0d;
      margin-top: 0;
    }
  }
`
