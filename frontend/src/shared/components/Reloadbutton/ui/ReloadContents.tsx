import React from "react";
import { useReloadContext } from "../hook/useReload";

export function ReloadContents({ children }: { children: React.ReactNode }) {
	const { key } = useReloadContext();
	return <React.Fragment key={key}>{children}</React.Fragment>;
}
