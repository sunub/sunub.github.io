import React from "react";
import Blog from "@/db/blog";
import * as Styled from "./page.style";
import NewestPost from "@/components/Main/NewestPost";
import Categories from "@/components/Main/Cateogries/Categories";
import HeroImage from "@/components/HeroImage";
import Wave from "@/components/HeaderContents/Wave";
import Tags from "@/components/Main/Tags";

async function getRecentlyPublished() {
  const categories = ["cs", "web", "code", "algorithm"];
  const recentlyPublished = Blog.getMetadata().slice(0, 15);
  const mostUsedTags = Blog.getMostUsedTags();

  return {
    categories,
    recentlyPublished,
    mostUsedTags,
  };
}

async function Page() {
  const { categories, recentlyPublished, mostUsedTags } =
    await getRecentlyPublished();

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
            <Tags tags={mostUsedTags} />
          </Styled.RightSideWrapper>
        </Styled.MainWrapper>
      </div>
    </React.Fragment>
  );
}

export default Page;
