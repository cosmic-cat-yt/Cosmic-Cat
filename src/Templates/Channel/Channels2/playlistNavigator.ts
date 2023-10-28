export default {
	Main: (data) => {
		return `<div id="user_playlist_navigator" class="outer-box yt-rounded">
${document.cosmicCat.Template.Channel.Channels2.playlistNavigator.Header(data.header)}
<div id="subscribeMessage" class="hid">&nbsp;</div>
<div id="subscription-button-module-menu" class="hid subscription-menu-expandable subscription-menu">
<div class="subscription-menu-not-logged-in">
<strong>
<a href="${document.cosmicCat.data.loginUrl}">Sign in</a> or <a href="https://www.youtube.com/signup">sign up</a> now!
</strong>
</div>
</div>
<div id="user_playlist_navigator-messages" class="hid"></div>
${document.cosmicCat.Template.Channel.Channels2.playlistNavigator.Content.Main(data)}`;
	},
	Header: (data) => {
		return `<div id="playnav-channel-header" class="inner-box-bg-color">
<div id="playnav-title-bar">
<div id="playnav-channel-name" class="outer-box-bg-color">
<div class="channel-thumb-holder outer-box-color-as-border-color">
<div class="user-thumb-semismall ">
<div>
<img src="${data.avatar}">
</div>
</div>
</div>
<div class="channel-title-container">
<div class="channel-title outer-box-color" id="channel_title" dir="ltr">${data.name}</div>
<div class="channel-title outer-box-color" style="font-size:11px" id="channel_base_title">${data.tag}'s Channel</div>
</div>
<div id="subscribe-buttons">
${document.cosmicCat.Template.Buttons.Subscribe(data.id)}
</div>
</div>
<div id="playnav-chevron">&nbsp;</div>
</div>
<div id="playnav-navbar">
<table>
<tbody>
<tr>
<td>
<a class="navbar-tab inner-box-link-color ${document.cosmicCat.Channels.isCurrentChannelTab("videos") ? "navbar-tab-selected" : ""}" id="playnav-navbar-tab-uploads" href="javascript:;" onclick="document.cosmicCat.Channels.playnav.selectTab('videos', this);">Uploads</a>
</td>
<td>
<a class="navbar-tab inner-box-link-color ${document.cosmicCat.Channels.isCurrentChannelTab("playlists") ? "navbar-tab-selected" : ""}" id="playnav-navbar-tab-playlists" href="javascript:;" onclick="document.cosmicCat.Channels.playnav.selectTab('playlists', this);">Playlists</a>
</td>
</tr>
</tbody>
</table>
</div>
<div class="cb"></div>
</div>
`;
	},
	Content: {
		Main: (data) => {
			return `<div id="playnav-body" style="height: auto;">
<div id="playnav-player" class="playnav-player-container" style="height: 390px; visibility: visible; left: 0px;">
<div id="player-api"></div><div id="watch-player" class="player-root"></div>
</div>
<div id="playnav-playview" class="" style="display: block;">
${document.cosmicCat.Template.Channel.Channels2.playlistNavigator.Content.Restricted(data)}
${document.cosmicCat.Template.Channel.Channels2.playlistNavigator.Content.LeftPanel.Main(data)}
${document.cosmicCat.Template.Channel.Channels2.playlistNavigator.Content.PlayPanel.Main(data)}
${document.cosmicCat.Template.Channel.Channels2.playlistNavigator.Content.Loading()}
</div>
</div>`;
		},
		Restricted: (data) => {
			return `<div id="playnav-player-restricted" class="inner-box-colors" style="display: none;">
<div id="playnav-inner-restricted">
<div id="playnav-restricted-title-div"><h3 id="playnav-restricted-title"></h3></div>
<div id="playnav-login-required" class="playnav-restricted-msg">
<p>You must be <a class="playnav-restricted-link" href="">logged in</a> to view this video.</p>
</div>
<div id="playnav-controversy" class="playnav-restricted-msg">
<p>The following content has been identified by the YouTube community as being potentially offensive or inappropriate. Viewer discretion is advised.
Please <a class="playnav-restricted-link" href="">confirm</a> that you wish to view this video.</p>
</div>
<div id="playnav-verify-age-for-age-gated" class="playnav-restricted-msg">
<p>This video or group may contain content that is inappropriate for some users, <a href="https://www.google.com/support/youtube/bin/answer.py?answer=186529" target="_blank">as determined by the video uploader.</a>
To view this video or group, please <a class="playnav-restricted-link" href="">click here</a> to sign in or sign up and verify that you are of the appropriate age.</p>
</div>
<div id="playnav-verify-age" class="playnav-restricted-msg">
<p>This video requires that you log in to verify your age.
Please <a class="playnav-restricted-link" href="">confirm</a> that you wish to view this video.</p>
</div>
<div id="playnav-unavailable" class="playnav-restricted-msg">
<p>This video is unavailable.</p>
</div>
<div id="playnav-custom-error-message" class="playnav-restricted-msg"></div>
</div>
</div>`;
		},
		LeftPanel: {
			Main: (data) => {
				return `<div id="playnav-left-panel" style="display: block;">
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
<div class="playnav-panel-tab-icon" id="panel-icon-info" onmouseover="_addclass(_gel('playnav-panel-tab-info'), 'panel-tab-hovered')" onmouseout="_removeclass(_gel('playnav-panel-tab-info'), 'panel-tab-hovered')" onclick="playnav.selectPanel('info')"></div>
<div class="playnav-bottom-link" id="info-bottom-link">
<a href="javascript:;" onmouseover="_addclass(_gel('playnav-panel-tab-info'), 'panel-tab-hovered')" onmouseout="_removeclass(_gel('playnav-panel-tab-info'), 'panel-tab-hovered')" onclick="playnav.selectPanel('info')">Info</a>
</div>
<div class="spacer">&nbsp;</div>
</td>
</tr>
<tr>
<td class="panel-tab-indicator-cell inner-box-opacity">
<div class="panel-tab-indicator-arrow"></div>
</td>
</tr>
</tbody>
</table>
</td>
<td id="playnav-panel-tab-favorite">
<table class="panel-tabs">
<tbody>
<tr>
<td class="panel-tab-title-cell">
<div class="playnav-panel-tab-icon" id="panel-icon-favorite" onmouseover="_addclass(_gel('playnav-panel-tab-favorite'), 'panel-tab-hovered')" onmouseout="_removeclass(_gel('playnav-panel-tab-favorite'), 'panel-tab-hovered')" onclick="playnav.selectPanel('favorite')"></div>
<div class="playnav-bottom-link" id="favorite-bottom-link">
<a href="javascript:;" onmouseover="_addclass(_gel('playnav-panel-tab-favorite'), 'panel-tab-hovered')" onmouseout="_removeclass(_gel('playnav-panel-tab-favorite'), 'panel-tab-hovered')" onclick="playnav.selectPanel('favorite')">Favorite</a>
</div>
<div class="spacer">&nbsp;</div>
</td>
</tr>
<tr>
<td class="panel-tab-indicator-cell inner-box-opacity">
<div class="panel-tab-indicator-arrow"></div>
</td>
</tr>
</tbody>
</table>
</td>
<td id="playnav-panel-tab-share">
<table class="panel-tabs">
<tbody>
<tr>
<td class="panel-tab-title-cell">
<div class="playnav-panel-tab-icon" id="panel-icon-share" onmouseover="_addclass(_gel('playnav-panel-tab-share'), 'panel-tab-hovered')" onmouseout="_removeclass(_gel('playnav-panel-tab-share'), 'panel-tab-hovered')" onclick="playnav.selectPanel('share')"></div>
<div class="playnav-bottom-link" id="share-bottom-link">
<a href="javascript:;" onmouseover="_addclass(_gel('playnav-panel-tab-share'), 'panel-tab-hovered')" onmouseout="_removeclass(_gel('playnav-panel-tab-share'), 'panel-tab-hovered')" onclick="playnav.selectPanel('share')">Share</a>
</div>
<div class="spacer">&nbsp;</div>
</td>
</tr>
<tr>
<td class="panel-tab-indicator-cell inner-box-opacity">
<div class="panel-tab-indicator-arrow"></div>
</td>
</tr>
</tbody>
</table>
</td>
<td id="playnav-panel-tab-flag">
<table class="panel-tabs">
<tbody>
<tr>
<td class="panel-tab-title-cell">
<div class="playnav-panel-tab-icon" id="panel-icon-flag" onmouseover="_addclass(_gel('playnav-panel-tab-flag'), 'panel-tab-hovered')" onmouseout="_removeclass(_gel('playnav-panel-tab-flag'), 'panel-tab-hovered')" onclick="playnav.selectPanel('flag')"></div>
<div class="playnav-bottom-link" id="flag-bottom-link">
<a href="javascript:;" onmouseover="_addclass(_gel('playnav-panel-tab-flag'), 'panel-tab-hovered')" onmouseout="_removeclass(_gel('playnav-panel-tab-flag'), 'panel-tab-hovered')" onclick="playnav.selectPanel('flag')">Flag</a>
</div>
<div class="spacer">&nbsp;</div>
</td>
</tr>
<tr>
<td class="panel-tab-indicator-cell inner-box-opacity">
<div class="panel-tab-indicator-arrow"></div>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</div>
<div class="cb"></div>
<div class="playnav-video-panel inner-box-colors border-box-sizing">
<div id="playnav-video-panel-inner" class="playnav-video-panel-inner border-box-sizing" style="overflow: auto;">
</div>
<div id="playnav-panel-comments" class="hid"></div>
<div id="playnav-panel-favorite" class="hid"></div>
<div id="playnav-panel-share" class="hid scrollable"></div>
<div id="playnav-panel-playlists" class="hid"></div>
<div id="playnav-panel-flag" class="hid scrollable"></div>
</div>
</div>
</div>
</div>`;
		},
			Info: (data, owner) => {
				return `<div id="playnav-panel-info" class="scrollable" style="display: block;">
<div id="channel-like-action">
<div id="channel-like-buttons">
<button class=" yt-uix-button yt-uix-tooltip" type="button" id="watch-like" onclick=";return false;" title="I like this" data-button-action="playnav.like" role="button">
<img class="yt-uix-button-icon yt-uix-button-icon-watch-like" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="I like this">
<span class="yt-uix-button-content">Like </span>
</button>
&nbsp;
<button class=" yt-uix-button yt-uix-tooltip yt-uix-button-empty" type="button" id="watch-unlike" onclick=";return false;" title="I dislike this" data-button-action="playnav.unlike" role="button">
<img class="yt-uix-button-icon yt-uix-button-icon-watch-unlike" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="I dislike this"></button>
</div>
<form method="post" action="//www.youtube.com/watch_actions_Ajax" name="likeForm" class="hid">
<input type="hidden" name="action_like_video" value="1">
<input type="hidden" name="video_id" value="${data.id}">
<input name="session_token" type="hidden" value="jk7H8NNcOfnfqH-6En0oRy0yffx8MTMyNzU5Njg5NEAxMzI3NTEwNDk0"></form>
<form method="post" action="//www.youtube.com/watch_actions_Ajax" name="unlikeForm" class="hid">
<input type="hidden" name="action_dislike_video" value="1">
<input type="hidden" name="video_id" value="${data.id}">
<input name="session_token" type="hidden" value="jk7H8NNcOfnfqH-6En0oRy0yffx8MTMyNzU5Njg5NEAxMzI3NTEwNDk0"></form>
<div id="channel-like-logged-out" class="hid">
<strong>
<a href="${document.cosmicCat.data.loginUrl}">Sign in</a> or <a href="https://www.youtube.com/signup">sign up</a> now!
</strong>
</div>
<div id="channel-like-close" class="hid">
<div class="close">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" class="close-button" onclick="playnav.hideLike();"></div>
</div>
</div>
<div id="playnav-curvideo-title" class="inner-box-link-color" dir="ltr">
<a href="https://www.youtube.com/watch?v=${data.id}&amp;feature=channel_video_title">${data.title}</a>
</div>
<div id="playnav-curvideo-info-line">From:
<span id="playnav-curvideo-channel-name">
<a href="https://www.youtube.com${owner.url}" class="yt-user-name" dir="ltr">${owner.name}</a>
</span>| <span dir="ltr">${data.upload}</span>&nbsp;| <span id="playnav-curvideo-view-count">${data.views}</span>
</div>
<div class="cb"></div>
<div id="channel-like-result" class="hid">
<div id="watch-actions-area" class="yt-rounded">&nbsp;</div>
</div>
<div id="channel-like-loading" class="hid">${localizeString("global.loading.main")}</div>
<div class="cb"></div>
<div id="playnav-curvideo-description-container">
<div id="playnav-curvideo-description" dir="ltr">
${data.description}
<div id="playnav-curvideo-description-more-holder" style="display: block;">
<div id="playnav-curvideo-description-more" class="inner-box-bg-color">
...&nbsp;<a class="channel-cmd" href="javascript:;" onclick="document.cosmicCat.Channels.playnav.toggleFullVideoDescription(true)">(more info)</a>&nbsp;&nbsp;
</div>
<div class="cb"></div>
</div>
<span id="playnav-curvideo-description-less">
<a href="javascript:;" class="channel-cmd" onclick="document.cosmicCat.Channels.playnav.toggleFullVideoDescription(false)">(less info)</a>
</span>
</div>
</div>
<a href="https://www.youtube.com/watch?v=${data.id}" id="playnav-watch-link" onclick="playnav.goToWatchPage()">View comments, related videos, and more</a>
<div id="playnav-curvideo-controls"></div>
<div class="cb"></div>
<script>
if (_gel('playnav-curvideo-description').offsetHeight > 28) {
_gel('playnav-curvideo-description-more-holder').style.display = 'block';
}
</script>
</div>`;
			}
		},
		PlayPanel: {
			Main: (data) => {
				return `<div id="playnav-play-panel">
<div id="playnav-play-content" style="height: 601px;">
${document.cosmicCat.Template.Channel.Channels2.playlistNavigator.Content.PlayPanel.Holder.Main()}
</div>
</div>`;
			},
			Holder: {
				Main: () => {
					const chk = (window.location.hash == "#p/p" ? "playlists" : "uploads");
					return `<div class="playnav-playlist-holder" id="playnav-play-playlist-${chk}-holder" style="display: block;">
<div id="playnav-play-${chk}-scrollbox" class="scrollbox-wrapper inner-box-colors">
<div class="scrollbox-content playnav-playlist-non-all">
<div class="scrollbox-body" style="height: 585px;">
<div class="outer-scrollbox">
<div id="playnav-play-${chk}-items" class="inner-scrollbox">
<div id="playnav-play-${chk}-page-0" class="scrollbox-page loaded ${chk}-rows-50">
</div>
</div>
</div>
</div>
</div>
</div>
</div>`;
				},
				videos: (data) => {
					return `<div id="playnav-video-play-uploads-6-${data.id}" class="playnav-item playnav-video">
<div style="display:none" class="encryptedVideoId">${data.id}</div>
<div id="playnav-video-play-uploads-6-${data.id}-selector" class="selector"></div>
<div class="content">
<div class="playnav-video-thumb">
<a href="https://www.youtube.com/watch?v=${data.id}" class="ux-thumb-wrap contains-addto">
<span class="video-thumb ux-thumb-96">
<span class="clip">
<img src="//i.ytimg.com/vi/${data.id}/hqdefault.jpg" alt="Thumbnail" class="" onclick="playnav.playVideo('uploads','6','${data.id}');return false;" title="${data.title}">
</span>
</span>
<span class="video-time">${data.time}</span>
${document.cosmicCat.Template.Buttons.addTo(data.id)}
</a>
</div>
<div class="playnav-video-info">
<a href="https://www.youtube.com/watch?v=${data.id}" class="playnav-item-title ellipsis" onclick="playnav.playVideo('uploads','6','${data.id}');return false;" id="playnav-video-title-play-uploads-6-${data.id}">
<span dir="ltr">${data.title}</span>
</a>
<div class="metadata">
<span dir="ltr">${data.views} - ${data.upload}</span>
</div>
<div style="display:none" id="playnav-video-play-uploads-6">${data.id}</div>
</div>
</div>
</div>`;
				},
				playlists: (data) => {
					return `<div class="playnav-item playnav-playlist">
<div style="display:none" class="encryptedPlaylistId">${data.id}</div>
<div class="selector"></div>
<div class="content">
<div class="playnav-playlist-thumb">
<div class="vCluster120WideEntry">
<div class="vCluster120WrapperOuter">
<div class="vCluster120WrapperInner">
<a id="video-url-${data.id}" href="javascript:;" rel="nofollow" onclick="playnav.selectPlaylist('user', '${data.id}')">
<img title="" src="${data.thumbnail}" class="vimgCluster120" alt="">
<span class="video-corner-text" id="video-corner-text-${data.id}">${data.videos.text}</span>
</a>
</div>
</div>
</div>
</div>
<div class="playnav-playlist-info">
<a href="javascript:;" class="playnav-item-title ellipsis" onclick="playnav.selectPlaylist('user', '${data.id}')" dir="ltr">${data.title}</a>
<div class="metadata">
${data.updated}<br>
<a href="javascript:;" onclick="playnav.selectPlaylist('user', '${data.id}')" class="more-info">more info</a>
</div>
</div>
<div class="cb"></div>
</div>
</div>`;
				}
			}
		},
		Loading: () => {
			return `<div id="playnav-play-loading" class="loading" style="display: block">
<div class="cover outer-box-bg-color"></div>
<div class="image-holder">
<div class="image-holder-middle">
<div class="image-holder-inner">
<img src="//s.ytimg.com/yt/img/icn_loading_animated-vflff1Mjj.gif" alt="${localizeString("global.loading.main")}">
</div>
</div>
</div>
</div>`;
		}
	}
}