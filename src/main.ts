// Cosmic Cat code. Authored by Cosmic Cat Maintainers, code available under the public domain.

import * as YabaiComponent from "@/yabai_component";
import * as OpenUIX from "@/open_uix_components";
import vorapisPlayer from "@/VorapisPlayer";
import Data from "@/Data";
import Settings from "@/Settings";
import Ajax from "@/Ajax";
import Account from "@/Account";
import Utils from "@/Utils";
import Pagination from "@/Pagination";
import Comments from "@/Comments";
import Search from "@/Search";
import Channels from "@/Channels";
import Playlists from "@/Playlists";
import Home from "@/Home";
import Subscriptions from "@/Subscriptions";
import Animations from "@/Animations";
import watch from "@/watch";
import Browse from "@/Browse";
import Storage from "@/Storage";
import PageRenderer from "@/PageRenderer";
import Actions from "@/Actions";
import Picker from "@/Picker";
import www from "@/www";
import Template from "@/Template";

export class CosmicCat {
	data = new Data;
	
	Alert(a, b): void {
		this.pageRenderer.set("#alerts", this.Template.Alerts(a, b));
	}
	
	Settings = new Settings(this);
	
	Account = new Account(this);
	
	Ajax = new Ajax(this);
	
	Template = new Template(this);
	
	toggleElm(params) {
		const elm = document.querySelector(params);

        if (!params) return console.error("toggleElm", params + "is not a valid HTMLElement");
        console.debug("toggleElm", "toggled", params);

        if (elm.classList.contains("hid")) {
            elm.classList.remove("hid");
        } else {
            elm.classList.add("hid");
        }
	}
	
	Utils = new Utils(this);
	
	Pagination = new Pagination;
	
	Comments = new Comments(this);
	
	Search = new Search(this);
	
	Channels = Channels;
	
	Playlists = Playlists;
	
	Home = Home;
	
	Subscriptions = new Subscriptions(this);
	
	Animations = new Animations;
	
	watch = watch;
	
	Browse = new Browse(this);
	
	vorapisPlayer = vorapisPlayer;
	
	Storage = new Storage;
	
	pageRenderer = new PageRenderer(this);
	
	Actions = new Actions(this);
	
	picker = new Picker(this);
	
	www = www;
	
	null() {
		return null;
	}
}

declare const GM_registerMenuCommand;

