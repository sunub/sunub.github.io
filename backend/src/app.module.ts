import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { PostsModule } from "./posts/posts.module";
import { SearchModule } from "./search/search.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		PostsModule,
		SearchModule,
	],
	controllers: [AppController],
})
export class AppModule {}
