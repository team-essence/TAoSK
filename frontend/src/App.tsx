import React, { FC } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Signup } from 'pages/auth/Signup';
import { Signin } from 'pages/auth/Signin';
import { Dashboard } from 'pages/home/Dashboard';

const App: FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact={true} path="/" component={Dashboard} />
        <Route exact={true} path="/signup" component={Signup} />
        <Route exact={true} path="/signin" component={Signin} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
