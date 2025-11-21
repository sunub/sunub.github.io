import { BlogPostTitle, Title, TitleDot } from "../style";
import { UnderLineWave } from "./UnderLineWave";

export function BlogPostItemHeader({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<BlogPostTitle>
			<Title>{children}</Title>
			<TitleDot />
			<UnderLineWave />
		</BlogPostTitle>
	);
}
