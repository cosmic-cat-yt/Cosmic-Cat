export default {
	Feed: {
		load: (params) => {
			document.querySelector(".selected").classList.remove("selected");
			params.classList.add("selected");
			document.querySelector(".feed-header-info").innerText = params.dataset.feedDisplay;

			document.querySelector("#feed-error:not(.hid)")?.classList?.add("hid");
			document.querySelector(".feed-header:not(.hid)")?.classList?.add("hid");
			document.querySelector("#feed-main-youtube:not(.hid)")?.classList?.add("hid");

			document.querySelector(".context-data-container").innerHTML = "";

			document.cosmicCat.toggleElm("#feed-loading-template");

			document.cosmicCat.Ajax.Fetch(params.dataset.feedUrl, document.cosmicCat.Home.Feed.newFeed);
		},
		newFeed: async (ytData, a) => {
			console.debug(ytData);
			try {
				let tabs = ytData.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content;
				let contents = tabs.richGridRenderer || tabs.sectionListRenderer;

				try {
					for (let i = 0; i < contents.contents.length; i++) {
						if (!contents.contents[i].continuationItemRenderer) {
							var thisItem = "";

							if (contents.contents[i].richItemRenderer && contents.contents[i].richItemRenderer.content.videoRenderer) {
								thisItem = document.cosmicCat.Template.Homepage.Feed.Main(
									document.cosmicCat.Utils.Sort.videoData(
										contents.contents[i].richItemRenderer.content.videoRenderer
									)
								);
							}

							if (contents.contents[i].itemSectionRenderer && contents.contents[i].itemSectionRenderer.contents[0].shelfRenderer.content.expandedShelfContentsRenderer.items[0].videoRenderer) {
								thisItem = document.cosmicCat.Template.Homepage.Feed.Main(
									document.cosmicCat.Utils.Sort.videoData(
										contents.contents[i].itemSectionRenderer.contents[0].shelfRenderer.content.expandedShelfContentsRenderer.items[0].videoRenderer
									)
								);
							}

							document.cosmicCat.pageRenderer.add(".context-data-container", thisItem);
						}
					}

					document.cosmicCat.Home.Feed.complete();
				} catch(err) {
					console.error("[Home Feed] Failed to parse feed data:\n", err);
					document.cosmicCat.Home.Feed.error();
				}
			} catch(err) {
				console.error("[Home Feed] Failed to parse YouTube data:\n", err);
				document.cosmicCat.Home.Feed.error();
			}
		},
		complete: () => {
			document.cosmicCat.toggleElm("#feed-loading-template");
			document.cosmicCat.toggleElm(".feed-header");
			document.cosmicCat.toggleElm("#feed-main-youtube");
		},
		error: () => {
			document.querySelector("#feed-main-youtube:not(.hid)")?.classList?.add("hid");
			document.cosmicCat.toggleElm("#feed-loading-template");
			document.cosmicCat.toggleElm("#feed-error");
		}
	}
}