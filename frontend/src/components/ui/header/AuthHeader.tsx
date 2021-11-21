import React, { FC } from 'react'
import { theme } from 'styles/theme'
import styled from 'styled-components'
import { SimpleRadiusButton } from 'components/ui/button/SimpleRadiusButton'

export const AuthHeader: FC = () => {
  const commonButtonProps = {
    width: '120px',
    height: '40px',
    borderRadius: '2px',
  }
  const registerButtonProps = {
    border: `solid 1px ${theme.COLORS.DODGER_BLUE}`,
    bgColor: theme.COLORS.WHITE,
    fontColor: theme.COLORS.DODGER_BLUE,
    text: '新規登録',
  }
  const loginButtonProps = {
    border: `solid 1px ${theme.COLORS.DODGER_BLUE}`,
    bgColor: theme.COLORS.DODGER_BLUE,
    text: 'ログイン',
  }

  return (
    <StyledHeaderWrapper>
      <StyledLogoWrapper>
        <img src="svg/logo-transparent-background.svg" alt="" />
      </StyledLogoWrapper>

      <StyledButtonsWrapper>
        <SimpleRadiusButton {...commonButtonProps} {...registerButtonProps} />
        <SimpleRadiusButton {...commonButtonProps} {...loginButtonProps} />
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
  padding: 0 28px;
  width: 100vw;
  height: 70px;
  background-color: ${({ theme }) => theme.COLORS.MINE_SHAFT};
`
const StyledLogoWrapper = styled.div`
  object-fit: contain;
  width: 100%;
  height: 43px;
`
const StyledButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 14px;
  height: 100%;
`
