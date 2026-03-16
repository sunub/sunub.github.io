import ThemeProvider from "@/components/Theme/ThemeProvider";
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
			<SiteShell>{children}</SiteShell>
		</ThemeProvider>
	);
}
