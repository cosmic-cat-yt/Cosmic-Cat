import { CosmicCat } from "@/main";

export default class Comments {
	cc: CosmicCat;
	
	constructor(cc: CosmicCat) {
		this.cc = cc;
	}

	async init(continuation) {
		if (!continuation) return this.cc.toggleElm("#comments-view");

		let api = await this.cc.Ajax.post("/youtubei/v1/next", `continuation: "${continuation}"`, "WEB", "2.20230331.00.00");
		if (!api) return this.abort();

		try {
			var session = "";

			try {
				session = api.onResponseReceivedEndpoints[0].reloadContinuationItemsCommand.continuationItems[0].commentsHeaderRenderer.createRenderer.commentSimpleboxRenderer.submitButton.buttonRenderer.serviceEndpoint.createCommentEndpoint.createCommentParams;
			} catch(err) {
				try {
					session = api.onResponseReceivedEndpoints[0].reloadContinuationItemsCommand.continuationItems[0].commentsHeaderRenderer.createRenderer.commentSimpleboxRenderer.submitButton.buttonRenderer.serviceEndpoint.channelCreationServiceEndpoint.zeroStepChannelCreationParams.zeroStepCreateCommentParams.createCommentParams;
				} catch(err) {
					throw new Error(err);
				}
			}
			if(api.responseContext.mainAppWebResponseContext.loggedOut == false && document.querySelector("#session").getAttribute("data-yes") !== "yes") {
				document.querySelector("#session").setAttribute("data-yes", "yes");
				document.querySelector("#session").value = session;
			}
		} catch(err) {
			console.error("[Comments] Couldn't check if user is logged in or out:", err);
		}

		const sortMenuTokens = this.sortMenuTokens(api);
		let sortedCommentsArray = this.cc.Pagination.sortDataIntoArray(api.onResponseReceivedEndpoints);

		if (!sortedCommentsArray) return this.abort();

		sortedCommentsArray = sortedCommentsArray.splice(0, 2);

		const comments = this.sortComments(sortedCommentsArray, "top");

		document.querySelector(".comment-list.top").innerHTML = comments.result;

		this.cc.toggleElm(".comment-list.top");
		await this.cc.Comments.load(sortMenuTokens.newest);

	}
	async load(continuation) {
		if (!continuation) return this.cc.toggleElm("#next-btn");

		let api = await this.cc.Ajax.post("/youtubei/v1/next", `continuation: "${continuation}"`, "WEB", "2.20230331.00.00");
		if (!api) return this.abort();

		let sortedCommentsArray = this.cc.Pagination.sortDataIntoArray(api.onResponseReceivedEndpoints);

		const comments = this.sortComments(sortedCommentsArray, "all");

		this.cc.Pagination.nextNumberButton(continuation, 1, "Comments");

		document.querySelector(".comment-list.all").innerHTML = comments.result;

		this.cc.toggleElm(".comment-list.all");
		this.cc.toggleElm("#comments-loading");
	}
	abort() {
		this.cc.toggleElm("#comments-loading");
	}
	sortComments(params, am) {
		let result = {result: "", con: ""};
		for (let i = 0; i < params.length; i++) {
			if (params[i].commentThreadRenderer) {
				if (am == "top" || params[i].commentThreadRenderer.renderingPriority !== "RENDERING_PRIORITY_PINNED_COMMENT"){
					result.result += this.cc.Template.Comments.Comment(this.cc.Utils.Sort.commentData(params[i].commentThreadRenderer.comment.commentRenderer));
				}
			}
			if (params[i].continuationItemRenderer && am == "all") {
				const aaaa = document.querySelector("#next-btn");
				if (aaaa.classList.contains("hid")) {
					this.cc.toggleElm("#next-btn");
				}
				aaaa.setAttribute("data-token", params[i].continuationItemRenderer.continuationEndpoint.continuationCommand.token);
				result.con += `${params[i].continuationItemRenderer.continuationEndpoint.continuationCommand.token}`;
			}
		}

		return result;
	}
	sortMenuTokens(obj) {
		return {
			top: obj.onResponseReceivedEndpoints[0].reloadContinuationItemsCommand.continuationItems[0].commentsHeaderRenderer.sortMenu.sortFilterSubMenuRenderer.subMenuItems[0].serviceEndpoint.continuationCommand.token,
			newest: obj.onResponseReceivedEndpoints[0].reloadContinuationItemsCommand.continuationItems[0].commentsHeaderRenderer.sortMenu.sortFilterSubMenuRenderer.subMenuItems[1].serviceEndpoint.continuationCommand.token
		};
	}
	async next(continuation, number) {
		if (!continuation) return this.cc.toggleElm("#next-btn");
		this.cc.toggleElm("#comments-loading");

		let api = await this.cc.Ajax.post("/youtubei/v1/next", `continuation: "${continuation}"`, "WEB", "2.20230331.00.00");
		if (!api) return this.abort();

		let sortedCommentsArray = this.cc.Pagination.sortDataIntoArray(api.onResponseReceivedEndpoints);

		const comments = this.sortComments(sortedCommentsArray, "all");

		this.cc.Pagination.nextNumberButton(continuation, number, "Comments");

		document.querySelector(".comment-list.all").innerHTML = comments.result;

		this.cc.toggleElm("#comments-loading");
	}
	Form = {
		init: function() {
			if(document.querySelector(".comments-post").classList.contains("has-focus")) return;
			document.querySelector(".comments-post").classList.add("has-focus");
			let fu = (e) => {
				let l = e.target.textLength;
				let L = 500;
				let rg = L - l;
				if (rg <= 0) {
					document.querySelector(".comments-textarea").value = document.querySelector(".comments-textarea").value.substring(0, L);
				}
				document.querySelector(".comments-remaining-count").innerText = rg<=0?0:rg;
			};
			document.querySelector(".comments-textarea").addEventListener("keyup", fu);
			document.querySelector(".comments-textarea").addEventListener("input", fu);
		},
		uninit: function() {
			if(!document.querySelector(".comments-post").classList.contains("has-focus")) return;
			let _dom = document.querySelector(".comments-post");
			let _com = document.querySelector(".comments-textarea");
			document.querySelector(".comments-remaining-count").innerText = "500";
			_dom.classList.remove("has-focus");
			_com.value = "";
			_com.textContent = "";
		}
	}
}