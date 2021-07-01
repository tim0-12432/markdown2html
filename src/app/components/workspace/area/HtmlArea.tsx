import { makeStyles, Theme } from "@material-ui/core";
import {Controlled as CodeMirror} from "react-codemirror2";
import React from "react";

require("codemirror/mode/htmlmixed/htmlmixed");

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

const HtmlArea = (props: AreaProps) => {
	const classes = useStyles();

	const options = {
		mode: "htmlmixed",
		material: "material",
		lineNumbers: true,
		lineWrapping: true,
		readonly: true
	};

	const htmlWarning = () => {
		console.warn("Html cannot be edited in Code-editor!");
	};

	return (
		<div className={ classes.area }>
			<CodeMirror
				value={ props.value }
				options={ options }
				onBeforeChange={() => htmlWarning}
				onChange={() => htmlWarning}
			/>
		</div>
	);
};

export default HtmlArea;