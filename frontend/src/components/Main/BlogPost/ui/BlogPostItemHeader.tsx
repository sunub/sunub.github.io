import { UnderLineWave } from './UnderLineWave';
import { BlogPostTitle, Title, TitleDot } from '../style';

export function BlogPostItemHeader({ children }: { children: React.ReactNode }) {
  return (
    <BlogPostTitle>
      <Title>{children}</Title>
      <TitleDot />
      <UnderLineWave />
    </BlogPostTitle>
  );
}
