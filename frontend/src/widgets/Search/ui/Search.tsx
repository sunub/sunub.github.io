"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useSearchModal } from "../hook/useSearchAtoms";
import { SearchButton } from "./SearchButton";

const SearchModal = dynamic(() => import("./SearchModal"), {
	ssr: false,
	loading: () => <p>Loading...</p>,
});

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
