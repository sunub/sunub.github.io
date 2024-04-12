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
        <h2>해당 URL을 찾을 수 없습니다.</h2>
        <p>
          찾고자 하는 <pre>{pathname.slice(1)}</pre>은 현재 사이트에 등록 되어
          있지 않은 URL입니다.
        </p>
        <p>
          모든 블로그를 볼수 있는 <Link href="/">메인 페이지로</Link> 로
          돌아가주세요.
        </p>
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
    font-size: 3rem;
  }

  & > p {
    font-size: 1.25rem;
  }

  & > pre {
    display: inline-block;
  }
`;
