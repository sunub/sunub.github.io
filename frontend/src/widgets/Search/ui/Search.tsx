"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useSearchModal } from "../hook/useSearchAtoms";
import { SearchButton } from "./SearchButton";
import SearchModal from "./SearchModal";

function Search() {
  const { isOpen, open, close } = useSearchModal();
  const portalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!portalRef.current) {
      portalRef.current = document.getElementById(
        "blog-search__input-area",
      ) as HTMLDivElement;
    }
  }, []);

  return (
    <>
      <SearchButton isOpen={isOpen} toggleOpen={open} />
      {isOpen &&
        portalRef.current &&
        createPortal(<SearchModal close={close} />, portalRef.current)}
    </>
  );
}
export { Search };
