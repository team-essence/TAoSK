import React, { FC } from 'react';
import { Redirect } from 'react-router-dom';
import { useAuthContext } from 'context/AuthProvider';

export const Dashboard: FC = () => {
  const { user } = useAuthContext();

  if (!user) {
    return <Redirect to="/signup" />;
  } else {
    return (
      <div>
        <p>プロジェクト一覧とか通知とかマイページとか</p>
      </div>
    );
  }
};
