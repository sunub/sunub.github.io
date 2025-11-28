import { CodeBlockWrapper } from "../style";

export function CodeBlockSkeleton() {
	return (
		<CodeBlockWrapper>
			<div
				style={{
					backgroundColor: "var(--color-code-skeleton)",
					width: "100%",
					height: "100px",
					borderRadius: "8px",
				}}
			/>
		</CodeBlockWrapper>
	);
}
