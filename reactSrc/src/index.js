import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import Modal from "react-modal";

import { apiUrl } from "./config";

Modal.setAppElement("#root");

ReactDOM.render(<App apiUrl={apiUrl} />, document.getElementById("root"));
//ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
