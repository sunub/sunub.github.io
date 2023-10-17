import { getLocalTagFiles, categorizePostByCategory } from "./Post.helper";

class Post {
	constructor() {
		this._localPostFilesData = getLocalTagFiles();
		this._categorizedFrontmatters = categorizePostByCategory(
			this._localPostFilesData
		);
		this._localPostContents = this.getLocalPostContents();
	}

	get allTagPost() {
		return this._localPostFilesData;
	}

	get contents() {
		return this._localPostContents;
	}

	get categories() {
		return Object.keys(this._localPostFilesData);
	}

	get frontMatters() {
		return this._categorizedFrontmatters;
	}

	getSpecificFrontmatter(category, slug) {
		const frontMatters = this.frontMatters[category] ?? [];

		for (const frontMatter of frontMatters) {
			if (frontMatter.slug === slug) {
				return frontMatter;
			}
		}
		throw new Error(
			`FrontMatter에서 ${slug}와 관련된 slug를 발견할 수 없습니다.`
		);
	}

	getLocalPostContents() {
		const result = {};
		const localPostData = Object.values(this._localPostFilesData);

		for (const data of localPostData) {
			for (const info of data) {
				const key = info.description.slug;
				result[key] = info.content;
			}
		}

		return result;
	}

	getCategorizedPost(key) {
		return this._localPostFilesData[key];
	}
}

export default Post;