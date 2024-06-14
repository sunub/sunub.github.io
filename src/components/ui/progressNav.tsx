"use client";

import React from "react";
import Link from "next/link";

interface Props {
  headers: string[][];
}

const buildNav = (headers: string[][], nav: Array<[string, string[]]> = []) => {
  for (const header of headers) {
    const level = header[0].length;
    const title = header.slice(1).join(" ");

    if (level == 2) {
      nav.push([title, []]);
    } else {
      nav[nav.length - 1][1].push(title);
    }
  }
  return nav;
};

const getAnchorTitleId = (title: string) => {
  return title.split(" ").join("-");
};

export default function ProgressNav({ headers }: Props) {
  const nav = buildNav(headers);

  React.useEffect(() => {
    const options: IntersectionObserverInit = {
      rootMargin: "20px",
      threshold: [0, 0.25, 0.5, 0.75, 1],
    };

    const observer = new IntersectionObserver((entires) => {
      entires.forEach((entry) => {
        const id = entry.target.getAttribute("id");
        if (entry.intersectionRatio > 0) {
          document
            .querySelector(`nav li a[href="#${id}"]`)
            ?.parentElement?.classList.add("active");
        } else {
          document
            .querySelector(`nav li a[href="#${id}"]`)
            ?.parentElement?.classList.remove("active");
        }
      });
    }, options);
    const target = document.querySelectorAll("h2[id], h3[id]");
    target.forEach((title) => observer.observe(title));

    return () => target.forEach((title) => observer.unobserve(title));
  }, []);

  return (
    <nav id="blog-post__page-nav">
      <ol className="sticky top-[3rem] self-start text-[14px]">
        {nav.map(([title, items]) => {
          return (
            <li key={`${title}`}>
              <Link href={`#${getAnchorTitleId(title)}`}>{title}</Link>
              {items.length ? (
                <ul>
                  {items.map((title) => {
                    return (
                      <li key={title}>
                        <Link href={`#${getAnchorTitleId(title)}`}>
                          {title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
