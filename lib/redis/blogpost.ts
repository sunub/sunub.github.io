import { Entity, Schema } from "redis-om";

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
