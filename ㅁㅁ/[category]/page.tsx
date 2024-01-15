import CategoryPage from "@/components/CategoryPage";
import Footer from "@/components/Footer";
import Post from "@/utils/Post";
import MinimalHeader from "@/components/MinimalHeader";

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

  return (
    <div id="side-ng__main-content">
      <MinimalHeader />
      <main>
        <CategoryPage category={category} />
        <Footer />
      </main>
    </div>
  );
}
export default Page;
