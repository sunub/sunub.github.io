import CategoryPage from "@/components/CategoryPage";
import Footer from "@/components/Footer";
import MobileNav from "@/components/Header/mobile/MobileNav";
import HeaderContents from "@/components/v2/HeaderContents";
import Post from "@/utils/Post";
import useColorTheme from "@/hooks/use-colorTheme";
import * as Styled from "./style";
import Header from "@/components/v2/Header";
import Wave from "@/components/v2/HeaderContents/Wave";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const post = new Post();
  const frontmatters = post.frontMatters["all"];
  const categories = Object.keys(frontmatters);

  return categories.map((category) => ({
    params: {
      category,
    },
  }));
}

async function Page({ params }: { params: { category: string } }) {
  const { category } = params;
  const colorTheme = await useColorTheme();

  return (
    <div id="side-ng__main-content">
      <Styled.Header $theme={colorTheme}>
        <Header initColorTheme={colorTheme} />
        <Wave colorTheme={colorTheme} />
      </Styled.Header>
      <main>
        <CategoryPage category={category} />
        <Footer />
      </main>
    </div>
  );
}
export default Page;
