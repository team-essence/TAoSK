import React, { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { regexEmail, regexPassword, regexText } from 'consts/regex';
import { occupationList } from 'consts/occupationList';
import { companyList } from 'consts/companyList';
import { firebaseAuth } from 'utils/lib/firebase/firebaseAuth';
import { useInput } from 'hooks/useInput';
import { useSelectBox } from 'hooks/useSelectBox';
import { useAuthContext } from 'context/AuthProvider';
import { useAddUserMutation } from './signUp.gen';
import { useGetUserByIdLazyQuery } from './document.gen';

export const SignUp: FC = () => {
  const { currentUser } = useAuthContext();
  const [addUserMutation, { loading, error }] = useAddUserMutation();
  const [tryGetUserById, { data }] = useGetUserByIdLazyQuery();
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const email = useInput('');
  const password = useInput('');
  const name = useInput('');
  const company = useSelectBox('');
  const occupation = useSelectBox('');

  useEffect(() => {
    if (
      regexEmail.test(email.value) &&
      regexPassword.test(password.value) &&
      regexText.test(name.value) &&
      company.value &&
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
    tryGetUserById({
      variables: {
        id: currentUser.uid,
      },
    });
    if (!data) return;
    navigate('/');
  }, [currentUser, data]);

  const trySingUp = () => {
    firebaseAuth
      .createUser(email.value, password.value)
      .then(async (result) => {
        await addUserMutation({
          variables: {
            id: result.user.uid,
            name: name.value,
            icon_image: 'http:aaa',
            companies_id: companyList.indexOf(company.value) + 1,
            occupation_id: occupationList.indexOf(occupation.value) + 1,
          },
        });

        navigate('/');
      });
  };

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
      <select required {...company}>
        <option value="">所属企業を選択してください</option>
        {companyList.map((item, index) => (
          <option value={item} key={index}>
            {item}
          </option>
        ))}
      </select>
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
