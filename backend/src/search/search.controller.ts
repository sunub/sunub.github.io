import { Controller, Get, Query } from "@nestjs/common";
import { SearchService } from "./search.service";
import type { SearchResponse } from "@sunub/types";

@Controller("api/search")
export class SearchController {
	constructor(private readonly searchService: SearchService) {}

	@Get()
	async search(@Query("query") query: string): Promise<SearchResponse> {
		const searchResults = await this.searchService.search(query);
		return { results: searchResults };
	}
}
