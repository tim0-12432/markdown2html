import { IconButton, makeStyles, Theme, Typography } from "@material-ui/core";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import React, { useState } from "react";

type AreaProps = {
    label: string,
    value: string
}

const useStyles = makeStyles((theme: Theme) => {
    return {
        area: {
            flex: 1,
            margin: theme.spacing(0, 2),
            border: "1px solid gray",
            borderRadius: "5px"
        },
        legend: {
            color: "gray",
            cursor: "pointer"
        },
        opener: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
            border: "1px solid gray",
            borderRadius: "5px",
            margin: theme.spacing(0, 2),
            position: "relative"
        },
        button: {
            position: "absolute",
            top: "0"
        },
        vertical: {
            transform: "rotate(90deg)"
        }
    }
});

const HtmlArea = (props: AreaProps) => {
    const classes = useStyles();
    const [opened, setOpened] = useState(false);

    return opened
        ? (
            <fieldset
                id="preview"
                className={ classes.area }
            >
                <legend
                    className={ classes.legend }
                    onClick={ () => setOpened(false) }
                >
                    {
                        props.label
                    }
                </legend>
                <pre>
                {
                    props.value
                }
                </pre>
            </fieldset>
        )
        : <div 
            className={ classes.opener }
            onClick={ () => setOpened(true) }
        >
            <IconButton className={ classes.button }>
                <ChevronLeftIcon />
            </IconButton>
            <Typography variant="h6" className={ classes.vertical }>
                {
                    props.label
                }
            </Typography>
        </div>;
};

export default HtmlArea;