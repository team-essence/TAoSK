import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { AuthHeader } from 'components/ui/header/AuthHeader'
import { InputField } from 'components/ui/form/InputField'
import { PasswordField } from 'components/ui/form/PasswordField'
import { CoarseButton } from 'components/ui/button/CoarseButton'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import { calculateMinSizeBasedOnFigmaWidth } from 'utils/calculateSizeBasedOnFigma'
import { useSignInForm } from 'hooks/useSignInForm'
import { useTrySignIn } from 'hooks/useTrySignIn'
import styled from 'styled-components'
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
              aspect={{
                width: calculateMinSizeBasedOnFigmaWidth(120),
                height: calculateMinSizeBasedOnFigmaWidth(32),
              }}
              outerBgColor={
                isDisabled
                  ? convertIntoRGBA(theme.COLORS.ALTO, 0.55)
                  : convertIntoRGBA(theme.COLORS.GOLD_SAND, 0.26)
              }
              innerBgColor={
                isDisabled
                  ? convertIntoRGBA(theme.COLORS.NOBEL, 0.64)
                  : convertIntoRGBA(theme.COLORS.SWEET_CON, 0.55)
              }
              color={isDisabled ? theme.COLORS.SILVER : theme.COLORS.CHOCOLATE}
              border="none"
              bgSrcs={isDisabled ? undefined : { outer: 'grain.png', inner: 'light-grain.png' }}
              isDisabled={isDisabled}
              onClick={handleSubmit(trySignIn)}
            />

            <StyledParagraphWrapper>
              <StyledTextLineWrapper>
                <StyledP>TAoSKのアカウントはまだお持ちでないですか？</StyledP>
                <StyledP>
                  ここから<StyledLink to="/signup">登録</StyledLink>
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
  width: ${calculateMinSizeBasedOnFigmaWidth(730)};
  height: 100%;
  margin: ${calculateMinSizeBasedOnFigmaWidth(113)} 0;
  padding: ${calculateMinSizeBasedOnFigmaWidth(30)} 0 ${calculateMinSizeBasedOnFigmaWidth(46)};
  background-image: url('sign-in-paper.png');
  background-size: 100% 100%;
`
const StyledFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: ${calculateMinSizeBasedOnFigmaWidth(480)};
`
const StyledLogoImg = styled.img`
  height: ${calculateMinSizeBasedOnFigmaWidth(170)};
`
const StyledInputField = styled(InputField)`
  label {
    color: ${({ theme }) => theme.COLORS.CHOCOLATE};
    font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_16};
    font-weight: ${({ theme }) => theme.FONT_WEIGHTS.SEMIBOLD};
  }
  input {
    width: 100%;
    height: ${calculateMinSizeBasedOnFigmaWidth(40)};
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
  gap: ${calculateMinSizeBasedOnFigmaWidth(13)};
  margin-top: ${calculateMinSizeBasedOnFigmaWidth(24)};
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
const StyledSignInButton = styled(CoarseButton)`
  display: block;
  margin: 0 auto;
  box-shadow: 0px 2px 4px 0px ${({ theme }) => convertIntoRGBA(theme.COLORS.BLACK, 0.25)};
  font-size: ${({ theme }) => theme.FONT_SIZES.SIZE_14};
  font-weight: ${({ theme }) => theme.FONT_WEIGHTS.SEMIBOLD};
`
