// ==UserScript==
// @name         Ciulin's YouTube
// @namespace    https://www.youtube.com/*
// @version      0.4.26
// @description  Broadcast Yourself
// @author       CiulinUwU
// @updateURL    https://github.com/ciulinuwu/ciulin-s-youtube/raw/main/Ciulin's%20YouTube.user.js
// @downloadURL  https://github.com/ciulinuwu/ciulin-s-youtube/raw/main/Ciulin's%20YouTube.user.js
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?domain=youtube.com
// @grant unsafeWindow
// @grant GM_addStyle
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_xmlhttpRequest
// @grant GM_registerMenuCommand
// @grant GM_deleteValue
// @grant GM_listValues
// @grant GM_getResourceText
// @grant GM_getResourceURL
// @grant GM_log
// @grant GM_openInTab
// @grant GM_setClipboard
// @grant GM_info
// @grant GM_getMetadata
// @run-at document-load
// ==/UserScript==

(function() {
    'use strict';
    function debug(a) {
        return console.debug(`[Ciulin's YouTube] ${a}`);
    }
    debug("Starting script...")
    document.ciulinYT = {};
    const ciulinYT = {};
    ciulinYT.trackLength = function () {
                var cminute = parseInt(document.ciulinYT.player.getCurrentTime() / 60, 10);
                var csecond = Math.round(document.ciulinYT.player.getCurrentTime() % 60);
                if(csecond < 10) csecond = "0" + csecond;
                document.querySelector("#playbar-progressbar").style.width = document.ciulinYT.player.getCurrentTime() / document.ciulinYT.player.getDuration() * 100 + "%";
                document.querySelector("#playbar-timestamp-current").innerText = cminute + ":" + csecond;
                }

    document.ciulinYT.data = {};
    document.ciulinYT.func = {};
    var BOOL_LOGIN = null;
    var BOOL_SUBSCRIBED = "";

    function waitForElm(selector) {
        return new Promise((resolve, reject) => {
            let el = document.querySelector(selector);
            if (el) {
                resolve(el);
                return
            }
            new MutationObserver((mutationRecords, observer) => {
                Array.from(document.querySelectorAll(selector)).forEach((element) => {
                    resolve(element);
                    observer.disconnect();
                });
            })
                .observe(document.documentElement, {
                childList: true,
                subtree: true
            });
        });
    };

    if(window.location.pathname.split("/")[1] !== "embed"){
        debug("YouTube Type: Not an embed");
        waitForElm("#ytd-player video").then((elm) => {
            elm.pause();
            elm.removeAttribute('src');
            elm.load();
            elm.parentNode.removeChild(elm);
        })


    document.ciulinYT.load = async function(name) {
        if(name == "recent_feed") {
            document.ciulinYT.data.communityPosts = new Promise(async resolve => {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", `https://www.youtube.com/${window.location.pathname}/community`);
                xhr.onload = function(e) {
                    let a = JSON.parse(xhr.response.split("var ytInitialData = ")[1].split(";</script>")[0]).contents.twoColumnBrowseResultsRenderer.tabs;

                    try {
                        a = a.find(a => a.tabRenderer.endpoint.commandMetadata.webCommandMetadata.url.split("/")[3] === 'community');
                    } catch(err) {
                        return resolve(
                            [
                                {text: "This YouTube channel does not have a community tab!", author: "System", timestamp: "Now", image: ""}
                            ]
                        );
                    }
                    if(a.tabRenderer) {
                        var b = a.tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents;
                        var j;
                        var data = {};
                        for (j = 0; j < b.length; j++) {
                            if(!b[j].continuationItemRenderer && !b[j].messageRenderer) {
                                data[j] = {};
                                data[j].text = "";
                                data[j].image = "";
                                if(b[j].backstagePostThreadRenderer.post.backstagePostRenderer.contentText.runs) {
                                    data[j].text = b[j].backstagePostThreadRenderer.post.backstagePostRenderer.contentText.runs[0].text;
                                }
                                if(b[j].backstagePostThreadRenderer.post.backstagePostRenderer.backstageAttachment && b[j].backstagePostThreadRenderer.post.backstagePostRenderer.backstageAttachment.backstageImageRenderer) {
                                    data[j].image = '<img src="' + b[j].backstagePostThreadRenderer.post.backstagePostRenderer.backstageAttachment.backstageImageRenderer.image.thumbnails[0].url + '">';
                                }
                                data[j].author = b[j].backstagePostThreadRenderer.post.backstagePostRenderer.authorText.runs[0].text;
                                data[j].timestamp = b[j].backstagePostThreadRenderer.post.backstagePostRenderer.publishedTimeText.runs[0].text;
                            };
                        };
                        resolve(data);
                    }
                };
                xhr.onerror = function () {
                    console.error("** An error occurred during the XMLHttpRequest");
                };
                xhr.send();
            })

            var posts = await document.ciulinYT.data.communityPosts;
            var string = "";
            var i;

            Object.entries(posts).forEach((entry) => {
                var [key, object] = entry;
                i = parseInt(key) + 1
                var u = `<tr id="feed_divider"><td colspan="3" class="outer-box-bg-as-border divider">&nbsp;</td>`
                if((i) == (Object.keys(posts).length)){
                    u = ``
                }
                var a = `
                <tr id="feed_item" valign="top">
                <td class="feed_icon">
                <img class="master-sprite icon-BUL" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
                </td>
                <td>
                <div class="feed_title">
                <div dir="ltr">
                <span dir="ltr">${object.author}</span>
                <span dir="ltr"></span>
                <span class="bulletin_message">${object.text}</span>
                </div>
                <div>
                ${object.image}
                </div>
                <div>
                <span class="timestamp">(${object.timestamp})</span>
                </div>
                </div>
                </td>
                </tr>
                ${u}</tr>`;
                string += a;
            });
            var DOM = `<div class="inner-box" id="user_recent_activity">
            <div style="zoom:1">
            <div class="box-title title-text-color">Recent Activity</div>
            <div class="cb"></div>
            </div>
            <div id="user_recent_activity-body">
            <div id="feed_table">
            <div class="text-field recent-activity-content outer-box-bg-as-border" style="_width:610px">
            <table width="97%" cellspacing="0" cellpadding="0" border="0">
            <tbody>${string}</tbody>
            </table>
            </div>
            </div>
            </div>
            </div>`

            return DOM;
        };

        if(name == "channel_videos") {
            document.ciulinYT.data.channelVideos = new Promise(async resolve => {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", `https://www.youtube.com/${window.location.pathname}/videos`);
                xhr.onload = function(e) {
                    let a = JSON.parse(xhr.response.split("var ytInitialData = ")[1].split(";</script>")[0]).contents.twoColumnBrowseResultsRenderer.tabs;

                    try {
                        a = a.find(a => a.tabRenderer.endpoint.commandMetadata.webCommandMetadata.url.split("/")[3] === 'videos');
                    } catch(err) {
                        return resolve(
                            [
                                {text: "This YouTube channel does not have a community tab!", author: "System", timestamp: "Now", image: ""}
                            ]
                        );
                    }

                    if(a.tabRenderer) {
                        var b = a.tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].gridRenderer.items;
                        var j;
                        var data = {};
                        for (j = 0; j < b.length; j++) {
                            if(!b[j].continuationItemRenderer) {
                                data[j] = {};
                                data[j].title = b[j].gridVideoRenderer.title.runs[0].text;
                                data[j].videoId = b[j].gridVideoRenderer.videoId;
                                data[j].views = b[j].gridVideoRenderer.viewCountText.simpleText;
                                data[j].date = b[j].gridVideoRenderer.publishedTimeText.simpleText;
                                data[j].duration = b[j].gridVideoRenderer.thumbnailOverlays.find(a => a.thumbnailOverlayTimeStatusRenderer).thumbnailOverlayTimeStatusRenderer.text.simpleText;
                            }
                        };
                        resolve(data);
                    }
                }
                xhr.onerror = function () {
                    console.error("** An error occurred during the XMLHttpRequest");
                };
                xhr.send();
            });

            var videos = await document.ciulinYT.data.channelVideos;
            var string = "";
            var i;

            Object.entries(videos).forEach((entry) => {
                var [key, object] = entry;
                i = parseInt(key) + 1
                var a = `
                <div id="playnav-video-play-uploads-12-${object.videoId}" class="playnav-item playnav-video">
                <div style="display:none" class="encryptedVideoId">${object.videoId}</div>
                <div id="playnav-video-play-uploads-12-${object.videoId}-selector" class="selector"></div>
                <div class="content">
                <div class="playnav-video-thumb">
                <a href="http://www.youtube.com/watch?v=${object.videoId}" onclick="document.ciulinYT.func.loadVideo('${object.videoId}');return false;" class="ux-thumb-wrap contains-addto">
                <span class="video-thumb ux-thumb-96 ">
                <span class="clip">
                <img src="//i1.ytimg.com/vi/${object.videoId}/default.jpg" alt="Thumbnail" class="" onclick="document.ciulinYT.func.loadVideo('${object.videoId}');return false;" title="${object.title}">
                </span>
                </span>
                <span class="video-time">${object.duration}</span>
                <span dir="ltr" class="yt-uix-button-group addto-container short video-actions">
                <button type="button" class="master-sprite start yt-uix-button yt-uix-button-short yt-uix-tooltip" onclick=";return false;" title="" role="button" aria-pressed="false">
                <img class="yt-uix-button-icon-addto" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
                <span class="yt-uix-button-content">
                <span class="addto-label">Add to</span>
                </span>
                </button>
                <button type="button" class="end yt-uix-button yt-uix-button-short yt-uix-tooltip" onclick=";return false;" title="" role="button" aria-pressed="false">
                <img class="yt-uix-button-arrow" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
                </button>
                </span>
                </a>
                </div>
                <div class="playnav-video-info">
                <a href="http://www.youtube.com/watch?v=${object.videoId}" class="playnav-item-title ellipsis" onclick="document.ciulinYT.func.loadVideo('${object.videoId}');return false;" id="playnav-video-title-play-uploads-12-${object.videoId}">
                <span dir="ltr">${object.title}</span>
                </a>
                <div class="metadata">
                <span dir="ltr">${object.views}  -  ${object.date}</span>
                </div>
                <div style="display:none" id="playnav-video-play-uploads-12">${object.videoId}</div>
                </div>
                </div>
                </div>`;
                string += a;
            });

            return string;
        };
    };

    // getCookie (from w3school.org)
    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
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
    //setTimeout(function(){document.querySelectorAll("ytd-topbar-menu-button-renderer.ytd-masthead")[2].click()}, 2s0

    // Get Subscription Data
    function getSubscription() {
        if(window.location.pathname.split("/")[1].match(/channel|user|^c{1}$/i)) {
            var a = document.querySelector(".ytd-subscribe-button-renderer");
            if(!a) return true;
            return a.hasAttribute("subscribed") ? true : false;
        }
        if(window.location.pathname.split("/")[1].match(/watch/i)) {
            return ytInitialData.contents.twoColumnWatchNextResults.results.results.contents[1].videoSecondaryInfoRenderer.owner.videoOwnerRenderer.subscriptionButton.subscribed ? true : false;
        }
    }

    // Build Classic YouTube
    async function buildYouTube() {
        debug("Execute buildYouTube");
        var DOMHTML = document.querySelector("html");

        // DATE
        var TIMEDATE = new Date();
        var ARR_MONTH = TIMEDATE.getMonth();
        if(ARR_MONTH < 10) ARR_MONTH = "0" + ARR_MONTH;
        var ARR_DATE = TIMEDATE.getDate();
        if(ARR_DATE < 10) ARR_DATE = "0" + ARR_DATE;
        var VALUE_DATE = TIMEDATE.getFullYear() + "" + ARR_MONTH + "" + ARR_DATE;

        // LANG
        var VALUE_LANG = DOMHTML.getAttribute("lang");

        // TITLE
        var VALUE_TITLE = "YouTube - Broadcast Yourself.";

        // HTML
        DOMHTML.removeAttribute("style");
        DOMHTML.removeAttribute("standardized-themed-scrollbar");
        DOMHTML.setAttribute("dir", "ltr");
        DOMHTML.setAttribute("xmlns:og", "http://opengraphprotocol.org/schema/");

        // HEAD
        document.querySelector("head").parentNode.removeChild(document.querySelector("head"));
        var DOMHEAD = document.createElement("head");
        DOMHTML.appendChild(DOMHEAD);

        document.title = VALUE_TITLE
        //DOMHEAD.appendChild(document.querySelector("link[rel='search']"))
        DOMHEAD.innerHTML += '<link rel="icon" href="https://s.ytimg.com/yt/favicon-refresh-vfldLzJxy.ico">';
        DOMHEAD.innerHTML += '<link rel="shortcut icon" href="https://s.ytimg.com/yt/favicon-refresh-vfldLzJxy.ico">';
        DOMHEAD.innerHTML += '<link rel="stylesheet" href="//s.ytimg.com/yt/cssbin/www-refresh-vflzVUPsm.css">';
        DOMHEAD.innerHTML += '<link rel="stylesheet" href="//s.ytimg.com/yt/cssbin/www-the-rest-vflNb6rAI.css">';

        // BODY
        var O_DOMBODY = document.querySelector("body");
        var O_DOMBODYNEW = document.createElement("old-body");
        var index;
        while (O_DOMBODY.firstChild) {
            O_DOMBODYNEW.appendChild(O_DOMBODY.firstChild);
        }
        for (index = O_DOMBODY.attributes.length - 1; index >= 0; --index) {
            O_DOMBODYNEW.attributes.setNamedItem(O_DOMBODY.attributes[index].cloneNode());
        }
        O_DOMBODYNEW.style = "display:none";
        O_DOMBODY.parentNode.replaceChild(O_DOMBODYNEW, O_DOMBODY);

        var o_DOMBODY = document.querySelector("old-body");
        var DOMBODY = document.createElement("body");
        DOMBODY.setAttribute("class", "date-" + VALUE_DATE + " " + VALUE_LANG + " ltr thumb-normal");
        DOMBODY.setAttribute("dir", "ltr");
        DOMHTML.appendChild(DOMBODY);

        // Userbar

        // SET USERNAME
        var OBJ_LOGIN = (async function(){
            debug("Cookie Check: Searching for APISID")
            if(!getCookie("APISID")) {
                debug("Cookie Check: Didn't find APISID. User is logged out.");
                var login_url = "https://accounts.google.com/ServiceLogin?service=youtube&uilel=3&passive=true&continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Faction_handle_signin%3Dtrue%26app%3Ddesktop%26hl%3Den%26next%3Dhttps%253A%252F%252Fwww.youtube.com%252F&hl=en&ec=65620";
                BOOL_LOGIN = false;
                return `<div id="masthead-user-bar-container"><div id="masthead-user-bar"><div id="masthead-user"><a class="start" href="https://www.youtube.com/signup">Create Account</a><span class="masthead-link-separator">|</span><a class="end" href="${login_url}">Sign In</a></div></div></div>`;
            }

            debug("Cookie Check: Found APISID")
            var T_OPENAVTAR = await waitForElm("#avatar-btn").then((elm) => {debug("waitForElm: #avatar-btn");document.querySelectorAll("ytd-topbar-menu-button-renderer")[2].click()});
            var T_GETNAME = await waitForElm("#account-name").then((elm) => {debug("waitForElm: #account-name");document.ciulinYT.data.name = elm.innerText;document.ciulinYT.data.link = document.querySelector("ytd-compact-link-renderer #endpoint").href});

            debug(`User Info: [Username: ${document.ciulinYT.data.name}] [Link: ${document.ciulinYT.data.link}]`);

            BOOL_LOGIN = true;
            return `<div id="masthead-user-bar-container"><div id="masthead-user-bar"><div id="masthead-user"><a href="${document.ciulinYT.data.link}">${document.ciulinYT.data.name}</a></div></div></div>`;
        })();
        const OBJ_USER = await OBJ_LOGIN;

        var OBJ_MASTHEAD;
        var OBJ_FOOTER;

        var OBJ_CHANNEL = "";

        // Home Page (WIP)
        if(window.location.pathname == "/") {
            debug("Renderer: Rendering Home Page");
            (function(){
            DOMHEAD.innerHTML += '<link rel="stylesheet" href="//s.ytimg.com/yt/cssbin/www-guide-vflOh_ROh.css">';
            var list_of_videos = ytInitialData.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.richGridRenderer.contents;
            var OBJ_VIDEOS = "";
            var i;
            for (i = 0; i < list_of_videos.length; i++) {
                if(!list_of_videos[i].richSectionRenderer && !list_of_videos[i].continuationItemRenderer && !list_of_videos[i].richItemRenderer.content.displayAdRenderer && !list_of_videos[i].richItemRenderer.content.radioRenderer) {
                    var a = list_of_videos[i].richItemRenderer.content.videoRenderer;
                    OBJ_VIDEOS += `<li class="feed-item-container">
            <div class="feed-item upload">
            <div class="feed-item-content">
            <h3 class="feed-item-title">
            <span class="feed-item-author">
            <a href="http://www.youtube.com${a.ownerText.runs[0].navigationEndpoint.browseEndpoint.canonicalBaseUrl}" class="yt-user-photo">
            <span class="video-thumb ux-thumb ux-thumb-profile-24">
            <span class="clip">
            <span class="clip-inner">
            <img src="${a.channelThumbnailSupportedRenderers.channelThumbnailWithLinkRenderer.thumbnail.thumbnails[0].url}" alt="${a.ownerText.runs[0].text}">
            <span class="vertical-align"></span>
            </span>
            </span>
            </span>
            </a>
            </span>
            <span class="feed-item-owner">
            <a href="http://www.youtube.com${a.ownerText.runs[0].navigationEndpoint.browseEndpoint.canonicalBaseUrl}" class="yt-user-name" dir="ltr">${a.ownerText.runs[0].text}</a>
            </span> ${a.publishedTimeText ? "uploaded" : "is LIVE"} <span class="time-created">${a.publishedTimeText ? a.publishedTimeText.simpleText : ""}</span>
            </h3>
            <div class="feed-item-visual">
            <div class="feed-item-visual-thumb">
            <a class="ux-thumb-wrap contains-addto yt-uix-sessionlink" href="http://www.youtube.com/watch?v=${a.videoId}">
            <span class="video-thumb ux-thumb ux-thumb-288">
            <span class="clip">
            <span class="clip-inner">
            <img src="//i3.ytimg.com/vi/${a.videoId}/hqdefault.jpg" alt="Thumbnail">
            <span class="vertical-align"></span>
            </span>
            </span>
            </span>
            <span class="video-time">${a.thumbnailOverlays[0].thumbnailOverlayTimeStatusRenderer ? a.thumbnailOverlays[0].thumbnailOverlayTimeStatusRenderer.text.simpleText : "LIVE"}</span>
            <button type="button" class="addto-button short video-actions yt-uix-button yt-uix-button-short" onclick=";return false;" role="button">
            <img class="yt-uix-button-icon yt-uix-button-icon-addto" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
            <span class="yt-uix-button-content">
            <span class="addto-label">Add to</span>
            </span>
            <img class="yt-uix-button-arrow" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
            </button>
            </a>
            </div>
            <div class="feed-item-visual-content">
            <div class="feed-item-visual-description">
            <h4>
            <a class="title yt-uix-sessionlink" href="http://www.youtube.com/watch?v=${a.videoId}" dir="ltr">${a.title.runs[0].text}</a>
            </h4>
            <div class="description" dir="ltr">
            <p>${a.descriptionSnippet ? a.descriptionSnippet.runs[0].text : ""}</p>
            </div>
            </div>
            <p class="metadata">
            <a href="http://www.youtube.com${a.ownerText.runs[0].navigationEndpoint.browseEndpoint.canonicalBaseUrl}" class="yt-user-name" dir="ltr">${a.ownerText.runs[0].text}</a>
            <span class="view-count">${a.viewCountText.simpleText ? a.viewCountText.simpleText : a.viewCountText.runs[0].text + a.viewCountText.runs[1].text}</span>
            </p>
            </div>
            </div>
            </div>
            </div>
            </li>`;
                };
            };

            OBJ_CHANNEL = `<div id="content">
            <div class="guide-layout-container enable-fancy-subscribe-button">
            <div class="guide-container">
            <div id="guide-builder-promo">
            <h2>Sign in to customize your homepage</h2>
            <div id="guide-builder-promo-buttons" class="signed-out">
            <button href="https://accounts.google.com/ServiceLogin?uilel=3&amp;service=youtube&amp;passive=true&amp;continue=http%3A%2F%2Fwww.youtube.com%2Fsignin%3Faction_handle_signin%3Dtrue%26nomobiletemp%3D1%26hl%3Den_US%26next%3D%252F%253Ffeature%253Dsignin&amp;hl=en_US&amp;ltmpl=sso" type="button" class=" yt-uix-button yt-uix-button-dark" onclick=";window.location.href=this.getAttribute('href');return false;" role="button">
            <span class="yt-uix-button-content">Sign In </span>
            </button>
            <button href="/signup?next=%2Fchannels%3Ffeature%3Dsignup" type="button" class=" yt-uix-button yt-uix-button-primary" onclick=";window.location.href=this.getAttribute('href');return false;" role="button">
            <span class="yt-uix-button-content">Create Account </span>
            </button>
            </div>
            </div>
            <div class="guide">
            <div class="guide-section yt-uix-expander first ">
            <h3 class="guide-item-container selected-child">
            <a class="guide-item selected" data-feed-name="youtube" data-feed-url="" onclick="document.ciulinYT.func.loadGuideNav(this)">
            <span class="thumb">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="" class="system-icon category">
            </span>
            <span class="display-name">From YouTube</span>
            </a>
            </h3>
            <ul>
            <li class="guide-item-container ">
            <a class="guide-item" data-feed-name="trending" data-feed-url="feed/trending" onclick="document.ciulinYT.func.loadGuideNav(this)">
            <span class="thumb">
            <img class="system-icon system trending" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
            </span>
            <span class="display-name">Trending</span>
            </a>
            </li>
            </ul>
            </div>
            </div>
            </div>
            <div class="guide-background"></div>
            <div id="feed" style="width: 790px;">
            <div id="feed-main-youtube" class="individual-feed">
            <div class="feed-header no-metadata before-feed-content">
            <div class="feed-header-thumb">
            <img class="feed-header-icon youtube" alt="" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
            </div>
            <div class="feed-header-details">
            <h2 class="feed-header-info">From YouTube</h2>
            </div>
            </div>
            <div class="feed-container">
            <div class="feed-page">
            <ul class="feed-list">
            ${OBJ_VIDEOS}
            </ul>
            </div>
            </div>
            </div>
            <div id="feed-error" class="individual-feed hid">
            <p class="feed-message">We were unable to complete the request, please try again later.</p>
            </div>
            <div id="feed-loading-template" class="hid">
            <div class="feed-message">
            <p class="loading-spinner">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
            Loading...
            </p>
            </div>
            </div>
            </div>
            <div id="feed-background" style="width: 790px;"></div>
            </div>
            </div>`;
            setInterval(() => {document.body.style = ""}, 1000);
            })();
        };

        // Watch (WIP)
        if(window.location.pathname.split("/")[1].match(/watch/i)) {
            (async function(){
            var VALUE_VIDEOTITLE = ytInitialData.contents.twoColumnWatchNextResults.results.results.contents[0].videoPrimaryInfoRenderer.title.runs[0].text;
            var VALUE_VIDEODATE = ytInitialData.contents.twoColumnWatchNextResults.results.results.contents[0].videoPrimaryInfoRenderer.dateText.simpleText;
            if(ytInitialData.contents.twoColumnWatchNextResults.results.results.contents[0].videoPrimaryInfoRenderer.dateText.simpleText.split("streaming on")[1]) {
                VALUE_VIDEODATE = ytInitialData.contents.twoColumnWatchNextResults.results.results.contents[0].videoPrimaryInfoRenderer.dateText.simpleText.split("streaming on")[1] ? ytInitialData.contents.twoColumnWatchNextResults.results.results.contents[0].videoPrimaryInfoRenderer.dateText.simpleText.split("streaming on")[1] : ytInitialData.contents.twoColumnWatchNextResults.results.results.contents[0].videoPrimaryInfoRenderer.dateText.simpleText;
            }
            if(ytInitialData.contents.twoColumnWatchNextResults.results.results.contents[0].videoPrimaryInfoRenderer.dateText.simpleText.split("Premiered")[1]) {
                VALUE_VIDEODATE = ytInitialData.contents.twoColumnWatchNextResults.results.results.contents[0].videoPrimaryInfoRenderer.dateText.simpleText.split("Premiered")[1] ? ytInitialData.contents.twoColumnWatchNextResults.results.results.contents[0].videoPrimaryInfoRenderer.dateText.simpleText.split("Premiered")[1] : ytInitialData.contents.twoColumnWatchNextResults.results.results.contents[0].videoPrimaryInfoRenderer.dateText.simpleText;
            }
            var VALUE_CHANNELNAME = ytInitialData.contents.twoColumnWatchNextResults.results.results.contents[1].videoSecondaryInfoRenderer.owner.videoOwnerRenderer.title.runs[0].text;
            var VALUE_CHANNELURL = "https://www.youtube.com" + ytInitialData.contents.twoColumnWatchNextResults.results.results.contents[1].videoSecondaryInfoRenderer.owner.videoOwnerRenderer.navigationEndpoint.browseEndpoint.canonicalBaseUrl;
            var VALUE_VIDEOVIEWS = ytInitialData.contents.twoColumnWatchNextResults.results.results.contents[0].videoPrimaryInfoRenderer.viewCount.videoViewCountRenderer.viewCount.simpleText.split(" ")[0];
            var VALUE_VIDEODESCRIPTIO = ytInitialData.contents.twoColumnWatchNextResults.results.results.contents[1].videoSecondaryInfoRenderer.description ? ytInitialData.contents.twoColumnWatchNextResults.results.results.contents[1].videoSecondaryInfoRenderer.description.runs : "";
            var VALUE_VIDEODESCRIPTION = "";
            var VALUE_VIDEOCATEGORY = ytInitialPlayerResponse.microformat.playerMicroformatRenderer.category;
            var VALUE_VIDEOTAG = ytInitialPlayerResponse.videoDetails.keywords ? ytInitialPlayerResponse.videoDetails.keywords : [];
            var VALUE_VIDEOTAGS = "";
            var isLiked = ytInitialData.contents.twoColumnWatchNextResults.results.results.contents[0].videoPrimaryInfoRenderer.videoActions.menuRenderer.topLevelButtons[0].toggleButtonRenderer.isToggled ? "liked" : "";
            var isDisliked = ytInitialData.contents.twoColumnWatchNextResults.results.results.contents[0].videoPrimaryInfoRenderer.videoActions.menuRenderer.topLevelButtons[1].toggleButtonRenderer.isToggled ? "unliked" : "";
            var i;
            for (i = 0; i < VALUE_VIDEODESCRIPTIO.length; i++) {
                if(VALUE_VIDEODESCRIPTIO[i].navigationEndpoint && VALUE_VIDEODESCRIPTIO[i].navigationEndpoint.urlEndpoint && !VALUE_VIDEODESCRIPTIO[i].loggingDirectives && !VALUE_VIDEODESCRIPTIO[i].watchEndpoint) {
                    var a = VALUE_VIDEODESCRIPTIO[i].navigationEndpoint.urlEndpoint.url.split("q=")[1] ? VALUE_VIDEODESCRIPTIO[i].navigationEndpoint.urlEndpoint.url.split("q=")[1] : VALUE_VIDEODESCRIPTIO[i].navigationEndpoint.urlEndpoint.url;
                    VALUE_VIDEODESCRIPTION += `<a href="${decodeURIComponent(a)}" target="_blank" title="${decodeURIComponent(a)}" rel="nofollow" dir="ltr" class="yt-uix-redirect-link">${decodeURIComponent(a)}</a>`;
                };
                if(VALUE_VIDEODESCRIPTIO[i].text.split("#")[1]) {
                    VALUE_VIDEODESCRIPTION += `<a href="https://www.youtube.com/tags/${VALUE_VIDEODESCRIPTIO[i].text.split("#")[1]}" target="_blank" title="#${VALUE_VIDEODESCRIPTIO[i].text.split("#")[1]}" rel="nofollow" dir="ltr" class="yt-uix-redirect-link">#${VALUE_VIDEODESCRIPTIO[i].text.split("#")[1]}</a>`;
                };
                if(VALUE_VIDEODESCRIPTIO[i].loggingDirectives && VALUE_VIDEODESCRIPTIO[i].text.split("@")[1]) {
                    VALUE_VIDEODESCRIPTION += `<a href="https://www.youtube.com${VALUE_VIDEODESCRIPTIO[i].navigationEndpoint.browseEndpoint.canonicalBaseUrl}" target="_blank" title="${VALUE_VIDEODESCRIPTIO[i].text}" rel="nofollow" dir"ltr" class="yt-utx-redirect-link">${VALUE_VIDEODESCRIPTIO[i].text}</a>`;
                };
                if(!VALUE_VIDEODESCRIPTIO[i].navigationEndpoint && !VALUE_VIDEODESCRIPTIO[i].loggingDirectives) {
                    VALUE_VIDEODESCRIPTION += VALUE_VIDEODESCRIPTIO[i].text;
                };
                if(VALUE_VIDEODESCRIPTIO[i].navigationEndpoint && VALUE_VIDEODESCRIPTIO[i].navigationEndpoint.watchEndpoint) {
                    VALUE_VIDEODESCRIPTION += `<a href="https://youtu.be/${VALUE_VIDEODESCRIPTIO[i].navigationEndpoint.watchEndpoint.videoId}" target="_blank" title="https://youtu.be/${VALUE_VIDEODESCRIPTIO[i].navigationEndpoint.watchEndpoint.videoId}" rel="nofollow" dir="ltr" class="yt-uix-redirect-link">https://youtu.be/${VALUE_VIDEODESCRIPTIO[i].navigationEndpoint.watchEndpoint.videoId}</a>`;
                }
            };
            for (i = 0; i < VALUE_VIDEOTAG.length; i++) {
                VALUE_VIDEOTAGS += `<li><a href="https://www.youtube.com/results?search_query=${VALUE_VIDEOTAG[i]}&amp;search=tag">${VALUE_VIDEOTAG[i]}</a></li>`;
            }
            VALUE_VIDEODESCRIPTION = VALUE_VIDEODESCRIPTION.replace(/(?:\r\n|\r|\n)/g, '<br>');
            var JSONDEFER = ytInitialData.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results[1].itemSectionRenderer ? ytInitialData.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results[1].itemSectionRenderer.contents : ytInitialData.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results;
            var VALUE_SUGGESTEDVIDEO = JSONDEFER;
            var OBJ_SUGGESTEDVIDEOS = "";
            for (i = 0; i < VALUE_SUGGESTEDVIDEO.length; i++) {
                if(!VALUE_SUGGESTEDVIDEO[i].continuationItemRenderer && VALUE_SUGGESTEDVIDEO[i].compactVideoRenderer) {
                    console.debug(VALUE_SUGGESTEDVIDEO[i])
                OBJ_SUGGESTEDVIDEOS += `<li class="video-list-item">
            <a href="https://www.youtube.com/watch?v=${VALUE_SUGGESTEDVIDEO[i].compactVideoRenderer.videoId}" class="video-list-item-link">
            <span class="ux-thumb-wrap contains-addto">
            <span class="video-thumb ux-thumb ux-thumb-110">
            <span class="clip">
            <img src="//i1.ytimg.com/vi/${VALUE_SUGGESTEDVIDEO[i].compactVideoRenderer.videoId}/default.jpg" alt="Thumbnail">
            </span>
            </span>
            <span class="video-time">${VALUE_SUGGESTEDVIDEO[i].compactVideoRenderer.lengthText ? VALUE_SUGGESTEDVIDEO[i].compactVideoRenderer.lengthText.simpleText : "LIVE"}</span>
            <button type="button" class="addto-button short video-actions yt-uix-button yt-uix-button-short" onclick=";return false;" role="button">
            <img class="yt-uix-button-icon yt-uix-button-icon-addto" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
            <span class="yt-uix-button-content">
            <span class="addto-label">Add to</span>
            </span>
            <img class="yt-uix-button-arrow" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
            </button>
            </span>
            <span dir="ltr" class="title" title="${VALUE_SUGGESTEDVIDEO[i].compactVideoRenderer.title.simpleText}">${VALUE_SUGGESTEDVIDEO[i].compactVideoRenderer.title.simpleText}</span>
            <span class="stat">by ${VALUE_SUGGESTEDVIDEO[i].compactVideoRenderer.shortBylineText.runs[0].text}</span>
            <span class="stat view-count">${VALUE_SUGGESTEDVIDEO[i].compactVideoRenderer.viewCountText.simpleText ? VALUE_SUGGESTEDVIDEO[i].compactVideoRenderer.viewCountText.simpleText : VALUE_SUGGESTEDVIDEO[i].compactVideoRenderer.viewCountText.runs[0].text + VALUE_SUGGESTEDVIDEO[i].compactVideoRenderer.viewCountText.runs[1].text}</span>
            </a>
            </li>`;
                }
            }
            var VALUE_SUBBUTTON = getSubscription() ? "subscribed" : "subscribe";

            OBJ_CHANNEL = `<div id="content" class="">
            <div id="watch-container" itemscope="" itemtype="http://schema.org/VideoObject">
            <div id="watch-headline-container">
            <div id="watch-headline" class="watch-headline">
            <h1 id="watch-headline-title">
            <span id="eow-title" class="" dir="ltr" title="${VALUE_VIDEOTITLE}">
            ${VALUE_VIDEOTITLE}
            </span>
            </h1>
            <div id="watch-headline-user-info">
            <span class="yt-uix-button-group">
            <button href="${VALUE_CHANNELURL}?feature=watch" type="button" class="start yt-uix-button" onclick=";window.location.href=this.getAttribute('href');return false;" role="button">
            <span class="yt-uix-button-content">${VALUE_CHANNELNAME}</span>
            </button>
            <div class="yt-subscription-button-hovercard yt-uix-hovercard">
            <button href="" type="button" class="yt-subscription-button yt-subscription-button-js-default end yt-uix-button ${VALUE_SUBBUTTON}" onclick="document.ciulinYT.func.subscribe();return false;" role="button">
            <img class="yt-uix-button-icon yt-uix-button-icon-subscribe" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
            <span class="yt-uix-button-content">
            <span class="subscribe-label">Subscribe</span>
            <span class="subscribed-label">Subscribed</span>
            <span class="unsubscribe-label">Unsubscribe</span>
            </span>
            </button>
            <div class="yt-uix-hovercard-content hid">
            <p class="loading-spinner">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
            Loading...
            </p>
            </div>
            </div>
            </span>
            </div>
            <div id="watch-more-from-user" class="collapsed">
            <div id="watch-channel-discoverbox" class="yt-rounded">
            <span id="watch-channel-loading">Loading...</span>
            </div>
            </div>
            </div>
            </div>
            <div id="watch-video-container">
            <div id="watch-video" style="position:inherit">
            <div id="video-player"></div>
            </div>
            </div>
            <div id="watch-main-container">
            <div id="watch-main">
            <div id="watch-panel">
            <div id="watch-actions">
            <div id="watch-actions-right">
            <span class="watch-view-count">
            <strong>${VALUE_VIDEOVIEWS}</strong>
            </span>
            <button onclick=";return false;" title="Show video statistics" type="button" id="watch-insight-button" class="yt-uix-tooltip yt-uix-tooltip-reverse yt-uix-button yt-uix-tooltip yt-uix-button-empty" data-button-action="yt.www.watch.actions.stats" role="button">
            <img class="yt-uix-button-icon yt-uix-button-icon-watch-insight" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Show video statistics">
            </button>
            </div>
            <span id="watch-like-unlike" class="yt-uix-button-group">
            <button onclick="document.ciulinYT.func.likeThis();return false;" title="I like this" type="button" class="start yt-uix-tooltip-reverse yt-uix-button yt-uix-tooltip ${isLiked}" id="watch-like" role="button">
            <img class="yt-uix-button-icon yt-uix-button-icon-watch-like" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="I like this">
            <span class="yt-uix-button-content">Like</span>
            </button>
            <button onclick="document.ciulinYT.func.dislikeThis();return false;" title="I dislike this" type="button" class="end yt-uix-tooltip-reverse yt-uix-button yt-uix-tooltip yt-uix-button-empty ${isDisliked}" id="watch-unlike" role="button">
            <img class="yt-uix-button-icon yt-uix-button-icon-watch-unlike" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="I dislike this">
            </button>
            </span>
            <button onclick=";return false;" title="Add to favorites or playlist" type="button" class="addto-button watch show-label yt-uix-tooltip-reverse yt-uix-button yt-uix-tooltip" id="watch-addto-button" data-button-menu-id="some-nonexistent-id" data-video-ids="2mMWz9evo-s" data-button-action="yt.www.watch.actions.showSigninOrCreateChannelWarning" data-feature="watch" role="button">
            <img class="yt-uix-button-icon yt-uix-button-icon-addto" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Add to favorites or playlist">
            <span class="yt-uix-button-content">
            <span class="addto-label">Add to</span>
            </span>
            <img class="yt-uix-button-arrow" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
            </button>
            <button onclick=";return false;" title="Share or embed this video" type="button" class="yt-uix-tooltip-reverse yt-uix-button yt-uix-tooltip" id="watch-share" data-button-action="yt.www.watch.actions.share" role="button"><span class="yt-uix-button-content">Share</span>
            </button>
            <button onclick=";return false;" title="Flag as inappropriate" type="button" class="yt-uix-tooltip-reverse yt-uix-button yt-uix-tooltip yt-uix-button-empty" id="watch-flag" data-button-action="yt.www.watch.actions.flag" role="button">
            <img class="yt-uix-button-icon yt-uix-button-icon-watch-flag" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Flag as inappropriate">
            </button>
            </div>
            <div id="watch-actions-area-container" class="hid">
            <div id="watch-actions-area" class="yt-rounded">
            <div id="watch-actions-loading" class="watch-actions-panel hid">Loading...</div>
            <div id="watch-actions-logged-out" class="watch-actions-panel hid">
            <div class="yt-alert yt-alert-warn yt-alert-small yt-alert-naked yt-rounded ">
            <span class="yt-alert-icon">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" class="icon master-sprite" alt="Alert icon">
            </span>
            <div class="yt-alert-content">
            <strong>
            <a href="https://accounts.google.com/ServiceLogin?uilel=3&amp;service=youtube&amp;passive=true&amp;continue=http%3A%2F%2Fwww.youtube.com%2Fsignin%3Faction_handle_signin%3Dtrue%26nomobiletemp%3D1%26hl%3Den_US%26next%3Dhttp%253A%252F%252Fwww.youtube.com%252Fwatch%253Fv%253D2mMWz9evo-s&amp;hl=en_US<mpl=sso">Sign In</a> or <a href="https://www.youtube.com/signup?next=http%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D2mMWz9evo-s">Sign Up</a> now!
            </strong>
            </div>
            </div>
            </div>
            <div id="watch-actions-error" class="watch-actions-panel hid">
            <div class="yt-alert yt-alert-error yt-alert-small yt-alert-naked yt-rounded ">
            <span class="yt-alert-icon">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" class="icon master-sprite" alt="Alert icon">
            </span>
            <div id="watch-error-string" class="yt-alert-content"></div>
            </div>
            </div>
            <div id="watch-actions-share" class="watch-actions-panel hid"></div>
            <div id="watch-actions-ajax" class="watch-actions-panel hid"></div>
            <div class="close">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" class="close-button" onclick="yt.www.watch.actions.hide();">
            </div>
            </div>
            </div>
            <div id="watch-info">
            <div id="watch-description" class="watch-expander yt-uix-expander" data-expander-action="yt.www.watch.watch5.handleToggleDescription">
            <div id="watch-description-clip">
            <p id="watch-uploader-info">Uploaded by <a href="${VALUE_CHANNELURL}" class="yt-user-name author" rel="author" dir="ltr">${VALUE_CHANNELNAME}</a> on <span id="eow-date" class="watch-video-date">${VALUE_VIDEODATE}</span></p>
            <div id="watch-description-text">
            <p id="eow-description">${VALUE_VIDEODESCRIPTION}</p>
            </div>
            <div id="watch-description-extras">
            <h4>Category:</h4>
            <p id="eow-category"><a href="//www.youtube.com/videos">${VALUE_VIDEOCATEGORY}</a></p>
            <h4>Tags:</h4>
            <ul id="eow-tags" class="watch-info-tag-list">
            ${VALUE_VIDEOTAGS}
            </ul>
            <h4>License:</h4>
            <p id="eow-reuse">Standard YouTube License</p>
            </div>
            </div>
            <div id="watch-description-fadeout"></div>
            <ul id="watch-description-extra-info">
            <li>
            <div class="watch-sparkbars" style="background-color:red">
            <div class="watch-sparkbar-likes"></div>
            </div>
            <span class="watch-likes-dislikes">
            <span class="likes"></span> likes, <span class="dislikes"></span> dislikes
            </span>
            </li>
            </ul>
            <div class="horizontal-rule ">
            <span class="first"></span>
            <span class="second"></span>
            <span class="third"></span>
            </div>
            <div id="watch-description-toggle" class="yt-uix-expander-head">
            <div id="watch-description-expand" class="expand">
            <button type="button" class="metadata-inline yt-uix-button yt-uix-button-text" onclick=";return false;" role="button">
            <span class="yt-uix-button-content">Show more <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Show more"></span>
            </button>
            </div>
            <div id="watch-description-collapse" class="collapse">
            <button type="button" class="metadata-inline yt-uix-button yt-uix-button-text" onclick=";return false;" role="button">
            <span class="yt-uix-button-content">Show less <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Show less"></span>
            </button>
            </div>
            </div>
            </div>
            </div>
            </div>
            <div id="watch-sidebar">
            <div class="watch-sidebar-section ">
            <div id="watch-related-container" class="watch-sidebar-body">
            <ul id="watch-related" class="video-list">
            ${OBJ_SUGGESTEDVIDEOS}
            </ul>
            <p class="content"></p>
            </div>
            </div>
            <span class="vertical-rule-main"></span>
            <span class="vertical-rule-corner-top"></span>
            <span class="vertical-rule-corner-bottom"></span>
            </div>
            <div class="clear"></div>
            </div>
            <div style="visibility: hidden; height: 0px; padding: 0px; overflow: hidden;">
            <div id="baseDiv"></div>
            </div>
            </div>
            </div>
            </div>`;
            })();
        }

        // Channel (WIP)
        if(window.location.pathname.split("/")[1].match(/channel|user|^c{1}$/i)) {
            var FUNC = (async function(){
            if (/community|videos|about|channels|playlists|membership|store/.test(window.location.pathname.split("/")[3])) window.location.href = window.location.pathname.split("/").slice(0,3).join("/")
            const channelData = await new Promise(resolve => {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", `https://www.youtube.com/${window.location.pathname}/about`)
                xhr.onload = function(e) {
                    var a = JSON.parse(xhr.response.split("var ytInitialData = ")[1].split(";</script>")[0]).contents.twoColumnBrowseResultsRenderer.tabs;
                    var i;
                    for (i = 0; i < a.length; i++) {
                        if(!a[i].expandableTabRenderer && a[i].tabRenderer.endpoint.commandMetadata.webCommandMetadata.url.split("/")[3] == "about") {
                            var longmf = a[i].tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].channelAboutFullMetadataRenderer.joinedDateText;
                            var bitchmf = a[i].tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].channelAboutFullMetadataRenderer.viewCountText;
                            var smh = a[i].tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].channelAboutFullMetadataRenderer.country;
                            var data = {};
                            data.viewers = bitchmf ? bitchmf.simpleText.split(" ")[0] : "None";
                            data.creationdate = longmf ? longmf.runs[1].text : "Unknown";
                            data.country = smh ? smh.simpleText : "None";
                            resolve(data);
                        }
                    }
                };
                xhr.onerror = function () {
                    resolve(undefined);
                    console.error("** An error occurred during the XMLHttpRequest");
                };
                xhr.send();
            })

            var VALUE_CHANNELNAME = ytInitialData.metadata.channelMetadataRenderer.title;
            var VALUE_CHANNELICON = ytInitialData.metadata.channelMetadataRenderer.avatar.thumbnails[0].url;
            var VALUE_CHANNELURL = window.location.href;
            var VALUE_SUBSCRIBE;
            var VALUE_DESCRIPTION;
            var OBJ_SUBSCRIBE;
            var OBJ_PLAYNAV;
            var OBJ_CHANCON;
            var OBJ_RECENTACT;
            var OBJ_RECENTOBJ;
            var OBJ_LEFTCOLL;
            var OBJ_RIGHTCOLL;
            var OBJ_USERPROFILE;
            var OBJ_PROFILEINFONAME = "";
            // Append stylesheet
            DOMHEAD.innerHTML += '<link rel="stylesheet" href="//s.ytimg.com/yt/cssbin/www-channel_new-vflrWkVe_.css">';

            // Modify title
            o_DOMBODY.querySelector("title").parentNode.removeChild(o_DOMBODY.querySelector("title"));
            DOMHEAD.appendChild(document.createElement("title"));
            setInterval(function(){document.head.querySelector("title").innerText = `${VALUE_CHANNELNAME}'s Channel - YouTube`}, 100);

            //if(VALUE_CHANNELNAME !== VALUE_USERNAME) {
                OBJ_SUBSCRIBE = getSubscription() ? "Subscribed" : "Subscribe";
            //}

            document.ciulinYT.data.subcount = "0";

            try {
                var VALUE_SUBSCRIB = await waitForElm("#subscriber-count").then((elm) => {document.ciulinYT.data.subcount = elm.innerText.split(" ")[0]});
            } catch(err) {
                console.debug("A");
            };
            VALUE_SUBSCRIBE = document.ciulinYT.data.subcount;
            if(VALUE_SUBSCRIBE.match(/K/)) {
                if(VALUE_SUBSCRIBE.match(/\./)) {
                    VALUE_SUBSCRIBE = VALUE_SUBSCRIBE.replace(/\./, "").replace(/K/, "00").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
            }
            if(VALUE_SUBSCRIBE.match(/M/)) {
                if(VALUE_SUBSCRIBE.match(/\d{3}/)) {
                    VALUE_SUBSCRIBE = VALUE_SUBSCRIBE.replace(/\./, "").replace(/M/, "000000").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                if(VALUE_SUBSCRIBE.match(/\d{2,3}\.\d{1,2}/)) {
                    VALUE_SUBSCRIBE = VALUE_SUBSCRIBE.replace(/\./, "").replace(/M/, "00000").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                if(VALUE_SUBSCRIBE.match(/\d{1,3}/)) {
                    VALUE_SUBSCRIBE = VALUE_SUBSCRIBE.replace(/\./, "").replace(/M/, "0000").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
            }

            VALUE_DESCRIPTION = ytInitialData.metadata.channelMetadataRenderer.description;
            VALUE_DESCRIPTION = VALUE_DESCRIPTION.replace(/\n/g, "<br />");

            // Check if /user/
            if(window.location.href.match(/\/user/i)) {
                OBJ_PROFILEINFONAME = `<div class="show_info outer-box-bg-as-border">
            <div class="profile-info-label">Name:</div>
            <div class="profile-info-value" id="profile_show_viewed_count">${VALUE_CHANNELNAME}</div>
            <div class="cb"></div>
            </div>`;

                VALUE_CHANNELNAME = window.location.href.split("/user/")[1];
            }

            OBJ_USERPROFILE = `<div id="user_profile" class="inner-box">
            <div class="box-title title-text-color">Profile</div>
            <div class="cb"></div>
            <div id="user_profile-body">
            <div class="profile_info vcard">
            ${OBJ_PROFILEINFONAME}
            <div class="show_info outer-box-bg-as-border">
            <div class="profile-info-label">Channel Views:</div>
            <div class="profile-info-value" id="profile_show_viewed_count">${channelData.viewers}</div>
            <div class="cb"></div>
            </div>
            <div class="show_info outer-box-bg-as-border">
            <div class="profile-info-label">Joined:</div>
            <div class="profile-info-value" id="profile_show_member_since">${channelData.creationdate}</div>
            <div class="cb"></div>
            </div>
            <div class="show_info outer-box-bg-as-border">
            <div class="profile-info-label">Subscribers:</div>
            <div class="profile-info-value" id="profile_show_subscriber_count">${VALUE_SUBSCRIBE}</div>
            <div class="cb"></div>
            </div>
            <div class="show_info outer-box-bg-as-border">
            <div class="profile-info-label">Country:</div>
            <div class="profile-info-value" id="profile_show_subscriber_count">${channelData.country}</div>
            <div class="cb"></div>
            </div>
            <div class="show_info outer-box-bg-as-border" style="border-bottom-width:1px;margin-bottom:4px;line-height:140%" dir="ltr">${VALUE_DESCRIPTION}</div>
            </div>
            </div>
            <div class="cb"></div>
            </div>`

            OBJ_LEFTCOLL = `<div class="left-column" id="main-channel-left">
            <div class="inner-box">
            <div style="float:left;padding:0 4px 4px 0" class="link-as-border-color">
            <div class="user-thumb-xlarge">
            <div>
            <a href="${VALUE_CHANNELURL}"><img src="${VALUE_CHANNELICON}"></a>
            </div>
            </div>
            </div>
            <div style="float:left;width:170px">
            <div class="box-title title-text-color" title="${VALUE_CHANNELNAME}" style="float:none;padding-left:4px;margin-top:-2px;width:170px;overflow:hidden;font-size:111%">
            <span class="yt-user-name" dir="ltr">${VALUE_CHANNELNAME}</span>
            </div>
            <div style="whitespace:no-wrap;position:relative;width:170px;">
            <div>
            <span class="subscription-container">
            <button type="button" class="subscribe-button yt-uix-button yt-uix-button-urgent yt-uix-tooltip" onclick="document.ciulinYT.func.subscribe();return false;" title="Click to be notified of new videos from this channel" role="button">
            <span class="yt-uix-button-content">${OBJ_SUBSCRIBE}</span>
            <img class="yt-uix-button-arrow" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
            </button>
            </span>
            </div>
            </div>
            </div>
            <div class="cb"></div>
            </div>
            ${OBJ_USERPROFILE}
            </div>`;
            try {
                OBJ_RECENTACT = await document.ciulinYT.load("recent_feed")
            } catch(err) {
                OBJ_RECENTACT = "<p>Recent Feed cannot be init!</p>"
            }

            OBJ_RIGHTCOLL = `<div class="right-column" id="main-channel-right">
            ${OBJ_RECENTACT}
            <div class="clear"></div>
            </div>`

            OBJ_CHANCON = `<div class="outer-box" id="main-channel-content" style="z-index: 0">
            ${OBJ_LEFTCOLL}${OBJ_RIGHTCOLL}
            <div class="cb"></div>
            </div>`;

            var OBJ_HOMEVIDEO = ytInitialData.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].channelVideoPlayerRenderer;
            var dec = "";

            if(OBJ_HOMEVIDEO) {
                dec = OBJ_HOMEVIDEO.description ? OBJ_HOMEVIDEO.description.runs[0].text : "";
                document.querySelector("old-body").querySelector("ytd-player").parentNode.removeChild(document.querySelector("old-body").querySelector("ytd-player"))
            } else {
                OBJ_HOMEVIDEO = {};
                OBJ_HOMEVIDEO.videoId = "";
                OBJ_HOMEVIDEO.title = {};
                OBJ_HOMEVIDEO.title.runs = [{text: ""}];
                OBJ_HOMEVIDEO.publishedTimeText = {};
                OBJ_HOMEVIDEO.publishedTimeText.runs = [{"text": ""}];
                OBJ_HOMEVIDEO.viewCountText = {};
                OBJ_HOMEVIDEO.viewCountText.simpleText = "";
            }

            var OBJ_VIDEOS = "";
            try {
                OBJ_VIDEOS = await document.ciulinYT.load("channel_videos");
            } catch(err) {
                OBJ_VIDEOS = "<p>Videos cannot be loaded</p>";
            };

            var OBJ_PLAYNAVA = `<div id="playnav-body">
            <div id="playnav-player" class="playnav-player-container" style="visibility: visible; left: 0px;">
            <div id="video-player"></div>
            </div>
            <div id="playnav-playview" class="" style="display: block;">
            <div id="playnav-left-panel" style="display: block;">
            <div class="playnav-player-container"></div>
            <div id="playnav-video-details">
            <div id="playnav-bottom-links">
            <div id="playnav-bottom-links-clip" class="playnav-bottom-links-clip">
            <table>
            <tbody>
            <tr>
            <td id="playnav-panel-tab-info" class="panel-tab-selected">
            <table class="panel-tabs">
            <tbody>
            <tr>
            <td class="panel-tab-title-cell">
            <div class="playnav-panel-tab-icon" id="panel-icon-info" onclick="playnav.selectPanel('info')"></div>
            <div class="playnav-bottom-link" id="info-bottom-link">
            <a href="javascript:;" onclick="playnav.selectPanel('info')">Info</a>
            </div>
            <div class="spacer">&nbsp;</div>
            </td>
            </tr>
            <tr>
            <td class="panel-tab-indicator-cell inner-box-opacity">
            <div class="panel-tab-indicator-arrow" style="border-bottom-color: rgb(238, 238, 255) !important;"></div>
            </td>
            </tr>
            </tbody>
            </table>
            </tr>
            </tbody>
            </table>
            </div>
            <div class="cb"></div>
            <div class="playnav-video-panel inner-box-colors border-box-sizing" style="background-color: rgb(238, 238, 255); color: rgb(51, 51, 51);">
            <div id="playnav-video-panel-inner" class="playnav-video-panel-inner border-box-sizing" style="overflow: auto;">
            <div id="playnav-panel-info" class="scrollable" style="display: block;">
            <div id="channel-like-action">
            <div id="channel-like-buttons">
            <button title="I like this" type="button" class="master-sprite yt-uix-button yt-uix-tooltip" onclick="window.location.href = 'https://www.youtube.com/watch?v=${OBJ_HOMEVIDEO.videoId}';return false;" id="watch-like" role="button" aria-pressed="false">
            <img class="yt-uix-button-icon-watch-like" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
            <span class="yt-uix-button-content">Like</span>
            </button>
        &nbsp;
        <button title="I dislike this" type="button" class="master-sprite yt-uix-button yt-uix-tooltip" onclick="window.location.href = 'https://www.youtube.com/watch?v=${OBJ_HOMEVIDEO.videoId}';return false;" id="watch-unlike" role="button" aria-pressed="false">
        <img class="yt-uix-button-icon-watch-unlike" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
        </button>
      </div>
    </div>

  <div id="playnav-curvideo-title" class="inner-box-link-color" dir="ltr">

    <a style="cursor:pointer;margin-right:7px" href="/watch?v=${OBJ_HOMEVIDEO ? OBJ_HOMEVIDEO.videoId : ""}" onmouseover="this.style.textDecoration='underline'" onmouseout="this.style.textDecoration='none'">
      ${OBJ_HOMEVIDEO ? OBJ_HOMEVIDEO.title.runs[0].text : ""}
    </a>
  </div>

  <div id="playnav-curvideo-info-line">
From: <span id="playnav-curvideo-channel-name"><a href="${window.location.href}">${ytInitialData.metadata.channelMetadataRenderer.title}</a></span>&nbsp;|
    <span dir="ltr">${OBJ_HOMEVIDEO ? OBJ_HOMEVIDEO.publishedTimeText.runs[0].text : ""}</span>
      &nbsp;|
        <span id="playnav-curvideo-view-count">${OBJ_HOMEVIDEO ? OBJ_HOMEVIDEO.viewCountText.simpleText.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""}</span>
  </div>

  <div class="cb"></div>

    <div id="channel-like-result" class="hid">
      <div id="watch-actions-area" class="yt-rounded">&nbsp;</div>
    </div>
    <div id="channel-like-loading" class="hid">Loading...</div>
    <div class="cb"></div>

  <div id="playnav-curvideo-description-container">
    <div id="playnav-curvideo-description" dir="ltr">${OBJ_HOMEVIDEO ? dec : ""}
    </div>
  </div>

  <a href="http://www.youtube.com/watch?v=${OBJ_HOMEVIDEO ? OBJ_HOMEVIDEO.videoId : ""}" id="playnav-watch-link" onclick="playnav.goToWatchPage()">View comments, related videos, and more</a>


  <div id="playnav-curvideo-controls">
  </div>

  <div class="cb"></div>
</div>

          <div id="playnav-panel-comments" class="hid"></div>

        <div id="playnav-panel-favorite" class="hid"></div>
        <div id="playnav-panel-share" class="hid scrollable"></div>
        <div id="playnav-panel-playlists" class="hid"></div>
        <div id="playnav-panel-flag" class="hid scrollable"></div>
      </div>
    </div>
  </div>

            </div>
          </div>
            <div id="playnav-play-panel">



    <div id="playnav-play-content" style="height: 601px;">
        <div class="playnav-playlist-holder" id="playnav-play-playlist-uploads-holder">
                  <div id="playnav-play-uploads-scrollbox" style="background-color: rgb(238, 238, 255); color: rgb(51, 51, 51);" class="scrollbox-wrapper inner-box-colors">
    <div class="scrollbox-content playnav-playlist-non-all">


      <div class="scrollbox-body" style="height: 514px;">
        <div class="outer-scrollbox">
          <div id="playnav-play-uploads-items" class="inner-scrollbox">


                <div id="playnav-play-uploads-page-0" class="scrollbox-page loaded videos-rows-50">
${OBJ_VIDEOS}
  <div id="uploads-cb" class="cb"></div>

                </div>

          </div>

        </div>
      </div>
    </div>
  </div>



        </div>
    </div>
  </div>





        </div>

      </div>`

            OBJ_PLAYNAV = `<div id="user_playlist_navigator" style="background-color: rgb(153, 153, 153); color: rgb(0, 0, 0);" class="outer-box yt-rounded">
            <div id="playnav-channel-header" class="inner-box-bg-color" style="background-color: rgb(238, 238, 255); color: rgb(51, 51, 51);">
            <div id="playnav-title-bar">
            <div id="playnav-channel-name" style="background-color: rgb(153, 153, 153); color: rgb(0, 0, 0);" class="outer-box-bg-color">
            <div class="channel-thumb-holder outer-box-color-as-border-color"><div class="user-thumb-semismall">
            <div>
            <img src="${VALUE_CHANNELICON}">
            </div>
            </div>
            </div>
            <div class="channel-title-container">
            <div class="channel-title outer-box-color" id="channel_title" dir="ltr">${VALUE_CHANNELNAME}</div>
            <div class="channel-title outer-box-color" style="font-size:11px" id="channel_base_title">${VALUE_CHANNELNAME}'s Channel</div>
            </div>
            <div id="subscribe-buttons">
            <span class="subscription-container">
            <button type="button" class="subscribe-button yt-uix-button yt-uix-button-urgent yt-uix-tooltip" onclick="document.ciulinYT.func.subscribe();return false;" title="Click to be notified of new videos from this channel" role="button" data-tooltip-text="Click to be notified of new videos from this channel">
            <span class="yt-uix-button-content">${OBJ_SUBSCRIBE}</span>
            </button>
            <span class="subscription-subscribed-container hid">
            <span class="subscription-options-button subscription-expander yt-uix-expander yt-uix-expander-collapsed">
            <span class="yt-uix-expander-head yt-rounded">
            <button class="yt-uix-expander-arrow" onclick="return false;">
            </button>
            <span class="yt-alert yt-alert-success yt-alert-small yt-alert-naked yt-rounded">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" class="icon" alt="Alert icon">
            <span class="yt-alert-content">Subscribed</span>
            </span>
            </span>
            </span>
            </span>
            </span>
            </div>
            </div>
            <div id="playnav-chevron" style="border-left-color: rgb(153, 153, 153);">&nbsp;</div>
            </div>
            <div id="playnav-navbar">
            <table>
            <tbody>
            <tr>
            <td>
            <a class="navbar-tab inner-box-link-color navbar-tab-selected" id="playnav-navbar-tab-playlists">Uploads</a>
            </td>
            </tr>
            </tbody>
            </table>
            </div>
            <div class="cb"></div>
            </div>
            ${OBJ_PLAYNAVA}
            </div>`

            return `<div id="channel-body" style="background-color: rgb(204, 204, 204)" class="jsloaded">
            <div id="channel-base-div">
            ${OBJ_PLAYNAV}
            ${OBJ_CHANCON}
            </div>
            </div>
            <div class="cb">
            <div class="clear"></div>
            </div>`
            })();
            OBJ_CHANNEL = await FUNC;
        };

        // Search Results
        if(window.location.pathname.split("/")[1].match(/results/i)) {
            (function(){
            var searchpar = (new URL(document.location)).searchParams.get("search_query");
            var i;
            var results = ytInitialData.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0].itemSectionRenderer.contents;
            var parse = "";
            DOMHEAD.innerHTML += '<link rel="stylesheet" href="//s.ytimg.com/yt/cssbin/www-refresh-vflj_nHFo.css">';

            for(i = 0; i < results.length; i++) {
                // Handle Videos
                if(results[i].videoRenderer) {
                    let description = results[i].videoRenderer.detailedMetadataSnippets ? results[i].videoRenderer.detailedMetadataSnippets[0].snippetText.runs[0].text : "";
                    let time = results[i].videoRenderer.lengthText ? results[i].videoRenderer.lengthText.simpleText : "LIVE";
                    let views = "";
                    if(results[i].videoRenderer.viewCountText) {
                        views = results[i].videoRenderer.viewCountText.simpleText ? results[i].videoRenderer.viewCountText.simpleText : results[i].videoRenderer.viewCountText.runs[0].text + results[i].videoRenderer.viewCountText.runs[1].text;
                    }
                    console.debug(results[i].videoRenderer)

                    let pub = results[i].videoRenderer.publishedTimeText ? results[i].videoRenderer.publishedTimeText.simpleText: "";
                    let main = `<div class="result-item yt-uix-tile yt-tile-default *sr">
            <div class="thumb-container">
            <a href="http://www.youtube.com/watch?v=${results[i].videoRenderer.videoId}" class="ux-thumb-wrap contains-addto result-item-thumb">
            <span class="video-thumb ux-thumb ux-thumb-128">
            <span class="clip" style="height: auto;width: auto;">
            <span class="clip-inner">
            <img alt="Thumbnail" src="${results[i].videoRenderer.thumbnail.thumbnails[0].url}" data-group-key="thumb-group-1" style="position: static">
            <span class="vertical-align">
            </span>
            </span>
            </span>
            </span>
            <span class="video-time">${time}</span>
            <button onclick=";return false;" title="Watch Later" type="button" class="addto-button video-actions addto-watch-later-button-sign-in yt-uix-button yt-uix-button-default yt-uix-button-short yt-uix-tooltip" role="button">
            <span class="yt-uix-button-content">
            <span class="addto-label">Watch Later</span>
            <span class="addto-label-error">Error</span>
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
            </span>
            <img class="yt-uix-button-arrow" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""></button>
            </a>
            </div>
            <div class="result-item-main-content">
            <h3>
            <a href="http://www.youtube.com/watch?v=${results[i].videoRenderer.videoId}" class="yt-uix-tile-link" dir="ltr" title="${results[i].videoRenderer.title.runs[0].text}">${results[i].videoRenderer.title.runs[0].text}</a>
            </h3>
            <p id="video-description-${results[i].videoRenderer.videoId}" class="description" dir="ltr">${description}</p>
            <ul class="single-line-lego-list"><li><a href="http://www.youtube.com/results?search_query=${searchpar}%2C+hd" class="yt-badge-std">hd</a>
            </li>
            </ul>
            <p class="facets">
            <span class="username-prepend">by</span>
            <a href="http://www.youtube.com${results[i].videoRenderer.longBylineText.runs[0].navigationEndpoint.browseEndpoint.canonicalBaseUrl}" class="yt-user-name " dir="ltr">${results[i].videoRenderer.ownerText.runs[0].text}</a> <span class="metadata-separator">|</span>  <span class="date-added">${pub}</span> <span class="metadata-separator">|</span>  <span class="viewcount">${views}</span>
            </p>
            </div>
            </div>`;
                    parse += main;
                };

                // Handle Channels
                if(results[i].channelRenderer) {
                    let description = results[i].channelRenderer.descriptionSnippet ? results[i].channelRenderer.descriptionSnippet.runs[0].text : "";
                    let title = results[i].channelRenderer.title.simpleText;
                    let link = "http://www.youtube.com" + results[i].channelRenderer.shortBylineText.runs[0].navigationEndpoint.browseEndpoint.canonicalBaseUrl;
                    let thumbnail = results[i].channelRenderer.thumbnail.thumbnails[0].url;
                    let video = results[i].channelRenderer.videoCountText ? results[i].channelRenderer.videoCountText.runs : [];
                    let videos = video[1] ? video[0].text + video[1].text : video.text // + results[i].channelRenderer.videoCountText.runs[1].text;
                    let subs = results[i].channelRenderer.subscriberCountText ? results[i].channelRenderer.subscriberCountText.simpleText : "No subscribers";

                    let main = `<div class="result-item yt-uix-tile yt-tile-default *sr channel">
                    <div class="thumb-container">
                    <a href="${link}" class="ux-thumb-wrap result-item-thumb">
                    <span class="video-thumb ux-thumb ux-thumb-profile-77">
                    <span class="clip" style="position:unset;">
                    <span class="clip-inner">
                    <img onload="" alt="Thumbnail" src="${thumbnail}">
                    <span class="vertical-align">
                    </span>
                    </span>
                    </span>
                    </span>
                    </a>
                    </div>
                    <div class="result-item-main-content">
                    <h3>
                    <a href="${link}" class="yt-uix-tile-link" dir="ltr" title="${title}">${title}</a>
                    </h3>
                    <p id="video-description-" class="description" dir="ltr">${description}</p>
                    <ul class="single-line-lego-list">
                    <li>
                    <a href="http://www.youtube.com/results?search_type=search_users" class="yt-badge-std">CHANNEL</a>
                    </li>
                    </ul>
                    <p class="facets">
                    <span class="username-prepend">by</span> <a href="${link}" class="yt-user-name" dir="ltr">${title}</a><span class="metadata-separator"> | </span><span class="video-count">${videos}</span><span class="metadata-separator"> | </span><span class="channel-subscriber-count">${subs}</span>
                    </p>
                    </div>
                    </div>`;

                    parse += main;
                };

                // Handle Playlists
                if(results[i].playlistRenderer) {
                    // Oh, if ever YouTube would restore playlists on the search engine.
                    // If only the Right-Wing corruption and ignorance would fuck off.
                };
            };



            OBJ_CHANNEL = `<div id="content">
            <div id="search-header">
            <div id="search-header-inner">
            <p class="num-results">About <strong>${ytInitialData.estimatedResults.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</strong> results</p>
            <h2>Search results for <strong class="query"><span class="search-title-lego">${searchpar}</span></strong>
            </h2>
            </div>
            <hr class="yt-horizontal-rule" style="border: 1px solid #ebebeb;">
            </div>
            <div id="search-refinements">
            <div id="lego-refine-block">
            <div class="sort-by floatR">
            <span class="sort-by-title" style="color: #555">Sort by:</span>
            <button type="button" class="yt-uix-button yt-uix-button-text" onclick="document.ciulinYT.func.Modal('ul.yt-uix-button-menu');return false;" role="button">
            <span class="yt-uix-button-content">Relevance </span>
            <img class="yt-uix-button-arrow" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
            <ul class="yt-uix-button-menu yt-uix-button-menu-text hid" role="menu" aria-haspopup="true" style="min-width: 92px; left: 902.467px; top: 210px; display: none;">
            <li role="menuitem" id="aria-id-68537613644">
            <span href="http://www.youtube.com/results?search_query=${searchpar}&amp;sp=CAI%253D" class=" yt-uix-button-menu-item" onclick=";window.location.href=this.getAttribute('href');return false;">Upload date</span>
            </li>
            <li role="menuitem" id="aria-id-52246167700">
            <span href="http://www.youtube.com/results?search_query=${searchpar}&amp;sp=CAMSAhAB" class=" yt-uix-button-menu-item" onclick=";window.location.href=this.getAttribute('href');return false;">View count</span>
            </li>
            <li role="menuitem" id="aria-id-43856570253">
            <span href="http://www.youtube.com/results?search_query=${searchpar}&amp;sp=CAESAhAB" class=" yt-uix-button-menu-item" onclick=";window.location.href=this.getAttribute('href');return false;">Rating</span>
            </li>
            </ul>
            </button>
            </div>
            <button type="button" id="lego-refine-toggle" onclick="document.ciulinYT.func.Modal('#search-lego-refinements');return false;" class="yt-uix-button yt-uix-button-text" data-button-toggle="true" role="button">
            <span class="yt-uix-button-content">Filter </span>
            <img class="yt-uix-button-arrow" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
            </button>
            <div id="search-lego-refinements" class="hid" style="display: none;">
            <div class="search-refinements-block search-refinements-links">
            <div class="search-refinements-block-title">Sort by</div>
            <ul>
            <li>
            <a href="http://www.youtube.com/results?search_query=${searchpar}&amp;sp=CAASBAgCEAE%253D">Relevance</a>
            </li>
            <li>
            <a href="http://www.youtube.com/results?search_query=${searchpar}&amp;sp=CAI%253D">Upload date</a>
            </li>
            <li>
            <a href="http://www.youtube.com/results?search_query=${searchpar}&amp;sp=CAMSAhAB">View count</a>
            </li>
            <li>
            <a href="http://www.youtube.com/results?search_query=${searchpar}&amp;sp=CAESAhAB">Rating</a>
            </li>
            </ul>
            </div>
            <div class="search-refinements-block filters">
            <div class="search-refinements-block-title">Filter</div>
            <ul>
            <li>
            <span class="lego lego-property  append-lego" data-lego-name="last hour">
            <a class="lego-action" title="Search for ${searchpar}, last hour" href="http://www.youtube.com/results?search_query=${searchpar}&amp;sp=EgQIARAB">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif"></a>
            <a class="lego-action-placeholder" title="Search for ${searchpar}, last hour" href="http://www.youtube.com/results?search_query=${searchpar}&amp;sp=EgQIARAB">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif"></a>
            <a class="lego-content" title="Search for ${searchpar}, last hour" href="http://www.youtube.com/results?search_query=${searchpar}&amp;sp=EgQIARAB">last hour</a>
            </span>
            </li>
            <li>
            <span class="lego lego-property  append-lego" data-lego-name="today">
            <a class="lego-action" title="Search for ${searchpar}, today" href="http://www.youtube.com/results?search_query=${searchpar}&amp;sp=EgIIAg%253D%253D">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif"></a>
            <a class="lego-action-placeholder" title="Search for ${searchpar}, today" href="http://www.youtube.com/results?search_query=${searchpar}&amp;sp=EgIIAg%253D%253D">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif"></a>
            <a class="lego-content" title="Search for ${searchpar}, today" href="http://www.youtube.com/results?search_query=${searchpar}&amp;sp=EgIIAg%253D%253D">uploaded today</a>
            </span>
            </li>
            <li>
            <span class="lego lego-property  append-lego" data-lego-name="this week">
            <a class="lego-action" title="Search for ${searchpar}, this week" href="http://www.youtube.com/results?search_query=${searchpar}&amp;sp=EgQIAxAB">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif"></a>
            <a class="lego-action-placeholder" title="Search for ${searchpar}, this week" href="http://www.youtube.com/results?search_query=${searchpar}&amp;sp=EgQIAxAB">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif"></a>
            <a class="lego-content" title="Search for ${searchpar}, this week" href="http://www.youtube.com/results?search_query=${searchpar}&amp;sp=EgQIAxAB">uploaded this week</a>
            </span>
            </li>
            <li>
            <span class="lego lego-property  append-lego" data-lego-name="this month">
            <a class="lego-action" title="Search for ${searchpar}, this month" href="http://www.youtube.com/results?search_query=${searchpar}&amp;sp=EgQIBBAB">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
            </a>
            <a class="lego-action-placeholder" title="Search for ${searchpar}, this month" href="http://www.youtube.com/results?search_query=${searchpar}&amp;sp=EgQIBBAB">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
            </a>
            <a class="lego-content" title="Search for ${searchpar}, this month" href="http://www.youtube.com/results?search_query=${searchpar}&amp;sp=EgQIBBAB">uploaded this month</a>
            </span>
            </li>
            <li>
            <span class="lego lego-property  append-lego" data-lego-name="this year">
            <a class="lego-action" title="Search for ${searchpar}, this year" href="http://www.youtube.com/results?search_query=${searchpar}&amp;sp=EgQIBRAB">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
            </a>
            <a class="lego-action-placeholder" title="Search for ${searchpar}, this year" href="http://www.youtube.com/results?search_query=${searchpar}&amp;sp=EgQIBRAB">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
            </a>
            <a class="lego-content" title="Search for ${searchpar}, this year" href="http://www.youtube.com/results?search_query=${searchpar}&amp;sp=EgQIBRAB">uploaded this year</a>
            </span>
            </li>
            </ul>
            </div>
            <div class="search-refinements-block filters">
            <div class="search-refinements-block-title">&nbsp;</div>
            <ul>
            <li>
            <span class="lego lego-property  append-lego" data-lego-name="channel">
            <a class="lego-action" title="Search for ${searchpar}, channel" href="http://www.youtube.com/results?search_query=${searchpar}&amp;sp=EgIQAg%253D%253D">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
            </a>
            <a class="lego-action-placeholder" title="Search for ${searchpar}, channel" href="http://www.youtube.com/results?search_query=${searchpar}&amp;sp=EgIQAg%253D%253D">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
            </a>
            <a class="lego-content" title="Search for ${searchpar}, channel" href="http://www.youtube.com/results?search_query=${searchpar}&amp;sp=EgIQAg%253D%253D">channel</a>
            </span>
            </li>
            <li>
            <span class="lego lego-property  append-lego" data-lego-name="playlist">
            <a class="lego-action" title="Search for ${searchpar}, playlist" href="http://www.youtube.com/results?search_query=${searchpar}&amp;sp=EgIQAw%253D%253D">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
            </a>
            <a class="lego-action-placeholder" title="Search for ${searchpar}, playlist" href="http://www.youtube.com/results?search_query=${searchpar}&amp;sp=EgIQAw%253D%253D">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
            </a>
            <a class="lego-content" title="Search for ${searchpar}, playlist" href="http://www.youtube.com/results?search_query=${searchpar}&amp;sp=EgIQAw%253D%253D">playlist</a>
            </span>
            </li>
            <li>
            <span class="lego lego-property  append-lego" data-lego-name="movie">
            <a class="lego-action" title="Search for ${searchpar}, movie" href="http://www.youtube.com/results?search_query=${searchpar}&amp;sp=EgIQBA%253D%253D">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
            </a>
            <a class="lego-action-placeholder" title="Search for ${searchpar}, movie" href="http://www.youtube.com/results?search_query=${searchpar}&amp;sp=EgIQBA%253D%253D">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
            </a>
            <a class="lego-content" title="Search for ${searchpar}, movie" href="http://www.youtube.com/results?search_query=${searchpar}&amp;sp=EgIQBA%253D%253D">movie</a>
            </span>
            </li>
            <li>
            <span class="lego lego-property  append-lego" data-lego-name="show">
            <a class="lego-action" title="Search for ${searchpar}, show" href="http://www.youtube.com/results?search_query=${searchpar}%2C+show">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
            </a>
            <a class="lego-action-placeholder" title="Search for ${searchpar}, show" href="http://www.youtube.com/results?search_query=${searchpar}%2C+show">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
            </a>
            <a class="lego-content" title="Search for ${searchpar}, show" href="http://www.youtube.com/results?search_query=${searchpar}%2C+show">show</a>
            </span>
            </li>
            <li>
            <span class="lego lego-property  append-lego" data-lego-name="3d">
            <a class="lego-action" title="Search for ${searchpar}, 3d" href="http://www.youtube.com/results?search_query=${searchpar}%2C+3d">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
            </a>
            <a class="lego-action-placeholder" title="Search for ${searchpar}, 3d" href="http://www.youtube.com/results?search_query=${searchpar}%2C+3d">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
            </a>
            <a class="lego-content" title="Search for ${searchpar}, 3d" href="http://www.youtube.com/results?search_query=${searchpar}%2C+3d">3D</a>
            </span>
            </li>
            </ul>
            </div>
            <div class="search-refinements-block filters">
            <div class="search-refinements-block-title">&nbsp;</div>
            <ul>
            <li>
            <span class="lego lego-property  append-lego" data-lego-name="hd">
            <a class="lego-action" title="Search for ${searchpar}, hd" href="http://www.youtube.com/results?search_query=${searchpar}%2C+hd">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
            </a>
            <a class="lego-action-placeholder" title="Search for ${searchpar}, hd" href="http://www.youtube.com/results?search_query=${searchpar}%2C+hd">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
            </a>
            <a class="lego-content" title="Search for ${searchpar}, hd" href="http://www.youtube.com/results?search_query=${searchpar}%2C+hd">HD (high definition)</a>
            </span>
            </li>
            <li>
            <span class="lego lego-property  append-lego" data-lego-name="cc">
            <a class="lego-action" title="Search for ${searchpar}, cc" href="http://www.youtube.com/results?search_query=${searchpar}%2C+cc">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif"></a>
            <a class="lego-action-placeholder" title="Search for ${searchpar}, cc" href="http://www.youtube.com/results?search_query=${searchpar}%2C+cc">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
            </a>
            <a class="lego-content" title="Search for ${searchpar}, cc" href="http://www.youtube.com/results?search_query=${searchpar}%2C+cc">CC (closed caption)</a>
            </span>
            </li>
            <li>
            <span class="lego lego-property  append-lego" data-lego-name="long">
            <a class="lego-action" title="Search for ${searchpar}, long" href="http://www.youtube.com/results?search_query=${searchpar}%2C+long">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
            </a>
            <a class="lego-action-placeholder" title="Search for ${searchpar}, long" href="http://www.youtube.com/results?search_query=${searchpar}%2C+long">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
            </a>
            <a class="lego-content" title="Search for ${searchpar}, long" href="http://www.youtube.com/results?search_query=${searchpar}%2C+long">longer than 20 min</a>
            </span>
            </li>
            <li>
            <span class="lego lego-property  append-lego" data-lego-name="partner">
            <a class="lego-action" title="Search for ${searchpar}, partner" href="http://www.youtube.com/results?search_query=${searchpar}%2C+partner">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
            </a>
            <a class="lego-action-placeholder" title="Search for ${searchpar}, partner" href="http://www.youtube.com/results?search_query=${searchpar}%2C+partner">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
            </a>
            <a class="lego-content" title="Search for ${searchpar}, partner" href="http://www.youtube.com/results?search_query=${searchpar}%2C+partner">partner video</a>
            </span>
            </li>
            <li>
            <span class="lego lego-property  append-lego" data-lego-name="creativecommons">
            <a class="lego-action" title="Search for ${searchpar}, creativecommons" href="http://www.youtube.com/results?search_query=${searchpar}%2C+creativecommons">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
            </a>
            <a class="lego-action-placeholder" title="Search for ${searchpar}, creativecommons" href="http://www.youtube.com/results?search_query=${searchpar}%2C+creativecommons">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
            </a>
            <a class="lego-content" title="Search for ${searchpar}, creativecommons" href="http://www.youtube.com/results?search_query=${searchpar}%2C+creativecommons">creative commons</a>
            </span>
            </li>
            <li>
            <li>
            <span class="lego lego-property  append-lego" data-lego-name="live">
            <a class="lego-action" title="Search for ${searchpar}, live" href="http://www.youtube.com/results?search_query=${searchpar}%2C+live">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
            </a>
            <a class="lego-action-placeholder" title="Search for ${searchpar}, live" href="http://www.youtube.com/results?search_query=${searchpar}%2C+live">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
            </a>
            <a class="lego-content" title="Search for ${searchpar}, live" href="http://www.youtube.com/results?search_query=${searchpar}%2C+live">live</a>
            </span>
            </li>
            </li>
            </ul>
            </div>
            <div class="clearL"></div>
            </div>
            </div>
            </div>
            <div class="yt-horizontal-rule" style="border-top: 2px solid #ddd;border-bottom: 2px solid #fff;">
            <span class="first"></span>
            <span class="second"></span>
            <span class="third"></span>
            </div>
            <div id="search-base-div">
            <div id="search-main" class="ytg-4col new-snippets">
            <div id="results-main-content">
            <div id="search-results">
            ${parse}
            </div>
            </div>
            </div>
            </div>
            </div>`;
            })();
        };

        // Browse
        if(window.location.pathname.match(/\/feed\/trending/i)) {
            (async function(){
                OBJ_CHANNEL = `TEST`;
            })();
        };

        // Mastheat
        OBJ_MASTHEAD = `<div id="masthead" class="" dir="ltr">
        <a id="logo-container" href="https://www.youtube.com/" title="YouTube home">
        <img id="logo" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="YouTube home">
        </a>
        ${OBJ_USER}
        <div id="masthead-search-bar-container">
        <div id="masthead-search-bar">
        <div id="masthead-nav">
        <a href="https://www.youtube.com/videos?feature=mh">Browse</a>
        <span class="masthead-link-separator">|</span>
        <a href="https://youtube.com/upload">Upload</a>
        </div>
        <form id="masthead-search" class="search-form consolidated-form" action="https://www.youtube.com/results" onsubmit="if (document.body.querySelector('#masthead-search-term').value == '') return false;">
        <button class="search-btn-compontent search-button yt-uix-button" onclick="if (document.querySelector('#masthead-search-term').value == '') return false; document.querySelector('#masthead-search').submit(); return false;;return true;" type="submit" id="search-btn" dir="ltr" tabindex="2" role="button">
        <span class="yt-uix-button-content">Search</span>
        </button>
        <div id="masthead-search-terms" dir="ltr" style="border-color: rgb(192, 192, 192) rgb(217, 217, 217) rgb(217, 217, 217);">
        <label>
        <input id="masthead-search-term" onfocus="document.querySelector('#masthead-search').classList.add('focused');document.querySelector('#masthead-search-terms').setAttribute('style', 'border-color: rgb(77, 144, 254)')" onblur="document.querySelector('#masthead-search').classList.remove('focused');document.querySelector('#masthead-search-terms').setAttribute('style', 'border-color: rgb(192, 192, 192) rgb(217, 217, 217) rgb(217, 217, 217);')" autocomplete="off" class="search-term" name="search_query" value="" type="text" tabindex="1" title="Search" dir="ltr" spellcheck="false" style="outline: currentcolor none medium;">
        </label>
        </div>
        <input type="hidden" name="oq">
        <input type="hidden" name="aq">
        <input type="hidden" name="aqi">
        <input type="hidden" name="aql">
        <input type="hidden" name="gs_sm">
        <input type="hidden" name="gs_upl">
        </form>
        </div>
        </div>
        </div>`

        // Footer
        OBJ_FOOTER = `<div id="footer-container">
        <div id="footer">
        <div class="horizontal-rule">
        <span class="first"></span>
        <span class="second"></span>
        <span class="third"></span>
        </div>
        <div id="footer-logo">
        <a href="https://www.youtube.com/" title="YouTube home">
        <img id="logo" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="YouTube home">
        </a>
        <span id="footer-divider"></span>
        </div>
        <div id="footer-main">
        <ul id="footer-links-primary">
        <li>
        <a href="https://support.google.com/youtube/#topic=9257498">Help</a>
        </li>
        <li>
        <a href="https://www.youtube.com/about">About</a>
        </li>
        <li>
        <a href="https://www.youtube.com/press/">Press &amp; Blogs</a>
        </li>
        <li>
        <a href="https://www.youtube.com/copyright">Copyright</a>
        </li>
        <li>
        <a href="https://www.youtube.com/creators">Creators &amp; Partners</a>
        </li>
        <li>
        <a href="https://www.youtube.com/ads">Advertising</a>
        </li>`

        // Outside Template
        DOMBODY.innerHTML = `<div id="page" class="">
        <div id="masthead-container">
        ${OBJ_MASTHEAD}
        </div>
        <div id="content-container">
        ${OBJ_CHANNEL}
        </div>
        ${OBJ_FOOTER}
        </div>`;
    };
    (async function(){
        debug("Cookie Check: Searching for CONSENT");
        if(getCookie("APISID")) {
            debug("CONSENT screen: Passed");
            return buildYouTube();
        };
        if(!getCookie("CONSENT")) return debug("Cookie Check: CONSENT does not exist.");
        if(getCookie("CONSENT").indexOf("YES") !== 0) {
            debug("CONSENT screen: Pending request from Consent Screen");
            await waitForElm("#dialog");
            await waitForElm(".ytd-consent-bump-v2-lightbox").then((elm) => {debug("Add refresh function to the accept button.");document.querySelector("#dialog").querySelectorAll("ytd-button-renderer")[3].querySelector("#button").addEventListener("click", function(){location = '';})})
            return;
        }
        debug("CONSENT screen: Passed");
        window.onload = buildYouTube();
    })();

    // SVG Manager
    document.ciulinYT.func.setSVG = function(dom, n) {
        dom.innerHTML = document.ciulinYT.data.SVG[n];
        console.log({dom: dom, n:n});
    };

    // Make Player
    document.ciulinYT.func.buildPlayer = function(videoId, time) {
        var DOM = document.querySelector("#video-player");
        DOM.player = {};

        document.ciulinYT.data.SVG = {};
        document.ciulinYT.data.playerSheet = `data:image/png;base64,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`;
        document.ciulinYT.data.playbarSheet = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAZCAIAAAB/8tMoAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAhSURBVBhXY7h69SoTCDAzMxNNMzAwgNmMjIyEMMP///8BIN0GJrVyhfoAAAAASUVORK5CYII=`;
        document.ciulinYT.data.playbarShadow = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAZCAIAAACZ2xhsAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAA6SURBVChTY1y2bJm4uLiAgAA3NzcTAxgwggGIA2UBwWCRgQAMZXCA0AMECBkEB8gCkthkIIB0AxgZAbxaA1A95vt3AAAAAElFTkSuQmCC`;
        document.ciulinYT.data.playbarSeeker = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAaCAYAAAB2BDbRAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABQSURBVBhXbYqxDYAwEANP7kkmyDBZiDYTsUK2oosUpTK8oEK4OFu22UsxB1gJ0HaDs3eHQ2vNqrWinDNKKU6htZZlmy9ifNIYA8053+4fcAGeySL/5lJgnAAAAABJRU5ErkJggg==`;

        /* DOM_embedVideo */
        (function(){
            var DOM_embedVideo = document.createElement("div");
            var DOM_embedVideoA = document.createElement("div");
            var DOM_embedVideoB = document.createElement("div");
            DOM_embedVideo.setAttribute("class", "video-container");
            DOM_embedVideoA.setAttribute("id", "video-main-content");
            DOM_embedVideoB.setAttribute("class", "video-blank fitwidth fitheight");
            DOM_embedVideo.appendChild(DOM_embedVideoA);
            DOM_embedVideo.appendChild(DOM_embedVideoB);
            DOM.appendChild(DOM_embedVideo);
        })();

        /* DOM_playBar */
        (function(){
            var DOM_playBar = document.createElement("div");
            DOM_playBar.setAttribute("class", "video-playbar");
            DOM_playBar.innerHTML = `<div class="playbar-progressbar-container" onmousemove="document.ciulinYT.func.preProPos(event)" onclick="document.ciulinYT.func.setProPos(event)">
            <span id="playbar-progressbar" value="0" max="100"></span>
            </div>
            <div class="playbar-a hid"></div>
            <div class="playbar-bottom-container">
            <left>
            <div class="playbar-buttons-container left">
            <button class="playbar-button playbar-play" onclick="document.ciulinYT.player.playVideo();">
            <i class="playbar-play"></i>
            </button>
            <div class="playbar-volume-container">
            <button class="playbar-button playbar-volume" data-state="3" onclick="document.ciulinYT.func.mutePlayer(this.getAttribute('data-state'))">
            <i class="playbar-volume"></i>
            </button>
            <div class="playbar-volume-slider-container">
            <div class="playbar-shadow"></div>
            <div class="playbar-volume-slider">
            <input type="range" id="playbar-seek" max="100" value="100" oninput="document.ciulinYT.func.setVolume(this.value);">
            </div>
            </div>
            </div>
            </div>
            <div class="playbar-shadow"></div>
            <div class="playbar-timestamp-container">
            <span class="playbar-timestamp"><a id="playbar-timestamp-current">0:00</a> / <a id="playbar-timestamp-total">0:00</a></span>
            </div>
            </left>
            <div class="playbar-buttons-container right">
            <button class="playbar-button">
            <i class="playbar"></i>
            </button>
            <button class="playbar-button playbar-fullscreen" onclick="document.ciulinYT.func.fullscreen();">
            <i class="playbar-fullscreen"></i>
            </button>
            </div>
            </div>`;
            DOM.appendChild(DOM_playBar);
        })();

        // DOM CSS
        (function(){
            var a = document.createElement("style");
            a.setAttribute("class", "player-style");
            var script = `
            #video-player {width:640px;height:390px;}
            .fitwidth {width:100%;}
            .fitheight {height:100%;}
            .video-container {height: 360px;position:relative;z-index:-1;}
            #video-main-content {position:relative;z-index:-2;}
            .video-blank {background-color: black;position: absolute;z-index: -1;top: 0;}
            .video-playbar {width:640px;height:30px;}
            .playbar-bottom-container {background: url(${document.ciulinYT.data.playbarSheet});width: 640px; height: 24.6px;display:inline-flex;user-select: none;max-width:638px;border: 1px solid #ccc; border-left-color: #bfbfbf; border-right-color: #bfbfbf;}
            .playbar-buttons-container {height: 24.6px; display:inline-flex;}
            .playbar-buttom-container div {display: inline-block;}
            left {display: inline-flex;width: 600px;}
            .playbar-button {background: no-repeat url(${document.ciulinYT.data.playerSheet}) 0px 0px;width: 30px;height: 24.6px;}
            .playbar-progressbar-container {height: 4px;position: relative; background-color:#c2c2c2;}
            #playbar-progressbar {height: 4px;position: absolute;top: 0;width: 100%;border:0;background-color:#b03434;max-width:100%;}
            .playbar-a {height:3px;}
            .playbar-button:hover {background: no-repeat url(${document.ciulinYT.data.playerSheet}) -30px 0px;}
            .playbar-timestamp {padding-left: 9px;font-size: 10px; line-height:25px;}
            .playbar-timestamp a {color:black;cursor:default;}
            .playbar-timestamp a:hover {text-decoration:none;}
            button.playbar-volume {border-left: 1px solid #bfbfbf;}
            .playbar-volume-slider-container {display: none;width:64px;}
            .playbar-volume-container {display: inline-flex;}
            .playbar-volume-container:hover .playbar-volume-slider-container {display: inline-flex;}
            .playbar-volume-slider {line-height: 22px;}
            #playbar-seek {-webkit-appearance: none;width: 53px;height: 4px;outline: none;}
            #playbar-seek::-moz-range-progress {background: url(${document.ciulinYT.data.playbarSeeker}) 0px 0px;height: 5px;}
            #playbar-seek::-moz-range-track, #playbar-seek::-webkit-slider-runnable-track {-webkit-appearance: none;background: url(${document.ciulinYT.data.playbarSeeker}) 0px -6px;height: 5px;}
            #playbar-seek::-moz-range-thumb, #playbar-seek::-webkit-slider-thumb {-webkit-appearance: none;width: 4px;height: 15px;background: url(${document.ciulinYT.data.playbarSeeker}) 0px -11px;cursor: pointer;border-radius:0;}
            i {display:block;}
            .playbar-shadow {background: url(${document.ciulinYT.data.playbarShadow});width: 4px;}
            i.playbar-play {background: no-repeat url(${document.ciulinYT.data.playerSheet}) 0px -40px;height: 14px; width: 11px;margin-left: auto;margin-right: auto;}
            button.playbar-play:hover i.playbar-play {background: no-repeat url(${document.ciulinYT.data.playerSheet}) -12px -40px;height: 14px; width: 11px;margin-left: auto;margin-right: auto;}
            i.playbar-pause {background: no-repeat url(${document.ciulinYT.data.playerSheet}) 0px -25px;height: 14px; width: 11px;margin-left: auto;margin-right: auto;}
            button.playbar-play:hover i.playbar-pause {background: no-repeat url(${document.ciulinYT.data.playerSheet}) -11px -25px;height: 14px; width: 11px;margin-left: auto;margin-right: auto;}
            button.playbar-volume[data-state^="3"] i.playbar-volume {background: no-repeat url(${document.ciulinYT.data.playerSheet}) 0px -55px;height: 23px; width: 25px;margin-left: auto;}
            .playbar-volume-container:hover button.playbar-volume[data-state^="3"] i.playbar-volume {background: no-repeat url(${document.ciulinYT.data.playerSheet}) -27px -55px;height: 23px; width: 25px;margin-left: auto;}
            button.playbar-volume[data-state^="2"] i.playbar-volume {background: no-repeat url(${document.ciulinYT.data.playerSheet}) 0px -76px;height: 23px; width: 25px;margin-left: auto;}
            .playbar-volume-container:hover button.playbar-volume[data-state^="2"] i.playbar-volume {background: no-repeat url(${document.ciulinYT.data.playerSheet}) -27px -76px;height: 23px; width: 25px;margin-left: auto;}
            button.playbar-volume[data-state^="1"] i.playbar-volume {background: no-repeat url(${document.ciulinYT.data.playerSheet}) 0px -97px;height: 23px; width: 25px;margin-left: auto;}
            .playbar-volume-container:hover button.playbar-volume[data-state^="1"] i.playbar-volume {background: no-repeat url(${document.ciulinYT.data.playerSheet}) -27px -97px;height: 23px; width: 25px;margin-left: auto;}
            button.playbar-volume[data-state^="0"] i.playbar-volume {background: no-repeat url(${document.ciulinYT.data.playerSheet}) 0px -118px;height: 23px; width: 25px;margin-left: auto;}
            .playbar-volume-container:hover button.playbar-volume[data-state^="0"] i.playbar-volume {background: no-repeat url(${document.ciulinYT.data.playerSheet}) -27px -118px;height: 23px; width: 25px;margin-left: auto;}
            button.playbar-fullscreen i.playbar-fullscreen {background: no-repeat url(${document.ciulinYT.data.playerSheet}) 0px -144px;height: 15px;width: 16px;margin-left: auto;margin-right: auto;}
            button.playbar-fullscreen:hover i.playbar-fullscreen {background: no-repeat url(${document.ciulinYT.data.playerSheet}) -18px -144px;height: 15px;width: 16px;margin-left: auto;margin-right: auto;}
            `;
            script = script.replace(/(?:\r\n|\r|\n)/g, "");
            a.innerText = script;
            DOM.appendChild(a);
        })();

        // DOM JS
        (function(){
            function insertAfter(newNode, existingNode) {
                existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
            }

            var tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            var firstScriptTag = document.querySelector("#video-player");
            insertAfter(tag, firstScriptTag);

            var timm = time ? `'time':` + time + "," : ``;

            var a = document.createElement("script");
            var script = `
            function onYouTubeIframeAPIReady(){
                document.ciulinYT.player = new YT.Player('video-main-content', {
                    height: '360',
                    width: '640',
                    videoId: '${videoId}',
                    playerVars: {
                        'enablejsapi': 1,
                        'rel': 0,
                        ${timm}
                        'controls': '0'
                    },
                    events: {
                        'onReady': onPlayerReady,
                        'onStateChange': onStateChange
                    }
                });
            };

            function onPlayerReady() {
            /* total */
                var tminute = parseInt(document.ciulinYT.player.getDuration() / 60, 10);
                var tsecond = document.ciulinYT.player.getDuration() % 60;
                if(tsecond < 10) tsecond = "0" + tsecond;
                document.querySelector("#playbar-timestamp-total").innerText = tminute + ":" + tsecond;
            };
            function onStateChange(e) {
                if (e.data == 0) {
                    clearInterval(ciulinYT.progress);
                    document.querySelector("button.playbar-play").setAttribute("onclick", "document.ciulinYT.player.playVideo();");
                    document.querySelector("i.playbar-pause").setAttribute("class", "playbar-play");
                    document.querySelector("#video-player").player.state = "ENDED";
                };
                if (e.data == 1) {
                    if(document.querySelector("#video-player").player.state === "ENDED") {
                       document.querySelector("#video-player").player.state = "PLAYING";
                    };
                    document.querySelector(".video-blank").style = "background: rgba(0, 0, 0, 0);";
                    document.querySelector("button.playbar-play").setAttribute("onclick", "document.ciulinYT.player.pauseVideo();");
                    document.querySelector("i.playbar-play").setAttribute("class", "playbar-pause");
                    ciulinYT.progress = setInterval(${ciulinYT.trackLength});
                };
                if (e.data == 2) {
                    document.querySelector("button.playbar-play").setAttribute("onclick", "document.ciulinYT.player.playVideo();");
                    document.querySelector("i.playbar-pause").setAttribute("class", "playbar-play");
                };
            };
            //`;
            script = script.replace(/(?:\r\n|\r|\n)/g, "");
            a.innerText = script;
            insertAfter(a, tag);
        })();

        // DOM EVENT
        (function(){
            document.querySelector("#video-player").addEventListener("fullscreenchange", (e) => {
                if(!document.fullscreenElement) {
                    document.querySelector("#video-main-content").removeAttribute("style");
                    document.querySelector(".video-playbar").removeAttribute("style");
                    document.querySelector(".playbar-bottom-container").removeAttribute("style");
                    document.querySelector(".video-container").removeAttribute("style");
                    document.querySelector("left").removeAttribute("style");
                }
            });
            document.querySelector("#video-player").addEventListener("mouseenter", (e) => {
                document.querySelector(".video-container").style.height = "349px";
                document.querySelector(".video-playbar").style.height = "40px";
                document.querySelector(".playbar-progressbar-container").style.height = "12px";
                document.querySelector("#playbar-progressbar").style.height = "12px";
                document.querySelector(".playbar-a").classList.remove("hid");
                clearInterval(ciulinYT.progress);
            });
            document.querySelector("#video-player").addEventListener("mouseleave", (e) => {
                document.querySelector(".video-container").removeAttribute("style");
                document.querySelector(".video-playbar").removeAttribute("style");
                document.querySelector(".playbar-progressbar-container").removeAttribute("style");
                document.querySelector("#playbar-progressbar").removeAttribute("style");
                document.querySelector(".playbar-a").classList.add("hid");
                ciulinYT.progress = setInterval(ciulinYT.trackLength)
            });
        })();
    };

    if(window.location.pathname.split("/")[1].match(/watch/i)) {
        waitForElm("#video-player").then((elm) => {
            document.ciulinYT.func.buildPlayer(ytInitialPlayerResponse.videoDetails.videoId, window.location.href.split("t=")[1] ? window.location.href.split("t=")[1].split("s")[0] : 1);

            var xhr = new XMLHttpRequest();
            xhr.open("GET", "https://returnyoutubedislikeapi.com/Votes?videoId=" + window.location.search.split("?v=")[1]);
            xhr.send();
            xhr.addEventListener('load', event => {
                var result = JSON.parse(event.target.response);
                var likes = result.likes;
                var dislikes = result.dislikes;
                var rating = likes + dislikes > 0 ? (likes / (likes + dislikes)) * 100 : 50;
                document.querySelector(".watch-sparkbar-likes").style.width = rating + "%"
                document.querySelector(".likes").innerText = likes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                document.querySelector(".dislikes").innerText = dislikes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            });
        });
    };
    if(window.location.pathname.split("/")[1].match(/channel|user|^c{1}$/i)) {
       waitForElm("#video-player").then((elm) => {
           //if(ytInitialData.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].channelVideoPlayerRenderer) {
               document.ciulinYT.func.buildPlayer(ytInitialData.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].channelVideoPlayerRenderer ? ytInitialData.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].channelVideoPlayerRenderer.videoId : "")
           //}
       });
    };

    // Modal Function
    document.ciulinYT.func.Modal = function(DOM) {
        DOM = document.querySelector(DOM);
        console.log(DOM)
        // 0 = close DEFAULT | 1 = open
        if (!DOM.classList.contains("hid")) {
            DOM.classList.add("hid");
            DOM.style = "display:none;";
            console.log("BB")
            return;
        }
        DOM.classList.remove("hid");
        DOM.style = "display:block";
        console.log("AA")
    };

    // Mute Functions
    document.ciulinYT.func.mutePlayer = function(state) {
        state = Number(state);
        if(state == 0) {
            document.ciulinYT.player.unMute();
            document.querySelector("button.playbar-volume").setAttribute("data-state", "1");
        };
        if(state !== 0) {
            document.ciulinYT.player.mute();
            document.querySelector("#playbar-seek").value = 0;
            document.querySelector("button.playbar-volume").setAttribute("data-state", "0");
        };
    };

    // Fullscreen Functions
    document.ciulinYT.func.fullscreen = function() {
        var $ = document.querySelector("#video-player");
        var requestFullScreen = $.requestFullScreen || $.mozRequestFullScreen || $.webkitRequestFullScreen;
        if(requestFullScreen) {
            if (document.fullscreenElement) {
                document.exitFullscreen();
                document.querySelector("#video-main-content").removeAttribute("style");
                document.querySelector(".video-playbar").removeAttribute("style");
                document.querySelector(".playbar-bottom-container").removeAttribute("style");
                document.querySelector(".video-container").removeAttribute("style");
                document.querySelector("left").removeAttribute("style");
            } else {
                requestFullScreen.bind($)();
                document.querySelector("#video-main-content").style = `width: ${window.outerWidth}px; height: ${window.outerHeight - 30}px;`;
                document.querySelector(".video-playbar").style.width = window.outerWidth + "px";
                document.querySelector(".playbar-bottom-container").style = `width: ${window.outerWidth}px; max-width: none;`;
                document.querySelector(".video-container").style = `height: ${window.outerHeight - 30}px;";`;
                document.querySelector("left").style = `width: ${window.outerWidth - 78}px;`;
            }
        }
    };

    // Set Volume Functions
    document.ciulinYT.func.setVolume = function(vol) {
        vol = Number(vol);
        if(vol == 0) {
            document.ciulinYT.func.mutePlayer();
        };
        if(vol > 0 && vol < 20) {
            document.querySelector("button.playbar-volume").setAttribute("data-state", "1");
        };
        if(vol > 20 && vol < 80) {
            document.querySelector("button.playbar-volume").setAttribute("data-state", "2");
        };
        if(vol > 80 && vol < 100) {
            document.querySelector("button.playbar-volume").setAttribute("data-state", "3");
        };
        if(document.ciulinYT.player.isMuted() == true) {document.ciulinYT.player.unMute()};
        document.ciulinYT.player.setVolume(vol);
    };

    // Rating Functions
    document.ciulinYT.func.likeThis = function() {
        if(BOOL_LOGIN == true) {
            document.querySelectorAll("#top-level-buttons-computed ytd-toggle-button-renderer")[0].click();
            if(document.querySelector("#watch-like").classList.contains("liked")) {
                document.querySelector("#watch-like").classList.remove("liked");
                document.querySelector("span.likes").innerText = (new Number(document.querySelector("span.likes").innerText.replace(/,/g, "")) - 1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            } else {
                document.querySelector("#watch-like").classList.add("liked");
                if(document.querySelector("#watch-unlike").classList.contains("unliked")) {
                    document.querySelector("span.dislikes").innerText = (new Number(document.querySelector("span.dislikes").innerText.replace(/,/g, "")) - 1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                };
                document.querySelector("#watch-unlike").classList.remove("unliked");
                document.querySelector("span.likes").innerText = (new Number(document.querySelector("span.likes").innerText.replace(/,/g, "")) + 1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            };
        };
    };
    document.ciulinYT.func.dislikeThis = function() {
        if(BOOL_LOGIN == true) {
            document.querySelectorAll("#top-level-buttons-computed ytd-toggle-button-renderer")[1].click();
            if(document.querySelector("#watch-unlike").classList.contains("unliked")) {
                document.querySelector("#watch-unlike").classList.remove("unliked");
                document.querySelector("span.dislikes").innerText = (new Number(document.querySelector("span.dislikes").innerText.replace(/,/g, "")) - 1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            } else {
                document.querySelector("#watch-unlike").classList.add("unliked");
                if(document.querySelector("#watch-like").classList.contains("liked")) {
                    document.querySelector("span.likes").innerText = (new Number(document.querySelector("span.likes").innerText.replace(/,/g, "")) - 1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                };
                document.querySelector("#watch-like").classList.remove("liked");
                //document.querySelector("span.likes").innerText = new Number(document.querySelector("span.likes").innerText) - 1;
                document.querySelector("span.dislikes").innerText = (new Number(document.querySelector("span.dislikes").innerText.replace(/,/g, "")) + 1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            };
        };
    };

    // Load Video Function
    document.ciulinYT.func.loadVideo = function(id) {
        if(!id) return console.error("No ID was specified");
        var description;
        description = new Promise(async resolve => {
            var quick = new XMLHttpRequest();
            quick.open("GET", "https://www.youtube.com/watch?v=" + id);
            quick.onload = function(e) {
                let a = JSON.parse(quick.response.split("var ytInitialPlayerResponse = ")[1].split(";var")[0]).videoDetails;
                if(a) {
                    return resolve(a.shortDescription);
                }
            }
            quick.send();
        });
        var xhr = new XMLHttpRequest();
        xhr.open("GET", `https://www.youtube.com/${window.location.pathname}/videos`);
        xhr.onload = async function(e) {
            let a = JSON.parse(xhr.response.split("var ytInitialData = ")[1].split(";</script>")[0]).contents.twoColumnBrowseResultsRenderer.tabs;
            try {
                a = a.find(a => a.tabRenderer.endpoint.commandMetadata.webCommandMetadata.url.split("/")[3] === 'videos');
            } catch(err) {
            }
            if(a.tabRenderer) {
                var b = a.tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].gridRenderer.items;
                try {
                    b = b.find(a => a.gridVideoRenderer.videoId === id);
                    b = b.gridVideoRenderer;
                } catch(err) {
                    return console.error("Video does not exist or can't be found");
                }
                document.querySelector("#playnav-curvideo-title a").removeAttribute("onclick");
                document.querySelector("#playnav-curvideo-title a").setAttribute("href", "/watch?v=" + b.videoId);
                document.querySelector("#playnav-curvideo-title a").innerText = b.title.runs[0].text;
                document.querySelector("#playnav-curvideo-info-line span[dir='ltr']").innerText = b.publishedTimeText.simpleText;
                document.querySelector("#playnav-curvideo-description").innerText = await description;
                document.querySelector("#playnav-curvideo-view-count").innerText = b.viewCountText.simpleText.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                document.querySelector("#playnav-watch-link").href = "https://www.youtube.com/watch?v=" + b.videoId;
                document.ciulinYT.player.loadVideoById(b.videoId, 1);
            }
        }
        xhr.onerror = function () {
            console.error("** An error occurred during the XMLHttpRequest");
        };
        xhr.send();
    };

    // Modal Function
    document.ciulinYT.func.showModal = function(text) {
        alert(text);
    };

    // Subscribe Function
    document.ciulinYT.func.subscribe = async function() {
        if(BOOL_LOGIN == true) {
            var str = ytInitialData.metadata ? ytInitialData.metadata.channelMetadataRenderer.title : "";
            if(str == document.ciulinYT.data.name) {
                return document.ciulinYT.func.showModal("No need to subscribe to yourself!");
            };
            var a = getSubscription() ? true : false;
            if(a == true) {
                document.querySelector("ytd-subscribe-button-renderer tp-yt-paper-button").click();
                await waitForElm("#confirm-button").then((elm) => {elm.click()});
                document.querySelectorAll(".subscribe-button .yt-uix-button-content").forEach(function(a) { a.innerText = "Subscribe"});
                document.querySelector(".yt-subscription-button").classList.remove("subscribed");
                BOOL_SUBSCRIBED = "subscribe";
            } else {
                document.querySelector("ytd-subscribe-button-renderer tp-yt-paper-button").click();
                document.querySelectorAll(".subscribe-button .yt-uix-button-content").forEach(function(a) { a.innerText = "Subscribed"});
                document.querySelector(".yt-subscription-button").classList.add("subscribed");
                BOOL_SUBSCRIBED = "subscribed";
            };

        };
    };

    // ProPos
    function ProPosUp(e){
        var left = e.currentTarget.offsetLeft;
        var width = e.currentTarget.offsetWidth;
        var position = (e.pageX - left) / width * 100;
        return position;
    };

    document.ciulinYT.func.preProPos = function(e) {
        var bar = e.currentTarget.querySelector("#playbar-progressbar");
        bar.style.width = ProPosUp(e) + '%';
    };

    document.ciulinYT.func.setProPos = function(e) {
        document.ciulinYT.player.seekTo((e.pageX - e.currentTarget.offsetLeft) / 640 * document.ciulinYT.player.getDuration());
    };

    // loadGuideNav Function
    document.ciulinYT.func.loadGuideNav = function(a) {
        var guide = document.querySelector("#guide");
        if(guide.getAttribute("data-last-clicked-item") !== a.getAttribute("data-feed-name")) {
            guide.setAttribute("data-last-clicked-item", a.getAttribute("data-feed-name"));
            document.querySelector(".selected-child").classList.remove("selected-child");
            document.querySelector(".selected").classList.remove("selected");
            a.parentNode.classList.add("selected-child");
            a.classList.add("selected");
            document.querySelector("#feed-loading-template").classList.remove("hid");
            document.querySelector("#feed-main-youtube").classList.add("hid");
            document.querySelector("#feed-error").classList.add("hid");
            var url = a.getAttribute("data-feed-url");
            var xhr = new XMLHttpRequest();
            xhr.open("GET", `https://www.youtube.com/${url}`);
            xhr.timeout = 4000;
            xhr.ontimeout = function () {
                console.error("** An error occurred during the XMLHttpRequest");
                document.querySelector("#feed-loading-template").classList.add("hid");
                document.querySelector("#feed-error").classList.remove("hid");
            };
            xhr.onload = function(e) {
                let b = JSON.parse(xhr.response.split("var ytInitialData = ")[1].split(";</script>")[0]).contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content;
                let v = b.sectionListRenderer ? b.sectionListRenderer : b.richGridRenderer;
                let x = v.contents[0].itemSectionRenderer ? v.contents[0].itemSectionRenderer.contents[0].shelfRenderer.content.expandedShelfContentsRenderer.items : v.contents;
                let i;
                var OBJ_VIDEOS = "";
                document.querySelector(".feed-header-info").innerText = a.querySelector(".display-name").innerText;
                for (i = 0; i < x.length; i++) {
                    let z = x[i].richItemRenderer ? x[i].richItemRenderer.content : x[i].videoRenderer;
                    if(!x[i].richSectionRenderer && !x[i].continuationItemRenderer && !z.displayAdRenderer && !z.radioRenderer) {
                    let a = x[i].videoRenderer ? x[i].videoRenderer : x[i].richItemRenderer.content.videoRenderer;
                    OBJ_VIDEOS += `<li class="feed-item-container">
            <div class="feed-item upload">
            <div class="feed-item-content">
            <h3 class="feed-item-title">
            <span class="feed-item-author">
            <a href="http://www.youtube.com${a.ownerText.runs[0].navigationEndpoint.browseEndpoint.canonicalBaseUrl}" class="yt-user-photo">
            <span class="video-thumb ux-thumb ux-thumb-profile-24">
            <span class="clip">
            <span class="clip-inner">
            <img src="${a.channelThumbnailSupportedRenderers.channelThumbnailWithLinkRenderer.thumbnail.thumbnails[0].url}" alt="${a.ownerText.runs[0].text}">
            <span class="vertical-align"></span>
            </span>
            </span>
            </span>
            </a>
            </span>
            <span class="feed-item-owner">
            <a href="http://www.youtube.com${a.ownerText.runs[0].navigationEndpoint.browseEndpoint.canonicalBaseUrl}" class="yt-user-name" dir="ltr">${a.ownerText.runs[0].text}</a>
            </span> ${a.publishedTimeText ? "uploaded" : "is LIVE"} <span class="time-created">${a.publishedTimeText ? a.publishedTimeText.simpleText : ""}</span>
            </h3>
            <div class="feed-item-visual">
            <div class="feed-item-visual-thumb">
            <a class="ux-thumb-wrap contains-addto yt-uix-sessionlink" href="http://www.youtube.com/watch?v=${a.videoId}">
            <span class="video-thumb ux-thumb ux-thumb-288">
            <span class="clip">
            <span class="clip-inner">
            <img src="//i3.ytimg.com/vi/${a.videoId}/hqdefault.jpg" alt="Thumbnail">
            <span class="vertical-align"></span>
            </span>
            </span>
            </span>
            <span class="video-time">${a.thumbnailOverlays[0].thumbnailOverlayTimeStatusRenderer ? a.thumbnailOverlays[0].thumbnailOverlayTimeStatusRenderer.text.simpleText : "LIVE"}</span>
            <button type="button" class="addto-button short video-actions yt-uix-button yt-uix-button-short" onclick=";return false;" role="button">
            <img class="yt-uix-button-icon yt-uix-button-icon-addto" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
            <span class="yt-uix-button-content">
            <span class="addto-label">Add to</span>
            </span>
            <img class="yt-uix-button-arrow" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
            </button>
            </a>
            </div>
            <div class="feed-item-visual-content">
            <div class="feed-item-visual-description">
            <h4>
            <a class="title yt-uix-sessionlink" href="http://www.youtube.com/watch?v=${a.videoId}" dir="ltr">${a.title.runs[0].text}</a>
            </h4>
            <div class="description" dir="ltr">
            <p>${a.descriptionSnippet ? a.descriptionSnippet.runs[0].text : ""}</p>
            </div>
            </div>
            <p class="metadata">
            <a href="http://www.youtube.com${a.ownerText.runs[0].navigationEndpoint.browseEndpoint.canonicalBaseUrl}" class="yt-user-name" dir="ltr">${a.ownerText.runs[0].text}</a>
            <span class="view-count">${a.viewCountText.simpleText ? a.viewCountText.simpleText : a.viewCountText.runs[0].text + a.viewCountText.runs[1].text}</span>
            </p>
            </div>
            </div>
            </div>
            </div>
            </li>`;
                    };
                };
                document.querySelector(".feed-list").innerHTML = OBJ_VIDEOS;
                document.querySelector("#feed-loading-template").classList.add("hid");
                document.querySelector("#feed-main-youtube").classList.remove("hid");
            };
            xhr.send();
        };
    };
    };

    if(window.location.pathname.split("/")[1] == "embed"){
        document.querySelector(".ytp-show-cards-title").parentNode.removeChild(document.querySelector(".ytp-show-cards-title"));
        waitForElm(".ytp-watermark").then((elm) => {elm.parentNode.removeChild(elm)});
        waitForElm(".html5-endscreen").then((elm) => {elm.parentNode.removeChild(elm)});
        waitForElm(".ytp-pause-overlay").then((elm) => {elm.parentNode.removeChild(elm)});
    };
})();