"use client";

import React, { memo } from "react";
import styled from "styled-components";
import Link from "next/link";
import Elevation from "@/constants/Elevation";
import { FrontMatterSchema } from "@/types/schema";
import { z } from "zod";

const Wrapper = styled.article`
  ${Elevation(170, 216, 15, "short", "other")}

  transition: box-shadow 300ms ease;
  &:hover {
    box-shadow: var(--long-shadow);
  }
  @media screen and (max-width: 320px) {
    width: 120px;
  }
`;

const Header = styled.h3`
  grid-area: card-header;

  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: var(--size4);
  text-align: left;
  word-break: break-all;
  font-weight: 700;

  & > h3 {
    font-size: calc(1.375rem);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    & > time {
      font-size: calc(0.575rem);
    }
  }
`;

const Footer = styled.time`
  grid-area: card-footer;

  font-size: 10px;
  word-break: break-all;
  justify-self: center;
`;

const LinkWrapper = styled(Link)`
  display: grid;
  align-items: center;

  grid:
    [card-icon] 0.2fr
    [card-header] minmax(1ch, 1fr)
    [card-footer] 15px / 1fr;

  height: 100%;
  padding: 1rem;

  transition: background 350ms ease 0s;
  cursor: pointer;
  touch-action: manipulation;
`;

const IconWrapper = styled.div`
  grid-area: card-icon;
  display: flex;
`;

const Card = memo(
  function Card({
    frontMatter,
  }: {
    frontMatter: z.infer<typeof FrontMatterSchema>;
  }) {
    const { title, date, slug, category } = frontMatter;

    const formattedDate = React.useMemo(() => {
      return new Intl.DateTimeFormat("ko-kr", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(date));
    }, [date]);

    return (
      <Wrapper>
        <LinkWrapper
          href={`/post/${category}/${slug}`}
          tabIndex={0}
          prefetch={false} // 필요할 때만 프리페치
        >
          <Header>{title}</Header>
          <Footer>{formattedDate}</Footer>
        </LinkWrapper>
      </Wrapper>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.frontMatter.slug === nextProps.frontMatter.slug;
  }
);

export default Card;
