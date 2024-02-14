import { FeatherIcon } from "../NewestPost";
import * as Styled from "./Tags.style";
import Blog from "@/db/blog";

async function getRecentlyPublished() {
  const mostUsedTags = Blog.getMostUsedTags();
  return mostUsedTags;
}

async function Tags() {
  const tags = await getRecentlyPublished();

  return (
    <Styled.Wrapper>
      <Styled.TitleWrapper>
        <FeatherIcon />
        <h1>Most used Tags</h1>
      </Styled.TitleWrapper>
      <Styled.TagsWrapper>
        {tags.map((tag) => (
          <Styled.Tag key={tag}>{tag}</Styled.Tag>
        ))}
      </Styled.TagsWrapper>
    </Styled.Wrapper>
  );
}

export default Tags;
