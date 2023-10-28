export default () => {
	return `<div id="footer-container">
<div id="footer">
<div class="yt-horizontal-rule">
<span class="first"></span>
<span class="second"></span>
<span class="third"></span>
</div>
<div id="footer-logo">
<a href="https://www.youtube.com/" title="YouTube home">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="YouTube home">
</a>
<span id="footer-divider"></span>
</div>
<div id="footer-main">
<ul id="footer-links-primary">
<li>
<a href="https://www.youtube.com/t/about_youtube">${localizeString("footer.about")}</a>
</li>
<li>
<a href="https://www.youtube.com/t/press">${localizeString("footer.press")}</a>
</li>
<li>
<a href="https://www.youtube.com/t/copyright_center">${localizeString("footer.copyright")}</a>
</li>
<li>
<a href="https://www.youtube.com/creators">${localizeString("footer.creators")}</a>
</li>
<li>
<a href="https://www.youtube.com/t/advertising_overview">${localizeString("footer.advertising")}</a>
</li>
<li>
<a href="https://www.youtube.com/dev">${localizeString("footer.dev")}</a>
</li>
</ul>
<ul id="footer-links-secondary">
<li>
<a href="https://www.youtube.com/t/terms">${localizeString("footer.terms")}</a>
</li>
<li>
<a href="https://www.google.com/intl/en/policies/privacy/">${localizeString("footer.privacy")}</a>
</li>
<li>
<a href="https://support.google.com/youtube/bin/request.py?contact_type=abuse&amp;hl=en-US">${localizeString("footer.safety")}</a>
</li>
<li>
<a href="https://www.google.com/tools/feedback/intl/en/error.html" onclick="return yt.www.feedback.start(yt.getConfig('FEEDBACK_LOCALE_LANGUAGE'), yt.getConfig('FEEDBACK_LOCALE_EXTRAS'));" id="reportbug">${localizeString("footer.feedback")}</a>
</li>
<li>
<a href="https://www.youtube.com/testtube">${localizeString("footer.testtube")}</a>
</li>
</ul>
<ul class="pickers yt-uix-button-group" data-button-toggle-group="optional">
<li>Language: <button type="button" class="yt-uix-button yt-uix-button-text" onclick=";return false;" data-button-toggle="true" data-picker-position="footer" data-button-menu-id="arrow-display" data-picker-key="language" data-button-action="yt.www.picker.load" role="button"><span class="yt-uix-button-content">English </span><img class="yt-uix-button-arrow" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt=""></button></li>
<li>Location: <button type="button" class="yt-uix-button yt-uix-button-text" onclick=";return false;" data-button-toggle="true" data-picker-position="footer" data-button-menu-id="arrow-display" data-picker-key="country" data-button-action="yt.www.picker.load" role="button"><span class="yt-uix-button-content">Worldwide </span><img class="yt-uix-button-arrow" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt=""></button></li>
<li>Safety: <button type="button" class="yt-uix-button yt-uix-button-text" onclick=";return false;" data-button-toggle="true" data-picker-position="footer" data-button-menu-id="arrow-display" data-picker-key="safetymode" data-button-action="yt.www.picker.load" role="button"><span class="yt-uix-button-content">Off </span><img class="yt-uix-button-arrow" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt=""></button></li>
</ul>
<div id="yt-picker-language-footer" class="yt-picker" style="display: none">
<p class="yt-spinner">
<img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" class="yt-spinner-img" alt="">${localizeString("global.loading.main")}
</p>
</div>
<div id="yt-picker-country-footer" class="yt-picker" style="display: none">
<p class="yt-spinner">
<img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" class="yt-spinner-img" alt="">${localizeString("global.loading.main")}
</p>
</div>
<div id="yt-picker-safetymode-footer" class="yt-picker" style="display: none">
<p class="yt-spinner">
<img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" class="yt-spinner-img" alt="">${localizeString("global.loading.main")}
</p>
</div>
</div>`;
}