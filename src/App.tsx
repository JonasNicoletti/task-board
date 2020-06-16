import React from "react";
import { Switch, Route } from "react-router-dom";
import { ApolloProvider } from '@apollo/react-hooks';

import Layout from "./hoc/Layout";
import Auth from "./containers/auth/Auth";
import TaskBoard from "./containers/task-board/TaskBoard";
import client from './graphql/client';

function App() {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Switch>
          <Route path="/auth" exact component={Auth} />
          <Route path="/" exact component={TaskBoard} />
        </Switch>
      </Layout>
    </ApolloProvider>
  );
}

export default App;
