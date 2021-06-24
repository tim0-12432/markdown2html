import { makeStyles, Theme } from "@material-ui/core";
import {Controlled as CodeMirror} from 'react-codemirror2';
import React from "react";

require("codemirror/mode/gfm/gfm");

type AreaProps = {
    value: string,
    onChange(value: string): void
}

const useStyles = makeStyles((theme: Theme) => {
    return {
        area: {
            height: "100%",
            overflow: "hidden"
        }
    }
});

const MarkdownArea = (props: AreaProps) => {
    const classes = useStyles();

    const options = {
        mode: "gfm",
        material: "material",
        lineNumbers: true,
        lineWrapping: true
    };

    return (
            <div className={ classes.area }>
                <CodeMirror
                    value={ props.value }
                    options={ options }
                    onBeforeChange={(editor, data, value) => {
                        props.onChange(value);
                    }}
                    onChange={(editor, data, value) => {
                        props.onChange(value);
                    }}
                />
            </div>
        );
};

export default MarkdownArea;