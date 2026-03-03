import { Controller, Get, Query } from "@nestjs/common";
import type { SearchResponse } from "@sunub/types";
import { SearchService } from "./search.service";

@Controller("api/search")
export class SearchController {
	constructor(private readonly searchService: SearchService) {}

	@Get()
	async search(@Query("query") query: string): Promise<SearchResponse> {
		const searchResults = await this.searchService.search(query);
		return { results: searchResults };
	}
}
