export default (param, msg) => {
	let type = "";

	switch (param) {
		case 0:
			type = "info";
			break;
		case 1:
			type = "warn";
			break;
		case 2:
			type = "error";
			break;
	}

	return `<div class="yt-alert yt-alert-default yt-alert-${type}" style="display: block;">
<div class="yt-alert-icon">
<img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" class="icon master-sprite" alt="Alert icon">
</div>
<div class="yt-alert-buttons">
<button type="button" class="close yt-uix-close yt-uix-button yt-uix-button-close" onclick="document.cosmicCat.toggleElm('.yt-alert-default');return false;" data-close-parent-class="yt-alert" role="button">
<span class="yt-uix-button-content">Close</span>
</button>
</div>
<div class="yt-alert-content" role="alert"><span class="yt-alert-vertical-trick"></span>
<div class="yt-alert-message">${msg}</div>
</div></div>`;
}