import { Button, Dialog, Typography, Accordion, AccordionSummary, AccordionDetails, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, TextField, makeStyles, Theme } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ColorPicker from "material-ui-color-picker";
import React from "react";
import { getProp } from "../../../interactivity/conversion/cssify";
import { cssProperties, cssType } from "../../../resources/css";

type DialogProps = {
    open: boolean,
    toggle: () => void,
    call: (command: string) => void,
    css: cssType,
    setCss: (type: string, prop: string, value: string) => void
}

const useStyles = makeStyles((theme: Theme) => {
	return {
		accord: {
			width: "100%"
		},
		details: {
			flexDirection: "column"
		},
		detail: {
			display: "flex",
			alignItems: "baseline"
		},
		detailName: {
			flexGrow: 1
		}
	};
});

function CssDialog(props: DialogProps) {
	const classes = useStyles();

	const exportCss = () => {
		props.call("export-css");
	};

	return (
		<Dialog
			open={ props.open }
			onClose={ props.toggle }
		>
			<DialogTitle>Edit styling properties</DialogTitle>
			<DialogContent>
				<DialogContentText>
                    Edit the properties to change the style of your file.
				</DialogContentText>
				<FormControl component="fieldset" className={ classes.accord }>
					{
						Object.keys(cssProperties).map((type, index) => {
							return (
								<Accordion key={ `type-${index}` }>
									<AccordionSummary
										expandIcon={<ExpandMoreIcon />}
									>
										<Typography variant="h6">{ type }</Typography>
									</AccordionSummary>
									<AccordionDetails className={ classes.details }>
										{
											Object.keys(cssProperties[type].props).map((prop, idx) => {
												return (
													<div className={ classes.detail } key={ `prop-${index}-${idx}` }>
														<Typography className={ classes.detailName }>{ prop }</Typography>
														{
															prop === "color"
																? <ColorPicker
																	name="color"
																	defaultValue="#000"
																	value={ props.css[type].props.color }
																	onChange={ (value) => props.setCss(type, prop, value) }
																/>
																: <TextField
																	label={ typeof prop }
																	type="text"
																	defaultValue={ () => getProp(props.css, type, prop) }
																	onChange={ (e) => props.setCss(type, prop, e.target.value) }
																/>
														}
													</div>
												);
											})
										}
									</AccordionDetails>
								</Accordion>
							);
						})
					}
				</FormControl>
			</DialogContent>
			<DialogActions>
				<Button onClick={exportCss} variant="outlined" color="primary">
                    Export
				</Button>
				<Button onClick={() => {props.toggle();}} variant="contained" color="primary">
                    Done
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default CssDialog;
