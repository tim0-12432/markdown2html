import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { PreferredColorScheme, theme } from "../resources/theme";
import React, { FC, useState } from "react";
import Workspace from "../components/workspace/Workspace";

const MainView: FC = () => {
	const [colorScheme, setColorScheme] = useState(PreferredColorScheme());

	const toggleTheme = () => {
		colorScheme === "dark" ? setColorScheme("light") : setColorScheme("dark");
	};

	return (
		<ThemeProvider theme={ theme(colorScheme) }>
			<CssBaseline />
			<Workspace />
		</ThemeProvider>
	);
};

export default MainView;