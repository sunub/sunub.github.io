import React from "react";
import CardList from "./CardList/index";
import Post from "@/utils/Post";

async function getFrontmatterList() {
  const post = new Post();
  const frontmatterList = post.frontMatters["all"];

  return frontmatterList;
}

async function LandingPage() {
  const frontmatterList = await getFrontmatterList();

  return (
    frontmatterList && (
      <CardList id={"landing-page__card-list"} list={frontmatterList} />
    )
  );
}

export default LandingPage;
