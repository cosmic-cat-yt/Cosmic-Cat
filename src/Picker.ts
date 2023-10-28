import { CosmicCat } from "@/main";

export default class Picker {
	private cc: CosmicCat;
	
	constructor(cc: CosmicCat) {
		this.cc = cc;
	}

	public load(a, b) {
		this.cc.Ajax.post(`/youtubei/v1/account/account_menu`, "", "WEB", "2.20230331.00.00").then((a) => {
			var c = a.actions[0].openPopupAction.popup.multiPageMenuRenderer.sections[2].multiPageMenuSectionRenderer.items.find(a => a?.compactLinkRenderer?.icon?.iconType);
			console.log(c);
		});
		console.log(a, b)
	}
}