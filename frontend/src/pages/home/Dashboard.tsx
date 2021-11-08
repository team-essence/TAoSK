import React, { FC, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from 'context/AuthProvider';
import { useUsersLazyQuery, useUsersQuery } from './docment.gen';
import { occupationList } from 'consts/occupationList';
import { companyList } from 'consts/companyList';

export const Dashboard: FC = () => {
  const { currentUser } = useAuthContext();

  const [getUserById, { data, loading, error }] = useUsersLazyQuery();

  useEffect(() => {
    if (!currentUser) return;
    getUserById({
      variables: { id: currentUser.uid },
    });
  }, [currentUser]);

  if (!currentUser) return <Navigate to="/signup" />;

  return (
    <div>
      {!loading && (
        <div>
          <p>id：{data?.user.id}</p>
          <p>名前：{data?.user.name}</p>
          <p>
            職種：
            {data?.user.occupation_id &&
              occupationList[data.user.occupation_id - 1]}
          </p>
          <p>
            会社：
            {data?.user.companies_id && companyList[data.user.companies_id - 1]}
          </p>
          <p>HP：{data?.user.hp}</p>
          <p>MP：{data?.user.mp}</p>
          <p>経験値：{data?.user.rank}</p>
        </div>
      )}

      <p>プロジェクト一覧とか通知とかマイページとか</p>
    </div>
  );
};
