"use server";
import { parentPort, workerData } from "worker_threads";
import path from "path";
import { readdir, stat } from "fs/promises";
import { createReadStream } from "fs";
export const ROOT_BLOG_PATH = path.join(process.cwd(), "posts");
export const DAY_IN_SECONDS = 86400;
async function processFile(fullPath, file) {
    if (!parentPort)
        return;
    try {
        const slug = file.split(".")[0];
        const readStream = createReadStream(fullPath, { encoding: "utf-8" });
        for await (const chunk of readStream) {
            parentPort.postMessage({
                type: "data",
                slug,
                chunk,
            });
        }
        parentPort.postMessage({
            type: "fileComplete",
            slug,
        });
    }
    catch (error) {
        parentPort.postMessage({
            type: "error",
            message: `${file} 파일을 읽는 중 오류가 발생했습니다.`,
        });
    }
}
async function readDir(dirPath) {
    let files;
    try {
        files = await readdir(dirPath);
    }
    catch (error) {
        console.error(`${dirPath} 디렉토리를 읽는 중 오류가 발생했습니다: ${error.message}`);
        return;
    }
    for (const file of files) {
        const fullPath = path.join(dirPath, file);
        let fileStat;
        try {
            fileStat = await stat(fullPath);
        }
        catch (error) {
            parentPort?.postMessage({
                type: "error",
                message: `파일 상태 확인 실패: ${fullPath} - ${error.message}`,
            });
            continue;
        }
        if (fileStat.isDirectory()) {
            await readDir(fullPath);
        }
        else {
            await processFile(fullPath, file);
        }
    }
}
async function readFile(filePath, slug) {
    if (!parentPort)
        return;
    try {
        const readStream = createReadStream(filePath, { encoding: "utf-8" });
        for await (const chunk of readStream) {
            parentPort.postMessage({
                type: "data",
                chunk,
                slug,
            });
        }
        parentPort.postMessage({
            type: "fileComplete",
            slug,
        });
    }
    catch (error) {
        console.error(`파일을 읽는 중 오류가 발생했습니다: ${filePath}`);
        parentPort.postMessage({
            type: "error",
            message: `${filePath} 파일을 읽는 중 오류가 발생했습니다.`,
        });
    }
    finally {
        parentPort.postMessage({
            type: "done",
            content: workerData.tag,
        });
    }
}
export async function readFileProcess() {
    const rootDir = path.join(ROOT_BLOG_PATH, workerData.tag);
    parentPort?.on("message", (message) => {
        switch (message.type) {
            case "change":
                if (!message.content)
                    break;
                readFile(message.content, message.slug);
                break;
        }
    });
    return readDir(rootDir);
}
readFileProcess()
    .then(() => {
    parentPort?.postMessage({ type: "done", content: workerData.tag });
})
    .catch((error) => {
    parentPort?.postMessage({
        type: "error",
        content: error.message,
    });
});
//# sourceMappingURL=web.worker.js.map