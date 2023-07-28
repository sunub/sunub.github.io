import { getLocalTagFiles, categorizePostByCategory } from "./Post.helper";

class Post {
	_localTagFiles: Files;
	_categorizedPost: Map<string, Description[]>;
	constructor() {
		this._localTagFiles = getLocalTagFiles();
		this._categorizedPost = categorizePostByCategory(this._localTagFiles);
	}

	get allTagPost() {
		return this._localTagFiles;
	}

	get categories() {
		return Object.keys(this._localTagFiles);
	}

	get categorizedPost() {
		return this._categorizedPost;
	}

	getCategorizedPost(key: Tag) {
		return this._localTagFiles[key];
	}
}

export default Post;
