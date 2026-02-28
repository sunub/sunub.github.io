// MatterTransform.ts 예시
import { Transform, TransformCallback } from "node:stream";
import * as matter from "gray-matter";
import { FrontMatterSchema, MatterTransformData } from "@sunub/types";

export class MatterTransform extends Transform {
	private buffer: Buffer[] = [];

	constructor() {
		super({ objectMode: true }); // 객체 형태로 데이터를 내보내기 위함
	}

	_transform(chunk: Buffer, _: string, callback: TransformCallback) {
		this.buffer.push(chunk);
		callback();
	}

	_flush(callback: TransformCallback) {
		try {
			const fullContent = Buffer.concat(this.buffer).toString("utf-8");
			const parsed = matter(fullContent);

			const validatedFrontmatter = FrontMatterSchema.parse(parsed.data);

			const result: MatterTransformData = {
				frontmatter: validatedFrontmatter,
				content: parsed.content,
				contentLength: parsed.content.length,
				hasContent: parsed.content.length > 0,
			};

			this.push(result);
			callback();
		} catch (error) {
			callback(error as Error);
		}
	}
}
