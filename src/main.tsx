import { configure } from "mobx";
import { Provider } from "mobx-react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

configure({ enforceActions: "observed" });

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>
);
