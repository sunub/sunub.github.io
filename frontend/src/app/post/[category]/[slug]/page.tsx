import React from 'react';
import { Main, Article, PostTitle, ArticleWrapper, ArticleHeader, ArticleRootWrapper, Time } from './page.style';
import { getAllPosts, getPostContentByCategoryAndSlug, getPostFrontMatterByCategoryAndSlug } from 'db/blog/api';
import { Wave } from '@/widgets/Wave';
import { notFound } from 'next/navigation';
import CustomMDXRemoteComponents from '@/components/ui/customMdxRemote';
import { FrontMatter } from 'db/blog/Schema';
import { ClientArticle } from './ClientAritcle';

export const revalidate = 43200;

type Category = 'code' | 'web' | 'cs' | 'algorithm';

type Params = Promise<{
  category: Category;
  slug: string;
}>;

export async function generateStaticParams() {
  const allPosts = await getAllPosts();

  return allPosts.map(({ frontmatter }) => ({
    category: frontmatter.category,
    slug: frontmatter.slug,
  }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const resolvedParams = await params;
  const { category, slug } = resolvedParams;

  const specificFrontmatter = await getPostFrontMatterByCategoryAndSlug(category, slug);
  if (!specificFrontmatter) return notFound();

  const { title, summary, date, tags } = specificFrontmatter.frontmatter;
  return {
    title,
    description: summary,
    keywords: tags.join(', '),
    openGraph: {
      title,
      description: summary,
      type: 'article',
      publishedTime: new Date(date).toISOString(),
      authors: ['sun_ub'],
      tags,
      url: `https://sunub.vercel.app/post/${category}/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: summary,
    },
    alternates: {
      canonical: `https://sunub.vercel.app/post/${category}/${slug}`,
    },
  };
}

async function HeaderSection({ frontmatter }: { frontmatter: FrontMatter }) {
  const { title, date } = frontmatter;
  return (
    <ArticleHeader>
      <PostTitle>{title}</PostTitle>
      <React.Suspense fallback={<div>...</div>}>
        <Time dateTime={new Date(date).toISOString()}>
          {new Intl.DateTimeFormat('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }).format(new Date(date))}
        </Time>
      </React.Suspense>
    </ArticleHeader>
  );
}

async function Page({ params }: { params: Params }) {
  const resolvedParams = await params;
  const { category, slug } = resolvedParams;

  try {
    const postContentData = await getPostContentByCategoryAndSlug(category, slug);
    if (!postContentData) return null;
    const { content, frontmatter } = postContentData;
    return (
      <React.Fragment>
        <Wave />
        <Main>
          <script
            type="application/ld+json"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'BlogPosting',
                headline: frontmatter.title,
                datePublished: new Date(frontmatter.date).toISOString(),
                dateModified: new Date(frontmatter.date).toISOString(),
                description: frontmatter.summary,
                author: {
                  '@type': 'Person',
                  name: 'sun_ub',
                  url: 'https://sunub.vercel.app',
                },
                image: 'https://sunub.vercel.app/assets/default-og-image.jpg',
                mainEntryOfPage: {
                  '@type': 'WebPage',
                  '@id': `https://sunub.vercel.app/post/${category}/${slug}`,
                },
              }),
            }}
          />
          <ArticleRootWrapper id="blog-post__article-root">
            <HeaderSection frontmatter={frontmatter} />
            <ArticleWrapper id="blog-post__article">
              <ClientArticle>
                <CustomMDXRemoteComponents content={content} />
              </ClientArticle>
            </ArticleWrapper>
          </ArticleRootWrapper>
        </Main>
      </React.Fragment>
    );
  } catch (error) {
    console.error('MDX 콘텐츠를 불러오는 중 오류가 발생했습니다:', error);
    return (
      <div className="warning">
        <h3>콘텐츠를 불러올 수 없습니다</h3>
        <p>죄송합니다. 요청하신 콘텐츠를 불러오는 중 오류가 발생했습니다.</p>
      </div>
    );
  }
}

export default Page;
