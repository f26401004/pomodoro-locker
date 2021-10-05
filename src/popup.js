import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Routes from "./app/routes.js";
import store from "./app/redux";
import "./app/styles/index.css";

window.__POMODORO__ = {
  client: null,
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Routes></Routes>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
