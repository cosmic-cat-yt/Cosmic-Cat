import { CosmicCat } from "@/main";

export default class Search {
	cc: CosmicCat;
	
	constructor(cc: CosmicCat) {
		this.cc = cc;
	}

	abort() {
		this.cc.toggleElm("#comments-loading");
	}
	
	sortResults(params, am) {
		let result = {result: "", con: ""};
		for (let i = 0; i < params[0].itemSectionRenderer.contents.length; i++) {
			if (params[0].itemSectionRenderer.contents[i].videoRenderer) {
				let c = this.cc.Utils.Sort.videoData(params[0].itemSectionRenderer.contents[i].videoRenderer);
				result.result += this.cc.Template.Search.videoRender(c);
			}
		}

		const aaaa = document.querySelector("#next-btn");
		if (aaaa.classList.contains("hid")) {
			this.cc.toggleElm("#next-btn");
		}
		aaaa.setAttribute("data-token", params[1].continuationItemRenderer.continuationEndpoint.continuationCommand.token);
		result.con += `${params[1].continuationItemRenderer.continuationEndpoint.continuationCommand.token}`;

		return result;
	}
	
	async next(continuation, number) {
		if (!continuation) return this.cc.toggleElm("#next-btn");
		//this.cc.toggleElm("#loading");

		let api = await this.cc.Ajax.post("/youtubei/v1/search", `continuation: "${continuation}"`, "WEB", "2.20230331.00.00");
		if (!api) return this.abort();

		let sortedResultsArray = this.cc.Pagination.sortDataIntoArray(api.onResponseReceivedCommands);

		const comments = this.sortResults(sortedResultsArray);

		this.cc.Pagination.nextNumberButton(continuation, number, "Search");

		document.querySelector("#search-results").innerHTML = comments.result;
	}
}