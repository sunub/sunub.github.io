"use client";

import useToggle from "@/hooks/use-toggle";
import { SearchButton } from "./SearchButton";
import { SearchModal } from "./SearchModal";
import { createPortal } from "react-dom";

function Search() {
  const [isOpen, toggleOpen] = useToggle(false);

  return (
    <>
      <SearchButton isOpen={isOpen} toggleOpen={toggleOpen} />
      {isOpen &&
        createPortal(
          <SearchModal toggleOpen={toggleOpen} />,
          document.getElementById("blog-search__input-area")!
        )}
    </>
  );
}
export { Search };
