import React, { FC, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { regexEmail, regexPassword, regexText } from 'consts/regex'
import { occupationList } from 'consts/occupationList'
import { useInput } from 'hooks/useInput'
import { useTrySignUp } from 'hooks/useTrySignUp'
import { useAuthContext } from 'context/AuthProvider'
import { useGetUserByIdLazyQuery } from './document.gen'
import { AuthHeader } from 'components/ui/header/AuthHeader'
import styled from 'styled-components'
import { theme } from 'styles/theme'

export const SignUp: FC = () => {
  const { currentUser } = useAuthContext()
  const [tryGetUserById, { data }] = useGetUserByIdLazyQuery()
  const [isDisabled, setIsDisabled] = useState<boolean>(true)
  const navigate = useNavigate()
  const name = useInput('')
  const company = useInput('')
  const occupation = useInput('')
  const email = useInput('')
  const password = useInput('')
  const trySignUp = useTrySignUp(name, company, occupation, email, password)

  useEffect(() => {
    if (
      regexEmail.test(email.value) &&
      regexPassword.test(password.value) &&
      regexText.test(name.value) &&
      regexText.test(company.value) &&
      occupation.value
    ) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }, [company.value, email.value, name.value, occupation.value, password.value])

  useEffect(() => {
    if (!currentUser) return
    tryGetUserById({ variables: { id: currentUser.uid } })
    if (!data) return
    navigate('/')
  }, [currentUser, data, navigate, tryGetUserById])

  return (
    <>
      <AuthHeader />
      <StyledWrapper>
        <StyledRegister>
          <StyledLogoImg src={'logo.png'} />
          <StyledH1>新規登録書</StyledH1>
          <StyledLabel>
            冒険者名
            <input type="text" placeholder="名前を入力" required maxLength={50} {...name} />
          </StyledLabel>
          <StyledLabel>
            会社名
            <input type="text" placeholder="会社名を入力" required maxLength={50} {...company} />
          </StyledLabel>
          <StyledLabel>
            メールアドレス
            <input
              type="text"
              placeholder="メールアドレスを入力"
              required
              maxLength={50}
              {...email}
            />
          </StyledLabel>
          <StyledLabel>
            パスワード
            <input
              type="password"
              placeholder="パスワードを入力"
              required
              minLength={6}
              maxLength={50}
              {...password}
            />
          </StyledLabel>

          <select required {...occupation}>
            <option value="">職種を選択してください</option>
            {occupationList.map((item, index) => (
              <option value={item} key={index}>
                {item}
              </option>
            ))}
          </select>

          <button disabled={isDisabled} onClick={trySignUp}>
            登録するボタン
          </button>
        </StyledRegister>
        <StyledBackground />
      </StyledWrapper>
    </>
  )
}

type StyledLabelProps = { color?: string }

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  height: calc(100vh - ${theme.headerHeight});
  padding-top: ${theme.headerHeight};
`
const StyledRegister = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 840px;
  height: 1320px;
  margin-top: 26px;
  padding-top: 31px;
  background-image: url('contract-paper.png');
`
const StyledLogoImg = styled.img`
  height: 108px;
`
const StyledH1 = styled.h1`
  margin: 33px 0;
  background: -webkit-linear-gradient(top, ${theme.colors.tenn}, ${theme.colors.nero});
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: ${theme.fontSizes.size_40};
`
const StyledLabel = styled.label<StyledLabelProps>`
  color: ${props => props.color};
  font-size: ${theme.fontSizes.size_16};
`
StyledLabel.defaultProps = {
  color: theme.colors.chocolate,
}
const StyledBackground = styled.div`
  z-index: -1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: url('register-background.png');
  background-size: cover;
  background-position: 50% 100%;
`
