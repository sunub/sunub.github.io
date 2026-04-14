import { Provider } from "jotai";
import { ArchiveSectionRoot } from "@/components/Main/PostArchive/style";
import { PostArchiveHeader } from "@/components/Main/PostArchive/ui/PostArchiveHeader";
import { ScrollRestorationController } from "@/components/Main/PostArchive/ui/ScrollRestorationController";
import Spacer from "@/components/Spacer";
import { ARCHIVE_TOP_ID } from "@/shared/utils/archiveRoute";
import { Wave } from "@/widgets/Wave";
import { ArchivePageRoot, ArchivePageWrapper } from "./page.style";

export default async function ArchiveLayout({
	children,
}: {
	children: React.ReactNode;
	params: Promise<Record<string, never>>;
}) {
	const eyebrow = "All Categories";
	const title = "Full Post Archive";
	const description =
		"카테고리를 이동하지 않고도 전체 포스트를 훑어볼 수 있는 아카이브입니다. 필터를 전환하면 같은 페이지에서 각 주제의 흐름을 이어서 탐색할 수 있어요.";

	return (
		<Provider>
			<ScrollRestorationController />
			<div id={ARCHIVE_TOP_ID} aria-hidden="true" />
			<Wave />

			<ArchivePageWrapper>
				<ArchivePageRoot>
					<Spacer axis="vertical" size={40} />
					<ArchiveSectionRoot data-testid="post-archive-section">
						<PostArchiveHeader
							eyebrow={eyebrow}
							title={title}
							description={description}
						/>

						{children}
					</ArchiveSectionRoot>
				</ArchivePageRoot>
			</ArchivePageWrapper>
		</Provider>
	);
}
