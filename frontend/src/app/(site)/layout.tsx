import ThemeProvider from "@/components/Theme/ThemeProvider";
import { AnimatePresenceWrapper } from "@/features/AnimatePresenceWrapper";
import { SiteShell } from "@/features/SiteShell";
import { getRequestTheme } from "@/utils/theme";

export default async function SiteLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const theme = await getRequestTheme();

	return (
		<ThemeProvider initialTheme={theme}>
			<SiteShell>
				<AnimatePresenceWrapper>{children}</AnimatePresenceWrapper>
			</SiteShell>
		</ThemeProvider>
	);
}
