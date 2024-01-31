import { FeatherIcon } from "../NewestPost";
import * as Styled from "./Tags.style";

function Tags({ tags }: { tags: string[] }) {
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
