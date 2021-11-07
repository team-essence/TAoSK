import React, { FC, useMemo } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from 'context/AuthProvider';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { useUsersQuery } from './docment.gen';

export const Dashboard: FC = () => {
  const { currentUser } = useAuthContext();

  const usersQuery = useUsersQuery({
    variables: { id: 'a' },
  });

  if (!currentUser) return <Navigate to="/signup" />;

  return (
    <div>
      {!usersQuery.loading && <>{JSON.stringify(usersQuery.data?.user)}</>}

      <p>プロジェクト一覧とか通知とかマイページとか</p>
    </div>
  );
};
