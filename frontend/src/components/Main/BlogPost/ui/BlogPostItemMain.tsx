import Link from 'next/link';
import type { LinkProps } from 'next/link';
import { BlogPostWrapper } from '../style';

interface BlogPostItemMainProps extends LinkProps {
  children: React.ReactNode;
  href: string;
}

export function BlogPostItemMain({ children, href, ...rest }: BlogPostItemMainProps) {
  return (
    <BlogPostWrapper>
      <Link href={href} {...rest}>
        {children}
      </Link>
    </BlogPostWrapper>
  );
}
