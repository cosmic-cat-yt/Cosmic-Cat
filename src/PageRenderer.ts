import { CosmicCat } from "@/main";

export default class PageRenderer {
	private cc: CosmicCat;
	
	constructor(cc: CosmicCat) {
		this.cc = cc;
	}

	public error() {
		try {
			this.cc.Alert(2, "Oops! Something went wrong with rendering the page. <a href=''>Click here</a> to refresh the page.");
		} catch {}
	}
	
	public set(selector, html) {
		this.original = selector;

		try {
			selector = document.querySelector(selector);
			selector.innerHTML = html;
		} catch(err) {
			//this.cc.pageRenderer.error();
			console.error(`[pageRenderer]: "${selector}" does not exist.\n`, err);
		}
	}
	
	public replace(selector1, selector2) {
		try {
			document.querySelector(selector1).outerHTML = selector2;
		} catch(err) {
			console.error(`[pageRenderer]: "${selector1}" does not exist.\n`, err);
		}
	}
	
	public add(selector, html) {
		this.original = selector;

		try {
			selector = document.querySelector(selector);
			selector.innerHTML += html;
		} catch(err) {
			//this.cc.pageRenderer.error();
			console.error(`[pageRenderer]: "${this.original}" does not exist\n`, err);
		}
	}
}