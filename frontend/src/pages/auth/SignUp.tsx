import React, { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { regexEmail, regexPassword, regexText } from 'consts/regex';
import { occupationList } from 'consts/occupationList';
import { firebaseAuth } from 'utils/lib/firebase/firebaseAuth';
import { useInput } from 'hooks/useInput';
import { useAuthContext } from 'context/AuthProvider';
import { useAddUserMutation } from './signUp.gen';
import { useGetUserByIdLazyQuery } from './document.gen';

export const SignUp: FC = () => {
  const { currentUser } = useAuthContext();
  const [addUserMutation] = useAddUserMutation();
  const [tryGetUserById, { data }] = useGetUserByIdLazyQuery();
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const navigate = useNavigate();
  const email = useInput('');
  const password = useInput('');
  const name = useInput('');
  const company = useInput('');
  const occupation = useInput('');

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

  useEffect(() => {
    if (!currentUser) return;
    tryGetUserById({ variables: { id: currentUser.uid } });
    if (!data) return;
    navigate('/');
  }, [currentUser, data, navigate, tryGetUserById]);

  const addUser = (id: string) => {
    addUserMutation({
      variables: {
        id,
        name: name.value,
        icon_image: 'http:aaa',
        company: company.value,
        occupation_id: occupationList.indexOf(occupation.value) + 1,
        context: ['資格1', '資格2', '資格3'],
        qualificationName: ['興味1', '興味2', '興味3'],
      },
    });
  };

  const trySingUp = () => {
    firebaseAuth
      .createUser(email.value, password.value)
      .then(async (result) => {
        await Promise.all([addUser(result.user.uid)])
          .then(() => navigate('/'))
          .catch(() => 'err');
      });
  };

  return (
    <div>
      <h1>新規登録</h1>
      <input
        type="text"
        placeholder="メールアドレスを入力"
        required
        maxLength={50}
        {...email}
      />
      <input
        type="password"
        placeholder="パスワードを入力"
        required
        minLength={6}
        maxLength={50}
        {...password}
      />
      <input
        type="text"
        placeholder="名前を入力"
        required
        maxLength={50}
        {...name}
      />
      <input
        type="text"
        placeholder="会社名を入力"
        required
        maxLength={50}
        {...company}
      />
      <select required {...occupation}>
        <option value="">職種を選択してください</option>
        {occupationList.map((item, index) => (
          <option value={item} key={index}>
            {item}
          </option>
        ))}
      </select>

      <button disabled={isDisabled} onClick={trySingUp}>
        登録するボタン
      </button>
    </div>
  );
};
