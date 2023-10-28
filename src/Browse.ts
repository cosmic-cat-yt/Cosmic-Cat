export default class Browse {
	private cc: CosmicCat;
	
	constructor(cc: CosmicCat) {
		this.cc = cc;
	}

	_Data(data) {
		let result = [];

		try {
			let tab = data.contents.twoColumnBrowseResultsRenderer.tabs[0];
			let contents = tab.tabRenderer.content;

			try {
				contents = contents.richGridRenderer.contents;
			} catch {
				contents = contents.sectionListRenderer.contents;
			}

			let c = [];

			for (let i = 0; i < contents.length; i++) {
				let b_a = contents[i].itemSectionRenderer?.contents?.[0] || contents[i].richItemRenderer || {};
				let b_b = b_a.shelfRenderer?.content?.gridRenderer?.items || b_a.shelfRenderer?.content?.expandedShelfContentsRenderer?.items || b_a.shelfRenderer?.content?.horizontalListRenderer?.items || b_a.horizontalCardListRenderer?.cards;
				if (b_b) {
					for (let i_ = 0; i_ < b_b.length; i_++) {
						if (b_b[i_].gridVideoRenderer || b_b[i_].videoRenderer || b_b[i_].videoCardRenderer) {
							c.push(b_b[i_].gridVideoRenderer || b_b[i_].videoRenderer || b_b[i_].videoCardRenderer);
						}
					}
				}
				if (b_a.content && b_a.content.videoRenderer) {
					c.push(b_a.content.videoRenderer);
				}
			}

			for (let i = 0; i < c.length; i++) {
				if(i < 4) {
					result[i] = this.cc.Utils.Sort.videoData(c[i]);
				}
			}
		} catch(err) {
			console.error(err);
		}

		return result;
	}
}