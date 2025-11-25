import { PostCategory } from "../../instances/blog/Schema";

export class PostEntity {
	title: string;
	date: Date | string;
	tags: string[];
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
