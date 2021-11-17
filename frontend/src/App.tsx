import React, { FC } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'
import { AuthProvider } from 'context/AuthProvider'
import { SignUp } from 'pages/auth/SignUp'
import { SignIn } from 'pages/auth/SignIn'
import { ProjectList } from 'pages/projectList/ProjectList'
import { MyPage } from 'pages/mypage/MyPage'
import { ProjectDetail } from 'pages/projectList/projectDetail/ProjectDetail'
import { NotFound } from 'pages/notFound/NotFound'
import { client } from './ApolloClient'
import Invitation from 'pages/invitation'

const App: FC = () => {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ProjectList />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/invitation/:projectId" element={<Invitation />} />
            <Route path="/mypage/:id" element={<MyPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ApolloProvider>
  )
}

export default App
