import { Suspense } from "react";
import { FrontMatterLoading } from "@/components/Skeletons/ui/ContentLoading";
import Spacer from "@/components/Spacer";
import { BlogPost } from "../BlogPost";
import { getRecentPost } from "./api/getRecentPost";
import { RootWrapper } from "./NewestPost.style";

async function NewestPost() {
	const recentlyPostedPost = await getRecentPost();

	return (
		<RootWrapper>
			<Spacer axis={"vertical"} size={32} />
			<Suspense fallback={<FrontMatterLoading length={5} />}>
				<BlogPost recentlyPublished={recentlyPostedPost} />
			</Suspense>
		</RootWrapper>
	);
}

export default NewestPost;
