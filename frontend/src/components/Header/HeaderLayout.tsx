import { ScrollHeader } from '@/components/ScrollHeader/ui/ScrollHeader';
import { HeaderWrapper, RootWrapper, Header } from './Header.style';

export async function HeaderLayout({ children }: { children?: React.ReactNode }) {
  return (
      <ScrollHeader>
        <RootWrapper>
          <HeaderWrapper id="blog-main__header-contents">
            <Header>
            {children}
            </Header>
          </HeaderWrapper>
        </RootWrapper>
      </ScrollHeader>
  );
}