import React, { FC, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { regexEmail, regexPassword, regexText } from 'consts/regex'
import { occupationList } from 'consts/occupationList'
import { useInput } from 'hooks/useInput'
import { useTrySignUp } from 'hooks/useTrySignUp'
import { useAuthContext } from 'context/AuthProvider'
import { useGetUserByIdLazyQuery } from './document.gen'

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
    <div>
      <h1>新規登録</h1>
      <input type="text" placeholder="メールアドレスを入力" required maxLength={50} {...email} />
      <input
        type="password"
        placeholder="パスワードを入力"
        required
        minLength={6}
        maxLength={50}
        {...password}
      />
      <input type="text" placeholder="名前を入力" required maxLength={50} {...name} />
      <input type="text" placeholder="会社名を入力" required maxLength={50} {...company} />
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
    </div>
  )
}
