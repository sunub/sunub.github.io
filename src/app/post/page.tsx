import Wave from "@/components/HeaderContents/Wave";
import * as Styled from "../(blog)/page.style";
import Link from "next/link";
import Spacer from "@/components/Spacer";
import {
  allAlgorithmPosts,
  allWebPosts,
  allCSPosts,
  allCodePosts,
} from "contentlayer/generated";
import Card from "@/components/Card";
import { FeatherIcon } from "@/components/Main/NewestPost";

function Page() {
  const webFrontmatters = allWebPosts.map((post) => ({
    title: post.title,
    date: post.date,
    tags: post.tags,
    summary: post.summary,
    category: post.category,
    slug: post.slug,
    completed: post.completed,
  }));

  const algorithmFrontmatters = allAlgorithmPosts.map((post) => ({
    title: post.title,
    date: post.date,
    tags: post.tags,
    summary: post.summary,
    category: post.category,
    slug: post.slug,
    completed: post.completed,
  }));

  const csFrontmatters = allCSPosts.map((post) => ({
    title: post.title,
    date: post.date,
    tags: post.tags,
    summary: post.summary,
    category: post.category,
    slug: post.slug,
    completed: post.completed,
  }));

  const codeFrontmatters = allCodePosts.map((post) => ({
    title: post.title,
    date: post.date,
    tags: post.tags,
    summary: post.summary,
    category: post.category,
    slug: post.slug,
    completed: post.completed,
  }));

  return (
    <section>
      <Styled.Title>
        <h1>All Blog Posts</h1>
      </Styled.Title>
      <Wave />
      <Styled.Background>
        <Spacer size={48} axis={"vertical"} />
        <Styled.CategoryFrontMatterSection>
          <FeatherIcon />
          <Spacer size={16} axis={"vertical"} />
          <Styled.CategoryTitle>Web Cateogry</Styled.CategoryTitle>
          <Styled.Wrapper>
            {webFrontmatters.map((frontmatter) => (
              <Card key={frontmatter.slug} frontMatter={frontmatter} />
            ))}
          </Styled.Wrapper>
        </Styled.CategoryFrontMatterSection>

        <Spacer size={64} axis={"vertical"} />
        <Styled.CategoryFrontMatterSection>
          <FeatherIcon />
          <Spacer size={16} axis={"vertical"} />
          <Styled.CategoryTitle>Algorithm Cateogry</Styled.CategoryTitle>
          <Styled.Wrapper>
            {algorithmFrontmatters.map((frontmatter) => (
              <Card key={frontmatter.slug} frontMatter={frontmatter} />
            ))}
          </Styled.Wrapper>
        </Styled.CategoryFrontMatterSection>

        <Spacer size={64} axis={"vertical"} />
        <Styled.CategoryFrontMatterSection>
          <FeatherIcon />
          <Spacer size={16} axis={"vertical"} />
          <Styled.CategoryTitle>CS Cateogry</Styled.CategoryTitle>
          <Styled.Wrapper>
            {csFrontmatters.map((frontmatter) => (
              <Card key={frontmatter.slug} frontMatter={frontmatter} />
            ))}
          </Styled.Wrapper>
        </Styled.CategoryFrontMatterSection>

        <Spacer size={64} axis={"vertical"} />
        <Styled.CategoryFrontMatterSection>
          <FeatherIcon />
          <Spacer size={16} axis={"vertical"} />
          <Styled.CategoryTitle>Code Cateogry</Styled.CategoryTitle>
          <Styled.Wrapper>
            {codeFrontmatters.map((frontmatter) => (
              <Card key={frontmatter.slug} frontMatter={frontmatter} />
            ))}
          </Styled.Wrapper>
        </Styled.CategoryFrontMatterSection>
      </Styled.Background>
    </section>
  );
}

export default Page;
