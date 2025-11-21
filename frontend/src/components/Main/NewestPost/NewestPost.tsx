import { getRecentPostsMetadataInRange } from "db/blog/api";
import { Suspense } from "react";
import { FrontMatterLoading } from "@/components/Skeletons/ui/ContentLoading";
import Spacer from "@/components/Spacer";
import { BlogPost } from "../BlogPost";
import { RootWrapper } from "./NewestPost.style";

async function NewestPost() {
	const initialPosts = await getRecentPostsMetadataInRange(0, 10);

	return (
		<RootWrapper>
			<Spacer axis={"vertical"} size={32} />
			<Suspense fallback={<FrontMatterLoading length={5} />}>
				<BlogPost recentlyPublished={initialPosts} />
			</Suspense>
		</RootWrapper>
	);
}

export default NewestPost;
