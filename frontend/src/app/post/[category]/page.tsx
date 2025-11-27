import localFont from "next/font/local";
import { Suspense } from "react";
import Card from "@/components/Card";
import { Wave } from "@/components/Header/Wave";
import { CardsSkeleton } from "@/components/Skeletons";
import Spacer from "@/components/Spacer";
import { RootLayout } from "@/features/RootLayout";
import { getPostsMetadataByCategory } from "./api/getPostsMetadataByCategory";
import {
	FrontmatterWrapper,
	RootContainer,
	Title,
	TitleContainer,
} from "./page.style";

type Cateogry = "code" | "web" | "cs" | "algorithm";
type Params = Promise<{
	category: Cateogry;
}>;

const craftyGirls = localFont({
	src: "../../../../public/fonts/CraftyGirls-Regular.woff2",
	display: "swap",
	style: "normal",
	variable: "--crafty-girls-font",
	fallback: ["system-ui", "sans-serif"],
});

export default async function Page({ params }: { params: Params }) {
	const resolvedParams = await params;
	const { category } = resolvedParams;

	const postMetadata = await getPostsMetadataByCategory(category);
	if (!postMetadata.length) {
		throw new Error("없는 카테고리 입니다.");
	}

	const title = {
		code: "Code",
		web: "Web knowldge",
		cs: "Computre Science",
		algorithm: "Algorithm",
	};

	return (
		<RootLayout>
			<TitleContainer>
				<Title
					className={`${craftyGirls.className}`}
				>{`${title[category]}`}</Title>
			</TitleContainer>
			<Wave />
			<RootContainer>
				<Spacer size={48} axis={"vertical"} />
				<Suspense fallback={<CardsSkeleton />}>
					<FrontmatterWrapper id="frontmatter-cards">
						{postMetadata.map(({ frontmatter }) => (
							<Card key={frontmatter.slug} frontMatter={frontmatter} />
						))}
					</FrontmatterWrapper>
				</Suspense>
			</RootContainer>
		</RootLayout>
	);
}
