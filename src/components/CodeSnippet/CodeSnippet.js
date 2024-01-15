import React from "react";
import { Code } from "bright";
<<<<<<< HEAD

import styles from "./CodeSnippet.module.css";

Code.theme = {
	dark: "dracula",
	light: "github-light",
};

function CodeSnippet(props) {
	return <Code {...props} className={styles.wrapper} />;
=======
import styles from "./CodeSnippet.module.css";
import myTheme from "./my-theme.json";

Code.theme = myTheme;

function CodeSnippet(props) {
  return (
    <Code
      {...props}
      className={styles.wrapper}
      style={{
        maxWidth: "calc(100% + 64px)",
      }}
    />
  );
>>>>>>> dev-v2
}

export default CodeSnippet;
