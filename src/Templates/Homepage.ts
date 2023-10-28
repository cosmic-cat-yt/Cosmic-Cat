export default {
	Main: () => {
		return `<div id="content">
<div class="guide-layout-container enable-fancy-subscribe-button">
<div class="guide-container">
<div id="guide-builder-promo"></div>
<div class="guide"></div>
</div>
<div class="guide-background"></div>
<div id="feed" style="width: 790px;">
<div id="feed-main-youtube" class="individual-feed">
<div class="feed-header hid no-metadata before-feed-content">
<div class="feed-header-thumb">
<img class="feed-header-icon youtube" alt="" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
</div>
<div class="feed-header-details">
<h2 class="feed-header-info">${localizeString("guide.fromyt")}</h2>
</div>
</div>
<div class="feed-container">
<div class="feed-page">
<ul class="context-data-container"></ul>
</div>
</div>
</div>
<div id="feed-error" class="individual-feed hid">
<p class="feed-message">We were unable to complete the request, please try again later.</p>
</div>
<div id="feed-loading-template" class="hid">
<div class="feed-message">
<p class="loading-spinner">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
${localizeString("global.loading.main")}
</p>
</div>
</div>
</div>
<div id="feed-background" style="width: 790px;"></div>
</div>
</div>`;
	},
	Guide: {
		Builder: {
			loggedOut: () => {
				return `<h2>Sign in to customize your homepage</h2>
<div id="guide-builder-promo-buttons" class="signed-out">
<button href="${document.cosmicCat.data.loginUrl}" type="button" class="yt-uix-button yt-uix-button-dark" onclick=";window.location.href=this.getAttribute('href');return false;" role="button">
<span class="yt-uix-button-content">Sign In </span>
</button>
<button href="/signup?next=%2Fchannels%3Ffeature%3Dsignup" type="button" class="yt-uix-button yt-uix-button-primary" onclick=";window.location.href=this.getAttribute('href');return false;" role="button">
<span class="yt-uix-button-content">Create Account </span>
</button>`;
			},
			loggedIn: () => {
				return `<div id="guide-builder-promo-buttons">
<button type="button" class="yt-uix-button yt-uix-button-primary">
<span class="thumb">
<img class="yt-uix-button-icon-add" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
</span><span class="yt-uix-button-content">${localizeString("global.browsechannels")}</span>
</button>`;
			}
		},
		Personal: () => {
			return `<div id="channel">
<span id="channel-thumb">
<a href="/profile" class="yt-user-photo">
<span class="video-thumb ux-thumb yt-thumb-square-77">
<span class="yt-thumb-clip">
<span class="yt-thumb-clip-inner">
<img src="${document.cosmicCat.Storage.get("accountInfo").value.pfp}" alt="${document.cosmicCat.Storage.get("accountInfo").value.name}" width="77"><span class="vertical-align"></span>
</span>
</span>
</span>
</a>
</span>
<div id="personal-feeds">
<ul>
<li class="guide-item-container">
<a class="guide-item guide-item-action" href="/profile?feature=guide">${localizeString("personal.mychannel")}<img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" class="see-more-arrow" alt=""></a>
</li>
<li class="guide-item-container">
<a class="guide-item" data-feed-name="uploads" data-feed-type="personal" title="Videos you have uploaded">${localizeString("personal.videos")}</a>
</li>
<li class="guide-item-container">
<a class="guide-item" data-feed-name="likes" data-feed-type="personal" title="Videos you have liked">${localizeString("personal.likes")}</a>
</li>
<li class="guide-item-container">
<a class="guide-item" data-feed-name="history" data-feed-type="personal" title="Videos you have watched">${localizeString("personal.history")}</a>
</li>
<li class="guide-item-container">
<a class="guide-item" data-feed-name="watch_later" data-feed-type="personal" title="Videos you have added to your Watch Later list">${localizeString("personal.watchlater")}</a>
</li>
</ul>
</div>
</div>
<div class="guide-section yt-uix-expander first">
<h3 class="guide-item-container">
<a class="guide-item" data-feed-name="subscriptions" data-feed-url="/feed/subscriptions?flow=2" data-feed-display="Subscriptions" data-feed-icon="subscriptions">
<span class="thumb">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="" class="system-icon category">
</span><span class="display-name">${localizeString("personal.subscriptions")}</span>
</a>
</h3>
<ul id="guide-subscriptions"></ul>
</div>`;
		},
		Channel: (data) => {
			return `<li class="guide-item-container">
<a class="guide-item" data-feed-name="${data.channelRenderer.title.simpleText}" href="/channel/${data.channelRenderer.channelId}">
<span class="thumb">
<img class="system-icon" src="${data.channelRenderer.thumbnail.thumbnails[0].url}" alt="">
</span><span class="display-name">${data.channelRenderer.title.simpleText}</span>
</a>
</li>`;
		},
		Categories: {
			Main: () => {
				return `<div class="guide-section yt-uix-expander">
<h3 class="guide-item-container selected-child">
<a class="guide-item selected" data-feed-name="youtube" data-feed-url="/" data-feed-display="${localizeString("guide.fromyt")}">
<span class="thumb">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="" class="system-icon category">
</span><span class="display-name">${localizeString("guide.fromyt")}</span>
</a>
</h3>
<ul class="cockie"></ul>
</div>`;
			},
			Channel: (data) => {
				return `<li class="guide-item-container">
<a class="guide-item" data-feed-name="${data.class}" data-feed-url="${data.href}">
<span class="thumb">
<img class="system-icon system ${data.class}" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
</span><span class="display-name">${data.name}</span>
</a>
</li>`;
			}
		}
	},
	Feed: {
		Main: (data) => {
			return `<li>
<div class="feed-item-container first" data-channel-key="${data.owner.id}">
<div class="feed-author-bubble-container">
<a href="${data.owner.url}/featured" class="feed-author-bubble">
<span class="feed-item-author">
<span class="video-thumb ux-thumb yt-thumb-square-28">
<span class="yt-thumb-clip">
<span class="yt-thumb-clip-inner">
<img src="${data.owner.icon}" alt="${data.owner.text}" data-thumb="${data.icon}" width="28"><span class="vertical-align"></span>
</span>
</span>
</span>
</span>
</a>
</div>
<div class="feed-item-main">
<div class="feed-item-header">
<span class="feed-item-actions-line">
${localizeString("home.feed.uploadedavideo", data?.owner)} <span class="feed-item-time">${data.upload}</span>
</span>
</div>
<div class="feed-item-content-wrapper clearfix context-data-item" data-context-item-actionverb="uploaded" data-context-item-title="Steam for Linux a Bad Idea? - This Week in Linux Gaming" data-context-item-type="video" data-context-item-time="5:21" data-context-item-user="nixiedoeslinux" data-context-item-id="7LVtbTurdCk" data-context-item-views="25,816 views" data-context-item-actionuser="nixiedoeslinux">
<div class="feed-item-thumb">
<a class="ux-thumb-wrap contains-addto yt-uix-contextlink yt-uix-sessionlink" href="/watch?v=${data.id}">
<span class="video-thumb ux-thumb yt-thumb-default-185">
<span class="yt-thumb-clip"><span class="yt-thumb-clip-inner">
<img src="${data.thumbnail}" alt="Thumbnail" width="185"><span class="vertical-align"></span>
</span>
</span>
</span>
<span class="video-time">${data.time}</span>
${document.cosmicCat.Template.Buttons.addTo(data.id)}
</a>
</div>
<div class="feed-item-content">
<h4>
<a class="feed-video-title title yt-uix-contextlink yt-uix-sessionlink" href="/watch?v=${data.id}">${data.title}</a>
</h4>
<div class="metadata">
<span class="view-count">${data.views}</span>
<div class="description">
<p>${data.description}</p>
</div>
</div>
</div>
</div>
</div>
<span class="feed-item-action-menu subscribed" data-external-id="PqyfOmT8QmomqIwGPT4hxRGvXqh6izrXz8s1TlSF8fg0h_MQ8Qjx10A==">
<button type="button" class="flip yt-uix-button yt-uix-button-feed-item-action-menu yt-uix-button-empty" onclick=";return false;" data-button-has-sibling-menu="True" role="button" aria-pressed="false" aria-expanded="false" aria-haspopup="true" aria-activedescendant=""><span class="yt-uix-button-icon-wrapper"><img class="yt-uix-button-icon yt-uix-button-icon-feed-item-action-menu" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-valign-trick"></span></span><img class="yt-uix-button-arrow" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt=""><ul class=" yt-uix-button-menu yt-uix-button-menu-feed-item-action-menu" role="menu" aria-haspopup="true" style="display: none;"><li role="menuitem" id="aria-id-69285446284"><span data-action="hide" class="dismiss-menu-choice yt-uix-button-menu-item" onclick=";return false;">Hide this activity</span></li><li role="menuitem" id="aria-id-71783894232"><span data-subscription-id="s-g9bXtaCSKRwzCmeFkvD912YfxX4CmZ5I-IkGd8HUI" data-action="uploads" class="dismiss-menu-choice uploads yt-uix-button-menu-item" onclick=";return false;">Only show uploads from nixiedoeslinux
</span></li><li role="menuitem" id="aria-id-62584392243"><span data-action="subscribe" class="dismiss-menu-choice subscribe yt-uix-button-menu-item" onclick=";return false;">Subscribe to nixiedoeslinux
</span></li><li role="menuitem" id="aria-id-68105254288"><span data-channel-key="UCBE-FO9JUOghSysV9gjTeHw" onclick=";return false;" data-action="unsubscribe" data-subscription-id="s-g9bXtaCSKRwzCmeFkvD912YfxX4CmZ5I-IkGd8HUI" class="dismiss-menu-choice unsubscribe yt-uix-button-menu-item">Unsubscribe from nixiedoeslinux
</span></li></ul></button>
</span>
</div>
<div class="feed-item-dismissal-notices"><div class="feed-item-dismissal feed-item-dismissal-hide hid">This item has been hidden</div><div class="feed-item-dismissal feed-item-dismissal-uploads hid">In the future you will only see uploads from   <span class="feed-item-owner"><a href="/user/nixiedoeslinux?feature=g-u-u" class="yt-uix-sessionlink yt-user-name " data-sessionlink="feature=g-u-u" dir="ltr">nixiedoeslinux</a></span>
</div><div class="feed-item-dismissal feed-item-dismissal-all-activity hid">In the future you will see all activity from   <span class="feed-item-owner"><a href="/user/nixiedoeslinux?feature=g-u-u" class="yt-uix-sessionlink yt-user-name " data-sessionlink="feature=g-u-u" dir="ltr">nixiedoeslinux</a></span>
</div><div class="feed-item-dismissal feed-item-dismissal-unsubscribe hid">You have been unsubscribed from   <span class="feed-item-owner"><a href="/user/nixiedoeslinux?feature=g-u-u" class="yt-uix-sessionlink yt-user-name " data-sessionlink="feature=g-u-u" dir="ltr">nixiedoeslinux</a></span>
</div></div>
</li>`;
		}
	}
}