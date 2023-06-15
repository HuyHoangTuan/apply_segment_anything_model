import React from "react";
import {Route, createBrowserRouter, createRoutesFromElements} from 'react-router-dom';

import GuiMainImageView from "../gui/main/image_view/GuiMainImageView";
import PublicRoute from "./PublicRoute";

const CustomRouter = createBrowserRouter(
    createRoutesFromElements(
        [
            <Route
                path ="/*"
                loader = {
                    async (props) => {
                        console.log("GuiMainImageView loader: "+JSON.stringify(props));
                        return props;
                    }
                }
                element = {
                    <PublicRoute>
                        <GuiMainImageView/>
                    </PublicRoute>
                }
            />,
        ]
    )
);

export default CustomRouter;