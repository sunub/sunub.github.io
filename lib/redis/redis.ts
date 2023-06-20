import { Client, Repository, Entity, Schema } from "redis-om";
const client = new Client();
const url =
  "redis://default:YdbkSrMUyxtEKTAQohUY7GMbaT8Oz5vT@redis-11746.c299.asia-northeast1-1.gce.cloud.redislabs.com:11746";
const input = {
  title: "HI",
  date: "2023-06-12",
  tags: "web",
  description: "World!",
  slug: "WHAT",
  content: "HA!",
};

class Blogpost extends Entity {}

const blogpostSchema = new Schema(
  Blogpost,
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

(async () => {
  if (!client.isOpen()) {
    await client.open(url);
  }

  const repository = client.fetchRepository(blogpostSchema);
  const id = repository.createAndSave(input);
  console.log(id);

  await client.close();
})();
