import {
  MDXFile,
  allAlgorithmPost,
  allCSPost,
  allCodePost,
  allWebPost,
} from "@/db/blog";

import Wave from "@/components/HeaderContents/Wave";
import Spacer from "@/components/Spacer";
import { FrontmatterWrapper } from "./page.style";
import Card from "@/components/Card";

interface Props {
  params: {
    category: Cateogry;
  };
}

type Cateogry = "code" | "web" | "cs" | "algorithm";

const categoryHandlers = {
  code: allCodePost,
  web: allWebPost,
  cs: allCSPost,
  algorithm: allAlgorithmPost,
};

async function handleCategory(category: Cateogry): Promise<MDXFile[]> {
  const handler = categoryHandlers[category];
  if (handler) {
    return await handler();
  } else {
    console.log("Unknown category");
    return [];
  }
}

export default async function Page({ params }: Props) {
  const { category } = params;

  const postinfo = await handleCategory(category);
  if (!postinfo.length) {
    throw new Error("없는 카테고리 입니다.");
  }

  const frontmatters = postinfo.map((post) => post.frontmatter);

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
      <div className="bg-base relative top-[-65px]">
        <Spacer size={48} axis={"vertical"} />
        <FrontmatterWrapper>
          {frontmatters.map((frontmatter) => (
            <Card key={frontmatter.slug} frontMatter={frontmatter} />
          ))}
        </FrontmatterWrapper>
      </div>
    </section>
  );
}
