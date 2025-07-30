import getBlogInstance from "db/blog/blog";
import { findMatches } from "./utils/findMatches";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  if (!query) {
    return new Response(JSON.stringify({ results: [] }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
  console.log("search query", query);

  const blog = await getBlogInstance();
  const results = [];
  for (const post of blog.sortedPosts) {
    const { title, summary } = post.frontmatter;
    const titleHits = findMatches(query, title);
    // const summaryHits = findMatches(query, summary);
    if (titleHits.length) {
      results.push({
        post,
        titleMatches: titleHits,
        // summaryMatches: summaryHits,
      });
    }
  }
  return new Response(JSON.stringify({ results }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
