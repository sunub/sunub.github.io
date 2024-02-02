// import fs from "fs";
// import path from "path";

// function parseFrontmatter(fileContent) {
//   let frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
//   let match = frontmatterRegex.exec(fileContent);
//   let frontMatterBlock = match[1];
//   let content = fileContent.replace(frontmatterRegex, "").trim();
//   let frontMatterLines = frontMatterBlock.split("\n");
//   let metadata = {
//     title: "",
//     date: "",
//     tags: [],
//     summary: "",
//     category: "",
//     slug: "",
//   };

//   frontMatterLines.forEach((line) => {
//     let [key, ...valueArr] = line.split(":");
//     let value = valueArr.join(": ").trim();
//     value = value.replace(/^['"](.*)['"]$/, "$1"); // Remove quotes
//     metadata[key.trim()] = value;
//   });

//   return { metadata, content };
// }

// function readMDXFile(filePath) {
//   let rawContent = fs.readFileSync(filePath, "utf8");
//   return parseFrontmatter(rawContent);
// }

// function browseMDXFiles(dir, fileList = []) {
//   const files = fs.readdirSync(dir);

//   files.forEach((file) => {
//     const filePath = path.join(dir, file);
//     const stat = fs.statSync(filePath);

//     if (stat.isDirectory()) {
//       fileList = browseMDXFiles(filePath, fileList);
//     } else if (path.extname(file) === ".mdx") {
//       fileList.push(filePath);
//     }
//   });

//   return fileList;
// }

// function getMDXFiles(dir) {
//   const files = fs.readdirSync(dir);

//   const MDXFilePaths = new Map();
//   files.forEach((file) => {
//     const mdxFiles = browseMDXFiles(path.join(dir, file));
//     MDXFilePaths.set(file, mdxFiles);
//   });

//   return MDXFilePaths;
// }

// function getMDXData(dir) {
//   let mdxFilesPath = getMDXFiles(dir);

//   const MDXFileList = [];
//   mdxFilesPath.forEach((files, _) => {
//     let mdxFiles = {};
//     files.forEach((file) => {
//       let { metadata, content } = readMDXFile(file);
//       const { slug } = metadata;
//       mdxFiles = {
//         metadata,
//         content,
//         slug,
//       };
//       MDXFileList.push(mdxFiles);
//     });
//   });
//   return MDXFileList;
// }

// function getBlogPost() {
//   return getMDXData(path.join(process.cwd(), "posts"));
// }

// class Blog {
//   constructor() {
//     this.posts = this.sortByDate();
//   }

//   sortByDate() {
//     const posts = getBlogPost();
//     const sortedPosts = posts.sort((a, b) => {
//       return (
//         new Date(b.metadata.date).getTime() -
//         new Date(a.metadata.date).getTime()
//       );
//     });
//     return sortedPosts;
//   }

//   get allPosts() {
//     return [...this.posts];
//   }

//   getPostBySlug(slug) {
//     return this.posts.get(slug);
//   }
// }

// export default Blog;

function slugify(str) {
  return str.toString().trim().replace(/\ /g, "-");
}

console.log(slugify("애니메이션을 위해 알아야 할 것들"));
