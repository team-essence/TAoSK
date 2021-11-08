import React, { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from 'context/AuthProvider';
import { SignUp } from 'pages/auth/SignUp';
import { SignIn } from 'pages/auth/SignIn';
import { Dashboard } from 'pages/home/Dashboard';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { env } from 'env/dotEnv';

const App: FC = () => {
  const client = new ApolloClient({
    link: createHttpLink({
      uri: `${env.getApiEndpoint()}/graphql`,
    }),
    cache: new InMemoryCache(),
  });

  return (
    <AuthProvider>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
          </Routes>
        </BrowserRouter>
      </ApolloProvider>
    </AuthProvider>
  );
};

export default App;
