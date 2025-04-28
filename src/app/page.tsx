import React from "react";
import * as Styled from "./page.style";
import Categories from "@/components/Main/Cateogries/Categories";
import HeroImage from "@/components/HeroImage";
import Wave from "@/components/HeaderContents/Wave";
import { Suspense } from "react";
import { ContentLoading } from "@/components/Skeletons/ui/ContentLoading";
import NewestPost from "@/components/Main/NewestPost";

const categories = ["cs", "web", "code", "algorithm"];

export const dynamic = "force-static";

async function Page() {
  return (
    <React.Fragment>
      <Styled.HeaderContentsWrapper>
        <HeroImage />
        <Wave />
      </Styled.HeaderContentsWrapper>
      <div id="blog-main__recently-post-list">
        <Styled.MainWrapper id="blog-main__recently-post-list-wrapper">
          <Suspense fallback={<ContentLoading />}>
            <NewestPost />
          </Suspense>
          <Styled.RightSideWrapper id="blog-main__categories">
            <Categories categories={categories} />
          </Styled.RightSideWrapper>
        </Styled.MainWrapper>
      </div>
    </React.Fragment>
  );
}

export default Page;
