import ThemeProvider from "@/components/Theme/ThemeProvider";
import { SiteShell } from "@/features/SiteShell";

export default function SiteLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ThemeProvider>
			<SiteShell>{children}</SiteShell>
		</ThemeProvider>
	);
}
