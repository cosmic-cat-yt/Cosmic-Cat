export default () => {
	return `<div id="error-page">
<div id="error-page-content">
<img id="error-page-illustration" src="//s.ytimg.com/yt/img/image-404-vfl1vwmey.png" alt="">
<p>We're sorry, the page you requested cannot be found. Try searching for something else.</p>
<div id="masthead">
<a id="logo-container" href="https://www.youtube.com/" title="YouTube home">
<img id="logo" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="YouTube home">
</a>
<form id="masthead-search" class="search-form consolidated-form" action="https//www.youtube.com/results" onsubmit="if (_gel('masthead-search-term').value == '') return false;">
<button class="search-btn-compontent search-button yt-uix-button yt-uix-button-default" onclick="if (_gel('masthead-search-term').value == '') return false; _gel('masthead-search').submit(); return false;;return true;" type="submit" id="search-btn" dir="ltr" tabindex="2" role="button"><span class="yt-uix-button-content">Search </span></button>
<div id="masthead-search-terms" class="masthead-search-terms-border" dir="ltr">
<label><input id="masthead-search-term" autocomplete="off" class="search-term" name="search_query" value="" type="text" tabindex="1" onkeyup="goog.i18n.bidi.setDirAttribute(event,this)" title="Search"></label>
</div>
</form>
</div>
</div>
<span id="error-page-vertical-align"></span>
</div>`;
}