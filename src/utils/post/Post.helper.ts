import fs from "fs";

async function getLocalFiles() {
	const root = "posts/";
	const folders: Folders = fs.readdirSync(root, "utf-8");
	const files: any = {};

	for (const name of folders) {
		const path = root + name;
		files[name] = readFiles(path, {});
	}
	console.log(files);
}

function readFiles(path: string, structure: any) {
	const currPaths = fs.readdirSync(path, "utf-8");

	for (const currPath of currPaths) {
		const nextPath = `${path}/${currPath}`;
		const isFile = fs.statSync(nextPath).isFile();

		if (isFile) {
			currPath.match(/\.(md)$/i)
				? (structure[currPath] = fs.readFileSync(nextPath, "utf-8"))
				: null;
		}
	}
	return structure;
}

// function getFileData (folderPath: string, paths: string[]) {
// }

getLocalFiles();
