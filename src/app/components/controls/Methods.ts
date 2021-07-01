export const appendHeadline = (text: string, cursorIndex: number): string => {
	return appendToCurrentCursor(text, "# ", cursorIndex);
};

export const appendLink = (text: string, cursorIndex: number): string => {
	return appendToCurrentCursor(text, "[text](url)", cursorIndex);
};

export const appendImage = (text: string, cursorIndex: number): string => {
	return appendToCurrentCursor(text, "![example image](url)", cursorIndex);
};

export const appendQuote = (text: string, cursorIndex: number): string => {
	return appendToCurrentCursor(text, "> ", cursorIndex);
};

export const appendBreak = (text: string, cursorIndex: number): string => {
	return appendToCurrentCursor(text, "---", cursorIndex);
};

export const appendUli = (text: string, cursorIndex: number): string => {
	return appendToCurrentCursor(text, "* item1\n* item2", cursorIndex);
};

export const appendOli= (text: string, cursorIndex: number): string => {
	return appendToCurrentCursor(text, "1. item1\n2. item2", cursorIndex);
};

export const appendCli= (text: string, cursorIndex: number): string => {
	return appendToCurrentCursor(text, "* [ ] item1\n* [x] item2", cursorIndex);
};

export const appendTable = (text: string, cursorIndex: number): string => {
	return appendToCurrentCursor(text, "| col1 | col2 |\n| --- | ---:|\n| item1 | item2|", cursorIndex);
};

export const appendToCurrentCursor = (text: string, value: string, index: number): string => {
	return [text.slice(0, index), "\n", value, text.slice(index)].join("");
};