import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {  CreatorsProvider } from "./context/creators.context.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CreatorsProvider>
      <App /> 
    </CreatorsProvider>
  </React.StrictMode>
);
