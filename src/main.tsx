import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// Polyfill Buffer for browser environment
import { Buffer } from "buffer";
window.Buffer = Buffer;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
