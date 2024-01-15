import PostContent from "@/components/PostContent";
import Post from "@/utils/Post";
import * as Styled from "../style";
import useColorTheme from "@/hooks/use-colorTheme";
import Header from "@/components/v2/Header";
import Wave from "@/components/v2/HeaderContents/Wave";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const post = new Post();
  const frontmatters = post.frontMatters["all"];

  const params = [];
  for (const frontmatter of frontmatters) {
    params.push({
      slug: frontmatter.slug,
    });
  }

  return params;
}

export default async function Page({ params }) {
  const { slug } = params;
  const post = new Post();
  const postcontent = post.contents[slug];
  const colorTheme = await useColorTheme();

  return (
    <div id="side-ng__main-content">
      <Styled.Header $theme={colorTheme}>
        <Header initColorTheme={colorTheme} />
        <Wave colorTheme={colorTheme} />
      </Styled.Header>
      <main>
        <PostContent postcontent={postcontent} />
        <Footer />
      </main>
    </div>
  );
}
