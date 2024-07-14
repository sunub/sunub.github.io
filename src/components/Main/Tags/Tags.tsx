import { FeatherIcon } from "../NewestPost";
import * as Styled from "./Tags.style";
import { getMostUsedTags } from "@/db/blog";

async function Tags() {
  const tags = await getMostUsedTags();

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
