import React from "react";
import Blog from "@/db/blog";
import * as Styled from "./page.style";
import NewestPost from "@/components/Main/NewestPost";
import Categories from "@/components/Main/Cateogries/Categories";
import HeroImage from "@/components/HeroImage";
import Wave from "@/components/HeaderContents/Wave";

async function getRecentlyPublished() {
  const categories = ["cs", "web", "code", "algorithm"];
  const recentlyPublished = Blog.getMetadata().slice(0, 15);
  return {
    categories,
    recentlyPublished,
  };
}

async function Page() {
  const { categories, recentlyPublished } = await getRecentlyPublished();

  return (
    <React.Fragment>
      <Styled.HeaderContentsWrapper>
        <HeroImage />
        <Wave />
      </Styled.HeaderContentsWrapper>
      <div id="blog-main__recently-post-list">
        <Styled.MainWrapper>
          <NewestPost recentlyPublished={recentlyPublished} />
          <Styled.RightSideWrapper>
            <Categories categories={categories} />
            {/* <Tags tags={mostMetionedTags} /> */}
          </Styled.RightSideWrapper>
        </Styled.MainWrapper>
      </div>
    </React.Fragment>
  );
}

export default Page;
