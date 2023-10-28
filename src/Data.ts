import DARK_YOUTUBE_LOGO from "./img/darkyoutubelogo.png";
import DARK_NOISEBG from "./img/darknoisebg.png";

export default class Data {
	version: int = 1;
	loggedin: boolean = false;
	homeCategories: string[] = [
		"trending",
		"popular",
		"music",
		"live",
		"gadgets",
		"news",
		"sports",
		"education",
		"howto"
	];
	darkyoutubelogo: string = DARK_YOUTUBE_LOGO;
	i18nfolder: string = "https://raw.githubusercontent.com/cosmic-cat-yt/cosmic-cat-i18n/main/i18n/";
	darknoisebg: string = DARK_NOISEBG;
	loginUrl: string = "https://accounts.google.com/ServiceLogin?service=youtube&uilel=3&passive=true&continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Faction_handle_signin%3Dtrue%26app%3Ddesktop%26hl%3Den%26next%3Dhttps%253A%252F%252Fwww.youtube.com%252F&hl=en&ec=65620";
	lang = {
		"af": "Afrikaans",
		"ar": "",
		"az": "Azərbaycan",
		"bs": "Bosanski",
		"ca": "Català",
		"cs": "Čeština",
		"da": "Dansk",
		"de": "Čeština",
		"en": "English",
		"en-GB": "English (UK)",
		"en-IN": "English (India)",
		"es": "Español (España)",
		"es-419": "Español (España)",
		"es-US": "Español (US)",
		"et": "Eesti",
		"eu": "Euskara",
		"fa": "",
		"fi": "Suomi",
		"fil": "Filipino",
		"fr": "Français",
		"fr-CA": "Français (Canada)",
		"gl": "Galego",
		"hr": "Hrvatski",
		"hu": "Magyar",
		"ja": "日本語",
		"pl": "Polski"
	}
}