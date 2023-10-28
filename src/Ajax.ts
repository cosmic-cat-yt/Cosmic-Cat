import { CosmicCat } from "@/main";

export default class Ajax {
	cc: CosmicCat;

	constructor(cc: CosmicCat) {
		this.cc = cc;
	}

	async post(url, params, name, version): Promise {
		let Authorization = "";
		params = params ? params + "," : "";

		let body = `{${params} context: {client: {"clientName": "${name}", "clientVersion": "${version}", "hl": "en"}}}`;

		// Check if logged in
		if (this.cc.Utils.getCookie("SAPISID")) {
			Authorization = await this.cc.Account.getSApiSidHash();
		}

		// Fetch
		const response = await fetch("https://www.youtube.com" + url + "?key=AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8&prettyPrint=false", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-Goog-AuthUser": "1",
				"X-Goog-Visitor-Id": "",
				"X-Youtube-Client-Version": "17.33",
				"X-Youtube-Bootstrap-Logged-In": "true",
				"X-Youtube-Client-Name": "1",
				"X-Origin": "https://www.youtube.com",
				Authorization
			},
			body: body
		})
		.catch(err => {
			this.cc.Alert(1, "Cosmic Cat Error: Failed to fetch resource. Check console for more details.");
			console.error("[Ajax] Failed to fetch resource at \"" + url + "\":\n", err);
		});
		return response.json();
	}
	async Fetch(url, callback) {
		if (!url) return console.error("[Ajax] Parameters must be supplied!");

		return await fetch(url).then(a =>
		  this.cc.Utils.convertXHRtoJSON(a.text())
		).then(
			res => (callback) ? callback(res) : res
		).catch(e => {
			this.cc.Alert(1, "Cosmic Cat Error: Failed to fetch resource. Check console for more details.");
			console.error("[Ajax] Failed to fetch resource at \"" + url + "\":\n", e);
		});
	}
}