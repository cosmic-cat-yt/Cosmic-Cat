export default {
	Subscribe: (data) => {
		const l = {
			watch: () => {
				return `<div class="yt-subscription-button-hovercard yt-uix-hovercard" data-card-class="watch-subscription-card">
<span class="yt-uix-button-context-light yt-uix-button-subscription-container">
<button onclick=";return false;" type="button" class="yt-subscription-button yt-uix-button yt-uix-button-subscription yt-uix-tooltip yt-subscription-button-js-default end ${document.cosmicCat.Channels.checkIfSubscribed() ? "subscribed hover-enabled" : ""}" data-enable-hovercard="true" data-subscription-value="${data}" data-subscription-feature="${document.cosmicCat.Utils.currentPage()}" data-subscription-type="" data-sessionlink="" data-subscription-initialized="true" role="button">
<span class="yt-uix-button-icon-wrapper">
<img class="yt-uix-button-icon yt-uix-button-icon-subscribe" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-valign-trick"></span>
</span><span class="yt-uix-button-content">
<span class="subscribe-label">${localizeString("buttons.subscribe.subscribe")}</span>
<span class="subscribed-label">${localizeString("buttons.subscribe.subscribed")}</span>
<span class="unsubscribe-label">${localizeString("buttons.subscribe.unsubscribe")}</span>
</span>
</button>
<span class="yt-subscription-button-disabled-mask"></span>
</span>
</div>`;
			},
			channels: () => {
				return `<div class="yt-subscription-button-hovercard yt-uix-hovercard">
<span class="yt-uix-button-context-light yt-uix-button-subscription-container">
<button onclick=";return false;" title="" type="button" class="yt-subscription-button subscription-button-with-recommended-channels yt-uix-button yt-uix-button-subscription yt-uix-tooltip ${document.cosmicCat.Channels.checkIfSubscribed() ? "subscribed hover-enabled" : ""}" data-enable-hovercard="true" data-subscription-value="${data}" data-force-position="" data-position="" data-subscription-feature="${document.cosmicCat.Utils.currentPage()}" data-subscription-type="" role="button">
<span class="yt-uix-button-icon-wrapper">
<img class="yt-uix-button-icon yt-uix-button-icon-subscribe" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-valign-trick"></span>
</span><span class="yt-uix-button-content">
<span class="subscribe-label">${localizeString("buttons.subscribe.subscribe")}</span>
<span class="subscribed-label">${localizeString("buttons.subscribe.subscribed")}</span>
<span class="unsubscribe-label">${localizeString("buttons.subscribe.unsubscribe")}</span>
</span>
</button>
<span class="yt-subscription-button-disabled-mask"></span>
</span>
</div>`;
			},
			channels2: () => {
				return `<span class="subscription-container" data-subscription-expandable-id="subscription-button-module-menu" data-subscription-channels-container="subscription-recommended-channels" data-subscription-value="${data}" data-subscription-menu-type="expander" data-subscription-xsrf="" data-subscription-feature="channel" data-subscription-type="user">
<button type="button" class="subscribe-button yt-uix-button yt-uix-tooltip ${document.cosmicCat.Channels.checkIfSubscribed() ? "yt-subscription-button-green" : "yt-uix-button-urgent"}" onclick=";return false;" title="${document.cosmicCat.Channels.checkIfSubscribed() ? localizeString("tooltip.channels2.subscribe.subscribed") : localizeString("tooltip.channels2.subscribe.subscribe")}" data-loaded="true" data-button-action="yt.www.subscriptions.button.toggleMenu" role="button" data-tooltip-text="${document.cosmicCat.Channels.checkIfSubscribed() ? localizeString("tooltip.channels2.subscribe.subscribed") : localizeString("tooltip.channels2.subscribe.subscribe")}">
<span class="yt-uix-button-content">${document.cosmicCat.Channels.checkIfSubscribed() ? localizeString("buttons.subscribe.subscribed") : localizeString("buttons.subscribe.subscribe")}</span>
</button>
<span class="subscription-subscribed-container hid">
<span class="subscription-options-button subscription-expander yt-uix-expander yt-uix-expander-collapsed" data-expander-action="yt.www.subscriptions.button.toggleMenu">
<span class="yt-uix-expander-head yt-rounded">
<button class="yt-uix-expander-arrow" onclick="return false;"></button>
<span class="yt-alert yt-alert-success yt-alert-small yt-alert-naked yt-rounded">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" class="icon" alt="Alert icon"><span class="yt-alert-content">Subscribed</span>
</span>
</span>
</span>
</span>
</span>`;
			},
			playlist: () => {
				return `<button onclick=";return false;" title="" type="button" class="yt-subscription-button yt-subscription-button-js-default yt-uix-button yt-uix-button-subscription yt-uix-tooltip ${document.cosmicCat.Channels.checkIfSubscribed() ? "subscribed hover-enabled" : ""}" data-subscription-feature="${document.cosmicCat.Utils.currentPage()}" data-sessionlink="" data-subscription-value="${data}" data-subscription-type="" role="button" data-subscription-initialized="true">
<span class="yt-uix-button-icon-wrapper">
<img class="yt-uix-button-icon yt-uix-button-icon-subscribe" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-valign-trick"></span>
</span><span class="yt-uix-button-content">
<span class="subscribe-label">${localizeString("buttons.subscribe.subscribe")}</span>
<span class="subscribed-label">${localizeString("buttons.subscribe.subscribed")}</span>
<span class="unsubscribe-label">${localizeString("buttons.subscribe.unsubscribe")}</span>
</span>
</button>`;
			}
		};
		const l_signedout = `<button disabled="True" onclick=";return false;" title="No need to subscribe to yourself!" type="button" class="yt-subscription-button end yt-uix-button yt-uix-button-default yt-uix-tooltip" role="button">
<span class="yt-uix-button-content">${localizeString("buttons.subscribe.subscribe")}</span>
</button>`;

		return `${((document.cosmicCat.Channels.isOwner(data)) || document.cosmicCat.watch.isOwner()) ? l_signedout : undefined || l[document.cosmicCat.Utils.currentPage()]()}`;
	},
	LikeDis: (data) => {
		return `<span id="watch-like-unlike" class="yt-uix-button-group">
<button onclick=";return false;" title="${localizeString("tooltip.watch.ilikethis")}" type="button" class="start yt-uix-tooltip-reverse yt-uix-button yt-uix-button-default yt-uix-tooltip ${(document.cosmicCat.watch.isVideoLiked() ? "liked" : "")}" id="watch-like" data-button-toggle="true" data-button-action="yt.www.watch.actions.like" role="button">
<span class="yt-uix-button-icon-wrapper">
<img class="yt-uix-button-icon yt-uix-button-icon-watch-like" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="${localizeString("buttons.watch.ilikethis")}"><span class="yt-valign-trick"></span>
</span><span class="yt-uix-button-content">${localizeString("buttons.watch.like")}</span>
</button><button onclick=";return false;" title="${localizeString("tooltip.watch.idislikethis")}" type="button" class="end yt-uix-tooltip-reverse yt-uix-button yt-uix-button-default yt-uix-tooltip yt-uix-button-empty ${(document.cosmicCat.watch.isVideoDisliked() ? "unliked" : "")}" id="watch-unlike" data-button-toggle="true" data-button-action="yt.www.watch.actions.unlike" role="button">
<span class="yt-uix-button-icon-wrapper">
<img class="yt-uix-button-icon yt-uix-button-icon-watch-unlike" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="${localizeString("tooltip.watch.idislikethis")}"><span class="yt-valign-trick"></span>
</span>
</button>
</span>`;
	},
	addTo: (data) => {
		return `<button onclick=";return false;" title="Watch Later" type="button" class="addto-button video-actions addto-watch-later-button-sign-in yt-uix-button yt-uix-button-default yt-uix-button-short yt-uix-tooltip" data-button-menu-id="shared-addto-watch-later-login" data-video-ids="${data}" role="button" data-tooltip-text="Watch Later">
<span class="yt-uix-button-content">
<img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Watch Later">
</span><img class="yt-uix-button-arrow" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="">
</button>`;
	},
	watchMoreRelated: (data) => {
		return `<button type="button" id="watch-more-related-button" onclick=";return false;" class=" yt-uix-button yt-uix-button-default" data-button-action="yt.www.watch.watch5.handleLoadMoreRelated" role="button">
<span class="yt-uix-button-content">${localizeString("buttons.suggestions.loadmoresuggestions")}</span>
</button>`;
	}
};