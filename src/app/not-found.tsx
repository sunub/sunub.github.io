"use client";

import Link from "next/link";
import styled from "styled-components";
import { usePathname } from "next/navigation";

export default function NotFound() {
  // const headersList = headers();
  // const domain = headersList.get("host");
  const pathname = usePathname();

  return (
    <Container>
      <Card>
        <h2>해당 페이지를 찾을 수 없습니다.</h2>
        <Content>
          <p>
            찾고자 하는 <URL>{pathname.slice(1)}</URL>은 현재 사이트에 등록 되어
            있지 않은 <URL>URL</URL>입니다.
          </p>
          <p>
            모든 블로그를 볼수 있는 <LinkTo href="/">메인 페이지로</LinkTo> 로
            돌아가주세요.
          </p>
        </Content>
      </Card>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 1000;

  width: 100dvw;
  height: 100dvh;

  display: grid;
  justify-content: center;
  align-content: center;

  background-color: oklch(87.34% 0.066 31.17);
`;

const Card = styled.div`
  padding: 4rem 5rem;
  border-radius: 1rem;
  background-color: oklch(92.76% 0.025 31.17);

  & > h2 {
    font-size: 2.25rem;
    font-weight: 900;
  }
`;

const Content = styled.div`
  margin-top: 2rem;
`;

const URL = styled.pre`
  display: inline-block;
  font-family: "Bariol_serif";
  font-size: 1.2rem;
  font-weight: 900;
`;

const LinkTo = styled(Link)`
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 7px;
  font-weight: 700;
  font-size: 1.2rem;
  color: oklch(64.23% 0.229 31.17);
  display: inline-block;
  text-align: center;

  padding-left: 0.5rem;
  padding-right: 0.5rem;
`;
