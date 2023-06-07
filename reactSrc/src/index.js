import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { AuthStateProvider } from "./AuthStateProvider";

import { apiUrl } from "./config";

ReactDOM.render(
  <AuthStateProvider>
    <App apiUrl={apiUrl} />
  </AuthStateProvider>,
  document.getElementById("root")
);

registerServiceWorker();
