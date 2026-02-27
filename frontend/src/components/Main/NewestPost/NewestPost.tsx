import Spacer from "@/components/Spacer";
import { getRecentPost } from "./api/getRecentPost";
import { RootWrapper } from "./NewestPost.style";
import { BlogPostListViewComposer } from "../BlogPost/ui/BlogPostListView";
import { BlogPost } from "../BlogPost";

async function NewestPost() {
  const recentlyPostedPost = await getRecentPost();

  return (
    <RootWrapper>
      <Spacer axis={"vertical"} size={32} />

      <BlogPost recentlyPublished={recentlyPostedPost}>
        <BlogPostListViewComposer.root>
          <BlogPostListViewComposer.loader />
        </BlogPostListViewComposer.root>
      </BlogPost>
    </RootWrapper>
  );
}

export default NewestPost;
