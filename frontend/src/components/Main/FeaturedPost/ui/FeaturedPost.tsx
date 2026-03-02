import Spacer from "@/components/Spacer";
import { getRecentPost } from "../api/getRecentPost";
import { BlogPost } from "../../BlogPost";
import {
	NewestPostList,
	NewestPostListLoadMoreRow,
} from "../../NewestPostList";

export async function FeaturedPost() {
	const recentlyPostedPost = await getRecentPost();

	return (
		<BlogPost recentlyPublished={recentlyPostedPost}>
			<Spacer axis={"vertical"} size={32} />

			<NewestPostList>
				<NewestPostListLoadMoreRow />
			</NewestPostList>
		</BlogPost>
	);
}

export default FeaturedPost;
