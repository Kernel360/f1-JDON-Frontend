import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { CookiesProvider } from "react-cookie";
import App from "./App.jsx";
import HttpsRedirect from "react-https-redirect";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HttpsRedirect>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </HttpsRedirect>
);
reportWebVitals();
