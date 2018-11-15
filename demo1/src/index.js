import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import store from "./store";
import App from "./component/App";
import "./static/css/reset.min.css";



render(
    <Provider store={store}>
    <BrowserRouter>
        <App/>
    </BrowserRouter>
</Provider>, window.root);








