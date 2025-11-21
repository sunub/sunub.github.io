import { useMemo } from "react";
import { DateCompo, Footer } from "../style";

export function BlogPostItemFooter({ dateISO }: { dateISO: string }) {
	const { localeDate, webStandardDate } = useMemo(() => {
		const date = new Date(dateISO);
		return {
			localeDate: new Intl.DateTimeFormat("ko-KR", {
				year: "numeric",
				month: "long",
				day: "numeric",
			}).format(date),
			webStandardDate: date.toISOString().split("T")[0],
		};
	}, [dateISO]);

	return (
		<Footer>
			<DateCompo dateTime={webStandardDate}>{localeDate}</DateCompo>
		</Footer>
	);
}
