// ==UserScript==
// @name         Ciulin's YouTube
// @namespace    https://www.youtube.com/*
// @version      0.4.6
// @description  Broadcast Yourself
// @author       CiulinUwU
// @updateURL    https://github.com/ciulinuwu/ciulin-s-youtube/raw/main/Ciulin's%20YouTube.user.js
// @downloadURL  https://github.com/ciulinuwu/ciulin-s-youtube/raw/main/Ciulin's%20YouTube.user.js
// @match        https://www.youtube.com/*
// @exclude      https://www.youtube.com/embed/*
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
    document.wegiYT = {};

    document.wegiYT.data = {};
    document.wegiYT.func = {};
    var BOOL_LOGIN = null;
    var BOOL_SUBSCRIBED = "";
    var VALUE_USERNAME;

    document.wegiYT.load = async function(name) {
        if(name == "recent_feed") {
            document.wegiYT.data.communityPosts = new Promise(async resolve => {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", `https://www.youtube.com/${window.location.pathname}/community`);
                xhr.onload = function(e) {
                    let a = JSON.parse(xhr.response.split("var ytInitialData = ")[1].split(";</script>")[0]).contents.twoColumnBrowseResultsRenderer.tabs;

                    try {
                        a = a.find(a => a.tabRenderer.title === 'Community');
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

            var posts = await document.wegiYT.data.communityPosts;
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
            document.wegiYT.data.channelVideos = new Promise(async resolve => {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", `https://www.youtube.com/${window.location.pathname}/videos`);
                xhr.onload = function(e) {
                    let a = JSON.parse(xhr.response.split("var ytInitialData = ")[1].split(";</script>")[0]).contents.twoColumnBrowseResultsRenderer.tabs;

                    try {
                        a = a.find(a => a.tabRenderer.title === 'Videos');
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

            var videos = await document.wegiYT.data.channelVideos;
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
                <a href="http://www.youtube.com/watch?v=${object.videoId}" onclick="document.wegiYT.func.loadVideo('${object.videoId}');return false;" class="ux-thumb-wrap contains-addto">
                <span class="video-thumb ux-thumb-96 ">
                <span class="clip">
                <img src="//i1.ytimg.com/vi/${object.videoId}/default.jpg" alt="Thumbnail" class="" onclick="document.wegiYT.func.loadVideo('${object.videoId}');return false;" title="${object.title}">
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
                <a href="http://www.youtube.com/watch?v=${object.videoId}" class="playnav-item-title ellipsis" onclick="document.wegiYT.func.loadVideo('${object.videoId}');return false;" id="playnav-video-title-play-uploads-12-${object.videoId}">
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

    function waitForElm(selector) {
  return new Promise((resolve, reject) => {
    let el = document.querySelector(selector);
    if (el) {
      resolve(el);
      return
    }
    new MutationObserver((mutationRecords, observer) => {
      // Query for elements matching the specified selector
      Array.from(document.querySelectorAll(selector)).forEach((element) => {
        resolve(element);
        //Once we have resolved we don't need the observer anymore.
        observer.disconnect();
      });
    })
      .observe(document.documentElement, {
        childList: true,
        subtree: true
      });
  });
    };

    // Get Subscription Data
    function getSubscription() {
        if(window.location.pathname.split("/")[1].match(/channel|user|^c{1}$/i)) {
            if(document.querySelector(".ytd-subscribe-button-renderer")) {
                return document.querySelector(".ytd-subscribe-button-renderer").innerText.replace(/(\n| )/gi, "");
            } else {
                return "Subscribe";
            }
        }
        if(window.location.pathname.split("/")[1].match(/watch/i)) {
            return ytInitialData.contents.twoColumnWatchNextResults.results.results.contents[1].videoSecondaryInfoRenderer.owner.videoOwnerRenderer.subscriptionButton.subscribed ? "subscribed" : "subscribe"
        }
    }

    // Build Classic YouTube
    async function buildYouTube() {
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
        var O_DOMBODYNEW = document.createElement("old_body");
        var index;
        while (O_DOMBODY.firstChild) {
            O_DOMBODYNEW.appendChild(O_DOMBODY.firstChild);
        }
        for (index = O_DOMBODY.attributes.length - 1; index >= 0; --index) {
            O_DOMBODYNEW.attributes.setNamedItem(O_DOMBODY.attributes[index].cloneNode());
        }
        O_DOMBODYNEW.style = "display:none";
        O_DOMBODY.parentNode.replaceChild(O_DOMBODYNEW, O_DOMBODY);

        var o_DOMBODY = document.querySelector("old_body");
        var DOMBODY = document.createElement("body");
        DOMBODY.setAttribute("class", "date-" + VALUE_DATE + " " + VALUE_LANG + " ltr thumb-normal");
        DOMBODY.setAttribute("dir", "ltr");
        DOMHTML.appendChild(DOMBODY);

        // Userbar

        // SET USERNAME
            var VALUE_USERLINK;

        var OBJ_LOGIN = ``;
        if(getCookie("APISID")) {
            // GET USERNAME
            var T_OPENAVTAR = await waitForElm("#avatar-btn").then((elm) => {document.querySelectorAll("ytd-topbar-menu-button-renderer")[2].click()});
            var T_GETNAME = await waitForElm("#account-name").then((elm) => {document.wegiYT.data.name = elm.innerText;document.wegiYT.data.link = document.querySelector("ytd-compact-link-renderer #endpoint").href});

            VALUE_USERNAME = document.wegiYT.data.name;
            VALUE_USERLINK = document.wegiYT.data.link;

            OBJ_LOGIN = `<a href="${VALUE_USERLINK}">${VALUE_USERNAME}</a>`;
            BOOL_LOGIN = true;
        } else {
            var login_url = "https://accounts.google.com/ServiceLogin?service=youtube&uilel=3&passive=true&continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Faction_handle_signin%3Dtrue%26app%3Ddesktop%26hl%3Den%26next%3Dhttps%253A%252F%252Fwww.youtube.com%252F&hl=en&ec=65620";
            OBJ_LOGIN = `<a class="start" href="https://www.youtube.com/signup">Create Account</a><span class="masthead-link-separator">|</span><a class="end" href="${login_url}">Sign In</a>`;
            BOOL_LOGIN = false;
        };

        var OBJ_USER = `<div id="masthead-user-bar-container"><div id="masthead-user-bar"><div id="masthead-user">${OBJ_LOGIN}</div></div></div>`;
        var OBJ_MASTHEAD;
        var OBJ_FOOTER;

        var OBJ_CHANNEL = "";

        // Home Page (WIP)
        if(window.location.pathname == "/") {
            DOMHEAD.innerHTML += '<link rel="stylesheet" href="//s.ytimg.com/yt/cssbin/www-guide-vflOh_ROh.css">';
            var list_of_videos = ytInitialData.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.richGridRenderer.contents;
            var OBJ_VIDEOS = "";
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
                }
            }

            var T_OPENGUIDE = await waitForElm("#guide-button").then((elm) => {elm.click()});
            var OBJ_SUBS = [];
            var T_GUIDERENDERER = await waitForElm("#guide-renderer").then((elm) => {
                console.debug(document.querySelectorAll("ytd-guide-section-renderer")[1].querySelectorAll("ytd-guide-entry-renderer.ytd-guide-section-renderer"))
            });

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
            <a class="guide-item selected" data-feed-name="youtube" data-feed-url="" onclick="document.wegiYT.func.loadGuideNav(this)">
            <span class="thumb">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="" class="system-icon category">
            </span>
            <span class="display-name">From YouTube</span>
            </a>
            </h3>
            <ul>
            <li class="guide-item-container ">
            <a class="guide-item" data-feed-name="trending" data-feed-url="feed/trending" onclick="document.wegiYT.func.loadGuideNav(this)">
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
            setInterval(() => {document.body.style = ""}, 1000)
        }

        // Watch (WIP)
        if(window.location.pathname.split("/")[1].match(/watch/i)) {
            var VALUE_VIDEOTITLE = ytInitialData.contents.twoColumnWatchNextResults.results.results.contents[0].videoPrimaryInfoRenderer.title.runs[0].text;
            var VALUE_VIDEODATE = ytInitialData.contents.twoColumnWatchNextResults.results.results.contents[0].videoPrimaryInfoRenderer.dateText.simpleText.split(" ").splice(1).join(" ");
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
                if(VALUE_VIDEODESCRIPTIO[i].navigationEndpoint && VALUE_VIDEODESCRIPTIO[i].navigationEndpoint.urlEndpoint && !VALUE_VIDEODESCRIPTIO[i].loggingDirectives) {
                    var a = VALUE_VIDEODESCRIPTIO[i].navigationEndpoint.urlEndpoint.url.split("q=")[1] ? VALUE_VIDEODESCRIPTIO[i].navigationEndpoint.urlEndpoint.url.split("q=")[1] : VALUE_VIDEODESCRIPTIO[i].navigationEndpoint.urlEndpoint.url;
                    console.log(a)
                    VALUE_VIDEODESCRIPTION += `<a href="${decodeURIComponent(a)}" target="_blank" title="${decodeURIComponent(a)}" rel="nofollow" dir="ltr" class="yt-uix-redirect-link">${decodeURIComponent(a)}</a></p>`;
                };
                if(VALUE_VIDEODESCRIPTIO[i].loggingDirectives) {
                    VALUE_VIDEOTAG.push(VALUE_VIDEODESCRIPTIO[i].text.split("#")[1])
                };
                if(!VALUE_VIDEODESCRIPTIO[i].navigationEndpoint && !VALUE_VIDEODESCRIPTIO[i].loggingDirectives) {
                    VALUE_VIDEODESCRIPTION += VALUE_VIDEODESCRIPTIO[i].text;
                };
            };
            for (i = 0; i < VALUE_VIDEOTAG.length; i++) {
                VALUE_VIDEOTAGS += `<li><a href="https://www.youtube.com/results?search_query=${VALUE_VIDEOTAG[i]}&amp;search=tag">${VALUE_VIDEOTAG[i]}</a></li>`;
            }
            VALUE_VIDEODESCRIPTION = VALUE_VIDEODESCRIPTION.replace(/(?:\r\n|\r|\n)/g, '<br>');
            var VALUE_SUGGESTEDVIDEO = ytInitialData.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results[1].itemSectionRenderer.contents;
            var OBJ_SUGGESTEDVIDEOS = "";
            for (i = 0; i < VALUE_SUGGESTEDVIDEO.length; i++) {
                if(!VALUE_SUGGESTEDVIDEO[i].continuationItemRenderer && VALUE_SUGGESTEDVIDEO[i].compactVideoRenderer) {
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
            <span class="stat view-count">${VALUE_SUGGESTEDVIDEO[i].compactVideoRenderer.viewCountText.simpleText}</span>
            </a>
            </li>`;
                }
            }

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
            <button href="" type="button" class="yt-subscription-button yt-subscription-button-js-default end yt-uix-button ${getSubscription()}" onclick="document.wegiYT.func.subscribe();return false;" role="button">
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
            <div id="watch-video">
            <div id="video_player"></div>
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
            <button onclick="document.wegiYT.func.likeThis();return false;" title="I like this" type="button" class="start yt-uix-tooltip-reverse yt-uix-button yt-uix-tooltip ${isLiked}" id="watch-like" role="button">
            <img class="yt-uix-button-icon yt-uix-button-icon-watch-like" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="I like this">
            <span class="yt-uix-button-content">Like</span>
            </button>
            <button onclick="document.wegiYT.func.dislikeThis();return false;" title="I dislike this" type="button" class="end yt-uix-tooltip-reverse yt-uix-button yt-uix-tooltip yt-uix-button-empty ${isDisliked}" id="watch-unlike" role="button">
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
            <button onclick=";return false;" title="Flag as inappropriate" type="button" class="yt-uix-tooltip-reverse yt-uix-button yt-uix-tooltip yt-uix-button-empty" id="watch-flag" data-button-action="yt.www.watch.actions.flag" role="button"><img class="yt-uix-button-icon yt-uix-button-icon-watch-flag" src="//web.archive.org/web/20111207174929im_/https://s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Flag as inappropriate"></button>
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
            </div>`
        }

        // Channel (WIP)
        if(window.location.pathname.split("/")[1].match(/channel|user|^c{1}$/i)) {
            if (/community|videos|about|channels|playlists|membership|store/.test(window.location.pathname.split("/")[3])) window.location.href = window.location.pathname.split("/").slice(0,3).join("/")
            let channelData = await new Promise(resolve => {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", `https://www.youtube.com/${window.location.pathname}/about`)
                xhr.onload = function(e) {
                    var a = JSON.parse(xhr.response.split("var ytInitialData = ")[1].split(";</script>")[0]).contents.twoColumnBrowseResultsRenderer.tabs;
                    var i;
                    for (i = 0; i < a.length; i++) {
                        if(!a[i].expandableTabRenderer && a[i].tabRenderer.title == "About") {
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
                OBJ_SUBSCRIBE = getSubscription();
            //}

            var VALUE_SUBSCRIB = await waitForElm("#subscriber-count").then((elm) => {document.wegiYT.data.subcount = elm.innerText.split(" ")[0]});
            VALUE_SUBSCRIBE = document.wegiYT.data.subcount;
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
            <button type="button" class="subscribe-button yt-uix-button yt-uix-button-urgent yt-uix-tooltip" onclick="document.wegiYT.func.subscribe();return false;" title="Click to be notified of new videos from this channel" role="button">
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

            OBJ_RECENTACT = await document.wegiYT.load("recent_feed")

            OBJ_RIGHTCOLL = `<div class="right-column" id="main-channel-right">
            ${OBJ_RECENTACT}
            <div class="clear"></div>
            </div>`

            OBJ_CHANCON = `<div class="outer-box" id="main-channel-content" style="z-index: 0">
            ${OBJ_LEFTCOLL}${OBJ_RIGHTCOLL}
            <div class="cb"></div>
            </div>`

            var OBJ_HOMEVIDEO = ytInitialData.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].channelVideoPlayerRenderer;
            var dec = "";

            if(OBJ_HOMEVIDEO) {
                dec = OBJ_HOMEVIDEO.description ? OBJ_HOMEVIDEO.description.runs[0].text : "";
                document.querySelector("old_body").querySelector("ytd-player").parentNode.removeChild(document.querySelector("old_body").querySelector("ytd-player"))
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

            var OBJ_VIDEOS = await document.wegiYT.load("channel_videos")

            var OBJ_PLAYNAVA = `<div id="playnav-body">
            <div id="playnav-player" class="playnav-player-container" style="visibility: visible; left: 0px;">
            <div style="width:640px; height: 390px; background-color: #000;" id="video_player"></div>
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
            <button type="button" class="subscribe-button yt-uix-button yt-uix-button-urgent yt-uix-tooltip" onclick="document.wegiYT.func.subscribe();return false;" title="Click to be notified of new videos from this channel" role="button" data-tooltip-text="Click to be notified of new videos from this channel">
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

            OBJ_CHANNEL = `<div id="channel-body" style="background-color: rgb(204, 204, 204)" class="jsloaded">
            <div id="channel-base-div">
            ${OBJ_PLAYNAV}
            ${OBJ_CHANCON}
            </div>
            </div>
            <div class="cb">
            <div class="clear"></div>
            </div>`
        }

        // Search Results
        if(window.location.pathname.split("/")[1].match(/results/i)) {
            var searchpar = (new URL(document.location)).searchParams.get("search_query");
            var i;
            var results = ytInitialData.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0].itemSectionRenderer.contents;
            var parse = "";
            DOMHEAD.innerHTML += '<link rel="stylesheet" href="//s.ytimg.com/yt/cssbin/www-refresh-vflj_nHFo.css">';

            for(i = 0; i < results.length; i++) {
                if(results[i].videoRenderer) {
                    var description = results[i].videoRenderer.detailedMetadataSnippets ? results[i].videoRenderer.detailedMetadataSnippets[0].snippetText.runs[0].text : "";
                    var time = results[i].videoRenderer.lengthText ? results[i].videoRenderer.lengthText.simpleText : "LIVE";

                    var pub = results[i].videoRenderer.publishedTimeText ? results[i].videoRenderer.publishedTimeText.simpleText: "";
                    var main = `<div class="result-item yt-uix-tile yt-tile-default *sr">
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
            <a href="http://www.youtube.com${results[i].videoRenderer.longBylineText.runs[0].navigationEndpoint.browseEndpoint.canonicalBaseUrl}" class="yt-user-name " dir="ltr">${results[i].videoRenderer.ownerText.runs[0].text}</a> <span class="metadata-separator">|</span>  <span class="date-added">${pub}</span> <span class="metadata-separator">|</span>  <span class="viewcount">${results[i].videoRenderer.viewCountText.simpleText ? results[i].videoRenderer.viewCountText.simpleText : results[i].videoRenderer.viewCountText.runs[0].text + results[i].videoRenderer.viewCountText.runs[1].text}</span>
            </p>
            </div>
            </div>`;
                    parse += main;
                }
            }



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
            <button type="button" class="yt-uix-button yt-uix-button-text" onclick=";return false;" role="button">
            <span class="yt-uix-button-content">Relevance </span>
            <img class="yt-uix-button-arrow" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
            <ul class="yt-uix-button-menu yt-uix-button-menu-text hid" role="menu" aria-haspopup="true" style="min-width: 92px; left: 902.467px; top: 210px; display: none;">
            <li role="menuitem" id="aria-id-68537613644">
            <span href="http://www.youtube.com/results?search_type=videos&amp;search_query=${searchpar}&amp;search_sort=video_date_uploaded" class=" yt-uix-button-menu-item" onclick=";window.location.href=this.getAttribute('href');return false;">Upload date</span>
            </li>
            <li role="menuitem" id="aria-id-52246167700">
            <span href="http://www.youtube.com/results?search_type=videos&amp;search_query=${searchpar}&amp;search_sort=video_view_count" class=" yt-uix-button-menu-item" onclick=";window.location.href=this.getAttribute('href');return false;">View count</span>
            </li>
            <li role="menuitem" id="aria-id-43856570253">
            <span href="http://www.youtube.com/results?search_type=videos&amp;search_query=${searchpar}&amp;search_sort=video_avg_rating" class=" yt-uix-button-menu-item" onclick=";window.location.href=this.getAttribute('href');return false;">Rating</span>
            </li>
            </ul>
            </button>
            </div>
            <button type="button" id="lego-refine-toggle" onclick=";return false;" class="yt-uix-button yt-uix-button-text" data-button-toggle="true" role="button">
            <span class="yt-uix-button-content">Filter </span>
            <img class="yt-uix-button-arrow" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
            </button>
            <div id="search-lego-refinements" class="hid" style="display: none;">
            <div class="search-refinements-block search-refinements-links">
            <div class="search-refinements-block-title">Sort by</div>
            <ul>
            <li>
            <span class="lego-content-selected">Relevance</span>
            </li>
            <li>
            <a href="http://www.youtube.com/results?search_type=videos&amp;search_query=${searchpar}&amp;search_sort=video_date_uploaded">Upload date</a>
            </li>
            <li>
            <a href="http://www.youtube.com/results?search_type=videos&amp;search_query=${searchpar}&amp;search_sort=video_view_count">View count</a>
            </li>
            <li>
            <a href="http://www.youtube.com/results?search_type=videos&amp;search_query=${searchpar}&amp;search_sort=video_avg_rating">Rating</a>
            </li>
            </ul>
            </div>
            <div class="search-refinements-block filters">
            <div class="search-refinements-block-title">Filter</div>
            <ul>
            <li>
            <span class="lego lego-property  append-lego" data-lego-name="today">
            <a class="lego-action" title="Search for ${searchpar}, today" href="http://www.youtube.com/results?search_query=${searchpar}%2C+today">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif"></a>
            <a class="lego-action-placeholder" title="Search for ${searchpar}, today" href="http://www.youtube.com/results?search_query=${searchpar}%2C+today">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif"></a>
            <a class="lego-content" title="Search for ${searchpar}, today" href="http://www.youtube.com/results?search_query=${searchpar}%2C+today">uploaded today</a>
            </span>
            </li>
            <li>
            <span class="lego lego-property  append-lego" data-lego-name="this week">
            <a class="lego-action" title="Search for ${searchpar}, this week" href="http://www.youtube.com/results?search_query=${searchpar}%2C+this+week">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif"></a>
            <a class="lego-action-placeholder" title="Search for ${searchpar}, this week" href="http://www.youtube.com/results?search_query=${searchpar}%2C+this+week">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif"></a>
            <a class="lego-content" title="Search for ${searchpar}, this week" href="http://www.youtube.com/results?search_query=${searchpar}%2C+this+week">uploaded this week</a>
            </span>
            </li>
            <li>
            <span class="lego lego-property  append-lego" data-lego-name="this month">
            <a class="lego-action" title="Search for ${searchpar}, this month" href="http://www.youtube.com/results?search_query=${searchpar}%2C+this+month">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
            </a>
            <a class="lego-action-placeholder" title="Search for ${searchpar}, this month" href="http://www.youtube.com/results?search_query=${searchpar}%2C+this+month">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
            </a>
            <a class="lego-content" title="Search for ${searchpar}, this month" href="http://www.youtube.com/results?search_query=${searchpar}%2C+this+month">uploaded this month</a>
            </span>
            </li>
            </ul>
            </div>
            <div class="search-refinements-block filters">
            <div class="search-refinements-block-title">&nbsp;</div>
            <ul>
            <li>
            <span class="lego lego-property  append-lego" data-lego-name="channel">
            <a class="lego-action" title="Search for ${searchpar}, channel" href="http://www.youtube.com/results?search_query=${searchpar}%2C+channel">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
            </a>
            <a class="lego-action-placeholder" title="Search for ${searchpar}, channel" href="http://www.youtube.com/results?search_query=${searchpar}%2C+channel">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
            </a>
            <a class="lego-content" title="Search for ${searchpar}, channel" href="http://www.youtube.com/results?search_query=${searchpar}%2C+channel">channel</a>
            </span>
            </li>
            <li>
            <span class="lego lego-property  append-lego" data-lego-name="playlist">
            <a class="lego-action" title="Search for ${searchpar}, playlist" href="http://www.youtube.com/results?search_query=${searchpar}%2C+playlist">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
            </a>
            <a class="lego-action-placeholder" title="Search for ${searchpar}, playlist" href="http://www.youtube.com/results?search_query=${searchpar}%2C+playlist">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
            </a>
            <a class="lego-content" title="Search for ${searchpar}, playlist" href="http://www.youtube.com/results?search_query=${searchpar}%2C+playlist">playlist</a>
            </span>
            </li>
            <li>
            <span class="lego lego-property  append-lego" data-lego-name="movie">
            <a class="lego-action" title="Search for ${searchpar}, movie" href="http://www.youtube.com/results?search_query=${searchpar}%2C+movie">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
            </a>
            <a class="lego-action-placeholder" title="Search for ${searchpar}, movie" href="http://www.youtube.com/results?search_query=${searchpar}%2C+movie">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
            </a>
            <a class="lego-content" title="Search for ${searchpar}, movie" href="http://www.youtube.com/results?search_query=${searchpar}%2C+movie">movie</a>
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
            </div>`
        }

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
        </div>`
    }
    window.onload = buildYouTube();
    if(window.location.pathname.split("/")[1].match(/watch/i)) {
        waitForElm("#video_player").then((elm) => {
            var tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            var firstScriptTag = document.querySelector("#video_player");
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            function insertAfter(newNode, existingNode) {
                existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
            }

            var time = window.location.href.split("t=")[1] ? window.location.href.split("t=")[1].split("s")[0] : 1;
            var a = document.createElement("script")
            a.innerText = `function onYouTubeIframeAPIReady() {
                document.wegiYT.player = new YT.Player('video_player', {
                    height: '390',
                    width: '640',
                    videoId: ytInitialPlayerResponse.videoDetails.videoId,
                    playerVars: {
                        'enablejsapi': 1,
                        'rel': 0,
                        'origin': 'https://www.youtube.com',
                        'start': '${time}'
                    }
                });
            }`;
            insertAfter(a, firstScriptTag);

            document.querySelector("ytd-player").parentNode.removeChild(document.querySelector("ytd-player"));

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
            })
        })
    };
    if(window.location.pathname.split("/")[1].match(/channel|user|^c{1}$/i)) {
       waitForElm("#video_player").then((elm) => {
            var tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            var firstScriptTag = document.querySelector("#video_player");
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            function insertAfter(newNode, existingNode) {
                existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
            }

            var a = document.createElement("script")
            a.innerText = `function onYouTubeIframeAPIReady() {
                document.wegiYT.player = new YT.Player('video_player', {
                    height: '390',
                    width: '640',
                    videoId: ytInitialData.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].channelVideoPlayerRenderer ? ytInitialData.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].channelVideoPlayerRenderer.videoId : "",
                    playerVars: {
                        'enablejsapi': 1,
                        'rel': 0
                    }
                });
            }`;
            insertAfter(a, firstScriptTag);
        })
    }

    // Rating Functions
    document.wegiYT.func.likeThis = function() {
        if(BOOL_LOGIN == true) {
            document.querySelectorAll("#top-level-buttons-computed ytd-toggle-button-renderer")[0].click();
            if(document.querySelector("#watch-like").classList.contains("liked")) {
                document.querySelector("#watch-like").classList.remove("liked");
                document.querySelector("span.likes").innerText = (new Number(document.querySelector("span.likes").innerText.replace(/,/g, "")) - 1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            } else {
                document.querySelector("#watch-like").classList.add("liked");
                if(document.querySelector("#watch-unlike").classList.contains("unliked")) {
                    document.querySelector("span.dislikes").innerText = (new Number(document.querySelector("span.dislikes").innerText.replace(/,/g, "")) - 1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }
                document.querySelector("#watch-unlike").classList.remove("unliked");
                document.querySelector("span.likes").innerText = (new Number(document.querySelector("span.likes").innerText.replace(/,/g, "")) + 1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
        }
    }
    document.wegiYT.func.dislikeThis = function() {
        if(BOOL_LOGIN == true) {
            document.querySelectorAll("#top-level-buttons-computed ytd-toggle-button-renderer")[1].click();
            if(document.querySelector("#watch-unlike").classList.contains("unliked")) {
                document.querySelector("#watch-unlike").classList.remove("unliked");
                document.querySelector("span.dislikes").innerText = (new Number(document.querySelector("span.dislikes").innerText.replace(/,/g, "")) - 1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            } else {
                document.querySelector("#watch-unlike").classList.add("unliked");
                if(document.querySelector("#watch-like").classList.contains("liked")) {
                    document.querySelector("span.likes").innerText = (new Number(document.querySelector("span.likes").innerText.replace(/,/g, "")) - 1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }
                document.querySelector("#watch-like").classList.remove("liked");
                //document.querySelector("span.likes").innerText = new Number(document.querySelector("span.likes").innerText) - 1;
                document.querySelector("span.dislikes").innerText = (new Number(document.querySelector("span.dislikes").innerText.replace(/,/g, "")) + 1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }
        }
    }

    // Load Video Function
    document.wegiYT.func.loadVideo = function(id) {
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
                a = a.find(a => a.tabRenderer.title === 'Videos');
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
                document.wegiYT.player.loadVideoById(b.videoId);
            }
        }
        xhr.onerror = function () {
            console.error("** An error occurred during the XMLHttpRequest");
        };
        xhr.send();
    }

    // Modal Function
    document.wegiYT.func.showModal = function(text) {
        alert(text)
    }

    // Subscribe Function
    document.wegiYT.func.subscribe = async function() {
        if(BOOL_LOGIN == true) {
            var str = ytInitialData.metadata ? ytInitialData.metadata.channelMetadataRenderer.title : "";
            if(str == document.wegiYT.data.name) {
                return document.wegiYT.func.showModal("No need to subscribe to yourself!")
            }

            if(getSubscription() == "subscribed") {
                document.querySelector("ytd-subscribe-button-renderer tp-yt-paper-button").click();
                await waitForElm("#confirm-button").then((elm) => {elm.click()})
                document.querySelectorAll(".subscribe-button .yt-uix-button-content").forEach(function(a) { a.innerText = "Subscribe"});
                document.querySelector(".yt-subscription-button").classList.remove("subscribed")
                BOOL_SUBSCRIBED = "subscribe";
            } else {
                document.querySelector("ytd-subscribe-button-renderer tp-yt-paper-button").click();
                document.querySelectorAll(".subscribe-button .yt-uix-button-content").forEach(function(a) { a.innerText = "Subscribed"});
                document.querySelector(".yt-subscription-button").classList.add("subscribed")
                BOOL_SUBSCRIBED = "subscribed";
            }

        }
    }

    // loadGuideNav Function
    document.wegiYT.func.loadGuideNav = async function(a) {
        var guide = document.querySelector("#guide");
        if(guide.getAttribute("data-last-clicked-item") !== a.getAttribute("data-feed-name")) {
            guide.setAttribute("data-last-clicked-item", a.getAttribute("data-feed-name"));
            document.querySelector(".selected-child").classList.remove("selected-child");
            document.querySelector(".selected").classList.remove("selected");
            a.parentNode.classList.add("selected-child");
            a.classList.add("selected");
            document.querySelector("#feed-loading-template").classList.remove("hid");
            document.querySelector("#feed-main-youtube").classList.add("hid");
            var url = a.getAttribute("data-feed-url");
            var xhr = new XMLHttpRequest();
            xhr.open("GET", `https://www.youtube.com/${url}`);
            xhr.onload = async function(e) {
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
                    }
                }
                document.querySelector(".feed-list").innerHTML = OBJ_VIDEOS;
                document.querySelector("#feed-loading-template").classList.add("hid");
                document.querySelector("#feed-main-youtube").classList.remove("hid");
            }
            xhr.send();
        }
    }
})();