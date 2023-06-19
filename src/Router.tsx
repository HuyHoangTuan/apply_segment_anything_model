import React from "react";
import {Route, createBrowserRouter, createRoutesFromElements} from 'react-router-dom';
import App from "./App";

const CustomRouter = createBrowserRouter(
    createRoutesFromElements(
        [
            <Route
                path ="/test"
                loader = {
                    async (props) => {
                        return props;
                    }
                }
                element = {
                    <App/>
                }
            />,
        ]
    )
);

export default CustomRouter;