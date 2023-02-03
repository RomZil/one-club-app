import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Footbar from "./components/navbar/footbar";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Footbar />
    <App />
  </>
);

reportWebVitals();
