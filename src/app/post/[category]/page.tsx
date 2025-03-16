import Wave from "@/components/HeaderContents/Wave";
import Spacer from "@/components/Spacer";
import { FrontmatterWrapper } from "./page.style";
import Card from "@/components/Card";
import { getPostsMetadataByCategory } from "db/blog";
import { Suspense } from "react";
import { CardsSkeleton } from "@/components/Skeletons";

type Cateogry = "code" | "web" | "cs" | "algorithm";
type Params = Promise<{
  category: Cateogry;
}>;

export default async function Page({ params }: { params: Params }) {
  const resolvedParams = await params;
  const { category } = resolvedParams;

  const postMetadata = await getPostsMetadataByCategory(category);
  if (!postMetadata.length) {
    throw new Error("없는 카테고리 입니다.");
  }

  const title = {
    code: "Code",
    web: "Web knowldge",
    cs: "Computre Science",
    algorithm: "Algorithm",
  };

  return (
    <section>
      <div className="w-full max-w-[1000px] flex justify-center mt-16 mb-12 ml-auto mr-auto text-base">
        <h1 className="text-5xl">{`${title[category]}`}</h1>
      </div>
      <Wave />
      <div className="bg-base relative top-[-64px] px-8">
        <Spacer size={48} axis={"vertical"} />
        <Suspense fallback={<CardsSkeleton />}>
          <FrontmatterWrapper>
            {postMetadata.map((frontmatter) => (
              <Card key={frontmatter.slug} frontMatter={frontmatter} />
            ))}
          </FrontmatterWrapper>
        </Suspense>
      </div>
    </section>
  );
}
