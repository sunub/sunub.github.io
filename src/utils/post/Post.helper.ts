import fs from "fs";
import { FolderName } from "./Post.constants";

async function getLocalFiles() {
	const filePath = "posts/";
	const rootFolders: Folders = fs.readdirSync(filePath, "utf-8");

	console.log(rootFolders);
}

// function getFileData (folderPath: string, paths: string[]) {
// }

getLocalFiles();
