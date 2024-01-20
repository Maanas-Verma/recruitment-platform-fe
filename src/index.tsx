import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosResponseInterceptor from "./api-service/axios-response-interceptor";
import axiosRequestInterceptor from "./api-service/axios-request-interceptor";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

axiosRequestInterceptor();
axiosResponseInterceptor();

root.render(
  <React.StrictMode>
    <ToastContainer
      containerId="toast-container-message"
      position="top-center"
      autoClose={4000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
