import { Client, Entity, Schema } from "redis-om";

const client = new Client();

async function connect() {
  if (!client.isOpen()) {
    await client.open(process.env.REDIS_URL);
  }
}

class BlogPost extends Entity {}
let blogPostSchema = new Schema(
  BlogPost,
  {
    title: { type: "string" },
    date: { type: "string" },
    tags: { type: "string" },
    description: { type: "string" },
    slug: { type: "string" },
    content: { type: "string" },
  },
  {
    dataStructure: "JSON",
  }
);

export async function createBlogPost(data: Description[]) {
  await connect();

  const blogpostRepo = client.fetchRepository(blogPostSchema);
  await blogpostRepo.createIndex();
  console.log(32);
  // for (const post of data) {
  //   const blogpost = blogpostRepo.createEntity(post);
  //   const id = await blogpostRepo.save(blogpost);
  // }
}
