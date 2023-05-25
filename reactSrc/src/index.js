import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

const apiUrl = process.env.API_URL || "http://localhost:8080";

ReactDOM.render(<App apiUrl={apiUrl} />, document.getElementById("root"));
//ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
