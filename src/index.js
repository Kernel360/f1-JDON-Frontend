import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import App from "./App.jsx";
import HttpsRedirect from "react-https-redirect";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HttpsRedirect>
    <App />
  </HttpsRedirect>
);
reportWebVitals();
