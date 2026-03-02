import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module";
import { DEFAULT_BACKEND_API_URL } from "@sunub/contracts";

const parsePort = (value: string | undefined): number => {
	const defaultPort = Number(new URL(DEFAULT_BACKEND_API_URL).port);

	if (value === undefined) {
		return Number.isNaN(defaultPort) ? 3000 : defaultPort;
	}

	const parsed = Number.parseInt(value, 10);
	return Number.isNaN(parsed) ? defaultPort : parsed;
};

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);
	const configService = app.get(ConfigService);
	const originString =
		configService.get<string>("CORS_ORIGIN") ||
		configService.get<string>("CORS_ORIGINS") ||
		"";
	const allowedOrigins = originString
		.split(",")
		.map((url) => url.trim())
		.filter(Boolean);
	const fallbackOrigins = [
		`http://localhost:3000`,
		`http://localhost:4004`,
		`http://127.0.0.1:3000`,
		`http://127.0.0.1:4004`,
	];
	const corsOrigins = allowedOrigins.length ? allowedOrigins : fallbackOrigins;

	app.set("trust proxy", 1);

	app.enableCors({
		origin: corsOrigins,
		credentials: true,
	});
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
		}),
	);
	await app.listen(parsePort(process.env.PORT));
}
bootstrap();
