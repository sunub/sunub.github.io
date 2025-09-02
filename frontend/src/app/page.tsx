import React from 'react';
import { Wave } from '@/components/Header/Wave';
import { HeroImage } from '@/components/HeroImage';
import NewestPost from '@/components/Main/NewestPost';
import { FeatherIcon } from '@/components/Main/NewestPost/FeatherIcon';
import { RootLayout } from '@/features/RootLayout';
import { HeaderContentsWrapper, MainWrapper, Title, TitleWrapper } from './page.style';

async function Page() {
  return (
    <RootLayout>
      <HeaderContentsWrapper>
        <HeroImage />
        <Wave />
      </HeaderContentsWrapper>
      <div id="blog-main-wrapper">
        <MainWrapper id="blog-main__recently-post-list-wrapper">
          <TitleWrapper>
            <FeatherIcon />
            <Title>최신 포스트들</Title>
          </TitleWrapper>
          <NewestPost />
        </MainWrapper>
      </div>
    </RootLayout>
  );
}

export default Page;
