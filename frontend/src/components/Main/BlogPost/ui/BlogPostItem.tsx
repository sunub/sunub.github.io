'use client';

import Link from 'next/link';
import { VisuallyHidden } from '@/components/VisuallyHidden';
import { FrontMatter } from '@/types/schema';
import { BlogPostContent, BlogPostTitle, Date as DateCompo, Footer, Title, TitleDot } from '../style';
import { UnderLineWave } from './UnderLineWave';
import { BlogPostListItem, BlogPostWrapper } from '../style';

interface BlogPostItemProps extends Pick<FrontMatter, 'slug' | 'title' | 'summary' | 'category' | 'date'> {
  index: number;
}

export function BlogPostItem({ slug, title, summary, category, date, index }: BlogPostItemProps) {
  const localeDate = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
  const webStandardDate = date.toISOString().split('T')[0];
  const titleId = `blog-post__recently-post-title-${index}`;
  const titleLinkId = `blog-post__recently-post-link-${index}`;

  return (
    <BlogPostListItem
      data-testid={`blog-post__recently-${index}-post-item`}
      $isInitialize={index < 10}
      key={`${category}-${slug}-${index}`}
      className="blog-post__recently-post-item"
      aria-labelledby={titleId}
    >
      <article>
        <BlogPostWrapper>
          <Link href={`/post/${category}/${slug}`} aria-label={titleLinkId} scroll={true}>
            <VisuallyHidden>{`${title} 포스트로 이동합니다.`}</VisuallyHidden>
            <BlogPostTitle>
              <Title id={titleId} title={title}>
                {title}
              </Title>
              <TitleDot />
              <UnderLineWave />
            </BlogPostTitle>
            <BlogPostContent>{summary}</BlogPostContent>
          </Link>
        </BlogPostWrapper>
        <Footer>
          <DateCompo dateTime={webStandardDate}>{localeDate}</DateCompo>
        </Footer>
      </article>
    </BlogPostListItem>
  );
}
