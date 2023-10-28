export default {
	404: () => {
		document.cosmicCat.pageRenderer.set("title", "404 Not Found");
		document.cosmicCat.pageRenderer.set("body", document.cosmicCat.Template.errorNotFound());
		
	},
	home: () => {
		document.cosmicCat.pageRenderer.set("#content-container", document.cosmicCat.Template.Homepage.Main());

		let guidebuilder = "";
		let subsbuilder = "";

		if(document.cosmicCat.Storage.get("accountInfo").exists) {
			guidebuilder = document.cosmicCat.Template.Homepage.Guide.Builder.loggedIn();
			subsbuilder = document.cosmicCat.Template.Homepage.Guide.Personal();
		} else {
			guidebuilder = document.cosmicCat.Template.Homepage.Guide.Builder.loggedOut();
		}

		document.cosmicCat.pageRenderer.set("#guide-builder-promo", guidebuilder);
		document.cosmicCat.pageRenderer.set(".guide", subsbuilder);
		document.cosmicCat.pageRenderer.add(".guide", document.cosmicCat.Template.Homepage.Guide.Categories.Main());

		try {
			for (let i = 0; i < document.cosmicCat.data.homeCategories.length; i++) {
				let caties = document.cosmicCat.Utils.listCategories(document.cosmicCat.data.homeCategories[i]);
				document.cosmicCat.pageRenderer.add(".cockie", document.cosmicCat.Template.Homepage.Guide.Categories.Channel(caties));
			}
		} catch(err) {
			console.error("[Home] Could not parse categories:\n", err);
		}

		try {
			if (window.location.pathname == "/feed/subscriptions") {
				document.cosmicCat.Home.Feed.load(document.querySelector("[data-feed-name='subscriptions']"));
			} else {
				if (document.cosmicCat.Storage.get("greeting_feed").value == "youtube") {
					$(document).ready(function(){
						document.cosmicCat.Home.Feed.newFeed(ytInitialData);
						document.cosmicCat.toggleElm("#feed-loading-template");
						document.cosmicCat.toggleElm("#feed-main-youtube");
					});
				} else {
					document.cosmicCat.Home.Feed.load(document.querySelector(`[data-feed-name='${document.cosmicCat.Storage.get("greeting_feed").value}']`));
				}
			}
		} catch(err) {
			console.error("[Home] Could not load feed data:\n", err);
		}

		try {
			if(document.cosmicCat.Storage.get("accountInfo").exists) {
				document.cosmicCat.Subscriptions.getChannelInfo().then(subsarr => {
					for (let i = 0; i < subsarr.length; i++) {
						document.cosmicCat.pageRenderer.add("#guide-subscriptions", document.cosmicCat.Template.Homepage.Guide.Channel(subsarr[i]));
					}
				});
			} else {

			}
		} catch(err) {
			console.error("[Home] Could not load subscriptions:\n", err);
		}
		
	},
	watch: () => {
		$(document).ready(function(){
			let data = {
				primary: document.cosmicCat.Utils.Sort.videoData(ytInitialData.contents.twoColumnWatchNextResults.results?.results?.contents[0]?.videoPrimaryInfoRenderer),
				secondary: document.cosmicCat.Utils.Sort.videoData(ytInitialData.contents.twoColumnWatchNextResults.results?.results?.contents[1]?.videoSecondaryInfoRenderer),
				alternative: document.cosmicCat.Utils.Sort.videoData(ytInitialPlayerResponse)
			};

			document.cosmicCat.pageRenderer.set("#content-container", document.cosmicCat.Template.Watch.Content.Main(data));

			document.querySelector("#page").classList.add("watch");

			fetch("https://returnyoutubedislikeapi.com/Votes?videoId=" + data.alternative.id)
				.then((response) => response.json())
				.then((result) => {
				var likes = result.likes;
				var dislikes = result.dislikes;
				var rating = likes + dislikes > 0 ? (likes / (likes + dislikes)) * 100 : 50;
				document.querySelector(".video-extras-sparkbar-likes").style.width = rating + "%";
				document.querySelector(".likes").innerText = likes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				document.querySelector(".dislikes").innerText = dislikes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			}).catch((err) => {
				console.error("[ReturnYouTubeDislikes] Something went wrong with fetching api:\n", err);
			});

			try {
				for (let i = 0; i < data.alternative.tags.length; i++) {
					document.cosmicCat.pageRenderer.add("#eow-tags", document.cosmicCat.Template.Watch.Content.tag(data, i));
				}
			} catch(err) {
				console.error("[Watch] Failed to load video tags.\n", err);
			}

			try {
				if (ytInitialData.contents.twoColumnWatchNextResults.playlist.playlist) {
					let data = document.cosmicCat.Utils.Sort.playlistData(ytInitialData.contents.twoColumnWatchNextResults.playlist.playlist)
					document.cosmicCat.pageRenderer.add("#page", document.cosmicCat.Template.Watch.Content.playlistBar.Main(
						data)
					);

					for (let i = 0; i < data.videos.videos.length; i++) {
						document.cosmicCat.pageRenderer.add("ol.video-list", document.cosmicCat.Template.Watch.Content.playlistBar.barTray.trayContent.video(document.cosmicCat.Utils.Sort.videoData(data.videos.videos[i].playlistPanelVideoRenderer), data));
					}
				}
			} catch(err) {
				console.debug("[Playlists] No playlist loaded.");
			}

			try {
				if (!0 == data.alternative.isLive) {
					var iframe = document.createElement("iframe");
					iframe.src = "https://www.youtube.com/live_chat?v=" + data.alternative.id;
					iframe.height = "500";
					document.querySelector("#watch-sidebar").insertAdjacentElement("afterbegin", iframe);
				}
			} catch {}

			try {
				const obj_sug = ytInitialData.contents.twoColumnWatchNextResults.secondaryResults?.secondaryResults?.results?.[1]?.itemSectionRenderer?.contents || ytInitialData.contents.twoColumnWatchNextResults.secondaryResults?.secondaryResults?.results;

				for (let i = 0; i < obj_sug.length; i++) {
					if(obj_sug[i].compactVideoRenderer) {
						let videoData = document.cosmicCat.Utils.Sort.videoData(obj_sug[i].compactVideoRenderer);
						document.cosmicCat.pageRenderer.add("#watch-related", document.cosmicCat.Template.Watch.Content.mainCon.sideBar.suggestedVideo(videoData));
					}
					if (obj_sug[i].continuationItemRenderer) {
						document.cosmicCat.data.tokenSlot1 = obj_sug[i].continuationItemRenderer.continuationEndpoint.continuationCommand.token;

						document.cosmicCat.pageRenderer.add(".watch-sidebar-foot p.content", document.cosmicCat.Template.Buttons.watchMoreRelated());
					}
				}
			} catch(err) {
				console.error("[Watch] Failed to load suggestions.\n", err);
			}

			try {
				if (ytInitialData.contents.twoColumnWatchNextResults.results.results.contents.filter(b => b.itemSectionRenderer)[1]) {
					document.cosmicCat.toggleElm("#comments-view");
					let con = ytInitialData.contents.twoColumnWatchNextResults.results.results.contents.filter(b => b.itemSectionRenderer)[1].itemSectionRenderer.contents[0].continuationItemRenderer.continuationEndpoint.continuationCommand.token;
					document.cosmicCat.Comments.init(con);
				}
			} catch(err) {
				console.error("[Comments] Failed to load the comments section.\n\nUseful errors, if any:", err);
			}

			if (!data.alternative.id) {
				document.querySelector("#player").remove();
			}

			document.head.querySelector("title").innerText = `${data.primary.title} - YouTube`;

			document.cosmicCat.vorapisPlayer(data.alternative.id)

			document.querySelector("body").addEventListener("submit", async (e) => {
				e.preventDefault();

				let comm = document.querySelector(".comments-textarea").value;
				if(comm.length < 1) return;

				document.cosmicCat.Ajax.post("/youtubei/v1/comment/create_comment", `createCommentParams: "${document.querySelector("input#session").value}", commentText: "${comm}"`, "WEB", "2.20230331.00.00").then(async api => {
					if(api.actionResult.status == "STATUS_SUCCEEDED") {
						let re = api.actions[0].runAttestationCommand.ids;

						let comments = document.querySelector("ul.comment-list.all");
						let comment = document.createElement("li");
						comment.setAttribute("class", "comment yt-tile-default");
						comment.setAttribute("data-author-id", re[2].externalChannelId);
						comment.setAttribute("data-id", re[0].commentId);
						comment.setAttribute("data-score", "-1");

						let json = {authorText: {simpleText: document.cosmicCat.Storage.get("accountInfo").value.name}, commentId: re[0].commentId, contentText: {runs: [{text: comm}]}, publishedTimeText: {runs: [{text: "Just now"}]}, authorEndpoint: {browseEndpoint: {canonicalBaseUrl: document.cosmicCat.Storage.get("accountInfo").value.link}}};
						let newc = document.cosmicCat.Template.Comments.Comment(document.cosmicCat.Utils.Sort.commentData(json));

						comment.innerHTML = newc;
						comments.insertBefore(comment, comments.children[0]);

						document.cosmicCat.Comments.Form.uninit();

						await document.cosmicCat.Ajax.post("/youtubei/v1/att/get", `engagementType: "ENGAGEMENT_TYPE_COMMENT_POST", ids: ${JSON.stringify(re)}`, "WEB", "2.20230331.00.00");
					}
				});
				return false;
			});
			
		});
	},
	shorts: () => {
		window.location.href = "https://www.youtube.com/watch?v=" + window.location.pathname.split("/")[2];
	},
	channels: () => {
		(!/^featured|videos|playlists|community$/g.test(window.location.pathname.split("/").splice(document.cosmicCat.Channels.isUsertag() ? 2 : 3).join("/"))) && window.location.replace(window.location.pathname.split("/").slice(0, document.cosmicCat.Channels.isUsertag() ? 2 : 3).join("/") + "/featured");
		$(document).ready(async function(){
			let revision = document.cosmicCat.Storage.get("channel_mode").value;
			const naviHash = document.cosmicCat.Channels.getNaviHash();

			(revision == "3") && document.querySelector("#page").setAttribute("class", "branded-page channel");

			(revision == "2" && /playlists/.test(window.location.pathname.split("/").splice(2).join("/"))) && window.location.replace(window.location.pathname.split("/").slice(0,2).join("/") + "/videos");

			let data = {
				info: await document.cosmicCat.Ajax.Fetch(`https://www.youtube.com${window.location.pathname.split("/").slice(0, -1).join("/")}/about`, document.cosmicCat.Channels._Data.Info),
				header: document.cosmicCat.Channels.Local.Header(),
				content: document.cosmicCat.Channels.Local.SearchResults() || document.cosmicCat.Channels.Local.Videos() || document.cosmicCat.Channels.Local.Playlists() || document.cosmicCat.Channels.Local.Community()
			};

			document.head.querySelector("title").innerText = `${data.header.name}'s ${localizeString("global.channel")} - YouTube`;

			revision = "Channels" + document.cosmicCat.Storage.get("channel_mode").value;
			const tab = document.cosmicCat.Channels.getCurrentChannelTab();

			document.cosmicCat.pageRenderer.set("#content-container", document.cosmicCat.Template.Channel[revision].Main(data));

			const list = {
				"Channels3": {
					"contentList": ".channels-browse-content-grid",
					"contentListAddr": "primaryPane.browseVideos.listItem"
				},
				"Channels2": {
					"contentList": ".scrollbox-page",
					"contentListAddr": "playlistNavigator.Content.PlayPanel.Holder"
				},
				"Channels1": {
					"contentList": "#profileVideos [style=\"border-bottom:none;\"]",
					"contentListAddr": "mainCon.userVideos"
				}
			};

			try {
				var player = ytInitialData.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents.find(
					player => player.itemSectionRenderer.contents[0].channelVideoPlayerRenderer || player.itemSectionRenderer.contents[0].channelFeaturedContentRenderer
				);
				player = player.itemSectionRenderer.contents[0].channelVideoPlayerRenderer || player.itemSectionRenderer.contents[0].channelFeaturedContentRenderer.items[0].videoRenderer;
			} catch {}

			if (revision == "Channels2") {
				document.cosmicCat.pageRenderer.add("body", document.cosmicCat.Template.Channel.Channels2.Stylesheet()),
				document.cosmicCat.Channels.load2Modules(data.info);
				try {
					document.cosmicCat.pageRenderer.add("#playnav-video-panel-inner", document.cosmicCat.Template.Channel.Channels2.playlistNavigator.Content.LeftPanel.Info(
						document.cosmicCat.Utils.Sort.videoData(
							player
						), data.header)
					);
				} catch {}
				document.cosmicCat.Channels.playnav.selectTab("videos", document.querySelector("#playnav-navbar-tab-uploads"));
			}

			if (revision == "Channels3") {
				try {
					document.cosmicCat.pageRenderer.add(".tab-content-body", document.cosmicCat.Template.Channel.Channels3.primaryPane[
						document.cosmicCat.Channels.isCurrentChannelTab("featured") ? "featured" : "browseVideos"
					].Main(data));
				} catch {}

				try {
					document.cosmicCat.pageRenderer.add(".tab-content-body", document.cosmicCat.Template.Channel.Channels3.secondaryPane.Main(data));
				} catch {}

				try {
					for (let i = 0; i < data.info?.links?.length; i++) {
						document.cosmicCat.pageRenderer.add(".profile-socials", document.cosmicCat.Template.Channel.Channels3.secondaryPane.firstSection.socialLink(data.info.links[i].channelExternalLinkViewModel));
					}
				} catch(err) {
					console.error("[Channels] Failed to parse social links:\n", err);
				}

				if (document.cosmicCat.Channels.isCurrentChannelTab("featured")) {
					try {
						document.cosmicCat.pageRenderer.add(".primary-pane", document.cosmicCat.Template.Channel.Channels3.primaryPane.featured.featuredVideo(
							document.cosmicCat.Utils.Sort.videoData(
								player
							), data.header)
						);
					} catch {}

					try {
						// ytInitialData.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].shelfRenderer.endpoint.commandMetadata.webCommandMetadata.webPageType

						/*
						var a = ytInitialData.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents;
						for (const b in a) {
							// Define TYPE
						}
						*/
					} catch {}
				}
			}

			// data.content = (data.content.length == 0) && await document.cosmicCat.Ajax.Fetch(`https://www.youtube.com${window.location.pathname.split("/").slice(0, -1).join("/")}/${tab}`, document.cosmicCat.Channels._Data[tab.charAt(0).toUpperCase() + tab.slice(1)]) || data.content;

			try {
				//
				//document.cosmicCat.Ajax.post("/youtubei/v1/creator/get_creator_channels", `"channelIds":["${data.header.id}"],"mask":{"channelId":true,"title":true,"metric":{"all":true}}`, "62", "1.20211213.02.00")
				(revision == "Channels1") && (document.querySelector("[name^=\"channel-box-item-count\"]").innerText = data.content.length);
			} catch(err) {}

			try {
				for (let i = 0; i < data.content.length; i++) {
					document.cosmicCat.pageRenderer.add(list[revision].contentList, list[revision].contentListAddr.split('.').reduce((o,i)=> o[i]||"", document.cosmicCat.Template.Channel[revision])[document.cosmicCat.Channels.getCurrentChannelTab()](data.content[i], data.content.length));
				}
			} catch(err) {
				console.error("[Channels] Failed to parse local content data:\n", err);
			}

			(revision == "Channels2") && (document.querySelector("#playnav-play-loading").style.display = "none");

			console.log(data.content.length);
			(revision == "Channels3" && data.content.length > 29) && (
				document.cosmicCat.Channels.Channels3.Pagination.load()
			);

			document.cosmicCat.vorapisPlayer(document.cosmicCat.Utils.Sort.videoData(player).id);

			
		});
	},
	playlist: () => {
		$(document).ready(async function(){
			let data = {
				header: document.cosmicCat.Playlists.Local.Header(),
				content: document.cosmicCat.Playlists.Local.Videos()
			};

			if(data.header.owner.id) {
				data.creatorInfo = await document.cosmicCat.Ajax.Fetch(`https://www.youtube.com/channel/${data?.header?.owner?.id}/about`, document.cosmicCat.Channels._Data.Info);
			}

			document.cosmicCat.pageRenderer.set("#content-container", document.cosmicCat.Template.Playlist.Main(data));

			try {
				for (let i = 0; i < data.content.length; i++) {
					document.cosmicCat.pageRenderer.add("ol", document.cosmicCat.Template.Playlist.primaryPane.listItem.video(data.content[i], data.header.id, i+1));
				}
			} catch(err) {
				console.error("[Playlists] Failed to parse playlist content:\n", err);
			}
			
		});
	},
	results: () => {
		$(document).ready(function(){
			var searchpar = document.cosmicCat.Utils.escapeHtml((new URL(document.location)).searchParams.get("search_query"));

			document.querySelector("#page").classList.add("search-base");
			var results = ytInitialData?.contents?.twoColumnSearchResultsRenderer?.primaryContents?.sectionListRenderer?.contents.find(
				a => a?.itemSectionRenderer?.contents?.[1]?.videoRenderer
			).itemSectionRenderer?.contents;

			document.cosmicCat.pageRenderer.set("#content-container", document.cosmicCat.Template.Search.Main(searchpar));

			try {
				for(let i = 0; i < results.length; i++) {
					if(results[i].videoRenderer) {
						let videoData = document.cosmicCat.Utils.Sort.videoData(results[i].videoRenderer);
						document.cosmicCat.pageRenderer.add("#search-results", document.cosmicCat.Template.Search.videoRender(videoData));
					}
					if(results[i].channelRenderer) {
						let channelData = document.cosmicCat.Utils.Sort.channelData(results[i].channelRenderer);
						document.cosmicCat.pageRenderer.add("#search-results", document.cosmicCat.Template.Search.channelRender(channelData));
					}
					if(results[i].playlistRenderer) {
						let playlistData = document.cosmicCat.Utils.Sort.playlistData(results[i].playlistRenderer);
						document.cosmicCat.pageRenderer.add("#search-results", document.cosmicCat.Template.Search.playlistRender(playlistData));
					}
				}
			} catch (err) {
				// I love inconsistent data <3
				console.error("[Search] Failed to parse search results.\n", err, "\nData appears to be inconsistent. fuck u YT.");
				document.cosmicCat.Alert(2, "Cosmic Cat Error: Failed to parse search results. Check console for more details.")
			}

			var a = ytInitialData.header.searchHeaderRenderer.searchFilterButton.buttonRenderer.command.openPopupAction.popup.searchFilterOptionsDialogRenderer.groups;

			var temF = (data, b) => document.cosmicCat.Template.Search.dropdownFilter.Con(data, b, searchpar);

			for (const b in a) {
				var temC = ``;
				for (const c in a[b].searchFilterGroupRenderer.filters) {
					temC += temF(a[b]?.searchFilterGroupRenderer?.filters[c]?.searchFilterRenderer?.navigationEndpoint?.searchEndpoint?.params, a[b].searchFilterGroupRenderer.filters[c].searchFilterRenderer.label.simpleText);
				}

				document.cosmicCat.pageRenderer.add("#filter-dropdown", document.cosmicCat.Template.Search.dropdownFilter.Main(a, b, temC));
			}
			
		});
	},
	feedExplore: () => {
		document.body.setAttribute("class", "ytg-old-clearfix guide-feed-v2");
		document.head.querySelector("title").innerText = "Videos - YouTube";

		$(document).ready(function(){
			document.cosmicCat.pageRenderer.set("#content-container", document.cosmicCat.Template.Browse.Main());

			//document.cosmicCat.Alert(1, "This page is under reconstruction!");

			document.querySelector(".load-more-pagination").remove();

			
		});
	},
	settings: () => {
		document.querySelector("body").setAttribute("cosmic_cat_settings", "");
		document.querySelector("body").classList.add("guide-feed-v2");

		document.querySelector("title").innerText = "Cosmic Cat Settings";

		const guidecss = document.createElement("link");
		guidecss.setAttribute("id", "www-guide");
		guidecss.setAttribute("rel", "stylesheet");
		guidecss.setAttribute("href", "//s.ytimg.com/yts/cssbin/www-guide-vfljovH6N.css");

		document.querySelector("head").appendChild(guidecss);

		YabaiComponent.addHandler("input", "cosmic-cat-settings", document.cosmicCat.Actions.handleSettingsButton);

		document.cosmicCat.pageRenderer.set("#content-container", document.cosmicCat.Template.Settings.Main() + document.cosmicCat.Template.Settings.Stylesheet());

		$(document).ready(function() {
			$("#channelMode").val(document.cosmicCat.Storage.get("channel_mode").value);
			$("#mainFeed").val(document.cosmicCat.Storage.get("greeting_feed").value);

			
		});
	},
}