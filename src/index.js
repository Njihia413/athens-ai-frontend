import React from "react";
import * as ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals.js";
import Main from "./Entryfile/Main.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Main />
    </React.StrictMode>
);

reportWebVitals();
