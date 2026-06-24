import { WaveAnchor } from "@/components/ui/WaveAnchor";
import { VisuallyHidden } from "@/components/VisuallyHidden";
import { ARCHIVE_TOP_HREF } from "@/shared/utils/archiveRoute";
import { HeaderLeftSideActionNav } from "../Header.style";

export function Archive() {
	return (
		<HeaderLeftSideActionNav aria-label="추가 페이지 바로가기">
			<WaveAnchor href={ARCHIVE_TOP_HREF}>
				<VisuallyHidden>아카이브 페이지로 이동</VisuallyHidden>
				아카이브
			</WaveAnchor>
		</HeaderLeftSideActionNav>
	);
}
