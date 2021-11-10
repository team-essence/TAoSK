import React, { FC, useEffect } from 'react';
import { Navigate, NavLink } from 'react-router-dom';
import { useAuthContext } from 'context/AuthProvider';
import { useUsersLazyQuery } from './projectList.gen';
import { useInput } from 'hooks/useInput';

export const ProjectList: FC = () => {
  const { currentUser } = useAuthContext();
  const [getUserById, { data }] = useUsersLazyQuery();
  const projectTitle = useInput('');
  const projectSummary = useInput('');

  useEffect(() => {
    if (!currentUser) return;
    getUserById({ variables: { id: currentUser.uid } });
  }, [currentUser, getUserById]);

  if (!currentUser) return <Navigate to="/signup" />;

  return (
    <div>
      <NavLink to={`/mypage/${data?.user.id}`}>マイページへ遷移</NavLink>
      <p>プロジェクト一覧</p>
      <br />
      <h4>プロジェクト作成モーダルの内容</h4>
      <input
        type="text"
        placeholder="プロジェクト名を入力"
        required
        maxLength={50}
        {...projectTitle}
      />
      <p>※期限の入力を作る必要あり。現在の日付を入れておく</p>
      <textarea
        placeholder="プロジェクトの概要を"
        required
        maxLength={50}
        {...projectSummary}
      />
      <br />
      <p>※難易度作る必要あり。1を入れておく</p>
      <p>※メンバーの検索作る必要あり。自分だけを入れておく</p>
      <button>プロジェクト作成するよボタン</button>
    </div>
  );
};
