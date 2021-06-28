import { Button, Dialog, Typography, Accordion, AccordionSummary, AccordionDetails, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, TextField, makeStyles, Theme } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ColorPicker from 'material-ui-color-picker';
import React, { useState, useEffect } from 'react';
import { cssProperties, cssType } from '../../../resources/css';

type DialogProps = {
    open: boolean,
    toggle: () => void,
    call: (command: string) => void,
    css: string,
    setCss: (value: string) => void
}

const useStyles = makeStyles((theme: Theme) => {
    return {
        accord: {
            width: "100%"
        },
        details: {
            flexDirection: "column"
        },
        detail: {
            display: "flex",
            alignItems: "baseline"
        },
        detailName: {
            flexGrow: 1
        }
    }
});

function CssDialog(props: DialogProps) {
    const classes = useStyles();
    const [cssProps, setCssProps] = useState<cssType>(cssProperties);

    useEffect(() => {
        //setCssProps(decodeCss());
    }, []);

    const exportCss = () => {
        props.call("export-css");
    };

    const setProp = (type: string, prop: string, value: string) => {
        setCssProps({
            ...cssProps,
            [type]: {
                ...cssProps[type],
                "props": {
                    ...cssProps[type].props,
                    [prop]: value
                }
            }
        });
    };


    const getProp = (type: string, prop: string) => {
        let result: string | undefined = "";
        switch (prop) {
            case "color":
                result = cssProps[type].props.color;
                break;
            case "textDecoration":
                result = cssProps[type].props.textDecoration;
                break;
            case "fontFamily":
                result = cssProps[type].props.fontFamily;
                break;
            case "fontWeight":
                result = cssProps[type].props.fontWeight;
                break;
            default:
                break;
        }
        return result ? result : "";
    };

    const propCssify = (prop: string) => {
        let result = "";
        for (let i = 0; i < prop.length; i++) {
            const char = prop.charAt(i);
            if (char === char.toUpperCase()) {
                result += `-${char.toLowerCase()}`;
            } else {
                result += char;
            }
        }
        return result;
    };

    const saveCssProps = () => {
        props.setCss(encodeCss());
        props.toggle();
    };

    function encodeCss() {
        let result = "";
        Object.keys(cssProps).forEach((type) => {
            result += `${cssProps[type].tag} {\n`;
            Object.keys(cssProps[type].props).forEach((prop) => {
                const value = getProp(type, prop);
                if (value !== "") {
                    result += `${propCssify(prop)}: ${value};\n`;
                }
            });
            result += "}\n";
        });
        return result;
    }

    function decodeCss() {
        let result = cssProperties;

        return result;
    }

    return (
        <Dialog
            open={ props.open }
            onClose={ props.toggle }
        >
            <DialogTitle>Edit styling properties</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Edit the properties to change the style of your file.
                </DialogContentText>
                <FormControl component="fieldset" className={ classes.accord }>
                    {
                        Object.keys(cssProperties).map((type, index) => {
                            return (
                                <Accordion key={ `type-${index}` }>
                                    <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    >
                                        <Typography variant="h6">{ type }</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails className={ classes.details }>
                                    {
                                        Object.keys(cssProperties[type].props).map((prop, idx) => {
                                            return (
                                                <div className={ classes.detail } key={ `prop-${index}-${idx}` }>
                                                    <Typography className={ classes.detailName }>{ prop }</Typography>
                                                    {
                                                        prop === "color"
                                                        ? <ColorPicker
                                                            name="color"
                                                            defaultValue="#000"
                                                            value={ cssProps[type].props.color }
                                                            onChange={ (value) => setProp(type, prop, value) }
                                                        />
                                                        : <TextField
                                                            label={ typeof prop }
                                                            type="text"
                                                            defaultValue={ () => getProp(type, prop) }
                                                            onChange={ (e) => setProp(type, prop, e.target.value) }
                                                        />
                                                    }
                                                </div>
                                            );
                                        })
                                    }
                                    </AccordionDetails>
                                </Accordion>
                            );
                        })
                    }
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.toggle} variant="outlined" color="primary">
                    Cancel
                </Button>
                <Button onClick={exportCss} variant="outlined" color="primary">
                    Export
                </Button>
                <Button onClick={saveCssProps} variant="contained" color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default CssDialog;
