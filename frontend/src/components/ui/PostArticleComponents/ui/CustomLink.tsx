"use client";

import Link from "next/link";
import styled from "styled-components";

function CustomLink({
	href,
	children,
}: {
	href: string;
	children: React.ReactNode;
}) {
	return (
		<LinkComponent
			rel="noopener noreferrer"
			href={href}
			replace
			target="_blank"
		>
			{children}
		</LinkComponent>
	);
}

const LinkComponent = styled(Link)`
  word-break: break-all;
  text-decoration: underline;
  text-underline-offset: 2px;
  padding: 4px 4px;
  transition: background 250ms cubic-bezier(0.455, 0.03, 0.515, 0.955);
  color: oklch(64.86% 0.181 249.54);
  border-radius: 2px;

  :hover {
    background: oklch(82.48% 0 105 / 0.3);
  }
`;

export { CustomLink };
