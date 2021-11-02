import React, { FC, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { regexEmail, regexPassword } from 'consts/regex';
import { firebaseAuth } from 'utils/lib/firebase/firebaseAuth';
import { useInput } from 'hooks/useInput';
import { useAuthContext } from 'context/AuthProvider';

export const SignUp: FC = () => {
  const { user } = useAuthContext();
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const email = useInput('');
  const password = useInput('');

  useEffect(() => {
    if (regexEmail.test(email.value) && regexPassword.test(password.value))
      return setIsDisabled(false);
    setIsDisabled(true);
  }, [email.value, password.value]);

  if (user) return <Redirect to="/" />;

  return (
    <div>
      <h1>新規登録</h1>
      <input type="text" placeholder="メールアドレスを入力" {...email} />
      <input
        type="password"
        placeholder="パスワードを入力"
        {...password}
        minLength={6}
      />
      <button
        disabled={isDisabled}
        onClick={() => firebaseAuth.createUser(email.value, password.value)}>
        登録するボタン
      </button>
    </div>
  );
};
