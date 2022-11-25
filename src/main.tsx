import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./samples/node-api";
import "styles/index.css";
import store from "./redux/store";
import { Provider } from "react-redux";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

postMessage({ payload: "removeLoading" }, "*");
