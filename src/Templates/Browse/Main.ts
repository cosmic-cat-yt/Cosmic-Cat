export default () => {
	return `<div id="baseDiv" class="video-info browse-base browse-videos">
<div id="masthead-subnav" class="yt-nav yt-nav-dark">
<ul>${document.cosmicCat.Template.Browse.Subnav.Main()}</ul>
</div>
<div class="browse-container ytg-wide ytg-box no-stage browse-bg-gradient">
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
<div id="feed-loading-template">
<div class="feed-message">
<p class="loading-spinner">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
${localizeString("global.loading.main")}
</p>
</div>
</div>
<div class="load-more-content"></div>
</div>
</div>
</div>
</div>
<div class="clear"></div>
</div>`;
}