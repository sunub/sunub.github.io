"use client";

import React from "react";
import { unstable_noStore as noStore } from "next/cache";
import { FrontMatter } from "type";
import * as Styled from "./Card.style";

function formatDate(date: string) {
  noStore();
  let currentDate = new Date();
  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }
  let targetDate = new Date(date);

  let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  let monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  let daysAgo = currentDate.getDate() - targetDate.getDate();

  let formattedDate = "";

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`;
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`;
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`;
  } else {
    formattedDate = "Today";
  }

  let fullDate = targetDate.toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return `${fullDate} (${formattedDate})`;
}

export default function Card({
  frontMatter,
}: {
  frontMatter: Partial<FrontMatter>;
}) {
  const { title, date, slug } = frontMatter;
  return (
    <Styled.Wrapper>
      <Styled.LinkWrapper href={`/${slug}`} tabIndex={0}>
        <Styled.Header>{title}</Styled.Header>
        <Styled.Footer>
          <React.Suspense>{formatDate(date as string)}</React.Suspense>
        </Styled.Footer>
      </Styled.LinkWrapper>
    </Styled.Wrapper>
  );
}
