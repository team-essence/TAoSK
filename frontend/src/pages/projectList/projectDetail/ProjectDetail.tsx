import React, { FC, useEffect } from 'react';
import { Navigate, NavLink } from 'react-router-dom';
import { useAuthContext } from 'context/AuthProvider';

export const ProjectDetail: FC = () => {
  const { currentUser } = useAuthContext();

  return (
    <div>
      <p>プロジェクト詳細</p>
    </div>
  );
};
