import { CosmicCat } from "@/main";

export default class Settings {
	cc: CosmicCat = null;
	
	constructor(cc: CosmicCat) {
		this.cc = cc;
	}

	toggleOption(a) {
		if (a.checked !== undefined) {
			a.value = a.checked ? 1 : 0;
		}
		this.cc.Storage.add(a.dataset.storage, a.value);
		this.cc.Alert(0, `Changed setting ${a.dataset.storage} to ${a.value}`);
		(this.cc.Settings[a.dataset.action] || this.cc.null)();
	}
	
	toggleTab(a) {
		document.querySelector(".individual-feed.selected").classList.add("hid");
		document.querySelector(".individual-feed.selected").classList.remove("selected");
		document.querySelector(".guide-item-container.selected-child").classList.remove("selected-child");
		document.querySelector(".guide-item.selected").classList.remove("selected");
		a.classList.add("selected-child");
		a.children[0].classList.add("selected");
		document.querySelector("#feed-main-" + a.children[0].dataset.feedName).classList.remove("hid");
		document.querySelector("#feed-main-" + a.children[0].dataset.feedName).classList.add("selected");
	}
	
	toggleDarkTheme(a) {
		if (document.querySelector("#www-yt-dark")) {
			document.querySelector("#www-yt-dark").remove();
		} else {
			const a = document.createElement("style");
			a.setAttribute("id", "www-yt-dark");
			a.innerText = OBJ_STYLE_DARK;
			document.head.append(a);
		}
	}
}