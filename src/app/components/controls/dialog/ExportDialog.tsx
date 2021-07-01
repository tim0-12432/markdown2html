import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormGroup, FormLabel } from "@material-ui/core";
import React, { useState } from "react";

type DialogProps = {
    open: boolean,
    toggle: () => void,
    call: (command: string) => void
}

type OptionProps = {
    [key: string]: boolean
}

const ExportDialog = (props: DialogProps) => {
	const [options, setOptions] = useState<OptionProps>({
		markdown: true,
		html: false,
		css: false
	});

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setOptions({ ...options, [event.target.name]: event.target.checked });
	};

	const startExportation = () => {
		Object.keys(options).forEach((key) => {
			if(options[key]) {
				props.call(`export-${key}`);
			}
		});
		props.toggle();
	};

	const { markdown, html, css } = options;
	const error = [markdown, html, css].filter((v) => v).length < 1;

	return (
		<Dialog
			open={ props.open }
			onClose={ props.toggle }
		>
			<DialogTitle>Export files</DialogTitle>
			<DialogContent>
				<DialogContentText>
                    Select which files you want to export.
				</DialogContentText>
				<FormControl required error={error} component="fieldset">
					<FormLabel component="legend">Pick at least one!</FormLabel>
					<FormGroup>
						<FormControlLabel
							control={<Checkbox checked={markdown} onChange={handleChange} name="markdown" />}
							label="Markdown"
						/>
						<FormControlLabel
							control={<Checkbox checked={html} onChange={handleChange} name="html" />}
							label="HTML"
						/>
						<FormControlLabel
							control={<Checkbox checked={css} onChange={handleChange} name="css" />}
							label="CSS"
						/>
					</FormGroup>
				</FormControl>
			</DialogContent>
			<DialogActions>
				<Button onClick={props.toggle} variant="outlined" color="primary">
                    Cancel
				</Button>
				<Button onClick={startExportation} variant="contained" color="primary">
                    Export
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ExportDialog;
