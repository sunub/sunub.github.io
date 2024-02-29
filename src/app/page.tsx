import React from 'react';
import * as Styled from './page.style';
import NewestPost from '@/components/Main/NewestPost';
import Categories from '@/components/Main/Cateogries/Categories';
import HeroImage from '@/components/HeroImage';
import Wave from '@/components/HeaderContents/Wave';
import Tags from '@/components/Main/Tags';
import ObserverTrigger from '@/components/Observer/ObserverTrigger';

const categories = ['cs', 'web', 'code', 'algorithm'];

function Page() {
  return (
    <React.Fragment>
      <ObserverTrigger />
      <Styled.HeaderContentsWrapper>
        <HeroImage />
        <Wave />
      </Styled.HeaderContentsWrapper>
      <div id="blog-main__recently-post-list">
        <Styled.MainWrapper>
          <NewestPost />
          <Styled.RightSideWrapper>
            <Categories categories={categories} />
            <Tags />
          </Styled.RightSideWrapper>
        </Styled.MainWrapper>
      </div>
    </React.Fragment>
  );
}

export default Page;
