import React, { FC, useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { regexEmail, regexPassword, regexText } from 'consts/regex'
import { occupationList } from 'consts/occupationList'
import { useTrySignUp } from 'hooks/useTrySignUp'
import { useAuthContext } from 'context/AuthProvider'
import { useGetUserByIdLazyQuery } from './document.gen'
import { AuthHeader } from 'components/ui/header/AuthHeader'
import { InputField } from 'components/ui/form/InputField'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { theme } from 'styles/theme'

type FormInputs = Record<'name' | 'company' | 'occupation' | 'email' | 'password', string>

export const SignUp: FC = () => {
  const { currentUser } = useAuthContext()
  const [tryGetUserById, { data }] = useGetUserByIdLazyQuery()
  const [isDisabled, setIsDisabled] = useState<boolean>(true)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormInputs>({
    mode: 'onChange',
  })

  const trySignUp = useTrySignUp({ ...getValues() })

  const watchAllFields = watch()
  const isFirst = useRef(true)

  useEffect(() => {
    const initializeInputValues = () => {
      setValue('name', '', { shouldValidate: true })
      setValue('company', '', { shouldValidate: true })
      setValue('occupation', '', { shouldValidate: true })
      setValue('email', '', { shouldValidate: true })
      setValue('password', '', { shouldValidate: true })
    }
    const hasError = Object.keys(errors).length

    if (isFirst.current) {
      initializeInputValues()
      isFirst.current = false
    } else if (hasError) {
      setIsDisabled(true)
    } else {
      setIsDisabled(false)
    }
  }, [watchAllFields, setValue, errors])

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
          <InputField
            label="冒険者"
            placeholder="名前を入力"
            registration={register('name', { required: true, maxLength: 50, pattern: regexText })}
          />
          <InputField
            label="会社名"
            placeholder="会社名を入力"
            registration={register('company', {
              required: true,
              maxLength: 50,
              pattern: regexText,
            })}
          />
          <InputField
            label="メールアドレス"
            placeholder="メールアドレスを入力"
            registration={register('email', {
              required: true,
              maxLength: 50,
              pattern: regexEmail,
            })}
          />
          <InputField
            label="パスワード"
            placeholder="パスワードを入力"
            registration={register('password', {
              required: true,
              minLength: 6,
              maxLength: 50,
              pattern: regexPassword,
            })}
          />

          <select {...register('occupation', { required: true })}>
            <option value="">職種を選択してください</option>
            {occupationList.map((item, index) => (
              <option value={item} key={index}>
                {item}
              </option>
            ))}
          </select>

          <button disabled={isDisabled} onClick={handleSubmit(trySignUp)}>
            登録するボタン
          </button>
        </StyledRegister>
        <StyledBackground />
      </StyledWrapper>
    </>
  )
}

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
