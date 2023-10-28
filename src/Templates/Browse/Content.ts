export default {
	Category: (data, videos) => {
		return `<div class="browse-collection">
<div class="ytg-box collection-header with-icon">
<a class="heading ytg-box" href="${data.href}">
<img class="header-icon ${data.class}" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="">
<div class="header-container">
<h2>${data.name} »</h2>
</div>
</a>
<a class="yt-playall-link yt-playall-link-default yt-uix-sessionlink" href="${data.href}" data-sessionlink="">
<img class="small-arrow" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="">Play all
</a>
</div>
<div class="browse-item-row ytg-box">${videos}</div>
</div>`;
},
	Video: (data) => {
		return `<div class="browse-item yt-tile-default">
<a href="https://www.youtube.com/watch?v=${data.id}" class="ux-thumb-wrap yt-uix-sessionlink yt-uix-contextlink contains-addto" data-sessionlink="">
<span class="video-thumb ux-thumb yt-thumb-default-194">
<span class="yt-thumb-clip">
<span class="yt-thumb-clip-inner">
<img src="//i1.ytimg.com/vi/${data.id}/mqdefault.jpg" alt="Thumbnail" data-thumb="//i1.ytimg.com/vi/${data.id}/mqdefault.jpg" data-group-key="thumb-group-0" width="194"><span class="vertical-align"></span>
</span>
</span>
</span>
<span class="video-time">${data.time}</span>
${document.cosmicCat.Template.Buttons.addTo(data.id)}
</a>
<div class="browse-item-content">
<h3 dir="ltr">
<a href="https://www.youtube.com/watch?v=${data.id}" title="" class="yt-uix-sessionlink" data-sessionlink="">${data.title}</a>
</h3>
<div class="browse-item-info">
<div class="metadata-line">
<span class="viewcount">${data.views}</span>
<span class="metadata-separator">|</span>
<span class="video-date-added">${data.upload}</span>
</div>
<a href="${data.owner?.url}/featured" class="yt-uix-sessionlink yt-user-name" data-sessionlink="" dir="ltr">${data.owner?.name}</a>
</div>
</div>
</div>`;
	}
};