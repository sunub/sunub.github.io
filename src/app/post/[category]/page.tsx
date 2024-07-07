import { sql } from "@vercel/postgres";
import {
  allCSPosts,
  allCodePosts,
  allWebPosts,
  allAlgorithmPosts,
} from "contentlayer/generated";
import {
  WebPost,
  CodePost,
  CSPost,
  AlgorithmPost,
} from "contentlayer/generated";
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

type FrontMatters = WebPost[] | CodePost[] | CSPost[] | AlgorithmPost[];

const categoryHandlers = {
  code: allCodePosts,
  web: allWebPosts,
  cs: allCSPosts,
  algorithm: allAlgorithmPosts,
};

function handleCategory(category: Cateogry): FrontMatters {
  const handler = categoryHandlers[category];
  if (handler) {
    return handler;
  } else {
    console.log("Unknown category");
    return [];
  }
}

export default function Page({ params }: Props) {
  const { category } = params;

  const postinfo = handleCategory(category);
  if (!postinfo.length) {
    throw new Error("없는 카테고리 입니다.");
  }

  const frontmatters = postinfo.map((post) => ({
    title: post.title,
    date: post.date,
    tags: post.tags,
    summary: post.summary,
    category: post.category,
    slug: post.slug,
    completed: post.completed,
  }));

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
      <div className="bg-base">
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
