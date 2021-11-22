import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { AuthHeader } from 'components/ui/header/AuthHeader'
import { InputField } from 'components/ui/form/InputField'
import { PasswordField } from 'components/ui/form/PasswordField'
import { CoarseButton } from 'components/ui/button/CoarseButton'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import { useNavigateUser } from 'hooks/useNavigateUser'
import { useSignInForm } from 'hooks/useSignInForm'
import { useTrySignIn } from 'hooks/useTrySignIn'
import styled from 'styled-components'
import { theme } from 'styles/theme'

export const SignIn: FC = () => {
  useNavigateUser()
  const { register, handleSubmit, getValues, isDisabled } = useSignInForm()
  const trySignIn = useTrySignIn({ ...getValues() })

  return (
    <>
      <AuthHeader />
      <StyledWrapper>
        <StyledSignIn>
          <StyledLogoImg src={'logo.png'} />
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
              aspect={{ width: '120px', height: '32px' }}
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
  cursor: url('feather-pen.png') 10 124, pointer;
  input,
  select,
  button,
  label,
  a {
    cursor: url('feather-pen.png') 10 124, pointer;
  }
`
const StyledSignIn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: max(50.69vw, 730px);
  height: 100%;
  margin: 113px 0;
  padding: 30px 0 46px;
  background-image: url('sign-in-paper.png');
  background-size: 100% 100%;
`
const StyledFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: min(33.333vw, 480px);
`
const StyledLogoImg = styled.img`
  height: 170px;
`
const StyledInputField = styled(InputField).attrs(() => ({
  inputStyles: {
    border: `solid 1px ${theme.COLORS.CHOCOLATE}`,
    borderRadius: '2px',
  },
  marginBottom: '28px',
}))``
const StyledPasswordField = styled(PasswordField).attrs(() => ({
  marginBottom: '24px',
}))``
const StyledParagraphWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 13px;
  margin-top: 24px;
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
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
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
