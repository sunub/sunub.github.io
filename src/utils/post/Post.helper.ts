import fs from "fs";
import { marked } from "marked";

export function categorizePostByCategory(
	files: Files
): Map<string, Description[]> {
	const all = [];
	const descriptions: Map<string, Description[]> = new Map();
	const categorizedPost = Object.entries(files);

	for (const [category, post] of categorizedPost) {
		const description = [];
		for (const data of post) {
			all.push(data.description);
			description.push(data.description);
		}
		descriptions.set(category, description);
	}
	all.sort((file1, file2) => {
		return (
			new Date(file2.date).getTime() -
			new Date(file1.date).getTime()
		)
	})
	descriptions.set("all", all);

	return descriptions;
}

export function getLocalTagFiles(): Files {
	const root = "posts/";
	const folders = fs.readdirSync(root, "utf-8");
	const files: Files | any = {};

	for (const name of folders) {
		const path = root + name;
		const fileData = readFiles(path, []);
		files[name] = fileData
	}

	return files;
}

function readFiles(path: string, structure: PostData[] | any): Files {
	const currPaths = fs.readdirSync(path, "utf-8");

	for (const currPath of currPaths) {
		const nextPath = `${path}/${currPath}`;
		const stat = fs.statSync(nextPath);

		if (stat.isFile() && nextPath.match(/\.(md)$/i)?.length) {
			structure.push(
				divideDescriptionAndContent(fs.readFileSync(nextPath, "utf-8"))
			);
		} else if (stat.isDirectory()) {
			readFiles(nextPath, structure);
		}
	}

	structure.sort((file1: PostData, file2: PostData) => {
		return (
			new Date(file2.description.date).getTime() -
			new Date(file1.description.date).getTime()
		);
	});

	return structure;
}

function divideDescriptionAndContent(text: string): PostData {
	const pattern = /---\n([\s\S]*?)\n---/;
	const match = text.match(pattern);

	const description: Description | any = {};

	if (match) {
		const extractedText = match[1];
		const lines = extractedText.split("\n");
		for (const line of lines) {
			const [key, value] = line.split(":").map((text) => text.trim());
			description[key] = value;
		}
	}
	const content = text.split("---").slice(2).join("").trim();

	return {
		description: description,
		content: convertContentToHtml(content),
	};
}

function convertContentToHtml(content: string) {
	let result = ``;

	const options = {
		mangle: false,
		headerIds: false,
	};
	marked.use(options);

	result = marked(content);
	return result;
}
