import React, { FC } from 'react';
import { Redirect } from 'react-router-dom';
import { useAuthContext } from 'context/AuthProvider';

export const SignIn: FC = () => {
  const { user } = useAuthContext();

  if (user) {
    return <Redirect to="/" />;
  } else {
    return (
      <div>
        <p>ログイン</p>
      </div>
    );
  }
};
