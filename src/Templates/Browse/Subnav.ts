export default {
	Main: () => {
		let items = "";
		let a = ytInitialData.contents.twoColumnBrowseResultsRenderer.tabs;
		for (let i = 0; i < a.length; i++) {
			items += document.cosmicCat.Template.Browse.Subnav.navItem(a[i].tabRenderer.title);
		}
		return `<div id="masthead-subnav" class="yt-nav yt-nav-dark">
<ul>${items}</ul>
</div>`;
	},
	navItem: (data) => {
		return `<li>
<span class="yt-nav-item">${data}</span>
</li>`;
	}
};