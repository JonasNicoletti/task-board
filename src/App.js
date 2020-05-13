import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from './hoc/Layout';
import Auth from './containers/auth/Auth';
import TaskBoard from './containers/task-board/TaskBoard';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/auth" exact component={Auth} />
        <Route path="/" exact component={TaskBoard} />
      </Switch>
    </Layout>
  );
}

export default App;
