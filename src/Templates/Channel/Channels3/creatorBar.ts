export default {
	Main: (data) => {
		return `<div id="watch7-creator-bar" class="clearfix yt-uix-button-panel" style="width: 970px;margin-left: auto;margin-right: auto;margin-top: 10px">
<ul id="watch7-creator-bar-nav-buttons">
<li class="creator-bar-item">
<a href="https://www.youtube.com/analytics" class="yt-uix-button yt-uix-sessionlink yt-uix-button-dark yt-uix-button-size-default" data-sessionlink="ei=PAqqU5WaN4278AO4hoCACg&amp;feature=mhsn">
<span class="yt-uix-button-content">${localizeString("channels.3.creatorBar.analytics")}</span>
</a>
</li>
<li class="creator-bar-item">
<a href="/my_videos" class="yt-uix-button yt-uix-sessionlink yt-uix-button-dark yt-uix-button-size-default" data-sessionlink="ei=PAqqU5WaN4278AO4hoCACg&amp;feature=mhsn">
<span class="yt-uix-button-content">${localizeString("channels.3.creatorBar.videomanager")}</span>
</a>
</li>
</ul>
<ul id="watch7-creator-bar-edit-buttons">
<li class="creator-bar-item">
<a href="https://studio.youtube.com/channel/${data.header.id}/editing/details" class="yt-uix-button yt-uix-sessionlink yt-uix-button-dark yt-uix-button-size-default" data-sessionlink="ei=PAqqU5WaN4278AO4hoCACg&amp;feature=mhsn">
<span class="yt-uix-button-content">${localizeString("channels.3.creatorBar.settings")}</span>
</a>
</li>
</ul>
</div>`;
	}
}