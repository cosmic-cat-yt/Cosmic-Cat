export default {
	Main: (data) => {
		const accountInfo = document.cosmicCat.Storage.get("accountInfo").value || {};
		return `<div id="comments-view" data-type="highlights" class="hid">
<div class="comments-section">
<h4><strong>${localizeString("watch.comments.topcomments")}</strong></h4>
<ul class="comment-list top hid"></ul>
</div>
<div class="comments-section">
<h4><strong>${localizeString("watch.comments.allcomments")}</strong> (${ytInitialData.contents.twoColumnWatchNextResults.results?.results?.contents?.find(b => b.itemSectionRenderer)?.itemSectionRenderer?.contents?.[0]?.commentsEntryPointHeaderRenderer?.commentCount?.simpleText || 0}) <a class="comments-section-see-all" href="https://www.youtube.com/all_comments?v=${data.id}">${localizeString("global.seeall")}</a></h4>
<div class="comments-post-container clearfix">
<div class="comments-post-alert ${document.cosmicCat.Storage.get("accountInfo").exists ? "hid": ""}">
<a href="${document.cosmicCat.data.loginUrl}">Sign In</a> or <a href="https://www.youtube.com/signup">Sign Up</a><span class="comments-post-form-rollover-text"> now to post a comment!</span>
</div>
<form class="comments-post ${document.cosmicCat.Storage.get("accountInfo").exists ? "" : "hid"}" method="post">
<input type="text" id="session" hidden="">
<div class="yt-alert yt-alert-default yt-alert-error hid comments-post-message">
<div class="yt-alert-icon">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" class="icon master-sprite" alt="Alert icon">
</div>
<div class="yt-alert-buttons"></div><div class="yt-alert-content" role="alert"></div></div>
<a href="/profile" class="yt-user-photo comments-post-profile">
<span class="video-thumb ux-thumb yt-thumb-square-46">
<span class="yt-thumb-clip">
<span class="yt-thumb-clip-inner">
<img src="${accountInfo.pfp}" alt="${accountInfo.name}" width="46"><span class="vertical-align"></span>
</span>
</span>
</span>
</a>
<div class="comments-textarea-container" onclick="document.cosmicCat.Comments.Form.init();">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="" class="comments-textarea-tip">
<label class="comments-textarea-label" data-upsell="comment">${localizeString("watch.comments.respond")}</label>  <div class="yt-uix-form-input-fluid yt-grid-fluid ">
<textarea id="" class="yt-uix-form-textarea comments-textarea" onfocus="document.cosmicCat.Comments.Form.init();" data-upsell="comment" name="comment"></textarea>
</div>
</div>
<p class="comments-remaining">
${localizeString("watch.comments.charactersremain")}
</p>
<p class="comments-threshold-countdown hid">
<span class="comments-threshold-count"></span> ${localizeString("watch.comments.secondsremain")}
</p>
<p class="comments-post-buttons">
<button type="submit" class="comments-post yt-uix-button yt-uix-button-default" onclick=";return true;" role="button">
<span class="yt-uix-button-content">${localizeString("buttons.comments.post")} </span>
</button>
</p>
</form>
</div>
<ul class="comment-list all hid"></ul>
</div>
<div class="comments-section">
<div class="comments-pagination" data-Ajax-enabled="true">
<div class="yt-uix-pager" role="navigation">
<a id="next-btn" onclick="document.cosmicCat.Comments.next(this.getAttribute('data-token'), this.getAttribute('data-page'))" class="yt-uix-button yt-uix-sessionlink yt-uix-pager-button yt-uix-button-default hid" data-page="2"><span class="yt-uix-button-content">Next »</span></a>
</div>
</div>
</div>
<ul>
<li class="hid" id="parent-comment-loading">${localizeString("global.loading.comment")}</li>
</ul>
<div id="comments-loading">${localizeString("global.loading.main")}</div>
</div>
</div>`;
	},
	Comment: (data) => {
		return `<li class="comment yt-tile-default" data-author-id="${data.author.id}" data-id="${data.id}" data-score="-1">
<div class="comment-body">
<div class="content-container">
<div class="content">
<div class="comment-text" dir="ltr">
<p>${data.text}</p>
</div>
<p class="metadata">
<span class="author">
<a href="${data.author.url}" class="yt-uix-sessionlink yt-user-name" data-sessionlink="" dir="ltr">${data.author.name}</a>
</span>
<span class="time" dir="ltr">
<a dir="ltr" href="https://www.youtube.com/watch?v=${data.id}&lc=${data.id}">${data.time}</a>
</span>
${data.likes ? `<span dir="ltr" class="comments-rating-positive" title="">
${data.likes}<img class="comments-rating-thumbs-up" style="vertical-align: bottom !important;" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif">
</span>` : ""}
</p>
</div>
<div class="comment-actions">
<span class="yt-uix-button-group">
<button type="button" class="start comment-action-vote-up comment-action yt-uix-button yt-uix-button-default yt-uix-tooltip yt-uix-button-empty" onclick=";return false;" title="Vote Up" data-action="vote-up" data-tooltip-show-delay="300" role="button">
<span class="yt-uix-button-icon-wrapper">
<img class="yt-uix-button-icon yt-uix-button-icon-watch-comment-vote-up" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Vote Up">
<span class="yt-valign-trick"></span>
</span>
</button><button type="button" class="end comment-action-vote-down comment-action yt-uix-button yt-uix-button-default yt-uix-tooltip yt-uix-button-empty" onclick=";return false;" title="Vote Down" data-action="vote-down" data-tooltip-show-delay="300" role="button">
<span class="yt-uix-button-icon-wrapper">
<img class="yt-uix-button-icon yt-uix-button-icon-watch-comment-vote-down" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Vote Down">
<span class="yt-valign-trick"></span>
</span>
</button>
</span>
<span class="yt-uix-button-group">
<button type="button" class="start comment-action yt-uix-button yt-uix-button-default" onclick=";return false;" data-action="reply" role="button">
<span class="yt-uix-button-content">Reply </span>
</button><button type="button" class="end yt-uix-button yt-uix-button-default yt-uix-button-empty" onclick=";return false;" data-button-has-sibling-menu="true" role="button" aria-pressed="false" aria-expanded="false" aria-haspopup="true" aria-activedescendant="">
<img class="yt-uix-button-arrow" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="">
<div class=" yt-uix-button-menu yt-uix-button-menu-default" style="display: none;">
<ul>
<li class="comment-action-remove comment-action" data-action="remove">
<span class="yt-uix-button-menu-item">Remove</span>
</li>
<li class="comment-action" data-action="flag">
<span class="yt-uix-button-menu-item">Flag for spam</span>
</li>
<li class="comment-action-block comment-action" data-action="block">
<span class="yt-uix-button-menu-item">Block User</span>
</li>
<li class="comment-action-unblock comment-action" data-action="unblock">
<span class="yt-uix-button-menu-item">Unblock User</span>
</li>
</ul>
</div>
</button>
</span>
</div>
</div>
</div>
</li>`;
	},
}