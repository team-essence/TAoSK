import React, { FC, useMemo } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AuthProvider } from 'context/AuthProvider';
import { SignUp } from 'pages/auth/SignUp';
import { SignIn } from 'pages/auth/SignIn';
import { Dashboard } from 'pages/home/Dashboard';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { env } from 'env/dotEnv';

const App: FC = () => {
  const cache = new InMemoryCache();
  const client = new ApolloClient({
    uri: `${env.getApiEndpoint()}/graphql`,
    cache,
  });

  return (
    <AuthProvider>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Switch>
            <Route exact={true} path="/" component={Dashboard} />
            <Route exact={true} path="/signup" component={SignUp} />
            <Route exact={true} path="/signin" component={SignIn} />
          </Switch>
        </BrowserRouter>
      </ApolloProvider>
    </AuthProvider>
  );
};

export default App;
