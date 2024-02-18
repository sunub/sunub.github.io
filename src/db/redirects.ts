import Blog from "./blog";
import * as v from "valibot";
import { sql } from "@vercel/postgres";

const RedirectsSchema = v.object({
  source: v.string([v.startsWith("/")]),
  destination: v.string([v.startsWith("/")]),
  permanent: v.boolean(),
});

// (async () => {
//   const blog = Blog.data.blogpost;

//   try {
//     blog.forEach(async (post) => {
//       await sql`
//         INSERT INTO blog_contents (metadata, slug, content)
//         VALUES (${JSON.stringify(post.metadata)}, ${post.slug}, ${post.content});
//       `;
//     });
//     console.log("Blog content inserted");
//   } catch (error) {
//     console.error(error);
//   }
// })();

// //       await sql`
// //         INSERT INTO blog (metadata, slug, content)
// //         VALUES (${JSON.stringify(post.metadata)}, ${post.slug}, ${post.content});
// //       `;
