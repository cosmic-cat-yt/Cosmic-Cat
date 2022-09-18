(async () => {
if(window.location.pathname.split("/")[1].match(/channel|user|^c{1}$/i)) {
    if (/community|videos|about|channels|playlists|membership|store/.test(window.location.pathname.split("/")[3])) window.location.href = window.location.pathname.split("/").slice(0,3).join("/");
    const channelCSS = document.createElement("link");
    channelCSS.setAttribute("rel", "stylesheet");
    channelCSS.setAttribute("id", "www-yt-channel");
    channelCSS.setAttribute("href", "//s.ytimg.com/yts/cssbin/www-channels3-vfl745D-F.css");
    document.head.append(channelCSS);
    document.cosmicCat.pageRenderer.set("#content-container", document.cosmicCat.Channels.Renderer.preRender(document.cosmicCat.Utils.Sort.channelData(ytInitialData?.header?.c4TabbedHeaderRenderer)));
    let ihomev = ytInitialData.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer ? ytInitialData.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].channelVideoPlayerRenderer ? true : false : false;
    let data = {
        info: await document.cosmicCat.Channels.Fetch.Info(),
        //videos: await document.cosmicCat.Channels.Fetch.Videos(),
        //feed: await document.cosmicCat.Channels.Fetch.Feed(),
        subs: ytInitialData.header.c4TabbedHeaderRenderer?.subscriberCountText?.simpleText.split(" ")[0],
        HOMEVIDEO: (ihomev == true) ? ytInitialData.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].channelVideoPlayerRenderer : {}
    };
    document.cosmicCat.Channels.Renderer.render(data);
    document.head.querySelector("title").innerText = `${data.info.name}'s ${localizeString("global.channel")} - YouTube`;
    document.cosmicCat.func.waitForElm("#video-player").then(() => {
        document.cosmicCat.player.Create();
    });
}
})();