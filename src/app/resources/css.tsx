type textDecorationType = "" | "underlined" | undefined;
type fontWeightType = undefined | string;

export type cssType = {
    [key: string]: {
        tag: string | string[],
        props: {
            color?: string,
            textDecoration?: textDecorationType,
            fontFamily?: string,
            fontWeight?: fontWeightType
        }
    }
};

export const cssProperties: cssType = {
    root: {
        tag: "*",
        props: {
            color: "",
            fontFamily: ""
        }
    },
    headline: {
        tag: [
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6"
        ],
        props: {
            color: "",
            textDecoration: "",
            fontWeight: ""
        }
    },
    hyperlink: {
        tag: "a",
        props: {
            color: "",
            textDecoration: "",
            fontWeight: ""
        }
    },
    code: {
        tag: "code",
        props: {
            color: "",
            textDecoration: "",
            fontFamily: "",
            fontWeight: ""
        }
    },
    quote: {
        tag: "blockquote",
        props: {
            color: "",
            textDecoration: "",
            fontFamily: "",
            fontWeight: ""
        }
    },
    focused: {
        tag: [
            "a:focus",
            "input:focus"
        ],
        props: {
            color: "",
            textDecoration: "",
            fontWeight: ""
        }
    },
    hover: {
        tag: [
            "a:hover",
            "input:hover"
        ],
        props: {
            color: "",
            textDecoration: "",
            fontWeight: ""
        }
    }
};