import { CosmicCat } from "@/main";

export default class Actions {
	private cc: CosmicCat;
	
	constructor(cc: CosmicCat) {
		this.cc = cc;
	}

	public handleButton(b, a) {
		return (b.dataset.buttonAction?.slice(7)?.split('.')?.reduce((o,i)=> o[i]||"", this.cc) || this.cc.null)(b, b.dataset);
	}
	
	public async handleSubscribeButton(a, b) {
		let classn = "";

		let d = a.dataset.subscriptionValue;
		let c = (a.classList.contains("subscribed") || a.classList.contains("yt-subscription-button-green")) ? "unsubscribe" : "subscribe";

		switch(this.cc.Utils.currentPage()) {
			case "channels2":
				classn = ".subscription-container";
				d = a.parentElement.dataset.subscriptionValue;
				break;
			case "watch":
			case "channels":
				classn = ".yt-subscription-button-hovercard";
				break;
			case "playlist":
				classn = ".enable-fancy-subscribe-button";
		}

		console.debug("[handleSubscribeButton]:", d, c);

		try {
			this.cc.Ajax.post(`/youtubei/v1/subscription/${c}`, `channelIds: ["${d}"]`, "WEB", "2.20230331.00.00").then((a) => {
				console.debug("[handleSubscribeButton]:", a);
				this.cc.Channels.toggleSubscribe();
				this.cc.pageRenderer.replace(classn, this.cc.Template.Buttons.Subscribe(d));
			});
		} catch(err) {
			console.error(`[Subscribe] Something went wrong with subscribing to ${d}:\n`, err);
		}
	}
	
	public handleSettingsButton(a, b) {
		return this.cc.Settings.toggleOption(a, a.dataset);
	}
	
	public handleSettingsTab(a, b) {
		return this.cc.Settings.toggleTab(a, a.dataset);
	}
	
	public handleGuideItem(a, b) {
		this.cc.Home.Feed.load(a.children[0]);
	}
	
	public handleExpander() {
		this.cc.toggleElm("#masthead-expanded");
	}
}