import React, { JSX } from "react";
import ViewHeadlineIcon from "@material-ui/icons/ViewHeadline";
import LinkIcon from "@material-ui/icons/Link";
import ImageIcon from "@material-ui/icons/Image";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import RemoveIcon from "@material-ui/icons/Remove";
import StyleIcon from "@material-ui/icons/Style";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import TableChartIcon from "@material-ui/icons/TableChart";
import { appendBreak, appendCli, appendHeadline, appendImage, appendLink, appendOli, appendQuote, appendTable, appendUli } from "./Methods";

type Option = {
    text: string,
    icon: JSX.Element,
    // eslint-disable-next-line no-unused-vars
    func?: (text: string, cursorIndex: number) => string
}[];

type Control = {
    text: string,
    icon: JSX.Element,
    command?: string
}[];

export const options: Option = [
	{
		text: "Headline",
		icon: <ViewHeadlineIcon />,
		func: appendHeadline
	},
	{
		text: "Link",
		icon: <LinkIcon />,
		func: appendLink
	},
	{
		text: "Image",
		icon: <ImageIcon />,
		func: appendImage
	},
	{
		text: "Quote",
		icon: <FormatQuoteIcon />,
		func: appendQuote
	},
	{
		text: "Linebreak",
		icon: <RemoveIcon />,
		func: appendBreak
	},
	{
		text: "unordered List",
		icon: <FormatListBulletedIcon />,
		func: appendUli
	},
	{
		text: "ordered List",
		icon: <FormatListNumberedIcon />,
		func: appendOli
	},
	{
		text: "Checklist",
		icon: <LibraryAddCheckIcon />,
		func: appendCli
	},
	{
		text: "Table",
		icon: <TableChartIcon />,
		func: appendTable
	}
];

export const editings: Control = [
	{
		text: "Export",
		icon: <ImportExportIcon />,
		command: "export"
	},
	{
		text: "Import",
		icon: <ImportExportIcon />
	},
	{
		text: "CSS",
		icon: <StyleIcon />,
		command: "edit-css"
	}
];