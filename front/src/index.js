import React from "react";
import ReactDOM from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import App from "./App";
export { default as Dashboard } from "./pages/admin/Dashboard.jsx";
export { default as ErrorPage } from "./pages/admin/ErrorPage.jsx";
export { default as Login } from "./pages/admin/Login.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
