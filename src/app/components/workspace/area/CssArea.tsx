import { makeStyles, Theme } from "@material-ui/core";
import {Controlled as CodeMirror} from 'react-codemirror2';
import React from "react";

require("codemirror/mode/css/css");

type AreaProps = {
    value: string
}

const useStyles = makeStyles((theme: Theme) => {
    return {
        area: {
            height: "100%",
            overflow: "hidden"
        }
    }
});

const CssArea = (props: AreaProps) => {
    const classes = useStyles();

    const options = {
        mode: "css",
        material: "material",
        lineNumbers: true,
        lineWrapping: true,
        readonly: true
    };

    return (
            <div className={ classes.area }>
                <CodeMirror
                    value={ props.value }
                    options={ options }
                    onBeforeChange={(editor, data, value) => {}}
                    onChange={(editor, data, value) => {}}
                />
            </div>
        );
};

export default CssArea;