import React from "react";
import { Code } from "bright";
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
}

export default CodeSnippet;
