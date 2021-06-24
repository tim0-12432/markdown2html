import { makeStyles, Theme } from "@material-ui/core";
import React, { FC, useEffect, useState, Fragment } from "react";
import { Layout, Model, TabNode } from "flexlayout-react";
import { json } from "./Model";
import marked from "marked";
import MarkdownArea from "./area/MarkdownArea";
import PreviewArea from "./area/PreviewArea";
import HtmlArea from "./area/HtmlArea";
import Controls from "../controls/Controls";

import 'flexlayout-react/style/light.css';
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "./area/custom-codemirror.css";
import CssArea from "./area/CssArea";

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
        },
        container: {
            position: "relative",
            width: "100%",
            height: "100%"
        }
    }
});

const Workspace: FC = () => {
    const classes = useStyles();
    const [markDown, setMarkDown] = useState("");
    const [html, setHtml] = useState("");
    const [css, setCss] = useState("");

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

    const onMarkdownChange = (value: string): void => {
        setMarkDown(value);
    };

    const factory = (node: TabNode) => {
        const component = node.getComponent();
        if (component === "markdown") {
            return <MarkdownArea value={ markDown } onChange={ onMarkdownChange } />;
        } else if (component === "html") {
            return <HtmlArea value={ html } />;
        } else if (component === "preview") {
            return <PreviewArea value={ html } />;
        } else if (component === "css") {
            return <CssArea value={ html } />;
        }
    };

    return (
        <Fragment>
            <Controls markdown={ markDown } html={ html } setMarkdown={ onMarkdownChange } />
            <main className={ classes.main}>
                <div className={classes.toolbar} />
                <div className={ classes.content }>
                    <div className={ classes.drawer } />
                    <div className={ classes.container }>
                        <Layout
                            model={ Model.fromJson(json) }
                            factory={ factory }
                        />
                    </div>
                </div>
            </main>
        </Fragment>
    );
};

export default Workspace;