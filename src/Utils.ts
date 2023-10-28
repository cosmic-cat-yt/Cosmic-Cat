import { CosmicCat } from "@/main";

export default class Utils {
	cc: CosmicCat;
	
	constructor(cc: CosmicCat) {
		this.cc = cc;
	}

	deabreviateCnt(e) {
		if (e) {
			var t,
				n,
				a = 0;
			if (
				("M" == e.charAt(e.length - 1) && (a = 1),
				 "K" == e.charAt(e.length - 1) && (a = 2),
				 0 != a)
			)
				1 == a && ((t = "000,000"), (n = "M")),
					2 == a && ((t = "000"), (n = "K")),
					(e =
					 -1 != e.indexOf(".")
					 ? e.split(".")[0] +
					 "," +
					 e.split(".")[1].split(n)[0].slice(0, 2) +
					 t.slice(e.split(".")[1].split(n)[0].length, t.length)
					 : e.substring(0, e.length - 1) + "," + t);
			return e;
		}

		return null;
	}
	parseNumber(arg) {
		try {
			return arg.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
		} catch {
			return arg;
		}
	}
	currentPage(arg) {
		let _a = window.location.pathname.split("/")[1];

		switch (true) {
			case /channel|user|^c{1}$/.test(_a):
			case /@/.test(_a):
				_a = "channels";
				break;
			case window.location.pathname === "/" || window.location.pathname === "/feed/subscriptions":
				_a = "home";
				break;
			case window.location.pathname === "/feed/explore":
				_a = "feedExplore";
				break;
			case window.location.pathname === "/cosmic_cat":
				_a = "settings";
		}

		return _a;
	}
	whatChannel() {
		return `channels${this.cc.Storage.get("channel_mode").value}`;
	}
	convertXHRtoJSON(data) {
		return data.then(da => {
			try {
				return JSON.parse(da.split("var ytInitialData = ")[1].split(";</script>")[0]);
			} catch {
				return {};
			}
		});
	}
	getCookie(cname) {
		var name = cname + "=";
		var decodedCookie = decodeURIComponent(document.cookie);
		var ca = decodedCookie.split(';');
		for(let i = 0; i <ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}
	setCookie(cname, cvalue, exdays) {
		const d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		let expires = "expires="+ d.toUTCString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}
	browseTabs = {
		find: (data, param) => {
			try {
				return data.contents.twoColumnBrowseResultsRenderer.tabs.find(b =>
				   b.tabRenderer.endpoint.commandMetadata.webCommandMetadata.url.split("/")[3] === param
				);
			} catch {
				try {
					return data.contents.twoColumnBrowseResultsRenderer.tabs.find(b =>
					   b.tabRenderer.endpoint.commandMetadata.webCommandMetadata.url.split("/")[2] === param
					);
				} catch {
					return {};
				}
			}
		},
		content: (data) => {
			try {
				return data.sectionListRenderer?.contents || data.tabRenderer.content?.richGridRenderer?.contents || data.tabRenderer.content?.sectionListRenderer?.contents;
			} catch {
				return {};
			}
		}
	}
	addStyle(a) {
		try {
			var c;
			try {
				c=a.split("/www")[1].split("-").slice(0, -1).join("-")
			} catch {}
			var b = document.createElement("link");
			b.setAttribute("rel", "stylesheet");
			b.setAttribute("href", a);
			b.setAttribute("id", `www${c}-css`);
			document.head.append(b);
		} catch(err) {
			console.error(`[addStyle] Function must have an argument!:\n`, err);
		}
	}
	escapeHtml(unsafe) {
		try {
			return unsafe
				.replace(/&/g, "&amp;")
				.replace(/</g, "&lt;")
				.replace(/>/g, "&gt;")
				.replace(/"/g, "&quot;")
				.replace(/'/g, "&#039;");
		} catch {}
	}
	waitForElm(e) {
		return new Promise((t) => {
			if (document.querySelector(e)) return t(document.querySelector(e));
			const n = new MutationObserver((s) => {
				document.querySelector(e) &&
					(t(document.querySelector(e)), n.disconnect());
			});
			n.observe(document, {
				childList: !0,
				subtree: !0
			});
		});
	}
	waitForElm2() {
		return new Promise(resolve => {
			if (document.querySelector("body").innerHTML.match(/ytInitialData/)) {
				return resolve(document.querySelector("body"));
			}

			const observer = new MutationObserver(mutations => {
				if (document.querySelector("body").innerHTML.match(/ytInitialData/)) {
					try {
						let a = JSON.parse(document.body.innerHTML.substr(parseInt(document.body.innerHTML.search("var ytInitialData = ") + 20)).substr(0, parseInt(document.body.innerHTML.substr(parseInt(document.body.innerHTML.search("var ytInitialData = ") + 20)).search("</script>") - 1)));
						(a.contents) && resolve(a) && observer.disconnect();
					} catch {}
				}
			});

			observer.observe(document.body, {
				childList: true,
				subtree: true
			});
		});
	}
	listCategories(params) {
		var href = "";

		switch (true) {
			case /trending/.test(params):
				href = "/feed/trending";
				break;
			case /popular/.test(params):
				href = "/channel/UCF0pVplsI8R5kcAqgtoRqoA";
				break;
			case /music/.test(params):
				href = "/channel/UC-9-kyTW8ZkZNDHQJ6FgpwQ";
				break;
			case /live/.test(params):
				href = "/channel/UC4R8DWoMoI7CAwX8_LjQHig";
				break;
			case /gadgets|gaming/.test(params):
				href = "/gaming";
				break;
			case /news/.test(params):
				href = "/channel/UCYfdidRxbB8Qhf0Nx7ioOYw";
				break;
			case /sports/.test(params):
				href = "/channel/UCEgdi0XIXXZ-qJOFPf4JSKw";
				break;
			case /education/.test(params):
				href = "/channel/UCtFRv9O2AHqOZjjynzrv-xg";
				break;
			case /howto/.test(params):
				href = "/channel/UCrpQ4p1Ql_hG8rKXIKM1MOQ";
		}
		return {
			name: localizeString("guide." + params),
			href: href,
			class: params
		};
	}
	convertDescription(a) {
		// https://github.com/Rehike/Rehike/commit/cdabdd0d951ef3df06905172777efbc1bb34c1d6
		// Originally written by aubymori in PHP.

		if (!a.commandRuns) {
			return {
				"runs": [
					{
						"text": a.content
					}
				]
			};
		}

		var runs = [],
			start = 0;

		for (var i = 0; i < a.commandRuns.length; i++) {
			var run = a.commandRuns[i],
				beforeText = a.content.substr(start, run.startIndex - start);

			if(beforeText) {
				runs.push({
					text: beforeText
				});
			}

			var text = a.content.substring(run.startIndex, run.startIndex + run.length),
				endpoint = run.onTap.innertubeCommand;

			runs.push({
				text: text,
				navigationEndpoint: endpoint
			});

			start = run.startIndex + run.length;
		}

		var lastText = a.content.substr(start);
		if (lastText) {
			runs.push({
				text: lastText
			});
		}

		runs.forEach(function(run) {
			if (run.navigationEndpoint?.watchEndpoint) {
				run.text = "https://www.youtube.com" + run.navigationEndpoint.commandMetadata.webCommandMetadata.url.substring(0, 37) + "...";
			}
		});

		return {
			runs: runs
		};
	}
	Sort = {
		channelData: (data) => {
			if (!data) return {};

			let _description = data.descriptionSnippet?.runs || [];

			let description = "";
			for (const snippet in _description) {
				description += _description[snippet].text;
			}

			console.log(data);

			return {
				id: data.channelId || data.subscribeButton?.subscribeButtonRenderer?.channelId,
				name: data.title?.simpleText || data.title,
				gameBy: data.metadata?.runs?.[0].text,
				tag: data.channelHandleText?.runs?.[0]?.text?.split("@")?.[1],
				url: data.canonicalChannelUrl || data.navigationEndpoint?.browseEndpoint?.canonicalBaseUrl,
				avatar: data.avatar?.thumbnails?.[0]?.url || data.thumbnail?.thumbnails?.[0]?.url || data.boxArt?.thumbnails?.[0]?.url,
				links: data.links,
				bannerBg: data.tvBanner?.thumbnails?.[4]?.url,
				subscriberCount: this.cc.Utils.deabreviateCnt(data.subscriberCountText?.simpleText?.split(" ")?.[0] || data.subtitle?.simpleText?.split(" ")?.[0] || "0"),
				videos: data.videoCountText?.runs?.[1] && (data.videoCountText?.runs?.[0].text + data.videoCountText?.runs?.[1].text),
				fields: {
					views: this.cc.Utils.deabreviateCnt(data.viewCountText?.simpleText?.split(" ")?.[0]) || "0",
					joined: data.joinedDateText?.runs?.[1]?.text,
					country: data.country?.simpleText,
					description: (data.description?.simpleText || description).replace(/(?:\r\n|\r|\n)/g, "<br/>")
				}
			};
		},
		videoData: (da) => {
			if (!da) return {};

			let _description = da.detailedMetadataSnippets?.[0]?.snippetText?.runs || da.descriptionSnippet?.runs || da.description?.runs || da.videoDetails?.shortDescription || [];
			if(da.attributedDescription) _description = this.cc.Utils.convertDescription(da.attributedDescription)?.runs;

			let description = "";
			for (const snippet in _description) {
				if (_description[snippet].navigationEndpoint) {
					let href = _description[snippet].navigationEndpoint?.commandMetadata?.webCommandMetadata?.url;
					description += `<a href="${href}">${_description[snippet].text}</a>`;
				} else {
					description += _description[snippet].text;
				}
			}

			description = description.replace(/(?:\r\n|\r|\n)/g, '<br/>');

			return {
				owner: {
					name: da.owner?.videoOwnerRenderer?.title?.runs?.[0]?.text || da.bylineText?.runs?.[0]?.text || da.shortBylineText?.runs?.[0]?.text || da.ownerText?.runs?.[0]?.text || da.videoDetails?.author || da.owner?.videoOwnerRenderer?.title?.runs?.[0]?.text,
					url: da.owner?.videoOwnerRenderer?.navigationEndpoint?.browseEndpoint?.canonicalBaseUrl || da.bylineText?.runs?.[0]?.navigationEndpoint?.browseEndpoint?.canonicalBaseUrl || da.shortBylineText?.runs?.[0]?.navigationEndpoint?.browseEndpoint?.canonicalBaseUrl || da.longBylineText?.runs?.[0]?.navigationEndpoint?.browseEndpoint?.canonicalBaseUrl,
					id: da.videoDetails?.channelId || da.owner?.videoOwnerRenderer?.navigationEndpoint?.browseEndpoint?.browseId || da.shortBylineText?.runs?.[0]?.navigationEndpoint?.browseEndpoint?.browseId,
					icon : da.channelThumbnailSupportedRenderers?.channelThumbnailWithLinkRenderer?.thumbnail?.thumbnails?.[0]?.url
				},
				time: da.thumbnailOverlays?.find(c => c.thumbnailOverlayTimeStatusRenderer)?.thumbnailOverlayTimeStatusRenderer.text.simpleText || da.thumbnailOverlays?.find(c => c.thumbnailOverlayTimeStatusRenderer)?.thumbnailOverlayTimeStatusRenderer?.text?.runs?.[0]?.text || da.lengthText?.simpleText || "LIVE",
				views: da.viewCount?.videoViewCountRenderer?.viewCount?.simpleText || da.viewCountText?.simpleText || da.viewCountText?.runs?.[0]?.text + da.viewCountText?.runs?.[1]?.text || da.videoDetails?.viewCount || this.cc.Utils.deabreviateCnt(da.metadataText?.simpleText?.split(" · ")?.[0]?.split(" ")?.[0] || da.videoInfo?.runs?.[0]?.text?.split(" ")?.[0]) + " views" || "",
				title: da.title?.simpleText || da.title?.runs?.[0]?.text || da.videoDetails?.title || "Fallback title",
				id: da.videoDetails?.videoId || da.videoId,
				description: description,
				upload: da.dateText?.simpleText || da.publishedTimeText?.simpleText|| da.publishedTimeText?.runs?.[0]?.text || da.microformat?.playerMicroformatRenderer?.publishDate || da.metadataText?.simpleText?.split(" · ")?.[1] || "",
				badges: da.badges || [],
				thumbnail: da.thumbnail?.thumbnails?.[0]?.url,
				tags: da.videoDetails?.keywords || [],
				isLive: da.videoDetails?.isLive,
				category: (window.location.pathname.split("/")[1] == "watch") ? ytInitialPlayerResponse?.microformat?.playerMicroformatRenderer?.category : ""
			};
		},
		playlistData: (data) => {
			if (!data) return {};

			let views = data.viewCountText?.simpleText?.split(" ")?.[0];

			return {
				id: data.playlistId,
				title: data.title?.runs?.[0]?.text || data.title?.simpleText || data.title,
				description: data.descriptionText?.simpleText || data.subtitle?.simpleText || "",
				currentIndex: data.currentIndex,
				videos: {
					totalNumber: data.videoCountShortText?.simpleText || data.totalVideos || data.videoCount,
					text: data.videoCountText?.runs?.[1] ? data.videoCountText.runs[0].text + data.videoCountText.runs[1].text : data.videoCountText?.runs?.[0]?.text || data.numVideosText?.runs?.[0]?.text,
					runs: data.videoCountText?.runs,
					videos: data.contents
				},
				views: this.cc.Utils.deabreviateCnt(parseInt(views?.replace(/,/g, "")) ? views : "0"),
				owner: {
					name: data.ownerText?.runs?.[0]?.text || data.longBylineText?.runs?.[0]?.text,
					url: data.ownerText?.runs?.[0]?.navigationEndpoint?.browseEndpoint?.canonicalBaseUrl || data.longBylineText?.runs?.[0]?.navigationEndpoint?.browseEndpoint?.canonicalBaseUrl,
					id: data.ownerText?.runs?.[0]?.navigationEndpoint?.browseEndpoint?.browseId || data.longBylineText?.runs?.[0]?.navigationEndpoint?.browseEndpoint?.browseId
				},
				updated: data.publishedTimeText?.simpleText || "Updated a long time ago",
				thumbnail: data.thumbnail?.thumbnails?.[0]?.url || data.thumbnailRenderer?.playlistVideoThumbnailRenderer?.thumbnail?.thumbnails?.[0]?.url,
				rawThumbnail: data.thumbnail || {thumbnails: data.thumbnailRenderer?.playlistVideoThumbnailRenderer?.thumbnail},
				sidethumbs: data.sidebarThumbnails || data.thumbnails || [{thumbnails: (data.thumbnail?.thumbnails || data.thumbnail)}],
				url: data.navigationEndpoint?.commandMetadata?.webCommandMetadata?.url || data.endpoint?.commandMetadata?.webCommandMetadata?.url
			};
		},
		feedData: (data) => {
			if (!data) return {};

			let _description = data.contentText?.runs || [];

			let description = "";
			for (const snippet in _description) {
				description += _description[snippet].text;
			}

			return {
				owner: {
					name: data.authorText?.runs?.[0]?.text,
					url: data.authorText?.runs?.[0]?.navigationEndpoint?.browseEndpoint?.canonicalBaseUrl,
					id: "",
					icon: data.authorThumbnail?.thumbnails?.[0].url
				},
				id: data.postId,
				upload: data.publishedTimeText?.runs?.[0]?.text,
				description: description
			};
		},
		homeFeedData: (data) => {
			return {
				author: data.title.simpleText,
				avatar: data.thumbnail.thumbnails[0].url,
				video: this.cc.Utils.Sort.videoData(data.content.expandedShelfContentsRenderer.items[0].videoRenderer)
			};
		},
		commentData: (data) => {
			if(!data) return {};

			var RAW_COUNT = "";//da.voteCount ? da.voteCount.accessibility ? (da.voteCount.accessibility.accessibilityData ? parseInt(da.voteCount.accessibility.accessibilityData.label.replace(/[^0-9.]/g, '')) : '') : (da.voteCount.accessibility ? parseInt(da.voteCount.accessibility.label.replace(/[^0-9.]/g, '')) : '') : '';
			//var PRESENTABLE_COUNT = (RAW_COUNT + (liketoggled ? -1 : 0)) ? (RAW_COUNT + (liketoggled ? -1 : 0)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '';

			let _text = data.contentText.runs;

			let text = "";
			for (const snippet in _text) {
				if (_text[snippet].navigationEndpoint) {
					let href = _text[snippet].navigationEndpoint?.commandMetadata?.webCommandMetadata?.url;
					text += `<a href="${href}">${this.cc.Utils.escapeHtml(_text[snippet].text)}</a>`;
				} else {
					text += this.cc.Utils.escapeHtml(_text[snippet].text);
				}
			}

			text = text.replace(/(?:\r\n|\r|\n)/g, '<br/>');

			return {
				author: {
					name: data.authorText.simpleText,
					id: data.authorEndpoint.browseEndpoint.browseId,
					url: data.authorEndpoint.browseEndpoint.canonicalBaseUrl
				},
				id: data.commentId,
				text: text,
				time: data.publishedTimeText.runs[0].text,
				likes: data.voteCount ? data.voteCount.accessibility ? (data.voteCount.accessibility.accessibilityData ? parseInt(data.voteCount.accessibility.accessibilityData.label.replace(/[^0-9.]/g, '')) : '') : (data.voteCount.accessibility ? parseInt(data.voteCount.accessibility.label.replace(/[^0-9.]/g, '')) : '') : ''
			};
		}
	}
}