export class AppError extends Error {
	public statusCode: number;
	public code: string;

	constructor(message: string, statusCode?: number, code?: string) {
		super(message);

		this.name = "AppError";
		this.statusCode = statusCode || 500;
		this.code = code || "INTERNAL_SERVER_ERROR";

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, AppError);
		}
	}
}

export class NotFoundError extends AppError {
	constructor(message: string = "해당 페이지를 찾을 수 없습니다.") {
		super(message, 404, "NOT_FOUND");

		this.name = "NotFoundError";
	}
}

export class InnerServerError extends AppError {
	constructor(message: string = "서버 내부 오류가 발생했습니다.") {
		super(message, 500, "INTERNAL_SERVER_ERROR");
		this.name = "InnerServerError";
	}
}
