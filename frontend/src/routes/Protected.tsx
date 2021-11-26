import React, { FC, Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { lazyImport } from 'utils/lazyImport'
import { Loading } from 'components/ui/loading/Loading'

const { ProjectList } = lazyImport(() => import('pages/projectList/ProjectList'), 'ProjectList')
const { ProjectDetail } = lazyImport(
  () => import('pages/projectList/projectDetail/ProjectDetail'),
  'ProjectDetail',
)
const { MyPage } = lazyImport(() => import('pages/mypage/MyPage'), 'MyPage')
const { Invitation } = lazyImport(() => import('pages/invitation'), 'Invitation')

const ProtectedRoute: FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Outlet />
    </Suspense>
  )
}

export const protectedRoutes = [
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      { path: '/', element: <ProjectList /> },
      { path: '/projects/:id', element: <ProjectDetail /> },
      { path: '/mypage/:id', element: <MyPage /> },
      { path: '/invitation/:projectId', element: <Invitation /> },
    ],
  },
]
