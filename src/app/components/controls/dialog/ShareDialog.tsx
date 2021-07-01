import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, makeStyles, Theme, Typography } from "@material-ui/core";
import { classes } from "istanbul-lib-coverage";
import React, { useState } from "react";
import { FacebookIcon, FacebookShareButton, LinkedinShareButton, LinkedinIcon, RedditShareButton, RedditIcon, TwitterShareButton, TwitterIcon, WhatsappShareButton, WhatsappIcon, EmailShareButton, EmailIcon } from "react-share";
import encodeCss from "../../../interactivity/conversion/cssify";
import { cssType } from "../../../resources/css";

type DialogProps = {
    open: boolean,
    toggle: () => void,
    html: string,
    markdown: string,
    css: cssType
}

type OptionProps = {
    [key: string]: boolean
}

const URL = "https://github.com/tim0-12432/markdown2html";

const useStyles = makeStyles((theme: Theme) => {
	return {
		group: {
			padding: theme.spacing(2, 0)
		},
		button: {
			display: "flex",
			alignItems: "center",
			margin: theme.spacing(0, 0, 1, 0)
		},
		media: {
			flexGrow: 1,
			width: "100%",
			display: "flex",
			alignItems: "center",
			padding: theme.spacing(0, 1),
		}
	};
});

const ShareDialog = (props: DialogProps) => {
	const classes = useStyles();
	const [options, setOptions] = useState<OptionProps>({
		markdownChecked: false,
		htmlChecked: false,
		cssChecked: false
	});

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setOptions({ ...options, [event.target.name]: event.target.checked });
	};

	const generateContent = () => {
		let result = "I am appreciating to use Markdown2Html!\nHave a look:\n";
		const { markdownChecked, htmlChecked, cssChecked } = options;
		if ([markdownChecked, htmlChecked, cssChecked].filter((v) => v).length > 0){
			result = "Have a look at what I created by using Markdown2Html:";
		}
		if (markdownChecked) {
			result += `\n${props.markdown}`;
		}
		if (htmlChecked) {
			result += `\n${props.html}`;
		}
		if (cssChecked) {
			result += `\n${encodeCss(props.css)}`;
		}
		return result;
	};

	const generateHashtags = () => {
		const result = ["#markdown2html"];
		Object.keys(options).forEach((key) => {
			if(options[key]) {
				result.push(`#${key}`);
			}
		});
		return result;
	};

	const { markdownChecked, htmlChecked, cssChecked } = options;

	return (
		<Dialog
			open={ props.open }
			onClose={ props.toggle }
		>
			<DialogTitle>Export files</DialogTitle>
			<DialogContent>
				<DialogContentText>
                    Select which code you want to include.
				</DialogContentText>
				<FormControl component="fieldset">
					<FormGroup>
						<FormControlLabel
							control={<Checkbox checked={markdownChecked} onChange={handleChange} name="markdownChecked" />}
							label="Markdown"
						/>
						<FormControlLabel
							control={<Checkbox checked={htmlChecked} onChange={handleChange} name="htmlChecked" />}
							label="HTML"
						/>
						<FormControlLabel
							control={<Checkbox checked={cssChecked} onChange={handleChange} name="cssChecked" />}
							label="CSS"
						/>
					</FormGroup>
				</FormControl>
				<Divider />
				<FormControl component="fieldset">
					<FormGroup className={classes.group}>
						<FacebookShareButton
							url={ URL }
							quote={ generateContent() }
							hashtag={ generateHashtags()[0] }
							className={classes.button}
						>
							<FacebookIcon size={35} borderRadius={10} />
							<Typography variant="h6" className={classes.media}>Facebook</Typography>
						</FacebookShareButton>
						<LinkedinShareButton
							url={ URL }
							source={ URL }
							summary={ generateContent() }
							title={ generateHashtags()[0] }
							className={classes.button}
						>
							<LinkedinIcon size={35} borderRadius={10} />
							<Typography variant="h6" className={classes.media}>LinkedIn</Typography>
						</LinkedinShareButton>
						<RedditShareButton
							url={ URL }
							title={ generateContent() }
							className={classes.button}
						>
							<RedditIcon size={35} borderRadius={10} />
							<Typography variant="h6" className={classes.media}>Reddit</Typography>
						</RedditShareButton>
						<TwitterShareButton
							url={ URL }
							via={ URL }
							title={ generateContent() }
							hashtags={ generateHashtags() }
							className={classes.button}
						>
							<TwitterIcon size={35} borderRadius={10} />
							<Typography variant="h6" className={classes.media}>Twitter</Typography>
						</TwitterShareButton>
						<WhatsappShareButton
							url={ URL }
							title={ generateContent() }
							className={classes.button}
						>
							<WhatsappIcon size={35} borderRadius={10} />
							<Typography variant="h6" className={classes.media}>WhatsApp</Typography>
						</WhatsappShareButton>
						<EmailShareButton
							url={ URL }
							subject={ generateHashtags()[0] }
							body={ generateContent() }
							className={classes.button}
						>
							<EmailIcon size={35} borderRadius={10} />
							<Typography variant="h6" className={classes.media}>E-Mail</Typography>
						</EmailShareButton>
					</FormGroup>
				</FormControl>
			</DialogContent>
			<DialogActions>
				<Button onClick={props.toggle} variant="contained" color="primary">
                    Done
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ShareDialog;
