export default {
	Channels3: {
		Pagination: {
			load: async function () {
				document.getElementsByClassName("channels-browse-gutter-padding")[2].innerHTML = document.cosmicCat.Template.Channel.Channels3.primaryPane.browseVideos.Navigation();

				try {
					document.querySelector("#next-btn").setAttribute("data-token", document.cosmicCat.Utils.browseTabs.content(document.cosmicCat.Utils.browseTabs.find(ytInitialData, "videos")).find(a => a.continuationItemRenderer).continuationItemRenderer.continuationEndpoint.continuationCommand.token);
				} catch(e) {
					console.error("[Channels] Pagination request failed:\n", e);
				}
			},
			next: async function (continuation, number) {
				if (!continuation) return document.cosmicCat.toggleElm("#next-btn");

				let api = await document.cosmicCat.Ajax.post("/youtubei/v1/browse", `continuation: "${continuation}"`, "WEB", "2.20230331.00.00");
				if (!api) return this.abort();

				let sortedResultsArray = document.cosmicCat.Pagination.sortDataIntoArray(api.onResponseReceivedActions);

				const comments = this.sortResults(sortedResultsArray);

				document.cosmicCat.Pagination.nextNumberButton(continuation, number, "Channels.Channels3.Pagination");

				document.querySelector(".channels-browse-content-grid").innerHTML = comments.result;
			},
			sortResults: function (params, am) {
				let result = {result: "", con: ""};
				for (let i = 0; i < params.length; i++) {
					if (params[i].richItemRenderer?.content?.videoRenderer) {
						let c = document.cosmicCat.Utils.Sort.videoData(params[i].richItemRenderer.content.videoRenderer);
						result.result += document.cosmicCat.Template.Channel.Channels3.primaryPane.browseVideos.listItem.videos(c);
					}
				}

				const aaaa = document.querySelector("#next-btn");
				if (aaaa.classList.contains("hid")) {
					document.cosmicCat.toggleElm("#next-btn");
				}
				aaaa.setAttribute("data-token", params.find(a => a.continuationItemRenderer).continuationItemRenderer.continuationEndpoint.continuationCommand.token);
				result.con += `${params.find(a => a.continuationItemRenderer).continuationItemRenderer.continuationEndpoint.continuationCommand.token}`;

				return result;
			}
		}
	},
	Channels2: {},
	getChannelID: (a) => {
		return a.split("UC")[1];
	},
	playnav: {
		selectTab: async (a, b) => {
			let channel = window.location.pathname.split("/")[2];

			document.querySelector("#playnav-play-loading").style.display = "block";
			document.querySelector(".navbar-tab-selected").classList.remove("navbar-tab-selected");
			b.classList.add("navbar-tab-selected");

			window.location.hash = "#p/" + (a == "playlists" ? "p" : "u");

			let data = await document.cosmicCat.Ajax.Fetch(`https://www.youtube.com${window.location.pathname.split("/").slice(0, -1).join("/")}/${a}`, document.cosmicCat.Channels._Data[a.charAt(0).toUpperCase() + a.slice(1)]);
			document.cosmicCat.pageRenderer.set("#playnav-play-content", document.cosmicCat.Template.Channel.Channels2.playlistNavigator.Content.PlayPanel.Holder.Main());

			for (let i = 0; i < data.length; i++) {
				document.cosmicCat.pageRenderer.add(".scrollbox-page", document.cosmicCat.Template.Channel.Channels2.playlistNavigator.Content.PlayPanel.Holder[a](data[i]));
			}

			document.querySelector("#playnav-play-loading").style.display = "none";
		},
		like: (a, b) => {
			alert("Hello world.");
		},
		toggleFullVideoDescription: (a) => {
			var b = document.querySelector("#playnav-curvideo-description-more-holder"),
				c = document.querySelector("#playnav-curvideo-description-less"),
				d = document.querySelector("#playnav-curvideo-description-container");

			(a === true) &&
				((b.style.display = "none"),
				(c.style.display = "inline"),
				(d.style.height = "auto" )) ||
				((b.style.display = "inline"),
				(c.style.display = "none"),
				(d.style.height = "56px"))
		}
	},
	isChannelsPage: () => {
		return (window.location.pathname.split("/")[1].match(/channel|user/i) || (window.location.pathname.substr(1, 2) === "c/") || document.cosmicCat.Channels.isUsertag()) ? true : false;
	},
	checkIfSubscribed: () => {
		try {
			if(document.cosmicCat.Channels.isChannelsPage()) {
				return ytInitialData.header.c4TabbedHeaderRenderer?.subscribeButton?.subscribeButtonRenderer?.subscribed || ytInitialData.header.carouselHeaderRenderer?.contents?.find(a => a.topicChannelDetailsRenderer)?.topicChannelDetailsRenderer?.subscribeButton?.subscribeButtonRenderer?.subscribed || false;
			}
			if(window.location.pathname.split("/")[1].match(/watch/i)) {
				return ytInitialData.contents.twoColumnWatchNextResults.results?.results?.contents?.find(a => a.videoSecondaryInfoRenderer)?.videoSecondaryInfoRenderer?.subscribeButton?.subscribeButtonRenderer?.subscribed;
			}
		} catch(err) {
			console.error("[Channels] Something went wrong with executing \"checkIfSubscribed()\":\n", err);
			return false;
		}
	},
	toggleSubscribe: () => {
		try {
			if(document.cosmicCat.Channels.isChannelsPage()) {
				try {
					console.debug(ytInitialData.header.c4TabbedHeaderRenderer.subscribeButton);
					ytInitialData.header.c4TabbedHeaderRenderer.subscribeButton.subscribeButtonRenderer.subscribed = ytInitialData.header.c4TabbedHeaderRenderer.subscribeButton.subscribeButtonRenderer.subscribed ? false : true;
				} catch {
					try {
						ytInitialData.header.carouselHeaderRenderer.contents.find(a => a.topicChannelDetailsRenderer).topicChannelDetailsRenderer.subscribeButton.subscribeButtonRenderer.subscribed = ytInitialData.header.carouselHeaderRenderer.contents.find(a => a.topicChannelDetailsRenderer).topicChannelDetailsRenderer.subscribeButton.subscribeButtonRenderer.subscribed ? false : true;
					} catch(err) {
						console.error("[toggleSubscribe]:", err);
					}
				}
			}
			if(window.location.pathname.split("/")[1].match(/watch/i)) {
				console.debug(ytInitialData.contents.twoColumnWatchNextResults.results.results.contents.find(a => a.videoSecondaryInfoRenderer).videoSecondaryInfoRenderer.subscribeButton);
				ytInitialData.contents.twoColumnWatchNextResults.results.results.contents.find(a => a.videoSecondaryInfoRenderer).videoSecondaryInfoRenderer.subscribeButton.subscribeButtonRenderer.subscribed = ytInitialData.contents.twoColumnWatchNextResults.results.results.contents.find(a => a.videoSecondaryInfoRenderer).videoSecondaryInfoRenderer.subscribeButton.subscribeButtonRenderer.subscribed ? false : true;
			}
		} catch(err) {
			console.error("[Channels] Something went wrong with executing \"toggleSubscribe()\":\n", err);
		}
	},
	isUsertag: () => {
		return (window.location.pathname.substring(1, 2) === "@");
	},
	getCurrentChannelTab: () => {
		let mode = document.cosmicCat.Storage.get("channel_mode").value;
		switch (mode) {
			case "1":
			case "3":
				mode = window.location.search.substr(1, 5) === "query" ? "search" : window.location.pathname.split("/")[document.cosmicCat.Channels.isUsertag() ? 2 : 3];
				break;
			case "2":
				mode = window.location.hash.length > 1 && window.location.hash.slice(1).split("/")[1] == "p" ? "playlists" : "videos" || window.location.pathname.split("/")[3];
		}
		return mode;
	},
	getNaviHash: () => { return (document.cosmicCat.Channels.getCurrentChannelTab() == "playlists" ? "p" : "u"); },
	isCurrentChannelTab: (params) => {
		return (document.cosmicCat.Channels.getCurrentChannelTab() == params);
	},
	customTags: (data) => {
		if (!data) return [];
		let tags = [];
		let TAGS = data.matchAll(/\[\+\w\+="(\d+|.+)"]/g);
		data = data.replace(/\[\+\w\+="(\d+|.+)"]/g, "");
		for (const tag of TAGS) {
			if(tag[0].split(/\+/g)[1] == "a" && tag[0].match(/"\d+"/g) && tag[0].split(/"/g)[1] < 101) {
				tags.push({name: "Age", value: tag[0].split(/"/g)[1]});
			}
			if(tag[0].split(/\+/g)[1] == "o" && tag[0].match(/"\w+/g)) {
				tags.push({name: "Occupation", value: tag[0].split(/"/g)[1]});
			}
		}

		return tags;
	},
	isOwner: (data) => {
		try {
			return (ytInitialData?.header?.c4TabbedHeaderRenderer?.editChannelButtons) ? true : false;
		} catch(err) {
			console.error("[Channels] Something went wrong with executing \"isOwner()\":\n", err);
			return false;
		}
	},
	load2Modules: (data) => {
		document.cosmicCat.pageRenderer.add("#main-channel-left", document.cosmicCat.Template.Channel.Channels2.moduleContainer.profile(data));
		document.cosmicCat.pageRenderer.add("#main-channel-left", document.cosmicCat.Template.Channel.Channels2.moduleContainer.userInfo(data));
	},
	Local: {
		Header: () => {
			try {
				return document.cosmicCat.Utils.Sort.channelData(ytInitialData.header?.c4TabbedHeaderRenderer || ytInitialData.header?.carouselHeaderRenderer?.contents?.[0]?.topicChannelDetailsRenderer || ytInitialData.header?.carouselHeaderRenderer?.contents?.[1]?.topicChannelDetailsRenderer || ytInitialData.header?.interactiveTabbedHeaderRenderer);
			} catch(err) {
				console.error("[Channels] Something went wrong with sorting channel data:\n", err);
			}
		},
		SearchResults: () => {
			if (window.location.search.substr(1, 5) !== "query") return false;

			return document.cosmicCat.Channels._Data.SearchResults(ytInitialData);
		},
		Videos: () => {
			if (document.cosmicCat.Channels.getCurrentChannelTab() !== "videos") return false;

			return document.cosmicCat.Channels._Data.Videos(ytInitialData);
		},
		Playlists: () => {
			if (document.cosmicCat.Channels.getCurrentChannelTab() !== "playlists") return false;

			return document.cosmicCat.Channels._Data.Playlists(ytInitialData);
		},
		Community: () => {
			if (document.cosmicCat.Channels.getCurrentChannelTab() !== "community") return [];

			return document.cosmicCat.Channels._Data.Community(ytInitialData);
		}
	},
	_Data: {
		SearchResults: (data) => {
			let result = [];

			try {
				let tab = data.contents.twoColumnBrowseResultsRenderer.tabs.find(a => a.expandableTabRenderer).expandableTabRenderer.content;
				let contents = document.cosmicCat.Utils.browseTabs.content(tab);

				console.log(contents)

				if (!contents) throw Error();

				for (let i = 0; i < contents.length; i++) {
					if (!contents[i].continuationItemRenderer) {
						result[i] = document.cosmicCat.Utils.Sort.videoData(contents[i].itemSectionRenderer.contents[0].videoRenderer);
					}
				}
			} catch(err) {
				console.error("[Channels] Something went wrong with sorting channel search results:\n", err);
			}

			return result;
		},
		Videos: (data) => {
			let result = [];

			try {
				let tab = document.cosmicCat.Utils.browseTabs.find(data, "videos");
				let contents = document.cosmicCat.Utils.browseTabs.content(tab);

				if (!contents) throw Error();

				for (let i = 0; i < contents.length; i++) {
					if (!contents[i].continuationItemRenderer) {
						result[i] = document.cosmicCat.Utils.Sort.videoData(contents[i].richItemRenderer.content.videoRenderer);
					}
				}
			} catch(err) {
				console.error("[Channels] Something went wrong with sorting channel videos:\n", err);
			}

			return result;
		},
		Playlists: (data) => {
			let result = [];

			try {
				let tab = document.cosmicCat.Utils.browseTabs.find(data, "playlists");
				let content = document.cosmicCat.Utils.browseTabs.content(tab),
					contents = [];

				for (const i in content) {
					try {
						contents.push(content[i].shelfRenderer.content.horizontalListRenderer.items);
					} catch {
						try {
							contents.push(content[i].gridRenderer.items);
						} catch {
							try {
								contents.push(content[i].itemSectionRenderer.contents[0].shelfRenderer.content.horizontalListRenderer.items);
							} catch {
								try {
									contents.push(content[i].itemSectionRenderer.contents[0].gridRenderer.items);
								} catch {
									try {
										contents.push(content[i].itemSectionRenderer.contents[0].shelfRenderer.content.expandedShelfContentsRenderer.items);
									} catch {
										console.log(content[i]);
										throw Error("No playlists were found.");
									}
								}
							}
						}
					}
				};

				if (!contents) throw Error();

				try {
					contents = [...contents[0], ...contents[1]];
				} catch {
					contents = [...contents[0]];
				}

				for (let i = 0; i < contents.length; i++) {
					if (!contents[i].continuationItemRenderer) {
						result[i] = document.cosmicCat.Utils.Sort.playlistData(contents[i].gridPlaylistRenderer || contents[i].playlistRenderer);
					}
				}
			} catch(err) {
				console.error("[Channels] Something went wrong with sorting channel playlists:\n", err);
			}

			return result;
		},
		Community: (data) => {
			let result = [];

			try {
				let tab = document.cosmicCat.Utils.browseTabs.find(data, "community");
				let contents = document.cosmicCat.Utils.browseTabs.content(tab)[0].itemSectionRenderer.contents;

				if (!contents) throw Error();

				for (let i = 0; i < contents.length; i++) {
					if (!contents[i].continuationItemRenderer) {
						result[i] = document.cosmicCat.Utils.Sort.feedData(contents[i].backstagePostThreadRenderer.post.backstagePostRenderer);
					}
				}
			} catch(err) {
				console.error("[Channels] Something went wrong with sorting channel feeds:\n", err);
			}

			return result;
		},
		Info: (data) => {
			let result = {};

			try {
				let tab = document.cosmicCat.Utils.browseTabs.find(data, "about");
				let contents = document.cosmicCat.Utils.browseTabs.content(tab)[0].itemSectionRenderer.contents[0].channelAboutFullMetadataRenderer;

				if (!contents) throw Error();

				result = document.cosmicCat.Utils.Sort.channelData(contents);

				try {
					result.subs = document.cosmicCat.Utils.deabreviateCnt(data.header.c4TabbedHeaderRenderer?.subscriberCountText?.simpleText?.split(" ")?.[0] || data.subs?.simpleText?.split(" ")?.[0] || "0");
				} catch(err) {
					console.error("[Channels] Something went wrong with sorting subscriber count:\n", err);
				}
			} catch(err) {
				console.error("[Channels] Something went wrong with sorting channel info:\n", err);
			}

			return result;
		}
	}
};