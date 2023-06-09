import { marked } from "marked";
import fs from "fs";
import path from "path";
import {
	Typescript,
	Javascript,
	Web,
	Algorithm,
} from "@/components/icon/Category";
import React from "react";

const fileHeader: FileHeader = {
	"01_w": "w",
	"02_a": "a",
	"03_js": "j",
	"04_ts": "t",
};
export async function getPost(): Promise<
	[Map<string, React.ReactNode>, Map<string, Description[]>]
> {
	const blogpost: Map<DescriptionKeys, Description[]> = new Map();
	const postFileData: Files = getFiles();
	const descriptions: Description[] = [];
	const categories = new Map<string, React.ReactNode>();

	for (const files of Object.values(postFileData)) {
		for (const file of files) {
			const [description, content]: [Description, string] =
				divideDescriptionAndContent(file);

			const category = description.category;
			const options = {
				mangle: false,
				headerIds: false,
			};
			marked.use(options);
			const html = marked(content);

			if (blogpost.has(category)) {
				const categoryDescriptions = blogpost.get(category) ?? [];
				blogpost.set(category, [...categoryDescriptions, description]);
			} else {
				blogpost.set(category, [description]);
			}

			description["content"] = html;
			descriptions.push(description);

			let icon: React.ReactNode;
			switch (description.category) {
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

			categories.has(description.category)
				? null
				: categories.set(description.category, icon);
		}

		blogpost.set("all", descriptions);
	}

	return [categories, blogpost];
}

export function getFiles(): Files {
	const filePath = "posts/";
	const folders: Folders = fs.readdirSync(filePath, "utf-8");
	const postFileData: Files = {};
	for (const folder of folders) {
		const tag: Tag = fileHeader[folder];
		postFileData[tag] = readPostFiles(filePath + folder, []);
	}
	return postFileData;
}

function readPostFiles(folderPath: string, paths: string[]): string[] {
	const folders = fs.readdirSync(folderPath, "utf-8");

	for (const file of folders) {
		const filePath = path.join(folderPath, file);
		const extension = path.extname(filePath).toLowerCase();
		if (extension === ".md") {
			const file = fs.readFileSync(filePath, "utf-8");
			paths.push(file);
		}
	}
	return paths;
}

export function findPostByCategoryAndSlug(
	category: string,
	slug: string,
	blogpost: Map<string, Description[]>
) {
	const currPost: Description[] = blogpost.get(category) ?? [];
	if (Array.isArray(currPost)) {
		const post = currPost.filter((post) => {
			if (slug === post.slug) {
				return post;
			}
		});
		return post;
	}
	return currPost;
}

function divideDescriptionAndContent(text: string): [Description, string] {
	const pattern = /---\n([\s\S]*?)\n---/;
	const match = text.match(pattern);

	const description: Description = {
		title: "",
		date: "",
		tags: "",
		description: "",
		category: "",
		slug: "",
		template: "",
		content: "",
	};
	if (match) {
		const extractedText = match[1];
		const lines = extractedText.split("\n");
		for (const line of lines) {
			const [key, value] = line.split(":").map((text) => text.trim());
			description[key] = value;
		}
	}

	const content = text.split("---").slice(2).join("").trim();

	return [description, content];
}
