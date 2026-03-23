import { VisuallyHidden } from "@/components/VisuallyHidden";
import { ARCHIVE_TOP_HREF } from "@/shared/utils/archiveRoute";
import {
	HeaderLeftSideActionLabel,
	HeaderLeftSideActionLink,
	HeaderLeftSideActionNav,
	HeaderLeftSideActionWaveIcon,
	HeaderLeftSideActionWaveSlot,
} from "../Header.style";

export function Archive() {
	return (
		<HeaderLeftSideActionNav aria-label="추가 페이지 바로가기">
			<HeaderLeftSideActionLink href={ARCHIVE_TOP_HREF}>
				<VisuallyHidden>아카이브 페이지로 이동</VisuallyHidden>
				<HeaderLeftSideActionLabel>아카이브</HeaderLeftSideActionLabel>
				<HeaderLeftSideActionWaveSlot aria-hidden="true">
					<HeaderLeftSideActionWaveIcon />
				</HeaderLeftSideActionWaveSlot>
			</HeaderLeftSideActionLink>
		</HeaderLeftSideActionNav>
	);
}
