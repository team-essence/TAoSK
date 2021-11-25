import React, { FC, Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { lazyImport } from 'utils/lazyImport'
import { Loading } from 'components/ui/loading/Loading'

const { SignUp } = lazyImport(() => import('pages/auth/SignUp'), 'SignUp')
const { SignIn } = lazyImport(() => import('pages/auth/SignIn'), 'SignIn')

const PublicRoute: FC = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Outlet />
    </Suspense>
  )
}

export const publicRoutes = [
  {
    path: '/',
    element: <PublicRoute />,
    children: [
      { path: '/', element: <SignUp /> },
      { path: '/signin', element: <SignIn /> },
    ],
  },
]
