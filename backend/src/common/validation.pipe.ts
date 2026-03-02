import {
	ArgumentMetadata,
	BadRequestException,
	Injectable,
	PipeTransform,
} from "@nestjs/common";
import type { ZodTypeAny } from "zod";

@Injectable()
export class ZodValidationPipe implements PipeTransform {
	constructor(private schema: ZodTypeAny) {}

	transform(value: unknown, _: ArgumentMetadata) {
		try {
			const parsedValue = this.schema.parse(value);
			return parsedValue;
		} catch (error) {
			const safeError = error instanceof Error ? error.message : String(error);
			console.error("Validation failed:", safeError);
			throw new BadRequestException("Validation failed");
		}
	}
}
