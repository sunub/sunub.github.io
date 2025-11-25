import {
	ArgumentMetadata,
	BadRequestException,
	Injectable,
	PipeTransform,
} from "@nestjs/common";
import type { ZodError, ZodType } from "zod/v4";

@Injectable()
export class ZodValidationPipe implements PipeTransform {
	constructor(private schema: ZodType) {}

	transform(value: unknown, _: ArgumentMetadata) {
		try {
			const parsedValue = this.schema.parse(value);
			return parsedValue;
		} catch (error) {
			console.error("Validation error:", error as ZodError);
			throw new BadRequestException("Validation failed");
		}
	}
}
