import { CosmicCat } from "@/main";

export default class Account {
	cc: CosmicCat;

	constructor(cc: CosmicCat) {
		this.cc = cc;
	}

	async getSApiSidHash(): Promise<string> {
		function sha1(str) {
			return window.crypto.subtle.digest("SHA-1", new TextEncoder("utf-8").encode(str)).then(buf => {
				return Array.prototype.map.call(new Uint8Array(buf), x=>(('00'+x.toString(16)).slice(-2))).join('');
			});
		}

		const MS = Date.now().toString();
		const TIMESTAMP = MS.substring(0, MS.length - 3);
		const digest = await sha1(`${TIMESTAMP} ${document.cosmicCat.Utils.getCookie("SAPISID")} https://www.youtube.com`);

		return `SAPISIDHASH ${TIMESTAMP}_${digest}`;
	}
	async fetch() {
		let isLoggedIn = await fetch("/getAccountSwitcherEndpoint").then(re => re.text()).then(re => {
			return JSON.parse(re.slice(5));
		}).catch(err => console.error("[Accounts] Failed to fetch account data:\n", err));
		let BOOL_LOGIN = false;

		try {
			BOOL_LOGIN = !isLoggedIn.ok;
		} catch {
			BOOL_LOGIN = false;
		}

		if(BOOL_LOGIN == true) {
			this.cc.Account.updateLogin(isLoggedIn);
		}
	}
	updateLogin(isLoggedIn) {
		let popup = isLoggedIn.data.actions[0].getMultiPageMenuAction.menu.multiPageMenuRenderer.sections[0].accountSectionListRenderer;
		let accountItem = popup.contents[0].accountItemSectionRenderer.contents.find(a => a.accountItem.isSelected == true)?.accountItem;
		let google = popup.header.googleAccountHeaderRenderer;
		this.cc.data.loggedin = true;
		this.cc.Storage.add("accountInfo", {
			name: accountItem.accountName.simpleText,
			pfp: accountItem.accountPhoto.thumbnails[0].url,
			link: accountItem.navigationEndpoint,
			email: google.email.simpleText
		});
	}
	checkLogin() {
		fetch("/getAccountSwitcherEndpoint").then(re => re.text()).then(re => {
			var a = JSON.parse(re.slice(5));
			var b = a.data.actions[0].getMultiPageMenuAction.menu.multiPageMenuRenderer.sections[0].accountSectionListRenderer;

			if (this.cc.Storage.get("accountInfo").value.name !== b.contents[0].accountItemSectionRenderer.contents.find(a => a.accountItem.isSelected == true)?.accountItem.accountName.simpleText) {
				this.cc.Account.updateLogin(a);
			}
		}).catch(err => console.error(err));
	}
	isLoggedIn() {
		if (!this.cc.Utils.getCookie("SAPISID") && this.cc.Storage.get("accountInfo").exists) {
			alert("Cosmic Cat\n\nUnsafe_logout_detected:\nDO NOT TYPE \"/logout\" INTO THE URL BAR!\nTHIS WILL CAUSE STUFF TO BREAK!");
			return this.cc.Account.logout();
		}
		return this.cc.Storage.get("accountInfo").exists;
	}
	logout() {
		this.cc.Storage.remove("accountInfo");
		(this.cc.Storage.get("greeting_feed").value == "subscriptions") && this.cc.Storage.add("greeting_feed", "youtube");
		window.location.href = "/logout?cleared_storage=1";
	}
}