const NAMESPACE_MODULE_OPENUIX = "OpenUix";

window[NAMESPACE_MODULE_OPENUIX] = {};

(function module_openUix(exports) {

// begin module

var uid = 0;

function getUid()
{
    return uid++;
}

/**
 * Handle thumbnail delayloading
 */
function handleDelayload()
{
    var thumbnails = document.querySelectorAll(".yt-thumb, .yt-uix-simple-thumb-wrap");

    for (var i = 0, l = thumbnails.length; i < l; i++)
    {
        if (!thumbnails[i].loaded)
        {
            var bounds = thumbnails[i].getBoundingClientRect();
            if (bounds.top > window.innerHeight)
                return;

            var img = thumbnails[i].querySelector("img");
            img.src = img.getAttribute("data-thumb");
            img.removeAttribute("data-thumb");

            thumbnails[i].loaded = true;
        }
    }
}

function onClickExpander(expander, event)
{
    var closestMain = expander.closest(".yt-uix-expander");

    if (closestMain.classList.contains("yt-uix-expander-expanded"))
    {
        closestMain.classList.remove("yt-uix-expander-expanded");
        closestMain.classList.add("yt-uix-expander-collapsed");
    }
    else
    {
        closestMain.classList.add("yt-uix-expander-expanded");
        closestMain.classList.remove("yt-uix-expander-collapsed");
    }
}

function tooltip(element, event)
{
    function getTooltipText(element)
    {
        return element.getAttribute("data-tooltip-text") || element.title || element._tooltipTitle;
    }

    function createTipBase(elm)
    {
        var text = getTooltipText(elm);

        console.log(text);
        if (!text) return;

        var base = document.createElement("div");
        base.className = "yt-uix-tooltip-tip";
        base.id = "yt-uix-tooltip" + getUid();

        var body = document.createElement("div");
        body.className = "yt-uix-tooltip-tip-body";

        var arrow = document.createElement("div");
        arrow.className = "yt-uix-tooltip-tip-arrow";

        var content = document.createElement("div");
        content.className = "yt-uix-tooltip-tip-content";

        content.innerText = text;

        body.appendChild(content);
        base.appendChild(body);
        base.appendChild(arrow);

        elm._boundTooltip = base;

        if (element._boundTooltip)
            document.body.appendChild(element._boundTooltip);

        positionTip(elm, base, body, content)
    }

    function positionTip(elm, base, body, content)
    {
        var isReverse = false;

        var elmRect = elm.getBoundingClientRect();
        var bodyRect = body.getBoundingClientRect();

        if (elmRect.y < 32 || elm.getAttribute("data-tooltip-force-direction"))
        {
            isReverse = true;
        }

        if (isReverse)
        {
            base.classList.add("yt-uix-tooltip-tip-reverse");
        }

        var x = (elmRect.left + ((elmRect.width) / 2)) - 5;
        var y = (!isReverse ? elmRect.top + window.scrollY : elmRect.top + elmRect.height + window.scrollY);

        base.style.left = x + "px";
        base.style.top =  y + "px";

        body.style.left = -1 * ((bodyRect.width / 2) - 5) + "px";
    }

    if (element.hasAttribute("title"))
    {
        element._tooltipTitle = element.getAttribute("title");
    }

    element.removeAttribute("title");

    if (!element._boundTooltip)
        createTipBase(element);

    // Animation hack
    setTimeout(function() {
        if (element._boundTooltip)
            element._boundTooltip.classList.add("yt-uix-tooltip-tip-visible");
    }, 5);

    function onMouseLeave()
    {
        removeTooltip(element);
        element.removeEventListener("mouseleave", onMouseLeave);
    }

    function onClick()
    {
        removeTooltip(element);
        element.removeEventListener("click", onClick);
    }

    element.addEventListener("mouseleave", onMouseLeave);
    element.addEventListener("click", onClick);
}

function removeTooltip(element)
{
    if (!element || !element._boundTooltip) return;

    var tooltip = element._boundTooltip;

    tooltip.remove();

    if (element._tooltipTitle)
    {
        element.setAttribute("title", element._tooltipTitle);
    }

    delete element._boundTooltip;
}

function performDelayload()
{
    handleDelayload();
}

YabaiComponent.addHandler("click", "yt-uix-expander-head", onClickExpander);
YabaiComponent.addHandler("mouseover", "yt-uix-tooltip", tooltip);

// No focus outline behaviour
document.addEventListener("keydown", function() {
    document.documentElement.classList.remove("no-focus-outline");
});

document.addEventListener("mousemove", function() {
    document.documentElement.classList.add("no-focus-outline");
});

// Hook scroll events
window.addEventListener("scroll", handleDelayload);
window.addEventListener("resize", handleDelayload);

document.addEventListener("DOMContentLoaded", function a() {
    handleDelayload();
    document.removeEventListener("DOMContentLoaded", a);
});

exports.performDelayload = performDelayload;

// end module

})(window[NAMESPACE_MODULE_OPENUIX]);