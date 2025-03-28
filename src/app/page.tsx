import React from "react";
import * as Styled from "./page.style";
import Categories from "@/components/Main/Cateogries/Categories";
import HeroImage from "@/components/HeroImage";
import Wave from "@/components/HeaderContents/Wave";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { getRecentPostsMetadata } from "db/blog/api";
import { NewestPostSkeleton } from "@/components/Skeletons";

const categories = ["cs", "web", "code", "algorithm"];

// const NewestPost = dynamic(() => import("@/components/Main/NewestPost"), {
//   loading: () => <NewestPostSkeleton />,
//   ssr: true,
// });

async function Page() {
  // const recentPostsMetadata = await getRecentPostsMetadata(10);
  return (
    <React.Fragment>
      <Styled.HeaderContentsWrapper>
        {/* <HeroImage /> */}
        <Wave />
      </Styled.HeaderContentsWrapper>
      {/* <div id="blog-main__recently-post-list">
        <Styled.MainWrapper>
          <Suspense fallback={<NewestPostSkeleton />}>
            <NewestPost initialPosts={recentPostsMetadata} />
          </Suspense>
          <Styled.RightSideWrapper>
            <Categories categories={categories} />
          </Styled.RightSideWrapper>
        </Styled.MainWrapper>
      </div> */}
    </React.Fragment>
  );
}

export default Page;
