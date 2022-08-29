// ==UserScript==
// @name         Ciulin's YouTube
// @namespace    https://www.youtube.com/*
// @version      9.9.9
// @description  Broadcast Yourself
// @author       CiulinUwU
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?domain=youtube.com
// @grant unsafeWindow
// @grant GM_addStyle
// @grant GM.getValue
// @grant GM.setValue
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
// @run-at document-start
// ==/UserScript==
/* jshint esversion: 11 */

alert("Ciulin's YouTube has been rebranded!\nYou will be redirected to install the latest update after closing this popup.\n\nMake sure to erase Ciulin's YouTube.user.js to avoid conflicts.");
window.location.href = "https://github.com/ciulinuwu/cosmic-cat/raw/main/cosmic-cat.user.js";