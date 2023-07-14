import { getLocalFiles } from "./Post.helper";

class Post {
	localFiles: Files;
	constructor() {
		this.localFiles = getLocalFiles();
	}

	get allPost() {
		return this.localFiles;
	}

	getCategorizedPost(key: Tag) {
		return this.localFiles[key];
	}
}

export default Post;
