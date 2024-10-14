import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

async function deferRender() {
  const { worker } = await import("./mock/browser");

  return worker.start();
}

deferRender().then(() => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
