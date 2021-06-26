import React from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { PaletteType } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";

export const theme = (theme: PaletteType) => {
	const paper = theme === "dark" ? grey[800] : grey[100];
	const background = theme === "dark" ? grey[900] : grey[200];
	return createMuiTheme({
		palette: {
			type: theme,
			primary: {
				light: "#ff7f2a",
				main: "#ff6600",
				dark: "#d45500",
				contrastText: "#eee"
			},
			secondary: {
				light: "#ff55dd",
				main: "#ff00cc",
				dark: "#d400aa",
				contrastText: "#222"
			},
			background: {
				paper: paper,
				default: background
			}
		},
	});
};

export function PreferredColorScheme(): PaletteType {
	if (useMediaQuery("(prefers-color-scheme: dark)")) {
		return "dark";
	}
	return "light";
}

export default theme;