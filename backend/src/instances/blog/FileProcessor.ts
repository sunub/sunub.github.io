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

    const parser = new MatterTransform();
    const source = createReadStream(filePath, { highWaterMark: 8192 });

    let processedData: MatterTransformData | null = null;
    let settled = false;

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

    const settle = (resolve: (value: MatterTransformData | null) => void, reject: (reason?: any) => void, error?: Error) => {
      if (settled) {
        return;
      }
      settled = true;
      cleanup();

      if (processedData) {
        this.count++;
        this.totalBytes += processedData.contentLength;
      }
      resolve(processedData);
    }

    try {
      return await new Promise<MatterTransformData | null>((resolve, reject) => {
        const onEnd = () => {
          settle(resolve, reject);
        }

        const onError = (error: unknown) => {
          if (settled) {
            return;
          }
          settled = true;
          cleanup();
          reject(error);
        }

        parser.on("data", (data: MatterTransformData) => {
          if (isMatterTransformData(data)) {
            processedData = data;
          }
        });

        parser.once("end", onEnd);
        parser.once("error", onError);
        source.once("error", onError);

        source.pipe(parser);
      });
    } catch (error) {
      console.error(`파일 처리 중 오류 발생: ${filePath} - ${error instanceof Error ? error.message : String(error)}`);
      return null;
    } finally {
      this.semaphore.release();
    }
  }

  getResults() {
    return { count: this.count, totalBytes: this.totalBytes };
  }
}

