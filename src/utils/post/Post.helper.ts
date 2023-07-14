import fs from "fs";
import { marked } from "marked";
import {
	Typescript,
	Javascript,
	Web,
	Algorithm,
} from "@/components/icon/Category";

export function getLocalFiles(): Files {
	const root = "posts/";
	const folders = fs.readdirSync(root, "utf-8");
	const files: Files | any = {};

	for (const name of folders) {
		const path = root + name;
		files[name] = readFiles(path, {});
	}

	return files;
}

function readFiles(path: string, structure: FileData | any): FileData {
	const currPaths = fs.readdirSync(path, "utf-8");

	for (const currPath of currPaths) {
		const nextPath = `${path}/${currPath}`;
		const stat = fs.statSync(nextPath);

		if (stat.isFile() && nextPath.match(/\.(md)$/i)?.length) {
			const key = currPath.replace(/\.(md)$/i, "");
			structure[key] = divideDescriptionAndContent(
				fs.readFileSync(nextPath, "utf-8")
			);
		} else if (stat.isDirectory()) {
			readFiles(nextPath, structure);
		}
	}
	return structure;
}

function divideDescriptionAndContent(text: string): FileData {
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
		icon: getCategoryIcon(description.category),
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

function getCategoryIcon(category: string) {
	let icon;

	switch (category) {
		case "web":
			icon = Web;
			break;
		case "algorithm":
			icon = Algorithm;
			break;
		case "typescript":
			icon = Typescript;
			break;
		case "javascript":
			icon = Javascript;
			break;
	}

	return icon;
}
