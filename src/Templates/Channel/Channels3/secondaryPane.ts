export default {
	Main: (data) => {
		return `<div class="secondary-pane">
<div class="user-profile channel-module yt-uix-c3-module-container">
<div class="module-view profile-view-module" data-owner-external-id="BR8-60-B28hp2BmDPdntcQ">
<h2>${localizeString("channels.3.body.secondaryPane.userProfile.about", data?.header?.name)}</h2>
${document.cosmicCat.Template.Channel.Channels3.secondaryPane.firstSection.Main(data)}
${document.cosmicCat.Template.Channel.Channels3.secondaryPane.createdBySection.Main(data)}
</div>
</div>`;
	},
	firstSection: {
		Main: (data) => {
			return `<div class="section first">
<div class="user-profile-item profile-description">
<p>${data?.info?.fields?.description}</p>
</div>
<div class="user-profile-item profile-socials">
</div>
<hr class="yt-horizontal-rule">
</div>`;
		},
		socialLink: (data) => {
			return `<div class="yt-c3-profile-custom-url field-container">
<a href="https://${data.link.content}" rel="me nofollow" target="_blank" title="${data.title.content}" class="yt-uix-redirect-link">
<img src="//www.google.com/s2/favicons?sz=64&domain=${data.link.content?.split("/")?.[0]}" class="favicon" alt="${data.title.simpleText}"><span class="link-text">${data.title.content}</span>
</a>
</div>`;
		}
	},
	createdBySection: {
		Main: (data) => {
			return `<div class="section created-by-section">
<div class="user-profile-item">${localizeString("channels.3.body.secondaryPane.userProfile.createdBy.by", data.header?.gameBy || data.header?.tag || data.header?.name)}</div>
<ul>
${document.cosmicCat.Template.Channel.Channels3.secondaryPane.createdBySection.Item(data.info)}
</ul>
</div>`;
		},
		Item: (data) => {
			let fields = "";
			for (const info in data.fields) {
				if (data.fields[info] && !info.match(/description|views/i)) {
					fields += `<li class="user-profile-item">
<span class="item-name">${localizeString("channels.2.modules.userProfile.cards." + info)}</span>
<span class="value">${data.fields[info]}</span>
</li>`;
				}
			}
			return fields;
		}
	}
}