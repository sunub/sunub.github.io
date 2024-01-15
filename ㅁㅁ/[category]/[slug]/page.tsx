import PostContent from "@/components/PostContent";
import Post from "@/utils/Post";
import Footer from "@/components/Footer";
import MinimalHeader from "@/components/MinimalHeader";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
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

  return (
    <div id="side-ng__main-content">
      <MinimalHeader />
      <main>
        <PostContent postcontent={postcontent} />
        <Footer />
      </main>
    </div>
  );
}