(async (external: any) => {
'use strict';

GM_registerMenuCommand("Open (settings)", () => window.location.replace("/cosmic_cat"));

var update: boolean = false;

let cosmicCat = new CosmicCat;
external.document.cosmicCat = cosmicCat;

cosmicCat.Storage.init();
cosmicCat.Account.checkLogin();

const OBJ_STYLE_DARK = `* {--dark-noise: url(${document.cosmicCat.data.darkNoiseBg}); --shadow-color: #110f0f; --nero-color-primary: #201e1e; --nero-color-secondary: #242323; --gray-color: #a2a2a2; --silver-color: #bfbfbf; --night-rider-color: #2f2f2f; --white-color: #fff; --black-color: #000;}
body, #masthead-container
{background: var(--dark-noise) !important}

#masthead-search-terms input
{background: var(--black-color) !important; color: var(--white-color);}

#feed, #feed-background, .yt-tile-static, .yt-tile-visible, .yt-tile-default:hover, .yt-tile-default.video-list-item a:hover, #watch-sidebar .video-list-item a:hover
{ background: var(--nero-color-primary) !important; border-bottom-color: var(--nero-color-primary) !important; }

.feed-item-container:hover
{background: var(--nero-color-secondary) !important;}

#masthead-nav a, #masthead-user a, .metadata .view-count, .metadata .view-count, .feed-item-actions-line, .heading .header-container, .browse-item-content h3 a, #eow-title, .watch-view-count, #watch-uploader-info, .title, .yt-uix-button-content
{color: var(--silver-color) !important;}

.feed-item-container .feed-item-main, .feed-item-container:hover
{border-bottom: 1px solid var(--night-rider-color) !important;}

.feed-item-container:hover
{border-top: 1px solid var(--night-rider-color) !important;}

#footer ul {text-shadow: none;}

#masthead-user-expander .yt-uix-expander-head, #masthead-gaia-user-wrapper, #masthead-gaia-photo-wrapper
{border: 1px solid transparent;}

#watch-description .expand, #watch-description .collapse
{filter: invert();}

#search-btn .yt-uix-button-content
{filter: invert(); color: var(--gray-color);}

#masthead-expanded-container, #filter-dropdown
{box-shadow: inset 0 5px 5px var(--shadow-color) !important;}

img#logo
{background: url(${document.cosmicCat.data.darkyoutubelogo}) !important; background-size: 100px !important;}

#masthead-expanded-loading-message, #search-header h2, .yt-uix-button-content, label, .comment-text, #eow-description, #watch-description-extras, .num-results, #filter-dropdown, .enable-fancy-subscribe-button .yt-uix-button-subscription:hover .yt-uix-button-content, .yt-lockup-content *, .comments-section strong, #watch-description-extras h4
{color: var(--white-color) !important}

#masthead-search-terms, #search-btn
{border-color: #262626 !important; background: none !important;}

.yt-uix-button-default, .yt-subscription-button-js-default, .yt-uix-button-panel:hover .yt-uix-button-text, body .yt-uix-button-default[disabled]
{box-shadow: none !important; text-shadow: 0 1px 0 #000; border-color: #262626; background-image: linear-gradient(to bottom,#000 0,#202020 100%) !important;}

.subscription-button-with-recommended-channels .yt-uix-button-content
{color: #555 !important;}

.metadata-inline .yt-uix-button-content
{color: var(--black-color) !important;}

.yt-horizontal-rule
{border-top-color: var(--black-color) !important; border-bottom-color: var(--nero-color-primary) !important;}
`;

function _i18n() {
    const obj = {
        setTranslation: function (params) {
            return fetch(document.cosmicCat.data.i18nfolder + `${params}.json`)
                .then((response) => response.json())
                .then((data) => {
                document.cosmicCat.Storage.add("i18n", data);
                window.location.reload();
                return true;
            })
                .catch((error) => {
                alert(params + " is not translated yet.\n\nContribute: https://github.com/cosmic-cat-yt/cosmic-cat-i18n");
                console.error(error, "reverting to fallback.");
                return false;
                //document.cosmicCat.func.addToStorage("i18n", this.useFallback());
            });
        },
        useFallback: function() {
            //return document.cosmicCat.func.getFromStorage("i18n.fallback");
        },
        getTranslation: function () {
            return document.cosmicCat.Storage.get("i18n").value;
        }
    };
    const STORAGE = document.cosmicCat.Storage.get("i18n.setup");
    if(STORAGE.value !== "1") {
        obj.setTranslation("en");
        document.cosmicCat.Storage.add("i18n.setup", "1");
    }

    return obj;
}
external._i18n = _i18n;

const localizeString = (varr, DOM) => {
    const lang = _i18n().getTranslation();
    var i18n;
    try {
        i18n = varr.split('.').reduce((o,i)=> o[i]||"", lang.json) || "<\bno i18n string>";
    } catch {
        // Attempt to refetch missing translations.
        _i18n().setTranslation("en");
    }

    // really need to get rid of this and simplify the process.
    try {
        switch (varr) {
        case "watch.uploaderinfo":
            i18n = i18n.replace(/%s/g, `<a href="https://www.youtube.com${DOM?.secondary?.owner?.url}/featured" class="yt-uix-sessionlink yt-user-name author" rel="author" dir="ltr">${DOM?.secondary?.owner?.name}</a>`);
            i18n = i18n.replace(/%r/g, `<span id="eow-date" class="watch-video-date">${DOM?.primary.upload}</span>`);
            break;
        case "home.feed.uploadedavideo":
            i18n = i18n.replace(/%s/g, `<span class="feed-item-owner"><a href="${DOM?.url}/featured" class="yt-uix-sessionlink yt-user-name" dir="ltr">${DOM?.name}</a></span>`);
            break;
        case "watch.from":
            i18n = i18n.replace(/%s/g, `<span id="playnav-curvideo-channel-name"><a href="${window.location.href}">${DOM}</a></span>`);
            break;
        case "home.feed.islive":
            i18n = i18n.replace(/%s/g, `<span class="feed-item-owner"><a href="${DOM?.url}" class="yt-uix-sessionlink yt-user-name" dir="ltr">${DOM?.name}</a></span>`);
            break;
        case "watch.by":
            i18n = i18n.replace(/%s/g, `<span class="yt-user-name" dir="ltr">${DOM}</span>`);
            break;
        case "search.channels.by":
            i18n = i18n.replace(/%s/g, `<a href="https://www.youtube.com${DOM?.url}" class="yt-uix-sessionlink yt-user-name" dir="ltr">${DOM?.name}</a>`);
            break;
        case "stats.likesdislikes":
            i18n = i18n.replace(/%s/g, `<span class="likes"></span>`);
            i18n = i18n.replace(/%r/g, `<span class="dislikes"></span>`);
            break;
        case "playlists.body.primaryPane.items.video.by":
            i18n = i18n.replace(/%s/g, `${DOM}`);
            break;
        case "search.playlists.by":
            i18n = i18n.replace(/%s/g, `<a href="${DOM?.url}" class="yt-user-name" dir="ltr">${DOM?.name}</a>`);
            break;
        case "playlists.body.secondaryPane.aboutSection.about":
            i18n = i18n.replace(/%s/g, `${DOM}`);
            break;
        case "playlists.body.secondaryPane.aboutSection.creatorLinks.playlists":
            i18n = i18n.replace(/%s/g, `All`);
            i18n = i18n.replace(/%r/g, `${DOM}`);
            break;
        case "playlists.header.channelAuthor":
            i18n = i18n.replace(/%s/g, `<a href="${DOM?.url}">${DOM?.name}</a>`);
            break;
        case "channels.3.body.secondaryPane.userProfile.about":
            i18n = i18n.replace(/%s/g, `${DOM}`);
            break;
        case "channels.3.body.secondaryPane.userProfile.createdBy.by":
            i18n = i18n.replace(/%s/g, `<span class="yt-user-name" dir="ltr">${DOM}</span>`);
            break;
        case "watch.comments.charactersremain":
            i18n = i18n.replace(/%s/g, `<span class="comments-remaining-count" data-max-count="500">500</span>`);
            break;
    }
    } catch {}

    return i18n;
};
external.localizeString = localizeString;

if(window.location.pathname.match(/\/feed\/explore/i)) {
    document.cosmicCat.Utils.waitForElm("#page").then(function () {
        let obj = ["trending", "music", "film", "gaming", "sports"];
        for (let i = 0; i < obj.length; i++) {
            Promise.all([
                document.cosmicCat.Ajax.Fetch(`https://www.youtube.com${document.cosmicCat.Utils.listCategories(obj[i]).href}`, document.cosmicCat.Browse._Data)
            ]).then(res => {
                let videos = "";
                for (let i = 0; i < res[0].length; i++) {
                    videos += document.cosmicCat.Template.Browse.Content.Video(res[0][i]);
                }

                let categories = document.cosmicCat.Template.Browse.Content.Category(document.cosmicCat.Utils.listCategories(obj[i]), videos);
                document.cosmicCat.pageRenderer.add("#browse-main-column", categories);
            });
        }
    });
}

if ("onbeforescriptexecute" in document) {
    document.addEventListener("beforescriptexecute", (e) => {
        let t = e.target;
        (t.src.search("base.js") > -1 ||
         t.src.search("desktop_polymer.js") > -1 ||
         t.src.search("network.vflset") > -1 ||
         t.src.search("desktop_polymer_enable_wil_icons") > -1 ||
         t.src.search("spf") > -1) &&
            (e.preventDefault(), t.remove());
    });
} else {
    (document.cosmicCat.Utils.waitForElm("script#base-js").then(function (e) {
        e.remove();
    }),
     document.cosmicCat.Utils.waitForElm('script[src*="js/th"]').then(function (e) {
        e.remove();
    }),
     document.cosmicCat.Utils.waitForElm('script[src*="s/player"]').then(function (e) {
        e.remove();
    }),
     document.cosmicCat.Utils.waitForElm('script[src*="cast_sender"]').then(function (e) {
        e.remove();
    }),
     document.cosmicCat.Utils.waitForElm('script[src*="desktop_polymer_enable_wil_icons"]').then(function (e) {
        e.remove();
    }),
     document.cosmicCat.Utils.waitForElm('script[src*="network.vflset"]').then(function (e) {
        e.remove();
    }),
     document.cosmicCat.Utils.waitForElm("script[src*=spf]").then(function (e) {
        e.remove();
    }));
}

document.querySelector("html").removeAttribute("style"),
    document.querySelector("html").removeAttribute("class"),
    document.querySelector("html").removeAttribute("dark"),
    document.querySelector("html").removeAttribute("system-icons"),
    document.querySelector("html").removeAttribute("typography"),
    document.querySelector("html").removeAttribute("typography-spacing"),
    document.querySelector("html").removeAttribute("darker-dark-theme"),
    document.querySelector("html").removeAttribute("darker-dark-theme-deprecate");

document.cosmicCat.Utils.waitForElm("head").then(() => {
    var t = document.createElement("head");
    t.setAttribute("litterbox", "");
    document.querySelector("html").prepend(t);
    document.querySelector("html head:not([litterbox])").remove();

    var y = document.createElement("script");
    y.setAttribute("id", "www-searchbox");
    y.setAttribute("src", "//s.ytimg.com/yts/jsbin/www-searchbox-vflOEotgN.js");
    document.querySelector("head").append(y);

    var o = document.createElement("title");
    o.innerText = "YouTube - Broadcast Yourself.";
    document.querySelector("head").append(o);

    var x = document.createElement("link");
    x.setAttribute("rel", "icon");
    x.setAttribute("href", "//s.ytimg.com/yt/favicon-refresh-vfldLzJxy.ico");
    document.querySelector("head").append(x);

    var u = document.createElement("link");
    u.setAttribute("rel", "shortcut icon");
    u.setAttribute("href", "//s.ytimg.com/yt/favicon-refresh-vfldLzJxy.ico");
    document.querySelector("head").append(u);

    // Doesn't always load on FF
    document.cosmicCat.Utils.addStyle("//s.ytimg.com/yts/cssbin/www-core-vfleLhVpH.css");
});



document.cosmicCat.Utils.waitForElm("ytd-app").then(async (e) => {
    e.remove();
    document.querySelector("html").setAttribute("dir", "ltr");

    document.querySelector("body").setAttribute("id", "");
    document.querySelector("body").setAttribute("ytdataloaded", "");

    document.cosmicCat.Utils.addStyle("//s.ytimg.com/yts/cssbin/www-player-vfluwFMix.css");

    if (window.location.pathname == "/" || window.location.pathname == "/feed/subscriptions") {document.cosmicCat.Utils.addStyle("//s.ytimg.com/yts/cssbin/www-guide-vfljovH6N.css");}
    if (document.cosmicCat.Channels.isChannelsPage()) {
        let style = {
            3: ["//s.ytimg.com/yts/cssbin/www-channels3-vflIpog6R.css", "//s.ytimg.com/yts/cssbin/www-watch-inlineedit-vflg-l3kd.css"],
            2: ["//s.ytimg.com/yt/cssbin/www-refresh-vflzVUPsm.css", "//s.ytimg.com/yt/cssbin/www-the-rest-vflNb6rAI.css", "//s.ytimg.com/yt/cssbin/www-channel_new-vflrWkVe_.css"],
            1: ["//cosmic-cat-yt.github.io/cosmic-cat/www-channel.css", "//cosmic-cat-yt.github.io/cosmic-cat/base_all-vfl42963.css"]
        };
        let boop = style[document.cosmicCat.Storage.get("channel_mode").value];
        for (let i = 0; i < boop.length; i++) {
            document.cosmicCat.Utils.addStyle(boop[i]);
        }
        (document.cosmicCat.Storage.get("channel_mode").value == "2") && document.querySelector("#www-core-css").remove();
    }
    if (window.location.pathname.split("/")[1].match(/playlist/i)) {document.cosmicCat.Utils.addStyle("//s.ytimg.com/yts/cssbin/www-playlist-vflWjxI-w.css");}
    if(window.location.pathname.match(/\/feed\/explore/i)) {document.cosmicCat.Utils.addStyle("//s.ytimg.com/yts/cssbin/www-videos-nav-vflWHHWFS.css"); document.cosmicCat.Utils.addStyle("//s.ytimg.com/yts/cssbin/www-browse-new-vflUr2lEG.css");}

    document.body.setAttribute("class", "date-20121030 ltr ytg-old-clearfix guide-feed-v2");

    document.body.setAttribute("cosmic-cat", "");

    if (document.cosmicCat.Storage.get("dark").value == "1") {
        var p = document.createElement("style");
        p.setAttribute("id", "www-yt-dark");
        p.innerText = OBJ_STYLE_DARK;

        document.querySelector("head").append(p);
    }

    // 壊れています
    // バージョン文字列の比較は誤った部分文字列を取得するようです
    // そのため、比較は失敗します
    // TODO: Port to REGEX
    
    // Check for updates here, because Tampermonkey's "Auto-updater" is SHIT!
    //fetch("https://raw.githubusercontent.com/cosmic-cat-yt/cosmic-cat/main/cosmic-cat.user.js").then(a => a.text()).then(a => {
    //    var b = (a.substr(parseInt(a.search("@version") + 14)).substr(0, parseInt(a.search("@version") - 86)));
    //    (GM_info.script.version !== b) && (update = !0);
//
    //    console.debug("[Updater] Current version:", GM_info.script.version, "|", "GitHub version:", b);
    //});

    fetch("https://raw.githubusercontent.com/cosmic-cat-yt/cosmic-cat-i18n/main/version.json").then(a => a.json()).then(a => {
        (document.cosmicCat.Storage.get("storageVer").value !== a.version) && (
            document.cosmicCat.Storage.add("storageVer", a.version),
            _i18n().setTranslation(document.cosmicCat.Storage.get("lang").value)
        )
    }).catch(err => console.error(err));

    setTimeout(async function () {
        if (!document.cosmicCat.Account.isLoggedIn()) {
            await document.cosmicCat.Account.fetch();
        }

        /* Render main body */
        const bodyDOM = document.createElement("div");
        bodyDOM.setAttribute("id", "page");

        document.cosmicCat.data.lang = document.cosmicCat.data.lang[document.cosmicCat.Storage.get("lang").value];
        document.cosmicCat.data.country = window.yt?.config_?.GL;

        let OBJ_MASTH = "";
        let OBJ_USER = "";
        if(document.cosmicCat.Account.isLoggedIn()) {
            OBJ_USER = document.cosmicCat.Template.Masthead.User.loggedIn();
            OBJ_MASTH = document.cosmicCat.Template.Masthead.Expander();
        } else {
            OBJ_USER = document.cosmicCat.Template.Masthead.User.loggedOut();
        }

        var OBJ_MASTHEAD = document.cosmicCat.Template.Masthead.Main();
        var OBJ_FOOTER = document.cosmicCat.Template.Footer();

        bodyDOM.innerHTML += `<div id="masthead-container">
${OBJ_MASTHEAD}
</div>
<div id="content-container">
</div>
${OBJ_FOOTER}
<style id="fix-hid">.hid {display: none !important;}</style>`;
        document.querySelector("body").appendChild(bodyDOM);

        document.cosmicCat.pageRenderer.set("#masthead-user", OBJ_USER);
        document.cosmicCat.pageRenderer.add("#masthead-container", OBJ_MASTH);

        document.querySelector("body").setAttribute("ythtmlloaded", "");

        document.cosmicCat.Utils.waitForElm2().then(() => {
            (!0 === update) && document.cosmicCat.Alert(0, "An update is available to Cosmic Cat! <a href=\"https://raw.githubusercontent.com/cosmic-cat-yt/cosmic-cat/main/cosmic-cat.user.js\">Click to install it.</a>");
        });

        try {
            yt.www.masthead.searchbox.init();
        } catch(err) {
            try {
                setTimeout(() => yt.www.masthead.searchbox.init(), 1000);
            } catch(err) {
                console.error("[Searchbox] Couldn't init!\n", err, "\nTrying again one last time.");
                try {
                    setTimeout(() => yt.www.masthead.searchbox.init(), 1000);
                } catch(err) {
                    console.error("[Searchbox] Couldn't init!\n", err);
                }
            }
            console.error("[Searchbox] Couldn't init!\n", err, "\nTrying again in 1 second.");
        }
    }, 1);
});

document.cosmicCat.Utils.waitForElm("body[ythtmlloaded]").then(function () {
    try {
        document.cosmicCat.www[document.cosmicCat.Utils.currentPage()]();
    } catch(err) {
        console.error("[pageRenderer] Either the page does not exist, or a problem has occurred.\n", err);
        document.cosmicCat.www["404"]();
    }
});

document.cosmicCat.Utils.waitForElm("#watch-page-skeleton").then(function (a) {
    a.style.display = "none";
});

document.cosmicCat.Utils.waitForElm('#player').then(function (e) {
    //e.remove();
});

document.cosmicCat.Utils.waitForElm("iframe[src*=error]").then(function () {
    document.cosmicCat.www["404"]();
});

document.cosmicCat.Utils.waitForElm(".yt-main").then(function () {
    document.cosmicCat.www["404"]();
});

YabaiComponent.addHandler("click", "yt-uix-button-default", cosmicCat.Actions.handleButton);
YabaiComponent.addHandler("click", "yt-uix-button-text", cosmicCat.Actions.handleButton);
YabaiComponent.addHandler("click", "yt-subscription-button", cosmicCat.Actions.handleSubscribeButton);
YabaiComponent.addHandler("click", "subscribe-button", cosmicCat.Actions.handleSubscribeButton);
YabaiComponent.addHandler("click", "masthead-user-menu-expander", cosmicCat.Actions.handleExpander);
YabaiComponent.addHandler("click", "guide-item-container", cosmicCat.Actions.handleGuideItem);

OpenUIX.init();

})(window);