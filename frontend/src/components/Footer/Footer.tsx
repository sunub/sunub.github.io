import { Github, Mail } from 'lucide-react';
import Link from 'next/link';
import { Container, CopyRight, CopyRightWrapper, IconsWrapper, Wrapper } from './style';
import { VisuallyHidden } from '../VisuallyHidden';

export function Footer() {
  return (
    <>
      <Container role="contentinfo">
        <Wrapper>
          <IconsWrapper>
            <Link aria-label={'Link to sunub github page'} href={'https://github.com/sunub'}>
              <VisuallyHidden>{'sunub의 github 페이지로 이동합니다.'}</VisuallyHidden>
              <Github />
            </Link>
            <Link aria-label={'Send email to sunub email'} href={'mailto:bsc5672@gmail.com'}>
              <VisuallyHidden>{'sunub에게 이메일을 보냅니다.'}</VisuallyHidden>
              <Mail />
            </Link>
          </IconsWrapper>
          <CopyRightWrapper>
            <CopyRight>© 2023-present sunub blog. Powered by Next.js, Vercel</CopyRight>
          </CopyRightWrapper>
        </Wrapper>
      </Container>
    </>
  );
}
