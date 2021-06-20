import { Divider, makeStyles, Theme } from "@material-ui/core";
import React, { FC, ReactNode, useEffect, useState } from "react";
import marked from "marked";
import CodeArea from "./area/CodeArea";
import PreviewArea from "./area/PreviewArea";
import HtmlArea from "./area/HtmlArea";

const useStyles = makeStyles((theme: Theme) => {
    return {
        root: {
            display: "flex"
        },
        main: {
            display: "flex",
            flexDirection: "column",
            padding: theme.spacing(3),
            width: "100vw",
            height: "100vh"
        },
        content: {
            display: "flex",
            width: "100%",
            height: "100%"
        },
        toolbar: {
            padding: theme.spacing(0, 1),
            ...theme.mixins.toolbar
        },
        drawer: {
            padding: theme.spacing(0, 5)
        }
    }
});

const Workspace: FC = () => {
    const classes = useStyles();
    const [markDown, setMarkDown] = useState("");
    const [html, setHtml] = useState("");

    marked.setOptions({
        renderer: new marked.Renderer(),
        highlight: function(code: string, lang: string) {
          const highlight = require('highlight.js');
          const language = highlight.getLanguage(lang) ? lang : 'plaintext';
          return highlight.highlight(code, { language }).value;
        },
        pedantic: false,
        gfm: true,
        breaks: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        xhtml: false
    });

    useEffect(() => {
        setHtml(marked(markDown));
    }, [markDown]);

    const onMarkdownChange = (value: string) => {
        setMarkDown(value);
    };

    return (
        <main className={ classes.main}>
            <div className={classes.toolbar} />
            <div className={ classes.content }>
                <div className={classes.drawer} />
                <CodeArea label="Markdown" value={ markDown } onChange={ onMarkdownChange } />
                <Divider orientation="vertical" flexItem />
                <HtmlArea label="HTML" value={ html } />
                <Divider orientation="vertical" flexItem />
                <PreviewArea label="Preview" value={ html } />
            </div>
        </main>
    );
};

export default Workspace;