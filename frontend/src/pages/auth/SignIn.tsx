import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from 'context/AuthProvider';

export const SignIn: FC = () => {
  const { user } = useAuthContext();

  if (user) return <Navigate to="/" />;

  return (
    <div>
      <p>ログイン</p>
    </div>
  );
};
