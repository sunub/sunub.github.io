import { memo } from "react";
import {
	ArchiveSectionDescription,
	ArchiveSectionEyebrow,
	ArchiveSectionHeader,
	ArchiveSectionTitle,
} from "../style";

export const PostArchiveHeader = memo(function PostArchiveHeader({
	eyebrow,
	title,
	description,
}: {
	eyebrow: string;
	title: string;
	description: string;
}) {
	return (
		<ArchiveSectionHeader>
			<ArchiveSectionEyebrow>{eyebrow}</ArchiveSectionEyebrow>
			<ArchiveSectionTitle>{title}</ArchiveSectionTitle>
			<ArchiveSectionDescription>{description}</ArchiveSectionDescription>
		</ArchiveSectionHeader>
	);
});
