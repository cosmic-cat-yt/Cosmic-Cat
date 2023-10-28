export default {
	Local: {
		Header: () => {
			let result = [];

			try {
				return document.cosmicCat.Utils.Sort.playlistData(ytInitialData.header.playlistHeaderRenderer);
			} catch(err) {
				console.error("[Playlists] Something went wrong with sorting playlist data:\n", err);
			}

			return result;
		},
		Videos: () => {
			let result = [];

			try {
				let contents = ytInitialData.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].playlistVideoListRenderer.contents;

				for (let i = 0; i < contents.length; i++) {
					if (!contents[i].continuationItemRenderer) {
						result[i] = document.cosmicCat.Utils.Sort.videoData(contents[i].playlistVideoRenderer);
					}
				}
			} catch(err) {
				console.error("[Playlists] Something went wrong with sorting video data:\n", err);
			}

			return result;
		}
	}
}