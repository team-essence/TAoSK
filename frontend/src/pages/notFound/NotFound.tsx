import React, { FC } from 'react'
import { AuthHeader } from 'components/ui/header/AuthHeader'
import styled from 'styled-components'

export const NotFound: FC = () => {
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
  top: 16vh;
  min-height: 536px;
  width: 1050px;
  padding: 0 20px;
  margin: 0 auto;
  background: url('/images/notfound.png') 40px top no-repeat;
`

const StyledH1 = styled.h1`
  position: absolute;
  top: 64px;
  left: 200px;
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_60};
`
const StyledH2 = styled.h2`
  position: absolute;
  top: 148px;
  left: 230px;
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_18};
`
const StyledTextContainer = styled.div`
  position: absolute;
  top: 200px;
  left: 150px;
  width: 400px;
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_12};
  line-height: 2;
  text-align: center;
`
