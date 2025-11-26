import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const configService = app.get(ConfigService);
	const originString = configService.get<string>("CORS_ORIGIN") || "";
	const allowedOrigins = originString.split(",").map((url) => url.trim());

	app.enableCors({
		origin: allowedOrigins,
		credentials: true,
	});
	app.useGlobalPipes(new ValidationPipe());
	await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
