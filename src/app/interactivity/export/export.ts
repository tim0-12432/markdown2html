const surroundWithHeaderTags = (body: string) => {
	const title = "Result";
	const head = `<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="utf-8" />\n<meta name="viewport" content="width=device-width, initial-scale=1" />\n<title>${title}</title>\n</head>\n<body>\n`;
	const foot = "\n</body>\n</html>";
	return `${head}${body}${foot}`;
};

const download = (name: string, data: string, type: string, extension: string) => {
	const blob = new Blob([data], { type: type });
	const url = window.URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.setAttribute("hidden", "");
	a.setAttribute("href", url);
	a.setAttribute("download", `${name}.${extension}`);
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
};

export const exportHtmlFile = (html: string) => {
	download("result", surroundWithHeaderTags(html), "text/html", "html");
};

export const exportMarkdownFile = (markdown: string) => {
	download("input", markdown, "text/x-markdown", "md");
};

export const exportStylesheetFile = (css: string) => {
	download("input", css, "text/css", "css");
};