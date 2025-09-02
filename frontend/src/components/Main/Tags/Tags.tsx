import * as Styled from './Tags.style';
import { FeatherIcon } from '../NewestPost/FeatherIcon';

async function Tags() {
  return (
    <Styled.Wrapper>
      <Styled.TitleWrapper>
        <FeatherIcon />
        <h1>Most used Tags</h1>
      </Styled.TitleWrapper>
      <Styled.TagsWrapper></Styled.TagsWrapper>
    </Styled.Wrapper>
  );
}

export default Tags;
