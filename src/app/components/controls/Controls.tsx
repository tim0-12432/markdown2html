import { AppBar, Divider, Tooltip, Drawer, Fab, IconButton, List, ListItem, ListItemIcon, ListItemText, makeStyles, Theme, Toolbar, Typography, useTheme } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ShareIcon from '@material-ui/icons/Share';
import clsx from "clsx";
import React, { Fragment, useState } from "react";
import { options, editings } from "./ControlMapping";
import ExportDialog from "./dialog/ExportDialog";
import CssDialog from "./dialog/CssDialog";
import { exportHtmlFile, exportMarkdownFile, exportStylesheetFile } from "../../interactivity/export/export";
import { cssType } from "../../resources/css";
import encodeCss from "../../interactivity/conversion/cssify";
import ShareDialog from "./dialog/ShareDialog";

const drawerWidth = 240;

type ControlProps = {
    markdown: string,
    html: string,
    css: cssType,
    setMarkdown(value: string): void,
    setCss(type: string, prop: string, value: string): void
}

const useStyles = makeStyles((theme: Theme) => {
    return {
        root: {
            display: 'flex',
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: 36,
        },
        hide: {
            display: 'none',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap',
        },
        drawerOpen: {
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        drawerClose: {
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            overflowX: 'hidden',
            width: theme.spacing(7) + 1,
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9) + 1,
            },
        },
        toolbar: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: theme.spacing(0, 1),
            ...theme.mixins.toolbar,
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
        fabGroup: {
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            bottom: 0,
            right: 0,
            margin: theme.spacing(3),
            zIndex: 12
        },
        fab: {
            margin: theme.spacing(1, 0)
        }
    };
});

const Controls = ({markdown, html, css, setMarkdown, setCss}: ControlProps) => {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [exportDialogOpen, setExportDialogOpen] = useState(false);
    const [cssDialogOpen, setCssDialogOpen] = useState(false);
    const [shareDialogOpen, setShareDialogOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const optionFunc = (func: ((text: string, cursorIndex: number) => string) | undefined) => {
        func ? setMarkdown(func(markdown, -1) || markdown) : console.log("Function option is undefined!");
    };

    const editingFunc = (command: (string) | undefined) => {
        command ? callCommand(command) : console.log("Function editing is undefined!");
    };

    const callCommand = (command: string) => {
        switch (command) {
            case "edit-css":
                setCssDialogOpen(!cssDialogOpen);
                break;
            case "export":
                setExportDialogOpen(!exportDialogOpen);
                break;
            case "export-html":
                exportHtmlFile(html);
                break;
            case "export-markdown":
                exportMarkdownFile(markdown);
                break;
            case "export-css":
                exportStylesheetFile(encodeCss(css));
                break;
            default:
                console.log(`Command "${command}" not found!`);
                break;
        }
    };

    function toggleExportDialog() {
        setExportDialogOpen(!exportDialogOpen);
    }

    function toggleCssDialog() {
        setCssDialogOpen(!cssDialogOpen);
    }

    function toggleShareDialog() {
        setShareDialogOpen(!shareDialogOpen);
    }

    return (
        <Fragment>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                        [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        { document.title }
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
                })}
                classes={{
                paper: clsx({
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                {
                    options.map((item) => (
                        <ListItem button key={item.text} onClick={() => optionFunc(item.func)}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                        </ListItem>
                    ))
                }
                </List>
                <Divider />
                <List>
                {
                    editings.map((item) => (
                        <ListItem button key={item.text} onClick={() => editingFunc(item.command)}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                        </ListItem>
                    ))
                }
                </List>
            </Drawer>
            <div className={ classes.fabGroup }>
                <Tooltip title="Save HTML" placement="left">
                    <Fab className={ classes.fab } onClick={() => callCommand("export-html")}>
                        <InboxIcon />
                    </Fab>
                </Tooltip>
                <Tooltip title="Share" placement="left">
                    <Fab className={ classes.fab }  onClick={ toggleShareDialog }>
                        <ShareIcon />
                    </Fab>
                </Tooltip>
            </div>
            <ExportDialog open={ exportDialogOpen } toggle={ toggleExportDialog } call={ callCommand } />
            <CssDialog
                open={ cssDialogOpen }
                toggle={ toggleCssDialog }
                call={ callCommand }
                css={ css }
                setCss={ setCss }
            />
            <ShareDialog
                open={ shareDialogOpen }
                toggle={ toggleShareDialog }
                html={ html }
                markdown={ markdown }
                css={ css }
            />
        </Fragment>
    );
};

export default Controls;
