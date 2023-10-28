export default {
	Main: () => {
		YabaiComponent.addHandler("click", "guide-item-container", document.cosmicCat.Actions.handleSettingsTab);
		return `<div id="content">
<div class="guide-layout-container enable-fancy-subscribe-button">
<div class="guide-container" style="height: 400px">
<div class="guide" data-last-clicked-item="youtube">
<div class="guide-section yt-uix-expander">
<ul class="settings-menu-list">
<li class="guide-item-container selected-child">
<a class="guide-item selected" data-feed-name="general">
<span class="thumb">
<img class="system-icon system" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
</span><span class="display-name">General</span>
</a>
</li>
<li class="guide-item-container">
<a class="guide-item" data-feed-name="home">
<span class="thumb">
<img class="system-icon system" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
</span><span class="display-name">Home</span>
</a>
</li>
<li class="guide-item-container">
<a class="guide-item" data-feed-name="channel">
<span class="thumb">
<img class="system-icon system" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
</span><span class="display-name">Channel</span>
</a>
</li>
<li class="guide-item-container">
<a class="guide-item" data-feed-name="player">
<span class="thumb">
<img class="system-icon system" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
</span><span class="display-name">Player</span>
</a>
</li>
<li class="guide-item-container">
<a class="guide-item" data-feed-name="credits">
<span class="thumb">
<img class="system-icon system" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
</span><span class="display-name">Credits</span>
</a>
</li>
</ul>
</div>
</div>
<div id="disclaimer">Cosmic Cat v${GM_info.script.version}

Made with ♥ by Thistle Café -
and its contributors.</div>
</div>
<div class="guide-background" style="top: 0"></div>
<div id="feed" style="width: 790px;">
${document.cosmicCat.Template.Settings.Feeds.General()}
${document.cosmicCat.Template.Settings.Feeds.Home()}
${document.cosmicCat.Template.Settings.Feeds.Channel()}
${document.cosmicCat.Template.Settings.Feeds.Player()}
${document.cosmicCat.Template.Settings.Feeds.Credits()}
</div>
<div id="feed-background" style="width: 790px;"></div>
</div>
</div>`;
	},
	Feeds: {
		General: () => {
			return `<div id="feed-main-general" class="individual-feed selected">
<div class="feed-container">
<div class="feed-page">
<ul class="array" style="user-select: none;">
<li>
<div class="feed-item-container">
<div class="feed-item-main">
<label title="Enable/disable dark theme">Dark theme: <input type="checkbox" ${document.cosmicCat.Storage.get("dark").value == "1" ? "checked" : ""} id="darkTheme" data-action="toggleDarkTheme" data-storage="dark" class="cosmic-cat-settings ios-switch" /><div class="switch"></div></label>
</div>
</div>
</li>
</ul>
</div>
</div>
</div>`;
		},
		Home: () => {
			let options = "";
			for (let i = 0; i < document.cosmicCat.data.homeCategories.length; i++) {
				options += `<option value="${document.cosmicCat.data.homeCategories[i]}">${localizeString("guide." + document.cosmicCat.data.homeCategories[i])}</option>`;
			}
			return `<div id="feed-main-home" class="individual-feed hid">
<div class="feed-container">
<div class="feed-page">
<ul class="array" style="user-select: none;">
<li>
<div class="feed-item-container">
<div class="feed-item-main">
Main feed: <select class="cosmic-cat-settings" id="mainFeed" data-action="setHomeMainFeed" data-storage="greeting_feed" title="Set default feed for home page">
${(document.cosmicCat.Account.isLoggedIn()) ? `<option value="subscriptions">${localizeString("personal.subscriptions")}</option>` : ""}
<option value="youtube">${localizeString("guide.fromyt")}</option>
${options}
</select>
</div>
</div>
</li>
</ul>
</div>
</div>
</div>`;
		},
		Channel: () => {
			return `<div id="feed-main-channel" class="individual-feed hid">
<div class="feed-container">
<div class="feed-page">
<ul class="array" style="user-select: none;">
<li>
<div class="feed-item-container">
<div class="feed-item-main">
Channel revision: <select class="cosmic-cat-settings" id="channelMode" data-action="toggleChannelMode" data-storage="channel_mode" title="Set channel layout">
<option value="3">3.0</option>
<option value="2">2.0</option>
<option value="1" disabled="">1.0</option>
</select>
</div>
</div>
</li>
</ul>
</div>
</div>
</div>`;
		},
		Player: () => {
			return `<div id="feed-main-player" class="individual-feed hid">
<div class="feed-container">
<div class="feed-page">
<ul class="array" style="user-select: none;">
<li>
<div class="feed-item-container">
<div class="feed-item-main">
<label title="Enable/disable iframe player">iFrame Player: <input type="checkbox" ${document.cosmicCat.Storage.get("iframe").value == "1" ? "checked" : ""} id="iframe" data-storage="iframe" class="cosmic-cat-settings ios-switch" /><div class="switch"></div></label>
</div>
</div>
</li>
</ul>
</div>
</div>
</div>`;
		},
		Credits: () => {
			return `<div id="feed-main-credits" class="individual-feed hid">
<div class="feed-container">
<div class="feed-page">
<pre style="text-align: center;overflow-y: auto;">
<h1>Cosmic Cat v${GM_info.script.version}</h1>
<h3>==== Cosmic Cat ====</h3>
Lead Developer -
JT fluffy, Emiri Floarea

<h3>==== Contributors / Acknowledgements ====</h3>
Original Cosmic Cat Developer (Until October, 2023) -
Emiri Floarea

Components from Vorapis v3 & Vorapis v3 Player -
<a href="https://github.com/VORAPIS" target="_blank">Reprety</a>

Vorapis v3 Player 2012 Skin -
rlego

YabaiComponent & OpenUix -
<a href="https://github.com/YukisCoffee" target="_blank">Taniko Yamamoto</a>

Components from Rehike -
<a href="https://github.com/orgs/Rehike" target="_blank">The Rehike Maintainers</a>

Cosmic Cat Branding -
<a href="https://github.com/UnderscoreAngel" target="_blank">UnderscoreAngel</a>
<a href="https://github.com/travy-patty" target="_blank">travy-patty</a>

ReturnYouTubeDislike -
<a href="https://github.com/Anarios" target="_blank">Dmitrii Selivanov</a>

StackOverflow Code Solutions -
<a href="https://stackoverflow.com" target="_blank">StackOverflow</a>

<h3>==== Translators ====</h3>
<a href="https://github.com/VexorionReal" target="_blank">Vexorion Real (Polish)</a>


View the rest on Github: <a href="https://github.com/cosmic-cat-yt/cosmic-cat">cosmic-cat-yt/cosmic-cat</a>

All source code is available in the public domain under The Unlicense.
</pre>
</div>
</div>
</div>`;
		}
	},
	Stylesheet: () => {
		return `<style>
[transition] {
transition: background-color .3s ease;
}

#disclaimer {
text-align: center;
position: absolute;
white-space: pre-wrap;
height: 60px;
bottom: 0;
width: inherit;
}

input[type="checkbox"] {
position : absolute;
opacity : 0;
}
input[type="checkbox"].ios-switch + div {
display : inline-block;
vertical-align : middle;
width : 3em;
height : 1em;
border : rgba(0, 0, 0, 0.3) solid 1px;
border-radius : 999px;
margin : 0 0.5em;
background : white;
background-image : linear-gradient(rgba(0, 0, 0, 0.1), transparent), linear-gradient(90deg, hsl(210, 90%, 60%) 50%, transparent 50%);
background-size : 200% 100%;
background-position : 100% 0;
background-origin : border-box;
background-clip : border-box;
overflow : hidden;
transition-duration : 0.4s;
transition-property : padding, width, background-position, text-indent;
box-shadow : 0 0.1em 0.1em rgba(0, 0, 0, 0.2) inset, 0 0.45em 0 0.1em rgba(0, 0, 0, 0.05) inset;
font-size : 150%;
}
input[type="checkbox"].ios-switch:checked + div {
padding-left : 2em;
width : 1em;
background-position : 0 0;
}
input[type="checkbox"].ios-switch + div:before {
content : 'On';
float : left;
width : 1.65em;
height : 1.65em;
margin : -0.1em;
border : rgba(0, 0, 0, 0.35) solid 1px;
border-radius : inherit;
background : white;
background-image : linear-gradient(rgba(0, 0, 0, 0.2), transparent);
box-shadow : 0 0.1em 0.1em 0.1em hsla(0, 0%, 100%, 0.8) inset, 0 0 0.5em rgba(0, 0, 0, 0.3);
color : white;
text-shadow : 0 -1px 1px rgba(0, 0, 0, 0.3);
text-indent : -2.5em;
}
input[type="checkbox"].ios-switch:active + div:before {
background-color : #eee;
}
input[type="checkbox"].ios-switch:focus + div {
box-shadow : 0 0.1em 0.1em rgba(0, 0, 0, 0.2) inset, 0 0.45em 0 0.1em rgba(0, 0, 0, 0.05) inset, 0 0 0.4em 1px rgba(255, 0, 0, 0.5);
}
input[type="checkbox"].ios-switch + div:before, input[type="checkbox"].ios-switch + div:after {
font : bold 60%/1.9 sans-serif;
text-transform : uppercase;
}
input[type="checkbox"].ios-switch + div:after {
content : 'Off';
float : left;
text-indent : 0.5em;
color : rgba(0, 0, 0, 0.45);
text-shadow : none;
}
</style>`;
	}
};