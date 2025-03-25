import { MDXRemote } from "next-mdx-remote/rsc";
import { PostArticleComponents } from "@/components/ui/PostArticleComponents";
import { type PostCategory } from "@/types/schema";
import { Fragment, Suspense } from "react";
import { ComponentSkeleton } from "@/components/Skeletons";

async function MdxSection({ content }: { content: string }) {
  return <MDXRemote source={content} components={PostArticleComponents} />;
}

function splitContentIntoSections(content: string): string[] {
  const sections = content.split(/^## /gm);
  if (sections.length > 0 && !sections[0].startsWith("#")) {
    sections[0] = sections[0].trim();
  } else {
    for (let i = 1; i < sections.length; i++) {
      sections[i] = "## " + sections[i];
    }
  }
  return sections.filter((section) => section.trim() !== "");
}

async function StreamedMdxContent({
  category,
  slug,
}: {
  category: PostCategory;
  slug: string;
}) {
  return <Fragment></Fragment>;
}

export { StreamedMdxContent };
