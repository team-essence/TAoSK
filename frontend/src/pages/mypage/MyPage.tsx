import React, { FC, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from 'context/AuthProvider';
import {
  useUsersLazyQuery,
  useInterestsLazyQuery,
  useQualificationLazyQuery,
} from './mypage.gen';

export const MyPage: FC = () => {
  const { currentUser } = useAuthContext();
  const [getUserById, userQuery] = useUsersLazyQuery();
  const [getInterestsById, intetestsQuery] = useInterestsLazyQuery();
  const [getQualificationsById, qualificationsQuery] =
    useQualificationLazyQuery();

  useEffect(() => {
    if (!currentUser) return;
    getUserById({
      variables: { id: currentUser.uid },
    });
    getInterestsById({
      variables: { user_ids: currentUser.uid },
    });
    getQualificationsById({
      variables: { user_ids: currentUser.uid },
    });
  }, [currentUser, getInterestsById, getQualificationsById, getUserById]);

  if (!currentUser) return <Navigate to="/signup" />;

  return (
    <div>
      <p>マイページ</p>
      <pre>{JSON.stringify(userQuery.data?.user, null, '\t')}</pre>
      <pre>{JSON.stringify(intetestsQuery.data?.interests, null, '\t')}</pre>
      <pre>
        {JSON.stringify(qualificationsQuery.data?.qualifications, null, '\t')}
      </pre>
    </div>
  );
};
