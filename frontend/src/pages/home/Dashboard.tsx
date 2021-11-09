import React, { FC, useEffect } from 'react';
import { Navigate, NavLink } from 'react-router-dom';
import { useAuthContext } from 'context/AuthProvider';
import { useUsersLazyQuery } from './user.gen';

export const Dashboard: FC = () => {
  const { currentUser } = useAuthContext();

  const [getUserById, { data }] = useUsersLazyQuery();

  useEffect(() => {
    if (!currentUser) return;
    getUserById({ variables: { id: currentUser.uid } });
  }, [currentUser, getUserById]);

  if (!currentUser) return <Navigate to="/signup" />;

  return (
    <div>
      <NavLink to={`/mypage/${data?.user.id}`}>マイページへ遷移</NavLink>
      <p>プロジェクト一覧が表示される</p>
    </div>
  );
};
