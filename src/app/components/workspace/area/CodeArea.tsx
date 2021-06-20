import { makeStyles, TextField, Theme } from "@material-ui/core";
import React from "react";

type AreaProps = {
    label: string,
    value: string,
    onChange: any
}

const useStyles = makeStyles((theme: Theme) => {
    return {
        area: {
            flex: 1,
            margin: theme.spacing(0, 2)
        }
    }
});

const CodeArea = (props: AreaProps) => {
    const classes = useStyles();

    return (
        <TextField
            variant="outlined"
            label={ props.label }
            multiline
            rows={ 28 }
            className={ classes.area }
            value={ props.value }
            onChange={ (e) => props.onChange(e.target.value) }
        >

        </TextField>
    );
};

export default CodeArea;