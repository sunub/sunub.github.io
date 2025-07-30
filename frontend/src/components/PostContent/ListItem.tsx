"use client";

import React from "react";
import styled from "styled-components";
import Spacer from "@/components/Spacer";

const Li = styled.li`
  display: flex;
  align-items: flex-start;

  :not(:first-child) {
    margin-top: 16px;
  }
`;

export default function ListItem({ children, ...props }: { children: any[] }) {
  const liRef = React.useRef<HTMLLIElement>(null);
  const [isUl, setIsUl] = React.useState(false);

  React.useEffect(() => {
    if (liRef.current && liRef.current.parentNode?.nodeName === "UL") {
      setIsUl(true);
    }
  }, []);

  return (
    <Li ref={liRef} {...props}>
      {isUl && <Icon />}
      {isUl && <Spacer axis={"horizonal"} size={8} />}
      <div>{children}</div>
    </Li>
  );
}

function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-feather"
      style={{
        color: "var(--color-bird)",
        transform: "scale(0.8)",
      }}
    >
      <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
      <line x1="16" y1="8" x2="2" y2="22"></line>
      <line x1="17.5" y1="15" x2="9" y2="15"></line>
    </svg>
  );
}
