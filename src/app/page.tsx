import React from "react";
import * as Styled from "./page.style";
import Categories from "@/components/Main/Cateogries/Categories";
import HeroImage from "@/components/HeroImage";
import Wave from "@/components/HeaderContents/Wave";
import Tags from "@/components/Main/Tags";
import dynamic from "next/dynamic";

const categories = ["cs", "web", "code", "algorithm"];

const NewestPost = dynamic(() => import("@/components/Main/NewestPost"), {
  loading: () => (
    <div className="flex flex-col items-center justify-center w-full">
      <div>최근 게시물을 불러오는 중...</div>
    </div>
  ),
  ssr: true,
});

function Page() {
  return (
    <React.Fragment>
      <Styled.HeaderContentsWrapper>
        <HeroImage />
        <Wave />
      </Styled.HeaderContentsWrapper>
      <div id="blog-main__recently-post-list">
        <Styled.MainWrapper>
          <NewestPost />
          <Styled.RightSideWrapper>
            <Categories categories={categories} />
            {/* <Tags /> */}
          </Styled.RightSideWrapper>
        </Styled.MainWrapper>
      </div>
    </React.Fragment>
  );
}

export default Page;
