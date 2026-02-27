import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
	@Get()
	getHello(): string {
		return "Health Check OK";
	}

	@Get("healthz")
	getHealthz(): { status: string; timestamp: number } {
		return {
			status: "ok",
			timestamp: Date.now(),
		};
	}
}
