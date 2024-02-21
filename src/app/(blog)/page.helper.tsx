import React from "react";
import { highlight } from "sugar-high";
import * as Styled from "./page.style";
import PostContentImage from "@/components/PostContent/PostContentImage";

function slugify(str: string) {
  return str.toString().trim().replace(/\ /g, "-");
}

function LinkIcon() {
  return (
    <Styled.LinkSVG
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 13C10.4295 13.5741 10.9774 14.0492 11.6066 14.3929C12.2357 14.7367 12.9315 14.9411 13.6467 14.9923C14.3618 15.0436 15.0796 14.9404 15.7513 14.6898C16.4231 14.4392 17.0331 14.0471 17.54 13.54L20.54 10.54C21.4508 9.59699 21.9548 8.33398 21.9434 7.023C21.932 5.71201 21.4061 4.45795 20.4791 3.53091C19.5521 2.60387 18.298 2.07803 16.987 2.06663C15.676 2.05524 14.413 2.55921 13.47 3.47L11.75 5.18"
        stroke="var(--color-bird)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 11C13.5705 10.4259 13.0226 9.95082 12.3934 9.60706C11.7642 9.2633 11.0684 9.05888 10.3533 9.00767C9.63816 8.95645 8.92037 9.05963 8.24861 9.31022C7.57685 9.5608 6.96684 9.95293 6.45996 10.46L3.45996 13.46C2.54917 14.403 2.04519 15.666 2.05659 16.977C2.06798 18.288 2.59382 19.5421 3.52086 20.4691C4.4479 21.3961 5.70197 21.922 7.01295 21.9334C8.32393 21.9448 9.58694 21.4408 10.53 20.53L12.24 18.82"
        stroke="var(--color-bird)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Styled.LinkSVG>
  );
}

function Code({ children, ...props }: { children: string }) {
  let codeHTML = highlight(children);
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
}

function createHeading(level: number) {
  return ({ children }: { children: string }) => {
    let slug = slugify(children);
    return React.createElement(`h${level}`, { id: slug }, [
      React.createElement(
        Styled.LinkAnchor,
        {
          href: `#${slug}`,
          key: `${slug}`,
        },
        [React.createElement(LinkIcon, { key: `${slug}-icon` }), children],
      ),
    ]);
  };
}

const components: any = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  code: Code,
  PostContentImage: PostContentImage,
};

export { components };
