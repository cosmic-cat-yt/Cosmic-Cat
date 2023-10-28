export default {
Main: () => {
	return `<div class="primary-pane"></div>`;
},
featuredVideo: (data, d) => {
	return `<div class="channels-featured-video channel-module yt-uix-c3-module-container has-visible-edge">
<div id="player-api"></div>
<div class="channels-video-player player-root" data-video-id="1${data.id}" style="overflow: hidden;" data-swf-config=""></div>
<div class="channels-featured-video-details yt-tile-visible clearfix">
<h3 class="title">
<a href="http://www.youtube.com/watch?v=${data.id}" class="yt-uix-sessionlink" data-sessionlink="ei=CJXfprr5i7QCFScVIQodyVre8w%3D%3D&amp;feature=plcp">${data.title}</a>
<div class="view-count-and-actions">
<div class="view-count">
<span class="count">${document.cosmicCat.Utils.deabreviateCnt(data.views?.split(" ")[0])}</span> views
</div>
</div>
</h3>
<p class="channels-featured-video-metadata">
<span>by ${d.name}</span>
<span class="created-date">${data.upload}</span>
</p>
</div>
</div>`;
},
playlist: () => {
	return `<div class="playlists-wide channel-module yt-uix-c3-module-container">
<div class="module-view">
<h2>Featured Playlists</h2>
<div class="playlist yt-tile-visible yt-uix-tile">
<div class="playlist-metadata">
<h3 dir="ltr">
<a class="yt-uix-tile-link" href="/playlist?list=PLB152C3F078759BF6&amp;feature=plcp">Trending Videos of the Week (1/14)</a>
</h3>
<p class="description" dir="ltr">See 11 of this week's top trending videos from YouTube.com/Trends</p>
</div>
<a class="yt-uix-contextlink play-all yt-uix-sessionlink" href="//www.youtube.com/watch?v=SKVcQnyEIT8&amp;list=PLB152C3F078759BF6&amp;feature=plcp" data-sessionlink="context=C40b03a5FDvjVQa1PpcFMfMNMbMOtv57rhWW-JBvg6eXMc319H4IY%3D">
<span class="playlist-thumb-strip playlist-thumb-strip-350">
<span class="videos videos-5 vertical-cutoff">
<span class="clip">
<span class="centering-offset">
<span class="centering">
<span class="ie7-vertical-align-hack">&nbsp;</span><img src="//i4.ytimg.com/vi/SKVcQnyEIT8/default.jpg" data-thumb="//i4.ytimg.com/vi/SKVcQnyEIT8/default.jpg" alt="" class="thumb" data-group-key="thumb-group-0"></span>
</span>
</span><span class="clip">
<span class="centering-offset">
<span class="centering">
<span class="ie7-vertical-align-hack">&nbsp;</span><img src="//i2.ytimg.com/vi/qX6UhgboDgc/default.jpg" data-thumb="//i2.ytimg.com/vi/qX6UhgboDgc/default.jpg" alt="" class="thumb" data-group-key="thumb-group-0"></span>
</span>
</span><span class="clip">
<span class="centering-offset">
<span class="centering">
<span class="ie7-vertical-align-hack">&nbsp;</span><img src="//i2.ytimg.com/vi/1IAhDGYlpqY/default.jpg" data-thumb="//i2.ytimg.com/vi/1IAhDGYlpqY/default.jpg" alt="" class="thumb" data-group-key="thumb-group-0"></span>
</span>
</span><span class="clip">
<span class="centering-offset">
<span class="centering">
<span class="ie7-vertical-align-hack">&nbsp;</span><img src="//i2.ytimg.com/vi/ElER4dZSaOs/default.jpg" data-thumb="//i2.ytimg.com/vi/ElER4dZSaOs/default.jpg" alt="" class="thumb" data-group-key="thumb-group-0"></span>
</span>
</span><span class="clip">
<span class="centering-offset">
<span class="centering">
<span class="ie7-vertical-align-hack">&nbsp;</span><img src="//i3.ytimg.com/vi/f-x8t0JOnVw/default.jpg" data-thumb="//i3.ytimg.com/vi/f-x8t0JOnVw/default.jpg" alt="" class="thumb" data-group-key="thumb-group-0"></span>
</span>
</span>
</span>
<span class="resting-overlay">
<img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" class="play-button" alt="Play all"><span class="video-count-box">11 videos</span>
</span>
<span class="hover-overlay">
<span class="play-all-container">
<strong><img src="//s.ytimg.com/yts/img/ui/playlist_thumb_strip/mini-play-all-vflZu1SBs.png" alt="">Play all</strong>
</span>
</span>
</span>
</a>
</div>
<a class="view-all-link" href="/web/20121025230635/http://www.youtube.com/user/YouTube/videos?view=1">view all
<img src="//web.archive.org/web/20121025230635im_/http://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="">
</a>
</div>
</div>`;
}
};