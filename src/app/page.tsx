import React from "react";
import Blog from "@/db/blog";
import * as Styled from "@/components/Main/Main.style";
import NewestPost from "@/components/Main/NewestPost";
import Categories from "@/components/Main/Cateogries/Categories";

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
      <div id="side-ng__main-content">
        <Styled.Wrapper>
          <NewestPost recentlyPublished={recentlyPublished} />
          <Styled.RightSideWrapper>
            <Categories categories={categories} />
            {/* <Tags tags={mostMetionedTags} /> */}
          </Styled.RightSideWrapper>
        </Styled.Wrapper>
      </div>
    </React.Fragment>
  );
}

export default Page;
