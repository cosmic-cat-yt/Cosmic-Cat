// ==UserScript==
// @name         Ciulin's YouTube
// @namespace    https://www.youtube.com/*
// @version      0.1
// @description  Broadcast Yourself
// @author       CiulinUwU
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
    document.wegiYT = {};

    document.wegiYT.data = {};

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
                        a = null;
                    }
                    if(a) {
                        var b = a.tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents;
                        var j;
                        var data = {};
                        for (j = 0; j < b.length; j++) {
                            if(!b[j].continuationItemRenderer) {
                                data[j] = {};
                                data[j].text = "";
                                data[j].image = "";
                                console.log(b[j])
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
                    } else {
                        resolve({text: "This YouTube channel does not have a community tab!"});
                    }
                };
                xhr.onerror = function () {
                    resolve(undefined);
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
        }
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
        return new Promise(resolve => {
            if (document.querySelector(selector)) {
                return resolve(document.querySelector(selector));
            }

            const observer = new MutationObserver(mutations => {
                if (document.querySelector(selector)) {
                    resolve(document.querySelector(selector));
                    observer.disconnect();
                }
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        });
    };

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
        DOMHEAD.innerHTML += '<link rel="stylesheet" href="//theunknownlugiastudio.com/poopoo/www-refresh-vflzVUPsm.css">';
        DOMHEAD.innerHTML += '<link rel="stylesheet" href="//theunknownlugiastudio.com/poopoo/www-the-rest-vflNb6rAI.css">';

        // BODY
        var o_DOMBODY = document.createElement("old_body");
        o_DOMBODY.setAttribute("style", "display:none");
        DOMHTML.appendChild(o_DOMBODY);
        o_DOMBODY.appendChild(document.querySelector("body"));
        var DOMBODY = document.createElement("body");
        DOMBODY.setAttribute("class", "date-" + VALUE_DATE + " " + VALUE_LANG + " ltr thumb-normal");
        DOMBODY.setAttribute("dir", "ltr");
        DOMHTML.appendChild(DOMBODY);

        // Userbar

        // SET USERNAME
            var VALUE_USERNAME;
            var VALUE_USERLINK;

        var OBJ_LOGIN = ``;
        var BOOL_LOGIN = null;
        if(getCookie("APISID")) {
            // GET USERNAME
            console.log("BEEP")
            var T_OPENAVTAR = await waitForElm("#avatar-btn").then((elm) => {document.querySelectorAll("ytd-topbar-menu-button-renderer")[2].click()});
            var T_GETNAME = await waitForElm("#account-name").then((elm) => {document.wegiYT.data.name = elm.innerText;document.wegiYT.data.link = document.querySelector("ytd-compact-link-renderer #endpoint").href});

            console.log("BOOP")
            VALUE_USERNAME = document.wegiYT.data.name;
            VALUE_USERLINK = document.wegiYT.data.link;

            OBJ_LOGIN = `<a href="${VALUE_USERLINK}">${VALUE_USERNAME}</a>`;
            BOOL_LOGIN = true;
            console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB")
        } else {
            var login_url = "https://accounts.google.com/ServiceLogin?service=youtube&uilel=3&passive=true&continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Faction_handle_signin%3Dtrue%26app%3Ddesktop%26hl%3Den%26next%3Dhttps%253A%252F%252Fwww.youtube.com%252F&hl=en&ec=65620";
            OBJ_LOGIN = `<a class="start" href="https://www.youtube.com/signup">Create Account</a><span class="masthead-link-separator">|</span><a class="end" href="${login_url}">Sign In</a>`;
            BOOL_LOGIN = false;
            console.log("null was here. fu gui >:3")
        };

        var OBJ_USER = `<div id="masthead-user-bar-container"><div id="masthead-user-bar"><div id="masthead-user">${OBJ_LOGIN}</div></div></div>`;
        var OBJ_MASTHEAD;
        var OBJ_FOOTER;

        var OBJ_CHANNEL = "";

        // Channel (WIP)
        if(window.location.pathname.split("/")[1].match(/channel|user|c/i)) {
            if (/community|about|channels|playlists|membership|store/.test(window.location.pathname.split("/")[3])) window.location.href = window.location.pathname.split("/").slice(0,3).join("/")
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
                            var data = {};
                            data.viewers = bitchmf ? bitchmf.simpleText.split(" ")[0] : "None";
                            data.creationdate = longmf ? longmf.runs[1].text : "Unknown";
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
            DOMHEAD.innerHTML += '<link rel="stylesheet" href="//theunknownlugiastudio.com/poopoo/www-channel_new-vflrWkVe_.css">';

            // Modify title
            o_DOMBODY.querySelector("title").parentNode.removeChild(o_DOMBODY.querySelector("title"));
            DOMHEAD.appendChild(document.createElement("title"));
            setInterval(function(){document.head.querySelector("title").innerText = `${VALUE_CHANNELNAME}'s Channel - YouTube`}, 100);

            var VALUE_SUBSCRIB = await waitForElm("#subscriber-count").then((elm) => {document.wegiYT.data.subcount = elm.innerText.split(" ")[0]});
            VALUE_SUBSCRIBE = document.wegiYT.data.subcount;
            if(VALUE_SUBSCRIBE.match(/K/)) {
                if(VALUE_SUBSCRIBE.match(/\./)) {
                   console.info(
                       VALUE_SUBSCRIBE = VALUE_SUBSCRIBE.replace(/\./, "").replace(/K/, "00").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                   )
                }
            }
            if(VALUE_SUBSCRIBE.match(/M/)) {
                if(VALUE_SUBSCRIBE.match(/\d{3}/)) {
                   console.info(
                       VALUE_SUBSCRIBE = VALUE_SUBSCRIBE.replace(/\./, "").replace(/M/, "000000").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                   )
                }
                if(VALUE_SUBSCRIBE.match(/\d{2,3}\.\d{1,2}/)) {
                   console.info(
                       VALUE_SUBSCRIBE = VALUE_SUBSCRIBE.replace(/\./, "").replace(/M/, "00000").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                   )
                }
                if(VALUE_SUBSCRIBE.match(/\d{1,3}/)) {
                   console.info(
                       VALUE_SUBSCRIBE = VALUE_SUBSCRIBE.replace(/\./, "").replace(/M/, "0000").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                   )
                }
            }

            VALUE_DESCRIPTION = ytInitialData.metadata.channelMetadataRenderer.description;
            VALUE_DESCRIPTION = VALUE_DESCRIPTION.replace(/\n/g, "<br />");


            //OBJ_SUBCON = `<span class="subscription-subscribed-container" onclick=";document.yt.btnSubscribe(0)" ${aaa}><span class="subscription-options-button subscription-expander yt-uix-expander yt-uix-expander-collapsed"><span class="yt-uix-expander-head yt-rounded"><button class="yt-uix-expander-arrow" onclick="return false;"></button><span class="yt-alert yt-alert-success yt-alert-small yt-alert-naked yt-rounded"><img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" class="icon" alt="Alert icon"><span class="yt-alert-content">Subscribed</span></span></span></span></span><button ${bbb} type="button" class="subscribe-button yt-uix-button yt-uix-button-urgent yt-uix-tooltip" onclick=";document.yt.btnSubscribe(0)" title="Click to be notified of new videos from this channel" role="button"><span class="yt-uix-button-content">Subscribe</span></button>`;
            if(BOOL_LOGIN == true && VALUE_CHANNELNAME !== VALUE_USERNAME) {
                var a = document.querySelector(".ytd-subscribe-button-renderer").innerText.replace(/(\n| )/gi, "");
                if(a == "Subscribed") {
                    OBJ_SUBSCRIBE = `<span class="subscription-container">
            <button type="button" class="subscribe-button yt-uix-button yt-uix-button-urgent yt-uix-tooltip" onclick=";return false;" title="Click to be notified of new videos from this channel" role="button">
            <span class="yt-uix-button-content">Unsubscribe</span>
            <img class="yt-uix-button-arrow" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
            </button>
            </span>`
                } else {
                    OBJ_SUBSCRIBE = `<span class="subscription-container">
            <button type="button" class="subscribe-button yt-uix-button yt-uix-button-urgent yt-uix-tooltip" onclick=";return false;" title="Click to be notified of new videos from this channel" role="button">
            <span class="yt-uix-button-content">Subscribe</span>
            <img class="yt-uix-button-arrow" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
            </button>
            </span>`
                }
            }

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
            ${OBJ_SUBSCRIBE}
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

            OBJ_PLAYNAV = `<div id="user_playlist_navigator" class="outer-box yt-rounded">
            <div id="playnav-channel-header" class="inner-box-bg-color">
            <div id="playnav-title-bar">
            <div id="playnav-channel-name" class="outer-box-bg-color">
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
            ${OBJ_SUBSCRIBE}
            </div>
            </div>
            <div id="playnav-chevron">&nbsp;</div>
            </div><div class="cb"></div></div></div>`

            OBJ_CHANNEL = `<div id="channel-body" class="jsloaded">
            <div id="channel-base-div">
            ${OBJ_PLAYNAV}
            ${OBJ_CHANCON}
            </div>
            </div>
            <div class="cb">
            <div class="clear"></div>
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
})();