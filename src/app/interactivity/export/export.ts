
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
}

export const exportHtmlFile = (html: string) => {
    download("result", html, "text/html", "html");
};

export const exportMarkdownFile = (markdown: string) => {
    download("input", markdown, "text/x-markdown", "md");
};

export const exportStylesheetFile = (css: string) => {
    download("input", css, "text/css", "css");
};