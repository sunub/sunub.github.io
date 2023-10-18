import fs from "fs";
import { marked } from "marked";
import { POST_ROOT_PATH } from "./Post.constant";

export function categorizePostByCategory(files) {
	const all = [];
	const descriptions = {};
	const categorizedPost = Object.entries(files);

	for (const [category, post] of categorizedPost) {
		const description = [];
		for (const data of post) {
			all.push(data.description);
			description.push(data.description);
		}
		descriptions[category] = description;
	}
	all.sort((file1, file2) => {
		return new Date(file2.date).getTime() - new Date(file1.date).getTime();
	});
	descriptions["all"] = all;

	return descriptions;
}
export function getLocalTagFiles() {
	const root = POST_ROOT_PATH;
	const folders = fs.readdirSync(root, "utf-8");
	const files = {};

	for (const name of folders) {
		const path = `${root}/${name}`;
		const fileData = readFiles(path, []);
		files[name] = fileData;
	}

	return files;
}

function readFiles(path, structure) {
	const currPaths = fs.readdirSync(path, "utf-8");

	for (const currPath of currPaths) {
		const nextPath = `${path}/${currPath}`;
		const stat = fs.statSync(nextPath);

		if (stat.isFile() && nextPath.match(/\.md|mdx$/i)?.length) {
			structure.push(
				divideDescriptionAndContent(fs.readFileSync(nextPath, "utf-8"))
			);
		} else if (stat.isDirectory()) {
			readFiles(nextPath, structure);
		}
	}

	structure.sort((file1, file2) => {
		return (
			new Date(file2.description.date).getTime() -
			new Date(file1.description.date).getTime()
		);
	});

	return structure;
}

function divideDescriptionAndContent(text) {
	const pattern = /---\n([\s\S]*?)\n---/;
	const match = text.match(pattern);

	const description = {};

	if (match) {
		const extractedText = match[1];
		const lines = extractedText.split("\n");
		for (const line of lines) {
			const [key, value] = line.split(":").map((text) => text.trim());
			description[key] = value;
		}
	}
	// const content = text.split("---").slice(2).join("").trim();

	return {
		description: description,
		content: text,
	};
}

function convertContentToHtml(content) {
	let result = ``;

	const options = {
		mangle: false,
		headerIds: false,
	};
	marked.use(options);

	result = marked(content);
	return result;
}
