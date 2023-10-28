export default {
	Main: (data) => {
		return `<div id="content">
<div id="branded-page-default-bg" class="ytg-base">
<div id="branded-page-body-container" class="ytg-base clearfix">
${document.cosmicCat.Template.Playlist.Header(data)}
${document.cosmicCat.Template.Playlist.Content(data)}
</div>
</div>
</div>`;
	},
	Header: (data) => {
		return `<div id="branded-page-header-container" class="ytg-wide">
<div id="branded-page-header" class="ytg-wide ytg-box">
<a class="profile-thumb" href="${data.header.owner.url}">
<span class="video-thumb ux-thumb yt-thumb-square-77">
<span class="yt-thumb-clip">
<span class="yt-thumb-clip-inner">
<img src="${data.content[0].thumbnail}" alt="Thumbnail" width="77"><span class="vertical-align"></span>
</span>
</span>
</span>
</a>
<div class="ytg-box">
<div class="playlist-info">
<div class="header-right">
<div class="header-stats ytg-box">
<ul>
<li class="stat-entry first">
<span class="stat-value">${data.header.videos?.text?.split(" ")?.[0]}</span>
<span class="stat-name">videos</span>
</li>
<li class="stat-entry">
<span class="stat-value">${data.header.views}</span>
<span class="stat-name">views</span>
</li>
</ul>
</div>
</div>
<div class="playlist-reference">
<h1 title="${data.header.title}">${data.header.title}</h1>
${data.creatorInfo?.id ? `
<p class="channel-author-attribution">
${localizeString("playlists.header.channelAuthor", data.header?.owner)}
</p>
` : ""}
</div>
<span id="play-all-button">
<a class="yt-playall-link yt-playall-link-dark yt-uix-sessionlink" href="https://www.youtube.com/watch?v=${data.content[0].id}&list=${data.header.id}" data-sessionlink="el">
<img class="small-arrow" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="">Play all
</a>
</span>
</div>
</div>
</div>
</div>`;
	},
	Content: (data) => {
		return `<div id="branded-page-body">
<div id="playlist-pane-container">
${document.cosmicCat.Template.Playlist.primaryPane.Main(data)}
${document.cosmicCat.Template.Playlist.secondaryPane.Main(data)}
</div>
</div>`;
	},
	primaryPane: {
		Main: (data) => {
			return `<div class="primary-pane">
<div class="playlist-landing ypc-list-container">
<div id="playlist-actions">
<div id="playlist-action-buttons">
<div id="playlist-likes-container">
<div class="playlist-sparkbars">
<div class="playlist-sparkbar-likes" style="width: 0%"></div>
<div class="playlist-sparkbar-dislikes" style="width: 0%"></div>
</div>
<span class="playlist-likes-dislikes">
<span class="likes">0</span> likes, <span class="dislikes">0</span> dislikes
</span>
</div>
${document.cosmicCat.Template.Buttons.LikeDis(data)}
<button type="button" class="playlist-share yt-uix-button yt-uix-button-default yt-uix-tooltip" onclick=";return false;" title="Share or embed this playlist" data-button-toggle="true" data-button-action="yt.www.playlist.share" role="button"><span class="yt-uix-button-content">Share </span></button>
<img src="//s.ytimg.com/yts/img/playlist/playlist-hangout-icon-vflZSwp9g.png" alt="Google Hangout" class="playlist-hangout-button" title="Watch with your friends.">
</div>
<div id="playlist-share-container" class="playlist-share-area hid">
</div>
<div id="playlist-share-loading" class="playlist-share-area hid">${localizeString("global.loading.main")}</div>
<div id="playlist-likes-signin-container" class="playlist-share-area hid">
<div class="yt-alert yt-alert-naked yt-alert-warn">
<div class="yt-alert-icon">
<img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" class="icon master-sprite" alt="Alert icon">
</div>
<div class="yt-alert-content" role="alert">
<span class="yt-alert-vertical-trick"></span>
<div class="yt-alert-message">
<strong>
<a href="${document.cosmicCat.data.loginUrl}">Sign in</a> or <a href="https://www.youtube.com/signup">sign up</a> now!
</strong>
</div>
</div>
</div>
</div>
</div>
<ol>

</ol>
</div>
</div>`;
		},
		listItem: {
			video: (data, id, i) => {
				return `<li class="playlist-video-item odd annotated">
<div class="yt-uix-tile playlist-video-item-base-content">
<span class="video-index">${i}</span>
<div class="thumb-container">
<div class="ux-thumb-wrap">
<span class="video-thumb ux-thumb yt-thumb-default-124">
<span class="yt-thumb-clip">
<span class="yt-thumb-clip-inner">
<img src="${data.thumbnail}" alt="Thumbnail" data-thumb="${data.thumbnail}" data-group-key="thumb-group-27" width="124"><span class="vertical-align"></span>
</span>
</span>
</span>
<span class="video-time">${data.time}</span>
${document.cosmicCat.Template.Buttons.addTo(data.id)}
</div>
</div>
<div class="video-info">
<div class="video-buttons">
</div>
<div class="video-overview">
<h3 class="video-title-container">
<a href="https://www.youtube.com/watch?v=${data.id}&list=${id}&index=${i}&amp;feature=plpp_video" class="yt-uix-tile-link">
<span class="title video-title yt-uix-tooltip" title="${data.title}" dir="ltr">${data.title}</span>
</a>
</h3>
<p class="video-details">
<span class="video-owner">
${localizeString("playlists.body.primaryPane.items.video.by", data?.owner?.name)}
</span>
<span class="video-view-count">${data.views}</span>
</p>
</div>
</div>
</div>
</li>`;
			}
		}
	},
	secondaryPane: {
		Main: (data) => {
			return `<div class="secondary-pane">
<div class="channel-module">
<h2>${localizeString("playlists.body.secondaryPane.aboutSection.about", data.header?.name || data.header?.title)}</h2>
<p>${data.header.description}</p>
</div>
<hr class="yt-horizontal-rule">
${data.creatorInfo?.id ? document.cosmicCat.Template.Playlist.secondaryPane.aboutSection(data) : ""}
</div>`;
		},
		aboutSection: (data) => {
			return `<div class="channel-module">
<div class="playlist-creator-info">
<h2>${localizeString("playlists.body.secondaryPane.aboutSection.about", data.creatorInfo?.name || data.creatorInfo?.title)}</h2>
<p>${data.creatorInfo?.fields?.description}</p>
<div class="creator-links">
<a href="https://www.youtube.com/channel/${data.creatorInfo.id}/playlists">${localizeString("playlists.body.secondaryPane.aboutSection.creatorLinks.playlists", data?.creatorInfo?.name)}</a>
<a href="https://www.youtube.com/channel/${data.creatorInfo.id}/videos">${localizeString("playlists.body.secondaryPane.aboutSection.creatorLinks.videos")}</a>
</div>
<div class="creator-stats">
<p>${data.creatorInfo?.fields?.views} views</p>
<p>${data.creatorInfo?.subs} subscribers</p>
</div>
<div class="enable-fancy-subscribe-button">
${document.cosmicCat.Template.Buttons.Subscribe(data.creatorInfo?.id)}
</span>
</div>
<div class="yt-horizontal-rule"><span class="first"></span><span class="second"></span><span class="third"></span></div>
</div>`;
		}
	}
};