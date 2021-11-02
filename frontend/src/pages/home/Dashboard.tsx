import React, { FC, useMemo } from 'react';
import { Redirect } from 'react-router-dom';
import { useAuthContext } from 'context/AuthProvider';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client';

export const Dashboard: FC = () => {
  const { user } = useAuthContext();

  const todosQuery = useMemo(
    () => gql`
      {
        todos {
          name
          id
        }
      }
    `,
    []
  );

  // クエリを発行する
  const { loading, error, data } = useQuery(todosQuery);

  // 結果を表示する
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { todos } = data;

  if (!user) {
    return <Redirect to="/signup" />;
  } else {
    return (
      <div>
        {JSON.stringify(todos)}
        <p>プロジェクト一覧とか通知とかマイページとか</p>
      </div>
    );
  }
};
