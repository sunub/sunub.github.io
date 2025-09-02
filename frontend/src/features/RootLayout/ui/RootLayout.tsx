import { Footer } from '@/components/Footer';
import Header from '@/components/Header';

export function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div id="__next">
      <Header />
      <div className="blog-main__landing-page">{children}</div>
      <Footer />
    </div>
  );
}
