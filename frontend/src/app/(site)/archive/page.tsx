import { Wave } from "@/components/Header/Wave";
import { PostArchiveSection } from "@/components/Main/PostArchive";
import { POST_ARCHIVE_INITIAL_VISIBLE_COUNT } from "@/components/Main/PostArchive/utils";
import Spacer from "@/components/Spacer";
import {
	getStaticArchivePostsInRange,
	getStaticArchiveSummary,
} from "@/server/static-index";
import { ARCHIVE_TOP_ID } from "@/shared/utils/archiveRoute";
import {
	ArchivePageRoot,
	ArchivePageWrapper,
	ArchiveTitle,
	ArchiveTitleAccent,
} from "./page.style";

export default async function Page() {
	const [summary, initialData] = await Promise.all([
		getStaticArchiveSummary(),
		getStaticArchivePostsInRange("all", 0, POST_ARCHIVE_INITIAL_VISIBLE_COUNT),
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
						initialCategory="all"
						initialData={initialData}
						summary={summary}
					/>
				</ArchivePageRoot>
			</ArchivePageWrapper>
		</>
	);
}
