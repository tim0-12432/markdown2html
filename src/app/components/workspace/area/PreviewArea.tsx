import {  makeStyles, Theme } from "@material-ui/core";
import Parser from "html-react-parser";
import React from "react";

type AreaProps = {
    value: string
}

const useStyles = makeStyles((theme: Theme) => {
	return {
		area: {
			height: "100%",
			overflow: "hidden"
		}
	};
});

const PreviewArea = (props: AreaProps) => {
	const classes = useStyles();

	return (
		<div className={ classes.area }>
			{
				Parser(props.value)
			}
		</div>
	);
};

export default PreviewArea;