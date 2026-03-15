import { BlogPost } from "../../BlogPost";
import {
	NewestPostList,
	NewestPostListLoadMoreRow,
} from "../../NewestPostList";
import { getRecentPost } from "../api/getRecentPost";

export async function FeaturedPost() {
	const recentlyPostedPost = await getRecentPost();

	return (
		<BlogPost recentlyPublished={recentlyPostedPost}>
			<NewestPostList>
				<NewestPostListLoadMoreRow />
			</NewestPostList>
		</BlogPost>
	);
}
