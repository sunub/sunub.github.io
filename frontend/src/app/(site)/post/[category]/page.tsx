import { Suspense } from "react";
import { PostCards } from "@/components/Card/PostCard";
import { Wave } from "@/components/Header/Wave";
import { CardsSkeleton } from "@/components/Skeletons";
import Spacer from "@/components/Spacer";
import { RootContainer, Title, TitleContainer } from "./page.style";

type Cateogry = "code" | "web" | "cs" | "algorithm";
type Params = Promise<{
	category: Cateogry;
}>;

export async function generateStaticParams() {
	return [
		{ category: "code" },
		{ category: "web" },
		{ category: "cs" },
		{ category: "algorithm" },
	];
}

export default async function Page({ params }: { params: Params }) {
	const resolvedParams = await params;
	const { category } = resolvedParams;

	const title = {
		code: "Code",
		web: "Web knowldge",
		cs: "Computre Science",
		algorithm: "Algorithm",
	};

	return (
		<>
			<TitleContainer>
				<Title>{`${title[category]}`}</Title>
			</TitleContainer>
			<Wave />
			<RootContainer>
				<Spacer size={48} axis={"vertical"} />
				<Suspense fallback={<CardsSkeleton />}>
					<PostCards category={category} />
				</Suspense>
			</RootContainer>
		</>
	);
}
