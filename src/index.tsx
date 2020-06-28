import React from "react";
import ReactDOM from "react-dom";
import {
  MuiThemeProvider,
  responsiveFontSizes,
} from "@material-ui/core/styles";
import { Provider } from "react-redux";
import { ApolloProvider } from '@apollo/react-hooks';

import "./index.css";
import App from "./App";
import { taskReducer } from "./store/reducers/taskReducer";
import { createStore } from "redux";

import * as serviceWorker from "./serviceWorker";
import theme from "./theme";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import client from './graphql/client';

const store = createStore(taskReducer);

const app = (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <BrowserRouter>
          <MuiThemeProvider theme={responsiveFontSizes(theme)}>
            <CssBaseline />
            <App />
          </MuiThemeProvider>
        </BrowserRouter>
      </DndProvider>
    </Provider>
  </ApolloProvider>
);

ReactDOM.render(app, document.getElementById("root"));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
