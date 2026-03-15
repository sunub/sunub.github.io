import { Footer } from "@/components/Footer";
import Header from "@/components/Header";

export function SiteShell({ children }: { children: React.ReactNode }) {
	return (
		<div id="__next" data-testid="root-layout">
			<Header />
			<div className="blog-main__landing-page">{children}</div>
			<Footer />
		</div>
	);
}
