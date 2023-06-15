import fs from "fs";
import path from "path";

const fileHeader: FileHeader = {
  "01_w": "w",
  "02_a": "a",
  "03_js": "j",
  "04_ts": "t",
};

export function getFiles(): Files {
  let filePath = "posts/";
  const folders: Folders = fs.readdirSync(filePath, "utf-8");
  let postFileData: Files = {
    w: [],
    a: [],
    j: [],
    t: [],
  };
  for (const folder of folders) {
    const tag: Tag = fileHeader[folder];
    postFileData[tag] = readPostFiles(filePath + folder, []);
  }
  return postFileData;
}

function readPostFiles(folderPath: string, paths: string[]): string[] {
  const folders = fs.readdirSync(folderPath, "utf-8");

  for (const file of folders) {
    const filePath = path.join(folderPath, file);
    const extension = path.extname(filePath).toLowerCase();
    switch (extension) {
      case ".md":
        paths.push(filePath);
        break;
      case ".png":
        break;
    }
  }
  return paths;
}
