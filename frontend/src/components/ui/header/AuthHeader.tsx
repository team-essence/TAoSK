import React, { FC } from 'react'
import styled, { css } from 'styled-components'
import { SimpleRoundedButton } from 'components/ui/button/SimpleRoundedButton'
import { calculateMinSizeBasedOnFigma } from 'utils/calculateSizeBasedOnFigma'
import { useNavigate } from 'react-router-dom'

export const AuthHeader: FC = () => {
  const navigate = useNavigate()

  return (
    <StyledHeaderWrapper>
      <StyledLogoWrapper onClick={() => navigate('/')}>
        <StyledLogo src="svg/logo-transparent-background.svg" alt="TAoSK ロゴ" />
      </StyledLogoWrapper>

      <StyledButtonsWrapper>
        <StyledRegisterButton text="新規登録" onClick={() => navigate('/')} />
        <StyledLoginButton text="ログイン" onClick={() => navigate('/signin')} />
      </StyledButtonsWrapper>
    </StyledHeaderWrapper>
  )
}

const StyledHeaderWrapper = styled.div`
  z-index: ${({ theme }) => theme.Z_INDEX.HEADER};
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${calculateMinSizeBasedOnFigma(28)};
  width: 100vw;
  height: ${calculateMinSizeBasedOnFigma(70)};
  background-color: ${({ theme }) => theme.COLORS.MINE_SHAFT};
`
const StyledLogoWrapper = styled.div`
  object-fit: contain;
  width: 100%;
  height: ${calculateMinSizeBasedOnFigma(43)};
  cursor: pointer;
`
const StyledLogo = styled.img`
  height: ${calculateMinSizeBasedOnFigma(43)};
`
const StyledButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${calculateMinSizeBasedOnFigma(14)};
  height: 100%;
`
const simpleRoundedBtnStyle = css`
  width: ${calculateMinSizeBasedOnFigma(120)};
  height: ${calculateMinSizeBasedOnFigma(40)};
  border-radius: '2px';
  border: solid 1px ${({ theme }) => theme.COLORS.DODGER_BLUE};
  border-radius: 2px;
`
const StyledRegisterButton = styled(SimpleRoundedButton)`
  ${simpleRoundedBtnStyle}
  ${({ theme }) => css`
    background-color: ${theme.COLORS.WHITE};
    color: ${theme.COLORS.DODGER_BLUE};
  `}
`
const StyledLoginButton = styled(SimpleRoundedButton)`
  ${simpleRoundedBtnStyle}
  ${({ theme }) => css`
    background-color: ${theme.COLORS.DODGER_BLUE};
    color: ${theme.COLORS.WHITE};
  `}
`
