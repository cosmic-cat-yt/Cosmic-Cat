export default {
	Main: (data) => {
		return `<div class="primary-pane">
	<div class="channel-browse">
	<div class="browse-heading channels-browse-gutter-padding">
	<div id="channels-browse-header" class="clearfix">
	<div id="browse-view-options">
	<button type="button" class="flip channels-browse-options yt-uix-button yt-uix-button-text" onclick=";return false;" data-button-menu-id="browse-view-options-menu" role="button" aria-pressed="false" aria-expanded="false">
	<span class="yt-uix-button-content">View </span><img class="yt-uix-button-arrow" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="">
	</button>
	<div id="browse-view-options-menu" class="channel-nav-item-dropdown yt-uix-button-menu yt-uix-button-menu-external hid" style="min-width: 69px; left: 605.833px; top: 313.5px; display: none;">
	</div>
	</div>
	<ul>
	${document.cosmicCat.Utils.browseTabs.find(ytInitialData, "videos")?.tabRenderer ? `
	<li class="channels-browse-filter ${document.cosmicCat.Channels.isCurrentChannelTab("videos") ? "selected" : ""}">
	<a href="./videos">Uploads</a>
	</li>
	` : ""}
	${document.cosmicCat.Utils.browseTabs.find(ytInitialData, "playlists")?.tabRenderer ? `
	<li class="channels-browse-filter ${document.cosmicCat.Channels.isCurrentChannelTab("playlists") ? "selected" : ""}">
	<a href="./playlists">Playlists</a>
	</li>
	` : ""}
	${document.cosmicCat.Utils.browseTabs.find(ytInitialData, "community")?.tabRenderer ? `
	<li class="channels-browse-filter ${document.cosmicCat.Channels.isCurrentChannelTab("community") ? "selected" : ""}">
	<a href="./community">Feed</a>
	</li>
	` : ""}
	</ul>
	</div>
	<div id="channel-feed-post-form">
	</div>
	<div class="yt-horizontal-rule channel-section-hr"><span class="first"></span><span class="second"></span><span class="third"></span></div>
	</div>
	<ul class="channels-browse-content-grid clearfix channels-browse-gutter-padding context-data-container">
	</ul>
	<div class="channels-browse-gutter-padding"></div>
	</div>
	</div>`;
	},
	Navigation: () => {
		return `<div class="yt-uix-pager" role="navigation">
	<a class="yt-uix-button yt-uix-sessionlink yt-uix-pager-page-num yt-uix-pager-button yt-uix-button-toggled yt-uix-button-default" data-page="1" aria-label="Go to page 1" data-sessionlink="ei=CPyLrL_cnbICFRgJIQod5QyJsA%3D%3D">
	<span class="yt-uix-button-content">1</span></a>&nbsp;
	<a class="yt-uix-button yt-uix-sessionlink yt-uix-pager-next yt-uix-pager-button yt-uix-button-default" data-page="2" id="next-btn" onclick="document.cosmicCat.Channels.Channels3.Pagination.next(this.getAttribute('data-token'), this.getAttribute('data-page'))" data-sessionlink="ei=CPyLrL_cnbICFRgJIQod5QyJsA%3D%3D">
	<span class="yt-uix-button-content">Next »</span></a>
	</div>`;
	},
	activityFeed: () => {
		return `<div class="activity-feed">
	<div class="feed-list-container context-data-container">
	<div class="feed-item-list">
	<ul></ul>
	<button type="button" class="yt-uix-load-more load-more-button yt-uix-button yt-uix-button-default" onclick=";return false;" data-uix-load-more-href="/channel_ajax?action_load_more_feed_items=1&amp;activity_view=1&amp;channel_id=UCBR8-60-B28hp2BmDPdntcQ&amp;paging=1352838391" role="button"><span class="yt-uix-button-content">Load More </span></button>
	</div>
	</div>
	</div>`;
	},
	listItem: {
		videos: (data) => {
			return `<li class="channels-content-item">
	<span class="context-data-item" data-context-item-title="${data.title}" data-context-item-type="video" data-context-item-time="${data.time}" data-context-item-user="" data-context-item-id="${data.id}" data-context-item-views="${data.views}">
	<a href="https://www.youtube.com/watch?v=${data.id}" class="ux-thumb-wrap yt-uix-sessionlink yt-uix-contextlink contains-addto spf-link" data-sessionlink="ei">
	<span class="video-thumb ux-thumb yt-thumb-default-194">
	<span class="yt-thumb-clip">
	<span class="yt-thumb-clip-inner">
	<img src="${data.thumbnail}" alt="Thumbnail" width="194"><span class="vertical-align"></span>
	</span>
	</span>
	</span>
	<span class="video-time">${data.time}</span>
	${document.cosmicCat.Template.Buttons.addTo(data.id)}
	</a>
	<a href="https://www.youtube.com/watch?v=${data.id}" title="${data.title}" class="content-item-title spf-link yt-uix-sessionlink yt-uix-contextlink" dir="ltr" data-sessionlink="ei">${data.title}</a>
	<span class="content-item-detail">
	<span class="content-item-view-count">${data.views}</span><span class="metadata-separator">|</span><span class="content-item-time-created">${data.upload}</span>
	</span>
	</span>
	</li>`;
		},
		sidethumb: (data) => {
			return `<span class="sidethumb">
	<span class="video-thumb ux-thumb yt-thumb-default-43">
	<span class="yt-thumb-clip">
	<span class="yt-thumb-clip-inner">
	<img src="${data.thumbnails[0].url}" alt="Thumbnail" data-thumb="${data.thumbnails[0].url}" data-group-key="thumb-group-0" width="43"><span class="vertical-align"></span>
	</span>
	</span>
	</span>
	</span>`;
		},
		playlists: (data) => {
			let sideThumbs = "";
			try {
				for (let i = 0; i < data.sidethumbs.length; i++) {
					sideThumbs += document.cosmicCat.Template.Channel.Channels3.primaryPane.browseVideos.listItem.sidethumb(data.sidethumbs[i]);
				}
			} catch {}
			return `<li class="channels-content-item">
	<span class="context-data-item" data-context-item-title="${data.title}" data-context-item-count="8 videos" data-context-item-id="PLbpi6ZahtOH5-VjZPSkqc0JI118RXAcGU" data-context-item-type="playlist" data-context-item-videos="[&quot;SNc7vYXqtVg&quot;, &quot;T7SwehyOh3c&quot;, &quot;IQG-xM62tQg&quot;, &quot;c8DaqgMPrmQ&quot;, &quot;f4LhCv7RY4E&quot;]">
	<a href="${data.url}" class="yt-pl-thumb-link yt-uix-contextlink yt-uix-sessionlink" data-sessionlink="ei">
	<span class="yt-pl-thumb">
	<span class="video-thumb ux-thumb yt-thumb-default-194">
	<span class="yt-thumb-clip">
	<span class="yt-thumb-clip-inner">
	<img src="${data.thumbnail}" alt="Thumbnail" data-thumb="${data.thumbnail}" data-group-key="thumb-group-0" width="194"><span class="vertical-align"></span>
	</span>
	</span>
	</span>
	<span class="sidebar sidebar-height-109">
	<span class="video-count-wrapper">
	<span class="video-count-block">
	<span class="count-label">${data.videos.totalNumber}</span>
	<span class="text-label">videos</span>
	</span>
	</span>
	<span class="side-thumbs">
	${sideThumbs}
	</span>
	</span>
	<span class="yt-pl-thumb-overlay">
	<span class="yt-pl-thumb-overlay-content">
	<img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="">Play all
	</span>
	</span>
	</span>
	</a>
	<span class="content-item-detail">
	<a class="content-item-title" href="https://www.youtube.com/playlist?list=${data.id}" dir="ltr">${data.title}</a>
	<span class="content-item-view-count">${data.videos.text}</span>
	<span class="metadata-separator">|</span>
	<span class="content-item-time-created">${data.updated}</span>
	</span>
	</span>
	</li>`;
		},
		community: (data) => {
			return `<li>
	<div class="feed-item-container channels-browse-gutter-padding" data-channel-key="${data.owner.id}">
	<div class="feed-author-bubble-container">
	<a href="https://www.youtube.com${data.owner.url}" class="feed-author-bubble">
	<span class="feed-item-author">
	<span class="video-thumb ux-thumb yt-thumb-square-28">
	<span class="yt-thumb-clip">
	<span class="yt-thumb-clip-inner">
	<img src="${data.owner.icon}" alt="" data-thumb="${data.owner.icon}" data-group-key="thumb-group-0" width="28"><span class="vertical-align"></span>
	</span>
	</span>
	</span>
	</span>
	</a>
	</div>
	<div class="feed-item-main">
	<div class="feed-item-header">
	<span class="feed-item-actions-line">
	<span class="feed-item-owner">
	<a href="https://www.youtube.com${data.owner.url}?feature=plcp" class="yt-user-name">${data.owner.name}</a></span> posted
	<span class="feed-item-time">${data.upload}</span>
	<div class="feed-item-post">
	<p>${data.description}</p>
	</div>
	</span>
	</div>
	</div>
	</div>
	<div class="feed-item-dismissal-notices">
	<div class="feed-item-dismissal feed-item-dismissal-hide hid">This item has been hidden</div>
	<div class="feed-item-dismissal feed-item-dismissal-uploads hid">In the future you will only see uploads from <span class="feed-item-owner"><a href="https://www.youtube.com${data.owner.url}?feature=plcp" class="yt-user-name">${data.owner.name}</a></span></div>
	<div class="feed-item-dismissal feed-item-dismissal-all-activity hid">In the future you will see all activity from <span class="feed-item-owner"><a href="https://www.youtube.com${data.owner.url}?feature=plcp" class="yt-user-name">${data.owner.name}</a></span></div>
	<div class="feed-item-dismissal feed-item-dismissal-unsubscribe hid">You have been unsubscribed from <span class="feed-item-owner"><a href="https://www.youtube.com${data.owner.url}?feature=plcp" class="yt-user-name">${data.owner.name}</a></span></div>
	</div>
	</li>`;
		}
	}
};