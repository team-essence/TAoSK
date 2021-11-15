import React, { FC } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from 'context/AuthProvider'
import { SignUp } from 'pages/auth/SignUp'
import { SignIn } from 'pages/auth/SignIn'
import { ProjectList } from 'pages/projectList/ProjectList'
import { MyPage } from 'pages/mypage/MyPage'
import { env } from 'env/dotEnv'
import { ApolloProvider } from '@apollo/client'

import { client } from './ApolloClient'
import { ProjectDetail } from 'pages/projectList/projectDetail/ProjectDetail'
import { ToastContainer } from 'react-toastify'
import { ContentWrapper } from 'components/wrapper/ContentWrapper'

const App: FC = () => {
  return (
    <AuthProvider>
      <ApolloProvider client={client}>
        <ContentWrapper>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<ProjectList />} />
              <Route path="/projects/:id" element={<ProjectDetail />} />
              <Route path="/mypage/:id" element={<MyPage />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
            </Routes>
          </BrowserRouter>
        </ContentWrapper>
      </ApolloProvider>
    </AuthProvider>
  )
}

export default App
