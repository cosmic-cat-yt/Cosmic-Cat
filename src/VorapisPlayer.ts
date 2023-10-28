export default function vorapisPlayer(innertubevideoid, mission) {
	// Install player script.
	var _aaa = document.createElement("script");
	_aaa.setAttribute("src", "//cosmic-cat-yt.github.io/cosmic-cat/html5player.js")
	_aaa.onload = function () {
		(playerwasloaded = !0),
			datawasloaded && (invokePlayer(), (playerwasinvoked = !0));
	}
	document.head.appendChild(_aaa)
	// Install player skin.
	const ass = document.createElement("style");
	ass.id = "cosmic-panda-player";
	ass.innerHTML = `
.ytp-play-progress {
background-image: linear-gradient(to bottom,#c00 0,#600 100%);
}
.ytp-load-progress {
background-image: linear-gradient(to top,#5a5a5a 89%,#666 90%);
}
.html5-scrubber-button {
background: no-repeat url(//s.ytimg.com/yt/imgbin/player-common-vflzogr__.png) -305px -41px;
border:none;
width:17px;
height:16px!important;
border-radius:0;
top:-6px
}
.html5-progress-bar:focus .html5-scrubber-button, .html5-scrubber-button:active, .html5-scrubber-button:hover {
background: no-repeat url(//s.ytimg.com/yt/imgbin/player-common-vflzogr__.png) 0 0;
}
.ytp-progress-list {
background: #1e1f1f;
background-image: linear-gradient(to top,rgba(30,31,31,.75) 89%,#2f2f2f 90%);
}
.html5-video-player .html5-player-chrome {
padding-bottom:1px;
height:26px;
background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAdCAYAAABrAQZpAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAABIAAAASABGyWs+AAAACXZwQWcAAAABAAAAHQAh4gKwAAAAMUlEQVQI12OQlJD4x2Sgr8/I9OTZs5dM//79Y2T6//8/IyqLAcLClEBjYahDKCHSKADN5VNQpdTxzgAAAABJRU5ErkJggg==')
}
button.ytp-v3normal.ytp-button {
background: no-repeat url(//s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) -96px -151px;
}
button.ytp-v3normal.ytp-button:hover {
background: no-repeat url(//s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) 0 -97px
}
#player.watch-small button.ytp-v3normal.ytp-button {
background:no-repeat url(//s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) -96px -151px, #141414;
box-shadow: inset 0 -5px 5px #000;
}
#player.watch-medium button.ytp-v3teather.ytp-button, .ytp-size-toggle-large:focus {
background: no-repeat url(//s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) -121px -340px, #141414;
box-shadow: inset 0 -5px 5px #000;
}
button.ytp-v3teather.ytp-button, .ytp-size-toggle-large {
background: no-repeat url(//s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) -121px -340px;
}
button.ytp-v3teather.ytp-button:hover, .ytp-size-toggle-large:hover {
background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) -32px -43px;
}
.ytp-button-fullscreen-enter, .ytp-embed .ytp-fullscreen-button.ytp-button {
background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) -128px -43px;
}
.ytp-button-fullscreen-enter:not(.ytp-disabled):focus, .ytp-button-fullscreen-enter:not(.ytp-disabled):hover {
background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) -89px -340px;
}
.ytp-settings-button {
background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) -89px -70px;
}
.ytp-settings-button:hover, .ytp-settings-button:not(.ytp-disabled):focus {
background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) -35px -259px!important;
}
.ytp-settings-button-active {
background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) -35px -259px, #141414!important;
box-shadow: inset 0 -5px 5px #000;
}
.ytp-subtitles-button,.ytp-subtitles-button:focus {
	background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) 0 -151px;
}
.ytp-subtitles-button:hover {
background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) -57px -340px;
}
.ytp-subtitles-button-active:focus, .ytp-subtitles-button-active:hover, .ytp-subtitles-button-active {
	background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) -128px -178px;
}
.ytp-button-watch-later, .ytp-button-watch-later:focus {
	background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) -96px -178px;
}
.ytp-button-watch-later:hover, .ytp-button-watch-later:active {
background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) -96px -124px;
}
.ytp-button-volume[data-value=max], .ytp-button-volume[data-value=loud], .ytp-button-volume[data-value=max]:focus, .ytp-button-volume[data-value=loud]:focus, .ytp-embed .ytp-mute-button {
background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) 0 -232px;
}
.ytp-button-volume[data-value=max]:hover, .ytp-button-volume[data-value=loud]:hover {
background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) 0 -178px;
}
.ytp-button-volume[data-value=normal], .ytp-button-volume[data-value=quiet],  .ytp-button-volume[data-value=normal]:focus, .ytp-button-volume[data-value=quiet]:focus {
	background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) -32px -178px;
}
.ytp-button-volume[data-value=normal]:hover, .ytp-button-volume[data-value=quiet]:hover {
	background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) -92px -259px;
}
.ytp-button-volume[data-value=min], .ytp-button-volume[data-value=min]:focus {
background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) 0 -124px;
}
.ytp-button-volume[data-value=min]:hover {
	background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) 0 -124px;
}
.ytp-button-volume[data-value=off], .ytp-button-volume[data-value=off]:focus {
	background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) -57px -70px;
}
.ytp-button-volume[data-value=off]:hover {
	background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) -3px -259px;
}
.ytp-button-play, .ytp-embed .ytp-play-button {
	background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) -32px -151px;
}
.ytp-button-play:not(.ytp-disabled):hover, .ytp-button-play:not(.ytp-disabled):active, .ytp-button-play:not(.ytp-disabled):focus {
	background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) -32px -124px!important;
}
.ytp-button-pause, .ytp-button-play:not(.ytp-disabled):focus {
background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) 0 -340px;
}
.ytp-button-pause:not(.ytp-disabled):focus, .ytp-button-pause:not(.ytp-disabled):hover {
	background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) 0 -70px;
}
.ytp-button-replay {
background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) -36px -285px;
}
.ytp-button-replay:not(.ytp-disabled):hover {
background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) -36px -312px;
}
.ytp-button-stop {
 background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) -90px -97px;
}
.ytp-button-stop:not(.ytp-disabled):hover {
background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) -33px -232px;
}
.ytp-volume-slider-foreground:before {
background:linear-gradient(#290909,#BD2020,#B31E1E,#A71C1C,#901A1A,#6F1313,#444444);
height:7px;
top:4px
}
.ytp-volume-slider-foreground:after {
background:linear-gradient(#050404,#050404,#050404,#050404,#050404,#050404,#444);
height:7px;
top:4px
}
.ytp-volume-slider-foreground {
background:linear-gradient(#fff,#CFCFCF);
border-radius:3px
}
.ytp-button-play, .ytp-volume-control, .ytp-subtitles-button,.ytp-subtitles-button-active, .ytp-settings-button, .ytp-settings-button-active {
	border-right: 1px solid #222;
}
.yt-lockup-meta-info li:first-child {
width:100%
}
.yt-ui-ellipsis {
text-overflow:clip
}
.ytp-embed svg {
visibility:hidden}
.ytp-embed button.ytp-fullscreen-button.ytp-button {
width:0!Important;
top:-10px
}
.ytp-embed div.ytp-gradient-top,.ytp-embed .ytp-chrome-top  {
display:none
}
.ytp-menuitem {
max-height:26px;
height:26px
}
.ytp-chrome-controls .ytp-button.ytp-youtube-button, .ytp-small-mode .ytp-chrome-controls .ytp-button.ytp-youtube-button, .ytp-exp-bigger-button-like-mobile.ytp-small-mode .ytp-chrome-controls .ytp-button.ytp-youtube-button {
display:none
}
.ytp-embed .ytp-chrome-controls {
max-height:28px!important
}
.ytp-embed .ytp-progress-bar-container {
bottom:32px
}
.ytp-exp-bottom-control-flexbox .ytp-left-controls, :not(.ytp-exp-bottom-control-flexbox) .ytp-right-controls {
margin-top:5px
}
.ytp-embed .ytp-time-display {
height:26px;
line-height:26px
}
html #player.watch-small .html5-video-player:not(.ideal-aspect) .html5-main-video {
max-width:initial!important;
max-height:initial!important
}
.ytp-menu-content {
border-spacing:1px
}
.ytp-menu {
background:#141414;
border-radius:3px 3px 0 0;
padding:0
}
.ytp-drop-down-menu {
display:inline-block!important;
position:relative;
background:none;
border:none;
}
.ytp-drop-down-menu-button {
color:#aaa;
padding:4px 7px
}
.ytp-drop-down-menu-button-selected {
color:#fff;
}
.ytp-drop-down-menu-button-checked .ytp-drop-down-menu-button-check, .ytp-drop-down-menu-button-checked:hover:not(.ytp-disabled) .ytp-drop-down-menu-button-check {
background:none #fff;
border-radius:50%;
height:3px;
width:3px;
margin:0 11px 1px -1px
}
.ytp-drop-down-menu-button-check {
height:3px;
width:3px;
margin:0 11px 1px -1px
}
.ytp-drop-down-menu-button:hover:not(.ytp-disabled) {
background:#601212
}
.ytp-menu-row {
display:inline-block;
vertical-align:top;
box-shadow: 1px 0 0 0 #2b2b2b inset;
border-left: 1px solid #000;
padding:0 3px;
min-height:135px
}
.ytp-menu-row:first-child {
border-left:transparent;
box-shadow:none
}
.ytp-menu-cell {
display:block
}
.ytp-drop-down-label {
display:none
}
.ytp-menu-title {
text-align:left;
padding:4px 7px 4px 16px
}
.ytp-drop-down {
min-width:0!important
}
.ytp-segmented-control {
margin-left:16px
}`;
	document.querySelector("head").append(ass);

	//

	var wasdash = !1,
		c3video = {};
	var playerwasloaded = !1,
		datawasloaded = !1,
		playerwasinvoked = !1;

	(playerwasloaded = !1), (datawasloaded = !1), (playerwasinvoked = !1);
	var event = new CustomEvent("v3-player-ready"),
		streamingdata = {},
		decoder = "",
		obfuscator = "",
		decodername = "",
		dashmanifest = "",
		rvsdata = "";

	async function getPlayerData(e) {
		return (
			await document.cosmicCat.Ajax.post("/youtubei/v1/player", "videoId: \"" + innertubevideoid + "\",contentCheckOk:true,racyCheckOk:true", "IOS", "16.02")
		);
	};
	async function grabPlayerData() {
		window.location.href.includes("use_legacy_player=1")
			? ensureFoo2IsSet().then(function () {
			(window.innertuberesponse = ytInitialPlayerResponse),
				console.log(innertuberesponse);

			try {
				(innertuberesponse.streamingData.adaptiveFormats[0].qualityLabel.includes(
					"0s"
				) ||
				 window.location.href.includes("&only_h=1") ||
				 0 == v3.config.vp9) &&
					murderVp();
			} catch (e) {}

			craftVideoStreams();
		})
		: await getPlayerData(mission).then((e) => {
			window.innertuberesponse = e;

			try {
				document.documentElement.setAttribute(
					"author",
					innertuberesponse.videoDetails.channelId
				),
					document.querySelector("body[spftoken]") &&
					(document.documentElement.setAttribute(
					"spfinitial" + document.body.getAttribute("spftoken"),
					""
				),
					 innertuberesponse.streamingData || location.reload(),
					 setTimeout(function () {
					document.documentElement.removeAttribute(
						"spfinitial" + document.body.getAttribute("spftoken")
					);
				}, 1e3));
			} catch (e) {}

			console.log("[Vorapis Player] Player API response:\n", innertuberesponse);

			try {
				(innertuberesponse.streamingData.adaptiveFormats[0].qualityLabel.includes(
					"0s"
				) ||
				 window.location.href.includes("&only_h=1") ||
				 0 == v3.config.vp9) &&
					murderVp();
			} catch (e) {}

			craftVideoStreams();
		});
	};
	async function craftVideoStreams() {
		function v3CraftDashUrlStream(plapipath, fallbackpath, readtype) {
			if (1 == readtype) {
				if (
					plapipath.mimeType.includes("vp9") &&
					void 0 !== streamingdata.dashManifestUrl
				)
					return "UNDEFINED";

				try {
					var decode =
						"encodeURIComponent(" +
						decodername +
						'(decodeURIComponent("' +
						plapipath.signatureCipher.split("s=")[1].split("&")[0] +
						'")))';

					try {
						return plapipath.width
							? "init=" +
							plapipath.initRange.start +
							"-" +
							plapipath.initRange.end +
							"&size=" +
							plapipath.width +
							"x" +
							plapipath.height +
							"&fps=" +
							plapipath.fps +
							"&lmt=" +
							plapipath.lastModified +
							"&index=" +
							plapipath.indexRange.start +
							"-" +
							plapipath.indexRange.end +
							"&clen=" +
							plapipath.contentLength +
							"&bitrate=" +
							plapipath.bitrate +
							"&type=" +
							encodeURIComponent(plapipath.mimeType).replace("%20", "+") +
							"&url=" +
							encodeURIComponent(
							plapipath.signatureCipher
							.split("&url=")[1]
							.split("videoplayback")[0] +
							"videoplayback" +
							decodeURIComponent(
								decodeURIComponent(
									decodeURIComponent(
										plapipath.signatureCipher
										.split("&url=")[1]
										.split("videoplayback")[1]
									)
								)
							) +
							"&alr=yes&sig="
						) +
							encodeURIComponent(eval(decode)) +
							"&itag=" +
							plapipath.itag
						: "init=" +
							plapipath.initRange.start +
							"-" +
							plapipath.initRange.end +
							"&lmt=" +
							plapipath.lastModified +
							"&index=" +
							plapipath.indexRange.start +
							"-" +
							plapipath.indexRange.end +
							"&clen=" +
							plapipath.contentLength +
							"&bitrate=" +
							plapipath.bitrate +
							"&type=" +
							encodeURIComponent(plapipath.mimeType).replace("%20", "+") +
							"&url=" +
							encodeURIComponent(
							plapipath.signatureCipher
							.split("&url=")[1]
							.split("videoplayback")[0] +
							"videoplayback" +
							decodeURIComponent(
								decodeURIComponent(
									decodeURIComponent(
										plapipath.signatureCipher
										.split("&url=")[1]
										.split("videoplayback")[1]
									)
								)
							) +
							"&alr=yes&sig="
						) +
							encodeURIComponent(eval(decode)) +
							"&itag=" +
							plapipath.itag;
					} catch (err) {
						return plapipath.width
							? "init=" +
							fallbackpath.initRange.start +
							"-" +
							fallbackpath.initRange.end +
							"&size=" +
							plapipath.width +
							"x" +
							plapipath.height +
							"&fps=" +
							plapipath.fps +
							"&lmt=" +
							plapipath.lastModified +
							"&index=" +
							fallbackpath.indexRange.start +
							"-" +
							fallbackpath.indexRange.end +
							"&clen=" +
							fallbackpath.contentLength +
							"&bitrate=" +
							plapipath.bitrate +
							"&type=" +
							encodeURIComponent(plapipath.mimeType).replace("%20", "+") +
							"&url=" +
							encodeURIComponent(
							plapipath.signatureCipher
							.split("&url=")[1]
							.split("videoplayback")[0] +
							"videoplayback" +
							decodeURIComponent(
								decodeURIComponent(
									decodeURIComponent(
										plapipath.signatureCipher
										.split("&url=")[1]
										.split("videoplayback")[1]
									)
								)
							) +
							"&alr=yes&sig="
						) +
							encodeURIComponent(eval(decode)) +
							"&itag=" +
							plapipath.itag
						: "init=" +
							fallbackpath.initRange.start +
							"-" +
							fallbackpath.initRange.end +
							"&lmt=" +
							plapipath.lastModified +
							"&index=" +
							fallbackpath.indexRange.start +
							"-" +
							fallbackpath.indexRange.end +
							"&clen=" +
							fallbackpath.contentLength +
							"&bitrate=" +
							plapipath.bitrate +
							"&type=" +
							encodeURIComponent(plapipath.mimeType).replace("%20", "+") +
							"&url=" +
							encodeURIComponent(
							plapipath.signatureCipher
							.split("&url=")[1]
							.split("videoplayback")[0] +
							"videoplayback" +
							decodeURIComponent(
								decodeURIComponent(
									decodeURIComponent(
										plapipath.signatureCipher
										.split("&url=")[1]
										.split("videoplayback")[1]
									)
								)
							) +
							"&alr=yes&sig="
						) +
							encodeURIComponent(eval(decode)) +
							"&itag=" +
							plapipath.itag;
					}
				} catch (e) {
					try {
						return plapipath.width
							? "init=" +
							plapipath.initRange.start +
							"-" +
							plapipath.initRange.end +
							"&size=" +
							plapipath.width +
							"x" +
							plapipath.height +
							"&fps=" +
							plapipath.fps +
							"&lmt=" +
							plapipath.lastModified +
							"&index=" +
							plapipath.indexRange.start +
							"-" +
							plapipath.indexRange.end +
							"&clen=" +
							plapipath.contentLength +
							"&bitrate=" +
							plapipath.bitrate +
							"&type=" +
							encodeURIComponent(plapipath.mimeType).replace("%20", "+") +
							"&url=" +
							encodeURIComponent(plapipath.url) +
							"&itag=" +
							plapipath.itag
						: "init=" +
							plapipath.initRange.start +
							"-" +
							plapipath.initRange.end +
							"&lmt=" +
							plapipath.lastModified +
							"&index=" +
							plapipath.indexRange.start +
							"-" +
							plapipath.indexRange.end +
							"&clen=" +
							plapipath.contentLength +
							"&bitrate=" +
							plapipath.bitrate +
							"&type=" +
							encodeURIComponent(plapipath.mimeType).replace("%20", "+") +
							"&url=" +
							encodeURIComponent(plapipath.url) +
							"&itag=" +
							plapipath.itag;
					} catch (e) {
						return plapipath.width
							? "init=" +
							fallbackpath.initRange.start +
							"-" +
							fallbackpath.initRange.end +
							"&size=" +
							plapipath.width +
							"x" +
							plapipath.height +
							"&fps=" +
							plapipath.fps +
							"&lmt=" +
							plapipath.lastModified +
							"&index=" +
							fallbackpath.indexRange.start +
							"-" +
							fallbackpath.indexRange.end +
							"&clen=" +
							fallbackpath.contentLength +
							"&bitrate=" +
							plapipath.bitrate +
							"&type=" +
							encodeURIComponent(plapipath.mimeType).replace("%20", "+") +
							"&url=" +
							encodeURIComponent(plapipath.url) +
							"&itag=" +
							plapipath.itag
						: "init=" +
							fallbackpath.initRange.start +
							"-" +
							fallbackpath.initRange.end +
							"&lmt=" +
							plapipath.lastModified +
							"&index=" +
							fallbackpath.indexRange.start +
							"-" +
							fallbackpath.indexRange.end +
							"&clen=" +
							fallbackpath.contentLength +
							"&bitrate=" +
							plapipath.bitrate +
							"&type=" +
							encodeURIComponent(plapipath.mimeType).replace("%20", "+") +
							"&url=" +
							encodeURIComponent(plapipath.url) +
							"&itag=" +
							plapipath.itag;
					}
				}
			}
		}

		function v3CraftDashUrlStreamCompact(e, t, a) {
			try {
				return e.width
					? "init=" +
					e.initRange.start +
					"-" +
					e.initRange.end +
					"&size=" +
					e.width +
					"x" +
					e.height +
					"&fps=" +
					e.fps +
					"&lmt=" +
					e.lastModified +
					"&index=" +
					e.indexRange.start +
					"-" +
					e.indexRange.end +
					"&clen=" +
					e.contentLength +
					"&bitrate=" +
					e.bitrate +
					"&type=" +
					encodeURIComponent(e.mimeType).replace("%20", "+") +
					"&url=" +
					encodeURIComponent(e.url) +
					"&itag=" +
					e.itag
				: "init=" +
					e.initRange.start +
					"-" +
					e.initRange.end +
					"&lmt=" +
					e.lastModified +
					"&index=" +
					e.indexRange.start +
					"-" +
					e.indexRange.end +
					"&clen=" +
					e.contentLength +
					"&bitrate=" +
					e.bitrate +
					"&type=" +
					encodeURIComponent(e.mimeType).replace("%20", "+") +
					"&url=" +
					encodeURIComponent(e.url) +
					"&itag=" +
					e.itag;
			} catch (a) {
				return e.width
					? "init=" +
					t.initRange.start +
					"-" +
					t.initRange.end +
					"&size=" +
					e.width +
					"x" +
					e.height +
					"&fps=" +
					e.fps +
					"&lmt=" +
					e.lastModified +
					"&index=" +
					t.indexRange.start +
					"-" +
					t.indexRange.end +
					"&clen=" +
					t.contentLength +
					"&bitrate=" +
					e.bitrate +
					"&type=" +
					encodeURIComponent(e.mimeType).replace("%20", "+") +
					"&url=" +
					encodeURIComponent(e.url) +
					"&itag=" +
					e.itag
				: "init=" +
					t.initRange.start +
					"-" +
					t.initRange.end +
					"&lmt=" +
					e.lastModified +
					"&index=" +
					t.indexRange.start +
					"-" +
					t.indexRange.end +
					"&clen=" +
					t.contentLength +
					"&bitrate=" +
					e.bitrate +
					"&type=" +
					encodeURIComponent(e.mimeType).replace("%20", "+") +
					"&url=" +
					encodeURIComponent(e.url) +
					"&itag=" +
					e.itag;
			}
		}

		try {
			streamingdata = ytInitialPlayerResponse.streamingData;
		} catch (e) {
			streamingdata = innertuberesponse.streamingData;
		}

		try {
			if (null != streamingdata.dashManifestUrl) {
				(dashmanifest = streamingdata.dashManifestUrl),
					(window.usingDashMpd = !0),
					(window.wasVideo = !0);
				var mse = window.MediaSource;

				if (mse) {
					var nativeITS = mse.isTypeSupported.bind(mse);
					mse.isTypeSupported = ourITS(nativeITS);
				}

				function ourITS(e) {
					return function (t) {
						return void 0 === t || t.toLowerCase().indexOf("vp9") > -1
							? ""
						: e(t);
					};
				}
			} else
				(window.usingDashMpd = !1),
					"/watch" == window.location.pathname && (window.wasVideo = !0);
		} catch (e) {
			console.error(e);
			return void (
				window.location.pathname.includes("/watch") && buildErrorScreen()
			);
		}

		try {
			var adaptivefmts = innertuberesponse.streamingData.adaptiveFormats;
		} catch (e) {
			console.error("No fmt\n", e);
			var adaptivefmts = streamingdata.adaptiveFormats;
		}

		var craftedadaptivefmts = "",
			needscut = !1;
		if (
			void 0 === streamingdata.hlsManifestUrl ||
			void 0 === streamingdata.dashManifestUrl
		)
			try {
				if ("" == dashmanifest) {
					for (var i = 0, j = adaptivefmts.length; i < j; i++) {
						try {
							if (0 == adaptivefmts[i].audioTrack.audioIsDefault) {
								//needscut = !0;
								continue;
							}
						} catch (e) {}

						"UNDEFINED" !=
							v3CraftDashUrlStreamCompact(
							adaptivefmts[i],
							adaptivefmts[0],
							1
						) &&
							(i == j - 1
							 ? (craftedadaptivefmts += v3CraftDashUrlStreamCompact(
							adaptivefmts[i],
							adaptivefmts[0],
							1
						))
							 : (craftedadaptivefmts +=
								v3CraftDashUrlStreamCompact(
							adaptivefmts[i],
							adaptivefmts[0],
							1
						) + ","));
					}

					needscut &&
						(craftedadaptivefmts = craftedadaptivefmts.substring(
						0,
						craftedadaptivefmts.length - 1
					));
				}
			} catch (e) {
				console.error("[Vorapis Player]\n", e);
			}
		document.cosmicCat.Utils.waitForElm(".player-root").then(function () {
			try {
				try {
					if (1 == yt.config_.LOGGED_IN) {
						var e = !1;

						try {
							ytInitialData.contents.twoColumnWatchNextResults.secondaryResults
								.secondaryResults.results[1].itemSectionRenderer.contents
								.length && (e = !0);
						} catch (e) {}

						try {
							ytInitialData.contents.twoColumnWatchNextResults.secondaryResults
								.secondaryResults.results.length && (e = !0);
						} catch (e) {}

						try {
							ytInitialData.contents.twoColumnWatchNextResults.results.results.contents
								.find(function (e) {
								try {
									return !!e.videoSecondaryInfoRenderer;
								} catch (e) {
									return !1;
								}
							})
								.videoSecondaryInfoRenderer.metadataRowContainer.metadataRowContainerRenderer.rows[0].metadataRowRenderer.contents[0].runs[0].text.includes(
								"Age-restricted"
							) &&
								!e &&
								v3AgeRestrictFriend();
						} catch (e) {}

						waitForElm2("#eow-description").then(function () {
							"" == document.querySelector("#eow-description").innerText &&
								"" != innertuberesponse.videoDetails.shortDescription &&
								(document.querySelector("#eow-description").innerText =
								 innertuberesponse.videoDetails.shortDescription);
						});
					}
				} catch (e) {
					console.error("[Vorapis Player]\n", e);
				}

				function t(e) {
					for (var t = e.split(":"), a = 0, n = 1; t.length > 0; )
						(a += n * parseInt(t.pop(), 10)), (n *= 60);

					return a;
				}

				var a;
				document.querySelector("html[c3]") && v3ChannelFriend(),
					(a =
					 void 0 !==
					 ytInitialData.contents.twoColumnWatchNextResults.secondaryResults
					 .secondaryResults.results[1].itemSectionRenderer
					 ? ytInitialData.contents.twoColumnWatchNextResults
					 .secondaryResults.secondaryResults.results[1]
					 .itemSectionRenderer.contents
					 : ytInitialData.contents.twoColumnWatchNextResults
					 .secondaryResults.secondaryResults.results);
				var n = 0;

				for (var i = 0, j = a.length; i < j; i++)
					if (n < 12 && a[i].compactVideoRenderer) {
						var r = 0;

						try {
							r = a[i].compactVideoRenderer.viewCountText.simpleText
								.split(" ")[0]
								.replace(new RegExp(",", "g"), "");
						} catch (e) {}

						var o = "";

						try {
							o = t(a[i].compactVideoRenderer.lengthText.simpleText);
						} catch (e) {}

						(rvsdata +=
						 "title=" +
						 encodeURIComponent(
							a[i].compactVideoRenderer.title.simpleText
						).replace(new RegExp("%20", "g"), "+") +
						 "&author=" +
						 encodeURIComponent(
							a[i].compactVideoRenderer.shortBylineText.runs[0].text
						).replace(new RegExp("%20", "g"), "+") +
						 "&view_count=" +
						 r +
						 "&length_seconds=" +
						 o +
						 "&id=" +
						 a[i].compactVideoRenderer.videoId),
							11 != n && (rvsdata += ","),
							n++;
					}
			} catch (e) {
				console.error("[Vorapis Player]\n", e);
			}

			craftVarYtPlayer(craftedadaptivefmts);
		});
	};
	function craftVarYtPlayer (e) {
		var t = "";

		try {
			t = innertuberesponse.storyboards.playerStoryboardSpecRenderer.spec;
		} catch (e) {
			try {
				t =
					ytInitialPlayerResponse.storyboards.playerStoryboardSpecRenderer.spec;
			} catch (e) {console.error(e)}
		}

		!wasdash && dashmanifest && (wasdash = !0);

		const a = {config: {
			url: "https://s.ytimg.com/yts/swfbin/player-vfl8Mj1Eu/watch_as3.swf",
			urlV8: "https://s.ytimg.com/yts/swfbin/player-vfl8Mj1Eu/cps.swf",
			urlV9As2: "https://s.ytimg.com/yts/swfbin/player-vfl8Mj1Eu/cps.swf",
			args: {
				author: innertuberesponse.videoDetails.author,
				dashmpd: dashmanifest,
				focEnabled: "1",
				adaptive_fmts: "",
				account_playback_token: "",
				enablecsi: "0",
				length_seconds: innertuberesponse.videoDetails.lengthSeconds,
				ytfocEnabled: "1",
				remarketing_url: "",
				cos: "Windows",
				uid: "",
				iv_invideo_url: "",
				idpj: "0",
				sourceid: "y",
				vid: innertuberesponse.videoDetails.videoId,
				watermark: ",https://s.ytimg.com/yts/img/watermark/youtube_watermark-vflHX6b6E.png,https://s.ytimg.com/yts/img/watermark/youtube_hd_watermark-vflAzLcD6.png",
				avg_rating: "",
				fexp: "908547,914099,927622,930666,930672,932404,934040,940247,940642,947209,947215,949424,951701,952302,952901,953000,953912,957103,957201,958600",
				host_language: "en",
				iv_load_policy: "1",
				token: "1",
				loaderUrl: "https://www.youtube.com/watch?v=" + innertuberesponse.videoDetails.videoId,
				ptk: "ea",
				baseUrl: "https://googleads.g.doubleclick.net/pagead/viewthroughconversion/962985656/",
				cosver: "6.2",
				t: "1",
				oid: "",
				cbrver: "2.20230331.00.00",
				plid: "",
				ptchn: "",
				dash: "1",
				no_get_video_log: "1",
				sdetail: "p:/embed/" + innertuberesponse.videoDetails.videoId,
				tmi: "1",
				storyboard_spec: t,
				vq: "auto",
				atc: "",
				of: "",
				allow_embed: "1",
				url_encoded_fmt_stream_map: "",
				aid: "",
				ucid: innertuberesponse.videoDetails.channelId,
				cr: "RO",
				timestamp: "1414688781",
				iv_module: "https://s.ytimg.com/yts/swfbin/player-vfl8Mj1Eu/iv_module.swf",
				rmktEnabled: "1",
				probe_url: "https://www.youtube.com/embed/" + innertuberesponse.videoDetails.videoId,
				video_id: innertuberesponse.videoDetails.videoId,
				title: innertuberesponse.videoDetails.title,
				cl: "78766649",
				eventid: "",
				csi_page_type: "watch,watch7",
				hl: "en_US",
				iv3_module: "1",
				sw: "0.1",
				fmt_list: "22/1280x720/9/0/115,18/640x360/9/0/115,17/256x144/99/1/0",
				cbr: "WEB",
				ytfocHistoryEnabled: "0",
				referrer: "https://www.youtube.com/embed/" + innertuberesponse.videoDetails.videoId,
				allow_ratings: "1",
				enablejsapi: 0,
				pltype: "content",
				keywords: innertuberesponse.videoDetails.title,
				ldpj: "0",
				c: "WEB",
				view_count: innertuberesponse.videoDetails.viewCount
			},
			assets: {
				css: "//s.ytimg.com/yts/cssbin/www-player-vfluwFMix.css",
				js: "//s.ytimg.com/yts/jsbin/html5player-en_US-vfln6g5Eq/html5player.js",
				html: "//raw.githubusercontent.com/cosmic-cat-yt/Cosmic-Cat/main/html5_player_template"
			},
			attrs: {
				id: "movie_player"
			},
			params: {
				allowfullscreen: "true",
				allowscriptaccess: "always",
				bgcolor: "#000000"
			},
			minVersion: "8.0.0",
			fallback: null,
			fallbackMessage: null,
			html5: !0,
			disable: {},
			loaded: !0,
			messages: {
				player_fallback: [
					'Adobe Flash Player or an HTML5 supported browser is required for video playback.<br><a href="https://get.adobe.com/flashplayer/">Get the latest Flash Player </a><br><a href="/html5">Learn more about upgrading to an HTML5 browser</a>'
				]
			}
		}};
		(a.config.args.adaptive_fmts = e), (window.ytplayer = a);
		var n = "";

		if (void 0 === streamingdata.hlsManifestUrl) {
			try {
				for (
					var i = 0, j = innertuberesponse.streamingData.formats.length;
					i < j;
					i++
				)
					(n +=
					 "fallback_host=" +
					 innertuberesponse.streamingData.formats[i].url
					 .split("://")[1]
					 .split(".com")[0] +
					 ".com&type=" +
					 encodeURIComponent(
						innertuberesponse.streamingData.formats[i].mimeType
					).replace("%20", "+") +
					 "&url=" +
					 encodeURIComponent(innertuberesponse.streamingData.formats[i].url) +
					 "&quality=" +
					 innertuberesponse.streamingData.formats[i].quality +
					 "&itag=" +
					 innertuberesponse.streamingData.formats[i].itag),
						i < parseInt(innertuberesponse.streamingData.formats.length - 1) &&
						(n += ",");
			} catch {
				// Try again with adaptiveFormats instead.
				try {
					for (
						var i = 0, j = innertuberesponse.streamingData.adaptiveFormats.length;
						i < j;
						i++
					)
						(n +=
						 "fallback_host=" +
						 innertuberesponse.streamingData.adaptiveFormats[i].url
						 .split("://")[1]
						 .split(".com")[0] +
						 ".com&type=" +
						 encodeURIComponent(
							innertuberesponse.streamingData.adaptiveFormats[i].mimeType
						).replace("%20", "+") +
						 "&url=" +
						 encodeURIComponent(innertuberesponse.streamingData.adaptiveFormats[i].url) +
						 "&quality=" +
						 innertuberesponse.streamingData.adaptiveFormats[i].quality +
						 "&itag=" +
						 innertuberesponse.streamingData.adaptiveFormats[i].itag),
							i < parseInt(innertuberesponse.streamingData.adaptiveFormats.length - 1) &&
							(n += ",");
				} catch (e) {
					console.error("[Vorapis Player] could not craft legacy stream url", e);
				}
			}

			ytplayer.config.args.url_encoded_fmt_stream_map = n;
		} else {
			(ytplayer.config.args.live_chunk_readahead = 0),
				(ytplayer.config.args.live_playback = 1),
				(ytplayer.config.args.livestream = 0),
				(ytplayer.config.args.hlsdvr = 0),
				(ytplayer.config.args.hlsvp = streamingdata.hlsManifestUrl),
				(ytplayer.config.args.fmt_list = "");

			try {
				ytplayer.config.args.live_storyboard_spec =
					innertuberesponse.storyboards.playerLiveStoryboardSpecRenderer.spec;
			} catch (e) {}

			(ytplayer.config.args.instream = !0),
				(ytplayer.config.args.instream_long = !0),
				(ytplayer.config.args.streaminglib_module = 1),
				(ytplayer.config.args.pltype = "contentlive"),
				(ytplayer.config.args.ps = "live"),
				(ytplayer.config.args.probe_url = ""),
				(ytplayer.config.args.enable_cardio = 0),
				(ytplayer.config.args.enable_cardio_before_playback = 0);
		}

		innertuberesponse.captions &&
			 (ytplayer.config.args.ttsurl =
			  document.cosmicCat.Channels.isChannelsPage() ?
			  "" :
			  innertuberesponse.captions?.playerCaptionsTracklistRenderer?.captionTracks?.find(a => a.languageCode == "en" && a.kind !== "asr")?.baseUrl
			 ),
			(ytplayer.config.args.rvs = rvsdata),
			(datawasloaded = !0),
			playerwasloaded && !playerwasinvoked && invokePlayer(),
			console.log("[Vorapis Player] success to load player.\n", ytplayer, playerwasloaded, playerwasinvoked);
	};
	function invokePlayer() {
		yt.player.Application.create("player-api", ytplayer.config);
		let a = document.querySelector("#movie_player");
		document.querySelector(".player-root").append(a);
		try {
			document.querySelector("#player.skeleton.flexy").remove();
		} catch {}

		$(document).on('click', '.ytp-size-toggle-large, .ytp-size-button.toggled', function(e) {
			if (e.target.classList.contains("ytp-size-button")) e.target.classList.remove("toggled");
			document.querySelector('#watch-container').classList.remove("watch-wide");
			document.querySelector('#watch-video').classList.add('small');
			document.querySelector('#watch-video').classList.remove('large');
			setTimeout(function () {if (document.querySelector('.watch-playlist-collapsed')) document.querySelector('#player').classList.remove('watch-playlist-collapsed');}, 1);
		});
		$(document).on('click', '.ytp-size-toggle-small, .ytp-size-button:not(.toggled)', function(e) {
			if (e.target.classList.contains("ytp-size-button")) e.target.classList.add("toggled");
			if (document.querySelector('.watch-playlist')) document.querySelector('#player').classList.add('watch-playlist-collapsed');
			document.querySelector('#watch-container').classList.add("watch-wide");
			setTimeout(function () {
				document.querySelector('#watch-video').classList.remove('small');
				document.querySelector('#watch-video').classList.add('large');
			}, 300);
		});
	};
	function buildErrorScreen() {
		console.log("build error screen"),
			document.cosmicCat.Utils.waitForElm("#player-api").then(function (e) {
			var t = "Video unavailable";

			try {
				(t = innertuberesponse.playabilityStatus.reason),
					innertuberesponse.playabilityStatus.reason
					.toLocaleLowerCase()
					.includes("premieres") &&
					document
					.querySelector("body")
					.classList.add("using-innertube-heartbeat"),
					document.querySelector("body").setAttribute("hbr", "wp"),
					document
					.querySelector("body")
					.setAttribute(
					"hba",
					innertuberesponse.heartbeatParams.heartbeatServerData
				);
			} catch (e) {}

			try {
				t =
					innertuberesponse.playabilityStatus.errorScreen
					.playerErrorMessageRenderer.subreason.simpleText;
			} catch (e) {}

			try {
				null == t && (t = innertuberesponse.playabilityStatus.reason);
			} catch (e) {}

			t.toLowerCase().includes("confirm")
				? (document.querySelector("#player-api").innerHTML =
				   '<div id="player-unavailable" class="    with-background    player-width player-height    player-unavailable ">\n          <img class="icon meh" src="//s.ytimg.com/yts/img/meh7-vflGevej7.png" alt="">\n  <div class="content">\n    <h1 id="unavailable-message" class="message">\n            Content Warning\n\n    </h1>\n    <div id="unavailable-submessage" class="submessage">\n              <div id="watch7-player-age-gate-content">\n          <p>This video may be inappropriate for some users.</p>\n\n      <button class=" yt-uix-button yt-uix-button-primary yt-uix-button-size-default" type="button" href="https://accounts.google.com/ServiceLogin?service=youtube&amp;continue=http%3A%2F%2Fwww.youtube.com%2Fsignin%3Faction_handle_signin%3Dtrue%26app%3Ddesktop%26feature%3Dverify_age_streamlined%26hl%3Den%26next%3D%252Fwatch%253Fv%253DMlPh_ycy62s&amp;passive=true&amp;shdf=Cp4BCxILZGVzY3JpcHRpb24aMkl0IHdvdWxkIGJlIGF3ZXNvbWUgaWYgeW91IGNvdWxkIHBsZWFzZSBTdWJzY3JpLi4uDAsSBnJlYXNvbhoBMwwLEgd2aWRlb0lkGgoyNDA0OTA3MzIwDAsSCnZpZGVvVGl0bGUaJ0hhcmxlbSBTaGFrZSBDb21waWxhdGlvbiEgKEJFU1QgVklERU9TKQwSB3lvdXR1YmUaBFNIQTEiFPT6MQfKLgISJ5I3OxthncBZEblbKAEyFP95e22CYyYjv222-YZ0VSobO--X&amp;ltmpl=verifyage&amp;hl=en" onclick=";window.location.href=this.getAttribute(\'href\');return false;" role="button"><span class="yt-uix-button-content">Sign in to confirm your age </span></button>\n  </div>\n\n    </div>\n  </div>\n\n\n  </div>')
			: (document.querySelector("#player-api").innerHTML =
			   '<div id="player-unavailable" class="  player-width player-height    player-unavailable ">\n                <img class="icon meh" src="//s.ytimg.com/yts/img/meh7-vflGevej7.png" alt="">\n  <div class="content">\n    <h1 id="unavailable-message" class="message">\n              ' +
			   t +
			   '\n\n    </h1>\n    <div id="unavailable-submessage" class="submessage">\nSorry about that.\n    </div>\n  </div>\n\n\n    </div>'),
				"CONTENT_CHECK_REQUIRED" ==
				innertuberesponse.playabilityStatus.status &&
				"AGE_CHECK_REQUIRED" ==
				innertuberesponse.playabilityStatus.status &&
				(document.querySelector("#player-api").innerHTML =
				 '<div id="player-unavailable" class="    with-background    player-width player-height    player-unavailable ">\n          <img class="icon meh" src="//s.ytimg.com/yts/img/meh7-vflGevej7.png" alt="">\n  <div class="content">\n    <h1 id="unavailable-message" class="message">\n            Content Warning\n\n    </h1>\n    <div id="unavailable-submessage" class="submessage">\n              <div id="watch7-player-age-gate-content">\n          <p>This video may be inappropriate for some users.</p>\n\n      <button class=" yt-uix-button yt-uix-button-primary yt-uix-button-size-default" type="button" onclick="v3ConfirmFriend();" role="button"><span class="yt-uix-button-content">I understand and wish to proceed </span></button>\n  </div>\n\n    </div>\n  </div>\n\n\n  </div>');
		});
	}

	mission && null == yt.config_.INNERTUBE_API_KEY && location.reload(),
		grabPlayerData();
}