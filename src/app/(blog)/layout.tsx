import Wave from "@/components/HeaderContents/Wave";
import * as Styled from "../page.style";
import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <React.Fragment>
      <Styled.HeaderContentsWrapper>
        <Wave />
      </Styled.HeaderContentsWrapper>
      <div id="blog-main__recently-post-list">{children}</div>
    </React.Fragment>
  );
}

export default Layout;
