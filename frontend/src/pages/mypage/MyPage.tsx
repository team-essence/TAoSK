import React, { FC, useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useAuthContext } from 'providers/AuthProvider'
import { useGetUserLazyQuery } from './mypage.gen'
import styled, { css } from 'styled-components'
import { ProjectListHeader } from 'components/ui/header/ProjectListHeader'

export const MyPage: FC = () => {
  const { currentUser } = useAuthContext()
  const { id } = useParams()
  const [getUserById, userQuery] = useGetUserLazyQuery()

  useEffect(() => {
    if (!currentUser) return
    getUserById({ variables: { id: currentUser.uid } })
  }, [currentUser, getUserById])

  if (!currentUser) return <Navigate to="/signup" />
  if (currentUser.uid !== id) return <Navigate to="/" />

  return (
    <>
      <ProjectListHeader />

      <p>マイページ</p>
      <pre style={{ color: '#fff' }}>{JSON.stringify(userQuery.data?.user, null, '\t')}</pre>
      <StyledMyPageBackground />
    </>
  )
}

const StyledMyPageBackground = styled.div`
  ${({ theme }) => css`
    z-index: ${theme.Z_INDEX.INDEX_MINUS_1};
    top: ${theme.HEADER_HEIGHT};
    height: calc(100vh - ${theme.HEADER_HEIGHT});
  `};

  position: fixed;
  left: 0;
  width: 100vw;
  background: url('/images/my-page_background.webp');
  background-attachment: fixed;
  background-position: cover;
  background-size: 100% 100%;
  background-repeat: no-repeat;
`
