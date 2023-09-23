import { getLocalTagFiles, categorizePostByCategory } from "./Post.helper";
import { Files, Description, Tag, Contents, Category } from "type";

class Post {
	_localPostFilesData: Files;
	_categorizedFrontmatters: Map<Category, Description[]>;
	_localPostContents: Contents;
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

	getLocalPostContents(): Contents {
		const result: Contents = {};
		const localPostData = Object.entries(this._localPostFilesData);

		for (const [folder, data] of localPostData) {
			result[folder] = [];
			for (const info of data) {
				result[folder].push(info.content);
			}
		}

		return result;
	}

	getCategorizedPost(key: Tag) {
		return this._localPostFilesData[key];
	}
}

export default Post;
