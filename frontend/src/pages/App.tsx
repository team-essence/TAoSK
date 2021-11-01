import React, { FC } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AuthProvider } from 'context/AuthProvider';
import { SignUp } from 'pages/auth/SignUp';
import { SignIn } from 'pages/auth/SignIn';
import { Dashboard } from 'pages/home/Dashboard';

const App: FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <Route exact={true} path="/" component={Dashboard} />
          <Route exact={true} path="/signup" component={SignUp} />
          <Route exact={true} path="/signin" component={SignIn} />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
