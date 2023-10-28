export default {
	Suggestions: {
		load: async () => {
			let toggleElms = () => {
				document.cosmicCat.toggleElm("#watch-more-related-button");
				document.cosmicCat.toggleElm("#watch-more-related");
			};

			toggleElms();

			document.cosmicCat.Ajax.post("/youtubei/v1/next", `continuation: "${document.cosmicCat.data.tokenSlot1}"`, "WEB", "2.20230331.00.00").then(api => {
				let collection = api?.onResponseReceivedEndpoints?.[0]?.appendContinuationItemsAction?.continuationItems || [];

				for (let i = 0; i < collection.length; i++) {
					if (collection[i].compactVideoRenderer) {
						let videoData = document.cosmicCat.Utils.Sort.videoData(collection[i].compactVideoRenderer);
						document.cosmicCat.pageRenderer.add("#watch-related", document.cosmicCat.Template.Watch.Content.mainCon.sideBar.suggestedVideo(videoData));
					}
					if (collection[i].continuationItemRenderer) {
						document.cosmicCat.data.tokenSlot1 = collection[i].continuationItemRenderer.continuationEndpoint.continuationCommand.token;
					}
				}

				toggleElms();
			});
		}
	},
	actions: {
		like: (a, b) => {
			if (!document.cosmicCat.Utils.getCookie("SAPISID")) {
				return document.cosmicCat.watch.actions;
			}

			if (document.cosmicCat.watch.isVideoLiked()) {
				a.classList.remove("liked");
				document.cosmicCat.Ajax.post("/youtubei/v1/like/removelike", `target:{videoId: "${ytInitialPlayerResponse.videoDetails.videoId}"}`, "WEB", "2.20230331.00.00");
			} else {
				if (document.cosmicCat.watch.isVideoDisliked()) {
					document.querySelector("#watch-unlike").classList.remove("unliked");
				}
				a.classList.add("liked");
				document.cosmicCat.Ajax.post("/youtubei/v1/like/like", `target:{videoId: "${ytInitialPlayerResponse.videoDetails.videoId}"}`, "WEB", "2.20230331.00.00");
			}

			try {
				ytInitialData.contents.twoColumnWatchNextResults.results.results.contents[0].videoPrimaryInfoRenderer.videoActions.menuRenderer.topLevelButtons[0].segmentedLikeDislikeButtonRenderer.likeButton.toggleButtonRenderer.isToggled = ytInitialData.contents.twoColumnWatchNextResults.results.results.contents[0].videoPrimaryInfoRenderer.videoActions.menuRenderer.topLevelButtons[0].segmentedLikeDislikeButtonRenderer.likeButton.toggleButtonRenderer.isToggled ? false : true;
			} catch(err) {
				console.error("[Watch] Failed to un/like video:", err);
			}
		},
		unlike: (a, b) => {
			if (!document.cosmicCat.Utils.getCookie("SAPISID")) {
				return document.cosmicCat.watch.actions;
			}

			if (document.cosmicCat.watch.isVideoDisliked()) {
				a.classList.remove("unliked");
				document.cosmicCat.Ajax.post("/youtubei/v1/like/removelike", `target:{videoId: "${ytInitialPlayerResponse.videoDetails.videoId}"}`, "WEB", "2.20230331.00.00");
			} else {
				if (document.cosmicCat.watch.isVideoLiked()) {
					document.querySelector("#watch-like").classList.remove("liked");
				}
				a.classList.add("unliked");
				document.cosmicCat.Ajax.post("/youtubei/v1/like/dislike", `target:{videoId: "${ytInitialPlayerResponse.videoDetails.videoId}"}`, "WEB", "2.20230331.00.00");
			}

			try {
				ytInitialData.contents.twoColumnWatchNextResults.results.results.contents[0].videoPrimaryInfoRenderer.videoActions.menuRenderer.topLevelButtons[0].segmentedLikeDislikeButtonRenderer.dislikeButton.toggleButtonRenderer.isToggled = ytInitialData.contents.twoColumnWatchNextResults.results.results.contents[0].videoPrimaryInfoRenderer.videoActions.menuRenderer.topLevelButtons[0].segmentedLikeDislikeButtonRenderer.dislikeButton.toggleButtonRenderer.isToggled ? false : true;
			} catch(err) {
				console.error("[Watch] Failed to un/like video:", err);
			}
		},
		share: (a, b) => {
			document.querySelector("#watch-actions-area-container").classList.remove("hid");
			document.querySelector("#watch-actions-share").classList.remove("hid");
			// unfinished
			// document.cosmicCat.Animations.start("transitioning", document.querySelector("#watch-actions-area-container"));
			console.log(a);
		}
	},
	watch5: {
		handleLoadMoreRelated: () => document.cosmicCat.watch.Suggestions.load()
	},
	isOwner: () => {
		try {
			return ytInitialPlayerResponse?.videoDetails?.isOwnerViewing || false;
		} catch {
			return false;
		}
	},
	isVideoLiked: () => {
		return ytInitialData.contents?.twoColumnWatchNextResults?.results?.results?.contents?.[0]?.videoPrimaryInfoRenderer?.videoActions?.menuRenderer?.topLevelButtons?.[0]?.segmentedLikeDislikeButtonRenderer?.likeButton?.toggleButtonRenderer?.isToggled;
	},
	isVideoDisliked: () => {
		return ytInitialData.contents?.twoColumnWatchNextResults?.results?.results?.contents?.[0]?.videoPrimaryInfoRenderer?.videoActions?.menuRenderer?.topLevelButtons?.[1]?.segmentedLikeDislikeButtonRenderer?.dislikeButton?.toggleButtonRenderer?.isToggled;
	}
}