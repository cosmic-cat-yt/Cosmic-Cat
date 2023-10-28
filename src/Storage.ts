export default class Storage {
	public init() {
		const STORAGE = localStorage.getItem("cosmic-cat-config");
		console.debug("Storage.init", STORAGE);

		if(!STORAGE) return this.build();

		console.info("Storage.init", "storage has init.");
	}
	
	public build() {
		const obj = {
			"storageVer": "0",
			"lang": "en",
			"dark": "0",
			"i18n": {},
			"i18n.setup": "0",
			"iframe": "1",
			"channel_mode": "3",
			"greeting_feed": "youtube"
		};
		localStorage.setItem("cosmic-cat-config", JSON.stringify(obj));
	}
	
	public get(a) {
		const STORAGE = JSON.parse(localStorage.getItem("cosmic-cat-config"));

		return {
			name: a,
			exists: !!STORAGE[a],
			value: STORAGE[a]
		};
	}
	
	public add(a, b) {
		let obj = JSON.parse(localStorage.getItem("cosmic-cat-config"));
		obj[a] = b;
		console.debug("Storage.add", obj[a]);
		localStorage.setItem("cosmic-cat-config", JSON.stringify(obj));
	}
	
	public remove(a) {
		const STORAGE = JSON.parse(localStorage.getItem("cosmic-cat-config"));
		delete STORAGE[a];
		localStorage.setItem("cosmic-cat-config", JSON.stringify(STORAGE));
	}
}