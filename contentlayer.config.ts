import { defineDocumentType, makeSource } from "contentlayer/source-files";

const fieldTypes: any = {
  title: {
    type: "string",
    description: "The title of the post",
    required: true,
  },
  date: {
    type: "date",
    description: "The date of the post",
    required: true,
  },
  tags: {
    type: "string",
    description: "The tags of the post",
    required: true,
  },
  summary: {
    type: "string",
    description: "The summary of the post",
    required: true,
  },
  category: {
    type: "string",
    description: "The category of the post",
    required: true,
  },
  slug: {
    type: "string",
    description: "The slug of the post",
    required: true,
  },
  completed: {
    type: "boolean",
    description: "The status of the post",
    required: true,
  },
};

export const AlgorithmPost = defineDocumentType(() => ({
  name: "AlgorithmPost",
  filePathPattern: "./algorithm/**/*.mdx",
  contentType: "mdx",
  fields: {
    ...fieldTypes,
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => `./algorithm/${doc._raw.flattenedPath}`,
    },
  },
}));

export const CodePost = defineDocumentType(() => ({
  name: "CodePost",
  filePathPattern: "./code/**/*.mdx",
  contentType: "mdx",
  fields: {
    ...fieldTypes,
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => `./code/${doc._raw.flattenedPath}`,
    },
  },
}));

export const WebPost = defineDocumentType(() => ({
  name: "WebPost",
  filePathPattern: "./web/**/*.mdx",
  contentType: "mdx",
  fields: {
    ...fieldTypes,
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => `./web/${doc._raw.flattenedPath}`,
    },
  },
}));

export const CSPost = defineDocumentType(() => ({
  name: "CSPost",
  filePathPattern: "./cs/**/*.mdx",
  contentType: "mdx",
  fields: {
    ...fieldTypes,
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => `./cs/${doc._raw.flattenedPath}`,
    },
  },
}));

export default makeSource({
  contentDirPath: "posts",
  documentTypes: [AlgorithmPost, CodePost, WebPost, CSPost],
});
