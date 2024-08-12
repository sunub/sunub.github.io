import getBlog from "@/db/blog";
import { FeatherIcon } from "../NewestPost";
import * as Styled from "./Tags.style";

async function Tags() {
  const blog = await getBlog();
  const tags = await blog.getMostUsedTags();

  return (
    <Styled.Wrapper>
      <Styled.TitleWrapper>
        <FeatherIcon />
        <h1>Most used Tags</h1>
      </Styled.TitleWrapper>
      <Styled.TagsWrapper>
        {tags.map((tag: string) => (
          <Styled.Tag key={tag}>{tag.slice(0, -1)}</Styled.Tag>
        ))}
      </Styled.TagsWrapper>
    </Styled.Wrapper>
  );
}

export default Tags;
