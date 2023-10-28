export default (data) => {
return `<div id="branded-page-header-container" class="ytg-wide banner-displayed-mode">
<div id="branded-page-header" class="ytg-wide">
<div id="channel-header-main">
<div class="upper-section clearfix">
<a href="${window.location.pathname}">
<span class="channel-thumb context-image-container" data-context-image="${data.header.avatar}">
<span class="video-thumb ux-thumb yt-thumb-square-60">
<span class="yt-thumb-clip">
<span class="yt-thumb-clip-inner">
<img src="${data.header.avatar}" alt="${data.header.avatar}" width="60"><span class="vertical-align"></span>
</span>
</span>
</span>
</span>
</a>
<div class="upper-left-section">
<h1 class="context-source-container" data-context-source="${data.header.name}">
<span class="qualified-channel-title">${data.header.name}</span>
</h1>
</div>
<div class="upper-left-section">
${document.cosmicCat.Template.Buttons.Subscribe(data.header.id)}
</div>
<div class="upper-right-section">
<div class="header-stats">
${document.cosmicCat.Channels.isOwner() ? `<a href="https://studio.youtube.com/channel/${data.header.id}/analytics/tab-overview/period-default" class="stat-entry">`: `<div class="stat-entry">`}
<span class="stat-value">${data?.info?.subs || data?.header?.subscriberCount}</span>
<span class="stat-name">subscribers</span>
${document.cosmicCat.Channels.isOwner() ? `</a>`: `</div>`}
${document.cosmicCat.Channels.isOwner() ? `<a href="https://studio.youtube.com/channel/${data.header.id}/analytics/tab-overview/period-default" class="stat-entry">`: `<div class="stat-entry">`}
<span class="stat-value">${data?.info?.fields?.views || data?.header?.fields?.views}</span>
<span class="stat-name">video views</span>
${document.cosmicCat.Channels.isOwner() ? `</a>`: `</div>`}
</div>
<span class="valign-shim"></span>
</div>
</div>
<div class="channel-horizontal-menu clearfix">
<ul role="tablist">
<li role="presentation" ${document.cosmicCat.Channels.isCurrentChannelTab("featured") ? "class=\"selected\"" : ""}>
<a href="./featured" class="gh-tab-100" role="tab" aria-selected="${document.cosmicCat.Channels.getCurrentChannelTab("featured") ? "true" : "false"}">${localizeString("channels.3.header.tabs.featured")}</a>
</li>
<li role="presentation" ${document.cosmicCat.Channels.getCurrentChannelTab().match(/videos|playlists|community/) ? "class=\"selected\"" : ""}>
<a href="${document.cosmicCat.Utils.browseTabs.find(ytInitialData, "videos")?.tabRenderer ? "./videos" : "./playlists"}" class="gh-tab-101" role="tab" aria-selected="${document.cosmicCat.Channels.getCurrentChannelTab().match(/videos|playlists/) ? "true" : "false"}">${localizeString("channels.3.header.tabs.videos")}</a>
</li>
</ul>
<form id="channel-search" class="" action="${window.location.pathname}">
<input name="query" type="text" autocomplete="off" class="search-field label-input-label" maxlength="100" placeholder="${localizeString("channels.3.header.tabs.search")}" value="">
<button class="search-btn" type="submit">
<span class="search-btn-content">Search</span>
</button>
<a class="search-dismiss-btn" href="${window.location.pathname}?view=0">
<span class="search-btn-content">Clear</span>
</a>
</form>
</div>
</div>
</div>
</div>`;
};