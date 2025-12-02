import { Controller, Get, Query } from "@nestjs/common";
import { SearchService } from "./search.service";

@Controller("api/search")
export class SearchController {
	constructor(private readonly searchService: SearchService) {}

	@Get()
	search(@Query("query") query: string) {
		return { results: this.searchService.search(query) };
	}
}
