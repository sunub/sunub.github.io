import React from "react";
import { Code } from "bright";
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> refs/remotes/origin/sunub
import styles from "./CodeSnippet.module.css";
import myTheme from "./my-theme.json";

Code.theme = myTheme;

function CodeSnippet(props) {
<<<<<<< HEAD
	return <Code {...props} className={styles.wrapper} />;
=======
import styles from "./CodeSnippet.module.css";
import myTheme from "./my-theme.json";

Code.theme = myTheme;

function CodeSnippet(props) {
=======
>>>>>>> refs/remotes/origin/sunub
  return (
    <Code
      {...props}
      className={styles.wrapper}
      style={{
        maxWidth: "calc(100% + 64px)",
      }}
    />
  );
<<<<<<< HEAD
>>>>>>> dev-v2
=======
>>>>>>> refs/remotes/origin/sunub
}

export default CodeSnippet;
