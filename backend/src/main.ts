import { extname, relative } from "node:path";

import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { DEFAULT_BACKEND_API_URL } from "@sunub/contracts";
import chokidar, { type FSWatcher } from "chokidar";
import { AppModule } from "./app.module";
import { BlogService } from "./instances/blog/blog.service";

const parsePort = (value: string | undefined): number => {
	const defaultPort = Number(new URL(DEFAULT_BACKEND_API_URL).port);

	if (value === undefined) {
		return Number.isNaN(defaultPort) ? 3000 : defaultPort;
	}

	const parsed = Number.parseInt(value, 10);
	return Number.isNaN(parsed) ? defaultPort : parsed;
};

const POSTS_WATCH_DEBOUNCE_MS = 250;

const isDevelopmentMode = (): boolean =>
	process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "test";

const isWatchedPostFile = (filePath: string): boolean => {
	const extension = extname(filePath).toLowerCase();
	return extension === ".md" || extension === ".mdx";
};

const setupPostsWatcher = (blogService: BlogService): FSWatcher | null => {
	if (!isDevelopmentMode()) {
		return null;
	}

	const postsRootPath = blogService.getPostsRootPath();
	const indexFilePath = blogService.getIndexFilePath();
	let rebuildTimer: NodeJS.Timeout | null = null;
	let lastEventSummary = "posts update";

	const watcher = chokidar.watch(postsRootPath, {
		ignoreInitial: true,
		awaitWriteFinish: {
			stabilityThreshold: POSTS_WATCH_DEBOUNCE_MS,
			pollInterval: 50,
		},
	});

	const triggerRebuild = () => {
		rebuildTimer = null;
		void blogService
			.rebuildIndexAndReloadCache(lastEventSummary)
			.catch((error) => {
				blogService.logger.error(
					`posts watcher 재색인 중 오류가 발생했습니다. 사유: ${lastEventSummary}`,
					error instanceof Error ? error.stack : String(error),
				);
			});
	};

	const scheduleRebuild = (eventName: string, filePath: string) => {
		if (filePath === indexFilePath || !isWatchedPostFile(filePath)) {
			return;
		}

		lastEventSummary = `${eventName}: ${relative(postsRootPath, filePath)}`;
		blogService.logger.log(
			`posts 변경을 감지했습니다. 인덱스 갱신을 예약합니다: ${lastEventSummary}`,
		);

		if (rebuildTimer) {
			clearTimeout(rebuildTimer);
		}

		rebuildTimer = setTimeout(triggerRebuild, POSTS_WATCH_DEBOUNCE_MS);
	};

	const closeWatcher = async () => {
		if (rebuildTimer) {
			clearTimeout(rebuildTimer);
			rebuildTimer = null;
		}
		await watcher.close();
	};

	watcher.on("add", (filePath) => {
		scheduleRebuild("add", filePath);
	});
	watcher.on("change", (filePath) => {
		scheduleRebuild("change", filePath);
	});
	watcher.on("unlink", (filePath) => {
		scheduleRebuild("unlink", filePath);
	});
	watcher.on("error", (error) => {
		blogService.logger.error(
			"posts watcher에서 오류가 발생했습니다.",
			error instanceof Error ? error.stack : String(error),
		);
	});

	process.once("SIGINT", () => {
		void closeWatcher();
	});
	process.once("SIGTERM", () => {
		void closeWatcher();
	});

	blogService.logger.log(
		`개발 모드 posts watcher를 시작했습니다: ${postsRootPath}`,
	);
	return watcher;
};

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);
	const configService = app.get(ConfigService);
	const blogService = app.get(BlogService);
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

	await app.listen(parsePort(process.env.PORT));
	setupPostsWatcher(blogService);
}
bootstrap();
