import Blog from "./blog";
import * as v from "valibot";
import { sql } from "@vercel/postgres";

const RedirectsSchema = v.object({
  source: v.string([v.startsWith("/")]),
  destination: v.string([v.startsWith("/")]),
  permanent: v.boolean(),
});

const BlogSchema = v.object({
  metadata: v.object({
    title: v.string(),
    date: v.isoDate(),
    tags: v.string(),
    summary: v.string(),
    category: v.string(),
    slug: v.string(),
  }),
  slug: v.string(),
  content: v.string(),
  category: v.string(),
});

// (async () => {
//   const blog = new Blog();
//   const meatadata = blog.allPosts.map((post) => post.metadata);

//   const redirects = meatadata.map(({ category, slug }) => ({
//     source: `/${slug}`,
//     destination: `/${category}/${slug}`,
//     permanent: true,
//   }));

//   const vertifyRedirects = v.safeParse(v.array(RedirectsSchema), redirects);

//   if (vertifyRedirects.success) {
//     try {
//       for (const redirect of redirects) {
//         const { source, destination, permanent } = redirect;
//         await sql`
//           INSERT INTO redirects (source, destination, permanent)
//           VALUES (${source}, ${destination}, ${permanent});
//         `;
//       }

//       console.log("Redirects 데이터가 성공적으로 추가되었습니다.");
//     } catch (error) {
//       console.error("Redirects 데이터를 추가하는데 실패했습니다.");
//       console.error(error);
//     }
//   }
// })();

(async () => {
  const blog = new Blog();
  const post = blog.allPosts.shift();

  const vertifyBlog = v.safeParse(BlogSchema, post);

  if (vertifyBlog.success) {
    try {
      await sql`
        INSERT INTO blog (metadata, slug, content)
        VALUES (${JSON.stringify(post.metadata)}, ${post.slug}, ${post.content});
      `;
      console.log("Blog 데이터가 성공적으로 추가되었습니다.");
    } catch (error) {
      console.error("Blog 데이터를 추가하는데 실패했습니다.");
    }
  }
})();
