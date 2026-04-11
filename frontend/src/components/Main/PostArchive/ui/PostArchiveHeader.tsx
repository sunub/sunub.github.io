import {
	ArchiveSectionDescription,
	ArchiveSectionEyebrow,
	ArchiveSectionHeader,
	ArchiveSectionTitle,
} from "../style";

export function PostArchiveHeader({
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
}
