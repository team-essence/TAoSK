import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { AuthHeader } from 'components/ui/header/AuthHeader'
import { InputField } from 'components/ui/form/InputField'
import { PasswordField } from 'components/ui/form/PasswordField'
import { CoarseButton } from 'components/ui/button/CoarseButton'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import { calculateMinSizeBasedOnFigma } from 'utils/calculateSizeBasedOnFigma'
import { useSignInForm } from 'hooks/useSignInForm'
import { useTrySignIn } from 'hooks/useTrySignIn'
import styled, { css } from 'styled-components'
import { theme } from 'styles/theme'

export const SignIn: FC = () => {
  const { register, handleSubmit, getValues, isDisabled } = useSignInForm()
  const trySignIn = useTrySignIn({ ...getValues() })

  return (
    <>
      <AuthHeader />
      <StyledWrapper>
        <StyledSignIn>
          <StyledLogoImg src="logo.png" alt="TAoSK ロゴ" />
          <StyledFormWrapper>
            <StyledInputField
              label="メールアドレス"
              type="email"
              registration={register('email', { required: true })}
            />
            <StyledPasswordField
              label="パスワード"
              registration={register('password', { required: true })}
            />

            <StyledSignInButton
              text="ログイン"
              bgSrcs={isDisabled ? undefined : { outer: '/grain.png', inner: '/light-grain.png' }}
              disabled={isDisabled}
              onClick={handleSubmit(trySignIn)}
            />

            <StyledParagraphWrapper>
              <StyledTextLineWrapper>
                <StyledP>TAoSKのアカウントはまだお持ちでないですか？</StyledP>
                <StyledP>
                  ここから<StyledLink to="/">登録</StyledLink>
                </StyledP>
              </StyledTextLineWrapper>
              <StyledP>
                パスワードお忘れの方は<StyledLink to="">こちら</StyledLink>
              </StyledP>
            </StyledParagraphWrapper>
          </StyledFormWrapper>
        </StyledSignIn>
        <StyledBackground />
      </StyledWrapper>
    </>
  )
}

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  padding-top: ${({ theme }) => theme.HEADER_HEIGHT};
  input {
    cursor: url('feather-pen.png') 10 124, pointer;
  }
`
const StyledSignIn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${calculateMinSizeBasedOnFigma(730)};
  height: 100%;
  margin: ${calculateMinSizeBasedOnFigma(113)} 0;
  padding: ${calculateMinSizeBasedOnFigma(30)} 0 ${calculateMinSizeBasedOnFigma(46)};
  background-image: url('sign-in-paper.png');
  background-size: 100% 100%;
`
const StyledFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: ${calculateMinSizeBasedOnFigma(480)};
`
const StyledLogoImg = styled.img`
  height: ${calculateMinSizeBasedOnFigma(170)};
`
const StyledInputField = styled(InputField)`
  label {
    color: ${({ theme }) => theme.COLORS.CHOCOLATE};
    font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_16};
    font-weight: ${({ theme }) => theme.FONT_WEIGHTS.SEMIBOLD};
  }
  input {
    width: 100%;
    height: ${calculateMinSizeBasedOnFigma(40)};
    border: solid 1px ${({ theme }) => theme.COLORS.CHOCOLATE};
    border-radius: 2px;
    background-color: ${({ theme }) => convertIntoRGBA(theme.COLORS.WHITE, 0.7)};
    border: solid 1px ${theme.COLORS.CHOCOLATE};
    border-radius: 2px;
    color: ${({ theme }) => theme.COLORS.BLACK};
    &::placeholder {
      font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_14};
      color: ${({ theme }) => theme.COLORS.GRAY};
    }
  }
`
const StyledPasswordField = StyledInputField.withComponent(PasswordField)
const StyledParagraphWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${calculateMinSizeBasedOnFigma(13)};
  margin-top: ${calculateMinSizeBasedOnFigma(24)};
`
const StyledTextLineWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`
const StyledP = styled.p`
  color: ${({ theme }) => theme.COLORS.CHOCOLATE};
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_14};
  font-weight: ${({ theme }) => theme.FONT_WEIGHTS.NORMAL};
  text-align: center;
`
const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.COLORS.TIA_MARIA};
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_14};
  font-weight: ${({ theme }) => theme.FONT_WEIGHTS.SEMIBOLD};
`
const StyledBackground = styled.div`
  z-index: ${({ theme }) => theme.Z_INDEX.INDEX_MINUS_1};
  position: fixed;
  top: ${({ theme }) => theme.HEADER_HEIGHT};
  left: 0;
  width: 100vw;
  height: calc(100vh - ${({ theme }) => theme.HEADER_HEIGHT});
  background-image: url('register-background.png');
  background-size: cover;
  background-position: 50% 100%;
`

type Disabled = { disabled: boolean }
const StyledSignInButton = styled(CoarseButton).attrs<Disabled>(({ disabled }) => ({
  disabled,
}))<Disabled>`
  display: block;
  margin: 0 auto;
  width: ${calculateMinSizeBasedOnFigma(120)};
  height: ${calculateMinSizeBasedOnFigma(32)};
  box-shadow: 0px 2px 4px 0px ${({ theme }) => convertIntoRGBA(theme.COLORS.BLACK, 0.25)};
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_14};
  font-weight: ${({ theme }) => theme.FONT_WEIGHTS.SEMIBOLD};
  > div > div > div {
    border: none;
  }

  ${({ disabled, theme }) => {
    if (disabled) {
      return css`
        color: ${theme.COLORS.SILVER};
        > div {
          background-color: ${convertIntoRGBA(theme.COLORS.ALTO, 0.55)};
          > div > div {
            background-color: ${convertIntoRGBA(theme.COLORS.NOBEL, 0.64)};
          }
        }
      `
    } else {
      return css`
        color: ${theme.COLORS.CHOCOLATE};
        > div {
          background-color: ${convertIntoRGBA(theme.COLORS.GOLD_SAND, 0.26)};
          > div > div {
            background-color: ${convertIntoRGBA(theme.COLORS.SWEET_CON, 0.55)};
          }
        }
      `
    }
  }}
`
