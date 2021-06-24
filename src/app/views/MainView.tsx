import { CssBaseline } from "@material-ui/core";
import React, { FC } from "react";
import Workspace from "../components/workspace/Workspace";

const MainView: FC = () => {
    return (
        <div>
            <CssBaseline />
            <Workspace />
        </div>
    );
};

export default MainView;