export default {
	// forgot to finish this
	// accidentally kept the option enabled, whoops.
	Main: (data) => {
		return `<div id="baseDiv">
<div class="profileTitleLinks">
<div id="profileSubNav">
<a href="${data.header.url}/videos">Videos</a>
<span class="delimiter">|</span>
<a href="${data.header.url}/playlists">Playlists</a>
</div>
</div>
<div id="profile-side-content">
${document.cosmicCat.Template.Channel.Channels1.sideCon.userPro(data)}
${document.cosmicCat.Template.Channel.Channels1.sideCon.userConn(data)}
</div>
<div id="profile-main-content">
${document.cosmicCat.Template.Channel.Channels1.mainCon.userVideos.Main(data)}
</div>
<div style="clear:both"></div>
</div>`;
	},
	sideCon: {
		userPro: (data) => {
			return `<div class="profile-box profile-highlightbox">
<div class="box-head">
<div class="box-fg">
<div class="headerTitleEdit">
<div class="headerTitleRight">
<script type="text/javascript">
var watchUsername = 'YouTube';
var subscribeaxc = '';
var isLoggedIn =  false ;
</script>
<div id="subscribeDiv">
<a class="action-button" onclick="subscribe(watchUsername, subscribeaxc, true); urchinTracker('/Events/SUB_click/Profile/YouTube'); return false;" title="subscribe to YouTube's videos">
<span class="action-button-leftcap"></span>
<span class="action-button-text">Subscribe</span>
<span class="action-button-rightcap"></span>
</a>
</div>
<div id="unsubscribeDiv" class="hid">
<a class="action-button inactive" onclick="unsubscribe(watchUsername, subscribeaxc); return false;">
<span class="action-button-leftcap"></span>
<span class="action-button-text">Unsubscribe</span>
<span class="action-button-rightcap"></span>
</a>
</div>
</div>
<div class="headerTitleLeft">YouTube Channel</div>
</div>
</div>
<div class="box-bg"></div>
</div>
<div class="box-body">
<div class="box-fg">
<div id="subscribeMessage">Please login to perform this operation.</div>
<div class="hid">See related Channels</div>
<div class="floatL">
<div class="user-thumb-xlarge">
<img src="${data.header.avatar}" alt="${data.header.name}">
</div>
</div>
<div style="float:left;margin-left:5px;width:180px;">
<div class="largeTitles">
<strong>${data.header.name}</strong>
</div>
<div class="padT3">
<div class="smallText">Joined: <strong>${data.info.fields.joined}</strong></div>
<div class="smallText">Subscribers: <strong>${data.header.subscriberCount}</strong></div>
<div class="smallText">Channel Views: <strong>${data.info.fields.views}</strong></div>
</div>
</div>
<div style="clear:both"></div>
<br>
<div class="padT5 profileAssets">
<br>
<img src="//www.youtube.com/img/flags/en_US_globe.gif" class="currentFlag" width="17">
<br>
</div>
<div class="flaggingText">
<a href="http://www.youtube.com/flag_user?username=YouTube&amp;action=report_profile_image" onclick="javascript:getSimpleXR('/flag_user?username=YouTube&amp;action=report_profile_image&amp;format=xml', showConfMsg, this);return false;">Report</a> profile image violation</div>
</div>
<div class="box-bg"></div>
</div>
</div>`;
		},
		userConn: (data) => {
			return `<div class="profile-box">
<div class="box-head">
<div class="box-fg">
<div class="headerTitle">Connect with YouTube</div>
</div>
<div class="box-bg"></div>
</div>
<div class="box-body">
<div class="box-fg">
<table width="100%" cellspacing="0" cellpadding="3" border="0">
<tbody>
<tr>
<td width="110" valign="middle" align="right"></td>
<td valign="top" align="left">
<table class="actionsTable">
<tbody>
<tr class="actionsTable">
<td class="actionsTable">
<div class="smallText">
<a id="aProfileSendMsg" href="https://www.youtube.com/outbox?to_user=YouTube">
<img src="//s.ytimg.com/yt/img/pixel-vfl73.gif" id="profileSendMsg" class="icnProperties" alt="Send Message">Send Message</a>
</div>
<div class="smallText">
<a id="aProfileAddComment" href="https://www.youtube.com/profile_comment_post?user=YouTube">
<img src="//s.ytimg.com/yt/img/pixel-vfl73.gif" id="profileAddComment" class="icnProperties" alt="Add Comment">Add Comment</a>
</div>
<div class="smallText">
<a id="aProfileFwdMember" href="javascript:share_profile()">
<img src="//s.ytimg.com/yt/img/pixel-vfl73.gif" id="profileFwdMember" class="icnProperties" alt="Share Channel">Share Channel</a>
</div>
<div class="smallText">
</div>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
<tr>
<td colspan="2">
<div class="marB3 alignC">
<a href="http://www.youtube.com/YouTube">http://www.youtube.com/</a></div>
</td>
</tr>
</tbody></table>
</div>
<div class="box-bg"></div>
</div>
</div>`;
		}
	},
	mainCon: {
		userFeatured: (data) => {
			return `<div class="profileEmbedVideo" id="user_featured">
<div id="profile-player-div">
</div>
<script type="text/javascript">
var swfArgs = {"el": "profilepage", "BASE_YT_URL": "https://web.archive.org/web/20090609053526/http://www.youtube.com/", "iv_allow_external_links": 1, "iv_storage_server": "https://web.archive.org/web/20090609053526/http://www.google.com/reviews/y/", "rs": "1", "ss": "1", "iv_module": "https://web.archive.org/web/20090609053526/http://s.ytimg.com/yt/swf/iv_module-vfl97100.swf", "video_id": "YZsMgrxGaMA", "l": 1602, "sk": "Lca8SIZeGn-Y2DgJIDvvn8FvtgWFupcIC", "fmt_map": "35/640000/9/0/115,34/0/9/0/115,5/0/7/0/0", "vq": null, "t": "vjVQa1PpcFPay5dnEQSWJoNjhZX631p1fhKtiXUwpOw=", "hl": "en", "plid": "AARr47nU67ILcwn5", "keywords": "Michael%2CBuckley%2CWHATTHEBUCKSHOW%2CYouTube%2Csuccess%2Ctips", "cr": "ES", "sn": "1"};
var swfUrl = canPlayV9Swf() ? 'https://web.archive.org/web/20090609053526/http://s.ytimg.com/yt/swf/watch-vfl101887.swf' : 'https://web.archive.org/web/20090609053526/http://s.ytimg.com/yt/swf/watch_v8-vfl101887.swf';
var watchGamUrl = null;
var watchDCUrl = null;
var watchIsPlayingAll = false;
var watchSetWmode = false;
var useWmodeDirect = false;
var ad_eurl = null;
writeMoviePlayer("profile-player-div");
</script>
<center>
<div class="profile-box profileEmbedVideoInfo" style="margin: 10px 0px 15px 0px;">
<div class="box-body">
<div class="box-fg">
<div class="vtitle">
<strong>
<a href="https://www.youtube.com/watch?v=YZsMgrxGaMA">
Michael Buckley's Secrets to YouTube Success
</a>
</strong>
</div>
<div class="vfacets">
From:
<a href="/web/20090609053526/http://www.youtube.com/user/YouTube" title="YouTube">YouTube</a>
<br>
Views: 80,402
<br>
Comments:
<a href="/web/20090609053526/http://www.youtube.com/comment_servlet?all_comments&amp;v=YZsMgrxGaMA">403</a>
</div>
</div>
<div class="box-bg"></div>
</div>
</div>
</center>
</div>`;
		},
		userVideos: {
			Main: (data) => {
				return `<div class="profile-box">
<div class="box-head">
<div class="box-fg">
<div class="headerTitle">
<div class="headerTitleRight">
</div>
<span>Videos (<a href="/web/20080612190422/http://www.youtube.com/profile_videos?user=YouTube" class="headersSmall">34</a>)</span>
</div>
</div>
<div class="box-bg"></div>
</div>
<div class="box-body">
<div class="box-fg">
<div style="padding: 3px;">
<div class="clear"></div>
</div>
<div id="profileVideos" style="margin-left:12px;text-align: center;">
<table height="121" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td class="alignTop padTsm">
<img src="//s.ytimg.com/yt/img/pixel-vfl73.gif" class="btn_vscroll_lt_18x106 hand" onclick="fadeOldImage('profile_videos','4');shiftLeft('profile_videos')" id="vbrol"></td>
<td style="padding-top:4px">
<table style="background-color: XXXXXX;" width="500" height="121" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td style="border-bottom:none;" id="vids">
</td>
</tr>
</tbody>
</table>
</td>
<td class="alignTop padTsm">
<img src="//s.ytimg.com/yt/img/pixel-vfl73.gif" class="btn_vscroll_rt_18x106 hand" onclick="fadeOldImage('profile_videos','4');shiftRight('profile_videos');" id="vbror"></td>
</tr>
</tbody>
</table>
</div>
<div id="loadingDiv" class="marT18 alignC" style="display:none;height:500px;">
<br><br>
<img src="//s.ytimg.com/yt/img/icn_loading_animated-vfl24663.gif">
<br><br>
</div>
</div>
<div class="box-bg"></div>
</div>
</div>`;
			},
			videos: (data) => {
				return `<div class="videobarthumbnail_block" id="div_profile_videos_0">
<center>
<div class="video-thumb-medium">
<a id="href_profile_videos_0" href="https://www.youtube.com/watch?v=${data.id}">
<img id="img_profile_videos_0" src="https://i.ytimg.com/vi/${data.id}/default.jpg" onload="opacity('img_profile_videos_0', 80, 100, 800);" style="opacity: 1;">
</a>
</div>
<div id="title1_profile_videos_0" class="xsmallText grayText padB3">
<a href="https://www.youtube.com/watch?v=${data.id}" title="${data.title}">${data.title}</a>
</div>
<div id="title2_profile_videos_0" class="xsmallText grayText padB3">
<span style="color: #333">${data.time}</span>
</div>
</center>
</div>`;
			},
			ovideos: (data) => {
				return `<div class="video-cell" style="width:32.6%">
<div class="video-entry">
<div class="v120WideEntry">
<div class="v120WrapperOuter">
<div class="v120WrapperInner">
<a id="video-url-${data.id}" href="https://www.youtube.com/watch?v=${data.id}&amp;feature=channel_page" rel="nofollow">
<img title="${data.title}" src="${data.thumbnail}" class="vimg120" qlicon="${data.id}" alt="${data.title}">
</a>
<div id="quicklist-icon-${data.id}" class="addtoQL90">
<a id="add-to-quicklist-${data.id}" href="#" ql="${data.id}" title="Add Video to QuickList">
<button class="master-sprite QLIconImg" title="" onclick="clicked_add_icon(this, this.parentNode.getAttribute('ql'), 0, 'https://web.archive.org/web/20090609053526/http://i2.ytimg.com/vi/YZsMgrxGaMA/default.jpg', 'Michael Buckley\'s Secrets to YouTube Success');return false;" onmouseover="mouseOverQuickAdd(this)" onmouseout="mouseOutQuickAdd(this)" onmousedown="urchinTracker('/Events/profile/QuickList+AddTo')"></button></a>
<div class="hid quicklist-inlist">
<a id="add-to-quicklist-${data.id}" href="#" ql="${data.id}" title="Add Video to QuickList"></a>
<a href="/web/20090609053526/http://www.youtube.com/watch_queue?all">Added</a>
</div>
</div>
<div class="video-time">
<span id="video-run-time-${data.id}">${data.time}</span>
</div>
</div>
</div>
</div>
<div class="video-main-content" id="video-main-content-${data.id}">
<div class="video-title">
<div class="video-short-title">
<span id="translated_short_prefix_${data.id}" style="font-size: 10px;" class="hid">[TRANSLATED]</span>
<a id="video-short-title-${data.id}" href="https://www.youtube.com/watch?v=${data.id}&amp;feature=channel_page" title="${data.title}" rel="nofollow">${data.title}</a>
</div>
<div class="video-long-title">
<span id="translated_long_prefix_${data.id}" style="font-size: 10px;" class="hid">[TRANSLATED]</span>
<a id="video-long-title-${data.id}" href="https://www.youtube.com/watch?v=${data.id}&amp;feature=channel_page" title="${data.title}" rel="nofollow">${data.title}</a>
</div>
</div>
<div id="video-description-${data.id}" class="video-description">

</div>
<div class="video-facets">
<span id="video-average-rating-${data.id}" class="video-rating-list video-rating-with-caps">
<div>
<button class="master-sprite ratingCapsVS-left" title=""></button>
<button class="master-sprite ratingCapsVS ratingCapsVS-5.0" title="5.0"></button>
<button class="master-sprite ratingCapsVS-right" title=""></button>
</div>
</span>
<span id="video-added-time-${data.id}" class="video-date-added">${data.upload}</span>
<span id="video-num-views-${data.id}" class="video-view-count">${data.views}</span>
<span id="video-average-rating-${data.id}" class="video-rating-grid video-rating-with-caps">
<div>
<button class="master-sprite ratingCapsVS-left" title=""></button>
<button class="master-sprite ratingCapsVS ratingCapsVS-5.0" title="5.0"></button>
<button class="master-sprite ratingCapsVS-right" title=""></button>
</div>
</span>
</div>
</div>
<div class="video-clear-list-left"></div>
</div>
</div>`;
			}
		}
	}
}