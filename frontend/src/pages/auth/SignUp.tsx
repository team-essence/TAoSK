import React, { FC, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { regexEmail, regexPassword, regexText } from 'consts/regex';
import { occupationList } from 'consts/occupationList';
import { firebaseAuth } from 'utils/lib/firebase/firebaseAuth';
import { useInput } from 'hooks/useInput';
import { useSelectBox } from 'hooks/useSelectBox';
import { useAuthContext } from 'context/AuthProvider';
import { useAddUserMutation } from './docment.gen';

export const SignUp: FC = () => {
  const { currentUser } = useAuthContext();
  const [addUserMutation, { data, loading, error }] = useAddUserMutation();
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const email = useInput('');
  const password = useInput('');
  const name = useInput('');
  const company = useInput('');
  const occupation = useSelectBox('');

  useEffect(() => {
    if (
      regexEmail.test(email.value) &&
      regexPassword.test(password.value) &&
      regexText.test(name.value) &&
      regexText.test(company.value) &&
      occupation.value
    )
      return setIsDisabled(false);
    setIsDisabled(true);
  }, [
    company.value,
    email.value,
    name.value,
    occupation.value,
    password.value,
  ]);

  if (currentUser) return <Navigate to="/" />;

  return (
    <div>
      <h1>新規登録</h1>
      <input type="text" placeholder="メールアドレスを入力" {...email} />
      <input
        type="password"
        placeholder="パスワードを入力"
        minLength={6}
        {...password}
      />
      <input type="text" placeholder="名前を入力" {...name} />
      <input type="text" placeholder="会社名を入力" {...company} />
      <select required {...occupation}>
        <option value="" hidden>
          職種を選択してください
        </option>
        {occupationList.map((item, index) => (
          <option value={item} key={index}>
            {item}
          </option>
        ))}
      </select>
      <button
        disabled={isDisabled}
        onClick={() =>
          firebaseAuth
            .createUser(email.value, password.value)
            .then((result) => {
              addUserMutation({
                variables: {
                  id: result.user.uid,
                  name: name.value,
                  company: company.value,
                  icon_image: 'http:aaa',
                  occupation_id: occupationList.indexOf(occupation.value),
                },
              });
            })
        }>
        登録するボタン
      </button>
    </div>
  );
};
