export default {
	Content: {
		playlistBar: {
			Main: (data) => {
				return `<div id="playlist-bar" class="active autoplay-on shuffle-off max" data-list-id="${data.id}" data-list-type="PL" data-index-offset="0" data-video-ids="" data-list-length="47" data-masked="True" data-video-url="/watch?v=&amp;feature=BFa&amp;list=${data.id}">
${document.cosmicCat.Template.Watch.Content.playlistBar.barBar(data)}
${document.cosmicCat.Template.Watch.Content.playlistBar.barTray.Main(data)}
</div>`;
			},
			aMain: () => {
				return `<div id="playlist-bar" class="active autoplay-on shuffle-off max" data-list-id="2D5ACE7F76092751" data-list-type="PL" data-index-offset="0" data-video-ids="" data-list-length="47" data-masked="True" data-video-url="/watch?v=&amp;feature=BFa&amp;list=PL2D5ACE7F76092751">
<iframe id="playlist-bar-mask" src="javascript:&quot;&quot;" allow="autoplay 'self'; fullscreen 'self'" data-ruffle-polyfilled="" frameborder="0"></iframe>
<div id="playlist-bar-bar-container">
<div id="playlist-bar-bar">
<div class="yt-alert yt-alert-naked yt-alert-success hid" id="playlist-bar-notifications">
<div class="yt-alert-icon">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" class="icon master-sprite" alt="Alert icon">
</div>
<div class="yt-alert-content" role="alert"></div>
</div>
<span id="playlist-bar-info">
<span class="playlist-bar-active playlist-bar-group">
<button onclick=";return false;" title="Previous video" type="button" id="playlist-bar-prev-button" class="yt-uix-tooltip yt-uix-tooltip-masked yt-uix-button yt-uix-button-default yt-uix-tooltip yt-uix-button-empty" role="button">
<span class="yt-uix-button-icon-wrapper">
<img class="yt-uix-button-icon yt-uix-button-icon-playlist-bar-prev" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Previous video"><span class="yt-valign-trick"></span>
</span>
</button>
<span class="playlist-bar-count">
<span class="playing-index">18</span> / <span class="item-count">47</span>
</span>
<button type="button" class="yt-uix-tooltip yt-uix-tooltip-masked yt-uix-button yt-uix-button-default yt-uix-button-empty" onclick=";return false;" id="playlist-bar-next-button" role="button" data-tooltip-text="Next video">
<span class="yt-uix-button-icon-wrapper">
<img class="yt-uix-button-icon yt-uix-button-icon-playlist-bar-next" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-valign-trick"></span>
</span>
</button>
</span>
<span class="playlist-bar-active playlist-bar-group">
<button type="button" class="yt-uix-tooltip yt-uix-tooltip-masked yt-uix-button-toggled yt-uix-button yt-uix-button-default yt-uix-button-empty" onclick=";return false;" id="playlist-bar-autoplay-button" data-button-toggle="true" role="button" data-tooltip-text="Turn autoplay off"><span class="yt-uix-button-icon-wrapper"><img class="yt-uix-button-icon yt-uix-button-icon-playlist-bar-autoplay" src="//web.archive.org/web/20120805130558im_/https://s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-valign-trick"></span></span></button><button type="button" class="yt-uix-tooltip yt-uix-tooltip-masked  yt-uix-button yt-uix-button-default yt-uix-button-empty" onclick=";return false;" id="playlist-bar-shuffle-button" data-button-toggle="true" role="button" data-tooltip-text="Turn shuffle on"><span class="yt-uix-button-icon-wrapper"><img class="yt-uix-button-icon yt-uix-button-icon-playlist-bar-shuffle" src="//web.archive.org/web/20120805130558im_/https://s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-valign-trick"></span></span></button></span><span class="playlist-bar-passive playlist-bar-group"><button onclick=";return false;" title="Play videos" type="button" id="playlist-bar-play-button" class="yt-uix-tooltip yt-uix-tooltip-masked  yt-uix-button yt-uix-button-default yt-uix-tooltip yt-uix-button-empty" role="button"><span class="yt-uix-button-icon-wrapper"><img class="yt-uix-button-icon yt-uix-button-icon-playlist-bar-play" src="//web.archive.org/web/20120805130558im_/https://s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Play videos"><span class="yt-valign-trick"></span></span></button><span class="playlist-bar-count"><span class="item-count">47</span></span></span><span id="playlist-bar-title" class="yt-uix-button-group"><button href="/web/20120805130558mp_/https://www.youtube.com/playlist?list=PL2D5ACE7F76092751" onclick=";window.location.href=this.getAttribute('href');return false;" title="More information about this playlist" type="button" class="yt-uix-tooltip yt-uix-tooltip-masked start playlist-title yt-uix-button yt-uix-button-default yt-uix-tooltip" role="button"><span class="yt-uix-button-content">Official 10 hour playlist </span></button><button href="/web/20120805130558mp_/https://www.youtube.com/user/TehN1ppe?feature=BF" type="button" class="yt-uix-tooltip yt-uix-tooltip-masked end yt-uix-button yt-uix-button-default" onclick=";window.location.href=this.getAttribute('href');return false;" role="button"><span class="yt-uix-button-content">  <span class="video-thumb ux-thumb yt-thumb-square-23 "><span class="yt-thumb-clip"><span class="yt-thumb-clip-inner"><img src="https://web.archive.org/web/20120805130558im_/https://i1.ytimg.com/i/xHoFjiQvDUvFXJTpXzKYQw/1.jpg?v=c0308b" alt="Thumbnail" width="23"><span class="vertical-align"></span></span></span></span>
<span class="yt-user-name" dir="ltr">TehN1ppe</span>
</span>
</button>
</span>
</span>
<a id="playlist-bar-lists-back" href="#">Return to active list</a>
<span id="playlist-bar-controls">
<span class="playlist-bar-group">
<button type="button" class="yt-uix-tooltip yt-uix-tooltip-masked yt-uix-button yt-uix-button-text yt-uix-button-empty" onclick=";return false;" id="playlist-bar-toggle-button" role="button" data-tooltip-text="Hide playlist">
<span class="yt-uix-button-icon-wrapper">
<img class="yt-uix-button-icon yt-uix-button-icon-playlist-bar-toggle" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-valign-trick"></span>
</span>
</button>
</span>
<span class="playlist-bar-group">
<button type="button" class="yt-uix-tooltip yt-uix-tooltip-masked yt-uix-button-reverse flip yt-uix-button yt-uix-button-text" onclick=";return false;" data-button-menu-id="playlist-bar-options-menu" data-button-has-sibling-menu="true" role="button"><span class="yt-uix-button-content">Options </span><img class="yt-uix-button-arrow" src="//web.archive.org/web/20120805130558im_/https://s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""></button></span></span>      </div>
</div>
<div id="playlist-bar-tray-container">
<div id="playlist-bar-tray" class="yt-uix-slider yt-uix-slider-fluid" data-slider-offset="-4284">
<button class="yt-uix-button playlist-bar-tray-button yt-uix-button-default yt-uix-slider-prev" onclick="return false;"><img class="yt-uix-slider-prev-arrow" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Previous video"></button>
<button class="yt-uix-button playlist-bar-tray-button yt-uix-button-default yt-uix-slider-next" onclick="return false;"><img class="yt-uix-slider-next-arrow" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Next video"></button>
<div class="yt-uix-slider-body">
<div id="playlist-bar-tray-content" class="yt-uix-slider-slide" style="left: -4284px;">
<ol class="video-list">
<li class="playlist-bar-item yt-uix-slider-slide-unit loading" data-video-id="8ZcmTl_1ER8">
<a href="https://www.youtube.com/watch?v=8ZcmTl_1ER8&amp;feature=BFa&amp;list=PL2D5ACE7F76092751" title="" class="yt-uix-sessionlink" data-sessionlink="ei=CLKl0-DG0LECFRGNfAodf1H5ZA%3D%3D&amp;feature=BFa">
<span class="video-thumb ux-thumb yt-thumb-default-106">
<span class="yt-thumb-clip">
<span class="yt-thumb-clip-inner">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="" data-thumb-manual="true" data-thumb="//i4.ytimg.com/vi/8ZcmTl_1ER8/default.jpg" width="106"><span class="vertical-align"></span>
</span>
</span>
</span>
<span class="screen"></span>
<span class="count"><strong>1</strong></span><span class="play"><img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif"></span><span class="yt-uix-button yt-uix-button-default delete"><img class="yt-uix-button-icon-playlist-bar-delete" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Delete"></span><span class="now-playing">Now playing</span><span dir="ltr" class="title"><span>  <span class="uploader">by </span>
</span>
</span>
<span class="dragger"></span>
</a>
</li>
</ol>
<ol id="playlist-bar-help">
<li class="empty playlist-bar-help-message">Your queue is empty. Add videos to your queue using this button: <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" class="addto-button-help"><br> or <a href="https://web.archive.org/web/20120805130558/https://accounts.google.com/ServiceLogin?uilel=3&amp;service=youtube&amp;passive=true&amp;continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Faction_handle_signin%3Dtrue%26feature%3Dplaylist%26nomobiletemp%3D1%26hl%3Den_US%26next%3D%252Fwatch%253Fv%253DJikPgxdmpJY%2526playnext%253D1%2526list%253DPL2D5ACE7F76092751%2526feature%253Dresults_main&amp;hl=en_US&amp;ltmpl=sso">sign in</a> to load a different list.</li>
</ol>
</div>
<div class="yt-uix-slider-shade-left"></div>
<div class="yt-uix-slider-shade-right"></div>
</div>
</div>
<div id="playlist-bar-save"></div>
<div id="playlist-bar-lists" class="dark-lolz"></div>
<div id="playlist-bar-loading">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Loading..."><span id="playlist-bar-loading-message">Loading...</span><span id="playlist-bar-saving-message" class="hid">Saving...</span>
</div>
<div id="playlist-bar-template" style="display: none;" data-video-thumb-url="//i4.ytimg.com/vi/__video_encrypted_id__/default.jpg">
<!--<li class="playlist-bar-item yt-uix-slider-slide-unit __classes__" data-video-id="__video_encrypted_id__">
<a href="__video_url__" title="__video_title__" class="yt-uix-sessionlink" data-sessionlink="ei=CLKl0-DG0LECFRGNfAodf1H5ZA%3D%3D&amp;feature=BFa">
<span class="video-thumb ux-thumb yt-thumb-default-106 ">
<span class="yt-thumb-clip">
<span class="yt-thumb-clip-inner">
<img src="https://s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="__video_title__" data-thumb-manual="true" data-thumb="__video_thumb_url__" width="106" ><span class="vertical-align"></span>
</span>
</span>
</span>
<span class="screen"></span>
<span class="count"><strong>__list_position__</strong></span><span class="play"><img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif"></span><span class="yt-uix-button yt-uix-button-default delete"><img class="yt-uix-button-icon-playlist-bar-delete" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Delete"></span><span class="now-playing">Now playing</span><span dir="ltr" class="title"><span>__video_title__  <span class="uploader">by __video_display_name__</span>
</span>
</span>
<span class="dragger"></span>
</a>
</li>-->
</div>
<div id="playlist-bar-next-up-template" style="display: none;">
<!--<div class="playlist-bar-next-thumb">
<span class="video-thumb ux-thumb yt-thumb-default-74">
<span class="yt-thumb-clip"><span class="yt-thumb-clip-inner">
<img src="//i4.ytimg.com/vi/__video_encrypted_id__/default.jpg" alt="Thumbnail" width="74"><span class="vertical-align"></span>
</span>
</span>
</span>
</div>-->
</div>
</div>
<div id="playlist-bar-options-menu" class="hid active">
<ul class="playlist-bar-passive-menu">
<li>
<span class="yt-uix-button-menu-item" data-action="show-active">Return to: Official 10 hour playlist</span>
</li>
</ul>
<div id="playlist-bar-extras-menu">
<ul>
<li>
<span class="yt-uix-button-menu-item" onclick="window.location.href='/playlist?list=PL2D5ACE7F76092751'">More information about this playlist</span>
</li>
</ul>
</div>
<ul>
<li>
<span class="yt-uix-button-menu-item" onclick="window.location.href='//support.google.com/youtube/bin/answer.py?answer=146749&amp;hl=en-US'">Learn more</span>
</li>
</ul>
</div>
</div>`;
			},
			barBar: (data) => {
				return `<div id="playlist-bar-bar-container">
<div id="playlist-bar-bar">
<div class="yt-alert yt-alert-naked yt-alert-success hid" id="playlist-bar-notifications">
<div class="yt-alert-icon">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" class="icon master-sprite" alt="Alert icon">
</div>
<div class="yt-alert-content" role="alert"></div>
</div>
<span id="playlist-bar-info">
<span class="playlist-bar-active playlist-bar-group">
<button onclick=";return false;" title="Previous video" type="button" id="playlist-bar-prev-button" class="yt-uix-tooltip yt-uix-tooltip-masked yt-uix-button yt-uix-button-default yt-uix-tooltip yt-uix-button-empty" role="button">
<span class="yt-uix-button-icon-wrapper">
<img class="yt-uix-button-icon yt-uix-button-icon-playlist-bar-prev" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Previous video"><span class="yt-valign-trick"></span>
</span>
</button>
<span class="playlist-bar-count">
<span class="playing-index">${data.videos.runs[0].text}</span> / <span class="item-count">${data.videos.runs[2].text}</span>
</span>
<button type="button" class="yt-uix-tooltip yt-uix-tooltip-masked yt-uix-button yt-uix-button-default yt-uix-button-empty" onclick=";return false;" id="playlist-bar-next-button" role="button" data-tooltip-text="Next video">
<span class="yt-uix-button-icon-wrapper">
<img class="yt-uix-button-icon yt-uix-button-icon-playlist-bar-next" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-valign-trick"></span>
</span>
</button>
</span>
<span class="playlist-bar-active playlist-bar-group">
<button type="button" class="yt-uix-tooltip yt-uix-tooltip-masked yt-uix-button-toggled yt-uix-button yt-uix-button-default yt-uix-button-empty" onclick=";return false;" id="playlist-bar-autoplay-button" data-button-toggle="true" role="button" data-tooltip-text="Turn autoplay off">
<span class="yt-uix-button-icon-wrapper">
<img class="yt-uix-button-icon yt-uix-button-icon-playlist-bar-autoplay" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-valign-trick"></span>
</span>
</button>
<button type="button" class="yt-uix-tooltip yt-uix-tooltip-masked yt-uix-button yt-uix-button-default yt-uix-button-empty" onclick=";return false;" id="playlist-bar-shuffle-button" data-button-toggle="true" role="button" data-tooltip-text="Turn shuffle on">
<span class="yt-uix-button-icon-wrapper">
<img class="yt-uix-button-icon yt-uix-button-icon-playlist-bar-shuffle" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-valign-trick"></span>
</span>
</button>
</span>
<span class="playlist-bar-passive playlist-bar-group">
<button onclick=";return false;" title="Play videos" type="button" id="playlist-bar-play-button" class="yt-uix-tooltip yt-uix-tooltip-masked yt-uix-button yt-uix-button-default yt-uix-tooltip yt-uix-button-empty" role="button">
<span class="yt-uix-button-icon-wrapper">
<img class="yt-uix-button-icon yt-uix-button-icon-playlist-bar-play" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Play videos"><span class="yt-valign-trick"></span>
</span>
</button>
<span class="playlist-bar-count">
<span class="item-count">47</span>
</span>
</span>
<span id="playlist-bar-title" class="yt-uix-button-group">
<button href="https://www.youtube.com/playlist?list=${data.id}" onclick=";window.location.href=this.getAttribute('href');return false;" title="More information about this playlist" type="button" class="yt-uix-tooltip yt-uix-tooltip-masked start playlist-title yt-uix-button yt-uix-button-default yt-uix-tooltip" role="button">
<span class="yt-uix-button-content">${data.title}</span>
</button><button href="${data.owner.url}" type="button" class="yt-uix-tooltip yt-uix-tooltip-masked end yt-uix-button yt-uix-button-default" onclick=";window.location.href=this.getAttribute('href');return false;" role="button">
<span class="yt-uix-button-content">
<span class="video-thumb ux-thumb yt-thumb-square-23">
<span class="yt-thumb-clip">
<span class="yt-thumb-clip-inner">
<img src="" alt="Thumbnail" width="23"><span class="vertical-align"></span>
</span>
</span>
</span>
<span class="yt-user-name" dir="ltr">${data.owner.name}</span>
</span>
</button>
</span>
</span>
<a id="playlist-bar-lists-back" href="#">Return to active list</a>
<span id="playlist-bar-controls">
<span class="playlist-bar-group">
<button type="button" class="yt-uix-tooltip yt-uix-tooltip-masked yt-uix-button yt-uix-button-text yt-uix-button-empty" onclick=";return false;" id="playlist-bar-toggle-button" role="button" data-tooltip-text="Hide playlist">
<span class="yt-uix-button-icon-wrapper">
<img class="yt-uix-button-icon yt-uix-button-icon-playlist-bar-toggle" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-valign-trick"></span>
</span>
</button>
</span>
<span class="playlist-bar-group">
<button type="button" class="yt-uix-tooltip yt-uix-tooltip-masked yt-uix-button-reverse flip yt-uix-button yt-uix-button-text" onclick=";return false;" data-button-menu-id="playlist-bar-options-menu" data-button-has-sibling-menu="true" role="button"><span class="yt-uix-button-content">Options </span><img class="yt-uix-button-arrow" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""></button>
</span>
</span>
</div>
</div>`;
			},
			barTray: {
				Main: () => {
					return `<div id="playlist-bar-tray-container">
<div id="playlist-bar-tray" class="yt-uix-slider yt-uix-slider-fluid" data-slider-offset="-4284">
<button class="yt-uix-button playlist-bar-tray-button yt-uix-button-default yt-uix-slider-prev" onclick="return false;"><img class="yt-uix-slider-prev-arrow" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Previous video"></button>
<button class="yt-uix-button playlist-bar-tray-button yt-uix-button-default yt-uix-slider-next" onclick="return false;"><img class="yt-uix-slider-next-arrow" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Next video"></button>
${document.cosmicCat.Template.Watch.Content.playlistBar.barTray.Body()}
</div>

<div id="playlist-bar-save"></div>

<div id="playlist-bar-lists" class="dark-lolz"></div>

${document.cosmicCat.Template.Watch.Content.playlistBar.barTray.Loading()}
</div>`;
				},
				Body: () => {
					return `<div class="yt-uix-slider-body">
${document.cosmicCat.Template.Watch.Content.playlistBar.barTray.trayContent.Content()}
<div class="yt-uix-slider-shade-left"></div>
<div class="yt-uix-slider-shade-right"></div>
</div>`;
				},
				Loading: () => {
					return `<div id="playlist-bar-loading">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Loading..."><span id="playlist-bar-loading-message">Loading...</span><span id="playlist-bar-saving-message" class="hid">Saving...</span>
</div>`;
				},
				trayContent: {
					Content: () => {
						return `<div id="playlist-bar-tray-content" class="yt-uix-slider-slide" style="left: 0px;">
<ol class="video-list"></ol>
<ol id="playlist-bar-help">
<li class="empty playlist-bar-help-message">Your queue is empty. Add videos to your queue using this button: <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" class="addto-button-help"><br> or <a href="">sign in</a> to load a different list.</li>
</ol>
</div>`;
					},
					video: (data, pl) => {
						return `<li class="playlist-bar-item yt-uix-slider-slide-unit" data-video-id="${data.id}">
<a href="https://www.youtube.com/watch?v=${data.id}&amp;feature=BFa&amp;list=${pl.id}" title="" class="yt-uix-sessionlink" data-sessionlink="ei=CLKl0-DG0LECFRGNfAodf1H5ZA%3D%3D&amp;feature=BFa">
<span class="video-thumb ux-thumb yt-thumb-default-106">
<span class="yt-thumb-clip">
<span class="yt-thumb-clip-inner">
<img src="${data.thumbnail}" alt="" data-thumb-manual="true" data-thumb="${data.thumbnail}" width="106"><span class="vertical-align"></span>
</span>
</span>
</span>
<span class="screen"></span>
<span class="count"><strong>1</strong></span>
<span class="play"><img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif"></span>
<span class="yt-uix-button yt-uix-button-default delete">
<img class="yt-uix-button-icon-playlist-bar-delete" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Delete"></span>
<span class="now-playing">Now playing</span>
<span dir="ltr" class="title">${data.title}<span>
<span class="uploader">by ${data.owner.name}</span>
</span>
</span>
<span class="dragger"></span>
</a>
</li>`;
					}
				}
			}
		},
		metadata: (videoData) => {
			return `<link itemprop="url" href="http://www.youtube.com/watch?v=${videoData.primary.id}">
<meta itemprop="name" content="${videoData.primary.title}">
<meta itemprop="description" content="${document.cosmicCat.Utils.escapeHtml(videoData.secondary.description)}">
<meta itemprop="duration" content="PT0M18S">
<meta itemprop="unlisted" content="False">
<meta itemprop="paid" content="False">
<span itemprop="author" itemscope="" itemtype="http://schema.org/Person">
<link itemprop="url" href="${videoData.secondary?.owner?.url}">
</span>
<link itemprop="thumbnailUrl" href="${videoData.primary.thumbnail}">
<span itemprop="thumbnail" itemscope="" itemtype="http://schema.org/ImageObject">
<link itemprop="url" href="${videoData.primary.thumbnail}">
<meta itemprop="width" content="320">
<meta itemprop="height" content="180">
</span>
<link itemprop="embedURL" href="http://www.youtube.com/v/${videoData.primary.id}?version=3&amp;autohide=1">
<meta itemprop="playerType" content="Flash">
<meta itemprop="width" content="480">
<meta itemprop="height" content="360">
<meta itemprop="isFamilyFriendly" content="True">`;
		},
		Main: (data) => {
			return `<div id="content" class="">
<div id="watch-container" itemscope="" itemtype="https://schema.org/VideoObject">
${document.cosmicCat.Template.Watch.Content.metadata(data)}
${document.cosmicCat.Template.Watch.Content.Headline(data)}
${document.cosmicCat.Template.Watch.Content.videoCon()}
${document.cosmicCat.Template.Watch.Content.mainCon.Main(data)}
</div>
</div>
<style>#player {display:none}</style>`;
		},
		tag: (data, i) => {
			return `<li><a href="https://www.youtube.com/results?search_query=${data.alternative.tags[i]}&amp;search=tag">${data.alternative.tags[i]}</a></li>
`;
		},
		ownerContainer: (data) => {
			return `<div id="watch-owner-container">
<div id="masthead-subnav" class="yt-nav yt-nav-dark">
<ul class="yt-nav-aside">
<li>
<a href="https://www.youtube.com/analytics#fi=v-${data.id}" class="yt-uix-button yt-uix-button-subnav yt-uix-sessionlink yt-uix-button-dark">
<span class="yt-uix-button-content">Analytics</span>
</a>
</li>
<li>
<a href="https://www.youtube.com/my_videos" class="yt-uix-button yt-uix-button-subnav yt-uix-sessionlink yt-uix-button-dark">
<span class="yt-uix-button-content">Video Manager</span>
</a>
</li>
</ul>
<ul>
<li>
<a href="https://studio.youtube.com/video/${data.id}/edit" class="yt-uix-button yt-uix-button-subnav yt-uix-sessionlink yt-uix-button-dark">
<span class="yt-uix-button-content">Edit</span>
</a>
</li>
<li>
<a href="https://studio.youtube.com/video/${data.id}/editor" class="yt-uix-button yt-uix-button-subnav yt-uix-sessionlink yt-uix-button-dark">
<span class="yt-uix-button-content">Enhancements</span>
</a>
</li>
<li>
<a href="https://studio.youtube.com/video/${data.id}/editor" class="yt-uix-button yt-uix-button-subnav yt-uix-sessionlink yt-uix-button-dark">
<span class="yt-uix-button-content">Audio</span>
</a>
</li>
<li>
<a href="https://studio.youtube.com/video/${data.id}/editor" class="yt-uix-button yt-uix-button-subnav yt-uix-sessionlink yt-uix-button-dark">
<span class="yt-uix-button-content">Annotations</span>
</a>
</li>
<li>
<button type="button" class=" yt-uix-button yt-uix-button-dark yt-uix-button-empty" onclick=";return false;" role="button" aria-pressed="false" aria-expanded="false" aria-haspopup="true" aria-activedescendant="">
<img class="yt-uix-button-arrow" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="">
<ul class=" yt-uix-button-menu yt-uix-button-menu-dark" role="menu" aria-haspopup="true" style="display: none;">
<li role="menuitem" id="aria-id-82239352096">
<span href="/my_videos_timedtext?video_id=${data.id}" class=" yt-uix-button-menu-item" onclick=";window.location.href=this.getAttribute('href');return false;">Captions</span>
</li>
<li role="menuitem" id="aria-id-93589831653">
<span href="/my_video_ad?v=${data.id}&amp;utm_source=youtube&amp;utm_campaign=yt_watch&amp;utm_medium=permanent&amp;utm_content=header_menu&amp;utm_term=dropdown" class=" yt-uix-button-menu-item" onclick=";window.location.href=this.getAttribute('href');return false;">Promote</span>
</li>
</ul>
</button>
</li>
</ul>
</div>
</div>`;
		},
		Headline: (data) => {
			return `<div id="watch-headline-container" class="">
${document.cosmicCat.watch.isOwner() ? document.cosmicCat.Template.Watch.Content.ownerContainer(data.alternative) : ""}
<div id="watch-headline" class="watch-headline">
<h1 id="watch-headline-title">
<span id="eow-title" class="" dir="ltr" title="${data.primary.title}">
${data.primary.title}
</span>
</h1>
<div id="watch-headline-user-info">
<span class="yt-uix-button-group">
<button href="${data.secondary?.owner?.url}/featured?feature=watch" type="button" class="start yt-uix-button yt-uix-button-default" onclick=";window.location.href=this.getAttribute('href');return false;" role="button">
<span class="yt-uix-button-content">${data.secondary?.owner?.name}</span>
</button>${document.cosmicCat.Template.Buttons.Subscribe(data.alternative?.owner?.id)}
</span>
</div>
<div id="watch-more-from-user" class="collapsed">
<div id="watch-channel-discoverbox" class="yt-rounded">
<span id="watch-channel-loading">${localizeString("global.loading.main")}</span>
</div>
</div>
</div>
</div>`;
		},
		videoCon: () => {
			return `<div id="watch-video-container">
<div id="watch-video">
<div id="watch-player" class="flash-player player-root wm-videoplayer">
</div>
</div>
</div>`;
		},
		mainCon: {
			Main: (data) => {
				return `<div id="watch-main-container" class="">
<div id="watch-main">
${document.cosmicCat.Template.Watch.Content.mainCon.panel.Main(data)}
${document.cosmicCat.Template.Watch.Content.mainCon.sideBar.Main(data)}
<div class="clear"></div>
</div>
<div style="visibility: hidden; height: 0px; padding: 0px; overflow: hidden;">
<div id="baseDiv"></div>
</div>
</div>
<style>
.yt-thumb-default-120 img {
width: 120px;
}
</style>`;
			},
			panel: {
				Main: (data) => {
					return `<div id="watch-panel">
<div id="watch-actions">
<div id="watch-actions">
<div id="watch-actions-right">
<span class="watch-view-count">
<strong>${document.cosmicCat.Utils.parseNumber(data.primary?.views?.split(" ")?.[0])}</strong>
</span>
<button onclick=";return false;" type="button" id="watch-insight-button" class="yt-uix-tooltip yt-uix-tooltip-reverse yt-uix-button yt-uix-button-default yt-uix-tooltip yt-uix-button-empty" role="button" title="Show video statistics">
<span class="yt-uix-button-icon-wrapper">
<img class="yt-uix-button-icon yt-uix-button-icon-watch-insight" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Show video statistics"><span class="yt-valign-trick"></span>
</span>
</button>
</div>
${document.cosmicCat.Template.Buttons.LikeDis(data)}
<button type="button" class="yt-uix-tooltip-reverse yt-uix-button yt-uix-button-default yt-uix-tooltip" onclick=";return false;" title="${localizeString("tooltip.watch.addto")}" data-upsell="playlist" data-button-action="yt.www.watch.actions.addto" role="button">
<span class="yt-uix-button-content">
<span class="addto-label">${localizeString("buttons.watch.addto")}</span>
</span>
</button>
<button onclick=";return false;" title="${localizeString("tooltip.watch.share")}" class="yt-uix-tooltip-reverse yt-uix-button yt-uix-button-default yt-uix-tooltip" id="watch-share" data-button-action="yt.www.watch.actions.share" role="button">
<span class="yt-uix-button-content">${localizeString("buttons.watch.share")}</span>
</button>
<button onclick=";return false;" title="${localizeString("tooltip.watch.flag")}" type="button" class="yt-uix-tooltip-reverse yt-uix-button yt-uix-button-default yt-uix-tooltip yt-uix-button-empty" id="watch-flag" data-button-action="yt.www.watch.actions.flag" role="button">
<span class="yt-uix-button-icon-wrapper">
<img class="yt-uix-button-icon yt-uix-button-icon-watch-flag" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="${localizeString("tooltip.watch.flag")}"><span class="yt-valign-trick"></span>
</span>
</button>
<button onclick=";return false;" type="button" class="yt-uix-tooltip-reverse yt-uix-button yt-uix-button-default yt-uix-tooltip yt-uix-button-empty" id="watch-transcript" data-button-action="yt.www.watch.actions.transcript" role="button" title="${localizeString("tooltip.watch.transcript")}">
<span class="yt-uix-button-icon-wrapper">
<img class="yt-uix-button-icon yt-uix-button-icon-transcript" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="${localizeString("tooltip.watch.transcript")}"><span class="yt-valign-trick"></span>
</span>
</button>
</div>
</div>
<div id="watch-actions-area-container" class="hid">
<div id="watch-actions-area" class="yt-rounded">
<div id="watch-actions-loading" class="watch-actions-panel hid">${localizeString("global.loading.main")}</div>
<div id="watch-actions-logged-out" class="watch-actions-panel hid">
<div class="yt-alert yt-alert-warn yt-alert-small yt-alert-naked yt-rounded">
<span class="yt-alert-icon">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" class="icon master-sprite" alt="Alert icon">
</span>
<div class="yt-alert-content">
<strong>
<a href="https://accounts.google.com/ServiceLogin?service=youtube&amp;uilel=3&amp;passive=true&amp;continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Faction_handle_signin%3Dtrue%26app%3Ddesktop%26hl%3Den%26next%3Dhttps%253A%252F%252Fwww.youtube.com%252F&amp;hl=en&amp;ec=65620">Sign In</a> or <a href="https://www.youtube.com/signup">Sign Up</a> now!
</strong>
</div>
</div>
</div>
<div id="watch-actions-error" class="watch-actions-panel hid">
<div class="yt-alert yt-alert-error yt-alert-small yt-alert-naked yt-rounded">
<span class="yt-alert-icon">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" class="icon master-sprite" alt="Alert icon">
</span>
<div id="watch-error-string" class="yt-alert-content"></div>
</div>
</div>
<div id="watch-actions-share" class="watch-actions-panel hid">
${document.cosmicCat.Template.Watch.Content.mainCon.panel.Share(data)}
</div>
<div id="watch-actions-Ajax" class="watch-actions-panel hid"></div>
<div class="close">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" class="close-button" onclick="document.cosmicCat.toggleElm('#watch-actions-area-container')">
</div>
</div>
</div>
<div id="watch-info">
<div id="watch-description" class="yt-uix-expander-collapsed yt-uix-expander">
<div id="watch-description-clip">
<p id="watch-uploader-info">${localizeString("watch.uploaderinfo", data)}</p>
<div id="watch-description-text">
<p id="eow-description">${data.secondary.description}</p>
</div>
<div id="watch-description-extras">
<h4>${localizeString("watch.watchInfo.category")}</h4>
<p id="eow-category"><a href="//www.youtube.com/featured">${data.primary.category}</a></p>
<h4 class="${(data.alternative.tags.length == 0 ? "hid" : "")}">${localizeString("watch.watchInfo.tags")}</h4>
<ul id="eow-tags" class="watch-info-tag-list ${(data.alternative.tags.length == 0 ? "hid" : "")}">

</ul>
<h4>${localizeString("watch.watchInfo.license")}</h4>
<p id="eow-reuse">Standard YouTube License</p>
</div>
</div>
<ul id="watch-description-extra-info">
<li>
<div class="video-extras-sparkbars" style="background-color:red">
<div class="video-extras-sparkbar-likes" style="width: 100%;"></div>
</div>
<span class="video-extras-likes-dislikes">
${localizeString("stats.likesdislikes")}
</span>
</li>
</ul>
<div class="yt-horizontal-rule">
<span class="first"></span>
<span class="second"></span>
<span class="third"></span>
</div>
<div id="watch-description-toggle" class="yt-uix-expander-head">
<div id="watch-description-expand" class="expand">
<button type="button" class="metadata-inline yt-uix-button yt-uix-button-text" onclick="return false;" role="button">
<span class="yt-uix-button-content">${localizeString("buttons.watch.showmore")} <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="${localizeString("buttons.watch.showmore")}"></span>
</button>
</div>
<div id="watch-description-collapse" class="collapse">
<button type="button" class="metadata-inline yt-uix-button yt-uix-button-text" onclick="return false;" role="button">
<span class="yt-uix-button-content">${localizeString("buttons.watch.showless")} <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="${localizeString("buttons.watch.showless")}"></span>
</button>
</div>
</div>
</div>
</div>
${document.cosmicCat.Template.Comments.Main(data)}`;
				},
				Share: (data) => {
					console.log(data);
					return `<div id="watch-actions-share-panel" class="" style="">
<div class="share-panel">
<div class="share-option-container ytg-box">
<div class="share-panel-buttons yt-uix-expander yt-uix-expander-collapsed">
<span class="share-panel-main-buttons">
<button type="button" class="share-panel-embed yt-uix-button yt-uix-button-default" onclick=";return false;" role="button">
<span class="yt-uix-button-content">Embed </span>
</button><button type="button" class="share-panel-email yt-uix-button yt-uix-button-default" onclick=";return false;" role="button">
<span class="yt-uix-button-content">Email </span>
</button>
</span>
</div>
<div class="share-panel-url-container">
<span class=" yt-uix-form-input-container yt-uix-form-input-text-container yt-uix-form-input-non-empty">
<input class="yt-uix-form-input-text share-panel-url" name="share_url" value="http://youtu.be/${data.alternative.id}" data-video-id="${data.alternative.id}">
</span>
<div class="share-panel-url-options yt-uix-expander yt-uix-expander-collapsed">
<div class="yt-uix-expander-head">
<a class="share-panel-show-url-options">
<span class="collapsed-message">Options<img class="arrow" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt=""></span>
<span class="expanded-message">Close<img class="arrow" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt=""></span>
</a>
</div>
<ul class="yt-uix-expander-body share-options">
<li>
<label>
<input class="share-panel-start-at" type="checkbox"> Start at:
</label>
<input type="text" value="0:00" class="yt-uix-form-input-text share-panel-start-at-time">
</li>
<li>
<label>
<input class="share-panel-long-url" type="checkbox"> Long link
</label>
</li>
</ul>
</div>
</div>
<div class="share-panel-services yt-uix-expander yt-uix-expander-collapsed clearfix">
<ul class="share-group ytg-box">
<li>
<button onclick="window.open(&quot;http:\/\/www.facebook.com\/dialog\/feed?app_id=87741124305\u0026link=http%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D${data.alternative.id}%26feature%3Dshare\u0026display=popup\u0026redirect_uri=https%3A%2F%2Fwww.youtube.com%2Ffacebook_redirect&quot;, {'height': 306,'width': 650,'scrollbars': true});return false;" data-service-name="FACEBOOK" title="Share to Facebook" class="yt-uix-tooltip share-service-button">
<img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Facebook" class="share-service-icon share-service-icon-facebook">
<span>Facebook</span>
</button>
</li>
<li>
<button onclick="window.open(&quot;http:\/\/twitter.com\/intent\/tweet?url=http%3A%2F%2Fyoutu.be%2F${data.alternative.id}\u0026text=${encodeURIComponent(data.alternative.title)}%3A\u0026via=youtube\u0026related=Youtube%2CYouTubeTrends%2CYTCreators&quot;, {'height': 650,'width': 1024,'scrollbars': true});return false;" data-service-name="TWITTER" title="Share to Twitter" class="yt-uix-tooltip share-service-button">
<img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Twitter" class="share-service-icon share-service-icon-twitter">
<span>Twitter</span>
</button>
</li>
<li>
<button onclick="window.open(&quot;https:\/\/plus.google.com\/share?url=http%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D${data.alternative.id}%26feature%3Dshare\u0026source=yt\u0026hl=en&quot;, {'height': 620,'width': 620,'scrollbars': true});return false;" data-service-name="GOOGLEPLUS" title="Share to Google+" class="yt-uix-tooltip share-service-button">
<img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Google+" class="share-service-icon share-service-icon-googleplus">
<span>Google+</span>
</button>
</li>
</ul>
<div class="yt-uix-expander-head clearfix">
<a class="share-panel-show-more">
<span class="collapsed-message">More<img class="arrow" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt=""></span>
<span class="expanded-message">Less<img class="arrow" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt=""></span>
</a>
</div>
<div class="yt-uix-expander-body share-options-secondary">
<div class="secondary">
<div class="share-groups">
<ul>
<li>
<button onclick="window.open(&quot;http:\/\/www.tumblr.com\/share?v=3\u0026u=http%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D${data.alternative.id}%26feature%3Dshare&quot;, {'height': 650,'width': 1024,'scrollbars': true});return false;" data-service-name="TUMBLR" class="share-service-button">
<img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="tumblr." class="share-service-icon share-service-icon-tumblr">
<span>tumblr.</span>
</button>
<span>tumblr.</span>
</li>
<li>
<button onclick="window.open(&quot; http:\/\/pinterest.com\/pin\/create\/button\/?url=http%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D${data.alternative.id}%26feature%3Dshare\u0026description=${encodeURIComponent(data.alternative.title)}\u0026is_video=true\u0026media=http%3A%2F%2Fi3.ytimg.com%2Fvi%2F${data.alternative.id}%2Fhqdefault.jpg&quot;, {'height': 650,'width': 1024,'scrollbars': true});return false;" data-service-name="PINTEREST" class="share-service-button">
<img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="pinterest" class="share-service-icon share-service-icon-pinterest">
<span>pinterest</span>
</button>
<span>pinterest</span>
</li>
<li>
<button onclick="window.open(&quot;http:\/\/www.blogger.com\/blog-this.g?n=Me+at+the+zoo\u0026source=youtube\u0026b=%3Ciframe+width%3D%22459%22+height%3D%22344%22+src%3D%22%2F%2Fwww.youtube.com%2Fembed%2F${data.alternative.id}%22+frameborder%3D%220%22+allowfullscreen%3E%3C%2Fiframe%3E\u0026eurl=http%3A%2F%2Fi3.ytimg.com%2Fvi%2F${data.alternative.id}%2Fhqdefault.jpg&quot;, {'height': 468,'width': 768,'scrollbars': true});return false;" data-service-name="BLOGGER" class="share-service-button">
<img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Blogger" class="share-service-icon share-service-icon-blogger">
<span>Blogger</span>
</button>
<span>Blogger</span>
</li>
<li>
<button onclick="window.open(&quot;http:\/\/www.stumbleupon.com\/submit?url=http%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D${data.alternative.id}%26feature%3Dshare\u0026title=${encodeURIComponent(data.alternative.title)}&quot;, {'height': 650,'width': 1024,'scrollbars': true});return false;" data-service-name="STUMBLEUPON" class="share-service-button">
<img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="StumbleUpon" class="share-service-icon share-service-icon-stumbleupon">
<span>StumbleUpon</span>
</button>
<span>StumbleUpon</span>
</li>
</ul>
<ul>
<li>
<button onclick="window.open(&quot;http:\/\/www.linkedin.com\/shareArticle?url=http%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D${data.alternative.id}%26feature%3Dshare\u0026title=${encodeURIComponent(data.alternative.title)}\u0026summary=The+first+video+on+YouTube%2C+uploaded+at+8%3A27+P.M.+on+Saturday+April+23rd%2C+2005.+The+video+was+shot+by+Yakov+Lapitsky+at+the+San+Diego+Zoo.%0A%0AThis+video+is+published+under+the+Creative+Commons+Attribution+license%3A+http%3A%2F%2Fcreativecommons.org%2Flicenses%2Fby%2F3.0%2Flegalcode\u0026source=Youtube&quot;, {'height': 650,'width': 1024,'scrollbars': true});return false;" data-service-name="LINKEDIN" class="share-service-button">
<img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="LinkedIn" class="share-service-icon share-service-icon-linkedin">
<span>LinkedIn</span>
</button>
<span>LinkedIn</span>
</li>
<li>
<button onclick="window.open(&quot;http:\/\/www.myspace.com\/Modules\/PostTo\/Pages\/?t=${encodeURIComponent(data.alternative.title)}\u0026u=http%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D${data.alternative.id}%26feature%3Dshare\u0026l=1&quot;, {'height': 650,'width': 1024,'scrollbars': true});return false;" data-service-name="MYSPACE" class="share-service-button">
<img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Myspace" class="share-service-icon share-service-icon-myspace">
<span>Myspace</span>
</button>
<span>Myspace</span>
</li>
<li>
<button onclick="window.open(&quot;http:\/\/reddit.com\/submit?url=http%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D${data.alternative.id}%26feature%3Dshare\u0026title=${encodeURIComponent(data.alternative.title)}&quot;, {'height': 650,'width': 1024,'scrollbars': true});return false;" data-service-name="REDDIT" class="share-service-button">
<img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="reddit" class="share-service-icon share-service-icon-reddit">
<span>reddit</span>
</button>
<span>reddit</span>
</li>
</ul>
</div>
</div>
</div>
</div>
<div class="share-panel-embed-container hid">
<div>${localizeString("global.loading.main")}</div>
</div>
<div class="share-panel-email-container hid" data-disabled="true">
<strong>
<a href="">Sign in</a> now!
</strong>
</div>
</div>
<span class="share-panel-hangout">
<img src="//ssl.gstatic.com/s2/oz/images/stars/hangout/1/gplus-hangout-24x100-normal.png" alt="Video call" class="share-panel-hangout-button" title="Watch with your friends.">
</span>
</div>
</div>`;
				}
			},
			sideBar: {
				Main: (data) => {
					return `<div id="watch-sidebar">
<div class="watch-sidebar-section">
<div id="watch-related-container">
<ul id="watch-related" class="video-list">

</ul>
<ul id="watch-more-related" class="video-list hid">
<li id="watch-more-related-loading">${localizeString("global.loading.suggestions")}</li>
</ul>
</div>
<div class="watch-sidebar-foot">
<p class="content"></p>
</div>
</div>
<span class="yt-vertical-rule-main"></span>
<span class="yt-vertical-rule-corner-top"></span>
<span class="yt-vertical-rule-corner-bottom"></span>
</div>`;
				},
				suggestedVideo: (videoData) => {
					return `<li class="video-list-item">
<a href="https://www.youtube.com/watch?v=${videoData.id}" class="related-video yt-uix-contextlink yt-uix-sessionlink">
<span class="ux-thumb-wrap contains-addto">
<span class="video-thumb ux-thumb yt-thumb-default-120">
<span class="yt-thumb-clip">
<span class="yt-thumb-clip-inner">
<img src="${videoData.thumbnail}" alt="Thumbnail"><span class="vertical-align"></span>
</span>
</span>
</span>
<span class="video-time">${videoData.time}</span>
${document.cosmicCat.Template.Buttons.addTo(videoData.id)}
</span>
<span dir="ltr" class="title" title="${videoData.title}">${videoData.title}</span>
<span class="stat attribution">${localizeString("watch.by", videoData?.owner.name)}</span>
<span class="stat view-count">${videoData.views}</span>
</a>
</li>`;
				}
			},
		}
	}
};