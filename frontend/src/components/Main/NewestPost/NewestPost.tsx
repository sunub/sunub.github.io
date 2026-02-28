import Spacer from "@/components/Spacer";
import { getRecentPost } from "./api/getRecentPost";
import { BlogPost } from "../BlogPost";
import {
	BlogPostListViewLoader,
	BlogPostListViewRoot,
} from "../BlogPost/ui/BlogPostListView";
import { InnerServerError } from "@/shared/error";

async function NewestPost() {
	const recentlyPostedPost = await getRecentPost();
	if (recentlyPostedPost.totalCount === 0) {
		throw new InnerServerError("최근 게시물을 불러오는 데 실패했습니다.");
	}

	return (
		<BlogPost recentlyPublished={recentlyPostedPost}>
			<Spacer axis={"vertical"} size={32} />

			<BlogPostListViewRoot>
				<BlogPostListViewLoader />
			</BlogPostListViewRoot>
		</BlogPost>
	);
}

export default NewestPost;
