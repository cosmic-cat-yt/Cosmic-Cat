export default (data) => {
	let customBranding = `
<style id="custom-branding">
#channel-body {
background-color: rgb(204, 204, 204);
background-image: url(${data.header.bannerBg});
background-repeat: no-repeat;
background-position: center top;
}
</style>
`;
	return `<div id="channel-body" class="jsloaded">
<div id="channel-base-div">
${document.cosmicCat.Template.Channel.Channels2.playlistNavigator.Main(data)}
${document.cosmicCat.Template.Channel.Channels2.moduleContainer.Main(data)}
</div>
</div>
${data.header.bannerBg ? customBranding : ""}
<style id="channels-2.0_urgent-button">
.yt-subscription-button {
height: 2.0833em !important;
width: 69px !important;
padding: 0 .5em !important;
color: #000 !important;
font-weight: bold !important;
border-color: #ecc101 !important;
background: #ffe971 !important;
background-image: none !important;
background-image: -moz-linear-gradient(top,#fff9c1,#fed81c) !important;
background-image: -webkit-gradient(linear,left top,left bottom,from(#fff9c1),to(#fed81c)) !important;
filter: progid:DXImageTransform.Microsoft.Gradient(startColorStr=#fff9c1,endColorStr=#fed81c) !important;
}

.yt-subscription-button:hover {
border-color: #630 !important;
background: #ecc101 !important;
background-image: none !important;
background-image: -moz-linear-gradient(top,#fff9c1,#fed81c) !important;
background-image: -webkit-gradient(linear,left top,left bottom,from(#fff9c1),to(#fed81c)) !important;
filter: progid:DXImageTransform.Microsoft.Gradient(startColorStr=#fff9c1,endColorStr=#fed81c) !important;
}

.yt-subscription-button .subscribe-label,
.yt-subscription-button .subscribed-label,
.yt-subscription-button .unsubscribe-label {
display: inline;
}

.yt-subscription-button .yt-uix-button-icon-wrapper,
.yt-subscription-button:not(.subscribed) .subscribed-label,
.yt-subscription-button:not(.subscribed) .unsubscribe-label,
.yt-subscription-button.subscribed .subscribe-label,
.yt-subscription-button.subscribed:not(:hover) .unsubscribe-label,
.yt-subscription-button.subscribed:hover .subscribed-label {
display: none;
}

.yt-subscription-button.subscribed {
padding: 0 !important;
}
</style>`;
}