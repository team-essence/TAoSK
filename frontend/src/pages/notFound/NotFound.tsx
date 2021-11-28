import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthHeader } from 'components/ui/header/AuthHeader'
import { generateStyleBasedOnFigma } from 'utils/generateStyleBasedOnFigma'
import styled from 'styled-components'

export const NotFound: FC = () => {
  const navigate = useNavigate()
  return (
    <StyledContainer>
      <AuthHeader />
      <StyledNotFoundContainer>
        <StyledH1>Not Found</StyledH1>
        <StyledH2>ページが見つかりません。</StyledH2>
        <StyledTextContainer>
          <p>申し訳ありません。アクセスされたページは見つかりませんでした。</p>
          <p>The requested URL was not found on this server.</p>
          <p>
            入力したアドレスがまちがっているか、
            <br />
            ページが移動もしくは削除されているかもしれません。
          </p>
          <StyledButtonContainer>
            <StyledGorgeousButton onClick={() => navigate('/')}>
              <p>トップへ戻る</p>
            </StyledGorgeousButton>
          </StyledButtonContainer>
        </StyledTextContainer>
      </StyledNotFoundContainer>
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  background-color: ${({ theme }) => theme.COLORS.WHITE};
  height: 100vh;
`
const StyledNotFoundContainer = styled.div`
  position: relative;
  min-height: 536px;
  width: 1050px;
  padding: 0 20px;
  margin: 0 auto;
  background: url('/images/notfound.png') 40px top no-repeat;
  ${generateStyleBasedOnFigma`
    top: 140px;
  `}
`

const StyledH1 = styled.h1`
  position: absolute;
  top: 64px;
  left: 200px;
  font-size: 60px;
`
const StyledH2 = styled.h2`
  position: absolute;
  top: 148px;
  left: 230px;
  font-size: 18px;
`
const StyledTextContainer = styled.div`
  position: absolute;
  top: 200px;
  left: 150px;
  width: 410px;
  font-size: 12px;
  line-height: 2.2;
  text-align: center;
`

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 32px;
`

const StyledGorgeousButton = styled.button`
  display: grid;
  place-items: center;
  width: 226px;
  height: 54px;
  border: none;
  background: url('/images/back-home-bg.png');
  margin-right: 32px;
  p {
    color: #fff;
    font-size: 15px;
    padding-bottom: 3.5px;
  }
`
