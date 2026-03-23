import { Wave } from "@/components/Header/Wave";
import { PostArchiveSection } from "@/components/Main/PostArchive";
import Spacer from "@/components/Spacer";
import { getArchiveFrontmatters } from "@/server/posts";
import { ARCHIVE_TOP_ID } from "@/shared/utils/archiveRoute";
import {
	ArchivePageRoot,
	ArchivePageWrapper,
	ArchiveTitle,
	ArchiveTitleAccent,
} from "./page.style";

export default async function Page() {
	const posts = await getArchiveFrontmatters();

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
					<PostArchiveSection posts={posts} />
				</ArchivePageRoot>
			</ArchivePageWrapper>
		</>
	);
}
