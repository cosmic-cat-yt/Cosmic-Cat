export default {
	Main: (data) => {
		return `<div class="outer-box" id="main-channel-content" style="z-index: 0">
<div class="left-column" id="main-channel-left"></div>
<div class="right-column" id="main-channel-right"></div>
<div class="cb"></div>
</div>`;
	},
	profile: (data) => {
		return `<div class="inner-box" id="module-profile">
<div style="float:left;padding:0 4px 4px 0" class="link-as-border-color">
<div class="user-thumb-xlarge">
<div>
<a href="${data.url}">
<img src="${data.avatar}">
</a>
</div>
</div>
</div>
<div style="float:left;width:170px">
<div class="box-title title-text-color" title="${data.name}" style="float:none;padding-left:4px;margin-top:-2px;width:170px;overflow:hidden;font-size:111%">
<span class="yt-user-name" dir="ltr">${data.name}</span>
</div>
<div style="whitespace:no-wrap;position:relative;width:170px;">
<div>
${document.cosmicCat.Template.Buttons.Subscribe(data.id)}
<div class="cb"></div>
</div>
<div style="padding:4px">
<a href="#" onclick="add_friend('${data.id}'); return false;">Add as Contact</a>
&nbsp;|&nbsp;
<span class="nowrap">
<a id="aProfileBlockUser" href="#" onclick="yt.www.watch.user.blockUserLinkByUsername('${data.id}', true);return false;">Block User</a>
&nbsp;|&nbsp;</span>
<span class="nowrap">
<a id="aProfileSendMsg" href="https://www.youtube.com/inbox?to_user_ext_ids=${data.id}&amp;action_compose=1">Send Message</a>
</span>
</div>
</div>
</div>
<div id="position-edit-subscription-in-channel"></div>
<div class="cb"></div>
</div>`;
	},
	userInfo: (data) => {
		let fields = "";
		for (const info in data.fields) {
			if (data.fields[info]) {
				fields += `<div class="show_info outer-box-bg-as-border">
<div class="profile-info-label">${localizeString("channels.2.modules.userProfile.cards." + info)}</div>
<div class="profile-info-value fn" id="profile_show_${info}">${data.fields[info]}</div>
<div class="cb"></div>
</div>`;
			}
		}
		return `<div class="inner-box" id="user_profile">
<div class="box-title title-text-color">${localizeString("channels.2.modules.userProfile.title")}</div>
<div class="box-editor"></div>
<div class="cb"></div>
<div id="user_profile-body">
<div id="user_profile-messages" class="hid"></div>
<div class="edit_info spacer">&nbsp;</div>
<div class="profile_info vcard">
<div class="show_info outer-box-bg-as-border">
<div class="profile-info-label">${localizeString("channels.2.modules.userProfile.cards.name")}</div>
<div class="profile-info-value fn" id="profile_show_name">${data.name}</div>
<div class="cb"></div>
</div>
${fields}
</div>
</div>
<div class="cb"></div>
</div>`;
	}
};