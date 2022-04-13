import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import ModalInfoCharacter from "./components/ModalInfoCharacter/ModalInfoCharacter";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {ReactDOM.createPortal(
      <ModalInfoCharacter />,
      document.getElementById("modal")
    )}
  </React.StrictMode>,
  document.getElementById("root")
);
