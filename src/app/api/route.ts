import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const folderNode = new FolderNode();
  let filePath = "post/";
  const folders = fs.readdirSync(filePath, "utf-8");
  for (const folder of folders) {
    let paths: string[] = [folder];
    const filepath = readPostFiles(filePath + folder, paths);
    folderNode.insert(filepath);
  }

  return new Response(JSON.stringify(folderNode.tree), { status: 200 });
}
export function POST() {}

function readPostFiles(folderPath: string, paths: string[]): string[] | any {
  const folders = fs.readdirSync(folderPath, "utf-8");

  for (const curFolder of folders) {
    paths.push(curFolder);
    folderPath = path.join(folderPath, curFolder);
    const fileStats = fs.statSync(folderPath);

    let containFolders = fileStats.isDirectory();
    let containFiles = fileStats.isFile();

    if (containFolders) {
      return readPostFiles(folderPath, paths);
    } else if (containFiles) {
      return paths;
    }
  }
}

class Folder {
  empty: boolean;
  data: Map<string, Folder>;
  constructor() {
    this.empty = false;
    this.data = new Map();
  }
}

class FolderNode {
  dirInfo: Folder;
  tree: object | any;
  index: number;

  constructor() {
    this.dirInfo = new Folder();
    this.tree = {};
    this.index = 0;
  }

  insert(curDir: string[]) {
    let dirInfo = this.dirInfo;
    this.tree[this.index] = {};
    let treeInfo = this.tree[this.index];
    let i = 0;
    for (const folder of curDir) {
      if (!dirInfo.data.has(folder)) {
        dirInfo.data.set(folder, new Folder());
      }
      dirInfo = dirInfo.data.get(folder)!;
      treeInfo[i] = folder;
      i += 1;
    }
    dirInfo.empty = true;
    this.index += 1;
  }
}
