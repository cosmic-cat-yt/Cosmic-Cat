export default (data) => {
return `<div id="content">
<div id="branded-page-default-bg" class="ytg-base">
<div id="branded-page-body-container" class="ytg-base clearfix enable-fancy-subscribe-button">
${document.cosmicCat.Channels.isOwner() ? document.cosmicCat.Template.Channel.Channels3.creatorBar.Main(data) : ""}
${document.cosmicCat.Template.Channel.Channels3.Header(data)}
${document.cosmicCat.Template.Channel.Channels3.Content(data)}
</div>
${data.header.bannerBg ? `
<style>
#branded-page-body-container {
background-color: #111111;
background-image: url(${data.header.bannerBg});
background-repeat: no-repeat;
background-position: center top;
}
</style>
` : ""}
</div>
</div>`;
};