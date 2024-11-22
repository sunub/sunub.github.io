import React from "react";
import { LinkAnchor, LinkSVG, H1, H2, H3, H4, H5, H6 } from "./sectionHeading";
import { PostImage } from "./image";
import Video from "./video";
import { CodeBlock, InlineCode } from "./codeBlock";
import { ListItem, UnOrderedList } from "./ul";
import { Blockquote } from "./blockquote";

function LinkIcon() {
  return (
    <LinkSVG
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-hash"
    >
      <line x1="4" y1="9" x2="20" y2="9"></line>
      <line x1="4" y1="15" x2="20" y2="15"></line>
      <line x1="10" y1="3" x2="8" y2="21"></line>
      <line x1="16" y1="3" x2="14" y2="21"></line>
    </LinkSVG>
  );
}

function slugify(str: string) {
  return str.toString().trim().replace(/\ /g, "-");
}

const headers = [H1, H2, H3, H4, H5, H6];

function getHeaderByLevel(level: number) {
  return headers[level - 1] || H1;
}

function createHeadingComponent(level: number) {
  return ({ children }: { children: string }) => {
    const slug = slugify(children);
    const header = getHeaderByLevel(level);
    return React.createElement(header, { id: slug }, [
      React.createElement(LinkAnchor, { href: `#${slug}`, key: `${slug}` }, [
        React.createElement(LinkIcon, { key: `${slug}-icon` }),
      ]),
      children,
    ]);
  };
}

type CodeProps = {
  className: string;
  children: React.ReactNode;
};

const postComponents: any = {
  h1: createHeadingComponent(1),
  h2: createHeadingComponent(2),
  h3: createHeadingComponent(3),
  h4: createHeadingComponent(4),
  h5: createHeadingComponent(5),
  h6: createHeadingComponent(6),
  p: ({ children }: { children: React.ReactNode }) => (
    <div className="leading-7 text-pretty pb-6">{children}</div>
  ),
  img: PostImage,
  Video,
  pre: ({ children }: { children: React.ReactNode }) => children,
  code: ({ className, ...props }: CodeProps) => {
    if (className?.startsWith("language-")) {
      return <CodeBlock className={className} {...props} />;
    }
    return <InlineCode {...props} />;
  },
  ul: UnOrderedList,
  li: ListItem,
  blockquote: Blockquote,
};

export { postComponents };
