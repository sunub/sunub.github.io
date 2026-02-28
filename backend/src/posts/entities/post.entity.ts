import { PostCategory, Tag } from "@sunub/types";

export class PostEntity {
	title: string;
	date: Date | string;
	tags: Tag[];
	summary: string;
	slug: string;
	category: PostCategory;
	completed: boolean;
	filePath: string;
	content?: string;

	constructor(partial: Partial<PostEntity>) {
		Object.assign(this, partial);
	}
}
