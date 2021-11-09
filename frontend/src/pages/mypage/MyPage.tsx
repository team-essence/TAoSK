import React, { FC, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useAuthContext } from 'context/AuthProvider';
import {
  useUsersLazyQuery,
  useInterestsLazyQuery,
  useQualificationLazyQuery,
} from './mypage.gen';

export const MyPage: FC = () => {
  const { currentUser } = useAuthContext();
  const { id } = useParams();
  const [getUserById, userQuery] = useUsersLazyQuery();
  const [getInterestsById, intetestsQuery] = useInterestsLazyQuery();
  const [getQualificationsById, qualificationsQuery] =
    useQualificationLazyQuery();

  useEffect(() => {
    if (!id) return;
    getUserById({ variables: { id } });
    getInterestsById({ variables: { user_ids: id } });
    getQualificationsById({ variables: { user_ids: id } });
  }, [getInterestsById, getQualificationsById, getUserById, id]);

  if (!currentUser) return <Navigate to="/signup" />;
  if (currentUser.uid !== id) return <Navigate to="/" />;

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
