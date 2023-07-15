import { getLocalFiles, categorizePostByCategory } from "./Post.helper";

class Post {
	_localFiles: Files;
	_categorizedPost: Map<string, Description[]>;
	constructor() {
		this._localFiles = getLocalFiles();
		this._categorizedPost = categorizePostByCategory(this._localFiles);
	}

	get allPost() {
		return this._localFiles;
	}

	get categories() {
		return Object.keys(this._localFiles);
	}

	get categorizedPost() {
		return this._categorizedPost;
	}

	getCategorizedPost(key: Tag) {
		return this._localFiles[key];
	}
}

export default Post;
