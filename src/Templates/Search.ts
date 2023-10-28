export default {
	Main: (searchpar) => {
		return `<div id="content">
<div id="search-header" class="yt-uix-expander yt-uix-expander-collapsed">
<h2>Search results for <strong class="query"><span class="search-title-lego">${searchpar}</span></strong></h2>
<div class="filter-top">
<button type="button" class="filter-button yt-uix-expander-head yt-uix-button yt-uix-button-default" onclick=";return false;" data-button-toggle="true" data-button-menu-id="some-nonexistent-menu" data-button-action="" role="button">
<span class="yt-uix-button-content">Filters </span>
<img class="yt-uix-button-arrow" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="">
</button>
<ul class="filter-crumb-list"></ul>
<p class="num-results">About <strong>${ytInitialData.estimatedResults.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</strong> results</p>
<br class="clear">
</div>
<div id="filter-dropdown" class="yt-uix-expander-body"></div>
<div class="yt-horizontal-rule"><span class="first"></span><span class="second"></span><span class="third"></span></div>
</div>
<div id="search-base-div">
<div id="search-main" class="ytg-4col new-snippets">
<div id="results-main-content">
<ol id="search-results" class="result-list context-data-container"></ol>
</div>
</div>
</div>
<div id="search-footer-box" class="searchFooterBox">
<div class="yt-uix-pager" role="navigation">
<a href="/web/20121031234035/http://www.youtube.com/results?page=1" class="yt-uix-button yt-uix-sessionlink yt-uix-pager-button yt-uix-button-toggled yt-uix-button-default" data-sessionlink="" data-page="1" aria-label="Go to page 1">
<span class="yt-uix-button-content">1</span>
</a>
<a class="yt-uix-button yt-uix-sessionlink yt-uix-pager-button yt-uix-button-default" id="next-btn" data-sessionlink="" onclick="document.cosmicCat.Search.next(this.getAttribute('data-token'), this.getAttribute('data-page'))" data-token="${ytInitialData.contents.twoColumnSearchResultsRenderer?.primaryContents?.sectionListRenderer?.contents?.[1]?.continuationItemRenderer?.continuationEndpoint?.continuationCommand?.token}" data-page="2">
<span class="yt-uix-button-content">Next »</span>
</a>
</div>
</div>
</div>`;
	},
	dropdownFilter: {
		Main: (a, b, temC) => {
			return `<div class="filter-col">
<h4 class="filter-col-title">${a[b].searchFilterGroupRenderer.title.simpleText}</h4>
<ul>
${temC}
</ul>
</div>
`;
		},
		Con: (data, b, searchpar) => {
			return `<li class="filter">
${data && `<a class="filter-text filter-content" title="Search for last hour" href="https://www.youtube.com/results?search_query=${searchpar}&sp=${data}">${b}</a>` || `<span class="filter-content filter-selected">${b}</span>`}
</li>`;
		}
	},
	videoRender: (videoData) => {
		let badges = "";
		for (let i = 0; i < videoData.badges.length; i++) {
			badges += `<li><a class="yt-badge-std">${videoData.badges[i].metadataBadgeRenderer.label}</a></li>`;
		}
		badges = (videoData.badges.length > 0) ? '<ul class="single-line-lego-list">' + badges + "</ul>" : "";
		return `<li class="yt-grid-box result-item-video context-data-item" data-context-item-title="${videoData.title}" data-context-item-type="video" data-context-item-time="${videoData.time}" data-context-item-user="${videoData}" data-context-item-id="${videoData.id}" data-context-item-views="${videoData.views}">
<div id="" class="yt-uix-tile yt-lockup-list yt-tile-default yt-grid-box">
<div class="yt-lockup-thumbnail">
<a href="https://www.youtube.com/watch?v=${videoData.id}" class="ux-thumb-wrap yt-uix-sessionlink yt-uix-contextlink contains-addto result-item-thumb">
<span class="video-thumb ux-thumb yt-thumb-default-185">
<span class="yt-thumb-clip">
<span class="yt-thumb-clip-inner">
<img src="//i3.ytimg.com/vi/${videoData.id}/mqdefault.jpg" alt="Thumbnail" width="185"><span class="vertical-align"></span>
</span>
</span>
</span>
<span class="video-time">${videoData.time}</span>
${document.cosmicCat.Template.Buttons.addTo(videoData.id)}
</a>
</div>
<div class="yt-lockup-content">
<h3>
<a class="yt-uix-contextlink yt-uix-sessionlink yt-uix-tile-link result-item-translation-title" dir="ltr" title="${videoData.title}" href="https://www.youtube.com/watch?v=${videoData.id}">${videoData.title}</a>
</h3>
<p class="description" dir="ltr">${videoData.description}</p>
<div class="yt-lockup-meta">
${badges}
<p class="facets">
<span class="date-added">${videoData.upload}</span>
<span class="metadata-separator">•</span>
<span class="viewcount">${videoData.views}</span>
</p>
<p><span class="username-prepend">${localizeString("watch.by", videoData?.owner?.name)}</span></p>
</div>
</div>
</div>
</li>`;
	},
	sidethumb: (data) => {
		return `<span class="sidethumb">
<span class="video-thumb ux-thumb yt-thumb-default-43">
<span class="yt-thumb-clip">
<span class="yt-thumb-clip-inner">
<img src="${data.thumbnails[0]?.url}" alt="Thumbnail" data-thumb="${data.thumbnails[0]?.url}" data-group-key="thumb-group-6" width="43"><span class="vertical-align"></span>
</span>
</span>
</span>
</span>`;
	},
	playlistRender: (data) => {
		let sideThumbs = "";
		for (let i = 0; i < data.sidethumbs.length; i++) {
			sideThumbs += document.cosmicCat.Template.Search.sidethumb(data.sidethumbs[i]);
		}
		return `<li class="yt-grid-box playlist *sr context-data-item" data-context-item-title="${data.title}" data-context-item-count="${data.videos.text}" data-context-item-id="${data.id}" data-context-item-type="playlist" data-context-item-videos="[&quot;nyMkLwSyOVQ&quot;, &quot;2_HXUhShhmY&quot;, &quot;lLJf9qJHR3E&quot;]">
<div id="" class="yt-uix-tile yt-lockup-list yt-tile-default yt-grid-box">
<div class="yt-lockup-thumbnail">
<a href="${data.url}" class="yt-pl-thumb-link yt-uix-contextlink yt-uix-sessionlink" data-sessionlink="">
<span class="yt-pl-thumb">
<span class="video-thumb ux-thumb yt-thumb-feed-185">
<span class="yt-thumb-clip">
<span class="yt-thumb-clip-inner">
<img src="${data.thumbnail}" alt="Thumbnail" data-thumb=""${data.thumbnail}" data-group-key="thumb-group-6" width="185"><span class="vertical-align"></span>
</span>
</span>
</span>
<span class="sidebar sidebar-height-124">
<span class="video-count-wrapper">
<span class="video-count-block">
<span class="count-label">${data.videos.text.split(" ")[0]}</span>
<span class="text-label">videos</span>
</span>
</span>
<span class="side-thumbs">
${sideThumbs}
</span>
</span>
</span>
<span class="yt-pl-thumb-overlay">
<span class="yt-pl-thumb-overlay-content"><img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="">Play all</span>
</span>
</span>
</a>
</div>
<div class="yt-lockup-content">
<h3 class="yt-lockup-ellipsize">
<a class="yt-uix-contextlink yt-uix-sessionlink yt-uix-tile-link result-item-translation-title" dir="ltr" title="${data.title}" data-sessionlink="" href="${data.url}">${data.title}</a>
</h3>

<div class="yt-lockup-meta">
<ul class="single-line-lego-list">
<li>
<a href="/web/20121022214036/https://www.youtube.com/results?search_query=playlist%2C+playlist&amp;lclk=playlist/a" class="yt-badge-std">playlist</a>
</li>
</ul>
<p class="facets"><a href="/playlist?list=${data.id}" class="video-count">${data.videos.text}</a></p>
<p>
<span class="username-prepend">by <a href="${data.owner.url}" class="yt-uix-sessionlink yt-user-name" data-sessionlink="ved=CFgQwRs%3D&amp;ei=CNyy4KHLlbMCFSXtRAodZHCYmg%3D%3D" dir="ltr">${data.owner.name}</a></span></p>
</div>
</div>
</div>
</li>`;
	},
	channelRender: (data) => {
		console.debug(data);
		return `<li class="yt-grid-box result-item-channel *sr">
<div id="" class="yt-uix-tile yt-lockup-list yt-tile-default yt-grid-box">
<div class="yt-lockup-thumbnail">
<a href="${data.url}" class="ux-thumb-wrap yt-uix-sessionlink result-item-thumb" data-sessionlink="">
<span class="video-thumb ux-thumb yt-thumb-square-104">
<span class="yt-thumb-clip">
<span class="yt-thumb-clip-inner">
<img src="${data.avatar}" alt="Thumbnail" width="104"><span class="vertical-align"></span>
</span>
</span>
</span>
</a>
</div>
<div class="yt-lockup-content">
<h3 class="yt-lockup-ellipsize">
<a class="yt-uix-contextlink yt-uix-sessionlink yt-uix-tile-link result-item-translation-title" dir="ltr" title="${data.name}" data-sessionlink="" href="${data.url}?feature=results_main">${data.name}</a>
</h3>
<p class="description yt-lockup-ellipsize" dir="ltr">${data.fields.description}</p>
<div class="yt-lockup-meta">
<ul class="single-line-lego-list">
<li>
<a href="https://www.youtube.com/results?search_query=channel%2C+channel&amp;lclk=channel/a" class="yt-badge-std">channel</a></li>
</ul>
<p class="facets">
<span class="video-count">${data.videos}</span>
<span class="metadata-separator">|</span>
<span class="subscriber-count">${data.subscriberCount}</span>
</p>
<p>
${localizeString("search.channels.by", data)}
</p>
</div>
</div>
</div>
</li>`;
	}
}