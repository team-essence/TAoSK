import React, { FC, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useAuthContext } from 'context/AuthProvider';
import { useGetUserLazyQuery } from './mypage.gen';

export const MyPage: FC = () => {
  const { currentUser } = useAuthContext();
  const { id } = useParams();
  const [getUserById, userQuery] = useGetUserLazyQuery();

  useEffect(() => {
    if (!id) return;
    getUserById({ variables: { id } });
  }, [getUserById, id]);

  if (!currentUser) return <Navigate to="/signup" />;
  if (currentUser.uid !== id) return <Navigate to="/" />;

  return (
    <div>
      <p>マイページ</p>
      <pre>{JSON.stringify(userQuery.data?.user, null, '\t')}</pre>
      <pre>{JSON.stringify(userQuery.data?.user.interest, null, '\t')}</pre>
      <pre>
        {JSON.stringify(userQuery.data?.user.qualifications, null, '\t')}
      </pre>
    </div>
  );
};
