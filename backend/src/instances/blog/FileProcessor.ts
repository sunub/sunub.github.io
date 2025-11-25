import { createReadStream } from "node:fs";
import { MatterTransform } from "./MatterTransform";
import type { MatterTransformData } from "./Schema";
import { Semaphore } from "./Semaphore";

function isMatterTransformData(obj: unknown): obj is MatterTransformData {
	return (
		typeof obj === "object" &&
		obj !== null &&
		"frontmatter" in obj &&
		"contentLength" in obj &&
		"hasContent" in obj &&
		"content" in obj &&
		typeof (obj as MatterTransformData).frontmatter === "object" &&
		typeof (obj as MatterTransformData).contentLength === "number" &&
		typeof (obj as MatterTransformData).hasContent === "boolean" &&
		typeof (obj as MatterTransformData).content === "string"
	);
}

export class FileProcessor {
	public count = 0;
	public totalBytes = 0;
	private semaphore: Semaphore;

	constructor(maxConcurrency: number = 50) {
		this.semaphore = new Semaphore(maxConcurrency);
	}

	async processFile(filePath: string): Promise<MatterTransformData | null> {
		await this.semaphore.acquire();

		try {
			const parser = new MatterTransform();
			const source = createReadStream(filePath, {
				highWaterMark: 8192,
			});

			const cleanup = () => {
				parser.removeAllListeners();
				source.removeAllListeners();

				if (!source.destroyed) {
					source.destroy();
				}

				if (!parser.destroyed) {
					parser.destroy();
				}
			};

			return new Promise<MatterTransformData | null>((resolve, reject) => {
				let processedData: MatterTransformData | null = null;

				parser.on("data", (data: MatterTransformData) => {
					if (isMatterTransformData(data)) {
						processedData = data;
					}
				});

				parser.on("end", () => {
					try {
						if (processedData) {
							this.count++;
							this.totalBytes += processedData.contentLength;
						}
						cleanup();
						resolve(processedData);
					} catch {
						console.error(`파일 처리 중 오류 발생: ${filePath}`);
						return null;
					} finally {
						this.semaphore.release();
					}
				});

				parser.on("error", (error) => {
					cleanup();
					reject(error);
				});

				source.on("error", (error) => {
					cleanup();
					reject(error);
				});

				source.pipe(parser);
			});
		} catch {
			// 파일 폴더가 존재하지 않음
			console.error(`파일을 읽는 중 오류 발생: ${filePath}`);
		} finally {
			this.semaphore.release();
		}
	}

	getResults() {
		return { count: this.count, totalBytes: this.totalBytes };
	}
}
