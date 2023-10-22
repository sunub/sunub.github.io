import React from "react";
import { Code } from "bright";

import styles from "./CodeSnippet.module.css";

Code.theme = {
	dark: "dracula",
	light: "github-light",
};

function CodeSnippet(props) {
	return <Code {...props} className={styles.wrapper} />;
}

export default CodeSnippet;
