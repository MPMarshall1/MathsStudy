import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { MathJaxContext } from "better-react-mathjax";

const config = {
  loader: { load: ["input/tex", "output/chtml"] }
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <MathJaxContext version={3} config={config}>
    <App />
  </MathJaxContext>
);