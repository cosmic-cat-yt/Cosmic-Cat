import { CosmicCat } from "@/main";

export default class Subscriptions {
	cc: CosmicCat;
	
	constructor(cc: CosmicCat) {
		this.cc = cc;
	}

	async getChannelInfo() {
		try {
			let t = await fetch("https://www.youtube.com/feed/channels");
			return this.cc.Subscriptions.handleData(t.text(), 1);
		} catch(err) {
			console.error("[Subscriptions] Something went wrong with fetching subscriptions data:\n", err);
			return [];
		}
	}
	
	async getFeedInfo() {
		try {
			let t = await fetch("https://www.youtube.com/feed/subscriptions?flow=2");
			return this.cc.Subscriptions.handleData(t.text());
		} catch(err) {
			console.error("[Subscriptions] Something went wrong with fetching subscriptions data:\n", err);
			return [];
		}
	}
	
	handleData(a, b) {
		return a.then(n => {
			let p = JSON.parse(n.split("var ytInitialData = ")[1].split(";</script>")[0]).contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content;
			return p ? p.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].shelfRenderer.content.expandedShelfContentsRenderer.items : [];
		});
	}
}