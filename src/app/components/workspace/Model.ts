import { IJsonModel } from "flexlayout-react";

export const json: IJsonModel = {
	global: {tabEnableClose:false},
	borders:[
    	{
			"type": "border",
			"location":"right",
			"size": 100,
			"children": [
				{
					"type": "tab",
					"name": "CSS",
					"component": "css"
				}
			]
		}
	],
	layout: {
		"type": "row",
		"weight": 100,
		"children": [
			{
				"type": "tabset",
				"weight": 50,
				"selected": 0,
				"children": [
					{
						"type": "tab",
						"name": "Markdown",
						"component": "markdown"
					}
				]
			},
			{
				"type": "tabset",
				"weight": 25,
				"selected": 0,
				"children": [
					{
						"type": "tab",
						"name": "HTML",
						"component": "html"
					}
				]
			},
			{
				"type": "tabset",
				"weight": 25,
				"selected": 0,
				"children": [
					{
						"type": "tab",
						"name": "Preview",
						"component": "preview"
					}
				]
			}
		]
	}
};