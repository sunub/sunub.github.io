import { Wave } from "@/components/Header/Wave";
import { PostArchiveSection } from "@/components/Main/PostArchive";
import {
	getArchivePostsInRange,
	getArchiveSummary,
} from "@/components/Main/PostArchive/api/archive";
import {
	POST_ARCHIVE_INITIAL_VISIBLE_COUNT,
	parsePostArchiveCategoryFilter,
} from "@/components/Main/PostArchive/utils";
import Spacer from "@/components/Spacer";
import { ARCHIVE_TOP_ID } from "@/shared/utils/archiveRoute";
import {
	ArchivePageRoot,
	ArchivePageWrapper,
	ArchiveTitle,
	ArchiveTitleAccent,
} from "./page.style";

type SearchParams = Promise<{
	category?: string;
}>;

export default async function Page({
	searchParams,
}: {
	searchParams: SearchParams;
}) {
	const resolvedSearchParams = await searchParams;
	const initialCategory = parsePostArchiveCategoryFilter(
		resolvedSearchParams.category,
	);
	const [summary, initialData] = await Promise.all([
		getArchiveSummary(),
		getArchivePostsInRange(
			initialCategory,
			0,
			POST_ARCHIVE_INITIAL_VISIBLE_COUNT,
		),
	]);

	return (
		<>
			<div id={ARCHIVE_TOP_ID} aria-hidden="true" />
			<ArchiveTitle>
				<ArchiveTitleAccent>Post Archive</ArchiveTitleAccent>
			</ArchiveTitle>
			<Wave />

			<ArchivePageWrapper>
				<ArchivePageRoot>
					<Spacer axis="vertical" size={40} />
					<PostArchiveSection
						initialCategory={initialCategory}
						initialData={initialData}
						summary={summary}
					/>
				</ArchivePageRoot>
			</ArchivePageWrapper>
		</>
	);
}
