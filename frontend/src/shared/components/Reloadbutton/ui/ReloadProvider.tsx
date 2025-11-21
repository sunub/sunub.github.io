import { useState } from "react";
import { ReloadContext } from "./reloadContext";

interface ReloadProviderProps {
	children: React.ReactNode;
}

export function ReloadProvider({ children }: ReloadProviderProps) {
	const [key, setKey] = useState<number>(0);
	const reload = () => {
		setKey((prev) => prev + 1);
	};

	return (
		<ReloadContext.Provider value={{ key, reload }}>
			{children}
		</ReloadContext.Provider>
	);
}
