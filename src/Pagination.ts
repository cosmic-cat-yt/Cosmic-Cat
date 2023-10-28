export default class Pagination {
	sortDataIntoArray(api) {
		let obj = [];

		try {
			obj = api?.[0].appendContinuationItemsAction.continuationItems;
		} catch {
			obj = api?.[1]?.reloadContinuationItemsCommand.continuationItems;
		}

		return obj;
	}
	
	nextNumberButton(continuation, number, type) {
		number = Number(number);
		let commCount = number;
		let ana = () => {
			document.querySelector(".yt-uix-button-toggled").classList.remove("yt-uix-button-toggled");
			document.querySelector(`[data-page='${number}']`).classList.add("yt-uix-button-toggled");
			let ded = document.querySelector("#next-btn");
			ded.setAttribute("data-page", number + 1);
		};
		if (document.querySelector(`.yt-pp[data-page='${number}']`)) {
			ana();
		} else {
			if (number !== 0) {
				let abc = document.querySelector(".yt-uix-pager");
				let bcd = document.querySelector(".yt-uix-button-toggled");
				let def = document.createElement("a");
				let ded = document.querySelector("#next-btn");
				def.setAttribute("class", "yt-uix-button yt-uix-sessionlink yt-uix-pager-button yt-uix-button-toggled yt-uix-button-default yt-pp");
				def.setAttribute("data-page", number);
				def.setAttribute("onclick", `document.cosmicCat.${type}.next(this.getAttribute('data-token'), this.getAttribute('data-page'))`);
				def.setAttribute("aria-label", `Go to page ${number}`);
				def.setAttribute("data-token", continuation);
				def.innerHTML = `<span class="yt-uix-button-content">${number}</span>`;
				ded.setAttribute("data-page", commCount + 1);
				if (bcd) {
					bcd.classList.remove("yt-uix-button-toggled");
				}
				abc.insertBefore(def, document.querySelector("#next-btn"));
			}
		}
	}
}