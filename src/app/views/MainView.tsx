import { CssBaseline } from "@material-ui/core";
import React, { FC } from "react";
import Controls from "../components/controls/Controls";
import Workspace from "../components/workspace/Workspace";

const MainView: FC = () => {
    return (
        <div>
            <CssBaseline />
            <Controls />
            <Workspace />
        </div>
    );
};

export default MainView;