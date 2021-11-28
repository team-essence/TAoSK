import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { AuthHeader } from 'components/ui/header/AuthHeader'
import { InputField } from 'components/ui/form/InputField'
import { PasswordField } from 'components/ui/form/PasswordField'
import { CoarseButton } from 'components/ui/button/CoarseButton'
import { convertIntoRGBA } from 'utils/color/convertIntoRGBA'
import { generateStyleBasedOnFigma } from 'utils/generateStyleBasedOnFigma'
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
            <InputField
              label="メールアドレス"
              type="email"
              registration={register('email', { required: true })}
              inputStyles={{
                border: `solid 1px ${theme.COLORS.CHOCOLATE}`,
                borderRadius: '2px',
              }}
            />
            <PasswordField
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
  ${({ theme }) => generateStyleBasedOnFigma`
    padding-top: ${theme.HEADER_HEIGHT};
  `}
  input {
    cursor: url('feather-pen.png') 10 124, pointer;
  }
`
const StyledSignIn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  background-image: url('sign-in-paper.png');
  background-size: 100% 100%;
  ${generateStyleBasedOnFigma`
    margin: 113px 0;
    padding: 30px 0 46px;
    width: 730px;
  `}
`
const StyledFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  ${generateStyleBasedOnFigma`
    width: 480px;
  `}
`
const StyledLogoImg = styled.img`
  ${generateStyleBasedOnFigma`
    height: 170px;
  `}
`
const StyledParagraphWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${generateStyleBasedOnFigma`
    gap: 13px;
    margin-top: 24px;
  `}
`
const StyledTextLineWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`
const StyledP = styled.p`
  color: ${({ theme }) => theme.COLORS.CHOCOLATE};
  font-weight: ${({ theme }) => theme.FONT_WEIGHTS.NORMAL};
  text-align: center;
  ${({ theme }) => generateStyleBasedOnFigma`
    font-size: ${theme.FONT_SIZES.SIZE_14};
  `}
`
const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.COLORS.TIA_MARIA};
  font-weight: ${({ theme }) => theme.FONT_WEIGHTS.SEMIBOLD};
  ${({ theme }) => generateStyleBasedOnFigma`
    font-size: ${theme.FONT_SIZES.SIZE_14};
  `}
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
  font-weight: ${({ theme }) => theme.FONT_WEIGHTS.SEMIBOLD};
  ${({ theme }) => generateStyleBasedOnFigma`
    font-size: ${theme.FONT_SIZES.SIZE_14};
  `}
`
