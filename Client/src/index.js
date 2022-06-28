import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {AuthContextProvider} from './context/AuthContext.js'

ReactDOM.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
  ,
  document.getElementById("root")
);
