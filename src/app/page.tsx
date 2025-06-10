import React from "react";
import * as Styled from "./page.style";
import { HeroImage } from "@/components/HeroImage";
import Wave from "@/components/HeaderContents/Wave";
import NewestPost from "@/components/Main/NewestPost";

async function Page() {
  return (
    <React.Fragment>
      <Styled.HeaderContentsWrapper>
        <HeroImage />
        <Wave />
      </Styled.HeaderContentsWrapper>
      <div id="blog-main__recently-post-list">
        <Styled.MainWrapper id="blog-main__recently-post-list-wrapper">
          <NewestPost />
        </Styled.MainWrapper>
      </div>
    </React.Fragment>
  );
}

export default Page;
