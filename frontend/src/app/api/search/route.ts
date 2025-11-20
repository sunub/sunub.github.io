import { getAllPostsFrontmatter } from 'db/blog/api';
import { z } from 'zod/v4';
import { PostFrontMatterSchema } from '@/db/blog/Schema';
import { findMatches } from './utils/findMatches';

const SearchResultSchema = z.object({
  post: PostFrontMatterSchema,
  titleMatches: z.array(z.string()),
  summaryMatches: z.array(z.string()),
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');
  if (!query) {
    return new Response(JSON.stringify({ results: [] }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'private, no-cache, must-revalidate'
      },
    });
  }

  const results = [];
  const posts = await getAllPostsFrontmatter();
  for (const post of posts) {
    const { title, summary } = post.frontmatter;
    const titleHits = findMatches(query, title);
    const summaryHits = findMatches(query, summary);
    if (titleHits.length) {
      results.push({
        post,
        titleMatches: titleHits,
        summaryMatches: summaryHits,
      });
    }
  }
  z.array(SearchResultSchema).parse(results);
  return new Response(JSON.stringify({ results }), {
    status: 200,
    headers: { 
      'Content-Type': 'application/json',
      'Cache-Control': 'private, no-cache, must-revalidate'
    },
  });
}
