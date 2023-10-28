export default {
	Main: () => {
		return `<div id="masthead" class="" dir="ltr">
<a id="logo-container" href="https://www.youtube.com/" title="YouTube home">
<img id="logo" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="YouTube home">
</a>
<div id="masthead-user-bar-container">
<div id="masthead-user-bar">
<div id="masthead-user">

</div>
</div>
</div>
<div id="masthead-search-bar-container">
<div id="masthead-search-bar">
<div id="masthead-nav">
<a href="https://www.youtube.com/feed/explore">${localizeString("global.browse")}</a>
<span class="masthead-link-separator">|</span>
<a href="https://www.youtube.com/feed/storefront?feature=mh">Movies</a>
<span class="masthead-link-separator">|</span>
<a href="https://youtube.com/upload">${localizeString("global.upload")}</a>
</div>
<form id="masthead-search" class="search-form consolidated-form" action="https://www.youtube.com/results" onsubmit="if (document.body.querySelector('#masthead-search-term').value == '') return false;">
<button class="search-btn-compontent search-button yt-uix-button yt-uix-button-default" onclick="if (document.querySelector('#masthead-search-term').value == '') return false; document.querySelector('#masthead-search').submit(); return false;;return true;" type="submit" id="search-btn" dir="ltr" tabindex="2" role="button">
<span class="yt-uix-button-content">${localizeString("global.search")}</span>
</button>
<div id="masthead-search-terms" class="masthead-search-terms-border" dir="ltr" style="border-color: rgb(192, 192, 192) rgb(217, 217, 217) rgb(217, 217, 217);">
<label>
<input id="masthead-search-term" onfocus="document.querySelector('#masthead-search').classList.add('focused');document.querySelector('#masthead-search-terms').setAttribute('style', 'border-color: rgb(77, 144, 254)')" onblur="document.querySelector('#masthead-search').classList.remove('focused');document.querySelector('#masthead-search-terms').setAttribute('style', 'border-color: rgb(192, 192, 192) rgb(217, 217, 217) rgb(217, 217, 217);')" autocomplete="off" class="search-term" name="search_query" value="" type="text" tabindex="1" title="${localizeString("global.search")}" dir="ltr" spellcheck="false" style="outline: currentcolor none medium;">
</label>
</div>
<input type="hidden" name="oq">
<input type="hidden" name="aq">
<input type="hidden" name="aqi">
<input type="hidden" name="aql">
<input type="hidden" name="gs_sm">
<input type="hidden" name="gs_upl">
</form>
</div>
</div>
</div>
<div id="alerts"></div>`;
	},
	User: {
		loggedIn: () => {
			return `<span id="masthead-gaia-user-expander" class="masthead-user-menu-expander masthead-expander">
<span id="masthead-gaia-user-wrapper" class="yt-rounded" tabindex="0">${document.cosmicCat.Storage.get("accountInfo").value.name}</span></span>
<span id="masthead-gaia-photo-expander" class="masthead-user-menu-expander masthead-expander">
<span id="masthead-gaia-photo-wrapper" class="yt-rounded">
<span id="masthead-gaia-user-image">
<span class="clip">
<span class="clip-center">
<img src="${document.cosmicCat.Storage.get("accountInfo").value.pfp}" alt="">
<span class="vertical-center"></span>
</span>
</span>
</span>
<span class="masthead-expander-arrow"></span>
</span>
</span>`;
		},
		loggedOut: () => {
			return `<div id="masthead-user-display">
<span id="masthead-user-wrapper">
<button href="${document.cosmicCat.data.loginUrl}" type="button" id="masthead-user-button" onclick=";window.location.href=this.getAttribute('href');return false;" class="yt-uix-button yt-uix-button-text" role="button">
<span class="yt-uix-button-content">
<span id="masthead-user-image">
<span class="clip">
<span class="clip-center">
<img src="//s.ytimg.com/yts/img/silhouette48-vflLdu7sh.png" alt="">
<span class="vertical-center"></span>
</span>
</span>
</span>
<span class="masthead-user-username">${localizeString("buttons.signin")}</span>
</span>
</button>
</span>
</div>`;
		}
	},
	Expander: () => {
		return `<div id="masthead-expanded" class="hid">
<div id="masthead-expanded-container" class="with-sandbar">
<div id="masthead-expanded-menus-container">
<span id="masthead-expanded-menu-shade"></span>
<div id="masthead-expanded-google-menu">
<span class="masthead-expanded-menu-header">${localizeString("personal.googleaccount")}</span>
<div id="masthead-expanded-menu-google-container">
<img id="masthead-expanded-menu-gaia-photo" alt="" src="${document.cosmicCat.Storage.get("accountInfo").value.pfp}">
<div id="masthead-expanded-menu-account-info">
<p>${document.cosmicCat.Storage.get("accountInfo").value.name}</p>
<p id="masthead-expanded-menu-email">${document.cosmicCat.Storage.get("accountInfo").value.email}</p>
</div>
<div id="masthead-expanded-menu-google-column1">
<ul>
<li class="masthead-expanded-menu-item"><a href="https://profiles.google.com?authuser=0">${localizeString("personal.profile")}</a></li>
<li class="masthead-expanded-menu-item"><a href="https://plus.google.com/u/0/stream">Google+</a></li>
<li class="masthead-expanded-menu-item"><a href="https://plus.google.com/u/0/settings/privacy">${localizeString("personal.privacy")}</a></li>
</ul>
</div>
<div id="masthead-expanded-menu-google-column2">
<ul>
<li class="masthead-expanded-menu-item">
<a href="/cosmic_cat">${localizeString("personal.settings")}</a>
</li>
<li class="masthead-expanded-menu-item">
<a class="end" href="javascript:document.cosmicCat.Account.logout();">${localizeString("personal.signout")}</a>
</li>
<li class="masthead-expanded-menu-item">
<a href="/channel_switcher" onclick="yt.www.masthead.accountswitch.toggle(); return false;">${localizeString("personal.switchaccount")}</a>
</li>
</ul>
</div>
</div>
</div>
<div id="masthead-expanded-menu">
<span class="masthead-expanded-menu-header">YouTube</span>
<ul id="masthead-expanded-menu-list">
<li class="masthead-expanded-menu-item">
<a href="/profile?feature=mhee">${localizeString("personal.mychannel")}</a>
</li>
<li class="masthead-expanded-menu-item">
<a href="/my_videos?feature=mhee">${localizeString("personal.videomanager")}</a>
</li>
<li class="masthead-expanded-menu-item">
<a href="/?c=subscriptions" onclick="document.cosmicCat.load.home_category(document.querySelector('[data-feed-name=subscriptions]')); return false;">${localizeString("personal.subscriptions")}</a>
</li>
<li class="masthead-expanded-menu-item">
<a href="/account?feature=mhee">${localizeString("personal.youtubesettings")}</a>
</li>
</ul>
</div>
</div>
<div id="masthead-expanded-sandbar">
<div id="masthead-expanded-lists-container">
<div id="masthead-expanded-loading-message">${localizeString("global.loading.main")}</div>
</div>
</div>
<div class="clear"></div>
</div>
</div>`;
	}
}