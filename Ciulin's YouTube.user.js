// ==UserScript==
// @name         Ciulin's YouTube
// @namespace    https://www.youtube.com/*
// @version      0.5.6
// @description  Broadcast Yourself
// @author       CiulinUwU
// @updateURL    https://github.com/ciulinuwu/ciulin-s-youtube/raw/main/Ciulin's%20YouTube.user.js
// @downloadURL  https://github.com/ciulinuwu/ciulin-s-youtube/raw/main/Ciulin's%20YouTube.user.js
// @match        https://www.youtube.com/*
// @exclude      https://www.youtube.com/tv
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
// @run-at document-load
// ==/UserScript==

var interval;

(() => {
    'use strict';
    function debug(a) {
        return console.debug(`[Ciulin's YouTube] ${a}`);
    }
    function error(a) {
        return console.error(`[Ciulin's YouTube] ${a}`);
    }
    debug("Starting script...");
    document.ciulinYT = {};

    document.ciulinYT.data = {
        playerSettingsSheet: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAANCAIAAADntZOlAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAlSURBVBhXY/j//z/Tv39/gfgfnP7/H8GGif8H0r9//WT69uUTAPDNJqPDjzoaAAAAAElFTkSuQmCC",
        playbarScrub: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAD5SURBVChTjZHNjkRQEIUP4p+dVe/EC9iJhQgvLlYsvQC2JFaIIOH21G09s5CZnpNclZz66kdKwKVt21hd1xiG4XJechwHnudBVVXO8s88zyzPcxzHAUH47sHFGIMkSYjjGJZlCQJ1LooC+75D0zSs63qLJEVREIYhxKZpeGcyoiiCLMu3+LUOzvMEsWLXdTAMg5u/iXLE9H0PkXYk468Cmk6Ppoj0Q58K3nli+Ur/LSBW1HWdj/pUQAyxYpqmqKqKm+M44vF43CLliCGWX6ltW0ZGEAQwTZN3fWtZFpRlCd/34bruz1np2lmWYZqmy3nJtm0kScKvDABP3bl3Ot4gE8wAAAAASUVORK5CYII=",
        playerSheet: "data:image/png;base64,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",
        playbarSheet: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAZCAIAAAB/8tMoAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAhSURBVBhXY7h69SoTCDAzMxNNMzAwgNmMjIyEMMP///8BIN0GJrVyhfoAAAAASUVORK5CYII=",
        playbarShadow: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAZCAIAAACZ2xhsAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAA6SURBVChTY1y2bJm4uLiAgAA3NzcTAxgwggGIA2UBwWCRgQAMZXCA0AMECBkEB8gCkthkIIB0AxgZAbxaA1A95vt3AAAAAElFTkSuQmCC",
        playbarSeeker: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAaCAYAAAB2BDbRAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABQSURBVBhXbYqxDYAwEANP7kkmyDBZiDYTsUK2oosUpTK8oEK4OFu22UsxB1gJ0HaDs3eHQ2vNqrWinDNKKU6htZZlmy9ifNIYA8053+4fcAGeySL/5lJgnAAAAABJRU5ErkJggg==",
        playbarSeek: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAECAIAAADAusJtAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZSURBVBhXYzhy5AiToKAgw5s3bxi+f/8OADiwCCtHhAKiAAAAAElFTkSuQmCC"
    };
    document.ciulinYT.load = {
        recent_feed: async () => {
            var test = new Promise(async resolve => {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", `https://www.youtube.com/${window.location.pathname}/community`);
                xhr.onload = async () => {
                    let a = JSON.parse(xhr.response.split("var ytInitialData = ")[1].split(";</script>")[0]).contents.twoColumnBrowseResultsRenderer.tabs.find(b => b.tabRenderer ? b.tabRenderer.endpoint.commandMetadata.webCommandMetadata.url.split("/")[3] === 'community' : {});
                    if(!a.tabRenderer) return resolve({});

                    let sortImages = async (img) => {
                        let stor = "";
                        for (let i = 0; i < img.images.length; i++) {
                            stor += `<img src="${img.images[i].backstageImageRenderer.image.thumbnails[0].url}"/>`;
                        }
                        return stor;
                    };

                    let video = async (vid) => {
                        let {id, title, time} = await document.ciulinYT.func.organizeVideoData(vid);
                        return `<div class="playnav-item playnav-video">
        <div style="display:none" class="encryptedVideoId">${id}</div>
        <div class="selector"></div>
        <div class="content">
        <div class="playnav-video-thumb">
        <a href="https://www.youtube.com/watch?v=${id}" onclick="document.ciulinYT.func.loadPlaynavVideo('${id}');return false;" class="ux-thumb-wrap">
        <span class="video-thumb ux-thumb-96 ">
        <span class="clip">
        <img src="//i1.ytimg.com/vi/${id}/default.jpg" alt="Thumbnail" class="" onclick="document.ciulinYT.func.loadPlaynavVideo('${id}');return false;" title="${title}">
        </span>
        </span>
        <span class="video-time">${time}</span>
        </a>
        </div>
        <div class="playnav-video-info">
        <a href="https://www.youtube.com/watch?v=${id}" class="playnav-item-title ellipsis" onclick="document.ciulinYT.func.loadPlaynavVideo('${id}');return false;">
        <span dir="ltr">${title}</span>
        </a>
        <div style="display:none" id="playnav-video-play-uploads-12">${id}</div>
        </div>
        </div>
        </div>`;
                    };

                    let filter = async (j) => {
                        let img = j.backstageAttachment;
                        if(!img) return '';
                        let stor = "";
                        for (const obj in img) {
                            switch (obj) {
                                case 'postMultiImageRenderer':
                                    stor = await sortImages(img.postMultiImageRenderer);
                                    break;
                                case 'backstageImageRenderer':
                                    stor = '<img src="' + img.backstageImageRenderer.image.thumbnails[0].url + '">';
                                    break;
                                case 'videoRenderer':
                                    stor = await video(img.videoRenderer);
                                    break;
                            }
                        }

                        return stor;
                    };

                    let b = a.tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents;
                    let j;
                    let data = [];
                    for (j = 0; j < b.length; j++) {
                        if(!b[j].continuationItemRenderer && !b[j].messageRenderer) {
                            data[j] = {};
                            let post = b[j].backstagePostThreadRenderer.post.sharedPostRenderer ? b[j].backstagePostThreadRenderer.post.sharedPostRenderer.originalPost.backstagePostRenderer : b[j].backstagePostThreadRenderer.post.backstagePostRenderer;
                            data[j].text = post.contentText.runs ? post.contentText.runs[0].text : "";
                            data[j].images = await filter(post);
                            data[j].author = post.authorText.runs[0].text;
                            data[j].timestamp = post.publishedTimeText.runs[0].text;
                        }
                    }
                    resolve(data);
                };
                xhr.onerror = () => {
                    console.error("** An error occurred during the XMLHttpRequest");
                };
                xhr.send();
            });

            let a = await test;

            return a;
        },
        channel_videos: async () => {
            var test = new Promise(async resolve => {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", `https://www.youtube.com/${window.location.pathname}/videos`);
                xhr.onload = async () => {
                    let a = JSON.parse(xhr.response.split("var ytInitialData = ")[1].split(";</script>")[0]).contents.twoColumnBrowseResultsRenderer.tabs.find(b => b.tabRenderer.endpoint.commandMetadata.webCommandMetadata.url.split("/")[3] === 'videos');

                    if(!a.tabRenderer) return error(undefined);

                    let b = a.tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].gridRenderer.items;
                    let j;
                    let data = [];
                    for (j = 0; j < b.length; j++) {
                        if(!b[j].continuationItemRenderer) {
                            let videoData = await document.ciulinYT.func.organizeVideoData(b[j].gridVideoRenderer);
                            data[j] = videoData;
                        }
                    }
                    resolve(data);
                };
                xhr.onerror = () => {
                    console.error("** An error occurred during the XMLHttpRequest");
                };
                xhr.send();
            });

            let a = await test;

            return a;
        },
        channel_info: async () => {
            var test = new Promise(async resolve => {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", `https://www.youtube.com/${window.location.pathname}/about`);
                xhr.onload = async () => {
                    let a = JSON.parse(xhr.response.split("var ytInitialData = ")[1].split(";</script>")[0]).contents.twoColumnBrowseResultsRenderer.tabs.find(b => b.tabRenderer ? b.tabRenderer.endpoint.commandMetadata.webCommandMetadata.url.split("/")[3] === 'about' : {});
                    if(!a.tabRenderer) return resolve({});

                    let b = a.tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].channelAboutFullMetadataRenderer;
                    let collection = {name: {}, string: {}};

                    collection.string.BIO = b.artistBio ? "<br/><br/>" + b.artistBio.simpleText.replace(/(?:\r\n|\r|\n)/g, "<br/>") : "";
                    collection.name.COUNTRY = b.countryLabel ? b.countryLabel.runs[0].text.replace(/(?:\r\n|\r|\n)|( )|:/g, "") : undefined;
                    collection.string.COUNTRY = b.country ? b.country.simpleText : undefined;
                    collection.name.JOIN = b.joinedDateText.runs[0].text.split(" ")[0];
                    collection.string.JOIN = b.joinedDateText.runs[1].text;
                    collection.name.VIEWS = b.viewCountText.simpleText.split(" ")[1].charAt(0).toUpperCase() + b.viewCountText.simpleText.split(" ")[1].slice(1);
                    collection.string.VIEWS = b.viewCountText.simpleText.split(" ")[0];

                    resolve(collection);
                };
                xhr.onerror = () => {
                    console.error("** An error occurred during the XMLHttpRequest");
                };
                xhr.send();
            });

            let a = await test;

            return a;
        },
        home_category: async(category) => {
            var guide = document.querySelector("#guide");
            if(guide.getAttribute("data-last-clicked-item") == category.getAttribute("data-feed-name")) return;
            guide.setAttribute("data-last-clicked-item", category.getAttribute("data-feed-name"));
            document.querySelector(".selected-child").classList.remove("selected-child");
            document.querySelector(".selected").classList.remove("selected");
            category.parentNode.classList.add("selected-child");
            category.classList.add("selected");
            document.querySelector("#feed-loading-template").classList.remove("hid");
            document.querySelector("#feed-main-youtube").classList.add("hid");
            document.querySelector("#feed-error").classList.add("hid");
            var url = category.getAttribute("data-feed-url");
            var xhr = new XMLHttpRequest();
            xhr.open("GET", `https://www.youtube.com/${url}`);
            xhr.timeout = 4000;
            xhr.ontimeout = () => {
                console.error("** An error occurred during the XMLHttpRequest");
                document.querySelector("#feed-loading-template").classList.add("hid");
                document.querySelector("#feed-error").classList.remove("hid");
            };
            xhr.onload = async (e) => {
                document.querySelector(".feed-header-info").innerText = category.querySelector(".display-name").innerText;
                let json = JSON.parse(xhr.response.split("var ytInitialData = ")[1].split(";</script>")[0]);

                let template = async(a) => {
                    let {owner, time, views, title, id, url, description, upload, icon} = await document.ciulinYT.func.organizeVideoData(a);
                    let o = `<li class="feed-item-container">
            <div class="feed-item upload">
            <div class="feed-item-content">
            <h3 class="feed-item-title">
            <span class="feed-item-author">
            <a href="https://www.youtube.com/${url}" class="yt-user-photo">
            <span class="video-thumb ux-thumb ux-thumb-profile-24">
            <span class="clip">
            <span class="clip-inner">
            <img src="${icon}" alt="${owner.text}">
            <span class="vertical-align"></span>
            </span>
            </span>
            </span>
            </a>
            </span>
            <span class="feed-item-owner">
            <a href="https://www.youtube.com/${url}" class="yt-user-name" dir="ltr">${owner.text}</a>
            </span> ${views[1] ? "uploaded" : "is LIVE"} <span class="time-created">${views[1]}</span>
            </h3>
            <div class="feed-item-visual">
            <div class="feed-item-visual-thumb">
            <a class="ux-thumb-wrap contains-addto yt-uix-sessionlink" href="https://www.youtube.com/watch?v=${id}">
            <span class="video-thumb ux-thumb ux-thumb-288">
            <span class="clip">
            <span class="clip-inner">
            <img src="//i3.ytimg.com/vi/${id}/hqdefault.jpg" alt="Thumbnail">
            <span class="vertical-align"></span>
            </span>
            </span>
            </span>
            <span class="video-time">${time}</span>
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
            <a class="title yt-uix-sessionlink" href="https://www.youtube.com/watch?v=${id}" dir="ltr">${title}</a>
            </h4>
            <div class="description" dir="ltr">
            <p>${description}</p>
            </div>
            </div>
            <p class="metadata">
            <a href="https://www.youtube.com/${url}" class="yt-user-name" dir="ltr">${owner.text}</a>
            <span class="view-count">${views[0]}</span>
            </p>
            </div>
            </div>
            </div>
            </div>
            </li>`;

                    return o;
                };

                let fetch = await document.ciulinYT.func.handleCategory(json, "0", "22", template, [[], []]);

                document.querySelector(".feed-list").innerHTML = fetch;
                document.querySelector("#feed-loading-template").classList.add("hid");
                document.querySelector("#feed-main-youtube").classList.remove("hid");
            };
            xhr.send();
        },
        settings_tab: async(dataName) => {
            if (!dataName) return;
            let DOM = document.querySelector("video-settings");
            let CON = DOM.querySelector(".playmenu-content");
            CON.innerHTML = "";
            document.querySelector(".playmenu-button.selected").classList.remove("selected");
            document.querySelector(`[data-name="${dataName}"]`).classList.add("selected");

            let loadSubtitles = async () => {
                let HTML = [];
                let subtitlesSTORAGE = await document.ciulinYT.func.getFromStorage("subtitles");
                let posiShort = (ytInitialPlayerResponse.captions) ? ytInitialPlayerResponse.captions.playerCaptionsTracklistRenderer.captionTracks : [{disabled: "", languageCode: "", name: {simpleText: "No subtitles"}}];
                let posiSubtitles = ``;
                let value = subtitlesSTORAGE.value;

                for (let i = 0; i < posiShort.length; i++) {
                    let _value = (posiShort[i].languageCode == subtitlesSTORAGE.value) ? 'selected=""' : "";
                    posiSubtitles += `<option value="${posiShort[i].languageCode}" ${_value}>${posiShort[i].name.simpleText}</option>`;
                }

                let chck_toggle = (posiShort[0].disabled == "") ? 'disabled=""' : '';

                let _toggle = `<span class="playmenu-text">Subtitles</span><div class="settings-toggle"><input type="checkbox" class="settings-toggle" id="settings-subtitles" ${chck_toggle}><label for="settings-subtitles" class="playmenu-text">Enable Subtitles</label></div><div class="settings-selecter"><select class="settings-selecter" id="settings-subtitles" disabled="">${posiSubtitles}</select></div>`;

                HTML.push(_toggle);

                for (let i = 0; i < HTML.length; i++) {
                    CON.innerHTML += HTML[i];
                }

                document.querySelector(".settings-toggle#settings-subtitles").addEventListener("click", e => {
                    if(e.srcElement.checked == true) {
                        document.querySelector(".settings-selecter#settings-subtitles").removeAttribute("disabled");
                    } else {
                        document.querySelector(".settings-selecter#settings-subtitles").setAttribute("disabled", "");
                    }

                    document.ciulinYT.player.toggleSubtitles();
                });

                document.querySelector(".settings-selecter#settings-subtitles").addEventListener("change", e => {
                    document.ciulinYT.func.addToStorage("subtitles", "value", e.srcElement.value);
                    document.ciulinYT.player.setOption("captions", "track", {"languageCode": e.srcElement.value});
                });
            };

            let loadQuality = async () => {
                let HTML = [];
                let qualitySTORAGE = await document.ciulinYT.func.getFromStorage("quality");
                let qualShort = document.ciulinYT.player.getAvailableQualityLevels();
                let qualShorter = document.ciulinYT.player.getPlaybackQuality();
                let qualQuality = ``;
                let value = qualitySTORAGE.value;

                for (let i = 0; i < qualShort.length; i++) {
                    let _value = (qualShort[i] == qualShorter) ? 'selected=""' : (qualShort[i] == qualitySTORAGE.value) ? 'selected=""' : "";
                    qualQuality += `<option value="${qualShort[i]}" ${_value}>${qualShort[i]}</option>`;
                }

                let _select = `<span class="playmenu-text">Video Quality</span><div class="settings-selecter"><select class="settings-selecter" id="settings-quality">${qualQuality}</select></div>`;

                HTML.push(_select);

                for (let i = 0; i < HTML.length; i++) {
                    CON.innerHTML += HTML[i];
                }

                document.querySelector(".settings-selecter#settings-quality").addEventListener("change", e => {
                    document.ciulinYT.func.addToStorage("quality", "value", e.srcElement.value);
                    document.ciulinYT.player.setPlaybackQuality(e.srcElement.value);
                });
            };

            let loadPlayback = async () => {
                let HTML = [];
                let playbackSTORAGE = await document.ciulinYT.func.getFromStorage("playback");
                let playShort = document.ciulinYT.player.getAvailablePlaybackRates();
                let playShorter = document.ciulinYT.player.getPlaybackRate();
                let playRate = ``;
                let value = playbackSTORAGE.value;

                for (let i = 0; i < playShort.length; i++) {
                    let _value = (playShort[i] == playShorter) ? 'selected=""' : (playShort[i] == playbackSTORAGE.value) ? 'selected=""' : "";
                    playRate += `<option value="${playShort[i]}" ${_value}>${playShort[i]}</option>`;
                }

                let _select = `<span class="playmenu-text">Playback Rate</span><div class="settings-selecter"><select class="settings-selecter" id="settings-play">${playRate}</select></div>`;

                HTML.push(_select);

                for (let i = 0; i < HTML.length; i++) {
                    CON.innerHTML += HTML[i];
                }

                document.querySelector(".settings-selecter#settings-play").addEventListener("change", e => {
                    document.ciulinYT.func.addToStorage("playback", "value", e.srcElement.value);
                    document.ciulinYT.player.setPlaybackRate(Number(e.srcElement.value));
                });
            };

            switch (dataName) {
                case "subtitles":
                    loadSubtitles();
                    break;
                case "quality":
                    loadQuality();
                    break;
                case "playback":
                    loadPlayback();
                    break;
            }
        },
        browseCategory: async (category) => {
            if(!category) return;
            let obj = {class: category};
            let string = "";

            let template = async(current) => {
                let {owner, time, views, title, id, url} = await document.ciulinYT.func.organizeVideoData(current);
                let a = `<div class="browse-item yt-tile-default">
<a href="https://www.youtube.com/watch?v=${id}" class="ux-thumb-wrap">
<span class="video-thumb ux-thumb ux-thumb-184">
<span class="clip">
<span class="clip-inner">
<img alt="Thumbnail" src="//i2.ytimg.com/vi/${id}/hqdefault.jpg" data-group-key="thumb-group-0">
<span class="vertical-align">
</span>
</span>
</span>
</span>
<span class="video-time">${time}</span>
</a>
<div class="browse-item-content">
<h3 dir="ltr">
<a href="https://www.youtube.com/watch?v=${id}" title="${title}">${title}</a>
</h3>
<div class="browse-item-info">
<div class="metadata-line">
<span class="viewcount">${views[0]}</span>
<span class="metadata-separator">|</span>
<span class="video-date-added">${views[1]}</span>
</div>
<a class="yt-user-name" dir="ltr" href="https://www.youtube.com${url}">${owner.text}</a>
</div>
</div>
</div>`;
                return a;
            };

            switch (category) {
                case "most-viewed":
                    obj.name = "Most Viewed Today";
                    obj.html = await document.ciulinYT.func.handleCategory(ytInitialData, 4, 8, template, ['<div class="browse-item-row ytg-box">', '</div>']);
                    return obj;
                case "recommended":
                    string = "/";
                    obj.name = "Recommended for You";
                    break;
                case "music":
                    obj.name = "Music";
                    string = "/channel/UC-9-kyTW8ZkZNDHQJ6FgpwQ";
                    break;
                case "film":
                    obj.name = "Film";
                    string = "/feed/storefront";
                    break;
                case "live":
                    obj.name = "Live";
                    string = "/channel/UC4R8DWoMoI7CAwX8_LjQHig";
                    break;
                case "gaming":
                    obj.name = "Gaming";
                    string = "/gaming";
                    break;
                case "news":
                    obj.name = "News";
                    string = "/channel/UCYfdidRxbB8Qhf0Nx7ioOYw";
                    break;
                case "sports":
                    obj.name = "Sport";
                    string = "/channel/UCEgdi0XIXXZ-qJOFPf4JSKw";
                    break;
                case "edu":
                    obj.name = "Education";
                    string = "/channel/UCtFRv9O2AHqOZjjynzrv-xg";
                    break;
                case "howto":
                    obj.name = "Howto & Style";
                    string = "/channel/UCrpQ4p1Ql_hG8rKXIKM1MOQ";
                    break;
            }

            var test = new Promise(async resolve => {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", `https://www.youtube.com${string}`);
                xhr.onload = async () => {
                    let json = JSON.parse(xhr.response.split("var ytInitialData = ")[1].split(";</script>")[0]);
                    let CONTENTS = await document.ciulinYT.func.handleCategory(json, 4, 8, template, ['<div class="browse-item-row ytg-box">', '</div>']);
                    resolve(CONTENTS);
                };
                xhr.onerror = () => {
                    console.error("** An error occurred during the XMLHttpRequest");
                };
                xhr.send();
            });

            obj.html = await test;

            return obj;
        }
    };
    document.ciulinYT.func = {
        buildPlayer: (videoId, time) => {
            var ELEMENT = document.querySelector("#video-player");
            var TEMP = document.createElement("div");
            TEMP.setAttribute("class", "player");
            ELEMENT.append(TEMP);
            var DOM = ELEMENT.querySelector(".player");

            // DOM_menu
            (() => {
                var DOM_menu = document.createElement("video-settings");
                DOM_menu.setAttribute("class", "hid");
                DOM_menu.setAttribute("data-state", "0");
                DOM_menu.innerHTML = `<div class="playmenu-container"><a class="playmenu-text">YouTube Player Settings</a><div class="playmenu-content"></div><ul class="playmenu-buttons"><li class="playmenu-button selected" data-name="subtitles"></li><li class="playmenu-button" data-name="quality"></li><li class="playmenu-button" data-name="playback"></li><div class="playmenu-button_exit"><span>Close</span></div></ul></div>`;
                DOM.appendChild(DOM_menu);
                document.ciulinYT.load.settings_tab("subtitles");
            })();

            // DOM_embedVideo
            (() => {
                var DOM_embedVideo = document.createElement("div");
                DOM_embedVideo.setAttribute("class", "video-container");
                DOM_embedVideo.innerHTML = `<div id="video-main-content"></div><div class="video-blank"></div><div id="video-animation" class="hid"><i class="playbar-icon playbar-icon_play"></i></div>`;
                DOM.appendChild(DOM_embedVideo);
            })();

            // DOM_scrubBar
            (() => {
                var DOM_scrubBar = document.createElement("div");
                DOM_scrubBar.setAttribute("class", "video-scrubbar");
                DOM_scrubBar.setAttribute("role", "progressbar");
                DOM_scrubBar.innerHTML = `
                <div class="seek-tooltip hid" id="seek-tooltip">0:00</div><span class="scrubbar_track_played"></span><span class="scrubbar_track_handle"></span><div class="video-playbar_a"></div>
                `;
                DOM.appendChild(DOM_scrubBar);
            })();

            // DOM_playBar
            (() => {
                var DOM_playBar = document.createElement("div");
                DOM_playBar.setAttribute("class", "video-playbar");
                DOM_playBar.innerHTML = `
                <ul class="playbar-controls left">
                <li class="playbar-controls_icon playbar-controls_play" data-state="0">
                <i class="playbar-icon playbar-icon_play"></i>
                </li><div class="playbar-volume_container">
                <li class="playbar-controls_icon playbar-controls_volume" data-state="3">
                <i class="playbar-icon playbar-icon_volume"></i>
                </li>
                <div class="playbar-volume_slider-container">
                <div class="playbar-shadow"></div>
                <div class="playbar-volume_slider">
                <input type="range" id="playbar-seek" max="100" value="100">
                </div>
                </div>
                </div>
                <div class="playbar-shadow"></div>
                </ul>
                <div class="playbar-timestamp_container">
                <span class="playbar-timestamp">
                <a id="timestamp_current">0:00</a> / <a id="timestamp_total">99:99</a>
                </span>
                </div>
                <ul class="playbar-controls right">
                <li class="playbar-controls_icon playbar-controls_resize" data-state="0">
                <i class="playbar-icon playbar-icon_resize"></i>
                </li><li class="playbar-controls_icon playbar-controls_fullscreen" data-state="0">
                <i class="playbar-icon playbar-icon_fullscreen"></i>
                </li>
                </ul>
                `;
                DOM.appendChild(DOM_playBar);
            })();

            // DOM CSS
            (() => {
                var a = document.createElement("style");
                a.setAttribute("class", "player-style");

                let script = `
                #eow-tags {
                word-break: break-all;
                }
                #video-player {
                display: block;
                width: 640px;
                height: 390px;
                }
                .player {
                width: inherit;
                height: inherit;
                }
                .player * {
                box-sizing: inherit;
                }
                .video-container {
                height: 360px;
                width: inherit;
                position: relative;
                }
                #video-player:fullscreen .video-container {
                height: 97%;
                }
                #video-main-content {
                position: relative;
                z-index: -1;
                width: inherit;
                }
                #video-player:fullscreen #video-main-content {
                height: 100%;
                }
                .video-blank {
                width: 100%;
                height: 100%;
                background-color: black;
                position: absolute;
                top: 0;
                z-index: -1;
                }
                #video-animation {
                width: 50px;
                height: 50px;
                color: white;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                justify-content: center;
                align-items: center;
                }
                #video-animation[data-animation^="triggered"] {
                display: flex;
                }
                #video-animation[data-animation^="triggered"] .playbar-icon_play {
                animation: bop 1s;
                }
                #video-animation .playbar-icon {
                transform: scale(2);
                background: no-repeat url(data:image/png;base64,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) 0px -25px;
                }
                .video-scrubbar {
                background-color: darkgray;
                position: relative;
                cursor: pointer;
                height: 3px;
                user-select: none;
                }
                #video-player:hover .video-scrubbar {
                height: 15px;
                margin-top: -12px;
                position: relative;
                transition: 0.1s;
                }
                #seek-tooltip {
                position: absolute;
                top: -20px;
                z-index: 1000;
                color: white;
                background: black;
                width: 35px;
                text-align: center;
                border: 1px solid white;
                border-radius: 4px;
                }
                .scrubbar_track_played {
                height: 12px;
                background-color: crimson;
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                }
                .scrubbar_track_handle {
                background: no-repeat url(${document.ciulinYT.data.playbarScrub});
                display: block;
                position: absolute;
                top: 0;
                bottom: 0;
                width: 12px;
                height: 12px;
                margin: -1px -9px;
                border-radius: 9px;
                border: 1px solid white;
                opacity: 0;
                transition: transform 0.1s, opacity 0.2s;
                transform: scale(0.3);
                z-index: 100;
                }
                #video-player:hover .scrubbar_track_handle {
                transform: scale(1);
                opacity: 1;
                }
                .video-playbar_a {
                background: url(${document.ciulinYT.data.playbarSeek});
                transition: height 0.1s;
                z-index: 2;
                position: absolute;
                bottom: 0;
                width: 100%;
                }
                #video-player:hover .video-playbar_a {
                height: 4px;
                }
                .video-playbar {
                display: flex;
                background: url(${document.ciulinYT.data.playbarSheet});
                height: 24.6px;
                line-height: 24.6px;
                overflow: hidden;
                position: relative;
                border: 1px solid #ccc;
                border-left-color: #bfbfbf;
                border-right-color: #bfbfbf;
                user-select: none;
                }
                .playbar-controls {
                list-style-type: none;
                margin: 0;
                padding: 0;
                height: inherit;
                line-height: inherit;
                display: flex;
                }
                .playbar-timestamp a {
                color: #000;
                cursor: default;
                text-decoration: none;
                }
                .right {
                position: absolute;
                right: 0;
                }
                .playbar-controls_icon {
                cursor: pointer;
                display: inline-block;
                text-align: center;
                font-size: 1.5em;
                height: 24.6px;
                width: 30px;
                background: no-repeat url(${document.ciulinYT.data.playerSheet}) 0px 0px;
                }
                .playbar-volume_container {
                display: flex;
                width: inherit;
                }
                .playbar-volume_slider {
                width: inherit;
                }
                .playbar-volume_slider-container {
                display: none;
                width: 0px;
                }
                .playbar-volume_container:hover .playbar-volume_slider-container {
                display: flex;
                animation: slide-right 0.5s;
                animation-fill-mode: both;
                }
                #playbar-seek {
                -webkit-appearance: none;
                width: inherit;
                height: 4px;
                outline: none;
                max-width: 53px;
                }
                .playbar-shadow {
                background: url(${document.ciulinYT.data.playbarShadow});
                height: 24.6px;
                width: 4px;
                }
                #playbar-seek::-moz-range-progress, #playbar-seek::-webkit-progress-value {
                background: url(${document.ciulinYT.data.playbarSeeker}) 0px 0px;
                height: 5px;
                }
                #playbar-seek::-moz-range-track, #playbar-seek::-webkit-slider-runnable-track {
                -webkit-appearance: none;
                background: url(${document.ciulinYT.data.playbarSeeker}) 0px -6px;
                height: 5px;
                }
                #playbar-seek::-moz-range-thumb, #playbar-seek::-webkit-slider-thumb {
                -webkit-appearance: none;
                width: 4px;
                height: 15px;
                background: url(${document.ciulinYT.data.playbarSeeker}) 0px -11px;
                cursor: pointer;
                border-radius: 0;
                }
                .playbar-controls_volume {
                border-left: 1px solid #bfbfbf;
                }
                .playbar-controls_icon:hover {
                background: no-repeat url(${document.ciulinYT.data.playerSheet}) -30px 0px;
                }
                .playbar-icon {
                display: inline-block;
                margin-left: auto;
                }
                .playbar-icon_play {
                background: no-repeat url(${document.ciulinYT.data.playerSheet}) 0px -40px;
                height: 14px;
                width: 11px;
                margin-right: auto;
                }
                .playbar-controls_play:hover .playbar-icon_play {
                background: no-repeat url(${document.ciulinYT.data.playerSheet}) -12px -40px;
                height: 14px;
                width: 11px;
                margin-right: auto;
                }
                .playbar-controls_play[data-state^="1"] .playbar-icon_play {
                background: no-repeat url(${document.ciulinYT.data.playerSheet}) 0px -25px;
                height: 14px;
                width: 11px;
                margin-right: auto;
                }
                .playbar-controls_play[data-state^="1"]:hover .playbar-icon_play {
                background: no-repeat url(${document.ciulinYT.data.playerSheet}) -11px -25px;
                height: 14px;
                width: 11px;
                margin-right: auto;
                }
                .playbar-icon_volume {
                float: right;
                }
                .playbar-controls_volume[data-state^="0"] .playbar-icon_volume {
                background: no-repeat url(${document.ciulinYT.data.playerSheet}) 0px -118px;
                height: 23px;
                width: 25px;
                }
                .playbar-controls_volume[data-state^="1"] .playbar-icon_volume {
                background: no-repeat url(${document.ciulinYT.data.playerSheet}) 0px -97px;
                height: 23px;
                width: 25px;
                }
                .playbar-controls_volume[data-state^="2"] .playbar-icon_volume {
                background: no-repeat url(${document.ciulinYT.data.playerSheet}) 0px -76px;
                height: 23px;
                width: 25px;
                }
                .playbar-controls_volume[data-state^="3"] .playbar-icon_volume {
                background: no-repeat url(${document.ciulinYT.data.playerSheet}) 0px -55px;
                height: 23px;
                width: 25px;
                }
                .playbar-controls_volume[data-state^="0"]:hover .playbar-icon_volume {
                background: no-repeat url(${document.ciulinYT.data.playerSheet}) -27px -118px;
                height: 23px;
                width: 25px;
                }
                .playbar-controls_volume[data-state^="1"]:hover .playbar-icon_volume {
                background: no-repeat url(${document.ciulinYT.data.playerSheet}) -27px -97px;
                height: 23px;
                width: 25px;
                }
                .playbar-controls_volume[data-state^="2"]:hover .playbar-icon_volume {
                background: no-repeat url(${document.ciulinYT.data.playerSheet}) -27px -76px;
                height: 23px;
                width: 25px;
                }
                .playbar-controls_volume[data-state^="3"]:hover .playbar-icon_volume {
                background: no-repeat url(${document.ciulinYT.data.playerSheet}) -27px -55px;
                height: 23px;
                width: 25px;
                }
                .playbar-controls_fullscreen {
                border-left: 1px solid #bfbfbf;
                }
                .playbar-controls_fullscreen .playbar-icon_fullscreen {
                background: no-repeat url(${document.ciulinYT.data.playerSheet}) 0px -144px;
                position: relative;
                bottom: -1px;
                height: 15px;
                width: 16px;
                }
                .playbar-controls_fullscreen:hover .playbar-icon_fullscreen {
                background: no-repeat url(${document.ciulinYT.data.playerSheet}) -18px -144px;
                position: relative;
                bottom: -1px;
                height: 15px;
                width: 16px;
                }

                .playbar-timestamp {
                padding-left: 9px;
                font-size: 10px;
                line-height: 25px;
                }

                video-settings {
                height: inherit;
                display: block;
                position: absolute;
                width: inherit;
                user-select: none;
                }

                video-settings[data-state^="1"] {
                background: rgba(0,0,0,0.5);
                }

                .playmenu-container {
                height: 134px;
                width: 211px;
                border: 1px solid #666666;
                background: #eeeeee;
                margin-left: auto;
                margin-right: auto;
                z-index: 2;
                position: relative;
                top: 50%;
                transform: translate(0,-50%);
                }

                .playmenu-text {
                color: black;
                cursor: default;
                font-size: 10px;
                }
                .settings-text {
                margin-top: 10px;
                }
                a.playmenu-text {
                margin-left: 3px;
                }
                span.playmenu-text {
                padding: 4px 4px;
                display: block;
                }

                .playmenu-text:hover {
                text-decoration: none;
                }

                .playmenu-content {
                width: 202px;
                height: 89px;
                margin: auto;
                background: white;
                border: 1px solid #ccc;
                border-top-left-radius: 4px;
                border-top-right-radius: 4px;
                }

                .playmenu-buttons {
                width: 204px;
                display: flex;
                margin: auto;
                margin-top: -1px;
                }
                .playmenu-button {
                width: 26px;
                height: 24px;
                border-bottom: 1px solid #ccc;
                border-bottom-left-radius: 6px;
                border-left: 1px solid #ccc;
                border-bottom-right-radius: 6px;
                border-right: 1px solid #ccc;
                }
                .playmenu-button:not(:first-child) {
                margin-left: -1px;
                }
                .playmenu-button.selected {
                background: #fff;
                border-top: 1px solid #fff;
                }

                .playmenu-button_exit {
                width: 62px;
                height: 13px;
                background: url(${document.ciulinYT.data.playerSettingsSheet});
                border: 1px solid #666;
                border-radius: 2px;
                text-align: center;
                margin-top: 7px;
                margin-left: 58px;
                font-size: 10px;
                }

                div.settings-toggle {
                display: flex;
                align-items: center;
                }

                input.settings-toggle {
                width: 8px;
                }

                div.settings-selecter {
                height: 14px;
                width: 190px;
                margin: auto;
                }

                select.settings-selecter {
                width: inherit;
                height: inherit;
                border: 1px solid #8c8c8c;
                background: white;
                }

                @keyframes slide-right {
                0% {
                width: 0px;
                }
                100% {
                width: 64px;
                }
                }

                @keyframes bop {
                0% {
                transform: scale(0.9);
                }
                100% {
                transform: scale(3.1);
                }
                }`;
                script = script.replace(/(?:\r\n|\r|\n)/g, "");
                a.innerText = script;
                ELEMENT.appendChild(a);
            })();

            // DOM JS
            (() => {
                var tag = document.createElement('script');
                tag.src = "https://www.youtube.com/iframe_api";
                DOM.append(tag);

                var timm = time ? `'time':` + time + "," : ``;

                var a = document.createElement("script");
                var script = `
                var progress;
                let canMouse = false;
                let dur = 0;
            var onYouTubeIframeAPIReady = () => {
                document.ciulinYT.player = new YT.Player('video-main-content', {
                    height: '360',
                    width: '640',
                    videoId: '${videoId}',
                    playerVars: {
                        'enablejsapi': 1,
                        'rel': 0,
                        'controls': '0',
                        'cc_load_policy': '3'
                    },
                    events: {
                        'onReady': onPlayerReady,
                        'onStateChange': onStateChange,
                        'onPlaybackQualityChange': onPlayerPlaybackQualityChange
                    }
                });
            };
            document.querySelector(".video-container").addEventListener("click", () => {
            document.ciulinYT.func.exitPlayerSettings();
            document.querySelector("#video-animation").classList.remove("hid");
            document.querySelector("#video-animation").setAttribute("data-animation", "triggered");
            document.ciulinYT.func.playPause(document.querySelector(".playbar-controls_play").getAttribute("data-state"));
            });
            document.querySelector("#video-animation").addEventListener('animationend', () => {
            document.querySelector("#video-animation").classList.add("hid");
            document.querySelector("#video-animation").removeAttribute("data-animation");
            });
            document.querySelectorAll(".playmenu-button").forEach(a => {
            a.addEventListener("click", e => {
            document.ciulinYT.load.settings_tab(e.srcElement.getAttribute("data-name"));
            })});
            document.querySelector("#video-player").addEventListener("contextmenu", (e) => {
            e.preventDefault();
            document.ciulinYT.func.playerSettings();
            document.querySelector("video-settings").classList.remove("hid");
            return false;
            }, false);
            document.querySelector(".playmenu-button_exit").addEventListener("click", () => {
            document.ciulinYT.func.exitPlayerSettings();
            });
                document.querySelector(".playbar-controls_play").addEventListener("click", () => {
                    document.ciulinYT.func.playPause(document.querySelector(".playbar-controls_play").getAttribute("data-state"));
                });
                document.querySelector(".playbar-controls_volume").addEventListener("click", () => {
                    document.ciulinYT.func.mutePlayer(document.querySelector(".playbar-controls_volume").getAttribute("data-state"));
                });
                document.querySelector(".playbar-controls_fullscreen").addEventListener("click", () => {
                    document.ciulinYT.func.fullscreenPlayer(document.querySelector(".playbar-controls_fullscreen").getAttribute("data-state"));
                });
                document.querySelector("#playbar-seek").addEventListener("input", (e) => {
                    document.ciulinYT.func.setVolume(e.target.value);
                });
                document.querySelector(".video-scrubbar").addEventListener("mouseenter", e => {
                document.querySelector("#seek-tooltip").classList.remove("hid");
                });
                document.querySelector(".video-scrubbar").addEventListener("mouseleave", e => {
                document.querySelector("#seek-tooltip").classList.add("hid");
                });
                document.querySelector(".video-scrubbar").addEventListener('mousedown', e => {
                    clearInterval(progress);
                    canMouse = true;
                });
                document.querySelector(".video-scrubbar").addEventListener('mouseup', e => {
                    document.ciulinYT.player.seekTo(dur);
                    progress = setInterval(document.ciulinYT.func.preProPos);
                    canMouse = false;
                });
                document.querySelector(".video-scrubbar").addEventListener("mousemove", e => {
                dur = ((e.pageX - e.currentTarget.offsetLeft) / document.querySelector("#video-player").clientWidth * document.ciulinYT.player.getDuration());
                const rect = document.querySelector("#video-player").getBoundingClientRect();
                document.querySelector("#seek-tooltip").style.left = (e.pageX - rect.left) - 16 + "px";
                document.querySelector("#seek-tooltip").innerText = document.ciulinYT.func.calculateLength(dur);
                    if(canMouse !== true) return;
                    document.querySelector(".scrubbar_track_played").style.width = ((e.pageX - e.currentTarget.offsetLeft) / e.currentTarget.offsetWidth * 100) + "%";
                    document.querySelector(".scrubbar_track_handle").style.left = ((e.pageX - e.currentTarget.offsetLeft) / e.currentTarget.offsetWidth * 100) + "%";
                });

            var playVideo = () => {
            document.querySelector(".video-blank").style = "display:none;";
             document.querySelector(".playbar-controls_play").setAttribute("data-state", "1");
            };

            var onPlayerReady = () => {
            document.querySelector("#timestamp_total").innerText = document.ciulinYT.func.calculateLength(parseInt(document.ciulinYT.player.getDuration()));
              progress = setInterval(document.ciulinYT.func.preProPos);
            setInterval(document.ciulinYT.func.trackCurrent);
              };
              function onPlayerPlaybackQualityChange(event) {
              var playbackQuality = event.target.getPlaybackQuality();
              event.target.setPlaybackQuality(playbackQuality);
              }
              var onStateChange = (e) => {
              switch (e.data) {
              case 1:
              playVideo();
              break;
              case 0:
              document.querySelector(".playbar-controls_play").setAttribute("data-state", "0");
              }
              };`;
                script = script.replace(/(?:\r\n|\r|\n)/g, "");
                a.innerText = script;
                DOM.append(a);
            })();
        },
        handleCategory: async (yt, divide, maxAmount, func, ex) => {
            if(!yt || !divide || !maxAmount || !func || !ex) return;
            divide = Number(divide);
            maxAmount = Number(maxAmount);
            var CONTENTS = "";
            let TAB = [];
            let p = yt.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content;
            let b = p.sectionListRenderer ? p.sectionListRenderer.contents : p.richGridRenderer.contents;
            for (let i = 0; i < b.length; i++) {
                let b_a = b[i].itemSectionRenderer ? b[i].itemSectionRenderer.contents[0] : b[i].richItemRenderer;
                b_a = b_a ? b_a : {};
                if(b_a.shelfRenderer && b_a.shelfRenderer.content.expandedShelfContentsRenderer) {
                    let b_b = b_a.shelfRenderer.content.expandedShelfContentsRenderer.items;
                    for (let i_ = 0; i_ < b_b.length; i_++) {
                        TAB.push(b_b[i_].videoRenderer);
                    }
                }
                if(b_a.content && b_a.content.videoRenderer) {
                    TAB.push(b_a.content.videoRenderer);
                }
                if(b_a.shelfRenderer && b_a.shelfRenderer.content.horizontalListRenderer && b_a.shelfRenderer.content.horizontalListRenderer.items) {
                    let b_c = b_a.shelfRenderer.content.horizontalListRenderer.items;
                    for (let e = 0; e < b_c.length; e++) {
                        if(b_c[e].gridVideoRenderer){
                            let b_b = b_c[e].gridVideoRenderer;
                            if((b_b.thumbnailOverlays ? b_b.thumbnailOverlays.find(c => c.thumbnailOverlayTimeStatusRenderer).thumbnailOverlayTimeStatusRenderer.text.simpleText : undefined) !== "SHORTS") {
                                TAB.push(b_b);
                            }
                        }
                    }
                }
                if(b_a.horizontalCardListRenderer && b_a.horizontalCardListRenderer.cards) {
                    let b_c = b_a.horizontalCardListRenderer.cards;
                    for (let e = 0; e < b_c.length; e++) {
                        if(b_c[e].videoCardRenderer){
                            let b_b = b_c[e].videoCardRenderer;
                            TAB.push(b_b);
                        }
                    }
                }
            }
            var anal = TAB;

            var work = [];
            if(TAB[0] && TAB[0][0]) {
                anal = [].concat(TAB[0], TAB[1]);
            }

            for (let i = 0; i < anal.length; i++) {
                if(i < maxAmount) {
                    work.push(anal[i]);
                }
            }

            if(divide == 4) {
                let outArray = [ [], [] ];
                for (let i = 0; i < work.length; i++) {
                    outArray[Math.floor(i/4)].push(work[i]);
                }
                work = outArray;
            }

            for (let i = 0; i < work.length; i++) {
                let bitch = "";
                if(divide == 4) {
                    for (let I = 0; I < work[i].length; I++) {
                        bitch += await func(work[i][I]);
                    }
                } else {
                    bitch += await func(work[i]);
                }
                CONTENTS += `${ex[0]}${bitch}${ex[1]}`;
            }

            return CONTENTS;
        },
        playerSettings: () => {
            let DOM = document.querySelector("video-settings");
            let state = Number(DOM.getAttribute("data-state"));
            if(state !== 0) return;
            DOM.classList.remove("hid");

            switch (state) {
                case 0:
                    document.ciulinYT.func.playPause(1);
                    document.querySelector("video-settings").setAttribute("data-state", "1");
                    break;
            }
        },
        organizeVideoData: async (da) => {
            if(!da) return;
            let owner = (da.owner) ? da.owner.videoOwnerRenderer.title.runs[0] : da.bylineText ? da.bylineText.runs[0] : da.shortBylineText ? da.shortBylineText.runs[0] : da.ownerText ? da.ownerText.runs[0] : "";
            let time = da.thumbnailOverlays ? da.thumbnailOverlays.find(c => c.thumbnailOverlayTimeStatusRenderer) ? da.thumbnailOverlays.find(c => c.thumbnailOverlayTimeStatusRenderer).thumbnailOverlayTimeStatusRenderer.text.simpleText ? da.thumbnailOverlays.find(c => c.thumbnailOverlayTimeStatusRenderer).thumbnailOverlayTimeStatusRenderer.text.simpleText : da.thumbnailOverlays.find(c => c.thumbnailOverlayTimeStatusRenderer).thumbnailOverlayTimeStatusRenderer.text.runs[0].text : da.lengthText ? da.lengthText.simpleText : "" : "";
            let upload = (da.dateText) ? da.dateText.simpleText.replace(/(Premiere[ |s|d])|(in progress.)|Started|less than/g, "") : (da.publishedTimeText) ? da.publishedTimeText.simpleText.replace(/(Premiere[ |s|d])|(in progress.)|Started|less than/g, "") : "";
            let vi = da.viewCount ? da.viewCount.videoViewCountRenderer.viewCount : da.viewCountText ? da.viewCountText : "";
            let view = (vi.simpleText) ? vi.simpleText : (vi.runs) ? vi.runs[0].text + vi.runs[1].text : false;
            let meta = da.metadataText ? da.metadataText.simpleText.split(" · ") : [[],[]];
            let views = view ? [view, upload] : meta;
            let title = da.title ? (da.title.simpleText) ? da.title.simpleText : (da.title.runs) ? da.title.runs[0].text : false : "";
            let videoId = da.videoId;
            let url = owner.navigationEndpoint ? owner.navigationEndpoint.browseEndpoint.canonicalBaseUrl : "";
            let description = da.detailedMetadataSnippets ? da.detailedMetadataSnippets[0].snippetText.runs[0].text : da.descriptionSnippet ? da.descriptionSnippet.runs[0].text: "";
            let icon = da.channelThumbnailSupportedRenderers ? da.channelThumbnailSupportedRenderers.channelThumbnailWithLinkRenderer.thumbnail.thumbnails[0].url : "";

            return {
                owner: owner,
                time: time,
                views: views,
                title: title,
                id: videoId,
                url: url,
                description: description,
                upload: upload,
                icon: icon
            };
        },
        createStorage: async (a) => {
            if(a !== "SUPERSECRETROOTKEY") return error("Permission denied to this function. Reason: Tempering with this can break the script.");
            let _STORAGE = {helloworld: "Hello World", subtitles: {"value": ""}, quality: {"value": ""}, playback: {}};
            localStorage.setItem("ciu.FlashSettings", JSON.stringify(_STORAGE));
        },
        prepareStorage: async() => {
            try {
                var a = JSON.parse(localStorage.getItem("ciu.FlashSettings")).helloworld;
            } catch {
                document.ciulinYT.func.createStorage("SUPERSECRETROOTKEY");
            }
        },
        addToStorage: (a, b, c) => {
            if(!a && !b && !c) return error();
            let STORAGE = JSON.parse(localStorage.getItem("ciu.FlashSettings"));
            STORAGE[a][b] = c;
            localStorage.setItem("ciu.FlashSettings", JSON.stringify(STORAGE));
        },
        getFromStorage: async (a) => {
            let STORAGE = JSON.parse(localStorage.getItem("ciu.FlashSettings"));
            if(!STORAGE[a]) return error(`Storage: ${a} does not exist in storage`);
            return STORAGE[a];
        },
        exitPlayerSettings: () => {
            let DOM = document.querySelector("video-settings");
            DOM.classList.add("hid");
            document.querySelector("video-settings").setAttribute("data-state", "0");
        },
        fullscreenPlayer: (e) => {
            let target = Number(e);
            let $ = document.querySelector("#video-player");
            let requestFullScreen = $.requestFullScreen || $.mozRequestFullScreen || $.webkitRequestFullScreen;
            if(!requestFullScreen) return;

            let makeFullscreen = () => {
                document.querySelector(".playbar-controls_fullscreen").setAttribute("data-state", "1");
                requestFullScreen.bind($)();
            };

            let unmakeFullscreen = () => {
                document.querySelector(".playbar-controls_fullscreen").setAttribute("data-state", "0");
                document.exitFullscreen();
            };

            switch (target) {
                case 0:
                    makeFullscreen();
                    break;
                case 1:
                    unmakeFullscreen();
                    break;
            }
        },
        trackLength: () => {
            document.querySelector("#playbar-progressbar").style.width = document.ciulinYT.player.getCurrentTime() / document.ciulinYT.player.getDuration() * 100 + "%";
        },
        trackCurrent: () => {
            document.querySelector("#timestamp_current").innerText = document.ciulinYT.func.calculateLength(parseInt(document.ciulinYT.player.getCurrentTime()));
        },
        playPause: (e) => {
            let target = Number(e);
            switch (target) {
                case 0:
                    document.ciulinYT.player.playVideo();
                    document.querySelector(".playbar-controls_play").setAttribute("data-state", 1);
                    break;
                case 1:
                    document.ciulinYT.player.pauseVideo();
                    document.querySelector(".playbar-controls_play").setAttribute("data-state", 0);
                    break;
            }
        },
        calculateLength: (length) => {
            if(typeof(length) !== 'number') return error(`calculateLength: '${length}' is not a valid number.`);
            var hours = "";
            var thours = Math.floor(length / 3600);
            var tminute = Math.floor(length % 3600 / 60);
            var tsecond = Math.floor(length % 3600 % 60);
            tsecond = tsecond <= 9 ? ("0" + tsecond) : (tsecond);
            tminute = length >= 3600 ? ("0" + tminute) : (tminute);
            hours = length >= 3600 ? (thours + ":") : "";
            return hours + "" + tminute + ":" + tsecond;
        },
        Modal: (DOM) => {
            DOM = document.querySelector(DOM);
            if (!DOM.classList.contains("hid")) {
                DOM.classList.add("hid");
                DOM.style = "display:none;";
                return;
            }
            DOM.classList.remove("hid");
            DOM.style = "display:block";
        },
        mutePlayer: (state) => {
            state = Number(state);
            let seek = 0;
            let data = 0;

            switch (state) {
                case 0:
                    seek = 100;
                    data = 3;
                    document.ciulinYT.player.unMute();
                    break;
                default:
                    document.ciulinYT.player.mute();
                    break;
            }

            document.querySelector("#playbar-seek").value = seek;
            document.querySelector("#video-player").querySelector(".playbar-controls_volume").setAttribute("data-state", data);
        },
        getCookie: (cname) => {
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
        },
        getSubscription() {
            if(window.location.pathname.split("/")[1].match(/channel|user|^c{1}$/i)) {
                return ytInitialData.header.c4TabbedHeaderRenderer.subscribeButton ? ytInitialData.header.c4TabbedHeaderRenderer.subscribeButton.subscribeButtonRenderer.subscribed : false;
            }
            if(window.location.pathname.split("/")[1].match(/watch/i)) {
                return ytInitialData.contents.twoColumnWatchNextResults.results.results.contents[1].videoSecondaryInfoRenderer.subscribeButton.subscribeButtonRenderer ? ytInitialData.contents.twoColumnWatchNextResults.results.results.contents[1].videoSecondaryInfoRenderer.subscribeButton.subscribeButtonRenderer.subscribed : false;
            }
        },
        buildChannelTheme: async (arg, data) => {
            if(typeof(arg) !== "number") return error("buildChannelTheme: Supply valid number between 0-2");

            let channel1 = () => {

            };

            let channel2 = async() => {
                // Default channel generator

                // Channel 2.0 CSS
                document.head.innerHTML += '<link rel="stylesheet" href="//s.ytimg.com/yt/cssbin/www-channel_new-vflrWkVe_.css">';

                // List videos
                let videos = "";
                for (let i = 0; i < data.VIDEOS.length; i++) {
                    let {owner, time, views, title, id, url} = data.VIDEOS[i];
                    videos += `<div id="playnav-video-play-uploads-12-${id}" class="playnav-item playnav-video">
                <div style="display:none" class="encryptedVideoId">${id}</div>
                <div id="playnav-video-play-uploads-12-${id}-selector" class="selector"></div>
                <div class="content">
                <div class="playnav-video-thumb">
                <a href="https://www.youtube.com/watch?v=${id}" onclick="document.ciulinYT.func.loadPlaynavVideo('${id}');return false;" class="ux-thumb-wrap contains-addto">
                <span class="video-thumb ux-thumb-96 ">
                <span class="clip">
                <img src="//i1.ytimg.com/vi/${id}/default.jpg" alt="Thumbnail" class="" onclick="document.ciulinYT.func.loadPlaynavVideo('${id}');return false;" title="${title}">
                </span>
                </span>
                <span class="video-time">${time}</span>
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
                <a href="https://www.youtube.com/watch?v=${id}" class="playnav-item-title ellipsis" onclick="document.ciulinYT.func.loadPlaynavVideo('${id}');return false;" id="playnav-video-title-play-uploads-12-${id}">
                <span dir="ltr">${title}</span>
                </a>
                <div class="metadata">
                <span dir="ltr">${views[0]}  -  ${views[1]}</span>
                </div>
                <div style="display:none" id="playnav-video-play-uploads-12">${id}</div>
                </div>
                </div>
                </div>`;
                }

                // List recent feed
                let recentfeed = "";
                for (let i = 0; i < data.RECENTFEED.length; i++) {
                    let u = '<tr id="feed_divider"><td colspan="3" class="outer-box-bg-as-border divider">&nbsp;</td>';
                    recentfeed += `
                <tr id="feed_item" valign="top">
                <td class="feed_icon">
                <img class="master-sprite icon-BUL" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
                </td>
                <td>
                <div class="feed_title">
                <div dir="ltr">
                <span dir="ltr">${data.RECENTFEED[i].author}</span>
                <span dir="ltr"></span>
                <span class="bulletin_message">${data.RECENTFEED[i].text}</span>
                </div>
                <div>
                ${data.RECENTFEED[i].images}
                </div>
                <div>
                <span class="timestamp">(${data.RECENTFEED[i].timestamp})</span>
                </div>
                </div>
                </td>
                </tr>
                ${u}</tr>`;
                }

                let OBJ_subcount = "";
                if(data.SUBCOUNT !== undefined) {
                    OBJ_subcount = `<div class="show_info outer-box-bg-as-border"><div class="profile-info-label">${data.name.SUBCOUNT}:</div><div class="profile-info-value" id="profile_show_subscriber_count">${data.SUBCOUNT}</div><div class="cb"></div></div>`;
                }

                let OBJ_country = "";
                if(data.INFO.string.COUNTRY !== undefined) {
                    OBJ_country = `<div class="show_info outer-box-bg-as-border"><div class="profile-info-label">${data.INFO.name.COUNTRY}:</div><div class="profile-info-value" id="profile_show_country">${data.INFO.string.COUNTRY}</div><div class="cb"></div></div>`;
                }



                var OBJ_USERPROFILE = `<div id="user_profile" class="inner-box" style="background-color: rgb(238, 238, 255); color: rgb(51, 51, 51);">
            <div class="box-title title-text-color">Profile</div>
            <div class="cb"></div>
            <div id="user_profile-body">
            <div class="profile_info vcard">
            <div class="show_info outer-box-bg-as-border">
            <div class="profile-info-label">${data.INFO.name.VIEWS}:</div>
            <div class="profile-info-value" id="profile_show_viewed_count">${data.INFO.string.VIEWS}</div>
            <div class="cb"></div>
            </div>
            <div class="show_info outer-box-bg-as-border">
            <div class="profile-info-label">${data.INFO.name.JOIN}:</div>
            <div class="profile-info-value" id="profile_show_member_since">${data.INFO.string.JOIN}</div>
            <div class="cb"></div>
            </div>
            ${OBJ_subcount}
            ${OBJ_country}
            <div class="show_info outer-box-bg-as-border" style="border-bottom-width:1px;margin-bottom:4px;line-height:140%" dir="ltr">${data.DESCRIPTION}${data.INFO.BIO}</div>
            </div>
            </div>
            <div class="cb"></div>
            </div>`;
                var OBJ_PLAYNAVA = `<div id="playnav-body">
            <div id="playnav-player" class="playnav-player-container" style="visibility: visible; left: 0px;">
            <movie-player id="video-player"></movie-player>
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
            <button title="I like this" type="button" class="master-sprite yt-uix-button yt-uix-tooltip" onclick="window.location.href = 'https://www.youtube.com/watch?v=${data.HOMEVIDEO ? data.HOMEVIDEO.videoId : ""}';return false;" id="watch-like" role="button" aria-pressed="false">
            <img class="yt-uix-button-icon-watch-like" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
            <span class="yt-uix-button-content">Like</span>
            </button>
            &nbsp;
            <button title="I dislike this" type="button" class="master-sprite yt-uix-button yt-uix-tooltip" onclick="window.location.href = 'https://www.youtube.com/watch?v=${data.HOMEVIDEO ? data.HOMEVIDEO.videoId : ""}';return false;" id="watch-unlike" role="button" aria-pressed="false">
            <img class="yt-uix-button-icon-watch-unlike" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
            </button>
            </div>
            </div>
            <div id="playnav-curvideo-title" class="inner-box-link-color" dir="ltr">
            <a style="cursor:pointer;margin-right:7px" href="/watch?v=${data.HOMEVIDEO ? data.HOMEVIDEO.videoId : ""}" onmouseover="this.style.textDecoration='underline'" onmouseout="this.style.textDecoration='none'">
            ${data.HOMEVIDEO ? data.HOMEVIDEO.title.runs[0].text : ""}
            </a>
            </div>
            <div id="playnav-curvideo-info-line">
            From: <span id="playnav-curvideo-channel-name"><a href="${window.location.href}">${data.CHANNELNAME}</a></span>&nbsp;|
            <span dir="ltr">${data.HOMEVIDEO ? data.HOMEVIDEO.publishedTimeText.runs[0].text : ""}</span>
            &nbsp;|
            <span id="playnav-curvideo-view-count">${data.HOMEVIDEO ? data.HOMEVIDEO.viewCountText.simpleText.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : ""}</span>
            </div>
            <div class="cb"></div>
            <div id="channel-like-result" class="hid">
            <div id="watch-actions-area" class="yt-rounded">&nbsp;</div>
            </div>
            <div id="channel-like-loading" class="hid">Loading...</div>
            <div class="cb"></div>
            <div id="playnav-curvideo-description-container">
            <div id="playnav-curvideo-description" dir="ltr">${data.HOMEVIDEO ? data.HOMEVIDEO.dec : ""}
            </div>
            </div>
            <a href="https://www.youtube.com/watch?v=${data.HOMEVIDEO ? data.HOMEVIDEO.videoId : ""}" id="playnav-watch-link" onclick="playnav.goToWatchPage()">View comments, related videos, and more</a>
            <div id="playnav-curvideo-controls"></div>
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
            ${videos}
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
            </div>`;
                var OBJ_PLAYNAV = `<div id="user_playlist_navigator" style="background-color: rgb(153, 153, 153); color: rgb(0, 0, 0);" class="outer-box yt-rounded">
            <div id="playnav-channel-header" class="inner-box-bg-color" style="background-color: rgb(238, 238, 255); color: rgb(51, 51, 51);">
            <div id="playnav-title-bar">
            <div id="playnav-channel-name" style="background-color: rgb(153, 153, 153); color: rgb(0, 0, 0);" class="outer-box-bg-color">
            <div class="channel-thumb-holder outer-box-color-as-border-color"><div class="user-thumb-semismall">
            <div>
            <img src="${data.CHANNELICON}">
            </div>
            </div>
            </div>
            <div class="channel-title-container">
            <div class="channel-title outer-box-color" id="channel_title" dir="ltr">${data.CHANNELNAME}</div>
            <div class="channel-title outer-box-color" style="font-size:11px" id="channel_base_title">${data.CHANNELNAME}'s Channel</div>
            </div>
            <div id="subscribe-buttons">
            <span class="subscription-container">
            <button type="button" class="subscribe-button yt-uix-button yt-uix-button-urgent yt-uix-tooltip" onclick="document.ciulinYT.func.subscribe();return false;" title="Click to be notified of new videos from this channel" role="button" data-tooltip-text="Click to be notified of new videos from this channel">
            <span class="yt-uix-button-content">${data.SUBSCRIBE ? "Subscribed" : "Subscribe"}</span>
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
            </div>`;
                var OBJ_RECENTACT;
                var OBJ_LEFTCOLL = `<div class="left-column" id="main-channel-left">
            <div class="inner-box" style="background-color: rgb(238, 238, 255); color: rgb(51, 51, 51);">
            <div style="float:left;padding:0 4px 4px 0" class="link-as-border-color">
            <div class="user-thumb-xlarge">
            <div>
            <a href="${data.CHANNELURL}"><img src="${data.CHANNELICON}"></a>
            </div>
            </div>
            </div>
            <div style="float:left;width:170px">
            <div class="box-title title-text-color" title="${data.CHANNELNAME}" style="float:none;padding-left:4px;margin-top:-2px;width:170px;overflow:hidden;font-size:111%">
            <span class="yt-user-name" dir="ltr">${data.CHANNELNAME}</span>
            </div>
            <div style="whitespace:no-wrap;position:relative;width:170px;">
            <div>
            <span class="subscription-container">
            <button type="button" class="subscribe-button yt-uix-button yt-uix-button-urgent yt-uix-tooltip" onclick="document.ciulinYT.func.subscribe();return false;" title="Click to be notified of new videos from this channel" role="button">
            <span class="yt-uix-button-content">${data.SUBSCRIBE ? "Subscribed" : "Subscribe"}</span>
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
                var OBJ_RIGHTCOLL = `<div class="right-column" id="main-channel-right">
            <div class="inner-box" id="user_recent_activity" style="background-color: rgb(238, 238, 255); color: rgb(51, 51, 51);">
            <div style="zoom:1">
            <div class="box-title title-text-color">Recent Activity</div>
            <div class="cb"></div>
            </div>
            <div id="user_recent_activity-body">
            <div id="feed_table">
            <div class="text-field recent-activity-content outer-box-bg-as-border" style="_width:610px">
            <table width="97%" cellspacing="0" cellpadding="0" border="0">
            <tbody>${recentfeed}</tbody>
            </table>
            </div>
            </div>
            </div>
            </div>
            <div class="clear"></div>
            </div>`;
                var OBJ_CHANCON = `<div class="outer-box" id="main-channel-content" style="z-index: 0;background-color: rgb(153, 153, 153); color: rgb(0, 0, 0);">
            ${OBJ_LEFTCOLL}${OBJ_RIGHTCOLL}
            <div class="cb"></div>
            </div>`;
                return `<div id="channel-body" style="background-color: rgb(204, 204, 204)" class="jsloaded">
            <div id="channel-base-div">
            ${OBJ_PLAYNAV}
            ${OBJ_CHANCON}
            </div>
            </div>
            <div class="cb">
            <div class="clear"></div>
            </div>`;
            };

            let channel3 = () => {

            };

            switch (arg) {
                case 0:
                    return channel1();
                case 1:
                    return channel2();
                case 2:
                    return channel3();
                default:
                    return error("buildChannelTheme: Supply valid number between 0-2");
            }
        },
        setVolume: (vol) => {
            let volume = 0;

            switch (true) {
                case (vol == 0):
                    document.ciulinYT.func.mutePlayer();
                    break;
                case (vol < 20):
                    volume = 1;
                    break;
                case (vol < 80):
                    volume = 2;
                    break;
                case (vol < 100):
                    volume = 3;
                    break;
                default:
                    volume = 3;
                    break;
            }

            document.querySelector("#video-player").querySelector(".playbar-controls_volume").setAttribute("data-state", volume);
            if(document.ciulinYT.player.isMuted() == true) {document.ciulinYT.player.unMute();}
            document.ciulinYT.player.setVolume(vol);
        },
        waitForElm: (selector) => {
            return new Promise((resolve, reject) => {
                var el = document.querySelector(selector);
                if (el) {
                    return resolve(el);
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
        },
        likeThis: () => {
            if(BOOL_LOGIN !== true) return;

            document.querySelectorAll("#top-level-buttons-computed ytd-toggle-button-renderer")[0].click();

            var update = (math) => {
                var equ = parseInt(document.querySelector("span.likes").innerText.replace(/,/g, ""));
                var equ2 = parseInt(document.querySelector("span.dislikes").innerText.replace(/,/g, ""));
                switch (math) {
                    case 0:
                        equ -= 1;
                        equ2 += 1;
                        break;
                    case 1:
                        equ += 1;
                        equ2 -= 1;
                        break;
                }
                document.querySelector("span.likes").innerText = equ.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                if(document.querySelector("#watch-unlike").classList.contains("unliked")) {
                    document.querySelector("span.dislikes").innerText = equ2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }
            };

            if(document.querySelector("#watch-like").classList.contains("liked")) {
                update(0);
                return document.querySelector("#watch-like").classList.remove("liked");
            }

            update(1);
            document.querySelector("#watch-like").classList.add("liked");
            document.querySelector("#watch-unlike").classList.remove("unliked");
        },
        dislikeThis: () => {
            if(BOOL_LOGIN !== true) return;

            document.querySelectorAll("#top-level-buttons-computed ytd-toggle-button-renderer")[1].click();

            var update = (math) => {
                var equ = parseInt(document.querySelector("span.dislikes").innerText.replace(/,/g, ""));
                var equ2 = parseInt(document.querySelector("span.likes").innerText.replace(/,/g, ""));
                switch (math) {
                    case 0:
                        equ -= 1;
                        equ2 += 1;
                        break;
                    case 1:
                        equ += 1;
                        equ2 -= 1;
                        break;
                }
                document.querySelector("span.dislikes").innerText = equ.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                if(document.querySelector("#watch-like").classList.contains("liked")) {
                    document.querySelector("span.likes").innerText = equ2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }
            };

            if(document.querySelector("#watch-unlike").classList.contains("unliked")) {
                update(0);
                return document.querySelector("#watch-unlike").classList.remove("unliked");
            }

            update(1);
            document.querySelector("#watch-unlike").classList.add("unliked");
            document.querySelector("#watch-like").classList.remove("liked");
        },
        loadPlaynavVideo: (id) => {
            if(!id) return error("loadPlaynavVideo: No ID was specified");
            var data = new Promise(async resolve => {
                let xhr = new XMLHttpRequest();
                xhr.open("GET", "https://www.youtube.com/watch?v=" + id);

                xhr.onload = () => {
                    let a = JSON.parse(xhr.response.split("var ytInitialPlayerResponse = ")[1].split(";var")[0]).videoDetails;
                    if(!a) return resolve(undefined);
                    return resolve({description: a.shortDescription, timestamp: a.lengthSeconds});
                };

                xhr.send();
            });

            let xhr = new XMLHttpRequest();
            xhr.open("GET", `https://www.youtube.com/${window.location.pathname}/videos`);
            xhr.onload = async(e) => {
                var a = JSON.parse(xhr.response.split("var ytInitialData = ")[1].split(";</script>")[0]).contents.twoColumnBrowseResultsRenderer.tabs;

                try {
                    a = a.find(a => a.tabRenderer.endpoint.commandMetadata.webCommandMetadata.url.split("/")[3] === 'videos');
                } catch(err) {
                    return error("loadPlaynavVideo: Can't find video tab");
                }

                if(!a.tabRenderer) return;
                var b = a.tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].gridRenderer.items;
                try {
                    b = b.find(a => a.gridVideoRenderer.videoId === id);
                    b = await document.ciulinYT.func.organizeVideoData(b.gridVideoRenderer);
                } catch(err) {
                    return error("loadPlaynavVideo: Video does not exist or can't be found");
                }

                let d = await data;

                document.querySelector("#playnav-curvideo-title a").removeAttribute("onclick");
                document.querySelector("#playnav-curvideo-title a").setAttribute("href", "/watch?v=" + b.id);
                document.querySelector("#playnav-curvideo-title a").innerText = b.title;
                document.querySelector("#playnav-curvideo-info-line span[dir='ltr']").innerText = b.views[1];
                document.querySelector("#playnav-curvideo-description").innerText = d.description;
                document.querySelector("#playnav-curvideo-view-count").innerText = b.views[0];
                document.querySelector("#timestamp_total").innerText = document.ciulinYT.func.calculateLength(parseInt(d.timestamp));
                document.querySelector("#playnav-watch-link").href = "https://www.youtube.com/watch?v=" + b.id;
                document.querySelector(".playbar-controls_play").setAttribute("data-state", "1");
                document.ciulinYT.player.loadVideoById(b.id, 1);
            };

            xhr.onerror = () => {
                console.error("** An error occurred during the XMLHttpRequest");
            };

            xhr.send();
        },
        subscribe: async() => {
            if(BOOL_LOGIN !== true) return;
            if((ytInitialData.metadata ? ytInitialData.metadata.channelMetadataRenderer.title : "") == document.ciulinYT.data.name) return document.ciulinYT.func.showModal("No need to subscribe to yourself!");
            if((ytInitialPlayerResponse ? ytInitialPlayerResponse.videoDetails.author : "") == document.ciulinYT.data.name) return document.ciulinYT.func.showModal("No need to subscribe to yourself!");

            var sub = document.ciulinYT.func.getSubscription();

            document.querySelector("ytd-subscribe-button-renderer tp-yt-paper-button").click();
            var button = document.querySelector(".yt-subscription-button") ? ".yt-subscription-button" : ".subscribe-button";
            var text = "";

            switch(sub) {
                case false:
                    text = "Subscribed";
                    document.querySelector(button).classList.add("subscribed");
                    BOOL_SUBSCRIBE = true;
                    break;
                default:
                    await document.ciulinYT.func.waitForElm("#confirm-button").then((elm) => {elm.click();});
                    text = "Subscribe";
                    document.querySelector(button).classList.remove("subscribed");
                    BOOL_SUBSCRIBE = false;
                    break;
            }

            document.querySelectorAll(`${button} .yt-uix-button-content`).forEach((a) => { a.innerText = text;});
        },
        preProPos: () => {
            let track = document.ciulinYT.player.getCurrentTime() / document.ciulinYT.player.getDuration() * 100 + "%";
            document.querySelector(".scrubbar_track_played").style.width = track;
            document.querySelector(".scrubbar_track_handle").style.left = track;
        },
        showModal: (text) => {
            alert(text);
        }
    };
    var BOOL_LOGIN = null;

    if(window.location.pathname.split("/")[1] == "embed"){
        document.querySelector(".ytp-show-cards-title").parentNode.removeChild(document.querySelector(".ytp-show-cards-title"));
        document.ciulinYT.func.waitForElm(".ytp-watermark").then((elm) => {elm.parentNode.removeChild(elm);});
        document.ciulinYT.func.waitForElm(".html5-endscreen").then((elm) => {elm.parentNode.removeChild(elm);});
        document.ciulinYT.func.waitForElm(".ytp-pause-overlay").then((elm) => {elm.parentNode.removeChild(elm);});
        return;
    }
    var BOOL_SUBSCRIBE = false;
    document.ciulinYT.func.waitForElm("ytd-player video").then((elm) => {
        elm.pause();
        elm.removeAttribute('src');
        elm.load();
        elm.parentNode.removeChild(elm);
    });
    document.ciulinYT.func.waitForElm("ytd-player").then((elm) => {
        elm.pause();
        elm.removeAttribute('src');
        elm.parentNode.removeChild(elm);
    });

    // Build Classic YouTube
    async function buildYouTube() {
        var DOMHTML = document.querySelector("html");

        // DATE
        var TIMEDATE = new Date();
        var ARR_MONTH = (TIMEDATE.getMonth() < 10) ? "0" + TIMEDATE.getMonth() : TIMEDATE.getMonth();
        var ARR_DATE = (TIMEDATE.getDate() < 10) ? "0" + TIMEDATE.getDate() : TIMEDATE.getDate();
        var VALUE_DATE = TIMEDATE.getFullYear() + "" + ARR_MONTH + "" + ARR_DATE;

        // LANG
        var VALUE_LANG = DOMHTML.getAttribute("lang");

        // TITLE
        var VALUE_TITLE = "YouTube - Broadcast Yourself.";

        // HTML
        DOMHTML.removeAttribute("style");
        DOMHTML.removeAttribute("standardized-themed-scrollbar");
        DOMHTML.setAttribute("dir", "ltr");
        DOMHTML.setAttribute("xmlns:og", "https://opengraphprotocol.org/schema/");

        // HEAD
        document.querySelector("head").parentNode.removeChild(document.querySelector("head"));
        var DOMHEAD = document.createElement("head");
        DOMHTML.appendChild(DOMHEAD);

        document.title = VALUE_TITLE;
        DOMHEAD.innerHTML += '<link rel="icon" href="//s.ytimg.com/yt/favicon-refresh-vfldLzJxy.ico">';
        DOMHEAD.innerHTML += '<link rel="shortcut icon" href="//s.ytimg.com/yt/favicon-refresh-vfldLzJxy.ico">';
        DOMHEAD.innerHTML += '<link rel="stylesheet" class="refresh" href="//s.ytimg.com/yt/cssbin/www-refresh-vflzVUPsm.css">';
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

        if(o_DOMBODY.querySelector("title")) {
            o_DOMBODY.querySelector("title").parentNode.removeChild(o_DOMBODY.querySelector("title"));
        }

        // Userbar

        // SET USERNAME
        var OBJ_LOGIN = (async () => {
            if(!document.ciulinYT.func.getCookie("APISID")) {
                var login_url = "https://accounts.google.com/ServiceLogin?service=youtube&uilel=3&passive=true&continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Faction_handle_signin%3Dtrue%26app%3Ddesktop%26hl%3Den%26next%3Dhttps%253A%252F%252Fwww.youtube.com%252F&hl=en&ec=65620";
                BOOL_LOGIN = false;
                return `<div id="masthead-user-bar-container"><div id="masthead-user-bar"><div id="masthead-user"><a class="start" href="https://www.youtube.com/signup">Create Account</a><span class="masthead-link-separator">|</span><a class="end" href="${login_url}">Sign In</a></div></div></div>`;
            }

            await document.ciulinYT.func.waitForElm("#avatar-btn").then((elm) => document.querySelectorAll("ytd-topbar-menu-button-renderer")[2].click());
            await document.ciulinYT.func.waitForElm("#account-name").then((elm) => {document.ciulinYT.data.name = elm.innerText;document.ciulinYT.data.link = document.querySelector("ytd-compact-link-renderer #endpoint").href;});

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
            (() => {
                DOMHEAD.innerHTML += '<link rel="stylesheet" href="//s.ytimg.com/yt/cssbin/www-guide-vflOh_ROh.css">';

                document.ciulinYT.func.waitForElm("[data-feed-name='youtube']").then(() => document.ciulinYT.load.home_category(document.querySelector("[data-feed-name='youtube']")));

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
            <a class="guide-item selected" data-feed-name="youtube" data-feed-url="" onclick="document.ciulinYT.load.home_category(this)">
            <span class="thumb">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="" class="system-icon category">
            </span>
            <span class="display-name">From YouTube</span>
            </a>
            </h3>
            <ul>
            <li class="guide-item-container ">
            <a class="guide-item" data-feed-name="trending" data-feed-url="feed/trending" onclick="document.ciulinYT.load.home_category(this)">
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
                setInterval(() => {document.body.style = "";}, 1000);
            })();
        }

        // Watch (WIP)
        if(window.location.pathname.split("/")[1].match(/watch/i)) {
            let FUNC = (async () => {
                let {views, title, upload} = await document.ciulinYT.func.organizeVideoData(ytInitialData.contents.twoColumnWatchNextResults.results.results.contents[0].videoPrimaryInfoRenderer);
                let {owner, url} = await document.ciulinYT.func.organizeVideoData(ytInitialData.contents.twoColumnWatchNextResults.results.results.contents[1].videoSecondaryInfoRenderer);
                var VALUE_VIDEODATE = ytInitialData.contents.twoColumnWatchNextResults.results.results.contents[0].videoPrimaryInfoRenderer.dateText.simpleText.replace(/(Premiere[ |s|d])|(in progress.)|Started|less than/g, "");
                BOOL_SUBSCRIBE = document.ciulinYT.func.getSubscription();
                var VALUE_VIDEODESCRIPTIO = ytInitialData.contents.twoColumnWatchNextResults.results.results.contents[1].videoSecondaryInfoRenderer.description ? ytInitialData.contents.twoColumnWatchNextResults.results.results.contents[1].videoSecondaryInfoRenderer.description.runs : "";
                var VALUE_VIDEODESCRIPTION = "";
                var VALUE_VIDEOCATEGORY = ytInitialPlayerResponse.microformat.playerMicroformatRenderer.category;
                var VALUE_VIDEOTAG = ytInitialPlayerResponse.videoDetails.keywords ? ytInitialPlayerResponse.videoDetails.keywords : [];
                var VALUE_VIDEOTAGS = "";
                var VALUE_SUGGESTEDVIDEO = ytInitialData.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results[1].itemSectionRenderer ? ytInitialData.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results[1].itemSectionRenderer.contents : ytInitialData.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results;
                var OBJ_SUGGESTEDVIDEOS = "";
                var VALUE_SUBBUTTON = document.ciulinYT.func.getSubscription() ? "subscribed" : "subscribe";
                var isLiked = ytInitialData.contents.twoColumnWatchNextResults.results.results.contents[0].videoPrimaryInfoRenderer.videoActions.menuRenderer.topLevelButtons[0].toggleButtonRenderer.isToggled ? "liked" : "";
                var isDisliked = ytInitialData.contents.twoColumnWatchNextResults.results.results.contents[0].videoPrimaryInfoRenderer.videoActions.menuRenderer.topLevelButtons[1].toggleButtonRenderer.isToggled ? "unliked" : "";
                var i;
                for (i = 0; i < VALUE_VIDEODESCRIPTIO.length; i++) {
                    if(VALUE_VIDEODESCRIPTIO[i].navigationEndpoint && VALUE_VIDEODESCRIPTIO[i].navigationEndpoint.urlEndpoint && !VALUE_VIDEODESCRIPTIO[i].loggingDirectives && !VALUE_VIDEODESCRIPTIO[i].watchEndpoint) {
                        var a = VALUE_VIDEODESCRIPTIO[i].navigationEndpoint.urlEndpoint.url.split("q=")[1] ? VALUE_VIDEODESCRIPTIO[i].navigationEndpoint.urlEndpoint.url.split("q=")[1].split("&")[0] : VALUE_VIDEODESCRIPTIO[i].navigationEndpoint.urlEndpoint.url;
                        VALUE_VIDEODESCRIPTION += `<a href="${decodeURIComponent(a)}" target="_blank" title="${decodeURIComponent(a)}" rel="nofollow" dir="ltr" class="yt-uix-redirect-link">${decodeURIComponent(a)}</a>`;
                    }
                    if(VALUE_VIDEODESCRIPTIO[i].text.split("#")[1]) {
                        VALUE_VIDEODESCRIPTION += `<a href="https://www.youtube.com/tags/${VALUE_VIDEODESCRIPTIO[i].text.split("#")[1]}" target="_blank" title="#${VALUE_VIDEODESCRIPTIO[i].text.split("#")[1]}" rel="nofollow" dir="ltr" class="yt-uix-redirect-link">#${VALUE_VIDEODESCRIPTIO[i].text.split("#")[1]}</a>`;
                    }
                    if(VALUE_VIDEODESCRIPTIO[i].loggingDirectives && VALUE_VIDEODESCRIPTIO[i].text.split("@")[1] && VALUE_VIDEODESCRIPTIO[i].navigationEndpoint) {
                        VALUE_VIDEODESCRIPTION += `<a href="https://www.youtube.com${VALUE_VIDEODESCRIPTIO[i].navigationEndpoint.browseEndpoint.canonicalBaseUrl}" target="_blank" title="${VALUE_VIDEODESCRIPTIO[i].text}" rel="nofollow" dir"ltr" class="yt-utx-redirect-link">${VALUE_VIDEODESCRIPTIO[i].text}</a>`;
                    }
                    if(!VALUE_VIDEODESCRIPTIO[i].navigationEndpoint && !VALUE_VIDEODESCRIPTIO[i].loggingDirectives) {
                        VALUE_VIDEODESCRIPTION += VALUE_VIDEODESCRIPTIO[i].text;
                    }
                    if(VALUE_VIDEODESCRIPTIO[i].navigationEndpoint && VALUE_VIDEODESCRIPTIO[i].navigationEndpoint.watchEndpoint) {
                        VALUE_VIDEODESCRIPTION += `<a href="https://youtu.be/${VALUE_VIDEODESCRIPTIO[i].navigationEndpoint.watchEndpoint.videoId}" target="_blank" title="https://youtu.be/${VALUE_VIDEODESCRIPTIO[i].navigationEndpoint.watchEndpoint.videoId}" rel="nofollow" dir="ltr" class="yt-uix-redirect-link">https://youtu.be/${VALUE_VIDEODESCRIPTIO[i].navigationEndpoint.watchEndpoint.videoId}</a>`;
                    }
                    if(VALUE_VIDEODESCRIPTIO[i].navigationEndpoint && VALUE_VIDEODESCRIPTIO[i].navigationEndpoint.browseEndpoint && !VALUE_VIDEODESCRIPTIO[i].text.split("@")[1] && !VALUE_VIDEODESCRIPTIO[i].text.split("#")[1]) {
                        VALUE_VIDEODESCRIPTION += `<a href="https://www.youtube.com${VALUE_VIDEODESCRIPTIO[i].navigationEndpoint.browseEndpoint.canonicalBaseUrl}" target="_blank" title="https://www.youtube.com${VALUE_VIDEODESCRIPTIO[i].navigationEndpoint.browseEndpoint.canonicalBaseUrl}" rel="nofollow" dir="ltr" class="yt-uix-redirect-link">https://www.youtube.com${VALUE_VIDEODESCRIPTIO[i].navigationEndpoint.browseEndpoint.canonicalBaseUrl}</a>`;
                    }
                }
                for (i = 0; i < VALUE_VIDEOTAG.length; i++) {
                    VALUE_VIDEOTAGS += `<li><a href="https://www.youtube.com/results?search_query=${VALUE_VIDEOTAG[i]}&amp;search=tag">${VALUE_VIDEOTAG[i]}</a></li>`;
                }
                VALUE_VIDEODESCRIPTION = VALUE_VIDEODESCRIPTION.replace(/(?:\r\n|\r|\n)/g, '<br>');
                for (i = 0; i < VALUE_SUGGESTEDVIDEO.length; i++) {
                    if(VALUE_SUGGESTEDVIDEO[i].compactVideoRenderer) {
                        let {owner, time, views, title, id, url} = await document.ciulinYT.func.organizeVideoData(VALUE_SUGGESTEDVIDEO[i].compactVideoRenderer);
                        OBJ_SUGGESTEDVIDEOS += `<li class="video-list-item">
            <a href="https://www.youtube.com/watch?v=${id}" class="video-list-item-link">
            <span class="ux-thumb-wrap contains-addto">
            <span class="video-thumb ux-thumb ux-thumb-110">
            <span class="clip">
            <img src="//i1.ytimg.com/vi/${id}/default.jpg" alt="Thumbnail">
            </span>
            </span>
            <span class="video-time">${time}</span>
            <button type="button" class="addto-button short video-actions yt-uix-button yt-uix-button-short" onclick=";return false;" role="button">
            <img class="yt-uix-button-icon yt-uix-button-icon-addto" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
            <span class="yt-uix-button-content">
            <span class="addto-label">Add to</span>
            </span>
            <img class="yt-uix-button-arrow" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
            </button>
            </span>
            <span dir="ltr" class="title" title="${title}">${title}</span>
            <span class="stat">by ${owner.text}</span>
            <span class="stat view-count">${views[0]}</span>
            </a>
            </li>`;
                    }
                }

                document.ciulinYT.func.waitForElm("#video-player").then((elm) => {
                    document.ciulinYT.func.buildPlayer(ytInitialPlayerResponse.videoDetails.videoId, window.location.href.split("t=")[1] ? window.location.href.split("t=")[1].split("s")[0] : 1);

                    var xhr = new XMLHttpRequest();
                    xhr.open("GET", "https://returnyoutubedislikeapi.com/Votes?videoId=" + window.location.search.split("?v=")[1]);
                    xhr.send();
                    xhr.onload = (e) => {
                        var result = JSON.parse(e.target.response);
                        var likes = result.likes;
                        var dislikes = result.dislikes;
                        var rating = likes + dislikes > 0 ? (likes / (likes + dislikes)) * 100 : 50;
                        document.querySelector(".watch-sparkbar-likes").style.width = rating + "%";
                        document.querySelector(".likes").innerText = likes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        document.querySelector(".dislikes").innerText = dislikes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    };
                });

                return `<div id="content" class="">
            <div id="watch-container" itemscope="" itemtype="https://schema.org/VideoObject">
            <div id="watch-headline-container">
            <div id="watch-headline" class="watch-headline">
            <h1 id="watch-headline-title">
            <span id="eow-title" class="" dir="ltr" title="${title}">
            ${title}
            </span>
            </h1>
            <div id="watch-headline-user-info">
            <span class="yt-uix-button-group">
            <button href="https://www.youtube.com${url}?feature=watch" type="button" class="start yt-uix-button" onclick=";window.location.href=this.getAttribute('href');return false;" role="button">
            <span class="yt-uix-button-content">${owner.text}</span>
            </button><div class="yt-subscription-button-hovercard yt-uix-hovercard">
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
            <movie-player id="video-player" data-text="hmm"></movie-player>
            </div>
            </div>
            <div id="watch-main-container">
            <div id="watch-main">
            <div id="watch-panel">
            <div id="watch-actions">
            <div id="watch-actions-right">
            <span class="watch-view-count">
            <strong>${views[0]}</strong>
            </span>
            <button onclick=";return false;" title="Show video statistics" type="button" id="watch-insight-button" class="yt-uix-tooltip yt-uix-tooltip-reverse yt-uix-button yt-uix-tooltip yt-uix-button-empty" data-button-action="yt.www.watch.actions.stats" role="button">
            <img class="yt-uix-button-icon yt-uix-button-icon-watch-insight" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Show video statistics">
            </button>
            </div>
            <span id="watch-like-unlike" class="yt-uix-button-group">
            <button onclick="document.ciulinYT.func.likeThis();return false;" title="I like this" type="button" class="start yt-uix-tooltip-reverse yt-uix-button yt-uix-tooltip ${isLiked}" id="watch-like" role="button">
            <img class="yt-uix-button-icon yt-uix-button-icon-watch-like" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="I like this">
            <span class="yt-uix-button-content">Like</span>
            </button><button onclick="document.ciulinYT.func.dislikeThis();return false;" title="I dislike this" type="button" class="end yt-uix-tooltip-reverse yt-uix-button yt-uix-tooltip yt-uix-button-empty ${isDisliked}" id="watch-unlike" role="button">
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
            <p id="watch-uploader-info">Uploaded by <a href="https://www.youtube.com${url}" class="yt-user-name author" rel="author" dir="ltr">${owner.text}</a> on <span id="eow-date" class="watch-video-date">${upload}</span></p>
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
            OBJ_CHANNEL = await FUNC;
        }

        // Shorts
        if(window.location.pathname.split("/")[1].match(/shorts/i)) {
            window.location.href = "https://www.youtube.com/watch?v=" + window.location.pathname.split("/")[2];
        }

        // Channel
        if(window.location.pathname.split("/")[1].match(/channel|user|^c{1}$/i)) {
            if (/community|videos|about|channels|playlists|membership|store/.test(window.location.pathname.split("/")[3])) window.location.href = window.location.pathname.split("/").slice(0,3).join("/");
            let FUNC = (async () => {
                let collection = {name: {}};

                // Values

                collection.CHANNELNAME = ytInitialData.metadata ? ytInitialData.metadata.channelMetadataRenderer.title : ytInitialData.header.interactiveTabbedHeaderRenderer.title.simpleText;
                collection.CHANNELICON = ytInitialData.metadata ? ytInitialData.metadata.channelMetadataRenderer.avatar.thumbnails[0].url : ytInitialData.header.interactiveTabbedHeaderRenderer.boxArt.thumbnails[0].url;
                collection.CHANNELURL = window.location.href;
                collection.DESCRIPTION = ytInitialData.metadata ? ytInitialData.metadata.channelMetadataRenderer.description.replace(/\n/g, "<br />") : ytInitialData.header.interactiveTabbedHeaderRenderer.description.simpleText.replace(/\n/g, "<br />");
                collection.SUBCOUNT = ytInitialData.header.c4TabbedHeaderRenderer ? ytInitialData.header.c4TabbedHeaderRenderer.subscriberCountText ? ytInitialData.header.c4TabbedHeaderRenderer.subscriberCountText.simpleText.split(" ")[0] : undefined : undefined;
                collection.name.SUBCOUNT = ytInitialData.header.c4TabbedHeaderRenderer ? ytInitialData.header.c4TabbedHeaderRenderer.subscriberCountText ? ytInitialData.header.c4TabbedHeaderRenderer.subscriberCountText.simpleText.split(" ")[1].charAt(0).toUpperCase() + ytInitialData.header.c4TabbedHeaderRenderer.subscriberCountText.simpleText.split(" ")[1].slice(1) : undefined : undefined;
                switch (true) {
                    case /K/.test(collection.SUBCOUNT):
                        collection.SUBCOUNT = collection.SUBCOUNT.replace(/\./, "").replace(/K/, "000").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        break;
                    case /\d{3}/.test(collection.SUBCOUNT):
                        collection.SUBCOUNT = collection.SUBCOUNT.replace(/\./, "").replace(/M/, "000000").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        break;
                    case /\d{2,3}\.\d{1,2}/.test(collection.SUBCOUNT):
                        collection.SUBCOUNT = collection.SUBCOUNT.replace(/\./, "").replace(/M/, "00000").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        break;
                    case /\d{1,3}/.test(collection.SUBCOUNT):
                        collection.SUBCOUNT = collection.SUBCOUNT.replace(/\./, "").replace(/M/, "0000").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        break;
                }
                collection.DEC = "";
                collection.VIDEOS = await document.ciulinYT.load.channel_videos();
                collection.RECENTFEED = await document.ciulinYT.load.recent_feed();
                collection.INFO = await document.ciulinYT.load.channel_info();
                collection.HOMEVIDEO = ytInitialData.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].channelVideoPlayerRenderer;
                collection.SUBSCRIBE = document.ciulinYT.func.getSubscription();
                // Modify title

                setInterval(() => {document.head.querySelector("title").innerText = `${collection.CHANNELNAME}'s Channel - YouTube`;}, 100);

                // Build player

                document.ciulinYT.func.waitForElm("#video-player").then(() => {
                    document.ciulinYT.func.buildPlayer(ytInitialData.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].channelVideoPlayerRenderer ? ytInitialData.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].channelVideoPlayerRenderer.videoId : "");
                });

                return document.ciulinYT.func.buildChannelTheme(1, collection);
            })();
            OBJ_CHANNEL = await FUNC;
        }

        // Search Results
        if(window.location.pathname.split("/")[1].match(/results/i)) {
            let FUNC = (async () => {
                var searchpar = (new URL(document.location)).searchParams.get("search_query");
                var i;
                var results = ytInitialData.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0].itemSectionRenderer.contents;
                var parse = "";
                DOMHEAD.innerHTML += '<link rel="stylesheet" href="//s.ytimg.com/yt/cssbin/www-refresh-vflj_nHFo.css">';

                for(i = 0; i < results.length; i++) {
                    // Handle Videos
                    if(results[i].videoRenderer) {
                        let {owner, time, views, title, id, url, description} = await document.ciulinYT.func.organizeVideoData(results[i].videoRenderer);
                        let main = `<div class="result-item yt-uix-tile yt-tile-default *sr">
            <div class="thumb-container">
            <a href="https://www.youtube.com/watch?v=${id}" class="ux-thumb-wrap contains-addto result-item-thumb">
            <span class="video-thumb ux-thumb ux-thumb-128">
            <span class="clip" style="height: auto;width: auto;">
            <span class="clip-inner">
            <img alt="Thumbnail" src="//i1.ytimg.com/vi/${id}/default.jpg" data-group-key="thumb-group-1" style="position: static">
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
            <a href="https://www.youtube.com/watch?v=${id}" class="yt-uix-tile-link" dir="ltr" title="${title}">${title}</a>
            </h3>
            <p id="video-description-${id}" class="description" dir="ltr">${description}</p>
            <ul class="single-line-lego-list"><li><a href="https://www.youtube.com/results?search_query=${searchpar}%2C+hd" class="yt-badge-std">hd</a>
            </li>
            </ul>
            <p class="facets">
            <span class="username-prepend">by</span>
            <a href="https://www.youtube.com${url}" class="yt-user-name" dir="ltr">${owner.text}</a> <span class="metadata-separator">|</span>  <span class="date-added">${views[1]}</span> <span class="metadata-separator">|</span>  <span class="viewcount">${views[0]}</span>
            </p>
            </div>
            </div>`;
                        parse += main;
                    }

                    // Handle Channels
                    if(results[i].channelRenderer) {
                        let description = results[i].channelRenderer.descriptionSnippet ? results[i].channelRenderer.descriptionSnippet.runs[0].text : "";
                        let title = results[i].channelRenderer.title.simpleText;
                        let link = "https://www.youtube.com" + results[i].channelRenderer.shortBylineText.runs[0].navigationEndpoint.browseEndpoint.canonicalBaseUrl;
                        let thumbnail = results[i].channelRenderer.thumbnail.thumbnails[0].url;
                        let video = results[i].channelRenderer.videoCountText ? results[i].channelRenderer.videoCountText.runs : [];
                        let videos = video[1] ? video[0].text + video[1].text : video.text;
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
                    <a href="https://www.youtube.com/results?search_type=search_users" class="yt-badge-std">CHANNEL</a>
                    </li>
                    </ul>
                    <p class="facets">
                    <span class="username-prepend">by</span> <a href="${link}" class="yt-user-name" dir="ltr">${title}</a><span class="metadata-separator"> | </span><span class="video-count">${videos}</span><span class="metadata-separator"> | </span><span class="channel-subscriber-count">${subs}</span>
                    </p>
                    </div>
                    </div>`;

                        parse += main;
                    }

                    // Handle Playlists
                    if(results[i].playlistRenderer) {
                        // Oh, if ever YouTube would restore playlists on the search engine.
                        // If only the Right-Wing corruption and ignorance would fuck off.
                    }
                }



                return `<div id="content">
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
            <span href="https://www.youtube.com/results?search_query=${searchpar}&amp;sp=CAI%253D" class=" yt-uix-button-menu-item" onclick=";window.location.href=this.getAttribute('href');return false;">Upload date</span>
            </li>
            <li role="menuitem" id="aria-id-52246167700">
            <span href="https://www.youtube.com/results?search_query=${searchpar}&amp;sp=CAMSAhAB" class=" yt-uix-button-menu-item" onclick=";window.location.href=this.getAttribute('href');return false;">View count</span>
            </li>
            <li role="menuitem" id="aria-id-43856570253">
            <span href="https://www.youtube.com/results?search_query=${searchpar}&amp;sp=CAESAhAB" class=" yt-uix-button-menu-item" onclick=";window.location.href=this.getAttribute('href');return false;">Rating</span>
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
            <a href="https://www.youtube.com/results?search_query=${searchpar}&amp;sp=CAASBAgCEAE%253D">Relevance</a>
            </li>
            <li>
            <a href="https://www.youtube.com/results?search_query=${searchpar}&amp;sp=CAI%253D">Upload date</a>
            </li>
            <li>
            <a href="https://www.youtube.com/results?search_query=${searchpar}&amp;sp=CAMSAhAB">View count</a>
            </li>
            <li>
            <a href="https://www.youtube.com/results?search_query=${searchpar}&amp;sp=CAESAhAB">Rating</a>
            </li>
            </ul>
            </div>
            <div class="search-refinements-block filters">
            <div class="search-refinements-block-title">Filter</div>
            <ul>
            <li>
            <span class="lego lego-property  append-lego" data-lego-name="last hour">
            <a class="lego-action" title="Search for ${searchpar}, last hour" href="https://www.youtube.com/results?search_query=${searchpar}&amp;sp=EgQIARAB">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif"></a>
            <a class="lego-action-placeholder" title="Search for ${searchpar}, last hour" href="https://www.youtube.com/results?search_query=${searchpar}&amp;sp=EgQIARAB">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif"></a>
            <a class="lego-content" title="Search for ${searchpar}, last hour" href="https://www.youtube.com/results?search_query=${searchpar}&amp;sp=EgQIARAB">last hour</a>
            </span>
            </li>
            <li>
            <span class="lego lego-property  append-lego" data-lego-name="today">
            <a class="lego-action" title="Search for ${searchpar}, today" href="https://www.youtube.com/results?search_query=${searchpar}&amp;sp=EgIIAg%253D%253D">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif"></a>
            <a class="lego-action-placeholder" title="Search for ${searchpar}, today" href="https://www.youtube.com/results?search_query=${searchpar}&amp;sp=EgIIAg%253D%253D">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif"></a>
            <a class="lego-content" title="Search for ${searchpar}, today" href="https://www.youtube.com/results?search_query=${searchpar}&amp;sp=EgIIAg%253D%253D">uploaded today</a>
            </span>
            </li>
            <li>
            <span class="lego lego-property  append-lego" data-lego-name="this week">
            <a class="lego-action" title="Search for ${searchpar}, this week" href="https://www.youtube.com/results?search_query=${searchpar}&amp;sp=EgQIAxAB">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif"></a>
            <a class="lego-action-placeholder" title="Search for ${searchpar}, this week" href="https://www.youtube.com/results?search_query=${searchpar}&amp;sp=EgQIAxAB">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif"></a>
            <a class="lego-content" title="Search for ${searchpar}, this week" href="https://www.youtube.com/results?search_query=${searchpar}&amp;sp=EgQIAxAB">uploaded this week</a>
            </span>
            </li>
            <li>
            <span class="lego lego-property  append-lego" data-lego-name="this month">
            <a class="lego-action" title="Search for ${searchpar}, this month" href="https://www.youtube.com/results?search_query=${searchpar}&amp;sp=EgQIBBAB">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
            </a>
            <a class="lego-action-placeholder" title="Search for ${searchpar}, this month" href="https://www.youtube.com/results?search_query=${searchpar}&amp;sp=EgQIBBAB">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
            </a>
            <a class="lego-content" title="Search for ${searchpar}, this month" href="https://www.youtube.com/results?search_query=${searchpar}&amp;sp=EgQIBBAB">uploaded this month</a>
            </span>
            </li>
            <li>
            <span class="lego lego-property  append-lego" data-lego-name="this year">
            <a class="lego-action" title="Search for ${searchpar}, this year" href="https://www.youtube.com/results?search_query=${searchpar}&amp;sp=EgQIBRAB">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
            </a>
            <a class="lego-action-placeholder" title="Search for ${searchpar}, this year" href="https://www.youtube.com/results?search_query=${searchpar}&amp;sp=EgQIBRAB">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
            </a>
            <a class="lego-content" title="Search for ${searchpar}, this year" href="https://www.youtube.com/results?search_query=${searchpar}&amp;sp=EgQIBRAB">uploaded this year</a>
            </span>
            </li>
            </ul>
            </div>
            <div class="search-refinements-block filters">
            <div class="search-refinements-block-title">&nbsp;</div>
            <ul>
            <li>
            <span class="lego lego-property  append-lego" data-lego-name="channel">
            <a class="lego-action" title="Search for ${searchpar}, channel" href="https://www.youtube.com/results?search_query=${searchpar}&amp;sp=EgIQAg%253D%253D">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
            </a>
            <a class="lego-action-placeholder" title="Search for ${searchpar}, channel" href="https://www.youtube.com/results?search_query=${searchpar}&amp;sp=EgIQAg%253D%253D">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
            </a>
            <a class="lego-content" title="Search for ${searchpar}, channel" href="https://www.youtube.com/results?search_query=${searchpar}&amp;sp=EgIQAg%253D%253D">channel</a>
            </span>
            </li>
            <li>
            <span class="lego lego-property  append-lego" data-lego-name="playlist">
            <a class="lego-action" title="Search for ${searchpar}, playlist" href="https://www.youtube.com/results?search_query=${searchpar}&amp;sp=EgIQAw%253D%253D">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
            </a>
            <a class="lego-action-placeholder" title="Search for ${searchpar}, playlist" href="https://www.youtube.com/results?search_query=${searchpar}&amp;sp=EgIQAw%253D%253D">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
            </a>
            <a class="lego-content" title="Search for ${searchpar}, playlist" href="https://www.youtube.com/results?search_query=${searchpar}&amp;sp=EgIQAw%253D%253D">playlist</a>
            </span>
            </li>
            <li>
            <span class="lego lego-property  append-lego" data-lego-name="movie">
            <a class="lego-action" title="Search for ${searchpar}, movie" href="https://www.youtube.com/results?search_query=${searchpar}&amp;sp=EgIQBA%253D%253D">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
            </a>
            <a class="lego-action-placeholder" title="Search for ${searchpar}, movie" href="https://www.youtube.com/results?search_query=${searchpar}&amp;sp=EgIQBA%253D%253D">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
            </a>
            <a class="lego-content" title="Search for ${searchpar}, movie" href="https://www.youtube.com/results?search_query=${searchpar}&amp;sp=EgIQBA%253D%253D">movie</a>
            </span>
            </li>
            <li>
            <span class="lego lego-property  append-lego" data-lego-name="show">
            <a class="lego-action" title="Search for ${searchpar}, show" href="https://www.youtube.com/results?search_query=${searchpar}%2C+show">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
            </a>
            <a class="lego-action-placeholder" title="Search for ${searchpar}, show" href="https://www.youtube.com/results?search_query=${searchpar}%2C+show">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
            </a>
            <a class="lego-content" title="Search for ${searchpar}, show" href="https://www.youtube.com/results?search_query=${searchpar}%2C+show">show</a>
            </span>
            </li>
            <li>
            <span class="lego lego-property  append-lego" data-lego-name="3d">
            <a class="lego-action" title="Search for ${searchpar}, 3d" href="https://www.youtube.com/results?search_query=${searchpar}%2C+3d">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
            </a>
            <a class="lego-action-placeholder" title="Search for ${searchpar}, 3d" href="https://www.youtube.com/results?search_query=${searchpar}%2C+3d">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
            </a>
            <a class="lego-content" title="Search for ${searchpar}, 3d" href="https://www.youtube.com/results?search_query=${searchpar}%2C+3d">3D</a>
            </span>
            </li>
            </ul>
            </div>
            <div class="search-refinements-block filters">
            <div class="search-refinements-block-title">&nbsp;</div>
            <ul>
            <li>
            <span class="lego lego-property  append-lego" data-lego-name="hd">
            <a class="lego-action" title="Search for ${searchpar}, hd" href="https://www.youtube.com/results?search_query=${searchpar}%2C+hd">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
            </a>
            <a class="lego-action-placeholder" title="Search for ${searchpar}, hd" href="https://www.youtube.com/results?search_query=${searchpar}%2C+hd">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
            </a>
            <a class="lego-content" title="Search for ${searchpar}, hd" href="https://www.youtube.com/results?search_query=${searchpar}%2C+hd">HD (high definition)</a>
            </span>
            </li>
            <li>
            <span class="lego lego-property  append-lego" data-lego-name="cc">
            <a class="lego-action" title="Search for ${searchpar}, cc" href="https://www.youtube.com/results?search_query=${searchpar}%2C+cc">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif"></a>
            <a class="lego-action-placeholder" title="Search for ${searchpar}, cc" href="https://www.youtube.com/results?search_query=${searchpar}%2C+cc">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
            </a>
            <a class="lego-content" title="Search for ${searchpar}, cc" href="https://www.youtube.com/results?search_query=${searchpar}%2C+cc">CC (closed caption)</a>
            </span>
            </li>
            <li>
            <span class="lego lego-property  append-lego" data-lego-name="long">
            <a class="lego-action" title="Search for ${searchpar}, long" href="https://www.youtube.com/results?search_query=${searchpar}%2C+long">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
            </a>
            <a class="lego-action-placeholder" title="Search for ${searchpar}, long" href="https://www.youtube.com/results?search_query=${searchpar}%2C+long">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
            </a>
            <a class="lego-content" title="Search for ${searchpar}, long" href="https://www.youtube.com/results?search_query=${searchpar}%2C+long">longer than 20 min</a>
            </span>
            </li>
            <li>
            <span class="lego lego-property  append-lego" data-lego-name="partner">
            <a class="lego-action" title="Search for ${searchpar}, partner" href="https://www.youtube.com/results?search_query=${searchpar}%2C+partner">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
            </a>
            <a class="lego-action-placeholder" title="Search for ${searchpar}, partner" href="https://www.youtube.com/results?search_query=${searchpar}%2C+partner">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
            </a>
            <a class="lego-content" title="Search for ${searchpar}, partner" href="https://www.youtube.com/results?search_query=${searchpar}%2C+partner">partner video</a>
            </span>
            </li>
            <li>
            <span class="lego lego-property  append-lego" data-lego-name="creativecommons">
            <a class="lego-action" title="Search for ${searchpar}, creativecommons" href="https://www.youtube.com/results?search_query=${searchpar}%2C+creativecommons">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
            </a>
            <a class="lego-action-placeholder" title="Search for ${searchpar}, creativecommons" href="https://www.youtube.com/results?search_query=${searchpar}%2C+creativecommons">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
            </a>
            <a class="lego-content" title="Search for ${searchpar}, creativecommons" href="https://www.youtube.com/results?search_query=${searchpar}%2C+creativecommons">creative commons</a>
            </span>
            </li>
            <li>
            <li>
            <span class="lego lego-property  append-lego" data-lego-name="live">
            <a class="lego-action" title="Search for ${searchpar}, live" href="https://www.youtube.com/results?search_query=${searchpar}%2C+live">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
            </a>
            <a class="lego-action-placeholder" title="Search for ${searchpar}, live" href="https://www.youtube.com/results?search_query=${searchpar}%2C+live">
            <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
            </a>
            <a class="lego-content" title="Search for ${searchpar}, live" href="https://www.youtube.com/results?search_query=${searchpar}%2C+live">live</a>
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
            OBJ_CHANNEL = await FUNC;
        }

        // Browse
        if(window.location.pathname.match(/\/feed\/explore/i)) {
            let FUNC = (async () => {
                let CSS1 = `<link rel="stylesheet" href="//s.ytimg.com/yt/cssbin/www-videos-nav-vfl8KBBHC.css"/>`;
                let CSS2 = `<link rel="stylesheet" href="//s.ytimg.com/yt/cssbin/www-refresh-browse-vflPUlXqz.css"/>`;
                document.querySelector(".refresh").href = "//s.ytimg.com/yt/cssbin/www-refresh-vflAbAPqe.css";
                document.head.innerHTML += CSS1 + CSS2;
                document.title = "Videos - YouTube";
                document.ciulinYT.func.waitForElm("#page").then(elm => {elm.setAttribute("class", "browse-base browse-videos");});
                var c = "";

                let categories = ["most-viewed", "recommended", "music", "live", "gaming", "news", "sports", "edu", "howto"];

                for (let i = 0; i < categories.length; i++) {
                    let videos = await document.ciulinYT.load.browseCategory(categories[i]);

                    let html = `<div class="browse-collection">
<div class="ytg-box collection-header with-icon">
<a class="heading ytg-box" href="">
<img class="header-icon ${videos.class}" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
<div class="header-container">
<h2>${videos.name} »</h2>
</div>
</a>
<a class="yt-playall-link" href="">
<img class="small-arrow" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
Play all
</a>
</div>
${videos.html}
</div>`;
                    c += html;
                }

                return `<div id="baseDiv" class="date-20120215 video-info">
<div id="masthead-subnav">
<ul>
<li class="selected">
<a href="">Videos</a>
</li>
<li>
<a href="">Music</a>
</li>
<li>
<a href="">Movies</a>
</li>
<li>
<a href="">Shows</a>
</li>
<li>
<a href="">Trailers</a>
</li>
<li>
<a href="">Live</a>
</li>
<li>
<a href="">Sports</a>
</li>
<li>
<a href="">Education</a>
</li>
<li class="last">
<a href="">News</a>
</li>
</ul>
</div>
<div class="ytg-fl browse-header">
</div>
<div class="browse-container ytg-box no-stage browse-bg-gradient">
<div class="ytg-fl browse-content">
<div id="browse-side-column" class="ytg-2col ytg-last">
<ol class="navigation-menu">
<li class="menu-item">
<a class="selected" href="https://www.youtube.com/feed/explore">All Categories</a>
</li>
<li class="menu-item">
<a class="" href="">Recommended for You</a>
</li>
</ol>
</div>
<div id="browse-main-column" class="ytg-4col">
<div class="load-more-pagination">
<div class="load-more-content">
${c}
</div>
</div>
</div>
</div>
</div>
<div class="clear"></div>
</div>`;
            })();
            OBJ_CHANNEL = await FUNC;
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
        <a href="https://www.youtube.com/feed/explore">Browse</a>
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
        </div>`;

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
        </li>`;

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
    }
    (async () => {
        if(document.ciulinYT.func.getCookie("APISID")) {
            return buildYouTube();
        }
        if(!document.ciulinYT.func.getCookie("CONSENT")) return;
        if(document.ciulinYT.func.getCookie("CONSENT").indexOf("YES") !== 0) {
            await document.ciulinYT.func.waitForElm("#dialog");
            await document.ciulinYT.func.waitForElm(".ytd-consent-bump-v2-lightbox").then((elm) => document.querySelector("#dialog").querySelectorAll("ytd-button-renderer")[3].querySelector("#button").addEventListener("click", () => {location = '';}));
            return;
        }
        buildYouTube();
    })();
})();