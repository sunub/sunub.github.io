import { FrontMatterLoading } from "@/components/Skeletons/ui/ContentLoading";
import { useBlogPostContext } from "../BlogPostProvider";

export function BlogPostListViewLoader() {
	const { isPending } = useBlogPostContext();

	return <>{isPending && <FrontMatterLoading length={1} />}</>;
}
