import { getLocalTagFiles, categorizePostByCategory } from "./Post.helper.js";

class Post {
	constructor() {
		this._localPostFilesData = getLocalTagFiles();
		this._categorizedFrontmatters = categorizePostByCategory(
			this._localPostFilesData
		);
		this._localPostContent = this.getLocalPostContent();
	}

	get allTagPost() {
		return this._localPostFilesData;
	}

	get contents() {
		return this._localPostContent;
	}

	get categories() {
		return Object.keys(this._localPostFilesData);
	}

	get frontmatters() {
		return this._categorizedFrontmatters;
	}

	getLocalPostContent() {
		const result = {};
		const localPostData = Object.entries(this._localPostFilesData);

		for (const [folder, data] of localPostData) {
			result[folder] = [];
			for (const info of data) {
				result[folder].push(info.content);
			}
		}

		return result;
	}

	getCategorizedPost(key) {
		return this._localPostFilesData[key];
	}
}

export default Post;