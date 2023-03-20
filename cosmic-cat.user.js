// ==UserScript==
// @name         Cosmic Cat
// @namespace    https://www.youtube.com/*
// @version      0.6.26
// @description  Broadcast Yourself
// @author       Emiri Floarea (ciulinuwu)
// @updateURL    https://raw.githubusercontent.com/thistlecafe/cosmic-cat/main/cosmic-cat.user.js
// @downloadURL  https://raw.githubusercontent.com/thistlecafe/cosmic-cat/main/cosmic-cat.user.js
// @match        https://www.youtube.com/*
// @exclude      https://www.youtube.com/embed/*
// @icon         https://www.google.com/s2/favicons?domain=youtube.com
// @require      https://github.com/thistlecafe/cosmic-cat/raw/main/modules/yabai_component.js
// @require      https://github.com/thistlecafe/cosmic-cat/raw/main/modules/open_uix_components.js
// @require      https://code.jquery.com/jquery-3.6.1.min.js
// @grant unsafeWindow
// @grant GM_addStyle
// @grant GM.getValue
// @grant GM.setValue
// @grant GM_xmlhttpRequest
// @grant GM_registerMenuCommand
// @grant GM_deleteValue
// @grant GM_listValues
// @grant GM_getResourceText
// @grant GM_getResourceURL
// @grant GM_log
// @grant GM_openInTab
// @grant GM_setClipboard
// @grant GM_info
// @run-at document-start
// ==/UserScript==
/* jshint esversion: 11 */

(async () => {
'use strict';
function debug(a) {
    return console.debug(`[Cosmic Cat]`, a);
}
function error(a) {
    return console.error(`[Cosmic Cat]`, a);
}

GM_registerMenuCommand("Open (settings)", () => window.location.replace("/cosmic_cat"));

var BOOL_LOGIN,
    BOOL_SUBSCRIBE,
    update = !1,
    startTime = new Date().getTime(),
    commCount = 1;


// Check for updates here, because Tampermonkey's "Auto-updater" is SHIT!
fetch("https://raw.githubusercontent.com/thistlecafe/cosmic-cat/main/cosmic-cat.user.js").then(a => a.text()).then(a => {
    var b = (a.substr(parseInt(a.search("@version") + 14)).substr(0, parseInt(a.search("@version") - 86)));
    (GM_info.script.version !== b) && (update = !0);

    console.debug("[Updater] Current version:", GM_info.script.version, "|", "New version:", b);
});

document.cosmicCat = {
    data: {
        version: 20230320,
        loggedin: false,
        homeCategories: ["trending", "popular", "music", "live", "gadgets", "news", "sports", "education", "howto"],
        darkyoutubelogo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALoAAABMCAYAAADaxa31AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAB/HSURBVHhe7V0JfBTl3X53c5M7gSRAgJJwRHJwQ0TaKgpYlbOe9SsKas+fV6FWEGoFARE8iqBUK9azFsRWv4KIByqgUAj3TbivcCSE3CHJ7vd/Zue/zs68M7ubA5J++0yevHM87/+dnX3ed96ZncMmAmhR2NI3O4aSIGK8MkOIWKKdGEUMIbYihqnEuBbhxAjXqE+4oKZaXCQ6iKXEWmIZsYZYQawmVhErMd07bwemmwUCRm9ikDFDnELAnDBkHBHjPB2tpiDmwawwInSR6rh2PvQtCXXEEiIqBcyPSoGKgkoBFmMebZ9SMiJ0zCIi8kCrzOuTtwN5642A0RsZZOwI+uJupdGfEHOJnYhocQNoGC4RdxN3EFcSP/bH/AGjNxJgcNqf/55GHyFytyKApgO6VXOoBZlPXSTsLSwRMHojIK9v9kBK3iWmKzMCuJw4TLyjb96Oja5JOQJGbyDy+mTdQcmbRBz8BXBlgIPhCX0373zHNWlEwOgNwKY+WaMoWUbEWZAArixw4Ht3v807/+Ga9ETA6PXExj5ZXSnZRMRZkQCaB3Amp1//zTv3uCa/R+BsQP3xCjFg8uYF/G7w1pa+2QZfB4xeD/ynT9YwpxDXE0WAzY79apzO22jUAwGj1w+/kWzgAJsLnc6HKPFAoI/uJ9b1ymwVbLPhl7vAWZbmCyc5O3Xg5p2n1Glhe/LJJ5OioqKGYYJqgjJTi+rq6i+mTZt2Wp00xZw5c2612Wy4lsIAirGaYpxUJ1s01vfOHEzJGteUEaEpbUVIfOP/XlRXWSGqjhxRp5oGQVFRIrxDR3XKExX5B4SzBmfxWgzuyN2ya4k6LmwzZsxoP378+BN2u10xusOB63Vcpgc/+uij9QUFBWNnzZplavbp06d3nTBhwn6MIz8ZXpnPsV555ZVpFP8NitHizf5d78xfUPIX15QRHR+fKtrdfqc61Xi4uGWz2HPfOHWqaRAz+Eeix/yX1SlP5N00VNQUeG3vmhOevHrLrunquLCjpd28eXNBXV0dWl5RVVUlKisrlfTSpUsiJCQk98SJEy+oeini4+Px5Sv62tpaJQ5iYJpio7WfQfGTFHELB+3zunj0B3Uso+3YFKikRkNWXmOyXG2YZKi5DOU3MrtR4oZyMHr06NF3a2i3BGPCoBUVFQox3r9/f3HkyJEfK2oTJCUl/QQGRwzkKysrU1IYftWqVaJHjx7lZPYtqrxFgzZgum6DerApISuvsWkGmbaZswslbihGP3/+/KyLFy8KtOrobrDp0aoHBwejlU6mvnyokkOCjh07duU9AO8VuNKsXr1aZGZmblClLR7Um0vDoYwpVV1TQFpeI9Jq5ZXFGm0LoMfBhmL0p556qmj//v3HYHAYFcQ4WmkYNicnx1ZcXDxeyaHDzJkz+ycnJ4eikkCLPKgsSE+fPi327t0rUlNT/6rK/xsgP1oLoLkh5YueV7lPjrjPo588efKNoKAgqgmuA1IYHSk4YMAAcerUKekRVlxc3H3QwujcfUEKrl27VrRr1672+eef/7sqb9FY1zszig7RE4imQ1MBkbXlNNVghstVfiMOtlCb7QeutdecR6euSdTw4cNL6ODThq4HjAvTh4aGKt2Xhx9+uGz9+vWGO1w++OCD/KysrPTy8nK30VE5cOZl0qRJIjExcdeKFSuyVHmLxje9emRQYriOQouqvv1FSLfu6pQngsPCxeCHH1WnjFj75xdEbTXuRDOi9uxZEfbFKnWqaRA6aLAYuFB+QmntjdcL55kCdaplgMw97Idbd3+mjn+Pd955Z19GRkY3dEFgWBidjK8YfcqUKSI3N7cjdVWOq3IFGzdurI2MjAyC0ZEHeZEPFeWmm24SDzzwwJSFCxfOVuUtGmR0/Oz/uTopRXFtnSinzy5DUHS0uH3DZnXKiCUD+4i6UtxBZkSY3S5ahwSrU00DGD3XxOhrWqbR7/nR1t1vYdzjEoAzZ868hvPp6MKAGOeWHWdfCgsLf61KFcyePXtYfHx8EHdx0KIjD1rzDRs2oJI4W7duvVCVt3jQZmhHRGrKWNpu7WgvKGNyMO5dNgeWy/KBidTYyMprTNL+3hQyfQtgirr6nkYvKSmZTy2zE0blH5BgdO6nHz9+/BZVqoD65/cihcGRB+Ruy7fffiv69u17kg50cXPrfwWo35fi7gHWc7CCVnelBjNoNS1lcAhnO3X1PY1Oprx0+PDhHeiuwLAAH6B26NABLf5VykwVKSkpP+QWH2ZHCgIwepcuXXAT638NaIu0xadrCK0g019umkGmbQF0t+gefXRg7ty5vxw6dOgiPhcOoHWH+Z999lmRnp5+DaXf0sFr8MiRI6sjIiLs+IEIhuf++e7du8WDDz4oHnvssauoe7NXCSLB008/nRwdHf0rYv+wsLBEqlzOioqKY6WlpV8Q30TFU6WWwGUMdBzh8QMBY/LkyV+ro26gXNJncKXUgj73OioXzysx4MueV71LOX6mTvqPyCgxZN1/1AkjvrxmgBDl5je2B4WHi9DWbdQpT1SdPiWcumMDf/Vh1Ee/5uVX1SlPfDV8iHBo+ugR1PAl5A4S4e3ai7rKSlGyY7u4sOE74VQbSH9go8Y0JitHRGdcJcKSkmA4UVtSIsoP5ovizXmitkx+3OIDvr5+255rMWI4uiHTvlZUVPRyTEyMHa06mx1GRvdlz549v6LJb1u1avXTqKgoOyoEt+TQYw+wfv16kZ2dXWJmcjqg7da1a9el/fr1y8GBLmIDatfnaopxx/nz5xelpqauOHHixG1kPPmpCBXJycnzRowYcSfK13ajsE70Wa6lyuth9oSEhGljxoz5LfRcNoAKTQfOt1Ml/qfM7BQuwVg1/ICXzEq9s9DE9Bsoei/A/R5G4KxI9WnPa1H81VsB6waGJSWLbn+YLJKuH4ovTF3qQum+vWL7Iw+KqlO+XdJkDwsXHX8+TqTedbcIM6mQDvLfmU+Wi0MvvySqCvw+GE5QU8+uC0BfsOPYsWObuY/OB5cgjH706NHroKP++d3cXYFZMM4HsN98843IyMhYpwTUYd68efePHj16z6BBg3IwzWd48Csq9gx8CUJkZKT9uuuuu4XKLJ0+fbqitQJMizhYF/zghbgYJ5N/pUo8gGV8lghl8nosWLBgCX2WtqrMA/Q940FDVwwVDvnZHKDGYawh/uq9Ia53HzFg6Yci6YZhBpMD0d0zRK9Fr4mgVvoHhBkR0T5VDHj/A5H+4COmJgfsdCDedtQYMeCDj0Ti4B+qc30DudZ9OtxgdODs2bOvcHcFYDNTKw4ztke3pU2bNrkwFwgghQ6/hh45cgR9+gXKAg3mzJkzdtSoUa9SV0XZE8CQfE0NmxPjWIb5SNPS0oKp5d82bdo0XB4rBcqFSREDeUDEAWWAHhUTejY5l2kF2m/F4NKmhtAKMr2eZpBpQTPItKAZYrJzFBOHxllfghzZ6QeiHbXQstjM0ORk0eeNt0RkWpqayztCoqNFzosLRFxurjSmnA5ro5eXl/+NdvmKg9FKs4mRZmZm2qj/fG/79u1bc6sJcsu/Zs0aXPtSQy3pCiWYCqoccUOGDHmfuio2nHOHqUA2p950WtN26tQJe5BvpkyZIm1pARiXW2htDBm44mI561E28lvBSS0ErNAQWkGm19IKTa3vNXM29fl9e2xjyuix0vgg+t9Zc18Q4cnu40SfYaeGN/vZF0RIQqI0tp60P3PvgaVG13ZftF0XGH3gwIEwyKPU2tu4JUUKoFKsW7dO9O7de5syQwNq4RcnJSWFwJCIgxQGQ34QxsM8Niwv5+lhw4bZDh8+jLvuDUA8aLQG55hmwHJu2ZGHy+fPIgMti8HihtAKMr2eppBoG1Pvq8mBmI6d6CA4SRq/zZChIr5nL1XpP0JjY0XH8fdJY+tJnzH465498AxLudEB6r78BV0XGJ0PGGGorKwsERsb241bQxgDlQDAFZDbtm2Dqd9TZmhAB5/DYC7kYzOyQZcuXSoeeeQRMXXqVCU/ysQyEDoui+K2mzhx4gg1pBtcPsCGRVzklwHrDB1XBkxjHLQCRYtybb/60woyvZ5mkGlBM8i0oBWOblgvPnz4QfHW3XeJ9Yv/ShnMc4R27iyN3/qmm+m/HPs//0z8/f4J4u2f/0xseGOx4awQI+UnFIM8IouvZ7XTofS1TI1O3YvF1EVxwEQwAsjmu/baa4PZIGwsmHPjxo2C+t/OxMREj9+RZ86cOZBMGgktCNPy+JIlS8T8+fNxTfv2nJycx3ft2vUcHfA6ucvEpkWaS/2z/Pz8P6phPQAt4rG5ubLIgM+E5Vh/APkwrq0wMpA6WLsR/aUvkOVjWqGp9Z/PmS2W3X2nqFi1UoRtyRNbn5kl8t43v1bPntjGEN8WFiZSrpEfUO7/4nOx4te/FOLbNSIkb5PYMvtp8fX8F10LdWjVJklEZ2YZ4stY51QepW1udHRf6KByPwzHZ1PYEOHh4co4zAczsalwtSJ1W45SXo+jOjL/T5GPW2bkA4Fly5aJESNG5C1fvrznwoUL5yxatGhSYWHhMsQEYT4ul/r+4sCBA9lKRh3YqGxWxMc8K0CL9eY8ZhUDWJ7dPR6/tjV0sIJWJx/M4fpi9YM5/NWfX7lcZLQKFwkhQSI62C46hoeKg0vfV5caYY+J1sR1DZFduohg8o4M2/76qugWESpig4NEjBr/6LtviTrVJ3qEdeumiWw+EPDIbXOjA+fOnfsHmw1gY/AuHuNac3z33Xf4Qel/1Uk3IiMjMzkPTMvx6IBXFBQU4FSkx+MJ6CD1I1Qm6LgSIT9SMnAYHdh63JYHQ3Nl5GntesvAsZFCz3lMQdsM9aahtIJMr6XrezOBTtvY+vigEIPenp8vHCZGtFOfXq8PapeqLvWE8iPT3t0GfRx1cc/t36eqPBHe8QcGvZSulyNYG724uHg+DAYDoJ8OwBggGw/LYBL0rdFiUxdkriLUgPIqJ+55D8D5qGsEvQO/tCpCFVQZ8mFcPkbAOMpAvvj4eJzi9DjVyIZGJYKe18kK0CIefx4A02YgjQ0RG0oryPR6mkGmBc0g04JmkGnDnHQMVSb/JddppwYEqYZ2OpCUoaqkRIRjD0zjWgbR91J+9gyNGRHaurVBLyPD0ujUBSk6ceJEIQzHhoCBYBIGmwOnFXv27HlBfxkvQPmj2KggmxCnGePi4gw/81P8k1yxAOSBeZGipacK5fFzP68T1g8prx+mZYCePwti8jgqlBmozY/Vb0R/6Qtk+bQ0g0wLmkGmBc1gpr1UUa6OeSIkMsqgt0XIz9xwDL1eyYN/EtgjWkn1epLblHPplkYHqPuylg2gNQ6bFQZERcBFXNQFWa3M1IGWR6A1Z0Ox0cCIiAjp9SxYBrNzl4Tz4UcrMrLpK06QD3mQsuH1wDKAY3Ml4eMGM6DP1+BB/RxS+jLI8oFmg0wLmg0yLWg2yLREB1LdQBtbqlVoNUj0Iohi+TDQn9JiejX6hQsX3oIZmCiEjYLWEMinvhq1/KJt27aGX0NVkKeCFEMhZWhj6cE6bs2VD6eCDmgNP89p4yAP9MhnBWi4RQes9HT0bsOv5g0lyjSjTK8lSQx5mDDW5dZb5ZHpaRtKtfRn0DLlehdlej3pT4FXo1dWVv6rpKTEfY06m0E7jpssunbtWjV37lxpiw6gtYR5tcY1MzmDy0Be6DmfHojD68fAOFdEGaDXxuRpM5gv8Q8ow4zeAIUsHyhDU+sBmRakf6pCA52GGR4bI3Km/UnK1l27S/PQn09gmVej4zRjQUHBWXRPGFpTwCjon2dnZ29VZpgAebiLwPmRWoGNigqCcsy6IgC0qBBsXFC795AB5SMfx+fPZIIKLG0oUZ4ZZXoP0vrJ8oFXRA9KtAoplkFrEj84PEJ0GHurlJEpKdI8KNcQX0IC3mzn3ehAYWHhdpgCZke/mQ2BecXFxWLXrl3KT/zKTAmg0xoJK+rNhAzlQ2GjERHDCmxc1mHcDLzRobXSMShitXYD1o+uz2FKZZDl01CWT6FEeyX1Mi0o09aHsthSkpjgk9Grqqr2w0QoAKnWpKdOncL13Y64uLg31FlSIC/ArTLigFbg8jj1BTAu5+Ey9eD52uW+mN3V72wgqRxTyvQaOqnTKc0H0ld6ufUuSrREpaXXa3WaBlMfX0L6U+CT0QE2DwpAimlu3VNTU8uoi2N9yoLAFQR5rbohAMrR7j2s9NBwbOgwzesoA+ajQvApTC7Dao9R63SWQ9VQWkGm19MMMi1oBpkWNINMC5rBH219IStDT2q+fO+6MNB1gRm0LbqVObSAuWBe5IUZkQ/TVtAuh96b2XndUBabWQZoEYsrLeexwphd+326rc8bUJ4ZvUOeD5RDrgXlkGtBM8i0oAyYK9PWVFWJg+vW+sWze/BuXe+gb1Uxkc9G1xoNK8etrTezAtBpzQ1jYZ6VubhisIbLNAOvC8rh9eRUBqwLr4/2c1mBlja4VbeCTK+nGWRa0AwyLWgGmRY0gz/a8qJC8a8HJvjFzQvmS8vQM8hmw4t3/eu6aFtyNq52nhWg40qhNbAZODabD3or4wKcB1oQ01bQGtsXPWUok/UD/SHKNKNMr6csHyjTgjItKNOCMi0o04IyLdNXPf0T6eFhfrFtaIg0vp4jd+7z3ehsHPeKqdCOWwF5Aa2e45kBlQHLtYb3VqlQEaDj9eVy9cB8xAcRH8SpSa6IZnDabKVY44bQCjK9lla4EnrQDP5oAZm+oaQv2n0hjs8tOsDmgZnYUL6CTcTG4nEzsBm1KcqUgZdxPF4/X+BLfAZFrfdzFxi8bjJ6AxSyfKAMTa0HZFqQ/qkKDXQaLZsCFNf9fflkdP1KgTCGP4AJ2VTIz792mgFaPg4AOb8ZuLVnvS/rh5hYH6sK5wGnoK4LVdoG0AoyvZYWm+uK6EH6kwLzDXrXIgOkWpXX/n2pGLlxq4EDXnhJqteSdsH+GR2AcdgQSEFfDVVdXV2ObgXH8CUf9KgMnA8piNvw9EA8GBbgdcQ09DJw+ViOcYa3dSJlCVWjhg1Unil9GWT5QLNBpgXNBpkWNBlooVELyganq5HTk/5pVR5DVZ08Dx7kiuVeBvfjEH02OoLDPGg5kbKxMN8byFDl3M8GMA5DRkYq960aQMtTYDrokIJsYNyhRC294SJoxGbzcl6rdcMyxIROX0kscBYRG0IryPR6mkGmBc0g04JmkGlBPApbhprKKoP2Upn8kl5cAqDXMkNNPFKH+5UptaKwiUIkgM9GhwnYTHrzeUNNTU0Z9ABSbmmjoqJw0ZjhEbNk5PYoCwbkFERe3IBN5jQYndcJ4DyYxvPdZdCuO8ahRT4rUHT5XQB+AGWY0RfI8oHqV2uATAs2ht5G2w1GlOmdtDfWo6akRKoNIx/gsXQy4BEXsjxmz5HXwf0oMp+Nzq0ewKZCgWwuK5CZD3BLizyMpCQ8EsFpcCK19Mp7T6FHiwsjghjH5cBkXo+bO3h9sI6s5/kw+pNPPul+Zz+NR3Xv3n0cn2VhchlWoDU/zV95fWkFmV5PU2DbUuLW0WfJuOMujEmh1WppBpk2IrWDCDJpSOqqqw36i0cP038j7HQsFt0V94B66vGUroi4OBozopa6sHq9noSzrsQPo7PpAK1ZtRXADOXl5SuRn6Edz83NDXriiSfS1UkY0Z6WlnYnG5H70ciD+0vRolNFWKvKFdAeoxDLYVRo2bhAdHQ0+vrKPVwUOzwnJ2dn586do9ngIPIi9QEnZAc9/pD+TCnTa4nNTn9ShsYnfq+lfU/WxMdEu0HXSLWgNi7TKn5CVo5Bn3LDMKkWrC4tNegrjhxxnYSQ6DuOvc2gTxky1NWiS/RlZ88Z9HqS0P3maJ+NDuPADDAeGwoG0ZreDBUVFR+fP3++DhWFTc6xHnjgAVSgb2bMmNFr1qxZQzMyMnakp6fHYxnIgD4vLw/vRKqbOXPmQXW2AloHxaW8Lki5otxzzz0oc8i8efMevfrqq89kZ2d3wv2uIOuhw3ppy5OB1Kdox9mggQo1pbfBUVsjzQd2ufMuEdamtUjs1Utc8+eXRPqtt0t1TNlACww65tVPzxY9f/8HEdO1K1WqeNFpxEjRY/x9Ui1YVXjeHZeHEFr/w999K9WnjxotMn/7oIjskErx40Tq8BuV8mRa8MyWPE1k+UD13X+jsxkAGISN7wvUR2coT9lCDBAxkOIU4qhRo9qNHj16y5gxY1b17t27BxsRZtWab+XKlXgknmH/Rzrl8a0cFxUK6waOHTsW/Nvw4cOf79ixYwxu4OYnc6EMAHl8/CzHafNhE9abVpDptawuNX+nQucbbxI3L18lfvzqYpGcO0idaw1ZGWZAfzz9tjvEDe/+Q9zy6Rei77Q/mXZbgLKTx6Wx932yXB0zovs948XwZR9T/C/FgBmzRCj13WUoOn5MFOVtNMTXk9x6ghIFfrXoDBiKDcjdGW84fvz4L2Ay1iMGmxGGw9kUGBDEOOaz0TG+c+dO5QFJ3bp1M7xkh/Lv43XSXg8DA/NzZNjgKAu3/nFckCsdaIW79+SfpK3n01GQGVCWGb2h6swZaT4znjt0SDpfoRrTAzKdSt5OvrCiuFhUn5A/Orpg1Upx9mC+NJ+v/Pql+SLSy3elIl9NfTM6GwCFADAJDMtdGF8wbdq07evWrVPuP8UBIlLEgQm59caDPmFGpDAmNi7KxuOkqbuChyNdXLhw4Tw1pBvUNVqFPNBqNwjiogyuSOB7770nXn/9dSUf75WQj1NvsDnESXzk+tIKMr2WtYWFoozoC7avWC6+fN6wqb6HJD79meLzP7+gXGPuC3Z+skKgrTfEJ0ZTS/HPib8TVSYvJfMGfK5zn31KwYyxtaTl5T/bk3/OlctHo8M0MAKMATOg1WRT+YNJkybdQ92P3ciHGIjHgLExH2aEOQGUAZNPnDgRFcBxww03jFIW6IAngx04cOAYVyDtOoIA0rfffls899xz2CsobsE86FFpMe7T57HZGtR9sYJMryWec7Lj34bnQxmw6YOl4vMnJotYu3XFlZVhhtPUbfyQYpo9OYsBA29/43VpbBAIP35UvPvrX4ryoiJ1jm/Y/fln4ss/PiHi6LuVxdaS6pPHLsXnFp0Nw6YAYBJtV8EXTJ06NZNa1TX79+9335oHIBYMzkaF6XAv6vjx4/EKd8e4ceN+rn9zhRYUb+ypU6eUZzaCyI9YIE5JPvbYY3ibBY4HNqSlpS1BuagYSDmP9r5YM5B3Dss2rK+0gkyv57bFr4kCk6dXobVf8offi29mPCXae3lVoyw2aIaYkCBx/tNPxOJ7x4nCY8fUuZ7Aw4yW/O4REV5UKI3NDMf3sme3WDDyFrHlo3953VOgQnxMn+nfEx8VbSmvLKae5NgjlLjhfV9NmDFjRg51DxatXr36ahhI2/KhxSXDlGzdutWvt0FQK33rvn373mnfvn1Yenq68ispui84fYh3IMHkeKnA4MGDTw0aNGjkM888k6dmNQVVolFFRUUfdu7c2Y7nv+B0JB5j/dVXXwkqp+bmm29+dtGiRVPxeWi9F9F85fMwUME2bdokHn/8ccP7VBlvZqQ/UeVwPK1O+gUHfUmVWeYv74jYuV3YvXzpdbS+x+1BInPUGNG5/wARERtLBj8vDqxdI/au+lS0psYiLth1HHQpOlrUdHafufVAxJ5dwk5dOi180ZfXUd+NvqduQ4eLtIEDRXxqB1FH849v3ya2LFsm4ksuiGhqNHxBLX2W05dqhLNNG3HVkBtEu8xMEdMmSTnIvVReThXqqDiSt0nkf/21wHO5Ev14z2qozf6X8fsO4jVECnwyOjB58uSc0tLSG9VJD1CrePrFF198W530Cw899NBvTp48edeZM2e6lJeXR1DLWhcTE1OakpKyncz5gtUjNGTAOflDhw69SAe//ajfHh4XF3eBKtKHbdu2nUJdHPddQlafJzExcT5ppQedZPQ7yOjmT9e0AKpUmdotkyGKDOLLF4LrrIvUF/fCLMFUQWPI3LG0d9LuorGs0qTiyMryVY/PcZHKx2e5RHkwvxVV4gQyYoi6t/cHNRQD8VA2xpW9McUJo91nJFVqfDZ/o4bZ7ZPu3XvwOXXS7/z/70FG71BZ55DvuwNoNmgVZM8dt/fgBnXS99OLAbhwz96Dx6m12YdWLcDmSdoZnM2ObOXxnsuA0euBYJt4T7aBA2weDBa2D3rn7cCoGwGj1wMRdvuLtEkvUG8yMDSzgb6XCmrRZ7u+qe8RMHo9cNee/JJwu/0JdTKAZoRQu/2lCfsOuX/6ZwSMXk/QxnwlxGZbpU4G0AwQZLNtsznFVHXSA76d8AxAilGJCXiX6liHUyS65gRwpRBkE4cjgoKupwZIeTKXHoHTiw3Em93TkyscdatqncLra9wDaBpQS36wVZB9+L17D3pcvq1FwOiNgHcyukSUO+perXI476YNGtimlxGh1H0Msdtuv8+kJWcEvpRGxOvd06695HDOqnE6c2kysG2bENSKHwqz22bcv+/Q39RZlgh8GU2Axd3TelBX5n9qhTO3zulMo1nRTmGLdDqdYS5FAP7CLkSx3WY7HWwTeWTyJX2jIv+tP1duhYDRLyNe7to5LNxuS6CD1wT60lo7nE68ljKOvq14YqzT9Qa1KKdTmY5kYh5po5w2gedChNO8VojX3GGz2aqE01llF7YKchpeslxBhq0g05WBNK9cSYWthObjmt1imi6m+cWuadsF+tyF9+8/5N/1vBIEjN5C8Ub3tCgYvtbpjA222ULqXGd+cH1XAlWUECGcMbQcUN7xyqB5oUSPe9RoT0NdXZvhsdiq+TxAhlHmkd51B4jT9ewUu819x/15/Juw75D7DvwAAgjgskCI/wM/pmzpyNFoXQAAAABJRU5ErkJggg==",
        i18nfolder: "https://raw.githubusercontent.com/thistlecafe/cosmic-cat-i18n/main/i18n/",
        darkNoiseBg: "data:image/png;base64,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",
        loginUrl: "https://accounts.google.com/ServiceLogin?service=youtube&uilel=3&passive=true&continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Faction_handle_signin%3Dtrue%26app%3Ddesktop%26hl%3Den%26next%3Dhttps%253A%252F%252Fwww.youtube.com%252F&hl=en&ec=65620",
        lang: {
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
            "pl": "Polski"
        }
    },
    Alert: (a, b) => {
        document.cosmicCat.pageRenderer.set("#alerts", document.cosmicCat.Template.Alerts(a, b));
    },
    Settings: {
        toggleOption: (a) => {
            ((a.checked !== undefined) ? a.value = a.checked ? 1 : 0 : a.value);
            document.cosmicCat.Storage.add(a.dataset.storage, a.value);

            document.cosmicCat.Alert(0, `Changed setting ${a.dataset.storage} to ${a.value}`);

            (document.cosmicCat.Settings[a.dataset.action] || document.cosmicCat.null)();
        },
        toggleTab: (a) => {
            document.querySelector(".individual-feed.selected").classList.add("hid");
            document.querySelector(".individual-feed.selected").classList.remove("selected");
            document.querySelector(".guide-item-container.selected-child").classList.remove("selected-child");
            document.querySelector(".guide-item.selected").classList.remove("selected");
            a.classList.add("selected-child");
            a.children[0].classList.add("selected");
            document.querySelector("#feed-main-" + a.children[0].dataset.feedName).classList.remove("hid");
            document.querySelector("#feed-main-" + a.children[0].dataset.feedName).classList.add("selected");
        },
        toggleDarkTheme: (a) => {
            if (document.querySelector("#www-yt-dark")) {
                document.querySelector("#www-yt-dark").remove();
            } else {
                const a = document.createElement("style");
                a.setAttribute("id", "www-yt-dark");
                a.innerText = OBJ_STYLE_DARK;
                document.head.append(a);
            }
        }
    },
    Account: {
        getSApiSidHash: async () => {
            function sha1(str) {
                return window.crypto.subtle.digest("SHA-1", new TextEncoder("utf-8").encode(str)).then(buf => {
                    return Array.prototype.map.call(new Uint8Array(buf), x=>(('00'+x.toString(16)).slice(-2))).join('');
                });
            }

            const MS = Date.now().toString();
            const TIMESTAMP = MS.substring(0, MS.length - 3);
            const digest = await sha1(`${TIMESTAMP} ${document.cosmicCat.Utils.getCookie("SAPISID")} https://www.youtube.com`);

            return `SAPISIDHASH ${TIMESTAMP}_${digest}`;
        },
        fetch: async () => {
            let isLoggedIn = await fetch("/getAccountSwitcherEndpoint").then(re => re.text()).then(re => {return JSON.parse(re.slice(5));}).catch(err => error(err));

            try {
                BOOL_LOGIN = !isLoggedIn.ok;
            } catch {
                BOOL_LOGIN = false;
            }

            if(BOOL_LOGIN == true) {
                document.cosmicCat.Account.updateLogin(isLoggedIn);
            }
        },
        updateLogin: (isLoggedIn) => {
            let popup = isLoggedIn.data.actions[0].getMultiPageMenuAction.menu.multiPageMenuRenderer.sections[0].accountSectionListRenderer;
            let accountItem = popup.contents[0].accountItemSectionRenderer.contents.find(a => a.accountItem.isSelected == true)?.accountItem;
            let google = popup.header.googleAccountHeaderRenderer;
            document.cosmicCat.data.loggedin = true;
            document.cosmicCat.Storage.add("accountInfo", {
                name: accountItem.accountName.simpleText,
                pfp: accountItem.accountPhoto.thumbnails[0].url,
                link: accountItem.navigationEndpoint,
                email: google.email.simpleText
            });
        },
        checkLogin: () => {
            fetch("/getAccountSwitcherEndpoint").then(re => re.text()).then(re => {
                var a = JSON.parse(re.slice(5));
                var b = a.data.actions[0].getMultiPageMenuAction.menu.multiPageMenuRenderer.sections[0].accountSectionListRenderer;

                if (document.cosmicCat.Storage.get("accountInfo").value.name !== b.contents[0].accountItemSectionRenderer.contents.find(a => a.accountItem.isSelected == true)?.accountItem.accountName.simpleText) {
                    document.cosmicCat.Account.updateLogin(a);
                }
            }).catch(err => console.error(err));
        },
        isLoggedIn: () => {
            if (!document.cosmicCat.Utils.getCookie("SAPISID") && document.cosmicCat.Storage.get("accountInfo").exists) {
                alert("Cosmic Cat\n\nUnsafe_logout_detected:\nDO NOT TYPE \"/logout\" INTO THE URL BAR!\nTHIS WILL CAUSE STUFF TO BREAK!");
                return document.cosmicCat.Account.logout();
            }
            return document.cosmicCat.Storage.get("accountInfo").exists;
        },
        logout: () => {
            document.cosmicCat.Storage.remove("accountInfo");
            (document.cosmicCat.Storage.get("greeting_feed").value == "subscriptions") && document.cosmicCat.Storage.add("greeting_feed", "youtube");
            window.location.href = "/logout?cleared_storage=1";
        }
    },
    Ajax: {
        post: async (url, params) => {
            let Authorization = "";
            params = params ? params + "," : "";
            let click = JSON.stringify(yt.config_.INNERTUBE_CONTEXT.clickTracking),
                client = JSON.stringify(yt.config_.INNERTUBE_CONTEXT.client),
                request = JSON.stringify(yt.config_.INNERTUBE_CONTEXT.request),
                user = JSON.stringify(yt.config_.INNERTUBE_CONTEXT.user);
            let body = `{${params} context: {clickTracking: ${click}, client: ${client}, clientScreenNonce: "${yt.config_["client-screen-nonce"]}", user: ${user}, androidSdkVersion: "25", request: ${request}}}`;

            // Check if logged in
            if (document.cosmicCat.Utils.getCookie("SAPISID")) {
                Authorization = await document.cosmicCat.Account.getSApiSidHash();
            }

            // Fetch
            const response = await fetch("https://www.youtube.com" + url + "?key=" + yt.config_.INNERTUBE_API_KEY + "&prettyPrint=false", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Goog-AuthUser": "0",
                    "X-Goog-Visitor-Id": yt.config_.INNERTUBE_CONTEXT.client.visitorData,
                    "X-Youtube-Client-Version": "17.33",
                    "X-Youtube-Bootstrap-Logged-In": "true",
                    "X-Youtube-Client-Name": "ANDROID",
                    "X-Origin": "https://www.youtube.com",
                    Authorization
                },
                body: body
            })
            .catch(err => {
                console.error("[Ajax] Something went wrong:", err);
            });
            return response.json();
        },
        Fetch: async (url, callback) => {
            if (!url) return console.error("[Ajax] Parameters must be supplied!");
            let a = new Promise(async resolve => {
                await fetch(url).then(a => document.cosmicCat.Utils.convertXHRtoJSON(a.text())).then(res => resolve((callback) ? callback(res) : res));
            });
            return await a;
        }
    },
    Template: {
        Alerts: (param, msg) => {
            let type = "";

            switch (param) {
                case 0:
                    type = "info";
                    break;
                case 1:
                    type = "warn";
                    break;
                case 2:
                    type = "error";
                    break;
            }

            return `<div class="yt-alert yt-alert-default yt-alert-${type}" style="display: block;">
<div class="yt-alert-icon">
<img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" class="icon master-sprite" alt="Alert icon">
</div>
<div class="yt-alert-buttons">
<button type="button" class="close yt-uix-close yt-uix-button yt-uix-button-close" onclick="document.cosmicCat.toggleElm('#alerts');return false;" data-close-parent-class="yt-alert" role="button">
<span class="yt-uix-button-content">Close</span>
</button>
</div>
<div class="yt-alert-content" role="alert"><span class="yt-alert-vertical-trick"></span>
<div class="yt-alert-message">${msg}</div>
</div></div>`;
        },
        Browse: {
            Main: () => {
                return `<div id="baseDiv" class="video-info browse-base browse-videos">
<div id="masthead-subnav" class="yt-nav yt-nav-dark">
<ul>${document.cosmicCat.Template.Browse.Subnav.Main()}</ul>
</div>
<div class="browse-container ytg-wide ytg-box no-stage browse-bg-gradient">
<div class="ytg-fl browse-content">
<div id="browse-side-column" class="ytg-2col ytg-last">
<ol class="navigation-menu">
<li class="menu-item">
<a class="selected" href="https://www.youtube.com/feed/explore">All Categories</a>
</li>
<li class="menu-item">
<a class="" href="">Recommended for You</a>
</li>
</ol>
</div>
<div id="browse-main-column" class="ytg-4col">
<div class="load-more-pagination">
<div id="feed-loading-template">
<div class="feed-message">
<p class="loading-spinner">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
${localizeString("global.loading.main")}
</p>
</div>
</div>
<div class="load-more-content"></div>
</div>
</div>
</div>
</div>
<div class="clear"></div>
</div>`;
            },
            Subnav: {
                Main: () => {
                    let items = "";
                    let a = ytInitialData.contents.twoColumnBrowseResultsRenderer.tabs;//ytInitialData.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].destinationShelfRenderer.destinationButtons;
                    for (let i = 0; i < a.length; i++) {
                        items += document.cosmicCat.Template.Browse.Subnav.navItem(a[i].tabRenderer.title);//destinationButtonRenderer.label.simpleText);
                    }
                    return `<div id="masthead-subnav" class="yt-nav yt-nav-dark">
<ul>${items}</ul>
</div>`;
                },
                navItem: (data) => {
                    return `<li>
<span class="yt-nav-item">${data}</span>
</li>`;
                }
            },
            Content: {
                Category: (data, videos) => {
                    return `<div class="browse-collection">
<div class="ytg-box collection-header with-icon">
<a class="heading ytg-box" href="${data.href}">
<img class="header-icon ${data.class}" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="">
<div class="header-container">
<h2>${data.name} »</h2>
</div>
</a>
<a class="yt-playall-link yt-playall-link-default yt-uix-sessionlink" href="${data.href}" data-sessionlink="">
<img class="small-arrow" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="">Play all
</a>
</div>
<div class="browse-item-row ytg-box">${videos}</div>
</div>`;
            },
                Video: (data) => {
                    return `<div class="browse-item yt-tile-default">
<a href="https://www.youtube.com/watch?v=${data.id}" class="ux-thumb-wrap yt-uix-sessionlink yt-uix-contextlink contains-addto" data-sessionlink="">
<span class="video-thumb ux-thumb yt-thumb-default-194">
<span class="yt-thumb-clip">
<span class="yt-thumb-clip-inner">
<img src="//i1.ytimg.com/vi/${data.id}/mqdefault.jpg" alt="Thumbnail" data-thumb="//i1.ytimg.com/vi/${data.id}/mqdefault.jpg" data-group-key="thumb-group-0" width="194"><span class="vertical-align"></span>
</span>
</span>
</span>
<span class="video-time">${data.time}</span>
${document.cosmicCat.Template.Buttons.addTo(data.id)}
</a>
<div class="browse-item-content">
<h3 dir="ltr">
<a href="https://www.youtube.com/watch?v=${data.id}" title="" class="yt-uix-sessionlink" data-sessionlink="">${data.title}</a>
</h3>
<div class="browse-item-info">
<div class="metadata-line">
<span class="viewcount">${data.views}</span>
<span class="metadata-separator">|</span>
<span class="video-date-added">${data.upload}</span>
</div>
<a href="${data.owner?.url}/videos" class="yt-uix-sessionlink yt-user-name" data-sessionlink="" dir="ltr">${data.owner?.name}</a>
</div>
</div>
</div>`;
                }
            }
        },
        Channel: {
            Channels3: {
                Main: (data) => {
                    return `<div id="content">
<div id="branded-page-default-bg" class="ytg-base">
<div id="branded-page-body-container" class="ytg-base clearfix enable-fancy-subscribe-button">
${document.cosmicCat.Channels.isOwner() ? document.cosmicCat.Template.Channel.Channels3.creatorBar.Main(data) : ""}
${document.cosmicCat.Template.Channel.Channels3.Header(data)}
${document.cosmicCat.Template.Channel.Channels3.Content(data)}
</div>
${data.header.bannerBg ? `
<style>
#branded-page-body-container {
background-color: #111111;
background-image: url(${data.header.bannerBg});
background-repeat: no-repeat;
background-position: center top;
}
</style>
` : ""}
</div>
</div>`;
                },
                Header: (data) => {
                    return `<div id="branded-page-header-container" class="ytg-wide banner-displayed-mode">
<div id="branded-page-header" class="ytg-wide">
<div id="channel-header-main">
<div class="upper-section clearfix">
<a href="${window.location.pathname}">
<span class="channel-thumb context-image-container" data-context-image="${data.header.avatar}">
<span class="video-thumb ux-thumb yt-thumb-square-60">
<span class="yt-thumb-clip">
<span class="yt-thumb-clip-inner">
<img src="${data.header.avatar}" alt="${data.header.avatar}" width="60"><span class="vertical-align"></span>
</span>
</span>
</span>
</span>
</a>
<div class="upper-left-section">
<h1 class="context-source-container" data-context-source="${data.header.name}">
<span class="qualified-channel-title">${data.header.name}</span>
</h1>
</div>
<div class="upper-left-section">
${document.cosmicCat.Template.Buttons.Subscribe(data.header.id)}
</div>
<div class="upper-right-section">
<div class="header-stats">
<div class="stat-entry">
<span class="stat-value">${data?.info?.subs || data?.header?.subscriberCount}</span>
<span class="stat-name">subscribers</span>
</div>
<div class="stat-entry">
<span class="stat-value">${data?.info?.fields?.views || data?.header?.fields?.views}</span>
<span class="stat-name">video views</span>
</div>
</div>
<span class="valign-shim"></span>
</div>
</div>
<div class="channel-horizontal-menu clearfix">
<ul role="tablist">
<li role="presentation" ${document.cosmicCat.Channels.isCurrentChannelTab("featured") ? "class=\"selected\"" : ""}>
<a href="./featured" class="gh-tab-100" role="tab" aria-selected="${document.cosmicCat.Channels.getCurrentChannelTab("featured") ? "true" : "false"}">${localizeString("channels.3.header.tabs.featured")}</a>
</li>
<li role="presentation" ${document.cosmicCat.Channels.getCurrentChannelTab().match(/videos|playlists|community/) ? "class=\"selected\"" : ""}>
<a href="${document.cosmicCat.Utils.browseTabs.find(ytInitialData, "videos") ? "./videos" : "./playlists"}" class="gh-tab-101" role="tab" aria-selected="${document.cosmicCat.Channels.getCurrentChannelTab().match(/videos|playlists/) ? "true" : "false"}">${localizeString("channels.3.header.tabs.videos")}</a>
</li>
</ul>
<form id="channel-search" class="" action="${window.location.pathname}">
<input name="query" type="text" autocomplete="off" class="search-field label-input-label" maxlength="100" placeholder="${localizeString("channels.3.header.tabs.search")}" value="">
<button class="search-btn" type="submit">
<span class="search-btn-content">Search</span>
</button>
<a class="search-dismiss-btn" href="${window.location.pathname}?view=0">
<span class="search-btn-content">Clear</span>
</a>
</form>
</div>
</div>
</div>
</div>`;
                },
                Content: () => {
                    return `<div id="branded-page-body">
<div class="channel-tab-content channel-layout-two-column selected everything-template">
<div class="tab-content-body">
</div>
</div>
</div>`;
                },
                primaryPane: {
                    featured: {
                        Main: () => {
                            return `<div class="primary-pane"></div>`;
                        },
                        featuredVideo: (data, d) => {
                            return `<div class="channels-featured-video channel-module yt-uix-c3-module-container has-visible-edge">
<div class="channels-video-player player-root" data-video-id="1${data.id}" style="overflow: hidden;" data-swf-config=""></div>
<div class="channels-featured-video-details yt-tile-visible clearfix">
<h3 class="title">
<a href="http://www.youtube.com/watch?v=${data.id}" class="yt-uix-sessionlink" data-sessionlink="ei=CJXfprr5i7QCFScVIQodyVre8w%3D%3D&amp;feature=plcp">${data.title}</a>
<div class="view-count-and-actions">
<div class="view-count">
<span class="count">${document.cosmicCat.Utils.deabreviateCnt(data.views?.split(" ")[0])}</span> views
</div>
</div>
</h3>
<p class="channels-featured-video-metadata">
<span>by ${d.name}</span>
<span class="created-date">${data.upload}</span>
</p>
</div>
</div>`;
                        },
                        playlist: () => {
                            return `<div class="playlists-wide channel-module yt-uix-c3-module-container">
<div class="module-view">
<h2>Featured Playlists</h2>
<div class="playlist yt-tile-visible yt-uix-tile">
<div class="playlist-metadata">
<h3 dir="ltr">
<a class="yt-uix-tile-link" href="/playlist?list=PLB152C3F078759BF6&amp;feature=plcp">Trending Videos of the Week (1/14)</a>
</h3>
<p class="description" dir="ltr">See 11 of this week's top trending videos from YouTube.com/Trends</p>
</div>
<a class="yt-uix-contextlink play-all yt-uix-sessionlink" href="//www.youtube.com/watch?v=SKVcQnyEIT8&amp;list=PLB152C3F078759BF6&amp;feature=plcp" data-sessionlink="context=C40b03a5FDvjVQa1PpcFMfMNMbMOtv57rhWW-JBvg6eXMc319H4IY%3D">
<span class="playlist-thumb-strip playlist-thumb-strip-350">
<span class="videos videos-5 vertical-cutoff">
<span class="clip">
<span class="centering-offset">
<span class="centering">
<span class="ie7-vertical-align-hack">&nbsp;</span><img src="//i4.ytimg.com/vi/SKVcQnyEIT8/default.jpg" data-thumb="//i4.ytimg.com/vi/SKVcQnyEIT8/default.jpg" alt="" class="thumb" data-group-key="thumb-group-0"></span>
</span>
</span><span class="clip">
<span class="centering-offset">
<span class="centering">
<span class="ie7-vertical-align-hack">&nbsp;</span><img src="//i2.ytimg.com/vi/qX6UhgboDgc/default.jpg" data-thumb="//i2.ytimg.com/vi/qX6UhgboDgc/default.jpg" alt="" class="thumb" data-group-key="thumb-group-0"></span>
</span>
</span><span class="clip">
<span class="centering-offset">
<span class="centering">
<span class="ie7-vertical-align-hack">&nbsp;</span><img src="//i2.ytimg.com/vi/1IAhDGYlpqY/default.jpg" data-thumb="//i2.ytimg.com/vi/1IAhDGYlpqY/default.jpg" alt="" class="thumb" data-group-key="thumb-group-0"></span>
</span>
</span><span class="clip">
<span class="centering-offset">
<span class="centering">
<span class="ie7-vertical-align-hack">&nbsp;</span><img src="//i2.ytimg.com/vi/ElER4dZSaOs/default.jpg" data-thumb="//i2.ytimg.com/vi/ElER4dZSaOs/default.jpg" alt="" class="thumb" data-group-key="thumb-group-0"></span>
</span>
</span><span class="clip">
<span class="centering-offset">
<span class="centering">
<span class="ie7-vertical-align-hack">&nbsp;</span><img src="//i3.ytimg.com/vi/f-x8t0JOnVw/default.jpg" data-thumb="//i3.ytimg.com/vi/f-x8t0JOnVw/default.jpg" alt="" class="thumb" data-group-key="thumb-group-0"></span>
</span>
</span>
</span>
<span class="resting-overlay">
<img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" class="play-button" alt="Play all"><span class="video-count-box">11 videos</span>
</span>
<span class="hover-overlay">
<span class="play-all-container">
<strong><img src="//s.ytimg.com/yts/img/ui/playlist_thumb_strip/mini-play-all-vflZu1SBs.png" alt="">Play all</strong>
</span>
</span>
</span>
</a>
</div>
<a class="view-all-link" href="/web/20121025230635/http://www.youtube.com/user/YouTube/videos?view=1">view all
<img src="//web.archive.org/web/20121025230635im_/http://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="">
</a>
</div>
</div>`;
                        }
                    },
                    browseVideos: {
                        Main: (data) => {
                            return `<div class="primary-pane">
<div class="channel-browse">
<div class="browse-heading channels-browse-gutter-padding">
<div id="channels-browse-header" class="clearfix">
<div id="browse-view-options">
<button type="button" class="flip channels-browse-options yt-uix-button yt-uix-button-text" onclick=";return false;" data-button-menu-id="browse-view-options-menu" role="button" aria-pressed="false" aria-expanded="false">
<span class="yt-uix-button-content">View </span><img class="yt-uix-button-arrow" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="">
</button>
<div id="browse-view-options-menu" class="channel-nav-item-dropdown yt-uix-button-menu yt-uix-button-menu-external hid" style="min-width: 69px; left: 605.833px; top: 313.5px; display: none;">
</div>
</div>
<ul>
${document.cosmicCat.Utils.browseTabs.find(ytInitialData, "videos") ? `
<li class="channels-browse-filter ${document.cosmicCat.Channels.isCurrentChannelTab("videos") ? "selected" : ""}">
<a href="./videos">Uploads</a>
</li>
` : ""}
${document.cosmicCat.Utils.browseTabs.find(ytInitialData, "playlists") ? `
<li class="channels-browse-filter ${document.cosmicCat.Channels.isCurrentChannelTab("playlists") ? "selected" : ""}">
<a href="./playlists">Playlists</a>
</li>
` : ""}
${document.cosmicCat.Utils.browseTabs.find(ytInitialData, "community") ? `
<li class="channels-browse-filter ${document.cosmicCat.Channels.isCurrentChannelTab("community") ? "selected" : ""}">
<a href="./community">Feed</a>
</li>
` : ""}
</ul>
</div>
<div id="channel-feed-post-form">
</div>
<div class="yt-horizontal-rule channel-section-hr"><span class="first"></span><span class="second"></span><span class="third"></span></div>
</div>
<ul class="channels-browse-content-grid clearfix channels-browse-gutter-padding context-data-container">
</ul>
<div class="channels-browse-gutter-padding"></div>
</div>
</div>`;
                        },
                        Navigation: () => {
                            return `<div class="yt-uix-pager" role="navigation">
<a class="yt-uix-button yt-uix-sessionlink yt-uix-pager-page-num yt-uix-pager-button yt-uix-button-toggled yt-uix-button-default" data-page="1" aria-label="Go to page 1" data-sessionlink="ei=CPyLrL_cnbICFRgJIQod5QyJsA%3D%3D">
<span class="yt-uix-button-content">1</span></a>&nbsp;
<a class="yt-uix-button yt-uix-sessionlink yt-uix-pager-next yt-uix-pager-button yt-uix-button-default" data-page="2" id="next-btn" onclick="document.cosmicCat.Channels.Channels3.Pagination.next(this.getAttribute('data-token'), this.getAttribute('data-page'))" data-sessionlink="ei=CPyLrL_cnbICFRgJIQod5QyJsA%3D%3D">
<span class="yt-uix-button-content">Next »</span></a>
</div>`;
                        },
                        activityFeed: () => {
                            return `<div class="activity-feed">
<div class="feed-list-container context-data-container">
<div class="feed-item-list">
<ul></ul>
<button type="button" class="yt-uix-load-more load-more-button yt-uix-button yt-uix-button-default" onclick=";return false;" data-uix-load-more-href="/channel_ajax?action_load_more_feed_items=1&amp;activity_view=1&amp;channel_id=UCBR8-60-B28hp2BmDPdntcQ&amp;paging=1352838391" role="button"><span class="yt-uix-button-content">Load More </span></button>
</div>
</div>
</div>`;
                        },
                        listItem: {
                            videos: (data) => {
                                return `<li class="channels-content-item">
<span class="context-data-item" data-context-item-title="${data.title}" data-context-item-type="video" data-context-item-time="${data.time}" data-context-item-user="" data-context-item-id="${data.id}" data-context-item-views="${data.views}">
<a href="https://www.youtube.com/watch?v=${data.id}" class="ux-thumb-wrap yt-uix-sessionlink yt-uix-contextlink contains-addto spf-link" data-sessionlink="ei">
<span class="video-thumb ux-thumb yt-thumb-default-194">
<span class="yt-thumb-clip">
<span class="yt-thumb-clip-inner">
<img src="${data.thumbnail}" alt="Thumbnail" width="194"><span class="vertical-align"></span>
</span>
</span>
</span>
<span class="video-time">${data.time}</span>
${document.cosmicCat.Template.Buttons.addTo(data.id)}
</a>
<a href="https://www.youtube.com/watch?v=${data.id}" title="${data.title}" class="content-item-title spf-link yt-uix-sessionlink yt-uix-contextlink" dir="ltr" data-sessionlink="ei">${data.title}</a>
<span class="content-item-detail">
<span class="content-item-view-count">${data.views}</span><span class="metadata-separator">|</span><span class="content-item-time-created">${data.upload}</span>
</span>
</span>
</li>`;
                            },
                            sidethumb: (data) => {
                                return `<span class="sidethumb">
<span class="video-thumb ux-thumb yt-thumb-default-43">
<span class="yt-thumb-clip">
<span class="yt-thumb-clip-inner">
<img src="${data.thumbnails[0].url}" alt="Thumbnail" data-thumb="${data.thumbnails[0].url}" data-group-key="thumb-group-0" width="43"><span class="vertical-align"></span>
</span>
</span>
</span>
</span>`;
                            },
                            playlists: (data) => {
                                let sideThumbs = "";
                                try {
                                    for (let i = 0; i < data.sidethumbs.length; i++) {
                                        sideThumbs += document.cosmicCat.Template.Channel.Channels3.primaryPane.browseVideos.listItem.sidethumb(data.sidethumbs[i]);
                                    }
                                } catch {}
                                return `<li class="channels-content-item">
<span class="context-data-item" data-context-item-title="${data.title}" data-context-item-count="8 videos" data-context-item-id="PLbpi6ZahtOH5-VjZPSkqc0JI118RXAcGU" data-context-item-type="playlist" data-context-item-videos="[&quot;SNc7vYXqtVg&quot;, &quot;T7SwehyOh3c&quot;, &quot;IQG-xM62tQg&quot;, &quot;c8DaqgMPrmQ&quot;, &quot;f4LhCv7RY4E&quot;]">
<a href="${data.url}" class="yt-pl-thumb-link yt-uix-contextlink yt-uix-sessionlink" data-sessionlink="ei">
<span class="yt-pl-thumb">
<span class="video-thumb ux-thumb yt-thumb-default-194">
<span class="yt-thumb-clip">
<span class="yt-thumb-clip-inner">
<img src="${data.thumbnail}" alt="Thumbnail" data-thumb="${data.thumbnail}" data-group-key="thumb-group-0" width="194"><span class="vertical-align"></span>
</span>
</span>
</span>
<span class="sidebar sidebar-height-109">
<span class="video-count-wrapper">
<span class="video-count-block">
<span class="count-label">${data.videos.totalNumber}</span>
<span class="text-label">videos</span>
</span>
</span>
<span class="side-thumbs">
${sideThumbs}
</span>
</span>
<span class="yt-pl-thumb-overlay">
<span class="yt-pl-thumb-overlay-content">
<img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="">Play all
</span>
</span>
</span>
</a>
<span class="content-item-detail">
<a class="content-item-title" href="https://www.youtube.com/playlist?list=${data.id}" dir="ltr">${data.title}</a>
<span class="content-item-view-count">${data.videos.text}</span>
<span class="metadata-separator">|</span>
<span class="content-item-time-created">${data.updated}</span>
</span>
</span>
</li>`;
                            },
                            community: (data) => {
                                return `<li>
<div class="feed-item-container channels-browse-gutter-padding" data-channel-key="${data.owner.id}">
<div class="feed-author-bubble-container">
<a href="https://www.youtube.com${data.owner.url}" class="feed-author-bubble">
<span class="feed-item-author">
<span class="video-thumb ux-thumb yt-thumb-square-28">
<span class="yt-thumb-clip">
<span class="yt-thumb-clip-inner">
<img src="${data.owner.icon}" alt="" data-thumb="${data.owner.icon}" data-group-key="thumb-group-0" width="28"><span class="vertical-align"></span>
</span>
</span>
</span>
</span>
</a>
</div>
<div class="feed-item-main">
<div class="feed-item-header">
<span class="feed-item-actions-line">
<span class="feed-item-owner">
<a href="https://www.youtube.com${data.owner.url}?feature=plcp" class="yt-user-name">${data.owner.name}</a></span> posted
<span class="feed-item-time">${data.upload}</span>
<div class="feed-item-post">
<p>${data.description}</p>
</div>
</span>
</div>
</div>
</div>
<div class="feed-item-dismissal-notices">
<div class="feed-item-dismissal feed-item-dismissal-hide hid">This item has been hidden</div>
<div class="feed-item-dismissal feed-item-dismissal-uploads hid">In the future you will only see uploads from <span class="feed-item-owner"><a href="https://www.youtube.com${data.owner.url}?feature=plcp" class="yt-user-name">${data.owner.name}</a></span></div>
<div class="feed-item-dismissal feed-item-dismissal-all-activity hid">In the future you will see all activity from <span class="feed-item-owner"><a href="https://www.youtube.com${data.owner.url}?feature=plcp" class="yt-user-name">${data.owner.name}</a></span></div>
<div class="feed-item-dismissal feed-item-dismissal-unsubscribe hid">You have been unsubscribed from <span class="feed-item-owner"><a href="https://www.youtube.com${data.owner.url}?feature=plcp" class="yt-user-name">${data.owner.name}</a></span></div>
</div>
</li>`;
                            }
                        }
                    }
                },
                secondaryPane: {
                    Main: (data) => {
                        return `<div class="secondary-pane">
<div class="user-profile channel-module yt-uix-c3-module-container">
<div class="module-view profile-view-module" data-owner-external-id="BR8-60-B28hp2BmDPdntcQ">
<h2>${localizeString("channels.3.body.secondaryPane.userProfile.about", data?.header?.name)}</h2>
${document.cosmicCat.Template.Channel.Channels3.secondaryPane.firstSection.Main(data)}
${document.cosmicCat.Template.Channel.Channels3.secondaryPane.createdBySection.Main(data)}
</div>
</div>`;
                    },
                    firstSection: {
                        Main: (data) => {
                            return `<div class="section first">
<div class="user-profile-item profile-description">
<p>${data?.info?.fields?.description}</p>
</div>
<div class="user-profile-item profile-socials">
</div>
<hr class="yt-horizontal-rule">
</div>`;
                        },
                        socialLink: (data) => {
                            return `<div class="yt-c3-profile-custom-url field-container">
<a href="${data.navigationEndpoint.urlEndpoint.url}" rel="me nofollow" target="_blank" title="${data.title.simpleText}" class="yt-uix-redirect-link">
<img src="${data.icon.thumbnails[0].url}" class="favicon" alt="${data.title.simpleText}"><span class="link-text">${data.title.simpleText}</span>
</a>
</div>`;
                        }
                    },
                    createdBySection: {
                        Main: (data) => {
                            return `<div class="section created-by-section">
<div class="user-profile-item">${localizeString("channels.3.body.secondaryPane.userProfile.createdBy.by", data.header?.name)}</div>
<ul>
${document.cosmicCat.Template.Channel.Channels3.secondaryPane.createdBySection.Item(data.info)}
</ul>
</div>`;
                        },
                        Item: (data) => {
                            let fields = "";
                            for (const info in data.fields) {
                                if (data.fields[info] && !info.match(/description|views/i)) {
                                    fields += `<li class="user-profile-item">
<span class="item-name">${localizeString("channels.2.modules.userProfile.cards." + info)}</span>
<span class="value">${data.fields[info]}</span>
</li>`;
                                }
                            }
                            return fields;
                        }
                    }
                },
                creatorBar: {
                    Main: (data) => {
                        return `<div id="watch7-creator-bar" class="clearfix yt-uix-button-panel" style="width: 970px;margin-left: auto;margin-right: auto;margin-top: 10px">
<ul id="watch7-creator-bar-nav-buttons">
<li class="creator-bar-item">
<a href="https://www.youtube.com/analytics" class="yt-uix-button yt-uix-sessionlink yt-uix-button-dark yt-uix-button-size-default" data-sessionlink="ei=PAqqU5WaN4278AO4hoCACg&amp;feature=mhsn">
<span class="yt-uix-button-content">${localizeString("channels.3.creatorBar.analytics")}</span>
</a>
</li>
<li class="creator-bar-item">
<a href="/my_videos" class="yt-uix-button yt-uix-sessionlink yt-uix-button-dark yt-uix-button-size-default" data-sessionlink="ei=PAqqU5WaN4278AO4hoCACg&amp;feature=mhsn">
<span class="yt-uix-button-content">${localizeString("channels.3.creatorBar.videomanager")}</span>
</a>
</li>
</ul>
<ul id="watch7-creator-bar-edit-buttons">
<li class="creator-bar-item">
<a href="https://studio.youtube.com/channel/${data.header.id}/editing/details" class="yt-uix-button yt-uix-sessionlink yt-uix-button-dark yt-uix-button-size-default" data-sessionlink="ei=PAqqU5WaN4278AO4hoCACg&amp;feature=mhsn">
<span class="yt-uix-button-content">${localizeString("channels.3.creatorBar.settings")}</span>
</a>
</li>
</ul>
</div>`;
                    }
                }
            },
            Channels2: {
                Main: (data) => {
                    return `<div id="channel-body" style="background-color: rgb(204, 204, 204)" class="jsloaded">
<div id="channel-base-div">
${document.cosmicCat.Template.Channel.Channels2.playlistNavigator.Main(data)}
${document.cosmicCat.Template.Channel.Channels2.moduleContainer.Main(data)}
</div>
</div>`;
                },
                playlistNavigator: {
                    Main: (data) => {
                        return `<div id="user_playlist_navigator" class="outer-box yt-rounded">
${document.cosmicCat.Template.Channel.Channels2.playlistNavigator.Header(data.header)}
<div id="subscribeMessage" class="hid">&nbsp;</div>
<div id="subscription-button-module-menu" class="hid subscription-menu-expandable subscription-menu">
<div class="subscription-menu-not-logged-in">
<strong>
<a href="${document.cosmicCat.data.loginUrl}">Sign in</a> or <a href="https://www.youtube.com/signup">sign up</a> now!
</strong>
</div>
</div>
<div id="user_playlist_navigator-messages" class="hid"></div>
${document.cosmicCat.Template.Channel.Channels2.playlistNavigator.Content.Main(data)}`;
                    },
                    Header: (data) => {
                        return `<div id="playnav-channel-header" class="inner-box-bg-color">
<div id="playnav-title-bar">
<div id="playnav-channel-name" class="outer-box-bg-color">
<div class="channel-thumb-holder outer-box-color-as-border-color">
<div class="user-thumb-semismall ">
<div>
<img src="${data.avatar}">
</div>
</div>
</div>
<div class="channel-title-container">
<div class="channel-title outer-box-color" id="channel_title" dir="ltr">${data.name}</div>
<div class="channel-title outer-box-color" style="font-size:11px" id="channel_base_title">${data.name}'s Channel</div>
</div>
<div id="subscribe-buttons">
${document.cosmicCat.Template.Buttons.Subscribe(data.id)}
</div>
</div>
<div id="playnav-chevron">&nbsp;</div>
</div>
<div id="playnav-navbar">
<table>
<tbody>
<tr>
<td>
<a class="navbar-tab inner-box-link-color ${document.cosmicCat.Channels.isCurrentChannelTab("videos") ? "navbar-tab-selected" : ""}" id="playnav-navbar-tab-uploads" href="javascript:;" onclick="document.cosmicCat.Channels.playnav.selectTab('videos', this);">Uploads</a>
</td>
<td>
<a class="navbar-tab inner-box-link-color ${document.cosmicCat.Channels.isCurrentChannelTab("playlists") ? "navbar-tab-selected" : ""}" id="playnav-navbar-tab-playlists" href="javascript:;" onclick="document.cosmicCat.Channels.playnav.selectTab('playlists', this);">Playlists</a>
</td>
</tr>
</tbody>
</table>
</div>
<div class="cb"></div>
</div>
`;
                    },
                    Content: {
                        Main: (data) => {
                            return `<div id="playnav-body" style="height: auto;">
<div id="playnav-player" class="playnav-player-container" style="height: 390px; visibility: visible; left: 0px;">

</div>
<div id="playnav-playview" class="" style="display: block;">
${document.cosmicCat.Template.Channel.Channels2.playlistNavigator.Content.Restricted(data)}
${document.cosmicCat.Template.Channel.Channels2.playlistNavigator.Content.LeftPanel.Main(data)}
${document.cosmicCat.Template.Channel.Channels2.playlistNavigator.Content.PlayPanel.Main(data)}
${document.cosmicCat.Template.Channel.Channels2.playlistNavigator.Content.Loading()}
</div>
</div>`;
                        },
                        Restricted: (data) => {
                            return `<div id="playnav-player-restricted" class="inner-box-colors" style="display: none;">
<div id="playnav-inner-restricted">
<div id="playnav-restricted-title-div"><h3 id="playnav-restricted-title"></h3></div>
<div id="playnav-login-required" class="playnav-restricted-msg">
<p>You must be <a class="playnav-restricted-link" href="">logged in</a> to view this video.</p>
</div>
<div id="playnav-controversy" class="playnav-restricted-msg">
<p>The following content has been identified by the YouTube community as being potentially offensive or inappropriate. Viewer discretion is advised.
Please <a class="playnav-restricted-link" href="">confirm</a> that you wish to view this video.</p>
</div>
<div id="playnav-verify-age-for-age-gated" class="playnav-restricted-msg">
<p>This video or group may contain content that is inappropriate for some users, <a href="https://www.google.com/support/youtube/bin/answer.py?answer=186529" target="_blank">as determined by the video uploader.</a>
To view this video or group, please <a class="playnav-restricted-link" href="">click here</a> to sign in or sign up and verify that you are of the appropriate age.</p>
</div>
<div id="playnav-verify-age" class="playnav-restricted-msg">
<p>This video requires that you log in to verify your age.
Please <a class="playnav-restricted-link" href="">confirm</a> that you wish to view this video.</p>
</div>
<div id="playnav-unavailable" class="playnav-restricted-msg">
<p>This video is unavailable.</p>
</div>
<div id="playnav-custom-error-message" class="playnav-restricted-msg"></div>
</div>
</div>`;
                        },
                        LeftPanel: {
                            Main: (data) => {
                                return `<div id="playnav-left-panel" style="display: block;">
<div class="playnav-player-container"></div>
<div id="playnav-video-details">
<div id="playnav-bottom-links">
<div id="playnav-bottom-links-clip" class="playnav-bottom-links-clip">
<table>
<tbody>
<tr>
<td id="playnav-panel-tab-info" class="panel-tab-selected">
<table class="panel-tabs">
<tbody>
<tr>
<td class="panel-tab-title-cell">
<div class="playnav-panel-tab-icon" id="panel-icon-info" onmouseover="_addclass(_gel('playnav-panel-tab-info'), 'panel-tab-hovered')" onmouseout="_removeclass(_gel('playnav-panel-tab-info'), 'panel-tab-hovered')" onclick="playnav.selectPanel('info')"></div>
<div class="playnav-bottom-link" id="info-bottom-link">
<a href="javascript:;" onmouseover="_addclass(_gel('playnav-panel-tab-info'), 'panel-tab-hovered')" onmouseout="_removeclass(_gel('playnav-panel-tab-info'), 'panel-tab-hovered')" onclick="playnav.selectPanel('info')">Info</a>
</div>
<div class="spacer">&nbsp;</div>
</td>
</tr>
<tr>
<td class="panel-tab-indicator-cell inner-box-opacity">
<div class="panel-tab-indicator-arrow"></div>
</td>
</tr>
</tbody>
</table>
</td>
<td id="playnav-panel-tab-favorite">
<table class="panel-tabs">
<tbody>
<tr>
<td class="panel-tab-title-cell">
<div class="playnav-panel-tab-icon" id="panel-icon-favorite" onmouseover="_addclass(_gel('playnav-panel-tab-favorite'), 'panel-tab-hovered')" onmouseout="_removeclass(_gel('playnav-panel-tab-favorite'), 'panel-tab-hovered')" onclick="playnav.selectPanel('favorite')"></div>
<div class="playnav-bottom-link" id="favorite-bottom-link">
<a href="javascript:;" onmouseover="_addclass(_gel('playnav-panel-tab-favorite'), 'panel-tab-hovered')" onmouseout="_removeclass(_gel('playnav-panel-tab-favorite'), 'panel-tab-hovered')" onclick="playnav.selectPanel('favorite')">Favorite</a>
</div>
<div class="spacer">&nbsp;</div>
</td>
</tr>
<tr>
<td class="panel-tab-indicator-cell inner-box-opacity">
<div class="panel-tab-indicator-arrow"></div>
</td>
</tr>
</tbody>
</table>
</td>
<td id="playnav-panel-tab-share">
<table class="panel-tabs">
<tbody>
<tr>
<td class="panel-tab-title-cell">
<div class="playnav-panel-tab-icon" id="panel-icon-share" onmouseover="_addclass(_gel('playnav-panel-tab-share'), 'panel-tab-hovered')" onmouseout="_removeclass(_gel('playnav-panel-tab-share'), 'panel-tab-hovered')" onclick="playnav.selectPanel('share')"></div>
<div class="playnav-bottom-link" id="share-bottom-link">
<a href="javascript:;" onmouseover="_addclass(_gel('playnav-panel-tab-share'), 'panel-tab-hovered')" onmouseout="_removeclass(_gel('playnav-panel-tab-share'), 'panel-tab-hovered')" onclick="playnav.selectPanel('share')">Share</a>
</div>
<div class="spacer">&nbsp;</div>
</td>
</tr>
<tr>
<td class="panel-tab-indicator-cell inner-box-opacity">
<div class="panel-tab-indicator-arrow"></div>
</td>
</tr>
</tbody>
</table>
</td>
<td id="playnav-panel-tab-flag">
<table class="panel-tabs">
<tbody>
<tr>
<td class="panel-tab-title-cell">
<div class="playnav-panel-tab-icon" id="panel-icon-flag" onmouseover="_addclass(_gel('playnav-panel-tab-flag'), 'panel-tab-hovered')" onmouseout="_removeclass(_gel('playnav-panel-tab-flag'), 'panel-tab-hovered')" onclick="playnav.selectPanel('flag')"></div>
<div class="playnav-bottom-link" id="flag-bottom-link">
<a href="javascript:;" onmouseover="_addclass(_gel('playnav-panel-tab-flag'), 'panel-tab-hovered')" onmouseout="_removeclass(_gel('playnav-panel-tab-flag'), 'panel-tab-hovered')" onclick="playnav.selectPanel('flag')">Flag</a>
</div>
<div class="spacer">&nbsp;</div>
</td>
</tr>
<tr>
<td class="panel-tab-indicator-cell inner-box-opacity">
<div class="panel-tab-indicator-arrow"></div>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</div>
<div class="cb"></div>
<div class="playnav-video-panel inner-box-colors border-box-sizing">
<div id="playnav-video-panel-inner" class="playnav-video-panel-inner border-box-sizing" style="overflow: auto;">
${document.cosmicCat.Template.Channel.Channels2.playlistNavigator.Content.LeftPanel.Info(data)}
</div>
<div id="playnav-panel-comments" class="hid"></div>
<div id="playnav-panel-favorite" class="hid"></div>
<div id="playnav-panel-share" class="hid scrollable"></div>
<div id="playnav-panel-playlists" class="hid"></div>
<div id="playnav-panel-flag" class="hid scrollable"></div>
</div>
</div>
</div>
</div>
</div>`;
                        },
                            Info: (data) => {
                                return `<div id="playnav-panel-info" class="scrollable" style="display: block;">
<div id="channel-like-action">
<div id="channel-like-buttons">
<button class=" yt-uix-button yt-uix-tooltip" type="button" id="watch-like" onclick=";return false;" title="I like this" data-button-action="playnav.like" role="button">
<img class="yt-uix-button-icon yt-uix-button-icon-watch-like" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="I like this">
<span class="yt-uix-button-content">Like </span>
</button>
&nbsp;
<button class=" yt-uix-button yt-uix-tooltip yt-uix-button-empty" type="button" id="watch-unlike" onclick=";return false;" title="I dislike this" data-button-action="playnav.unlike" role="button">
<img class="yt-uix-button-icon yt-uix-button-icon-watch-unlike" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="I dislike this"></button>
</div>
<form method="post" action="//www.youtube.com/watch_actions_Ajax" name="likeForm" class="hid">
<input type="hidden" name="action_like_video" value="1">
<input type="hidden" name="video_id" value="${data.id}">
<input name="session_token" type="hidden" value="jk7H8NNcOfnfqH-6En0oRy0yffx8MTMyNzU5Njg5NEAxMzI3NTEwNDk0"></form>
<form method="post" action="//www.youtube.com/watch_actions_Ajax" name="unlikeForm" class="hid">
<input type="hidden" name="action_dislike_video" value="1">
<input type="hidden" name="video_id" value="${data.id}">
<input name="session_token" type="hidden" value="jk7H8NNcOfnfqH-6En0oRy0yffx8MTMyNzU5Njg5NEAxMzI3NTEwNDk0"></form>
<div id="channel-like-logged-out" class="hid">
<strong>
<a href="${document.cosmicCat.data.loginUrl}">Sign in</a> or <a href="https://www.youtube.com/signup">sign up</a> now!
</strong>
</div>
<div id="channel-like-close" class="hid">
<div class="close">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" class="close-button" onclick="playnav.hideLike();"></div>
</div>
</div>
<div id="playnav-curvideo-title" class="inner-box-link-color" dir="ltr">
<a href="https://www.youtube.com/watch?v=${data.id}&amp;feature=channel_video_title"></a>
</div>
<div id="playnav-curvideo-info-line">From:
<span id="playnav-curvideo-channel-name">
<a href="https://www.youtube.com/${data.info.url}" class="yt-user-name" dir="ltr">${data.info.name}</a>
</span>| <span dir="ltr"></span>&nbsp;| <span id="playnav-curvideo-view-count"></span>
</div>
<div class="cb"></div>
<div id="channel-like-result" class="hid">
<div id="watch-actions-area" class="yt-rounded">&nbsp;</div>
</div>
<div id="channel-like-loading" class="hid">${localizeString("global.loading.main")}</div>
<div class="cb"></div>
<div id="playnav-curvideo-description-container">
<div id="playnav-curvideo-description" dir="ltr">
<div id="playnav-curvideo-description-more-holder" style="display: block;">
<div id="playnav-curvideo-description-more" class="inner-box-bg-color">
...&nbsp;<a class="channel-cmd" href="javascript:;" onclick="playnav.toggleFullVideoDescription(true)">(more info)</a>&nbsp;&nbsp;
</div>
<div class="cb"></div>
</div>
<span id="playnav-curvideo-description-less">
<a href="javascript:;" class="channel-cmd" onclick="playnav.toggleFullVideoDescription(false)">(less info)</a>
</span>
</div>
</div>
<a href="https://www.youtube.com/watch?v=${data.id}" id="playnav-watch-link" onclick="playnav.goToWatchPage()">View comments, related videos, and more</a>
<div id="playnav-curvideo-controls"></div>
<div class="cb"></div>
<script>
if (_gel('playnav-curvideo-description').offsetHeight > 28) {
   _gel('playnav-curvideo-description-more-holder').style.display = 'block';
}
</script>
</div>`;
                            }
                        },
                        PlayPanel: {
                            Main: (data) => {
                                return `<div id="playnav-play-panel">
<div id="playnav-play-content" style="height: 601px;">
${document.cosmicCat.Template.Channel.Channels2.playlistNavigator.Content.PlayPanel.Holder.Main()}
</div>
</div>`;
                            },
                            Holder: {
                                Main: () => {
                                    const chk = (window.location.hash == "#p/p" ? "playlists" : "uploads");
                                    return `<div class="playnav-playlist-holder" id="playnav-play-playlist-${chk}-holder" style="display: block;">
<div id="playnav-play-${chk}-scrollbox" class="scrollbox-wrapper inner-box-colors">
<div class="scrollbox-content playnav-playlist-non-all">
<div class="scrollbox-body" style="height: 585px;">
<div class="outer-scrollbox">
<div id="playnav-play-${chk}-items" class="inner-scrollbox">
<div id="playnav-play-${chk}-page-0" class="scrollbox-page loaded ${chk}-rows-50">
</div>
</div>
</div>
</div>
</div>
</div>
</div>`;
                                },
                                videos: (data) => {
                                    return `<div id="playnav-video-play-uploads-6-${data.id}" class="playnav-item playnav-video">
<div style="display:none" class="encryptedVideoId">${data.id}</div>
<div id="playnav-video-play-uploads-6-${data.id}-selector" class="selector"></div>
<div class="content">
<div class="playnav-video-thumb">
<a href="https://www.youtube.com/watch?v=${data.id}" class="ux-thumb-wrap contains-addto">
<span class="video-thumb ux-thumb-96">
<span class="clip">
<img src="//i.ytimg.com/vi/${data.id}/hqdefault.jpg" alt="Thumbnail" class="" onclick="playnav.playVideo('uploads','6','${data.id}');return false;" title="${data.title}">
</span>
</span>
<span class="video-time">${data.time}</span>
${document.cosmicCat.Template.Buttons.addTo(data.id)}
</a>
</div>
<div class="playnav-video-info">
<a href="https://www.youtube.com/watch?v=${data.id}" class="playnav-item-title ellipsis" onclick="playnav.playVideo('uploads','6','${data.id}');return false;" id="playnav-video-title-play-uploads-6-${data.id}">
<span dir="ltr">${data.title}</span>
</a>
<div class="metadata">
<span dir="ltr">${data.views} - ${data.upload}</span>
</div>
<div style="display:none" id="playnav-video-play-uploads-6">${data.id}</div>
</div>
</div>
</div>`;
                                },
                                playlists: (data) => {
                                    return `<div class="playnav-item playnav-playlist">
<div style="display:none" class="encryptedPlaylistId">${data.id}</div>
<div class="selector"></div>
<div class="content">
<div class="playnav-playlist-thumb">
<div class="vCluster120WideEntry">
<div class="vCluster120WrapperOuter">
<div class="vCluster120WrapperInner">
<a id="video-url-${data.id}" href="javascript:;" rel="nofollow" onclick="playnav.selectPlaylist('user', '${data.id}')">
<img title="" src="${data.thumbnail}" class="vimgCluster120" alt="">
<span class="video-corner-text" id="video-corner-text-${data.id}">${data.videos.text}</span>
</a>
</div>
</div>
</div>
</div>
<div class="playnav-playlist-info">
<a href="javascript:;" class="playnav-item-title ellipsis" onclick="playnav.selectPlaylist('user', '${data.id}')" dir="ltr">${data.title}</a>
<div class="metadata">
${data.updated}<br>
<a href="javascript:;" onclick="playnav.selectPlaylist('user', '${data.id}')" class="more-info">more info</a>
</div>
</div>
<div class="cb"></div>
</div>
</div>`;
                                }
                            }
                        },
                        Loading: () => {
                            return `<div id="playnav-play-loading" class="loading" style="display: block">
<div class="cover outer-box-bg-color"></div>
<div class="image-holder">
<div class="image-holder-middle">
<div class="image-holder-inner">
<img src="//s.ytimg.com/yt/img/icn_loading_animated-vflff1Mjj.gif" alt="${localizeString("global.loading.main")}">
</div>
</div>
</div>
</div>`;
                        }
                    }
                },
                moduleContainer: {
                    Main: (data) => {
                        return `<div class="outer-box" id="main-channel-content" style="z-index: 0">
<div class="left-column" id="main-channel-left"></div>
<div class="right-column" id="main-channel-right"></div>
<div class="cb"></div>
</div>`;
                    },
                    profile: (data) => {
                        return `<div class="inner-box" id="module-profile">
<div style="float:left;padding:0 4px 4px 0" class="link-as-border-color">
<div class="user-thumb-xlarge">
<div>
<a href="${data.url}">
<img src="${data.avatar}">
</a>
</div>
</div>
</div>
<div style="float:left;width:170px">
<div class="box-title title-text-color" title="${data.name}" style="float:none;padding-left:4px;margin-top:-2px;width:170px;overflow:hidden;font-size:111%">
<span class="yt-user-name" dir="ltr">${data.name}</span>
</div>
<div style="whitespace:no-wrap;position:relative;width:170px;">
<div>
${document.cosmicCat.Template.Buttons.Subscribe(data.id)}
<div class="cb"></div>
</div>
<div style="padding:4px">
<a href="#" onclick="add_friend('${data.id}'); return false;">Add as Contact</a>
&nbsp;|&nbsp;
<span class="nowrap">
<a id="aProfileBlockUser" href="#" onclick="yt.www.watch.user.blockUserLinkByUsername('${data.id}', true);return false;">Block User</a>
&nbsp;|&nbsp;</span>
<span class="nowrap">
<a id="aProfileSendMsg" href="https://www.youtube.com/inbox?to_user_ext_ids=${data.id}&amp;action_compose=1">Send Message</a>
</span>
</div>
</div>
</div>
<div id="position-edit-subscription-in-channel"></div>
<div class="cb"></div>
</div>`;
                    },
                    userInfo: (data) => {
                        let fields = "";
                        for (const info in data.fields) {
                            if (data.fields[info]) {
                                fields += `<div class="show_info outer-box-bg-as-border">
<div class="profile-info-label">${localizeString("channels.2.modules.userProfile.cards." + info)}</div>
<div class="profile-info-value fn" id="profile_show_${info}">${data.fields[info]}</div>
<div class="cb"></div>
</div>`;
                            }
                        }
                        return `<div class="inner-box" id="user_profile">
<div class="box-title title-text-color">${localizeString("channels.2.modules.userProfile.title")}</div>
<div class="box-editor"></div>
<div class="cb"></div>
<div id="user_profile-body">
<div id="user_profile-messages" class="hid"></div>
<div class="edit_info spacer">&nbsp;</div>
<div class="profile_info vcard">
<div class="show_info outer-box-bg-as-border">
<div class="profile-info-label">${localizeString("channels.2.modules.userProfile.cards.name")}</div>
<div class="profile-info-value fn" id="profile_show_name">${data.name}</div>
<div class="cb"></div>
</div>
${fields}
</div>
</div>
<div class="cb"></div>
</div>`;
                    }
                },
                Stylesheet: () => {
                    return `<style>#channel-body {background-color: rgb(204, 204, 204)}
.outer-box, #playnav-channel-name {background-color: rgb(153, 153, 153)}
.outer-box-bg-color, .inner-box-colors, .inner-box, .inner-box-bg-color {background-color: rgb(238, 238, 255)}
#playnav-chevron {border-left-color: rgb(153, 153, 153);}
.panel-tab-selected .panel-tab-indicator-arrow {border-bottom-color: rgb(238, 238, 255) !important}</style>`;
                }
            },
            Channels1: {
                // forgot to finish this
                // accidentally kept the option enabled, whoops.
                Main: (data) => {
                    return `<div id="baseDiv">
<div class="profileTitleLinks">
<div id="profileSubNav">
<a href="${data.header.url}/videos">Videos</a>
<span class="delimiter">|</span>
<a href="${data.header.url}/playlists">Playlists</a>
</div>
</div>
<div id="profile-side-content">
${document.cosmicCat.Template.Channel.Channels1.sideCon.userPro(data)}
${document.cosmicCat.Template.Channel.Channels1.sideCon.userConn(data)}
</div>
<div id="profile-main-content">
${document.cosmicCat.Template.Channel.Channels1.mainCon.userVideos.Main(data)}
</div>
<div style="clear:both"></div>
</div>`;
                },
                sideCon: {
                    userPro: (data) => {
                        return `<div class="profile-box profile-highlightbox">
<div class="box-head">
<div class="box-fg">
<div class="headerTitleEdit">
<div class="headerTitleRight">
<script type="text/javascript">
var watchUsername = 'YouTube';
var subscribeaxc = '';
var isLoggedIn =  false ;
</script>
<div id="subscribeDiv">
<a class="action-button" onclick="subscribe(watchUsername, subscribeaxc, true); urchinTracker('/Events/SUB_click/Profile/YouTube'); return false;" title="subscribe to YouTube's videos">
<span class="action-button-leftcap"></span>
<span class="action-button-text">Subscribe</span>
<span class="action-button-rightcap"></span>
</a>
</div>
<div id="unsubscribeDiv" class="hid">
<a class="action-button inactive" onclick="unsubscribe(watchUsername, subscribeaxc); return false;">
<span class="action-button-leftcap"></span>
<span class="action-button-text">Unsubscribe</span>
<span class="action-button-rightcap"></span>
</a>
</div>
</div>
<div class="headerTitleLeft">YouTube Channel</div>
</div>
</div>
<div class="box-bg"></div>
</div>
<div class="box-body">
<div class="box-fg">
<div id="subscribeMessage">Please login to perform this operation.</div>
<div class="hid">See related Channels</div>
<div class="floatL">
<div class="user-thumb-xlarge">
<img src="${data.header.avatar}" alt="${data.header.name}">
</div>
</div>
<div style="float:left;margin-left:5px;width:180px;">
<div class="largeTitles">
<strong>${data.header.name}</strong>
</div>
<div class="padT3">
<div class="smallText">Joined: <strong>${data.info.fields.joined}</strong></div>
<div class="smallText">Subscribers: <strong>${data.header.subscriberCount}</strong></div>
<div class="smallText">Channel Views: <strong>${data.info.fields.views}</strong></div>
</div>
</div>
<div style="clear:both"></div>
<br>
<div class="padT5 profileAssets">
<br>
<img src="//www.youtube.com/img/flags/en_US_globe.gif" class="currentFlag" width="17">
<br>
</div>
<div class="flaggingText">
<a href="http://www.youtube.com/flag_user?username=YouTube&amp;action=report_profile_image" onclick="javascript:getSimpleXR('/flag_user?username=YouTube&amp;action=report_profile_image&amp;format=xml', showConfMsg, this);return false;">Report</a> profile image violation</div>
</div>
<div class="box-bg"></div>
</div>
</div>`;
                    },
                    userConn: (data) => {
                        return `<div class="profile-box">
<div class="box-head">
<div class="box-fg">
<div class="headerTitle">Connect with YouTube</div>
</div>
<div class="box-bg"></div>
</div>
<div class="box-body">
<div class="box-fg">
<table width="100%" cellspacing="0" cellpadding="3" border="0">
<tbody>
<tr>
<td width="110" valign="middle" align="right"></td>
<td valign="top" align="left">
<table class="actionsTable">
<tbody>
<tr class="actionsTable">
<td class="actionsTable">
<div class="smallText">
<a id="aProfileSendMsg" href="https://www.youtube.com/outbox?to_user=YouTube">
<img src="//s.ytimg.com/yt/img/pixel-vfl73.gif" id="profileSendMsg" class="icnProperties" alt="Send Message">Send Message</a>
</div>
<div class="smallText">
<a id="aProfileAddComment" href="https://www.youtube.com/profile_comment_post?user=YouTube">
<img src="//s.ytimg.com/yt/img/pixel-vfl73.gif" id="profileAddComment" class="icnProperties" alt="Add Comment">Add Comment</a>
</div>
<div class="smallText">
<a id="aProfileFwdMember" href="javascript:share_profile()">
<img src="//s.ytimg.com/yt/img/pixel-vfl73.gif" id="profileFwdMember" class="icnProperties" alt="Share Channel">Share Channel</a>
</div>
<div class="smallText">
</div>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
<tr>
<td colspan="2">
<div class="marB3 alignC">
<a href="http://www.youtube.com/YouTube">http://www.youtube.com/</a></div>
</td>
</tr>
</tbody></table>
</div>
<div class="box-bg"></div>
</div>
</div>`;
                    }
                },
                mainCon: {
                    userFeatured: (data) => {
                        return `<div class="profileEmbedVideo" id="user_featured">
<div id="profile-player-div">
</div>
<script type="text/javascript">
var swfArgs = {"el": "profilepage", "BASE_YT_URL": "https://web.archive.org/web/20090609053526/http://www.youtube.com/", "iv_allow_external_links": 1, "iv_storage_server": "https://web.archive.org/web/20090609053526/http://www.google.com/reviews/y/", "rs": "1", "ss": "1", "iv_module": "https://web.archive.org/web/20090609053526/http://s.ytimg.com/yt/swf/iv_module-vfl97100.swf", "video_id": "YZsMgrxGaMA", "l": 1602, "sk": "Lca8SIZeGn-Y2DgJIDvvn8FvtgWFupcIC", "fmt_map": "35/640000/9/0/115,34/0/9/0/115,5/0/7/0/0", "vq": null, "t": "vjVQa1PpcFPay5dnEQSWJoNjhZX631p1fhKtiXUwpOw=", "hl": "en", "plid": "AARr47nU67ILcwn5", "keywords": "Michael%2CBuckley%2CWHATTHEBUCKSHOW%2CYouTube%2Csuccess%2Ctips", "cr": "ES", "sn": "1"};
var swfUrl = canPlayV9Swf() ? 'https://web.archive.org/web/20090609053526/http://s.ytimg.com/yt/swf/watch-vfl101887.swf' : 'https://web.archive.org/web/20090609053526/http://s.ytimg.com/yt/swf/watch_v8-vfl101887.swf';
var watchGamUrl = null;
var watchDCUrl = null;
var watchIsPlayingAll = false;
var watchSetWmode = false;
var useWmodeDirect = false;
var ad_eurl = null;
writeMoviePlayer("profile-player-div");
</script>
<center>
<div class="profile-box profileEmbedVideoInfo" style="margin: 10px 0px 15px 0px;">
<div class="box-body">
<div class="box-fg">
<div class="vtitle">
<strong>
<a href="https://www.youtube.com/watch?v=YZsMgrxGaMA">
Michael Buckley's Secrets to YouTube Success
</a>
</strong>
</div>
<div class="vfacets">
From:
<a href="/web/20090609053526/http://www.youtube.com/user/YouTube" title="YouTube">YouTube</a>
<br>
Views: 80,402
<br>
Comments:
<a href="/web/20090609053526/http://www.youtube.com/comment_servlet?all_comments&amp;v=YZsMgrxGaMA">403</a>
</div>
</div>
<div class="box-bg"></div>
</div>
</div>
</center>
</div>`;
                    },
                    userVideos: {
                        Main: (data) => {
                            return `<div class="profile-box">
<div class="box-head">
<div class="box-fg">
<div class="headerTitle">
<div class="headerTitleRight">
</div>
<span>Videos (<a href="/web/20080612190422/http://www.youtube.com/profile_videos?user=YouTube" class="headersSmall">34</a>)</span>
</div>
</div>
<div class="box-bg"></div>
</div>
<div class="box-body">
<div class="box-fg">
<div style="padding: 3px;">
<div class="clear"></div>
</div>
<div id="profileVideos" style="margin-left:12px;text-align: center;">
<table height="121" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td class="alignTop padTsm">
<img src="//s.ytimg.com/yt/img/pixel-vfl73.gif" class="btn_vscroll_lt_18x106 hand" onclick="fadeOldImage('profile_videos','4');shiftLeft('profile_videos')" id="vbrol"></td>
<td style="padding-top:4px">
<table style="background-color: XXXXXX;" width="500" height="121" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td style="border-bottom:none;" id="vids">
</td>
</tr>
</tbody>
</table>
</td>
<td class="alignTop padTsm">
<img src="//s.ytimg.com/yt/img/pixel-vfl73.gif" class="btn_vscroll_rt_18x106 hand" onclick="fadeOldImage('profile_videos','4');shiftRight('profile_videos');" id="vbror"></td>
</tr>
</tbody>
</table>
</div>
<div id="loadingDiv" class="marT18 alignC" style="display:none;height:500px;">
<br><br>
<img src="//s.ytimg.com/yt/img/icn_loading_animated-vfl24663.gif">
<br><br>
</div>
</div>
<div class="box-bg"></div>
</div>
</div>`;
                        },
                        videos: (data) => {
                            return `<div class="videobarthumbnail_block" id="div_profile_videos_0">
<center>
<div class="video-thumb-medium">
<a id="href_profile_videos_0" href="https://www.youtube.com/watch?v=${data.id}">
<img id="img_profile_videos_0" src="https://i.ytimg.com/vi/${data.id}/default.jpg" onload="opacity('img_profile_videos_0', 80, 100, 800);" style="opacity: 1;">
</a>
</div>
<div id="title1_profile_videos_0" class="xsmallText grayText padB3">
<a href="https://www.youtube.com/watch?v=${data.id}" title="${data.title}">${data.title}</a>
</div>
<div id="title2_profile_videos_0" class="xsmallText grayText padB3">
<span style="color: #333">${data.time}</span>
</div>
</center>
</div>`;
                        },
                        ovideos: (data) => {
                            return `<div class="video-cell" style="width:32.6%">
<div class="video-entry">
<div class="v120WideEntry">
<div class="v120WrapperOuter">
<div class="v120WrapperInner">
<a id="video-url-${data.id}" href="https://www.youtube.com/watch?v=${data.id}&amp;feature=channel_page" rel="nofollow">
<img title="${data.title}" src="${data.thumbnail}" class="vimg120" qlicon="${data.id}" alt="${data.title}">
</a>
<div id="quicklist-icon-${data.id}" class="addtoQL90">
<a id="add-to-quicklist-${data.id}" href="#" ql="${data.id}" title="Add Video to QuickList">
<button class="master-sprite QLIconImg" title="" onclick="clicked_add_icon(this, this.parentNode.getAttribute('ql'), 0, 'https://web.archive.org/web/20090609053526/http://i2.ytimg.com/vi/YZsMgrxGaMA/default.jpg', 'Michael Buckley\'s Secrets to YouTube Success');return false;" onmouseover="mouseOverQuickAdd(this)" onmouseout="mouseOutQuickAdd(this)" onmousedown="urchinTracker('/Events/profile/QuickList+AddTo')"></button></a>
<div class="hid quicklist-inlist">
<a id="add-to-quicklist-${data.id}" href="#" ql="${data.id}" title="Add Video to QuickList"></a>
<a href="/web/20090609053526/http://www.youtube.com/watch_queue?all">Added</a>
</div>
</div>
<div class="video-time">
<span id="video-run-time-${data.id}">${data.time}</span>
</div>
</div>
</div>
</div>
<div class="video-main-content" id="video-main-content-${data.id}">
<div class="video-title">
<div class="video-short-title">
<span id="translated_short_prefix_${data.id}" style="font-size: 10px;" class="hid">[TRANSLATED]</span>
<a id="video-short-title-${data.id}" href="https://www.youtube.com/watch?v=${data.id}&amp;feature=channel_page" title="${data.title}" rel="nofollow">${data.title}</a>
</div>
<div class="video-long-title">
<span id="translated_long_prefix_${data.id}" style="font-size: 10px;" class="hid">[TRANSLATED]</span>
<a id="video-long-title-${data.id}" href="https://www.youtube.com/watch?v=${data.id}&amp;feature=channel_page" title="${data.title}" rel="nofollow">${data.title}</a>
</div>
</div>
<div id="video-description-${data.id}" class="video-description">

</div>
<div class="video-facets">
<span id="video-average-rating-${data.id}" class="video-rating-list video-rating-with-caps">
<div>
<button class="master-sprite ratingCapsVS-left" title=""></button>
<button class="master-sprite ratingCapsVS ratingCapsVS-5.0" title="5.0"></button>
<button class="master-sprite ratingCapsVS-right" title=""></button>
</div>
</span>
<span id="video-added-time-${data.id}" class="video-date-added">${data.upload}</span>
<span id="video-num-views-${data.id}" class="video-view-count">${data.views}</span>
<span id="video-average-rating-${data.id}" class="video-rating-grid video-rating-with-caps">
<div>
<button class="master-sprite ratingCapsVS-left" title=""></button>
<button class="master-sprite ratingCapsVS ratingCapsVS-5.0" title="5.0"></button>
<button class="master-sprite ratingCapsVS-right" title=""></button>
</div>
</span>
</div>
</div>
<div class="video-clear-list-left"></div>
</div>
</div>`;
                        }
                    }
                }
            }
        },
        Playlist: {
            Main: (data) => {
                return `<div id="content">
<div id="branded-page-default-bg" class="ytg-base">
<div id="branded-page-body-container" class="ytg-base clearfix">
${document.cosmicCat.Template.Playlist.Header(data)}
${document.cosmicCat.Template.Playlist.Content(data)}
</div>
</div>
</div>`;
            },
            Header: (data) => {
                return `<div id="branded-page-header-container" class="ytg-wide">
<div id="branded-page-header" class="ytg-wide ytg-box">
<a class="profile-thumb" href="${data.header.owner.url}">
<span class="video-thumb ux-thumb yt-thumb-square-77">
<span class="yt-thumb-clip">
<span class="yt-thumb-clip-inner">
<img src="${data.content[0].thumbnail}" alt="Thumbnail" width="77"><span class="vertical-align"></span>
</span>
</span>
</span>
</a>
<div class="ytg-box">
<div class="playlist-info">
<div class="header-right">
<div class="header-stats ytg-box">
<ul>
<li class="stat-entry first">
<span class="stat-value">${data.header.videos?.text?.split(" ")?.[0]}</span>
<span class="stat-name">videos</span>
</li>
<li class="stat-entry">
<span class="stat-value">${data.header.views}</span>
<span class="stat-name">views</span>
</li>
</ul>
</div>
</div>
<div class="playlist-reference">
<h1 title="${data.header.title}">${data.header.title}</h1>
${data.creatorInfo?.id ? `
<p class="channel-author-attribution">
${localizeString("playlists.header.channelAuthor", data.header?.owner)}
</p>
` : ""}
</div>
<span id="play-all-button">
<a class="yt-playall-link yt-playall-link-dark yt-uix-sessionlink" href="https://www.youtube.com/watch?v=${data.content[0].id}&list=${data.header.id}" data-sessionlink="el">
<img class="small-arrow" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="">Play all
</a>
</span>
</div>
</div>
</div>
</div>`;
            },
            Content: (data) => {
                return `<div id="branded-page-body">
<div id="playlist-pane-container">
${document.cosmicCat.Template.Playlist.primaryPane.Main(data)}
${document.cosmicCat.Template.Playlist.secondaryPane.Main(data)}
</div>
</div>`;
            },
            primaryPane: {
                Main: (data) => {
                    return `<div class="primary-pane">
<div class="playlist-landing ypc-list-container">
<div id="playlist-actions">
<div id="playlist-action-buttons">
<div id="playlist-likes-container">
<div class="playlist-sparkbars">
<div class="playlist-sparkbar-likes" style="width: 0%"></div>
<div class="playlist-sparkbar-dislikes" style="width: 0%"></div>
</div>
<span class="playlist-likes-dislikes">
<span class="likes">0</span> likes, <span class="dislikes">0</span> dislikes
</span>
</div>
${document.cosmicCat.Template.Buttons.LikeDis(data)}
<button type="button" class="playlist-share yt-uix-button yt-uix-button-default yt-uix-tooltip" onclick=";return false;" title="Share or embed this playlist" data-button-toggle="true" data-button-action="yt.www.playlist.share" role="button"><span class="yt-uix-button-content">Share </span></button>
<img src="//s.ytimg.com/yts/img/playlist/playlist-hangout-icon-vflZSwp9g.png" alt="Google Hangout" class="playlist-hangout-button" title="Watch with your friends.">
</div>
<div id="playlist-share-container" class="playlist-share-area hid">
</div>
<div id="playlist-share-loading" class="playlist-share-area hid">${localizeString("global.loading.main")}</div>
<div id="playlist-likes-signin-container" class="playlist-share-area hid">
<div class="yt-alert yt-alert-naked yt-alert-warn">
<div class="yt-alert-icon">
<img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" class="icon master-sprite" alt="Alert icon">
</div>
<div class="yt-alert-content" role="alert">
<span class="yt-alert-vertical-trick"></span>
<div class="yt-alert-message">
<strong>
<a href="${document.cosmicCat.data.loginUrl}">Sign in</a> or <a href="https://www.youtube.com/signup">sign up</a> now!
</strong>
</div>
</div>
</div>
</div>
</div>
<ol>

</ol>
</div>
</div>`;
                },
                listItem: {
                    video: (data, id, i) => {
                        return `<li class="playlist-video-item odd annotated">
<div class="yt-uix-tile playlist-video-item-base-content">
<span class="video-index">${i}</span>
<div class="thumb-container">
<div class="ux-thumb-wrap">
<span class="video-thumb ux-thumb yt-thumb-default-124">
<span class="yt-thumb-clip">
<span class="yt-thumb-clip-inner">
<img src="${data.thumbnail}" alt="Thumbnail" data-thumb="${data.thumbnail}" data-group-key="thumb-group-27" width="124"><span class="vertical-align"></span>
</span>
</span>
</span>
<span class="video-time">${data.time}</span>
${document.cosmicCat.Template.Buttons.addTo(data.id)}
</div>
</div>
<div class="video-info">
<div class="video-buttons">
</div>
<div class="video-overview">
<h3 class="video-title-container">
<a href="https://www.youtube.com/watch?v=${data.id}&list=${id}&index=${i}&amp;feature=plpp_video" class="yt-uix-tile-link">
<span class="title video-title yt-uix-tooltip" title="${data.title}" dir="ltr">${data.title}</span>
</a>
</h3>
<p class="video-details">
<span class="video-owner">
${localizeString("playlists.body.primaryPane.items.video.by", data?.owner?.name)}
</span>
<span class="video-view-count">${data.views}</span>
</p>
</div>
</div>
</div>
</li>`;
                    }
                }
            },
            secondaryPane: {
                Main: (data) => {
                    return `<div class="secondary-pane">
<div class="channel-module">
<h2>${localizeString("playlists.body.secondaryPane.aboutSection.about", data.header?.name || data.header?.title)}</h2>
<p>${data.header.description}</p>
</div>
<hr class="yt-horizontal-rule">
${data.creatorInfo?.id ? document.cosmicCat.Template.Playlist.secondaryPane.aboutSection(data) : ""}
</div>`;
                },
                aboutSection: (data) => {
                    return `<div class="channel-module">
<div class="playlist-creator-info">
<h2>${localizeString("playlists.body.secondaryPane.aboutSection.about", data.creatorInfo?.name || data.creatorInfo?.title)}</h2>
<p>${data.creatorInfo?.fields?.description}</p>
<div class="creator-links">
<a href="https://www.youtube.com/channel/${data.creatorInfo.id}/playlists">${localizeString("playlists.body.secondaryPane.aboutSection.creatorLinks.playlists", data?.creatorInfo?.name)}</a>
<a href="https://www.youtube.com/channel/${data.creatorInfo.id}/videos">${localizeString("playlists.body.secondaryPane.aboutSection.creatorLinks.videos")}</a>
</div>
<div class="creator-stats">
<p>${data.creatorInfo?.fields?.views} views</p>
<p>${data.creatorInfo?.subs} subscribers</p>
</div>
<div class="enable-fancy-subscribe-button">
${document.cosmicCat.Template.Buttons.Subscribe(data.creatorInfo?.id)}
</span>
</div>
<div class="yt-horizontal-rule"><span class="first"></span><span class="second"></span><span class="third"></span></div>
</div>`;
                }
            }
        },
        Search: {
            Main: (searchpar) => {
                return `<div id="content">
<div id="search-header" class="yt-uix-expander yt-uix-expander-collapsed">
<h2>Search results for <strong class="query"><span class="search-title-lego">${searchpar}</span></strong></h2>
<div class="filter-top">
<button type="button" class="filter-button yt-uix-expander-head yt-uix-button yt-uix-button-default" onclick=";return false;" data-button-toggle="true" data-button-menu-id="some-nonexistent-menu" data-button-action="" role="button">
<span class="yt-uix-button-content">Filters </span>
<img class="yt-uix-button-arrow" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="">
</button>
<ul class="filter-crumb-list"></ul>
<p class="num-results">About <strong>${ytInitialData.estimatedResults.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</strong> results</p>
<br class="clear">
</div>
<div id="filter-dropdown" class="yt-uix-expander-body"></div>
<div class="yt-horizontal-rule"><span class="first"></span><span class="second"></span><span class="third"></span></div>
</div>
<div id="search-base-div">
<div id="search-main" class="ytg-4col new-snippets">
<div id="results-main-content">
<ol id="search-results" class="result-list context-data-container"></ol>
</div>
</div>
</div>
<div id="search-footer-box" class="searchFooterBox">
<div class="yt-uix-pager" role="navigation">
<a href="/web/20121031234035/http://www.youtube.com/results?page=1" class="yt-uix-button yt-uix-sessionlink yt-uix-pager-button yt-uix-button-toggled yt-uix-button-default" data-sessionlink="" data-page="1" aria-label="Go to page 1">
<span class="yt-uix-button-content">1</span>
</a>
<a class="yt-uix-button yt-uix-sessionlink yt-uix-pager-button yt-uix-button-default" id="next-btn" data-sessionlink="" onclick="document.cosmicCat.Search.next(this.getAttribute('data-token'), this.getAttribute('data-page'))" data-token="${ytInitialData.contents.twoColumnSearchResultsRenderer?.primaryContents?.sectionListRenderer?.contents?.[1]?.continuationItemRenderer?.continuationEndpoint?.continuationCommand?.token}" data-page="2">
<span class="yt-uix-button-content">Next »</span>
</a>
</div>
</div>
</div>`;
            },
            dropdownFilter: {
                Main: (a, b, temC) => {
                    return `<div class="filter-col">
<h4 class="filter-col-title">${a[b].searchFilterGroupRenderer.title.simpleText}</h4>
<ul>
${temC}
</ul>
</div>
`;
                },
                Con: (data, b, searchpar) => {
                    return `<li class="filter">
${data && `<a class="filter-text filter-content" title="Search for last hour" href="https://www.youtube.com/results?search_query=${searchpar}&sp=${data}">${b}</a>` || `<span class="filter-content filter-selected">${b}</span>`}
</li>`;
                }
            },
            videoRender: (videoData) => {
                let badges = "";
                for (let i = 0; i < videoData.badges.length; i++) {
                    badges += `<li><a class="yt-badge-std">${videoData.badges[i].metadataBadgeRenderer.label}</a></li>`;
                }
                badges = (videoData.badges.length > 0) ? '<ul class="single-line-lego-list">' + badges + "</ul>" : "";
                return `<li class="yt-grid-box result-item-video context-data-item" data-context-item-title="${videoData.title}" data-context-item-type="video" data-context-item-time="${videoData.time}" data-context-item-user="${videoData}" data-context-item-id="${videoData.id}" data-context-item-views="${videoData.views}">
<div id="" class="yt-uix-tile yt-lockup-list yt-tile-default yt-grid-box">
<div class="yt-lockup-thumbnail">
<a href="https://www.youtube.com/watch?v=${videoData.id}" class="ux-thumb-wrap yt-uix-sessionlink yt-uix-contextlink contains-addto result-item-thumb">
<span class="video-thumb ux-thumb yt-thumb-default-185">
<span class="yt-thumb-clip">
<span class="yt-thumb-clip-inner">
<img src="//i3.ytimg.com/vi/${videoData.id}/mqdefault.jpg" alt="Thumbnail" width="185"><span class="vertical-align"></span>
</span>
</span>
</span>
<span class="video-time">${videoData.time}</span>
${document.cosmicCat.Template.Buttons.addTo(videoData.id)}
</a>
</div>
<div class="yt-lockup-content">
<h3>
<a class="yt-uix-contextlink yt-uix-sessionlink yt-uix-tile-link result-item-translation-title" dir="ltr" title="${videoData.title}" href="https://www.youtube.com/watch?v=${videoData.id}">${videoData.title}</a>
</h3>
<p class="description" dir="ltr">${videoData.description}</p>
<div class="yt-lockup-meta">
${badges}
<p class="facets">
<span class="date-added">${videoData.upload}</span>
<span class="metadata-separator">•</span>
<span class="viewcount">${videoData.views}</span>
</p>
<p><span class="username-prepend">${localizeString("watch.by", videoData?.owner?.name)}</span></p>
</div>
</div>
</div>
</li>`;
            },
            sidethumb: (data) => {
                return `<span class="sidethumb">
<span class="video-thumb ux-thumb yt-thumb-default-43">
<span class="yt-thumb-clip">
<span class="yt-thumb-clip-inner">
<img src="${data.thumbnails[0]?.url}" alt="Thumbnail" data-thumb="${data.thumbnails[0]?.url}" data-group-key="thumb-group-6" width="43"><span class="vertical-align"></span>
</span>
</span>
</span>
</span>`;
            },
            playlistRender: (data) => {
                let sideThumbs = "";
                for (let i = 0; i < data.sidethumbs.length; i++) {
                    sideThumbs += document.cosmicCat.Template.Search.sidethumb(data.sidethumbs[i]);
                }
                return `<li class="yt-grid-box playlist *sr context-data-item" data-context-item-title="${data.title}" data-context-item-count="${data.videos.text}" data-context-item-id="${data.id}" data-context-item-type="playlist" data-context-item-videos="[&quot;nyMkLwSyOVQ&quot;, &quot;2_HXUhShhmY&quot;, &quot;lLJf9qJHR3E&quot;]">
<div id="" class="yt-uix-tile yt-lockup-list yt-tile-default yt-grid-box">
<div class="yt-lockup-thumbnail">
<a href="${data.url}" class="yt-pl-thumb-link yt-uix-contextlink yt-uix-sessionlink" data-sessionlink="">
<span class="yt-pl-thumb">
<span class="video-thumb ux-thumb yt-thumb-feed-185">
<span class="yt-thumb-clip">
<span class="yt-thumb-clip-inner">
<img src="${data.thumbnail}" alt="Thumbnail" data-thumb=""${data.thumbnail}" data-group-key="thumb-group-6" width="185"><span class="vertical-align"></span>
</span>
</span>
</span>
<span class="sidebar sidebar-height-124">
<span class="video-count-wrapper">
<span class="video-count-block">
<span class="count-label">${data.videos.text.split(" ")[0]}</span>
<span class="text-label">videos</span>
</span>
</span>
<span class="side-thumbs">
${sideThumbs}
</span>
</span>
</span>
<span class="yt-pl-thumb-overlay">
<span class="yt-pl-thumb-overlay-content"><img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="">Play all</span>
</span>
</span>
</a>
</div>
<div class="yt-lockup-content">
<h3 class="yt-lockup-ellipsize">
<a class="yt-uix-contextlink yt-uix-sessionlink yt-uix-tile-link result-item-translation-title" dir="ltr" title="${data.title}" data-sessionlink="" href="${data.url}">${data.title}</a>
</h3>

<div class="yt-lockup-meta">
<ul class="single-line-lego-list">
<li>
<a href="/web/20121022214036/https://www.youtube.com/results?search_query=playlist%2C+playlist&amp;lclk=playlist/a" class="yt-badge-std">playlist</a>
</li>
</ul>
<p class="facets"><a href="/playlist?list=${data.id}" class="video-count">${data.videos.text}</a></p>
<p>
<span class="username-prepend">by <a href="${data.owner.url}" class="yt-uix-sessionlink yt-user-name" data-sessionlink="ved=CFgQwRs%3D&amp;ei=CNyy4KHLlbMCFSXtRAodZHCYmg%3D%3D" dir="ltr">${data.owner.name}</a></span></p>
</div>
</div>
</div>
</li>`;
            },
            channelRender: (data) => {
                console.debug(data);
                return `<li class="yt-grid-box result-item-channel *sr">
<div id="" class="yt-uix-tile yt-lockup-list yt-tile-default yt-grid-box">
<div class="yt-lockup-thumbnail">
<a href="${data.url}" class="ux-thumb-wrap yt-uix-sessionlink result-item-thumb" data-sessionlink="">
<span class="video-thumb ux-thumb yt-thumb-square-104">
<span class="yt-thumb-clip">
<span class="yt-thumb-clip-inner">
<img src="${data.avatar}" alt="Thumbnail" width="104"><span class="vertical-align"></span>
</span>
</span>
</span>
</a>
</div>
<div class="yt-lockup-content">
<h3 class="yt-lockup-ellipsize">
<a class="yt-uix-contextlink yt-uix-sessionlink yt-uix-tile-link result-item-translation-title" dir="ltr" title="${data.name}" data-sessionlink="" href="${data.url}?feature=results_main">${data.name}</a>
</h3>
<p class="description yt-lockup-ellipsize" dir="ltr">${data.fields.description}</p>
<div class="yt-lockup-meta">
<ul class="single-line-lego-list">
<li>
<a href="https://www.youtube.com/results?search_query=channel%2C+channel&amp;lclk=channel/a" class="yt-badge-std">channel</a></li>
</ul>
<p class="facets">
<span class="video-count">${data.videos}</span>
<span class="metadata-separator">|</span>
<span class="subscriber-count">${data.subscriberCount}</span>
</p>
<p>
${localizeString("search.channels.by", data)}
</p>
</div>
</div>
</div>
</li>`;
            }
        },
        Masthead: {
            Main: () => {
                return `<div id="masthead" class="" dir="ltr">
<a id="logo-container" href="https://www.youtube.com/" title="YouTube home">
<img id="logo" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="YouTube home">
</a>
<div id="masthead-user-bar-container">
<div id="masthead-user-bar">
<div id="masthead-user">

</div>
</div>
</div>
<div id="masthead-search-bar-container">
<div id="masthead-search-bar">
<div id="masthead-nav">
<a href="https://www.youtube.com/feed/explore">${localizeString("global.browse")}</a>
<span class="masthead-link-separator">|</span>
<a href="https://youtube.com/upload">${localizeString("global.upload")}</a>
</div>
<form id="masthead-search" class="search-form consolidated-form" action="https://www.youtube.com/results" onsubmit="if (document.body.querySelector('#masthead-search-term').value == '') return false;">
<button class="search-btn-compontent search-button yt-uix-button yt-uix-button-default" onclick="if (document.querySelector('#masthead-search-term').value == '') return false; document.querySelector('#masthead-search').submit(); return false;;return true;" type="submit" id="search-btn" dir="ltr" tabindex="2" role="button">
<span class="yt-uix-button-content">${localizeString("global.search")}</span>
</button>
<div id="masthead-search-terms" class="masthead-search-terms-border" dir="ltr" style="border-color: rgb(192, 192, 192) rgb(217, 217, 217) rgb(217, 217, 217);">
<label>
<input id="masthead-search-term" onfocus="document.querySelector('#masthead-search').classList.add('focused');document.querySelector('#masthead-search-terms').setAttribute('style', 'border-color: rgb(77, 144, 254)')" onblur="document.querySelector('#masthead-search').classList.remove('focused');document.querySelector('#masthead-search-terms').setAttribute('style', 'border-color: rgb(192, 192, 192) rgb(217, 217, 217) rgb(217, 217, 217);')" autocomplete="off" class="search-term" name="search_query" value="" type="text" tabindex="1" title="${localizeString("global.search")}" dir="ltr" spellcheck="false" style="outline: currentcolor none medium;">
</label>
</div>
<input type="hidden" name="oq">
<input type="hidden" name="aq">
<input type="hidden" name="aqi">
<input type="hidden" name="aql">
<input type="hidden" name="gs_sm">
<input type="hidden" name="gs_upl">
</form>
</div>
</div>
</div>
<div id="alerts"></div>`;
            },
            User: {
                loggedIn: () => {
                    return `<span id="masthead-gaia-user-expander" class="masthead-user-menu-expander masthead-expander">
<span id="masthead-gaia-user-wrapper" class="yt-rounded" tabindex="0">${document.cosmicCat.Storage.get("accountInfo").value.name}</span></span>
<span id="masthead-gaia-photo-expander" class="masthead-user-menu-expander masthead-expander">
<span id="masthead-gaia-photo-wrapper" class="yt-rounded">
<span id="masthead-gaia-user-image">
<span class="clip">
<span class="clip-center">
<img src="${document.cosmicCat.Storage.get("accountInfo").value.pfp}" alt="">
<span class="vertical-center"></span>
</span>
</span>
</span>
<span class="masthead-expander-arrow"></span>
</span>
</span>`;
                },
                loggedOut: () => {
                    return `<div id="masthead-user-display">
<span id="masthead-user-wrapper">
<button href="${document.cosmicCat.data.loginUrl}" type="button" id="masthead-user-button" onclick=";window.location.href=this.getAttribute('href');return false;" class="yt-uix-button yt-uix-button-text" role="button">
<span class="yt-uix-button-content">
<span id="masthead-user-image">
<span class="clip">
<span class="clip-center">
<img src="//s.ytimg.com/yts/img/silhouette48-vflLdu7sh.png" alt="">
<span class="vertical-center"></span>
</span>
</span>
</span>
<span class="masthead-user-username">${localizeString("buttons.signin")}</span>
</span>
</button>
</span>
</div>`;
                }
            },
            Expander: () => {
                return `<div id="masthead-expanded" class="hid">
<div id="masthead-expanded-container" class="with-sandbar">
<div id="masthead-expanded-menus-container">
<span id="masthead-expanded-menu-shade"></span>
<div id="masthead-expanded-google-menu">
<span class="masthead-expanded-menu-header">${localizeString("personal.googleaccount")}</span>
<div id="masthead-expanded-menu-google-container">
<img id="masthead-expanded-menu-gaia-photo" alt="" src="${document.cosmicCat.Storage.get("accountInfo").value.pfp}">
<div id="masthead-expanded-menu-account-info">
<p>${document.cosmicCat.Storage.get("accountInfo").value.name}</p>
<p id="masthead-expanded-menu-email">${document.cosmicCat.Storage.get("accountInfo").value.email}</p>
</div>
<div id="masthead-expanded-menu-google-column1">
<ul>
<li class="masthead-expanded-menu-item"><a href="https://profiles.google.com?authuser=0">${localizeString("personal.profile")}</a></li>
<li class="masthead-expanded-menu-item"><a href="https://plus.google.com/u/0/stream">Google+</a></li>
<li class="masthead-expanded-menu-item"><a href="https://plus.google.com/u/0/settings/privacy">${localizeString("personal.privacy")}</a></li>
</ul>
</div>
<div id="masthead-expanded-menu-google-column2">
<ul>
<li class="masthead-expanded-menu-item">
<a href="/cosmic_cat">${localizeString("personal.settings")}</a>
</li>
<li class="masthead-expanded-menu-item">
<a class="end" href="javascript:document.cosmicCat.Account.logout();">${localizeString("personal.signout")}</a>
</li>
<li class="masthead-expanded-menu-item">
<a href="/channel_switcher" onclick="yt.www.masthead.accountswitch.toggle(); return false;">${localizeString("personal.switchaccount")}</a>
</li>
</ul>
</div>
</div>
</div>
<div id="masthead-expanded-menu">
<span class="masthead-expanded-menu-header">YouTube</span>
<ul id="masthead-expanded-menu-list">
<li class="masthead-expanded-menu-item">
<a href="/profile?feature=mhee">${localizeString("personal.mychannel")}</a>
</li>
<li class="masthead-expanded-menu-item">
<a href="/my_videos?feature=mhee">${localizeString("personal.videomanager")}</a>
</li>
<li class="masthead-expanded-menu-item">
<a href="/?c=subscriptions" onclick="document.cosmicCat.load.home_category(document.querySelector('[data-feed-name=subscriptions]')); return false;">${localizeString("personal.subscriptions")}</a>
</li>
<li class="masthead-expanded-menu-item">
<a href="/account?feature=mhee">${localizeString("personal.youtubesettings")}</a>
</li>
</ul>
</div>
</div>
<div id="masthead-expanded-sandbar">
<div id="masthead-expanded-lists-container">
<div id="masthead-expanded-loading-message">${localizeString("global.loading.main")}</div>
</div>
</div>
<div class="clear"></div>
</div>
</div>`;
            }
        },
        Footer: () => {
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
        },
        Homepage: {
            Main: () => {
                return `<div id="content">
<div class="guide-layout-container enable-fancy-subscribe-button">
<div class="guide-container">
<div id="guide-builder-promo"></div>
<div class="guide"></div>
</div>
<div class="guide-background"></div>
<div id="feed" style="width: 790px;">
<div id="feed-main-youtube" class="individual-feed">
<div class="feed-header hid no-metadata before-feed-content">
<div class="feed-header-thumb">
<img class="feed-header-icon youtube" alt="" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
</div>
<div class="feed-header-details">
<h2 class="feed-header-info">${localizeString("guide.fromyt")}</h2>
</div>
</div>
<div class="feed-container">
<div class="feed-page">
<ul class="context-data-container"></ul>
</div>
</div>
</div>
<div id="feed-error" class="individual-feed hid">
<p class="feed-message">We were unable to complete the request, please try again later.</p>
</div>
<div id="feed-loading-template" class="hid">
<div class="feed-message">
<p class="loading-spinner">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
${localizeString("global.loading.main")}
</p>
</div>
</div>
</div>
<div id="feed-background" style="width: 790px;"></div>
</div>
</div>`;
            },
            Guide: {
                Builder: {
                    loggedOut: () => {
                        return `<h2>Sign in to customize your homepage</h2>
<div id="guide-builder-promo-buttons" class="signed-out">
<button href="${document.cosmicCat.data.loginUrl}" type="button" class="yt-uix-button yt-uix-button-dark" onclick=";window.location.href=this.getAttribute('href');return false;" role="button">
<span class="yt-uix-button-content">Sign In </span>
</button>
<button href="/signup?next=%2Fchannels%3Ffeature%3Dsignup" type="button" class="yt-uix-button yt-uix-button-primary" onclick=";window.location.href=this.getAttribute('href');return false;" role="button">
<span class="yt-uix-button-content">Create Account </span>
</button>`;
                    },
                    loggedIn: () => {
                        return `<div id="guide-builder-promo-buttons">
<button type="button" class="yt-uix-button yt-uix-button-primary">
<span class="thumb">
<img class="yt-uix-button-icon-add" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
</span><span class="yt-uix-button-content">${localizeString("global.browsechannels")}</span>
</button>`;
                    }
                },
                Personal: () => {
                    return `<div id="channel">
<span id="channel-thumb">
<a href="/profile" class="yt-user-photo">
<span class="video-thumb ux-thumb yt-thumb-square-77">
<span class="yt-thumb-clip">
<span class="yt-thumb-clip-inner">
<img src="${document.cosmicCat.Storage.get("accountInfo").value.pfp}" alt="${document.cosmicCat.Storage.get("accountInfo").value.name}" width="77"><span class="vertical-align"></span>
</span>
</span>
</span>
</a>
</span>
<div id="personal-feeds">
<ul>
<li class="guide-item-container">
<a class="guide-item guide-item-action" href="/profile?feature=guide">${localizeString("personal.mychannel")}<img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" class="see-more-arrow" alt=""></a>
</li>
<li class="guide-item-container">
<a class="guide-item" data-feed-name="uploads" data-feed-type="personal" title="Videos you have uploaded">${localizeString("personal.videos")}</a>
</li>
<li class="guide-item-container">
<a class="guide-item" data-feed-name="likes" data-feed-type="personal" title="Videos you have liked">${localizeString("personal.likes")}</a>
</li>
<li class="guide-item-container">
<a class="guide-item" data-feed-name="history" data-feed-type="personal" title="Videos you have watched">${localizeString("personal.history")}</a>
</li>
<li class="guide-item-container">
<a class="guide-item" data-feed-name="watch_later" data-feed-type="personal" title="Videos you have added to your Watch Later list">${localizeString("personal.watchlater")}</a>
</li>
</ul>
</div>
</div>
<div class="guide-section yt-uix-expander first">
<h3 class="guide-item-container">
<a class="guide-item" data-feed-name="subscriptions" data-feed-url="/feed/subscriptions?flow=2" data-feed-display="Subscriptions" data-feed-icon="subscriptions">
<span class="thumb">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="" class="system-icon category">
</span><span class="display-name">${localizeString("personal.subscriptions")}</span>
</a>
</h3>
<ul id="guide-subscriptions"></ul>
</div>`;
                },
                Channel: (data) => {
                    return `<li class="guide-item-container">
<a class="guide-item" data-feed-name="${data.channelRenderer.title.simpleText}" href="/channel/${data.channelRenderer.channelId}">
<span class="thumb">
<img class="system-icon" src="${data.channelRenderer.thumbnail.thumbnails[0].url}" alt="">
</span><span class="display-name">${data.channelRenderer.title.simpleText}</span>
</a>
</li>`;
                },
                Categories: {
                    Main: () => {
                        return `<div class="guide-section yt-uix-expander">
<h3 class="guide-item-container selected-child">
<a class="guide-item selected" data-feed-name="youtube" data-feed-url="/" data-feed-display="${localizeString("guide.fromyt")}">
<span class="thumb">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="" class="system-icon category">
</span><span class="display-name">${localizeString("guide.fromyt")}</span>
</a>
</h3>
<ul class="cockie"></ul>
</div>`;
                    },
                    Channel: (data) => {
                        return `<li class="guide-item-container">
<a class="guide-item" data-feed-name="${data.class}" data-feed-url="${data.href}">
<span class="thumb">
<img class="system-icon system ${data.class}" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
</span><span class="display-name">${data.name}</span>
</a>
</li>`;
                    }
                }
            },
            Feed: {
                Main: (data) => {
                    return `<li>
<div class="feed-item-container first" data-channel-key="${data.owner.id}">
<div class="feed-author-bubble-container">
<a href="${data.owner.url}/videos" class="feed-author-bubble">
<span class="feed-item-author">
<span class="video-thumb ux-thumb yt-thumb-square-28">
<span class="yt-thumb-clip">
<span class="yt-thumb-clip-inner">
<img src="${data.owner.icon}" alt="${data.owner.text}" data-thumb="${data.icon}" width="28"><span class="vertical-align"></span>
</span>
</span>
</span>
</span>
</a>
</div>
<div class="feed-item-main">
<div class="feed-item-header">
<span class="feed-item-actions-line">
${localizeString("home.feed.uploadedavideo", data?.owner)} <span class="feed-item-time">${data.upload}</span>
</span>
</div>
<div class="feed-item-content-wrapper clearfix context-data-item" data-context-item-actionverb="uploaded" data-context-item-title="Steam for Linux a Bad Idea? - This Week in Linux Gaming" data-context-item-type="video" data-context-item-time="5:21" data-context-item-user="nixiedoeslinux" data-context-item-id="7LVtbTurdCk" data-context-item-views="25,816 views" data-context-item-actionuser="nixiedoeslinux">
<div class="feed-item-thumb">
<a class="ux-thumb-wrap contains-addto yt-uix-contextlink yt-uix-sessionlink" href="/watch?v=${data.id}">
<span class="video-thumb ux-thumb yt-thumb-default-185">
<span class="yt-thumb-clip"><span class="yt-thumb-clip-inner">
<img src="${data.thumbnail}" alt="Thumbnail" width="185"><span class="vertical-align"></span>
</span>
</span>
</span>
<span class="video-time">${data.time}</span>
${document.cosmicCat.Template.Buttons.addTo(data.id)}
</a>
</div>
<div class="feed-item-content">
<h4>
<a class="feed-video-title title yt-uix-contextlink yt-uix-sessionlink" href="/watch?v=${data.id}">${data.title}</a>
</h4>
<div class="metadata">
<span class="view-count">${data.views}</span>
<div class="description">
<p>${data.description}</p>
</div>
</div>
</div>
</div>
</div>
<span class="feed-item-action-menu subscribed" data-external-id="PqyfOmT8QmomqIwGPT4hxRGvXqh6izrXz8s1TlSF8fg0h_MQ8Qjx10A==">
<button type="button" class="flip yt-uix-button yt-uix-button-feed-item-action-menu yt-uix-button-empty" onclick=";return false;" data-button-has-sibling-menu="True" role="button" aria-pressed="false" aria-expanded="false" aria-haspopup="true" aria-activedescendant=""><span class="yt-uix-button-icon-wrapper"><img class="yt-uix-button-icon yt-uix-button-icon-feed-item-action-menu" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-valign-trick"></span></span><img class="yt-uix-button-arrow" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt=""><ul class=" yt-uix-button-menu yt-uix-button-menu-feed-item-action-menu" role="menu" aria-haspopup="true" style="display: none;"><li role="menuitem" id="aria-id-69285446284"><span data-action="hide" class="dismiss-menu-choice yt-uix-button-menu-item" onclick=";return false;">Hide this activity</span></li><li role="menuitem" id="aria-id-71783894232"><span data-subscription-id="s-g9bXtaCSKRwzCmeFkvD912YfxX4CmZ5I-IkGd8HUI" data-action="uploads" class="dismiss-menu-choice uploads yt-uix-button-menu-item" onclick=";return false;">Only show uploads from nixiedoeslinux
</span></li><li role="menuitem" id="aria-id-62584392243"><span data-action="subscribe" class="dismiss-menu-choice subscribe yt-uix-button-menu-item" onclick=";return false;">Subscribe to nixiedoeslinux
</span></li><li role="menuitem" id="aria-id-68105254288"><span data-channel-key="UCBE-FO9JUOghSysV9gjTeHw" onclick=";return false;" data-action="unsubscribe" data-subscription-id="s-g9bXtaCSKRwzCmeFkvD912YfxX4CmZ5I-IkGd8HUI" class="dismiss-menu-choice unsubscribe yt-uix-button-menu-item">Unsubscribe from nixiedoeslinux
</span></li></ul></button>
    </span>
  </div>
  <div class="feed-item-dismissal-notices"><div class="feed-item-dismissal feed-item-dismissal-hide hid">This item has been hidden</div><div class="feed-item-dismissal feed-item-dismissal-uploads hid">In the future you will only see uploads from   <span class="feed-item-owner"><a href="/user/nixiedoeslinux?feature=g-u-u" class="yt-uix-sessionlink yt-user-name " data-sessionlink="feature=g-u-u" dir="ltr">nixiedoeslinux</a></span>
</div><div class="feed-item-dismissal feed-item-dismissal-all-activity hid">In the future you will see all activity from   <span class="feed-item-owner"><a href="/user/nixiedoeslinux?feature=g-u-u" class="yt-uix-sessionlink yt-user-name " data-sessionlink="feature=g-u-u" dir="ltr">nixiedoeslinux</a></span>
</div><div class="feed-item-dismissal feed-item-dismissal-unsubscribe hid">You have been unsubscribed from   <span class="feed-item-owner"><a href="/user/nixiedoeslinux?feature=g-u-u" class="yt-uix-sessionlink yt-user-name " data-sessionlink="feature=g-u-u" dir="ltr">nixiedoeslinux</a></span>
</div></div>
      </li>`;
                }
            }
        },
        Settings: {
            Main: () => {
                YabaiComponent.addHandler("click", "guide-item-container", document.cosmicCat.Actions.handleSettingsTab);
                return `<div id="content">
<div class="guide-layout-container enable-fancy-subscribe-button">
<div class="guide-container" style="height: 400px">
<div class="guide" data-last-clicked-item="youtube">
<div class="guide-section yt-uix-expander">
<ul class="settings-menu-list">
<li class="guide-item-container selected-child">
<a class="guide-item selected" data-feed-name="general">
<span class="thumb">
<img class="system-icon system" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
</span><span class="display-name">General</span>
</a>
</li>
<li class="guide-item-container">
<a class="guide-item" data-feed-name="home">
<span class="thumb">
<img class="system-icon system" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
</span><span class="display-name">Home</span>
</a>
</li>
<li class="guide-item-container">
<a class="guide-item" data-feed-name="channel">
<span class="thumb">
<img class="system-icon system" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
</span><span class="display-name">Channel</span>
</a>
</li>
</ul>
</div>
</div>
<div id="disclaimer">This is in beta.
Things may not work as intended.</div>
</div>
<div class="guide-background" style="top: 0"></div>
<div id="feed" style="width: 790px;">
${document.cosmicCat.Template.Settings.Feeds.General()}
${document.cosmicCat.Template.Settings.Feeds.Home()}
${document.cosmicCat.Template.Settings.Feeds.Channel()}
</div>
<div id="feed-background" style="width: 790px;"></div>
</div>
</div>`;
            },
            Feeds: {
                General: () => {
                    return `<div id="feed-main-general" class="individual-feed selected">
<div class="feed-container">
<div class="feed-page">
<ul class="array" style="user-select: none;">
<li>
<div class="feed-item-container">
<div class="feed-item-main">
<label title="Enable/disable dark theme">Dark theme: <input type="checkbox" ${document.cosmicCat.Storage.get("dark").value == "1" ? "checked" : ""} id="darkTheme" data-action="toggleDarkTheme" data-storage="dark" class="cosmic-cat-settings ios-switch" /><div class="switch"></div></label>
<label title="Enable/disable iframe player">iFrame Player: <input type="checkbox" ${document.cosmicCat.Storage.get("iframe").value == "1" ? "checked" : ""} id="iframe" data-storage="iframe" class="cosmic-cat-settings ios-switch" /><div class="switch"></div></label>
</div>
</div>
</li>
</ul>
</div>
</div>
</div>`;
                },
                Home: () => {
                    let options = "";
                    for (let i = 0; i < document.cosmicCat.data.homeCategories.length; i++) {
                        options += `<option value="${document.cosmicCat.data.homeCategories[i]}">${localizeString("guide." + document.cosmicCat.data.homeCategories[i])}</option>`;
                    }
                    return `<div id="feed-main-home" class="individual-feed hid">
<div class="feed-container">
<div class="feed-page">
<ul class="array" style="user-select: none;">
<li>
<div class="feed-item-container">
<div class="feed-item-main">
Main feed: <select class="cosmic-cat-settings" id="mainFeed" data-action="setHomeMainFeed" data-storage="greeting_feed" title="Set default feed for home page">
${(document.cosmicCat.Account.isLoggedIn()) ? `<option value="subscriptions">${localizeString("personal.subscriptions")}</option>` : ""}
<option value="youtube">${localizeString("guide.fromyt")}</option>
${options}
</select>
</div>
</div>
</li>
</ul>
</div>
</div>
</div>`;
                },
                Channel: () => {
                    return `<div id="feed-main-channel" class="individual-feed hid">
<div class="feed-container">
<div class="feed-page">
<ul class="array" style="user-select: none;">
<li>
<div class="feed-item-container">
<div class="feed-item-main">
Channel revision: <select class="cosmic-cat-settings" id="channelMode" data-action="toggleChannelMode" data-storage="channel_mode" title="Set channel layout">
<option value="3">3.0</option>
<option value="2">2.0</option>
<option value="1" disabled="">1.0</option>
</select>
</div>
</div>
</li>
</ul>
</div>
</div>
</div>`;
                }
            },
            Stylesheet: () => {
                return `<style>
[transition] {
transition: background-color .3s ease;
}

#disclaimer {
text-align: center;
position: absolute;
white-space: pre-wrap;
height: 40px;
bottom: 0;
}

input[type="checkbox"] {
position : absolute;
opacity : 0;
}
input[type="checkbox"].ios-switch + div {
display : inline-block;
vertical-align : middle;
width : 3em;
height : 1em;
border : rgba(0, 0, 0, 0.3) solid 1px;
border-radius : 999px;
margin : 0 0.5em;
background : white;
background-image : linear-gradient(rgba(0, 0, 0, 0.1), transparent), linear-gradient(90deg, hsl(210, 90%, 60%) 50%, transparent 50%);
background-size : 200% 100%;
background-position : 100% 0;
background-origin : border-box;
background-clip : border-box;
overflow : hidden;
transition-duration : 0.4s;
transition-property : padding, width, background-position, text-indent;
box-shadow : 0 0.1em 0.1em rgba(0, 0, 0, 0.2) inset, 0 0.45em 0 0.1em rgba(0, 0, 0, 0.05) inset;
font-size : 150%;
}
input[type="checkbox"].ios-switch:checked + div {
padding-left : 2em;
width : 1em;
background-position : 0 0;
}
input[type="checkbox"].ios-switch + div:before {
content : 'On';
float : left;
width : 1.65em;
height : 1.65em;
margin : -0.1em;
border : rgba(0, 0, 0, 0.35) solid 1px;
border-radius : inherit;
background : white;
background-image : linear-gradient(rgba(0, 0, 0, 0.2), transparent);
box-shadow : 0 0.1em 0.1em 0.1em hsla(0, 0%, 100%, 0.8) inset, 0 0 0.5em rgba(0, 0, 0, 0.3);
color : white;
text-shadow : 0 -1px 1px rgba(0, 0, 0, 0.3);
text-indent : -2.5em;
}
input[type="checkbox"].ios-switch:active + div:before {
background-color : #eee;
}
input[type="checkbox"].ios-switch:focus + div {
box-shadow : 0 0.1em 0.1em rgba(0, 0, 0, 0.2) inset, 0 0.45em 0 0.1em rgba(0, 0, 0, 0.05) inset, 0 0 0.4em 1px rgba(255, 0, 0, 0.5);
}
input[type="checkbox"].ios-switch + div:before, input[type="checkbox"].ios-switch + div:after {
font : bold 60%/1.9 sans-serif;
text-transform : uppercase;
}
input[type="checkbox"].ios-switch + div:after {
content : 'Off';
float : left;
text-indent : 0.5em;
color : rgba(0, 0, 0, 0.45);
text-shadow : none;
}
</style>`;
            }
        },
        Buttons: {
            Subscribe: (data) => {
                const l = {
                    watch: () => {
                        return `<div class="yt-subscription-button-hovercard yt-uix-hovercard" data-card-class="watch-subscription-card">
<span class="yt-uix-button-context-light yt-uix-button-subscription-container">
<button onclick=";return false;" type="button" class="yt-subscription-button yt-uix-button yt-uix-button-subscription yt-uix-tooltip yt-subscription-button-js-default end ${document.cosmicCat.Channels.checkIfSubscribed() ? "subscribed hover-enabled" : ""}" data-enable-hovercard="true" data-subscription-value="${data}" data-subscription-feature="${document.cosmicCat.Utils.whatPage()}" data-subscription-type="" data-sessionlink="" data-subscription-initialized="true" role="button">
<span class="yt-uix-button-icon-wrapper">
<img class="yt-uix-button-icon yt-uix-button-icon-subscribe" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-valign-trick"></span>
</span><span class="yt-uix-button-content">
<span class="subscribe-label">${localizeString("buttons.subscribe.subscribe")}</span>
<span class="subscribed-label">${localizeString("buttons.subscribe.subscribed")}</span>
<span class="unsubscribe-label">${localizeString("buttons.subscribe.unsubscribe")}</span>
</span>
</button>
<span class="yt-subscription-button-disabled-mask"></span>
</span>
</div>`;
                    },
                    channels3: () => {
                        return `<div class="yt-subscription-button-hovercard yt-uix-hovercard">
<span class="yt-uix-button-context-light yt-uix-button-subscription-container">
<button onclick=";return false;" title="" type="button" class="yt-subscription-button subscription-button-with-recommended-channels yt-uix-button yt-uix-button-subscription yt-uix-tooltip ${document.cosmicCat.Channels.checkIfSubscribed() ? "subscribed hover-enabled" : ""}" data-enable-hovercard="true" data-subscription-value="${data}" data-force-position="" data-position="" data-subscription-feature="${document.cosmicCat.Utils.whatPage()}" data-subscription-type="" role="button">
<span class="yt-uix-button-icon-wrapper">
<img class="yt-uix-button-icon yt-uix-button-icon-subscribe" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-valign-trick"></span>
</span><span class="yt-uix-button-content">
<span class="subscribe-label">${localizeString("buttons.subscribe.subscribe")}</span>
<span class="subscribed-label">${localizeString("buttons.subscribe.subscribed")}</span>
<span class="unsubscribe-label">${localizeString("buttons.subscribe.unsubscribe")}</span>
</span>
</button>
<span class="yt-subscription-button-disabled-mask"></span>
</span>
</div>`;
                    },
                    channels2: () => {
                        return `<span class="subscription-container" data-subscription-expandable-id="subscription-button-module-menu" data-subscription-channels-container="subscription-recommended-channels" data-subscription-value="${data}" data-subscription-menu-type="expander" data-subscription-xsrf="" data-subscription-feature="channel" data-subscription-type="user">
<button type="button" class="subscribe-button yt-uix-button yt-uix-tooltip ${document.cosmicCat.Channels.checkIfSubscribed() ? "yt-subscription-button-green" : "yt-uix-button-urgent"}" onclick=";return false;" title="${document.cosmicCat.Channels.checkIfSubscribed() ? localizeString("tooltip.channels2.subscribe.subscribed") : localizeString("tooltip.channels2.subscribe.subscribe")}" data-loaded="true" data-button-action="yt.www.subscriptions.button.toggleMenu" role="button" data-tooltip-text="${document.cosmicCat.Channels.checkIfSubscribed() ? localizeString("tooltip.channels2.subscribe.subscribed") : localizeString("tooltip.channels2.subscribe.subscribe")}">
<span class="yt-uix-button-content">${document.cosmicCat.Channels.checkIfSubscribed() ? localizeString("buttons.subscribe.subscribed") : localizeString("buttons.subscribe.subscribe")}</span>
</button>
<span class="subscription-subscribed-container hid">
<span class="subscription-options-button subscription-expander yt-uix-expander yt-uix-expander-collapsed" data-expander-action="yt.www.subscriptions.button.toggleMenu">
<span class="yt-uix-expander-head yt-rounded">
<button class="yt-uix-expander-arrow" onclick="return false;"></button>
<span class="yt-alert yt-alert-success yt-alert-small yt-alert-naked yt-rounded">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" class="icon" alt="Alert icon"><span class="yt-alert-content">Subscribed</span>
</span>
</span>
</span>
</span>
</span>`;
                    },
                    playlist: () => {
                        return `<button onclick=";return false;" title="" type="button" class="yt-subscription-button yt-subscription-button-js-default yt-uix-button yt-uix-button-subscription yt-uix-tooltip ${document.cosmicCat.Channels.checkIfSubscribed() ? "subscribed hover-enabled" : ""}" data-subscription-feature="${document.cosmicCat.Utils.whatPage()}" data-sessionlink="" data-subscription-value="${data}" data-subscription-type="" role="button" data-subscription-initialized="true">
<span class="yt-uix-button-icon-wrapper">
<img class="yt-uix-button-icon yt-uix-button-icon-subscribe" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-valign-trick"></span>
</span><span class="yt-uix-button-content">
<span class="subscribe-label">${localizeString("buttons.subscribe.subscribe")}</span>
<span class="subscribed-label">${localizeString("buttons.subscribe.subscribed")}</span>
<span class="unsubscribe-label">${localizeString("buttons.subscribe.unsubscribe")}</span>
</span>
</button>`;
                    }
                };
                const l_signedout = `<button disabled="True" onclick=";return false;" title="No need to subscribe to yourself!" type="button" class="yt-subscription-button end yt-uix-button yt-uix-button-default yt-uix-tooltip" role="button">
<span class="yt-uix-button-content">${localizeString("buttons.subscribe.subscribe")}</span>
</button>`;

                return `${((document.cosmicCat.Channels.isOwner(data)) || document.cosmicCat.watch.isOwner()) ? l_signedout : undefined || l[document.cosmicCat.Utils.whatPage()]()}`;
            },
            LikeDis: (data) => {
                return `<span id="watch-like-unlike" class="yt-uix-button-group">
<button onclick=";return false;" title="${localizeString("tooltip.watch.ilikethis")}" type="button" class="start yt-uix-tooltip-reverse yt-uix-button yt-uix-button-default yt-uix-tooltip ${(document.cosmicCat.watch.isVideoLiked() ? "liked" : "")}" id="watch-like" data-button-toggle="true" data-button-action="yt.www.watch.actions.like" role="button">
<span class="yt-uix-button-icon-wrapper">
<img class="yt-uix-button-icon yt-uix-button-icon-watch-like" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="${localizeString("buttons.watch.ilikethis")}"><span class="yt-valign-trick"></span>
</span><span class="yt-uix-button-content">${localizeString("buttons.watch.like")}</span>
</button><button onclick=";return false;" title="${localizeString("tooltip.watch.idislikethis")}" type="button" class="end yt-uix-tooltip-reverse yt-uix-button yt-uix-button-default yt-uix-tooltip yt-uix-button-empty ${(document.cosmicCat.watch.isVideoDisliked() ? "unliked" : "")}" id="watch-unlike" data-button-toggle="true" data-button-action="yt.www.watch.actions.unlike" role="button">
<span class="yt-uix-button-icon-wrapper">
<img class="yt-uix-button-icon yt-uix-button-icon-watch-unlike" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="${localizeString("tooltip.watch.idislikethis")}"><span class="yt-valign-trick"></span>
</span>
</button>
</span>`;
            },
            addTo: (data) => {
                return `<button onclick=";return false;" title="Watch Later" type="button" class="addto-button video-actions addto-watch-later-button-sign-in yt-uix-button yt-uix-button-default yt-uix-button-short yt-uix-tooltip" data-button-menu-id="shared-addto-watch-later-login" data-video-ids="${data}" role="button" data-tooltip-text="Watch Later">
<span class="yt-uix-button-content">
<img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Watch Later">
</span><img class="yt-uix-button-arrow" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="">
</button>`;
            }
        },
        Watch: {
            Content: {
                playlistBar: {
                    Main: (data) => {
                        return `<div id="playlist-bar" class="active autoplay-on shuffle-off max" data-list-id="${data.id}" data-list-type="PL" data-index-offset="0" data-video-ids="" data-list-length="47" data-masked="True" data-video-url="/watch?v=&amp;feature=BFa&amp;list=${data.id}">
${document.cosmicCat.Template.Watch.Content.playlistBar.barBar(data)}
${document.cosmicCat.Template.Watch.Content.playlistBar.barTray.Main(data)}
</div>`;
                    },
                    aMain: () => {
                        return `<div id="playlist-bar" class="active autoplay-on shuffle-off max" data-list-id="2D5ACE7F76092751" data-list-type="PL" data-index-offset="0" data-video-ids="" data-list-length="47" data-masked="True" data-video-url="/watch?v=&amp;feature=BFa&amp;list=PL2D5ACE7F76092751">
<iframe id="playlist-bar-mask" src="javascript:&quot;&quot;" allow="autoplay 'self'; fullscreen 'self'" data-ruffle-polyfilled="" frameborder="0"></iframe>
<div id="playlist-bar-bar-container">
<div id="playlist-bar-bar">
<div class="yt-alert yt-alert-naked yt-alert-success hid" id="playlist-bar-notifications">
<div class="yt-alert-icon">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" class="icon master-sprite" alt="Alert icon">
</div>
<div class="yt-alert-content" role="alert"></div>
</div>
<span id="playlist-bar-info">
<span class="playlist-bar-active playlist-bar-group">
<button onclick=";return false;" title="Previous video" type="button" id="playlist-bar-prev-button" class="yt-uix-tooltip yt-uix-tooltip-masked yt-uix-button yt-uix-button-default yt-uix-tooltip yt-uix-button-empty" role="button">
<span class="yt-uix-button-icon-wrapper">
<img class="yt-uix-button-icon yt-uix-button-icon-playlist-bar-prev" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Previous video"><span class="yt-valign-trick"></span>
</span>
</button>
<span class="playlist-bar-count">
<span class="playing-index">18</span> / <span class="item-count">47</span>
</span>
<button type="button" class="yt-uix-tooltip yt-uix-tooltip-masked yt-uix-button yt-uix-button-default yt-uix-button-empty" onclick=";return false;" id="playlist-bar-next-button" role="button" data-tooltip-text="Next video">
<span class="yt-uix-button-icon-wrapper">
<img class="yt-uix-button-icon yt-uix-button-icon-playlist-bar-next" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-valign-trick"></span>
</span>
</button>
</span>
<span class="playlist-bar-active playlist-bar-group">
<button type="button" class="yt-uix-tooltip yt-uix-tooltip-masked yt-uix-button-toggled yt-uix-button yt-uix-button-default yt-uix-button-empty" onclick=";return false;" id="playlist-bar-autoplay-button" data-button-toggle="true" role="button" data-tooltip-text="Turn autoplay off"><span class="yt-uix-button-icon-wrapper"><img class="yt-uix-button-icon yt-uix-button-icon-playlist-bar-autoplay" src="//web.archive.org/web/20120805130558im_/https://s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-valign-trick"></span></span></button><button type="button" class="yt-uix-tooltip yt-uix-tooltip-masked  yt-uix-button yt-uix-button-default yt-uix-button-empty" onclick=";return false;" id="playlist-bar-shuffle-button" data-button-toggle="true" role="button" data-tooltip-text="Turn shuffle on"><span class="yt-uix-button-icon-wrapper"><img class="yt-uix-button-icon yt-uix-button-icon-playlist-bar-shuffle" src="//web.archive.org/web/20120805130558im_/https://s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-valign-trick"></span></span></button></span><span class="playlist-bar-passive playlist-bar-group"><button onclick=";return false;" title="Play videos" type="button" id="playlist-bar-play-button" class="yt-uix-tooltip yt-uix-tooltip-masked  yt-uix-button yt-uix-button-default yt-uix-tooltip yt-uix-button-empty" role="button"><span class="yt-uix-button-icon-wrapper"><img class="yt-uix-button-icon yt-uix-button-icon-playlist-bar-play" src="//web.archive.org/web/20120805130558im_/https://s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Play videos"><span class="yt-valign-trick"></span></span></button><span class="playlist-bar-count"><span class="item-count">47</span></span></span><span id="playlist-bar-title" class="yt-uix-button-group"><button href="/web/20120805130558mp_/https://www.youtube.com/playlist?list=PL2D5ACE7F76092751" onclick=";window.location.href=this.getAttribute('href');return false;" title="More information about this playlist" type="button" class="yt-uix-tooltip yt-uix-tooltip-masked start playlist-title yt-uix-button yt-uix-button-default yt-uix-tooltip" role="button"><span class="yt-uix-button-content">Official 10 hour playlist </span></button><button href="/web/20120805130558mp_/https://www.youtube.com/user/TehN1ppe?feature=BF" type="button" class="yt-uix-tooltip yt-uix-tooltip-masked end yt-uix-button yt-uix-button-default" onclick=";window.location.href=this.getAttribute('href');return false;" role="button"><span class="yt-uix-button-content">  <span class="video-thumb ux-thumb yt-thumb-square-23 "><span class="yt-thumb-clip"><span class="yt-thumb-clip-inner"><img src="https://web.archive.org/web/20120805130558im_/https://i1.ytimg.com/i/xHoFjiQvDUvFXJTpXzKYQw/1.jpg?v=c0308b" alt="Thumbnail" width="23"><span class="vertical-align"></span></span></span></span>
<span class="yt-user-name" dir="ltr">TehN1ppe</span>
</span>
</button>
</span>
</span>
<a id="playlist-bar-lists-back" href="#">Return to active list</a>
<span id="playlist-bar-controls">
<span class="playlist-bar-group">
<button type="button" class="yt-uix-tooltip yt-uix-tooltip-masked yt-uix-button yt-uix-button-text yt-uix-button-empty" onclick=";return false;" id="playlist-bar-toggle-button" role="button" data-tooltip-text="Hide playlist">
<span class="yt-uix-button-icon-wrapper">
<img class="yt-uix-button-icon yt-uix-button-icon-playlist-bar-toggle" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-valign-trick"></span>
</span>
</button>
</span>
<span class="playlist-bar-group">
<button type="button" class="yt-uix-tooltip yt-uix-tooltip-masked yt-uix-button-reverse flip yt-uix-button yt-uix-button-text" onclick=";return false;" data-button-menu-id="playlist-bar-options-menu" data-button-has-sibling-menu="true" role="button"><span class="yt-uix-button-content">Options </span><img class="yt-uix-button-arrow" src="//web.archive.org/web/20120805130558im_/https://s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""></button></span></span>      </div>
</div>
<div id="playlist-bar-tray-container">
<div id="playlist-bar-tray" class="yt-uix-slider yt-uix-slider-fluid" data-slider-offset="-4284">
<button class="yt-uix-button playlist-bar-tray-button yt-uix-button-default yt-uix-slider-prev" onclick="return false;"><img class="yt-uix-slider-prev-arrow" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Previous video"></button>
<button class="yt-uix-button playlist-bar-tray-button yt-uix-button-default yt-uix-slider-next" onclick="return false;"><img class="yt-uix-slider-next-arrow" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Next video"></button>
<div class="yt-uix-slider-body">
<div id="playlist-bar-tray-content" class="yt-uix-slider-slide" style="left: -4284px;">
<ol class="video-list">
<li class="playlist-bar-item yt-uix-slider-slide-unit loading" data-video-id="8ZcmTl_1ER8">
<a href="https://www.youtube.com/watch?v=8ZcmTl_1ER8&amp;feature=BFa&amp;list=PL2D5ACE7F76092751" title="" class="yt-uix-sessionlink" data-sessionlink="ei=CLKl0-DG0LECFRGNfAodf1H5ZA%3D%3D&amp;feature=BFa">
<span class="video-thumb ux-thumb yt-thumb-default-106">
<span class="yt-thumb-clip">
<span class="yt-thumb-clip-inner">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="" data-thumb-manual="true" data-thumb="//i4.ytimg.com/vi/8ZcmTl_1ER8/default.jpg" width="106"><span class="vertical-align"></span>
</span>
</span>
</span>
<span class="screen"></span>
<span class="count"><strong>1</strong></span><span class="play"><img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif"></span><span class="yt-uix-button yt-uix-button-default delete"><img class="yt-uix-button-icon-playlist-bar-delete" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Delete"></span><span class="now-playing">Now playing</span><span dir="ltr" class="title"><span>  <span class="uploader">by </span>
</span>
</span>
<span class="dragger"></span>
</a>
</li>
</ol>
<ol id="playlist-bar-help">
<li class="empty playlist-bar-help-message">Your queue is empty. Add videos to your queue using this button: <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" class="addto-button-help"><br> or <a href="https://web.archive.org/web/20120805130558/https://accounts.google.com/ServiceLogin?uilel=3&amp;service=youtube&amp;passive=true&amp;continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Faction_handle_signin%3Dtrue%26feature%3Dplaylist%26nomobiletemp%3D1%26hl%3Den_US%26next%3D%252Fwatch%253Fv%253DJikPgxdmpJY%2526playnext%253D1%2526list%253DPL2D5ACE7F76092751%2526feature%253Dresults_main&amp;hl=en_US&amp;ltmpl=sso">sign in</a> to load a different list.</li>
</ol>
</div>
<div class="yt-uix-slider-shade-left"></div>
<div class="yt-uix-slider-shade-right"></div>
</div>
</div>
<div id="playlist-bar-save"></div>
<div id="playlist-bar-lists" class="dark-lolz"></div>
<div id="playlist-bar-loading">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Loading..."><span id="playlist-bar-loading-message">Loading...</span><span id="playlist-bar-saving-message" class="hid">Saving...</span>
</div>
<div id="playlist-bar-template" style="display: none;" data-video-thumb-url="//i4.ytimg.com/vi/__video_encrypted_id__/default.jpg">
<!--<li class="playlist-bar-item yt-uix-slider-slide-unit __classes__" data-video-id="__video_encrypted_id__">
<a href="__video_url__" title="__video_title__" class="yt-uix-sessionlink" data-sessionlink="ei=CLKl0-DG0LECFRGNfAodf1H5ZA%3D%3D&amp;feature=BFa">
<span class="video-thumb ux-thumb yt-thumb-default-106 ">
<span class="yt-thumb-clip">
<span class="yt-thumb-clip-inner">
<img src="https://s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="__video_title__" data-thumb-manual="true" data-thumb="__video_thumb_url__" width="106" ><span class="vertical-align"></span>
</span>
</span>
</span>
<span class="screen"></span>
<span class="count"><strong>__list_position__</strong></span><span class="play"><img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif"></span><span class="yt-uix-button yt-uix-button-default delete"><img class="yt-uix-button-icon-playlist-bar-delete" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Delete"></span><span class="now-playing">Now playing</span><span dir="ltr" class="title"><span>__video_title__  <span class="uploader">by __video_display_name__</span>
</span>
</span>
<span class="dragger"></span>
</a>
</li>-->
</div>
<div id="playlist-bar-next-up-template" style="display: none;">
<!--<div class="playlist-bar-next-thumb">
<span class="video-thumb ux-thumb yt-thumb-default-74">
<span class="yt-thumb-clip"><span class="yt-thumb-clip-inner">
<img src="//i4.ytimg.com/vi/__video_encrypted_id__/default.jpg" alt="Thumbnail" width="74"><span class="vertical-align"></span>
</span>
</span>
</span>
</div>-->
</div>
</div>
<div id="playlist-bar-options-menu" class="hid active">
<ul class="playlist-bar-passive-menu">
<li>
<span class="yt-uix-button-menu-item" data-action="show-active">Return to: Official 10 hour playlist</span>
</li>
</ul>
<div id="playlist-bar-extras-menu">
<ul>
<li>
<span class="yt-uix-button-menu-item" onclick="window.location.href='/playlist?list=PL2D5ACE7F76092751'">More information about this playlist</span>
</li>
</ul>
</div>
<ul>
<li>
<span class="yt-uix-button-menu-item" onclick="window.location.href='//support.google.com/youtube/bin/answer.py?answer=146749&amp;hl=en-US'">Learn more</span>
</li>
</ul>
</div>
</div>`;
                    },
                    barBar: (data) => {
                        return `<div id="playlist-bar-bar-container">
<div id="playlist-bar-bar">
<div class="yt-alert yt-alert-naked yt-alert-success hid" id="playlist-bar-notifications">
<div class="yt-alert-icon">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" class="icon master-sprite" alt="Alert icon">
</div>
<div class="yt-alert-content" role="alert"></div>
</div>
<span id="playlist-bar-info">
<span class="playlist-bar-active playlist-bar-group">
<button onclick=";return false;" title="Previous video" type="button" id="playlist-bar-prev-button" class="yt-uix-tooltip yt-uix-tooltip-masked yt-uix-button yt-uix-button-default yt-uix-tooltip yt-uix-button-empty" role="button">
<span class="yt-uix-button-icon-wrapper">
<img class="yt-uix-button-icon yt-uix-button-icon-playlist-bar-prev" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Previous video"><span class="yt-valign-trick"></span>
</span>
</button>
<span class="playlist-bar-count">
<span class="playing-index">${data.videos.runs[0].text}</span> / <span class="item-count">${data.videos.runs[2].text}</span>
</span>
<button type="button" class="yt-uix-tooltip yt-uix-tooltip-masked yt-uix-button yt-uix-button-default yt-uix-button-empty" onclick=";return false;" id="playlist-bar-next-button" role="button" data-tooltip-text="Next video">
<span class="yt-uix-button-icon-wrapper">
<img class="yt-uix-button-icon yt-uix-button-icon-playlist-bar-next" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-valign-trick"></span>
</span>
</button>
</span>
<span class="playlist-bar-active playlist-bar-group">
<button type="button" class="yt-uix-tooltip yt-uix-tooltip-masked yt-uix-button-toggled yt-uix-button yt-uix-button-default yt-uix-button-empty" onclick=";return false;" id="playlist-bar-autoplay-button" data-button-toggle="true" role="button" data-tooltip-text="Turn autoplay off">
<span class="yt-uix-button-icon-wrapper">
<img class="yt-uix-button-icon yt-uix-button-icon-playlist-bar-autoplay" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-valign-trick"></span>
</span>
</button>
<button type="button" class="yt-uix-tooltip yt-uix-tooltip-masked yt-uix-button yt-uix-button-default yt-uix-button-empty" onclick=";return false;" id="playlist-bar-shuffle-button" data-button-toggle="true" role="button" data-tooltip-text="Turn shuffle on">
<span class="yt-uix-button-icon-wrapper">
<img class="yt-uix-button-icon yt-uix-button-icon-playlist-bar-shuffle" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-valign-trick"></span>
</span>
</button>
</span>
<span class="playlist-bar-passive playlist-bar-group">
<button onclick=";return false;" title="Play videos" type="button" id="playlist-bar-play-button" class="yt-uix-tooltip yt-uix-tooltip-masked yt-uix-button yt-uix-button-default yt-uix-tooltip yt-uix-button-empty" role="button">
<span class="yt-uix-button-icon-wrapper">
<img class="yt-uix-button-icon yt-uix-button-icon-playlist-bar-play" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Play videos"><span class="yt-valign-trick"></span>
</span>
</button>
<span class="playlist-bar-count">
<span class="item-count">47</span>
</span>
</span>
<span id="playlist-bar-title" class="yt-uix-button-group">
<button href="https://www.youtube.com/playlist?list=${data.id}" onclick=";window.location.href=this.getAttribute('href');return false;" title="More information about this playlist" type="button" class="yt-uix-tooltip yt-uix-tooltip-masked start playlist-title yt-uix-button yt-uix-button-default yt-uix-tooltip" role="button">
<span class="yt-uix-button-content">${data.title}</span>
</button><button href="${data.owner.url}" type="button" class="yt-uix-tooltip yt-uix-tooltip-masked end yt-uix-button yt-uix-button-default" onclick=";window.location.href=this.getAttribute('href');return false;" role="button">
<span class="yt-uix-button-content">
<span class="video-thumb ux-thumb yt-thumb-square-23">
<span class="yt-thumb-clip">
<span class="yt-thumb-clip-inner">
<img src="" alt="Thumbnail" width="23"><span class="vertical-align"></span>
</span>
</span>
</span>
<span class="yt-user-name" dir="ltr">${data.owner.name}</span>
</span>
</button>
</span>
</span>
<a id="playlist-bar-lists-back" href="#">Return to active list</a>
<span id="playlist-bar-controls">
<span class="playlist-bar-group">
<button type="button" class="yt-uix-tooltip yt-uix-tooltip-masked yt-uix-button yt-uix-button-text yt-uix-button-empty" onclick=";return false;" id="playlist-bar-toggle-button" role="button" data-tooltip-text="Hide playlist">
<span class="yt-uix-button-icon-wrapper">
<img class="yt-uix-button-icon yt-uix-button-icon-playlist-bar-toggle" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""><span class="yt-valign-trick"></span>
</span>
</button>
</span>
<span class="playlist-bar-group">
<button type="button" class="yt-uix-tooltip yt-uix-tooltip-masked yt-uix-button-reverse flip yt-uix-button yt-uix-button-text" onclick=";return false;" data-button-menu-id="playlist-bar-options-menu" data-button-has-sibling-menu="true" role="button"><span class="yt-uix-button-content">Options </span><img class="yt-uix-button-arrow" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""></button>
</span>
</span>
</div>
</div>`;
                    },
                    barTray: {
                        Main: () => {
                            return `<div id="playlist-bar-tray-container">
<div id="playlist-bar-tray" class="yt-uix-slider yt-uix-slider-fluid" data-slider-offset="-4284">
<button class="yt-uix-button playlist-bar-tray-button yt-uix-button-default yt-uix-slider-prev" onclick="return false;"><img class="yt-uix-slider-prev-arrow" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Previous video"></button>
<button class="yt-uix-button playlist-bar-tray-button yt-uix-button-default yt-uix-slider-next" onclick="return false;"><img class="yt-uix-slider-next-arrow" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Next video"></button>
${document.cosmicCat.Template.Watch.Content.playlistBar.barTray.Body()}
</div>

<div id="playlist-bar-save"></div>

<div id="playlist-bar-lists" class="dark-lolz"></div>

${document.cosmicCat.Template.Watch.Content.playlistBar.barTray.Loading()}
</div>`;
                        },
                        Body: () => {
                            return `<div class="yt-uix-slider-body">
${document.cosmicCat.Template.Watch.Content.playlistBar.barTray.trayContent.Content()}
<div class="yt-uix-slider-shade-left"></div>
<div class="yt-uix-slider-shade-right"></div>
</div>`;
                        },
                        Loading: () => {
                            return `<div id="playlist-bar-loading">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Loading..."><span id="playlist-bar-loading-message">Loading...</span><span id="playlist-bar-saving-message" class="hid">Saving...</span>
</div>`;
                        },
                        trayContent: {
                            Content: () => {
                                return `<div id="playlist-bar-tray-content" class="yt-uix-slider-slide" style="left: 0px;">
<ol class="video-list"></ol>
<ol id="playlist-bar-help">
<li class="empty playlist-bar-help-message">Your queue is empty. Add videos to your queue using this button: <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" class="addto-button-help"><br> or <a href="">sign in</a> to load a different list.</li>
</ol>
</div>`;
                            },
                            video: (data, pl) => {
                                return `<li class="playlist-bar-item yt-uix-slider-slide-unit" data-video-id="${data.id}">
<a href="https://www.youtube.com/watch?v=${data.id}&amp;feature=BFa&amp;list=${pl.id}" title="" class="yt-uix-sessionlink" data-sessionlink="ei=CLKl0-DG0LECFRGNfAodf1H5ZA%3D%3D&amp;feature=BFa">
<span class="video-thumb ux-thumb yt-thumb-default-106">
<span class="yt-thumb-clip">
<span class="yt-thumb-clip-inner">
<img src="${data.thumbnail}" alt="" data-thumb-manual="true" data-thumb="${data.thumbnail}" width="106"><span class="vertical-align"></span>
</span>
</span>
</span>
<span class="screen"></span>
<span class="count"><strong>1</strong></span>
<span class="play"><img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif"></span>
<span class="yt-uix-button yt-uix-button-default delete">
<img class="yt-uix-button-icon-playlist-bar-delete" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Delete"></span>
<span class="now-playing">Now playing</span>
<span dir="ltr" class="title">${data.title}<span>
<span class="uploader">by ${data.owner.name}</span>
</span>
</span>
<span class="dragger"></span>
</a>
</li>`;
                            }
                        }
                    }
                },
                metadata: (videoData) => {
                    return `<link itemprop="url" href="http://www.youtube.com/watch?v=${videoData.primary.id}">
<meta itemprop="name" content="${videoData.primary.title}">
<meta itemprop="description" content="${document.cosmicCat.Utils.escapeHtml(videoData.secondary.description)}">
<meta itemprop="duration" content="PT0M18S">
<meta itemprop="unlisted" content="False">
<meta itemprop="paid" content="False">
<span itemprop="author" itemscope="" itemtype="http://schema.org/Person">
<link itemprop="url" href="${videoData.secondary.owner.url}">
</span>
<link itemprop="thumbnailUrl" href="${videoData.primary.thumbnail}">
<span itemprop="thumbnail" itemscope="" itemtype="http://schema.org/ImageObject">
<link itemprop="url" href="${videoData.primary.thumbnail}">
<meta itemprop="width" content="320">
<meta itemprop="height" content="180">
</span>
<link itemprop="embedURL" href="http://www.youtube.com/v/${videoData.primary.id}?version=3&amp;autohide=1">
<meta itemprop="playerType" content="Flash">
<meta itemprop="width" content="480">
<meta itemprop="height" content="360">
<meta itemprop="isFamilyFriendly" content="True">`;
                },
                Main: (data) => {
                    return `<div id="content" class="">
<div id="watch-container" itemscope="" itemtype="https://schema.org/VideoObject">
${document.cosmicCat.Template.Watch.Content.metadata(data)}
${document.cosmicCat.Template.Watch.Content.Headline(data)}
${document.cosmicCat.Template.Watch.Content.videoCon()}
${document.cosmicCat.Template.Watch.Content.mainCon.Main(data)}
</div>
</div>`;
                },
                tag: (data, i) => {
                    return `<li><a href="https://www.youtube.com/results?search_query=${data.alternative.tags[i]}&amp;search=tag">${data.alternative.tags[i]}</a></li>
`;
                },
                ownerContainer: (data) => {
                    return `<div id="watch-owner-container">
<div id="masthead-subnav" class="yt-nav yt-nav-dark">
<ul class="yt-nav-aside">
<li>
<a href="https://www.youtube.com/analytics#fi=v-${data.id}" class="yt-uix-button yt-uix-button-subnav yt-uix-sessionlink yt-uix-button-dark">
<span class="yt-uix-button-content">Analytics</span>
</a>
</li>
<li>
<a href="https://www.youtube.com/my_videos" class="yt-uix-button yt-uix-button-subnav yt-uix-sessionlink yt-uix-button-dark">
<span class="yt-uix-button-content">Video Manager</span>
</a>
</li>
</ul>
<ul>
<li>
<a href="https://studio.youtube.com/video/${data.id}/edit" class="yt-uix-button yt-uix-button-subnav yt-uix-sessionlink yt-uix-button-dark">
<span class="yt-uix-button-content">Edit</span>
</a>
</li>
<li>
<a href="https://studio.youtube.com/video/${data.id}/editor" class="yt-uix-button yt-uix-button-subnav yt-uix-sessionlink yt-uix-button-dark">
<span class="yt-uix-button-content">Enhancements</span>
</a>
</li>
<li>
<a href="https://studio.youtube.com/video/${data.id}/editor" class="yt-uix-button yt-uix-button-subnav yt-uix-sessionlink yt-uix-button-dark">
<span class="yt-uix-button-content">Audio</span>
</a>
</li>
<li>
<a href="https://studio.youtube.com/video/${data.id}/editor" class="yt-uix-button yt-uix-button-subnav yt-uix-sessionlink yt-uix-button-dark">
<span class="yt-uix-button-content">Annotations</span>
</a>
</li>
<li>
<button type="button" class=" yt-uix-button yt-uix-button-dark yt-uix-button-empty" onclick=";return false;" role="button" aria-pressed="false" aria-expanded="false" aria-haspopup="true" aria-activedescendant="">
<img class="yt-uix-button-arrow" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="">
<ul class=" yt-uix-button-menu yt-uix-button-menu-dark" role="menu" aria-haspopup="true" style="display: none;">
<li role="menuitem" id="aria-id-82239352096">
<span href="/my_videos_timedtext?video_id=${data.id}" class=" yt-uix-button-menu-item" onclick=";window.location.href=this.getAttribute('href');return false;">Captions</span>
</li>
<li role="menuitem" id="aria-id-93589831653">
<span href="/my_video_ad?v=${data.id}&amp;utm_source=youtube&amp;utm_campaign=yt_watch&amp;utm_medium=permanent&amp;utm_content=header_menu&amp;utm_term=dropdown" class=" yt-uix-button-menu-item" onclick=";window.location.href=this.getAttribute('href');return false;">Promote</span>
</li>
</ul>
</button>
</li>
</ul>
</div>
</div>`;
                },
                Headline: (data) => {
                    return `<div id="watch-headline-container" class="">
${document.cosmicCat.watch.isOwner() ? document.cosmicCat.Template.Watch.Content.ownerContainer(data.alternative) : ""}
<div id="watch-headline" class="watch-headline">
<h1 id="watch-headline-title">
<span id="eow-title" class="" dir="ltr" title="${data.primary.title}">
${data.primary.title}
</span>
</h1>
<div id="watch-headline-user-info">
<span class="yt-uix-button-group">
<button href="${data.secondary.owner.url}/videos?feature=watch" type="button" class="start yt-uix-button yt-uix-button-default" onclick=";window.location.href=this.getAttribute('href');return false;" role="button">
<span class="yt-uix-button-content">${data.secondary.owner.name}</span>
</button>${document.cosmicCat.Template.Buttons.Subscribe(data.alternative.owner.id)}
</span>
</div>
<div id="watch-more-from-user" class="collapsed">
<div id="watch-channel-discoverbox" class="yt-rounded">
<span id="watch-channel-loading">${localizeString("global.loading.main")}</span>
</div>
</div>
</div>
</div>`;
                },
                videoCon: () => {
                    return `<div id="watch-video-container">
<div id="watch-video">
<div id="watch-player" class="flash-player player-root wm-videoplayer">
</div>
</div>
</div>`;
                },
                mainCon: {
                    Main: (data) => {
                        return `<div id="watch-main-container" class="">
<div id="watch-main">
${document.cosmicCat.Template.Watch.Content.mainCon.panel.Main(data)}
${document.cosmicCat.Template.Watch.Content.mainCon.sideBar.Main(data)}
<div class="clear"></div>
</div>
<div style="visibility: hidden; height: 0px; padding: 0px; overflow: hidden;">
<div id="baseDiv"></div>
</div>
</div>
<style>
.yt-thumb-default-120 img {
width: 120px;
}
</style>`;
                    },
                    panel: {
                        Main: (data) => {
                            return `<div id="watch-panel">
<div id="watch-actions">
<div id="watch-actions">
<div id="watch-actions-right">
<span class="watch-view-count">
<strong>${document.cosmicCat.Utils.parseNumber(data.primary.views.split(" ")[0])}</strong>
</span>
<button onclick=";return false;" type="button" id="watch-insight-button" class="yt-uix-tooltip yt-uix-tooltip-reverse yt-uix-button yt-uix-button-default yt-uix-tooltip yt-uix-button-empty" role="button" title="Show video statistics">
<span class="yt-uix-button-icon-wrapper">
<img class="yt-uix-button-icon yt-uix-button-icon-watch-insight" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Show video statistics"><span class="yt-valign-trick"></span>
</span>
</button>
</div>
${document.cosmicCat.Template.Buttons.LikeDis(data)}
<button type="button" class="yt-uix-tooltip-reverse yt-uix-button yt-uix-button-default yt-uix-tooltip" onclick=";return false;" title="${localizeString("tooltip.watch.addto")}" data-upsell="playlist" data-button-action="yt.www.watch.actions.addto" role="button">
<span class="yt-uix-button-content">
<span class="addto-label">${localizeString("buttons.watch.addto")}</span>
</span>
</button>
<button onclick=";return false;" title="${localizeString("tooltip.watch.share")}" class="yt-uix-tooltip-reverse yt-uix-button yt-uix-button-default yt-uix-tooltip" id="watch-share" data-button-action="yt.www.watch.actions.share" role="button">
<span class="yt-uix-button-content">${localizeString("buttons.watch.share")}</span>
</button>
<button onclick=";return false;" title="${localizeString("tooltip.watch.flag")}" type="button" class="yt-uix-tooltip-reverse yt-uix-button yt-uix-button-default yt-uix-tooltip yt-uix-button-empty" id="watch-flag" data-button-action="yt.www.watch.actions.flag" role="button">
<span class="yt-uix-button-icon-wrapper">
<img class="yt-uix-button-icon yt-uix-button-icon-watch-flag" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="${localizeString("tooltip.watch.flag")}"><span class="yt-valign-trick"></span>
</span>
</button>
<button onclick=";return false;" type="button" class="yt-uix-tooltip-reverse yt-uix-button yt-uix-button-default yt-uix-tooltip yt-uix-button-empty" id="watch-transcript" data-button-action="yt.www.watch.actions.transcript" role="button" title="${localizeString("tooltip.watch.transcript")}">
<span class="yt-uix-button-icon-wrapper">
<img class="yt-uix-button-icon yt-uix-button-icon-transcript" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="${localizeString("tooltip.watch.transcript")}"><span class="yt-valign-trick"></span>
</span>
</button>
</div>
</div>
<div id="watch-actions-area-container" class="hid">
<div id="watch-actions-area" class="yt-rounded">
<div id="watch-actions-loading" class="watch-actions-panel hid">${localizeString("global.loading.main")}</div>
<div id="watch-actions-logged-out" class="watch-actions-panel hid">
<div class="yt-alert yt-alert-warn yt-alert-small yt-alert-naked yt-rounded">
<span class="yt-alert-icon">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" class="icon master-sprite" alt="Alert icon">
</span>
<div class="yt-alert-content">
<strong>
<a href="https://accounts.google.com/ServiceLogin?service=youtube&amp;uilel=3&amp;passive=true&amp;continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Faction_handle_signin%3Dtrue%26app%3Ddesktop%26hl%3Den%26next%3Dhttps%253A%252F%252Fwww.youtube.com%252F&amp;hl=en&amp;ec=65620">Sign In</a> or <a href="https://www.youtube.com/signup">Sign Up</a> now!
</strong>
</div>
</div>
</div>
<div id="watch-actions-error" class="watch-actions-panel hid">
<div class="yt-alert yt-alert-error yt-alert-small yt-alert-naked yt-rounded">
<span class="yt-alert-icon">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" class="icon master-sprite" alt="Alert icon">
</span>
<div id="watch-error-string" class="yt-alert-content"></div>
</div>
</div>
<div id="watch-actions-share" class="watch-actions-panel hid">
${document.cosmicCat.Template.Watch.Content.mainCon.panel.Share(data)}
</div>
<div id="watch-actions-Ajax" class="watch-actions-panel hid"></div>
<div class="close">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" class="close-button" onclick="document.cosmicCat.toggleElm('#watch-actions-area-container')">
</div>
</div>
</div>
<div id="watch-info">
<div id="watch-description" class="yt-uix-expander-collapsed yt-uix-expander">
<div id="watch-description-clip">
<p id="watch-uploader-info">${localizeString("watch.uploaderinfo", data)}</p>
<div id="watch-description-text">
<p id="eow-description">${data.secondary.description}</p>
</div>
<div id="watch-description-extras">
<h4>${localizeString("watch.watchInfo.category")}</h4>
<p id="eow-category"><a href="//www.youtube.com/videos">${data.primary.category}</a></p>
<h4 class="${(data.alternative.tags.length == 0 ? "hid" : "")}">${localizeString("watch.watchInfo.tags")}</h4>
<ul id="eow-tags" class="watch-info-tag-list ${(data.alternative.tags.length == 0 ? "hid" : "")}">

</ul>
<h4>${localizeString("watch.watchInfo.license")}</h4>
<p id="eow-reuse">Standard YouTube License</p>
</div>
</div>
<ul id="watch-description-extra-info">
<li>
<div class="video-extras-sparkbars" style="background-color:red">
<div class="video-extras-sparkbar-likes" style="width: 100%;"></div>
</div>
<span class="video-extras-likes-dislikes">
${localizeString("stats.likesdislikes")}
</span>
</li>
</ul>
<div class="yt-horizontal-rule">
<span class="first"></span>
<span class="second"></span>
<span class="third"></span>
</div>
<div id="watch-description-toggle" class="yt-uix-expander-head">
<div id="watch-description-expand" class="expand">
<button type="button" class="metadata-inline yt-uix-button yt-uix-button-text" onclick="return false;" role="button">
<span class="yt-uix-button-content">${localizeString("buttons.watch.showmore")} <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="${localizeString("buttons.watch.showmore")}"></span>
</button>
</div>
<div id="watch-description-collapse" class="collapse">
<button type="button" class="metadata-inline yt-uix-button yt-uix-button-text" onclick="return false;" role="button">
<span class="yt-uix-button-content">${localizeString("buttons.watch.showless")} <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="${localizeString("buttons.watch.showless")}"></span>
</button>
</div>
</div>
</div>
</div>
${document.cosmicCat.Template.Comments.Main(data)}`;
                        },
                        Share: (data) => {
                            console.log(data);
                            return `<div id="watch-actions-share-panel" class="" style="">
<div class="share-panel">
<div class="share-option-container ytg-box">
<div class="share-panel-buttons yt-uix-expander yt-uix-expander-collapsed">
<span class="share-panel-main-buttons">
<button type="button" class="share-panel-embed yt-uix-button yt-uix-button-default" onclick=";return false;" role="button">
<span class="yt-uix-button-content">Embed </span>
</button><button type="button" class="share-panel-email yt-uix-button yt-uix-button-default" onclick=";return false;" role="button">
<span class="yt-uix-button-content">Email </span>
</button>
</span>
</div>
<div class="share-panel-url-container">
<span class=" yt-uix-form-input-container yt-uix-form-input-text-container yt-uix-form-input-non-empty">
<input class="yt-uix-form-input-text share-panel-url" name="share_url" value="http://youtu.be/${data.alternative.id}" data-video-id="${data.alternative.id}">
</span>
<div class="share-panel-url-options yt-uix-expander yt-uix-expander-collapsed">
<div class="yt-uix-expander-head">
<a class="share-panel-show-url-options">
<span class="collapsed-message">Options<img class="arrow" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt=""></span>
<span class="expanded-message">Close<img class="arrow" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt=""></span>
</a>
</div>
<ul class="yt-uix-expander-body share-options">
<li>
<label>
<input class="share-panel-start-at" type="checkbox"> Start at:
</label>
<input type="text" value="0:00" class="yt-uix-form-input-text share-panel-start-at-time">
</li>
<li>
<label>
<input class="share-panel-long-url" type="checkbox"> Long link
</label>
</li>
</ul>
</div>
</div>
<div class="share-panel-services yt-uix-expander yt-uix-expander-collapsed clearfix">
<ul class="share-group ytg-box">
<li>
<button onclick="window.open(&quot;http:\/\/www.facebook.com\/dialog\/feed?app_id=87741124305\u0026link=http%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D${data.alternative.id}%26feature%3Dshare\u0026display=popup\u0026redirect_uri=https%3A%2F%2Fwww.youtube.com%2Ffacebook_redirect&quot;, {'height': 306,'width': 650,'scrollbars': true});return false;" data-service-name="FACEBOOK" title="Share to Facebook" class="yt-uix-tooltip share-service-button">
<img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Facebook" class="share-service-icon share-service-icon-facebook">
<span>Facebook</span>
</button>
</li>
<li>
<button onclick="window.open(&quot;http:\/\/twitter.com\/intent\/tweet?url=http%3A%2F%2Fyoutu.be%2F${data.alternative.id}\u0026text=${encodeURIComponent(data.alternative.title)}%3A\u0026via=youtube\u0026related=Youtube%2CYouTubeTrends%2CYTCreators&quot;, {'height': 650,'width': 1024,'scrollbars': true});return false;" data-service-name="TWITTER" title="Share to Twitter" class="yt-uix-tooltip share-service-button">
<img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Twitter" class="share-service-icon share-service-icon-twitter">
<span>Twitter</span>
</button>
</li>
<li>
<button onclick="window.open(&quot;https:\/\/plus.google.com\/share?url=http%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D${data.alternative.id}%26feature%3Dshare\u0026source=yt\u0026hl=en&quot;, {'height': 620,'width': 620,'scrollbars': true});return false;" data-service-name="GOOGLEPLUS" title="Share to Google+" class="yt-uix-tooltip share-service-button">
<img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Google+" class="share-service-icon share-service-icon-googleplus">
<span>Google+</span>
</button>
</li>
</ul>
<div class="yt-uix-expander-head clearfix">
<a class="share-panel-show-more">
<span class="collapsed-message">More<img class="arrow" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt=""></span>
<span class="expanded-message">Less<img class="arrow" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt=""></span>
</a>
</div>
<div class="yt-uix-expander-body share-options-secondary">
<div class="secondary">
<div class="share-groups">
<ul>
<li>
<button onclick="window.open(&quot;http:\/\/www.tumblr.com\/share?v=3\u0026u=http%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D${data.alternative.id}%26feature%3Dshare&quot;, {'height': 650,'width': 1024,'scrollbars': true});return false;" data-service-name="TUMBLR" class="share-service-button">
<img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="tumblr." class="share-service-icon share-service-icon-tumblr">
<span>tumblr.</span>
</button>
<span>tumblr.</span>
</li>
<li>
<button onclick="window.open(&quot; http:\/\/pinterest.com\/pin\/create\/button\/?url=http%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D${data.alternative.id}%26feature%3Dshare\u0026description=${encodeURIComponent(data.alternative.title)}\u0026is_video=true\u0026media=http%3A%2F%2Fi3.ytimg.com%2Fvi%2F${data.alternative.id}%2Fhqdefault.jpg&quot;, {'height': 650,'width': 1024,'scrollbars': true});return false;" data-service-name="PINTEREST" class="share-service-button">
<img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="pinterest" class="share-service-icon share-service-icon-pinterest">
<span>pinterest</span>
</button>
<span>pinterest</span>
</li>
<li>
<button onclick="window.open(&quot;http:\/\/www.blogger.com\/blog-this.g?n=Me+at+the+zoo\u0026source=youtube\u0026b=%3Ciframe+width%3D%22459%22+height%3D%22344%22+src%3D%22%2F%2Fwww.youtube.com%2Fembed%2F${data.alternative.id}%22+frameborder%3D%220%22+allowfullscreen%3E%3C%2Fiframe%3E\u0026eurl=http%3A%2F%2Fi3.ytimg.com%2Fvi%2F${data.alternative.id}%2Fhqdefault.jpg&quot;, {'height': 468,'width': 768,'scrollbars': true});return false;" data-service-name="BLOGGER" class="share-service-button">
<img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Blogger" class="share-service-icon share-service-icon-blogger">
<span>Blogger</span>
</button>
<span>Blogger</span>
</li>
<li>
<button onclick="window.open(&quot;http:\/\/www.stumbleupon.com\/submit?url=http%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D${data.alternative.id}%26feature%3Dshare\u0026title=${encodeURIComponent(data.alternative.title)}&quot;, {'height': 650,'width': 1024,'scrollbars': true});return false;" data-service-name="STUMBLEUPON" class="share-service-button">
<img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="StumbleUpon" class="share-service-icon share-service-icon-stumbleupon">
<span>StumbleUpon</span>
</button>
<span>StumbleUpon</span>
</li>
</ul>
<ul>
<li>
<button onclick="window.open(&quot;http:\/\/www.linkedin.com\/shareArticle?url=http%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D${data.alternative.id}%26feature%3Dshare\u0026title=${encodeURIComponent(data.alternative.title)}\u0026summary=The+first+video+on+YouTube%2C+uploaded+at+8%3A27+P.M.+on+Saturday+April+23rd%2C+2005.+The+video+was+shot+by+Yakov+Lapitsky+at+the+San+Diego+Zoo.%0A%0AThis+video+is+published+under+the+Creative+Commons+Attribution+license%3A+http%3A%2F%2Fcreativecommons.org%2Flicenses%2Fby%2F3.0%2Flegalcode\u0026source=Youtube&quot;, {'height': 650,'width': 1024,'scrollbars': true});return false;" data-service-name="LINKEDIN" class="share-service-button">
<img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="LinkedIn" class="share-service-icon share-service-icon-linkedin">
<span>LinkedIn</span>
</button>
<span>LinkedIn</span>
</li>
<li>
<button onclick="window.open(&quot;http:\/\/www.myspace.com\/Modules\/PostTo\/Pages\/?t=${encodeURIComponent(data.alternative.title)}\u0026u=http%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D${data.alternative.id}%26feature%3Dshare\u0026l=1&quot;, {'height': 650,'width': 1024,'scrollbars': true});return false;" data-service-name="MYSPACE" class="share-service-button">
<img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Myspace" class="share-service-icon share-service-icon-myspace">
<span>Myspace</span>
</button>
<span>Myspace</span>
</li>
<li>
<button onclick="window.open(&quot;http:\/\/reddit.com\/submit?url=http%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D${data.alternative.id}%26feature%3Dshare\u0026title=${encodeURIComponent(data.alternative.title)}&quot;, {'height': 650,'width': 1024,'scrollbars': true});return false;" data-service-name="REDDIT" class="share-service-button">
<img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="reddit" class="share-service-icon share-service-icon-reddit">
<span>reddit</span>
</button>
<span>reddit</span>
</li>
</ul>
</div>
</div>
</div>
</div>
<div class="share-panel-embed-container hid">
<div>${localizeString("global.loading.main")}</div>
</div>
<div class="share-panel-email-container hid" data-disabled="true">
<strong>
<a href="">Sign in</a> now!
</strong>
</div>
</div>
<span class="share-panel-hangout">
<img src="//ssl.gstatic.com/s2/oz/images/stars/hangout/1/gplus-hangout-24x100-normal.png" alt="Video call" class="share-panel-hangout-button" title="Watch with your friends.">
</span>
 </div>
</div>`;
                        }
                    },
                    sideBar: {
                        Main: (data) => {
                            return `<div id="watch-sidebar">
<div class="watch-sidebar-section">
<div id="watch-related-container">
<ul id="watch-related" class="video-list">

</ul>
<ul id="watch-more-related" class="video-list hid">
<li id="watch-more-related-loading">${localizeString("global.loading.suggestions")}</li>
</ul>
</div>
<div class="watch-sidebar-foot">
<p class="content">
<button type="button" id="watch-more-related-button" onclick=";return false;" class=" yt-uix-button yt-uix-button-default" data-button-action="yt.www.watch.watch5.handleLoadMoreRelated" role="button">
<span class="yt-uix-button-content">${localizeString("buttons.suggestions.loadmoresuggestions")}</span>
</button>
</p>
</div>
</div>
<span class="yt-vertical-rule-main"></span>
<span class="yt-vertical-rule-corner-top"></span>
<span class="yt-vertical-rule-corner-bottom"></span>
</div>`;
                        },
                        suggestedVideo: (videoData) => {
                            return `<li class="video-list-item">
<a href="https://www.youtube.com/watch?v=${videoData.id}" class="related-video yt-uix-contextlink yt-uix-sessionlink">
<span class="ux-thumb-wrap contains-addto">
<span class="video-thumb ux-thumb yt-thumb-default-120">
<span class="yt-thumb-clip">
<span class="yt-thumb-clip-inner">
<img src="${videoData.thumbnail}" alt="Thumbnail"><span class="vertical-align"></span>
</span>
</span>
</span>
<span class="video-time">${videoData.time}</span>
${document.cosmicCat.Template.Buttons.addTo(videoData.id)}
</span>
<span dir="ltr" class="title" title="${videoData.title}">${videoData.title}</span>
<span class="stat attribution">${localizeString("watch.by", videoData?.owner.name)}</span>
<span class="stat view-count">${videoData.views}</span>
</a>
</li>`;
                        }
                    },
                }
            }
        },
        Comments: {
            Main: (data) => {
                const accountInfo = document.cosmicCat.Storage.get("accountInfo").value || {};
                return `<div id="comments-view" data-type="highlights" class="hid">
<div class="comments-section">
<h4><strong>${localizeString("watch.comments.topcomments")}</strong></h4>
<ul class="comment-list top hid"></ul>
</div>
<div class="comments-section">
<h4><strong>${localizeString("watch.comments.allcomments")}</strong> (${ytInitialData.contents.twoColumnWatchNextResults.results?.results?.contents?.find(b => b.itemSectionRenderer)?.itemSectionRenderer?.contents?.[0]?.commentsEntryPointHeaderRenderer?.commentCount?.simpleText || 0}) <a class="comments-section-see-all" href="https://www.youtube.com/all_comments?v=${data.id}">${localizeString("global.seeall")}</a></h4>
<div class="comments-post-container clearfix">
<div class="comments-post-alert ${document.cosmicCat.Storage.get("accountInfo").exists ? "hid": ""}">
<a href="${document.cosmicCat.data.loginUrl}">Sign In</a> or <a href="https://www.youtube.com/signup">Sign Up</a><span class="comments-post-form-rollover-text"> now to post a comment!</span>
</div>
<form class="comments-post ${document.cosmicCat.Storage.get("accountInfo").exists ? "" : "hid"}" method="post">
<input type="text" id="session" hidden="">
<div class="yt-alert yt-alert-default yt-alert-error hid comments-post-message">
<div class="yt-alert-icon">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" class="icon master-sprite" alt="Alert icon">
</div>
<div class="yt-alert-buttons"></div><div class="yt-alert-content" role="alert"></div></div>
<a href="/profile" class="yt-user-photo comments-post-profile">
<span class="video-thumb ux-thumb yt-thumb-square-46">
<span class="yt-thumb-clip">
<span class="yt-thumb-clip-inner">
<img src="${accountInfo.pfp}" alt="${accountInfo.name}" width="46"><span class="vertical-align"></span>
</span>
</span>
</span>
</a>
<div class="comments-textarea-container" onclick="document.cosmicCat.Comments.Form.init();">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="" class="comments-textarea-tip">
<label class="comments-textarea-label" data-upsell="comment">${localizeString("watch.comments.respond")}</label>  <div class="yt-uix-form-input-fluid yt-grid-fluid ">
<textarea id="" class="yt-uix-form-textarea comments-textarea" onfocus="document.cosmicCat.Comments.Form.init();" data-upsell="comment" name="comment"></textarea>
</div>
</div>
<p class="comments-remaining">
${localizeString("watch.comments.charactersremain")}
</p>
<p class="comments-threshold-countdown hid">
<span class="comments-threshold-count"></span> ${localizeString("watch.comments.secondsremain")}
</p>
<p class="comments-post-buttons">
<button type="submit" class="comments-post yt-uix-button yt-uix-button-default" onclick=";return true;" role="button">
<span class="yt-uix-button-content">${localizeString("buttons.comments.post")} </span>
</button>
</p>
</form>
</div>
<ul class="comment-list all hid"></ul>
</div>
<div class="comments-section">
<div class="comments-pagination" data-Ajax-enabled="true">
<div class="yt-uix-pager" role="navigation">
<a id="next-btn" onclick="document.cosmicCat.Comments.next(this.getAttribute('data-token'), this.getAttribute('data-page'))" class="yt-uix-button yt-uix-sessionlink yt-uix-pager-button yt-uix-button-default hid" data-page="2"><span class="yt-uix-button-content">Next »</span></a>
</div>
</div>
</div>
<ul>
<li class="hid" id="parent-comment-loading">${localizeString("global.loading.comment")}</li>
</ul>
<div id="comments-loading">${localizeString("global.loading.main")}</div>
</div>
</div>`;
            },
            Comment: (data) => {
                return `<li class="comment yt-tile-default" data-author-id="${data.author.id}" data-id="${data.id}" data-score="-1">
<div class="comment-body">
<div class="content-container">
<div class="content">
<div class="comment-text" dir="ltr">
<p>${data.text}</p>
</div>
<p class="metadata">
<span class="author">
<a href="${data.author.url}" class="yt-uix-sessionlink yt-user-name" data-sessionlink="" dir="ltr">${data.author.name}</a>
</span>
<span class="time" dir="ltr">
<a dir="ltr" href="https://www.youtube.com/watch?v=${data.id}&lc=${data.id}">${data.time}</a>
</span>
${data.likes ? `<span dir="ltr" class="comments-rating-positive" title="">
${data.likes}<img class="comments-rating-thumbs-up" style="vertical-align: bottom !important;" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif">
</span>` : ""}
</p>
</div>
<div class="comment-actions">
<span class="yt-uix-button-group">
<button type="button" class="start comment-action-vote-up comment-action yt-uix-button yt-uix-button-default yt-uix-tooltip yt-uix-button-empty" onclick=";return false;" title="Vote Up" data-action="vote-up" data-tooltip-show-delay="300" role="button">
<span class="yt-uix-button-icon-wrapper">
<img class="yt-uix-button-icon yt-uix-button-icon-watch-comment-vote-up" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Vote Up">
<span class="yt-valign-trick"></span>
</span>
</button><button type="button" class="end comment-action-vote-down comment-action yt-uix-button yt-uix-button-default yt-uix-tooltip yt-uix-button-empty" onclick=";return false;" title="Vote Down" data-action="vote-down" data-tooltip-show-delay="300" role="button">
<span class="yt-uix-button-icon-wrapper">
<img class="yt-uix-button-icon yt-uix-button-icon-watch-comment-vote-down" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Vote Down">
<span class="yt-valign-trick"></span>
</span>
</button>
</span>
<span class="yt-uix-button-group">
<button type="button" class="start comment-action yt-uix-button yt-uix-button-default" onclick=";return false;" data-action="reply" role="button">
<span class="yt-uix-button-content">Reply </span>
</button><button type="button" class="end yt-uix-button yt-uix-button-default yt-uix-button-empty" onclick=";return false;" data-button-has-sibling-menu="true" role="button" aria-pressed="false" aria-expanded="false" aria-haspopup="true" aria-activedescendant="">
<img class="yt-uix-button-arrow" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="">
<div class=" yt-uix-button-menu yt-uix-button-menu-default" style="display: none;">
<ul>
<li class="comment-action-remove comment-action" data-action="remove">
<span class="yt-uix-button-menu-item">Remove</span>
</li>
<li class="comment-action" data-action="flag">
<span class="yt-uix-button-menu-item">Flag for spam</span>
</li>
<li class="comment-action-block comment-action" data-action="block">
<span class="yt-uix-button-menu-item">Block User</span>
</li>
<li class="comment-action-unblock comment-action" data-action="unblock">
<span class="yt-uix-button-menu-item">Unblock User</span>
</li>
</ul>
</div>
</button>
</span>
</div>
</div>
</div>
</li>`;
            },
        }
    },
    toggleElm: function (params) {
        const elm = document.querySelector(params);

        if (!params) return Error("toggleElm", params + "is not a valid HTMLElement");
        console.debug("toggleElm", "toggled", params);

        if (elm.classList.contains("hid")) {
            elm.classList.remove("hid");
        } else {
            elm.classList.add("hid");
        }
    },
    Utils: {
        deabreviateCnt: (e) => {
            if (e) {
                var t,
                    n,
                    a = 0;
                if (
                    ("M" == e.charAt(e.length - 1) && (a = 1),
                     "K" == e.charAt(e.length - 1) && (a = 2),
                     0 != a)
                )
                    1 == a && ((t = "000,000"), (n = "M")),
                        2 == a && ((t = "000"), (n = "K")),
                        (e =
                         -1 != e.indexOf(".")
                         ? e.split(".")[0] +
                         "," +
                         e.split(".")[1].split(n)[0].slice(0, 2) +
                         t.slice(e.split(".")[1].split(n)[0].length, t.length)
                         : e.substring(0, e.length - 1) + "," + t);
                return e;
            }

            return null;
        },
        parseNumber: (arg) => {
            try {
                return arg.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
            } catch {
                return arg;
            }
        },
        whatPage: (arg) => {
            let _a = window.location.pathname.split("/")[1];

            switch (true) {
                case /channel|user|^c{1}$/.test(_a):
                case /@/.test(_a):
                    _a = (arg == 0) ? "Channels" : document.cosmicCat.Utils.whatChannel();
            }

            return _a;
        },
        whatChannel: () => {
            return `channels${document.cosmicCat.Storage.get("channel_mode").value}`;
        },
        convertXHRtoJSON: (data) => {
            return data.then(da => {
                try {
                    return JSON.parse(da.split("var ytInitialData = ")[1].split(";</script>")[0]);
                } catch {
                    return {error: 404};
                }
            });
        },
        getCookie: (cname) => {
            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for(let i = 0; i <ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        },
        setCookie: (cname, cvalue, exdays) => {
            const d = new Date();
            d.setTime(d.getTime() + (exdays*24*60*60*1000));
            let expires = "expires="+ d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        },
        browseTabs: {
            find: (data, param) => {
                try {
                    return data.contents.twoColumnBrowseResultsRenderer.tabs.find(b =>
                       b.tabRenderer.endpoint.commandMetadata.webCommandMetadata.url.split("/")[3] === param
                    );
                } catch {
                    try {
                        return data.contents.twoColumnBrowseResultsRenderer.tabs.find(b =>
                           b.tabRenderer.endpoint.commandMetadata.webCommandMetadata.url.split("/")[2] === param
                        );
                    } catch {
                        return {};
                    }
                }
            },
            content: (data) => {
                try {
                    return data.tabRenderer.content?.richGridRenderer?.contents || data.tabRenderer.content?.sectionListRenderer?.contents;
                } catch {
                    return {};
                }
            }
        },
        addStyle: (a) => {
            try {
                var c;
                try {
                    c=a.split("/www")[1].split("-").slice(0, -1).join("-")
                } catch {}
                var b = document.createElement("link");
                b.setAttribute("rel", "stylesheet");
                b.setAttribute("href", a);
                b.setAttribute("id", `www${c}-css`);
                document.head.append(b);
            } catch(err) {
                console.error(`[addStyle] Function must have an argument!:\n`, err);
            }
        },
        escapeHtml: (unsafe) => {
            return unsafe
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
        },
        waitForElm: (e) => {
            return new Promise((t) => {
                if (document.querySelector(e)) return t(document.querySelector(e));
                const n = new MutationObserver((s) => {
                    document.querySelector(e) &&
                        (t(document.querySelector(e)), n.disconnect());
                });
                n.observe(document, {
                    childList: !0,
                    subtree: !0
                });
            });
        },
        waitForElm2: () => {
            return new Promise(resolve => {
                if (document.querySelector("body").innerHTML.match(/ytInitialData/)) {
                    return resolve(document.querySelector("body"));
                }

                const observer = new MutationObserver(mutations => {
                    if (document.querySelector("body").innerHTML.match(/ytInitialData/)) {
                        try {
                            let a = JSON.parse(document.body.innerHTML.substr(parseInt(document.body.innerHTML.search("var ytInitialData = ") + 20)).substr(0, parseInt(document.body.innerHTML.substr(parseInt(document.body.innerHTML.search("var ytInitialData = ") + 20)).search("</script>") - 1)));
                            (a.contents) && resolve(a) && observer.disconnect();
                        } catch {}
                    }
                });

                observer.observe(document.body, {
                    childList: true,
                    subtree: true
                });
            });
        },
        listCategories: (params) => {
                var href = "";

                switch (true) {
                    case /trending/.test(params):
                        href = "/feed/trending";
                        break;
                    case /popular/.test(params):
                        href = "/channel/UCF0pVplsI8R5kcAqgtoRqoA";
                        break;
                    case /music/.test(params):
                        href = "/channel/UC-9-kyTW8ZkZNDHQJ6FgpwQ";
                        break;
                    case /live/.test(params):
                        href = "/channel/UC4R8DWoMoI7CAwX8_LjQHig";
                        break;
                    case /gadgets|gaming/.test(params):
                        href = "/gaming";
                        break;
                    case /news/.test(params):
                        href = "/channel/UCYfdidRxbB8Qhf0Nx7ioOYw";
                        break;
                    case /sports/.test(params):
                        href = "/channel/UCEgdi0XIXXZ-qJOFPf4JSKw";
                        break;
                    case /education/.test(params):
                        href = "/channel/UCtFRv9O2AHqOZjjynzrv-xg";
                        break;
                    case /howto/.test(params):
                        href = "/channel/UCrpQ4p1Ql_hG8rKXIKM1MOQ";
                }
                return {
                    name: localizeString("guide." + params),
                    href: href,
                    class: params
                };
            },
        convertDescription: (a) => {
            // WIP
            if (!a.commandRuns) {
                return {
                    "runs": [
                        {
                            "text": a.content
                        }
                    ]
                };
            }

            var runs = [],
                start = 0;

            for (const run in a.commandRuns) {
                var beforeText;// ???????? a.content.substr(a.content, start, run.startIndex - start);

                if(beforeText) {
                    runs[run] = {
                        text: beforeText
                    };
                }

                var text = "",
                    endpoint; // Look into it - a.commandRuns[run]?.onTop?.innertubeCommand;

                runs[run] = {
                    "text": text,
                    "navigationEndpoint": endpoint
                };

                start = a.commandRuns[run].startIndex + run.length;
            }

            return {
                "runs": runs
            };
        },
        Sort: {
            channelData: (data) => {
                if (!data) return {};

                let _description = data.descriptionSnippet?.runs || [];

                let description = "";
                for (const snippet in _description) {
                    description += _description[snippet].text;
                }

                return {
                    id: data.channelId || data.subscribeButton?.subscribeButtonRenderer?.channelId,
                    name: data.title?.simpleText || data.title,
                    url: data.canonicalChannelUrl || data.navigationEndpoint?.browseEndpoint?.canonicalBaseUrl,
                    avatar: data.avatar?.thumbnails?.[0]?.url || data.thumbnail?.thumbnails?.[0]?.url || data.boxArt?.thumbnails?.[0]?.url,
                    links: data.primaryLinks,
                    bannerBg: data.tvBanner?.thumbnails?.[4]?.url,
                    subscriberCount: document.cosmicCat.Utils.deabreviateCnt(data.subscriberCountText?.simpleText?.split(" ")?.[0] || data.subtitle?.simpleText?.split(" ")?.[0] || "0"),
                    videos: data.videoCountText?.runs?.[1] && (data.videoCountText?.runs?.[0].text + data.videoCountText?.runs?.[1].text),
                    fields: {
                        views: document.cosmicCat.Utils.deabreviateCnt(data.viewCountText?.simpleText?.split(" ")?.[0]) || "0",
                        joined: data.joinedDateText?.runs?.[1]?.text,
                        country: data.country?.simpleText,
                        description: (data.description?.simpleText || description).replace(/(?:\r\n|\r|\n)/g, "<br/>")
                    }
                };
            },
            videoData: (da) => {
                if (!da) return {};

                let _description = da.detailedMetadataSnippets?.[0]?.snippetText?.runs || da.descriptionSnippet?.runs || da.description?.runs || da.videoDetails?.shortDescription || [];

                if(da.attributedDescription) _description = document.cosmicCat.Utils.convertDescription(da.attributedDescription)?.runs;

                let description = "";
                for (const snippet in _description) {
                    if (_description[snippet].navigationEndpoint) {
                        let href = _description[snippet].navigationEndpoint?.commandMetadata?.webCommandMetadata?.url;
                        description += `<a href="${href}">${_description[snippet].text}</a>`;
                    } else {
                        description += _description[snippet].text;
                    }
                }

                description = description.replace(/(?:\r\n|\r|\n)/g, '<br/>');

                var thumbnail = da.thumbnail?.thumbnails?.[0]?.url;

                if(3==(new Date).getMonth() && 1==(new Date).getDate()) {
                    var pool = "https://pbs.twimg.com/media/FFY5UtZXIAUxeYa?format=jpg&name=4096x4096 https://d.furaffinity.net/art/cathythecactus/1650670817/1650670817.cathythecactus_untitled147_20220422203244.jpg https://d.furaffinity.net/art/chipchell/1637725170/1628259771.chipchell_morbidlyobeselesbian.png https://d.furaffinity.net/art/sxfpantera/1649809391/1649809389.sxfpantera_pyrocynical_cs_2_part_apr_part_2_low_res.png https://d.furaffinity.net/art/garowo/1660377831/1660377831.garowo_pyrocynical.jpg https://d.furaffinity.net/art/slimescumbag/1663530187/1663530187.slimescumbag_fc7xsokakaamcwr.jpg https://preview.redd.it/jswmaiz157a81.jpg?width=640&crop=smart&auto=webp&s=8cda3b2e5429704b179f67ab3ff97a68d7387e2a https://preview.redd.it/morbidly-obese-furry-pyro-v0-yl3p4e3g5xw81.jpg?width=640&crop=smart&auto=webp&s=1b7a2c50b1cf661a2e4f068f8d29634e666672aa https://i.ytimg.com/vi/OJhbbY_R3Yo/maxresdefault.jpg".split(" ");
                    thumbnail = pool[Math.floor(Math.random()*pool.length)]
                };

                return {
                    owner: {
                        name: da.owner?.videoOwnerRenderer?.title?.runs?.[0]?.text || da.bylineText?.runs?.[0]?.text || da.shortBylineText?.runs?.[0]?.text || da.ownerText?.runs?.[0]?.text || da.videoDetails?.author || da.owner?.videoOwnerRenderer?.title?.runs?.[0]?.text,
                        url: da.owner?.videoOwnerRenderer?.navigationEndpoint?.browseEndpoint?.canonicalBaseUrl || da.bylineText?.runs?.[0]?.navigationEndpoint?.browseEndpoint?.canonicalBaseUrl || da.shortBylineText?.runs?.[0]?.navigationEndpoint?.browseEndpoint?.canonicalBaseUrl || da.longBylineText?.runs?.[0]?.navigationEndpoint?.browseEndpoint?.canonicalBaseUrl,
                        id: da.videoDetails?.channelId || da.owner?.videoOwnerRenderer?.navigationEndpoint?.browseEndpoint?.browseId || da.shortBylineText?.runs?.[0]?.navigationEndpoint?.browseEndpoint?.browseId,
                        icon : da.channelThumbnailSupportedRenderers?.channelThumbnailWithLinkRenderer?.thumbnail?.thumbnails?.[0]?.url
                    },
                    time: da.thumbnailOverlays?.find(c => c.thumbnailOverlayTimeStatusRenderer)?.thumbnailOverlayTimeStatusRenderer.text.simpleText || da.thumbnailOverlays?.find(c => c.thumbnailOverlayTimeStatusRenderer)?.thumbnailOverlayTimeStatusRenderer?.text?.runs?.[0]?.text || da.lengthText?.simpleText || "LIVE",
                    views: da.viewCount?.videoViewCountRenderer?.viewCount?.simpleText || da.viewCountText?.simpleText || da.viewCountText?.runs?.[0]?.text + da.viewCountText?.runs?.[1]?.text || da.videoDetails?.viewCount || "",
                    title: da.title?.simpleText || da.title?.runs?.[0]?.text || da.videoDetails?.title || "Fallback title",
                    id: da.videoDetails?.videoId || da.videoId,
                    description: description,
                    upload: da.dateText?.simpleText || da.publishedTimeText?.simpleText|| da.publishedTimeText?.runs?.[0]?.text || da.microformat?.playerMicroformatRenderer?.publishDate || "",
                    badges: da.badges || [],
                    thumbnail: thumbnail,
                    tags: da.videoDetails?.keywords || [],
                    category: (window.location.pathname.split("/")[1] == "watch") ? ytInitialPlayerResponse?.microformat?.playerMicroformatRenderer?.category : ""
                };
            },
            playlistData: (data) => {
                if (!data) return {};

                let views = data.viewCountText?.simpleText?.split(" ")?.[0];

                return {
                    id: data.playlistId,
                    title: data.title?.runs?.[0]?.text || data.title?.simpleText || data.title,
                    description: data.descriptionText?.simpleText || data.subtitle?.simpleText || "",
                    currentIndex: data.currentIndex,
                    videos: {
                        totalNumber: data.videoCountShortText?.simpleText || data.totalVideos || data.videoCount,
                        text: data.videoCountText?.runs?.[1] ? data.videoCountText.runs[0].text + data.videoCountText.runs[1].text : data.videoCountText?.runs?.[0]?.text || data.numVideosText?.runs?.[0]?.text,
                        runs: data.videoCountText?.runs,
                        videos: data.contents
                    },
                    views: document.cosmicCat.Utils.deabreviateCnt(parseInt(views?.replace(/,/g, "")) ? views : "0"),
                    owner: {
                        name: data.ownerText?.runs?.[0]?.text || data.longBylineText?.runs?.[0]?.text,
                        url: data.ownerText?.runs?.[0]?.navigationEndpoint?.browseEndpoint?.canonicalBaseUrl || data.longBylineText?.runs?.[0]?.navigationEndpoint?.browseEndpoint?.canonicalBaseUrl,
                        id: data.ownerText?.runs?.[0]?.navigationEndpoint?.browseEndpoint?.browseId || data.longBylineText?.runs?.[0]?.navigationEndpoint?.browseEndpoint?.browseId
                    },
                    updated: data.publishedTimeText?.simpleText,
                    thumbnail: data.thumbnail?.thumbnails?.[0]?.url || data.thumbnailRenderer?.playlistVideoThumbnailRenderer?.thumbnail?.thumbnails?.[0]?.url,
                    rawThumbnail: data.thumbnail || {thumbnails: data.thumbnailRenderer?.playlistVideoThumbnailRenderer?.thumbnail},
                    sidethumbs: data.sidebarThumbnails || data.thumbnails || [{thumbnails: (data.thumbnail?.thumbnails || data.thumbnail)}],
                    url: data.navigationEndpoint?.commandMetadata?.webCommandMetadata?.url || data.endpoint?.commandMetadata?.webCommandMetadata?.url
                };
            },
            feedData: (data) => {
                if (!data) return {};

                let _description = data.contentText?.runs || [];

                let description = "";
                for (const snippet in _description) {
                    description += _description[snippet].text;
                }

                return {
                    owner: {
                        name: data.authorText?.runs?.[0]?.text,
                        url: data.authorText?.runs?.[0]?.navigationEndpoint?.browseEndpoint?.canonicalBaseUrl,
                        id: "",
                        icon: data.authorThumbnail?.thumbnails?.[0].url
                    },
                    id: data.postId,
                    upload: data.publishedTimeText?.runs?.[0]?.text,
                    description: description
                };
            },
            homeFeedData: (data) => {
                return {
                    author: data.title.simpleText,
                    avatar: data.thumbnail.thumbnails[0].url,
                    video: document.cosmicCat.Utils.Sort.videoData(data.content.expandedShelfContentsRenderer.items[0].videoRenderer)
                };
            },
            commentData: (data) => {
                if(!data) return {};

                var RAW_COUNT = "";//da.voteCount ? da.voteCount.accessibility ? (da.voteCount.accessibility.accessibilityData ? parseInt(da.voteCount.accessibility.accessibilityData.label.replace(/[^0-9.]/g, '')) : '') : (da.voteCount.accessibility ? parseInt(da.voteCount.accessibility.label.replace(/[^0-9.]/g, '')) : '') : '';
                //var PRESENTABLE_COUNT = (RAW_COUNT + (liketoggled ? -1 : 0)) ? (RAW_COUNT + (liketoggled ? -1 : 0)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '';

                let _text = data.contentText.runs;

                let text = "";
                for (const snippet in _text) {
                    if (_text[snippet].navigationEndpoint) {
                        let href = _text[snippet].navigationEndpoint?.commandMetadata?.webCommandMetadata?.url;
                        text += `<a href="${href}">${document.cosmicCat.Utils.escapeHtml(_text[snippet].text)}</a>`;
                    } else {
                        text += document.cosmicCat.Utils.escapeHtml(_text[snippet].text);
                    }
                }

                text = text.replace(/(?:\r\n|\r|\n)/g, '<br/>');

                return {
                    author: {
                        name: data.authorText.simpleText,
                        id: data.authorEndpoint.browseEndpoint.browseId,
                        url: data.authorEndpoint.browseEndpoint.canonicalBaseUrl
                    },
                    id: data.commentId,
                    text: text,
                    time: data.publishedTimeText.runs[0].text,
                    likes: data.voteCount ? data.voteCount.accessibility ? (data.voteCount.accessibility.accessibilityData ? parseInt(data.voteCount.accessibility.accessibilityData.label.replace(/[^0-9.]/g, '')) : '') : (data.voteCount.accessibility ? parseInt(data.voteCount.accessibility.label.replace(/[^0-9.]/g, '')) : '') : ''
                };
            }
        }
    },
    Pagination: {
        sortDataIntoArray: function (api) {
            let obj = [];

            try {
                obj = api?.[0].appendContinuationItemsAction.continuationItems;
            } catch {
                obj = api?.[1]?.reloadContinuationItemsCommand.continuationItems;
            }

            return obj;
        },
        nextNumberButton: function(continuation, number, type) {
            number = Number(number);
            commCount = number;
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
    },
    Comments: {
        init: async function (continuation) {
            if (!continuation) return document.cosmicCat.toggleElm("#comments-view");

            let api = await document.cosmicCat.Ajax.post("/youtubei/v1/next", `continuation: "${continuation}"`);
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
            let sortedCommentsArray = document.cosmicCat.Pagination.sortDataIntoArray(api.onResponseReceivedEndpoints);

            if (!sortedCommentsArray) return this.abort();

            sortedCommentsArray = sortedCommentsArray.splice(0, 2);

            const comments = this.sortComments(sortedCommentsArray, "top");

            document.querySelector(".comment-list.top").innerHTML = comments.result;

            document.cosmicCat.toggleElm(".comment-list.top");
            await document.cosmicCat.Comments.load(sortMenuTokens.newest);

        },
        load: async function (continuation) {
            if (!continuation) return document.cosmicCat.toggleElm("#next-btn");

            let api = await document.cosmicCat.Ajax.post("/youtubei/v1/next", `continuation: "${continuation}"`);
            if (!api) return this.abort();

            let sortedCommentsArray = document.cosmicCat.Pagination.sortDataIntoArray(api.onResponseReceivedEndpoints);

            const comments = this.sortComments(sortedCommentsArray, "all");

            document.cosmicCat.Pagination.nextNumberButton(continuation, 1, "Comments");

            document.querySelector(".comment-list.all").innerHTML = comments.result;

            document.cosmicCat.toggleElm(".comment-list.all");
            document.cosmicCat.toggleElm("#comments-loading");
        },
        abort: function() {
            document.cosmicCat.toggleElm("#comments-loading");
        },
        sortComments: function (params, am) {
            let result = {result: "", con: ""};
            for (let i = 0; i < params.length; i++) {
                if (params[i].commentThreadRenderer) {
                    if (am == "top" || params[i].commentThreadRenderer.renderingPriority !== "RENDERING_PRIORITY_PINNED_COMMENT"){
                        result.result += document.cosmicCat.Template.Comments.Comment(document.cosmicCat.Utils.Sort.commentData(params[i].commentThreadRenderer.comment.commentRenderer));
                    }
                }
                if (params[i].continuationItemRenderer && am == "all") {
                    const aaaa = document.querySelector("#next-btn");
                    if (aaaa.classList.contains("hid")) {
                        document.cosmicCat.toggleElm("#next-btn");
                    }
                    aaaa.setAttribute("data-token", params[i].continuationItemRenderer.continuationEndpoint.continuationCommand.token);
                    result.con += `${params[i].continuationItemRenderer.continuationEndpoint.continuationCommand.token}`;
                }
            }

            return result;
        },
        sortMenuTokens: function (obj) {
            return {
                top: obj.onResponseReceivedEndpoints[0].reloadContinuationItemsCommand.continuationItems[0].commentsHeaderRenderer.sortMenu.sortFilterSubMenuRenderer.subMenuItems[0].serviceEndpoint.continuationCommand.token,
                newest: obj.onResponseReceivedEndpoints[0].reloadContinuationItemsCommand.continuationItems[0].commentsHeaderRenderer.sortMenu.sortFilterSubMenuRenderer.subMenuItems[1].serviceEndpoint.continuationCommand.token
            };
        },
        next: async function (continuation, number) {
            if (!continuation) return document.cosmicCat.toggleElm("#next-btn");
            document.cosmicCat.toggleElm("#comments-loading");

            let api = await document.cosmicCat.Ajax.post("/youtubei/v1/next", `continuation: "${continuation}"`);
            if (!api) return this.abort();

            let sortedCommentsArray = document.cosmicCat.Pagination.sortDataIntoArray(api.onResponseReceivedEndpoints);

            const comments = this.sortComments(sortedCommentsArray, "all");

            document.cosmicCat.Pagination.nextNumberButton(continuation, number, "Comments");

            document.querySelector(".comment-list.all").innerHTML = comments.result;

            document.cosmicCat.toggleElm("#comments-loading");
        },
        Form: {
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
    },
    Search: {
        abort: function() {
            document.cosmicCat.toggleElm("#comments-loading");
        },
        sortResults: function (params, am) {
            let result = {result: "", con: ""};
            for (let i = 0; i < params[0].itemSectionRenderer.contents.length; i++) {
                if (params[0].itemSectionRenderer.contents[i].videoRenderer) {
                    let c = document.cosmicCat.Utils.Sort.videoData(params[0].itemSectionRenderer.contents[i].videoRenderer);
                    result.result += document.cosmicCat.Template.Search.videoRender(c);
                }
            }

            const aaaa = document.querySelector("#next-btn");
            if (aaaa.classList.contains("hid")) {
                document.cosmicCat.toggleElm("#next-btn");
            }
            aaaa.setAttribute("data-token", params[1].continuationItemRenderer.continuationEndpoint.continuationCommand.token);
            result.con += `${params[1].continuationItemRenderer.continuationEndpoint.continuationCommand.token}`;

            return result;
        },
        next: async function (continuation, number) {
            if (!continuation) return document.cosmicCat.toggleElm("#next-btn");
            //document.cosmicCat.toggleElm("#loading");

            let api = await document.cosmicCat.Ajax.post("/youtubei/v1/search", `continuation: "${continuation}"`);
            if (!api) return this.abort();

            let sortedResultsArray = document.cosmicCat.Pagination.sortDataIntoArray(api.onResponseReceivedCommands);

            const comments = this.sortResults(sortedResultsArray);

            document.cosmicCat.Pagination.nextNumberButton(continuation, number, "Search");

            document.querySelector("#search-results").innerHTML = comments.result;
        }
    },
    Channels: {
        Channels3: {
            Pagination: {
                load: async function () {
                    document.getElementsByClassName("channels-browse-gutter-padding")[2].innerHTML = document.cosmicCat.Template.Channel.Channels3.primaryPane.browseVideos.Navigation();

                    try {
                        document.querySelector("#next-btn").setAttribute("data-token", document.cosmicCat.Utils.browseTabs.content(document.cosmicCat.Utils.browseTabs.find(ytInitialData, "videos")).find(a => a.continuationItemRenderer).continuationItemRenderer.continuationEndpoint.continuationCommand.token);
                    } catch(e) {}
                },
                next: async function (continuation, number) {
                    if (!continuation) return document.cosmicCat.toggleElm("#next-btn");

                    let api = await document.cosmicCat.Ajax.post("/youtubei/v1/browse", `continuation: "${continuation}"`);
                    if (!api) return this.abort();

                    let sortedResultsArray = document.cosmicCat.Pagination.sortDataIntoArray(api.onResponseReceivedActions);

                    const comments = this.sortResults(sortedResultsArray);

                    document.cosmicCat.Pagination.nextNumberButton(continuation, number, "Channels.Channels3.Pagination");

                    document.querySelector(".channels-browse-content-grid").innerHTML = comments.result;
                },
                sortResults: function (params, am) {
                    let result = {result: "", con: ""};
                    for (let i = 0; i < params.length; i++) {
                        if (params[i].richItemRenderer?.content?.videoRenderer) {
                            let c = document.cosmicCat.Utils.Sort.videoData(params[i].richItemRenderer.content.videoRenderer);
                            result.result += document.cosmicCat.Template.Channel.Channels3.primaryPane.browseVideos.listItem.videos(c);
                        }
                    }

                    const aaaa = document.querySelector("#next-btn");
                    if (aaaa.classList.contains("hid")) {
                        document.cosmicCat.toggleElm("#next-btn");
                    }
                    aaaa.setAttribute("data-token", params.find(a => a.continuationItemRenderer).continuationItemRenderer.continuationEndpoint.continuationCommand.token);
                    result.con += `${params.find(a => a.continuationItemRenderer).continuationItemRenderer.continuationEndpoint.continuationCommand.token}`;

                    return result;
                }
            }
        },
        Channels2: {},
        playnav: {
            selectTab: async (a, b) => {
                let channel = window.location.pathname.split("/")[2];

                document.querySelector("#playnav-play-loading").style.display = "block";
                document.querySelector(".navbar-tab-selected").classList.remove("navbar-tab-selected");
                b.classList.add("navbar-tab-selected");

                window.location.hash = "#p/" + (a == "playlists" ? "p" : "u");

                let data = await document.cosmicCat.Ajax.Fetch(`https://www.youtube.com${window.location.pathname.split("/").slice(0, -1).join("/")}/${a}`, document.cosmicCat.Channels._Data[a.charAt(0).toUpperCase() + a.slice(1)]);
                document.cosmicCat.pageRenderer.set("#playnav-play-content", document.cosmicCat.Template.Channel.Channels2.playlistNavigator.Content.PlayPanel.Holder.Main());

                for (let i = 0; i < data.length; i++) {
                    document.cosmicCat.pageRenderer.add(".scrollbox-page", document.cosmicCat.Template.Channel.Channels2.playlistNavigator.Content.PlayPanel.Holder[a](data[i]));
                }

                document.querySelector("#playnav-play-loading").style.display = "none";
            }
        },
        isChannelsPage: () => {
            return (window.location.href.match(/channel|user|^c{1}$/i) || document.cosmicCat.Channels.isUsertag());
        },
        checkIfSubscribed: () => {
            try {
                if(document.cosmicCat.Channels.isChannelsPage()) {
                    return ytInitialData.header.c4TabbedHeaderRenderer?.subscribeButton?.subscribeButtonRenderer?.subscribed || ytInitialData.header.carouselHeaderRenderer?.contents?.find(a => a.topicChannelDetailsRenderer)?.topicChannelDetailsRenderer?.subscribeButton?.subscribeButtonRenderer?.subscribed || false;
                }
                if(window.location.pathname.split("/")[1].match(/watch/i)) {
                    return ytInitialData.contents.twoColumnWatchNextResults.results?.results?.contents?.find(a => a.videoSecondaryInfoRenderer)?.videoSecondaryInfoRenderer?.subscribeButton?.subscribeButtonRenderer?.subscribed;
                }
            } catch(err) {
                console.error("[Channels] Something went wrong with executing \"checkIfSubscribed()\":\n", err);
                return false;
            }
        },
        toggleSubscribe: () => {
            try {
                if(document.cosmicCat.Channels.isChannelsPage()) {
                    try {
                        ytInitialData.header.c4TabbedHeaderRenderer.subscribeButton.subscribeButtonRenderer.subscribed = ytInitialData.header.c4TabbedHeaderRenderer.subscribeButton.subscribeButtonRenderer.subscribed ? false : true;
                    } catch {
                        ytInitialData.header.carouselHeaderRenderer.contents.find(a => a.topicChannelDetailsRenderer).topicChannelDetailsRenderer.subscribeButton.subscribeButtonRenderer.subscribed = ytInitialData.header.carouselHeaderRenderer.contents.find(a => a.topicChannelDetailsRenderer).topicChannelDetailsRenderer.subscribeButton.subscribeButtonRenderer.subscribed ? false : true;
                    }
                }
                if(window.location.pathname.split("/")[1].match(/watch/i)) {
                    ytInitialData.contents.twoColumnWatchNextResults.results.results.contents.find(a => a.videoSecondaryInfoRenderer).videoSecondaryInfoRenderer.subscribeButton.subscribeButtonRenderer.subscribed = ytInitialData.contents.twoColumnWatchNextResults.results.results.contents.find(a => a.videoSecondaryInfoRenderer).videoSecondaryInfoRenderer.subscribeButton.subscribeButtonRenderer.subscribed ? false : true;
                }
            } catch(err) {
                console.error("[Channels] Something went wrong with executing \"toggleSubscribe()\":\n", err);
            }
        },
        isUsertag: () => {
            return !!window.location.href.match(/@/g);
        },
        getCurrentChannelTab: () => {
            let mode = document.cosmicCat.Storage.get("channel_mode").value;
            switch (mode) {
                case "1":
                case "3":
                    mode = window.location.pathname.split("/")[document.cosmicCat.Channels.isUsertag() ? 2 : 3];
                    break;
                case "2":
                    mode = window.location.hash.length > 1 && window.location.hash.slice(1).split("/")[1] == "p" ? "playlists" : "videos" || window.location.pathname.split("/")[3];
            }
            return mode;
        },
        getNaviHash: () => { return (document.cosmicCat.Channels.getCurrentChannelTab() == "playlists" ? "p" : "u"); },
        isCurrentChannelTab: (params) => {
            return (document.cosmicCat.Channels.getCurrentChannelTab() == params);
        },
        customTags: (data) => {
            if (!data) return [];
            let tags = [];
            let TAGS = data.matchAll(/\[\+\w\+="(\d+|.+)"]/g);
            data = data.replace(/\[\+\w\+="(\d+|.+)"]/g, "");
            for (const tag of TAGS) {
                if(tag[0].split(/\+/g)[1] == "a" && tag[0].match(/"\d+"/g) && tag[0].split(/"/g)[1] < 101) {
                    tags.push({name: "Age", value: tag[0].split(/"/g)[1]});
                }
                if(tag[0].split(/\+/g)[1] == "o" && tag[0].match(/"\w+/g)) {
                    tags.push({name: "Occupation", value: tag[0].split(/"/g)[1]});
                }
            }

            return tags;
        },
        isOwner: (data) => {
            try {
                return (ytInitialData?.header?.c4TabbedHeaderRenderer?.editChannelButtons) ? true : false;
            } catch(err) {
                console.error("[Channels] Something went wrong with executing \"isOwner()\":\n", err);
                return false;
            }
        },
        load2Modules: (data) => {
            document.cosmicCat.pageRenderer.add("#main-channel-left", document.cosmicCat.Template.Channel.Channels2.moduleContainer.profile(data));
            document.cosmicCat.pageRenderer.add("#main-channel-left", document.cosmicCat.Template.Channel.Channels2.moduleContainer.userInfo(data));
        },
        Local: {
            Header: () => {
                try {
                    return document.cosmicCat.Utils.Sort.channelData(ytInitialData.header?.c4TabbedHeaderRenderer || ytInitialData.header?.carouselHeaderRenderer?.contents?.[0]?.topicChannelDetailsRenderer || ytInitialData.header?.carouselHeaderRenderer?.contents?.[1]?.topicChannelDetailsRenderer || ytInitialData.header?.interactiveTabbedHeaderRenderer);
                } catch(err) {
                    console.error("[Channels] Something went wrong with sorting channel data:\n", err);
                }
            },
            Videos: () => {
                if (document.cosmicCat.Channels.getCurrentChannelTab() !== "videos") return false;

                return document.cosmicCat.Channels._Data.Videos(ytInitialData);
            },
            Playlists: () => {
                if (document.cosmicCat.Channels.getCurrentChannelTab() !== "playlists") return false;

                return document.cosmicCat.Channels._Data.Playlists(ytInitialData);
            },
            Community: () => {
                if (document.cosmicCat.Channels.getCurrentChannelTab() !== "community") return [];

                return document.cosmicCat.Channels._Data.Community(ytInitialData);
            }
        },
        _Data: {
            Videos: (data) => {
                let result = [];

                try {
                    let tab = document.cosmicCat.Utils.browseTabs.find(data, "videos");
                    let contents = document.cosmicCat.Utils.browseTabs.content(tab);

                    if (!contents) throw Error();

                    for (let i = 0; i < contents.length; i++) {
                        if (!contents[i].continuationItemRenderer) { // will be kept for if YT reverts change
                            result[i] = document.cosmicCat.Utils.Sort.videoData(contents[i].richItemRenderer.content.videoRenderer);
                        }
                    }
                } catch(err) {
                    console.error("[Channels] Something went wrong with sorting channel videos:\n", err);
                }

                return result;
            },
            Playlists: (data) => {
                let result = [];

                try {
                    let tab = document.cosmicCat.Utils.browseTabs.find(data, "playlists");
                    let content = document.cosmicCat.Utils.browseTabs.content(tab),
                        contents = [];

                    for (const i in content) {
                        try {
                            contents.push(content[i].shelfRenderer.content.horizontalListRenderer.items);
                        } catch {
                            try {
                                contents.push(content[i].gridRenderer.items);
                            } catch {
                                try {
                                    contents.push(content[i].itemSectionRenderer.contents[0].shelfRenderer.content.horizontalListRenderer.items);
                                } catch {
                                    try {
                                        contents.push(content[i].itemSectionRenderer.contents[0].gridRenderer.items);
                                    } catch {
                                        try {
                                            contents.push(content[i].itemSectionRenderer.contents[0].shelfRenderer.content.expandedShelfContentsRenderer.items);
                                        } catch {
                                            throw Error("No playlists were found.");
                                        }
                                    }
                                }
                            }
                        }
                    };

                    if (!contents) throw Error();

                    try {
                        contents = [...contents[0], ...contents[1]];
                    } catch {
                        contents = [...contents[0]];
                    }

                    for (let i = 0; i < contents.length; i++) {
                        if (!contents[i].continuationItemRenderer) {
                            result[i] = document.cosmicCat.Utils.Sort.playlistData(contents[i].gridPlaylistRenderer || contents[i].playlistRenderer);
                        }
                    }
                } catch(err) {
                    console.error("[Channels] Something went wrong with sorting channel playlists:\n", err);
                }

                return result;
            },
            Community: (data) => {
                let result = [];

                try {
                    let tab = document.cosmicCat.Utils.browseTabs.find(data, "community");
                    let contents = document.cosmicCat.Utils.browseTabs.content(tab)[0].itemSectionRenderer.contents;

                    if (!contents) throw Error();

                    for (let i = 0; i < contents.length; i++) {
                        if (!contents[i].continuationItemRenderer) {
                            result[i] = document.cosmicCat.Utils.Sort.feedData(contents[i].backstagePostThreadRenderer.post.backstagePostRenderer);
                        }
                    }
                } catch(err) {
                    console.error("[Channels] Something went wrong with sorting channel feeds:\n", err);
                }

                return result;
            },
            Info: (data) => {
                let result = {};

                try {
                    let tab = document.cosmicCat.Utils.browseTabs.find(data, "about");
                    let contents = document.cosmicCat.Utils.browseTabs.content(tab)[0].itemSectionRenderer.contents[0].channelAboutFullMetadataRenderer;

                    if (!contents) throw Error();

                    result = document.cosmicCat.Utils.Sort.channelData(contents);

                    try {
                        result.subs = document.cosmicCat.Utils.deabreviateCnt(data.header.c4TabbedHeaderRenderer?.subscriberCountText?.simpleText?.split(" ")?.[0] || data.subs?.simpleText?.split(" ")?.[0] || "0");
                    } catch(err) {
                        console.error("[Channels] Something went wrong with sorting subscriber count:\n", err);
                    }
                } catch(err) {
                    console.error("[Channels] Something went wrong with sorting channel info:\n", err);
                }

                return result;
            }
        }
    },
    Playlists: {
        Local: {
            Header: () => {
                let result = [];

                try {
                    return document.cosmicCat.Utils.Sort.playlistData(ytInitialData.header.playlistHeaderRenderer);
                } catch(err) {
                    console.error("[Playlists] Something went wrong with sorting playlist data:\n", err);
                }

                return result;
            },
            Videos: () => {
                let result = [];

                try {
                    let contents = ytInitialData.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].playlistVideoListRenderer.contents;

                    for (let i = 0; i < contents.length; i++) {
                        if (!contents[i].continuationItemRenderer) {
                            result[i] = document.cosmicCat.Utils.Sort.videoData(contents[i].playlistVideoRenderer);
                        }
                    }
                } catch(err) {
                    console.error("[Playlists] Something went wrong with sorting video data:\n", err);
                }

                return result;
            }
        }
    },
    Home: {
        Feed: {
            load: (params) => {
                document.querySelector(".selected").classList.remove("selected");
                params.classList.add("selected");
                document.querySelector(".feed-header-info").innerText = params.dataset.feedDisplay;

                document.querySelector("#feed-error:not(.hid)")?.classList?.add("hid");
                document.querySelector(".feed-header:not(.hid)")?.classList?.add("hid");
                document.querySelector("#feed-main-youtube:not(.hid)")?.classList?.add("hid");

                document.querySelector(".context-data-container").innerHTML = "";

                document.cosmicCat.toggleElm("#feed-loading-template");

                document.cosmicCat.Ajax.Fetch(params.dataset.feedUrl, document.cosmicCat.Home.Feed.newFeed);
            },
            newFeed: async (ytData) => {
                console.debug(ytData);
                try {
                    let tabs = ytData.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content;
                    let contents = tabs.richGridRenderer || tabs.sectionListRenderer;

                    try {
                        for (let i = 0; i < contents.contents.length; i++) {
                            if (!contents.contents[i].continuationItemRenderer) {
                                var thisItem = "";

                                if (contents.contents[i].richItemRenderer && contents.contents[i].richItemRenderer.content.videoRenderer) {
                                    thisItem = document.cosmicCat.Template.Homepage.Feed.Main(
                                        document.cosmicCat.Utils.Sort.videoData(
                                            contents.contents[i].richItemRenderer.content.videoRenderer
                                        )
                                    );
                                }

                                if (contents.contents[i].itemSectionRenderer && contents.contents[i].itemSectionRenderer.contents[0].shelfRenderer.content.expandedShelfContentsRenderer.items[0].videoRenderer) {
                                    thisItem = document.cosmicCat.Template.Homepage.Feed.Main(
                                        document.cosmicCat.Utils.Sort.videoData(
                                            contents.contents[i].itemSectionRenderer.contents[0].shelfRenderer.content.expandedShelfContentsRenderer.items[0].videoRenderer
                                        )
                                    );
                                }

                                document.cosmicCat.pageRenderer.add(".context-data-container", thisItem);
                            }
                        }

                        document.cosmicCat.Home.Feed.complete();
                    } catch(err) {
                        console.error("[Home Feed] Failed to parse feed data:\n", err);
                        document.cosmicCat.Home.Feed.error();
                    }
                } catch(err) {
                    console.error("[Home Feed] Failed to parse YouTube data:\n", err);
                    document.cosmicCat.Home.Feed.error();
                }
            },
            complete: () => {
                document.cosmicCat.toggleElm("#feed-loading-template");
                document.cosmicCat.toggleElm(".feed-header");
                document.cosmicCat.toggleElm("#feed-main-youtube");
            },
            error: () => {
                document.querySelector("#feed-main-youtube:not(.hid)")?.classList?.add("hid");
                document.cosmicCat.toggleElm("#feed-loading-template");
                document.cosmicCat.toggleElm("#feed-error");
            }
        }
    },
    Subscriptions: {
        getChannelInfo: async () => {
            try {
                let t = await fetch("https://www.youtube.com/feed/channels");
                return document.cosmicCat.Subscriptions.handleData(t.text(), 1);
            } catch(err) {
                console.error("[Subscriptions] Something went wrong with fetching subscriptions data:\n", err);
                return [];
            }
        },
        getFeedInfo: async () => {
            try {
                let t = await fetch("https://www.youtube.com/feed/subscriptions?flow=2");
                return document.cosmicCat.Subscriptions.handleData(t.text());
            } catch(err) {
                console.error("[Subscriptions] Something went wrong with fetching subscriptions data:\n", err);
                return [];
            }
        },
        handleData: (a, b) => {
            return a.then(n => {
                let p = JSON.parse(n.split("var ytInitialData = ")[1].split(";</script>")[0]).contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content;
                return p ? p.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].shelfRenderer.content.expandedShelfContentsRenderer.items : [];
            });
        }
    },
    Animations: {
        start: (a, b) => {
            // motivation dropped before i got to write more
            // also this is probably a bad way to do animations
            b.classList.add(a);
        }
    },
    watch: {
        Suggestions: {
            load: async () => {
                const token = document.cosmicCat.data.tokenSlot1;
                let toggleElms = () => {
                    document.cosmicCat.toggleElm("#watch-more-related-button");
                    document.cosmicCat.toggleElm("#watch-more-related");
                };
                if(!token) return toggleElms();
                toggleElms();
                let api = await document.cosmicCat.Ajax.post("/youtubei/v1/next", `continuation: "${token}"`);
                let collection = api?.onResponseReceivedEndpoints?.[0]?.appendContinuationItemsAction?.continuationItems || [];
                if(collection.length == 0) return toggleElms();

                for (let i = 0; i < collection.length; i++) {
                    if (collection[i].compactVideoRenderer) {
                        let videoData = document.cosmicCat.Utils.Sort.videoData(collection[i].compactVideoRenderer);
                        document.cosmicCat.pageRenderer.add("#watch-related", document.cosmicCat.Template.Watch.Content.mainCon.sideBar.suggestedVideo(videoData));
                    }
                    if (collection[i].continuationItemRenderer) {
                        document.cosmicCat.data.tokenSlot1 = collection[i].continuationItemRenderer.continuationEndpoint.continuationCommand.token;
                    }
                }
                if (!collection.at(-1).continuationItemRenderer) return toggleElms();
                toggleElms();
            }
        },
        actions: {
            like: (a, b) => {
                if (!document.cosmicCat.Utils.getCookie("SAPISID")) {
                    return document.cosmicCat.watch.actions;
                }

                if (document.cosmicCat.watch.isVideoLiked()) {
                    a.classList.remove("liked");
                    document.cosmicCat.Ajax.post("/youtubei/v1/like/removelike", `target:{videoId: "${ytInitialPlayerResponse.videoDetails.videoId}"}`);
                } else {
                    if (document.cosmicCat.watch.isVideoDisliked()) {
                        document.querySelector("#watch-unlike").classList.remove("unliked");
                    }
                    a.classList.add("liked");
                    document.cosmicCat.Ajax.post("/youtubei/v1/like/like", `target:{videoId: "${ytInitialPlayerResponse.videoDetails.videoId}"}`);
                }

                try {
                    ytInitialData.contents.twoColumnWatchNextResults.results.results.contents[0].videoPrimaryInfoRenderer.videoActions.menuRenderer.topLevelButtons[0].segmentedLikeDislikeButtonRenderer.likeButton.toggleButtonRenderer.isToggled = ytInitialData.contents.twoColumnWatchNextResults.results.results.contents[0].videoPrimaryInfoRenderer.videoActions.menuRenderer.topLevelButtons[0].segmentedLikeDislikeButtonRenderer.likeButton.toggleButtonRenderer.isToggled ? false : true;
                } catch(err) {
                    console.error("[Watch] Failed to un/like video:", err);
                }
            },
            unlike: (a, b) => {
                if (!document.cosmicCat.Utils.getCookie("SAPISID")) {
                    return document.cosmicCat.watch.actions;
                }

                if (document.cosmicCat.watch.isVideoDisliked()) {
                    a.classList.remove("unliked");
                    document.cosmicCat.Ajax.post("/youtubei/v1/like/removelike", `target:{videoId: "${ytInitialPlayerResponse.videoDetails.videoId}"}`);
                } else {
                    if (document.cosmicCat.watch.isVideoLiked()) {
                        document.querySelector("#watch-like").classList.remove("liked");
                    }
                    a.classList.add("unliked");
                    document.cosmicCat.Ajax.post("/youtubei/v1/like/dislike", `target:{videoId: "${ytInitialPlayerResponse.videoDetails.videoId}"}`);
                }

                try {
                    ytInitialData.contents.twoColumnWatchNextResults.results.results.contents[0].videoPrimaryInfoRenderer.videoActions.menuRenderer.topLevelButtons[0].segmentedLikeDislikeButtonRenderer.dislikeButton.toggleButtonRenderer.isToggled = ytInitialData.contents.twoColumnWatchNextResults.results.results.contents[0].videoPrimaryInfoRenderer.videoActions.menuRenderer.topLevelButtons[0].segmentedLikeDislikeButtonRenderer.dislikeButton.toggleButtonRenderer.isToggled ? false : true;
                } catch(err) {
                    console.error("[Watch] Failed to un/like video:", err);
                }
            },
            share: (a, b) => {
                document.querySelector("#watch-actions-area-container").classList.remove("hid");
                document.querySelector("#watch-actions-share").classList.remove("hid");
                // unfinished
                // document.cosmicCat.Animations.start("transitioning", document.querySelector("#watch-actions-area-container"));
                console.log(a);
            }
        },
        watch5: {
            handleLoadMoreRelated: () => document.cosmicCat.watch.Suggestions.load()
        },
        isOwner: () => {
            try {
                return ytInitialPlayerResponse?.videoDetails?.isOwnerViewing || false;
            } catch {
                return false;
            }
        },
        isVideoLiked: () => {
            return ytInitialData.contents?.twoColumnWatchNextResults?.results?.results?.contents?.[0]?.videoPrimaryInfoRenderer?.videoActions?.menuRenderer?.topLevelButtons?.[0]?.segmentedLikeDislikeButtonRenderer?.likeButton?.toggleButtonRenderer?.isToggled;
        },
        isVideoDisliked: () => {
            return ytInitialData.contents?.twoColumnWatchNextResults?.results?.results?.contents?.[0]?.videoPrimaryInfoRenderer?.videoActions?.menuRenderer?.topLevelButtons?.[1]?.segmentedLikeDislikeButtonRenderer?.dislikeButton?.toggleButtonRenderer?.isToggled;
        }
    },
    Browse: {
        Renderer: {
            render: () => {
                document.cosmicCat.pageRenderer.set("#content-container", document.cosmicCat.Template.Browse.Main());

                document.cosmicCat.Alert(1, "This page is under reconstruction!");

                document.querySelector(".load-more-pagination").remove();
            }
        },
        _Data: (data) => {
            let result = [];

            try {
                let tab = data.contents.twoColumnBrowseResultsRenderer.tabs[0];
                let contents = tab.tabRenderer.content;

                try {
                    contents = contents.richGridRenderer.contents;
                } catch {
                    contents = contents.sectionListRenderer.contents;
                }

                let c = [];

                for (let i = 0; i < contents.length; i++) {
                    let b_a = contents[i].itemSectionRenderer?.contents?.[0] || contents[i].richItemRenderer || {};
                    let b_b = b_a.shelfRenderer?.content?.gridRenderer?.items || b_a.shelfRenderer?.content?.expandedShelfContentsRenderer?.items || b_a.shelfRenderer?.content?.horizontalListRenderer?.items || b_a.horizontalCardListRenderer?.cards;
                    if (b_b) {
                        for (let i_ = 0; i_ < b_b.length; i_++) {
                            if (b_b[i_].gridVideoRenderer || b_b[i_].videoRenderer || b_b[i_].videoCardRenderer) {
                                c.push(b_b[i_].gridVideoRenderer || b_b[i_].videoRenderer || b_b[i_].videoCardRenderer);
                            }
                        }
                    }
                    if (b_a.content && b_a.content.videoRenderer) {
                        c.push(b_a.content.videoRenderer);
                    }
                }

                for (let i = 0; i < c.length; i++) {
                    if(i < 4) {
                        result[i] = document.cosmicCat.Utils.Sort.videoData(c[i]);
                    }
                }
            } catch(err) {
                console.error(err);
            }

            return result;
        }
    },
    player: {
        Create: () => {
            if(!ytInitialPlayerResponse.videoDetails) return;
            if(document.cosmicCat.Storage.get("iframe").value == 1) {
                document.querySelector("#player").remove();
                const a = document.createElement('script');
                a.src = "https://www.youtube.com/iframe_api";
                document.querySelector("#watch-video").appendChild(a);
                const b = document.createElement("script");
                b.innerHTML = `var player;
function onYouTubeIframeAPIReady() {
player = new YT.Player('watch-player', {
height: '390',
width: '640',
videoId: '${window.location.search.split("v=")[1].split("&")[0]}',
playerVars: {
'playsinline': 1
},
events: {
'onReady': onPlayerReady
}
});
}
function onPlayerReady(event) {
event.target.playVideo();
}`;
                document.querySelector("#watch-video").appendChild(b);
            } else {
                const a = document.createElement("script");
                a.innerHTML = `const deez = {config: {
url: "https://s.ytimg.com/yts/swfbin/player-vfl8Mj1Eu/watch_as3.swf",
urlV8: "https://s.ytimg.com/yts/swfbin/player-vfl8Mj1Eu/cps.swf",
urlV9As2: "https://s.ytimg.com/yts/swfbin/player-vfl8Mj1Eu/cps.swf",
args: {
author: ytInitialPlayerResponse.videoDetails.author,
dashmpd: ytInitialPlayerResponse.streamingData.dashManifestUrl,
focEnabled: "1",
adaptive_fmts: "",
account_playback_token: "",
enablecsi: "0",
length_seconds: ytInitialPlayerResponse.videoDetails.lengthSeconds,
ytfocEnabled: "1",
remarketing_url: "",
cos: "Windows",
uid: "",
iv_invideo_url: "",
idpj: "0",
sourceid: "y",
vid: ytInitialPlayerResponse.videoDetails.videoId,
watermark: ",https://s.ytimg.com/yts/img/watermark/youtube_watermark-vflHX6b6E.png,https://s.ytimg.com/yts/img/watermark/youtube_hd_watermark-vflAzLcD6.png",
avg_rating: "",
fexp: "908547,914099,927622,930666,930672,932404,934040,940247,940642,947209,947215,949424,951701,952302,952901,953000,953912,957103,957201,958600",
host_language: "en",
iv_load_policy: "1",
token: "1",
loaderUrl: "https://www.youtube.com/watch?v=" +ytInitialPlayerResponse.videoDetails.videoId,
ptk: "ea",
baseUrl: "https://googleads.g.doubleclick.net/pagead/viewthroughconversion/962985656/",
cosver: "6.2",
t: "1",
oid: "",
cbrver: yt.config_.INNERTUBE_CONTEXT.client.browserVersion,
plid: "",
ptchn: "",
dash: "1",
no_get_video_log: "1",
sdetail: "p:/embed/" + ytInitialPlayerResponse.videoDetails.videoId,
tmi: "1",
storyboard_spec: ytInitialPlayerResponse.storyboards?.playerStoryboardSpecRenderer?.spec || ytInitialPlayerResponse.storyboards?.playerLiveStoryboardSpecRenderer?.spec,
vq: "auto",
atc: "",
of: "",
allow_embed: "1",
url_encoded_fmt_stream_map: "",
aid: "",
ucid: ytInitialPlayerResponse.videoDetails.channelId,
cr: "RO",
timestamp: "1414688781",
iv_module: "https://s.ytimg.com/yts/swfbin/player-vfl8Mj1Eu/iv_module.swf",
rmktEnabled: "1",
probe_url: "https://www.youtube.com/embed/" + ytInitialPlayerResponse.videoDetails.videoId,
video_id: ytInitialPlayerResponse.videoDetails.videoId,
title: ytInitialPlayerResponse.videoDetails.title,
cl: "78766649",
eventid: "",
csi_page_type: "watch,watch7",
hl: "en_US",
iv3_module: "1",
sw: "0.1",
fmt_list: "22/1280x720/9/0/115,18/640x360/9/0/115,17/256x144/99/1/0",
cbr: yt.config_.INNERTUBE_CONTEXT.client.browserName,
ytfocHistoryEnabled: "0",
referrer: "https://www.youtube.com/embed/" + ytInitialPlayerResponse.videoDetails.videoId,
allow_ratings: "1",
enablejsapi: 0,
pltype: "content",
keywords: ytInitialPlayerResponse.videoDetails.title,
ldpj: "0",
c: "WEB",
view_count: ytInitialPlayerResponse.videoDetails.viewCount
},
assets: {
  css: "//s.ytimg.com/yts/cssbin/www-player-vfluwFMix.css",
  js: "//ciulinuwu.github.io/lib/html5player.js",
  html: "//cdn.discordapp.com/attachments/996734304560353332/1018500227629592656/html5_player_template.html"
},
attrs: {
  id: "movie_player"
},
params: {
  allowfullscreen: "true",
  allowscriptaccess: "always",
  bgcolor: "#000000"
},
minVersion: "8.0.0",
fallback: null,
fallbackMessage: null,
html5: !0,
disable: {},
loaded: !0,
messages: {
  player_fallback: [
    'Adobe Flash Player or an HTML5 supported browser is required for video playback.<br><a href="https://get.adobe.com/flashplayer/">Get the latest Flash Player </a><br><a href="/html5">Learn more about upgrading to an HTML5 browser</a>'
  ]
}
}}`;
                document.body.appendChild(a);
                var n = ``;
                try {
                    for ( let i = 0, j = ytInitialPlayerResponse.streamingData.formats.length; i < j; i++ )
                        (n += "fallback_host=" + ytInitialPlayerResponse.streamingData.formats[i].url.split("://")[1].split(".com")[0] +
                         ".com&type=" +
                         encodeURIComponent(
                            ytInitialPlayerResponse.streamingData.formats[i].mimeType
                        ).replace("%20", "+") +
                         "&url=" +
                         encodeURIComponent(ytInitialPlayerResponse.streamingData.formats[i].url) +
                         "&quality=" +
                         ytInitialPlayerResponse.streamingData.formats[i].quality +
                         "&itag=" +
                         ytInitialPlayerResponse.streamingData.formats[i].itag),
                            i < parseInt(ytInitialPlayerResponse.streamingData.formats.length - 1) &&
                            (n += ",");
                } catch (e) {
                    console.log("cound not craft legacy stream url");
                }
                deez.config.args.url_encoded_fmt_stream_map = n;
                const player = document.createElement("script");
                player.src = "//ciulinuwu.github.io/lib/html5player.js";
                player.id = "loaded";
                document.body.appendChild(player);
                const ass = document.createElement("style");
                ass.id = "cosmic-panda-player";
                ass.innerHTML = `
.ytp-play-progress {
background-image: linear-gradient(to bottom,#c00 0,#600 100%);
}
.ytp-load-progress {
background-image: linear-gradient(to top,#5a5a5a 89%,#666 90%);
}
.html5-scrubber-button {
background: no-repeat url(//s.ytimg.com/yt/imgbin/player-common-vflzogr__.png) -305px -41px;
border:none;
width:17px;
height:16px!important;
border-radius:0;
top:-6px
}
.html5-progress-bar:focus .html5-scrubber-button, .html5-scrubber-button:active, .html5-scrubber-button:hover {
background: no-repeat url(//s.ytimg.com/yt/imgbin/player-common-vflzogr__.png) 0 0;
}
.ytp-progress-list {
background: #1e1f1f;
background-image: linear-gradient(to top,rgba(30,31,31,.75) 89%,#2f2f2f 90%);
}
.html5-video-player .html5-player-chrome {
padding-bottom:1px;
height:26px;
background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAdCAYAAABrAQZpAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAABIAAAASABGyWs+AAAACXZwQWcAAAABAAAAHQAh4gKwAAAAMUlEQVQI12OQlJD4x2Sgr8/I9OTZs5dM//79Y2T6//8/IyqLAcLClEBjYahDKCHSKADN5VNQpdTxzgAAAABJRU5ErkJggg==')
}
button.ytp-v3normal.ytp-button {
background: no-repeat url(//s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) -96px -151px;
}
button.ytp-v3normal.ytp-button:hover {
background: no-repeat url(//s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) 0 -97px
}
#player.watch-small button.ytp-v3normal.ytp-button {
background:no-repeat url(//s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) -96px -151px, #141414;
box-shadow: inset 0 -5px 5px #000;
}
#player.watch-medium button.ytp-v3teather.ytp-button, .ytp-size-toggle-large:focus {
background: no-repeat url(//s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) -121px -340px, #141414;
box-shadow: inset 0 -5px 5px #000;
}
button.ytp-v3teather.ytp-button, .ytp-size-toggle-large {
    background: no-repeat url(//s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) -121px -340px;
}
button.ytp-v3teather.ytp-button:hover, .ytp-size-toggle-large:hover {
    background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) -32px -43px;
}
.ytp-button-fullscreen-enter, .ytp-embed .ytp-fullscreen-button.ytp-button {
    background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) -128px -43px;
}
.ytp-button-fullscreen-enter:not(.ytp-disabled):focus, .ytp-button-fullscreen-enter:not(.ytp-disabled):hover {
    background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) -89px -340px;
}
.ytp-settings-button {
    background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) -89px -70px;
}
.ytp-settings-button:hover, .ytp-settings-button:not(.ytp-disabled):focus {
    background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) -35px -259px!important;
}
.ytp-settings-button-active {
    background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) -35px -259px, #141414!important;
    box-shadow: inset 0 -5px 5px #000;
}
.ytp-subtitles-button,.ytp-subtitles-button:focus {
        background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) 0 -151px;
}
.ytp-subtitles-button:hover {
    background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) -57px -340px;
}
.ytp-subtitles-button-active:focus, .ytp-subtitles-button-active:hover, .ytp-subtitles-button-active {
        background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) -128px -178px;
}
.ytp-button-watch-later, .ytp-button-watch-later:focus {
        background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) -96px -178px;
}
.ytp-button-watch-later:hover, .ytp-button-watch-later:active {
    background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) -96px -124px;
}
.ytp-button-volume[data-value=max], .ytp-button-volume[data-value=loud], .ytp-button-volume[data-value=max]:focus, .ytp-button-volume[data-value=loud]:focus, .ytp-embed .ytp-mute-button {
    background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) 0 -232px;
}
.ytp-button-volume[data-value=max]:hover, .ytp-button-volume[data-value=loud]:hover {
    background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) 0 -178px;
}
.ytp-button-volume[data-value=normal], .ytp-button-volume[data-value=quiet],  .ytp-button-volume[data-value=normal]:focus, .ytp-button-volume[data-value=quiet]:focus {
        background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) -32px -178px;
}
.ytp-button-volume[data-value=normal]:hover, .ytp-button-volume[data-value=quiet]:hover {
        background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) -92px -259px;
}
.ytp-button-volume[data-value=min], .ytp-button-volume[data-value=min]:focus {
    background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) 0 -124px;
}
.ytp-button-volume[data-value=min]:hover {
        background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) 0 -124px;
}
.ytp-button-volume[data-value=off], .ytp-button-volume[data-value=off]:focus {
        background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) -57px -70px;
}
.ytp-button-volume[data-value=off]:hover {
        background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) -3px -259px;
}
.ytp-button-play, .ytp-embed .ytp-play-button {
        background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) -32px -151px;
}
.ytp-button-play:not(.ytp-disabled):hover, .ytp-button-play:not(.ytp-disabled):active, .ytp-button-play:not(.ytp-disabled):focus {
        background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) -32px -124px!important;
}
.ytp-button-pause, .ytp-button-play:not(.ytp-disabled):focus {
    background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) 0 -340px;
}
.ytp-button-pause:not(.ytp-disabled):focus, .ytp-button-pause:not(.ytp-disabled):hover {
        background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) 0 -70px;
}
.ytp-button-replay {
    background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) -36px -285px;
}
.ytp-button-replay:not(.ytp-disabled):hover {
    background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) -36px -312px;
}
.ytp-button-stop {
     background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) -90px -97px;
}
.ytp-button-stop:not(.ytp-disabled):hover {
    background: no-repeat url(https://s.ytimg.com/yt/imgbin/player-dark-vflf2FniH.png) -33px -232px;
}
.ytp-volume-slider-foreground:before {
    background:linear-gradient(#290909,#BD2020,#B31E1E,#A71C1C,#901A1A,#6F1313,#444444);
    height:7px;
    top:4px
}
.ytp-volume-slider-foreground:after {
    background:linear-gradient(#050404,#050404,#050404,#050404,#050404,#050404,#444);
    height:7px;
    top:4px
}
.ytp-volume-slider-foreground {
    background:linear-gradient(#fff,#CFCFCF);
    border-radius:3px
}
.ytp-button-play, .ytp-volume-control, .ytp-subtitles-button,.ytp-subtitles-button-active, .ytp-settings-button, .ytp-settings-button-active {
        border-right: 1px solid #222;
}
.yt-lockup-meta-info li:first-child {
    width:100%
}
.yt-ui-ellipsis {
    text-overflow:clip
}
.ytp-embed svg {
    visibility:hidden}
.ytp-embed button.ytp-fullscreen-button.ytp-button {
    width:0!Important;
    top:-10px
}
.ytp-embed div.ytp-gradient-top,.ytp-embed .ytp-chrome-top  {
    display:none
}
.ytp-menuitem {
    max-height:26px;
    height:26px
}
.ytp-chrome-controls .ytp-button.ytp-youtube-button, .ytp-small-mode .ytp-chrome-controls .ytp-button.ytp-youtube-button, .ytp-exp-bigger-button-like-mobile.ytp-small-mode .ytp-chrome-controls .ytp-button.ytp-youtube-button {
    display:none
}
.ytp-embed .ytp-chrome-controls {
    max-height:28px!important
}
.ytp-embed .ytp-progress-bar-container {
    bottom:32px
}
.ytp-exp-bottom-control-flexbox .ytp-left-controls, :not(.ytp-exp-bottom-control-flexbox) .ytp-right-controls {
    margin-top:5px
}
.ytp-embed .ytp-time-display {
    height:26px;
    line-height:26px
}
html #player.watch-small .html5-video-player:not(.ideal-aspect) .html5-main-video {
max-width:initial!important;
max-height:initial!important
}
.ytp-menu-content {
border-spacing:1px
}
.ytp-menu {
    background:#141414;
    border-radius:3px 3px 0 0;
    padding:0
}
.ytp-drop-down-menu {
    display:inline-block!important;
    position:relative;
    background:none;
    border:none;
}
.ytp-drop-down-menu-button {
color:#aaa;
padding:4px 7px
}
.ytp-drop-down-menu-button-selected {
color:#fff;
}
.ytp-drop-down-menu-button-checked .ytp-drop-down-menu-button-check, .ytp-drop-down-menu-button-checked:hover:not(.ytp-disabled) .ytp-drop-down-menu-button-check {
    background:none #fff;
    border-radius:50%;
    height:3px;
    width:3px;
    margin:0 11px 1px -1px
}
.ytp-drop-down-menu-button-check {
height:3px;
width:3px;
margin:0 11px 1px -1px
}
.ytp-drop-down-menu-button:hover:not(.ytp-disabled) {
background:#601212
}
.ytp-menu-row {
display:inline-block;
vertical-align:top;
box-shadow: 1px 0 0 0 #2b2b2b inset;
border-left: 1px solid #000;
padding:0 3px;
min-height:135px
}
.ytp-menu-row:first-child {
border-left:transparent;
box-shadow:none
}
.ytp-menu-cell {
display:block
}
.ytp-drop-down-label {
display:none
}
.ytp-menu-title {
text-align:left;
padding:4px 7px 4px 16px
}
.ytp-drop-down {
min-width:0!important
}
.ytp-segmented-control {
margin-left:16px
}`;
                document.querySelector("head").append(ass);
                player.addEventListener("load", (elm) => {
                    yt.player.Application.create("player-api", deez.config);

                    let a = document.querySelector("#movie_player");
                    document.querySelector("#watch-player").append(a);
                    document.querySelector("#player.skeleton.flexy").remove();

                    $(document).on('click', '.ytp-size-toggle-large, .ytp-size-button.toggled', function(e) {
                        if (e.target.classList.contains("ytp-size-button")) e.target.classList.remove("toggled");
                        document.querySelector('#watch-container').classList.remove("watch-wide");
                        document.querySelector('#watch-video').classList.add('small');
                        document.querySelector('#watch-video').classList.remove('medium');
                        setTimeout(function () {if (document.querySelector('.watch-playlist-collapsed')) document.querySelector('#player').classList.remove('watch-playlist-collapsed');}, 1);
                    });
                    $(document).on('click', '.ytp-size-toggle-small, .ytp-size-button:not(.toggled)', function(e) {
                        if (e.target.classList.contains("ytp-size-button")) e.target.classList.add("toggled");
                        if (document.querySelector('.watch-playlist')) document.querySelector('#player').classList.add('watch-playlist-collapsed');
                        document.querySelector('#watch-container').classList.add("watch-wide");
                        setTimeout(function () {
                            document.querySelector('#watch-video').classList.remove('small');
                            document.querySelector('#watch-video').classList.add('medium');
                        }, 300);
                    });
                });
            }
        }
    },
    Storage: {
        init: () => {
            const STORAGE = localStorage.getItem("ciulinfig");
            console.debug("Storage.init", STORAGE);

            if(!STORAGE) return document.cosmicCat.Storage.build();
            if(JSON.parse(STORAGE).storageVer !== document.cosmicCat.data.version) return document.cosmicCat.Storage.build();

            console.info("Storage.init", "storage has init.");
        },
        build: () => {
            const obj = {
                "storageVer": document.cosmicCat.data.version,
                "lang": "en",
                "dark": "0",
                "i18n": {},
                "i18n.setup": "0",
                "iframe": "1",
                "channel_mode": "3",
                "greeting_feed": "youtube"
            };
            localStorage.setItem("ciulinfig", JSON.stringify(obj));
        },
        get: (a) => {
            const STORAGE = JSON.parse(localStorage.getItem("ciulinfig"));

            return {
                name: a,
                exists: !!STORAGE[a],
                value: STORAGE[a]
            };
        },
        add: (a, b) => {
            let obj = JSON.parse(localStorage.getItem("ciulinfig"));
            obj[a] = b;
            console.debug("Storage.add", obj[a]);
            localStorage.setItem("ciulinfig", JSON.stringify(obj));
        },
        remove: (a) => {
            const STORAGE = JSON.parse(localStorage.getItem("ciulinfig"));
            delete STORAGE[a];
            localStorage.setItem("ciulinfig", JSON.stringify(STORAGE));
        }
    },
    pageRenderer: {
        error: () => {
            document.cosmicCat.Alert(2, "Oops! Something went wrong with rendering the page. <a href=''>Click here</a> to refresh the page.");
        },
        set: (selector, html) => {
            this.original = selector;

            try {
                selector = document.querySelector(selector);
                selector.innerHTML = html;
            } catch {
                document.cosmicCat.pageRenderer.error();
                console.error(`[pageRenderer]: "${selector}" does not exist.`);
            }
        },
        replace: (selector1, selector2) => {
            try {
                document.querySelector(selector1).outerHTML = selector2;
            } catch {
                console.error(`[pageRenderer]: "${selector1}" does not exist.`);
            }
        },
        add: (selector, html) => {
            this.original = selector;

            try {
                selector = document.querySelector(selector);
                selector.innerHTML += html;
            } catch {
                document.cosmicCat.pageRenderer.error();
                console.error(`[pageRenderer]: "${this.original}" does not exist.`);
            }
        },
        render: (b) => {
            document.cosmicCat[document.cosmicCat.Utils.whatPage(0)].Renderer.render(b);
        }
    },
    Actions: {
        handleButton: (b, a) => {
            return (b.dataset.buttonAction?.slice(7)?.split('.')?.reduce((o,i)=> o[i]||"", document.cosmicCat) || document.cosmicCat.null)(b, b.dataset);
        },
        handleSubscribeButton: async (a, b) => {
            let classn = "";

            let d = a.dataset.subscriptionValue;
            let c = (a.classList.contains("subscribed") || a.classList.contains("yt-subscription-button-green")) ? "unsubscribe" : "subscribe";

            switch(document.cosmicCat.Utils.whatPage()) {
                case "channels2":
                    classn = ".subscription-container";
                    d = a.parentElement.dataset.subscriptionValue;
                    break;
                case "watch":
                case "channels3":
                    classn = ".yt-subscription-button-hovercard";
                    break;
                case "playlist":
                    classn = ".enable-fancy-subscribe-button";
            }

            try {
                document.cosmicCat.Ajax.post(`/youtubei/v1/subscription/${c}`, `channelIds: ["${d}"]`).then(() => {
                    document.cosmicCat.Channels.toggleSubscribe();
                    document.cosmicCat.pageRenderer.replace(classn, document.cosmicCat.Template.Buttons.Subscribe(d));
                });
            } catch(err) {
                console.error(`[Subscribe] Something went wrong with subscribing to ${d}:\n`, err);
            }
        },
        handleSettingsButton: (a, b) => {
            return document.cosmicCat.Settings.toggleOption(a, a.dataset);
        },
        handleSettingsTab: (a, b) => {
            return document.cosmicCat.Settings.toggleTab(a, a.dataset);
        },
        handleGuideItem: (a, b) => {
            document.cosmicCat.Home.Feed.load(a.children[0]);
        },
        handleExpander: () => {document.cosmicCat.toggleElm("#masthead-expanded"); }
    },
    picker: {
        load: (a, b) => {
            document.cosmicCat.Ajax.post(`/youtubei/v1/account/account_menu`).then((a) => {
                var c = a.actions[0].openPopupAction.popup.multiPageMenuRenderer.sections[2].multiPageMenuSectionRenderer.items.find(a => a?.compactLinkRenderer?.icon?.iconType);
                console.log(c);
            });
            console.log(a, b)
        }
    },
    null: () => null
};

document.cosmicCat.Storage.init();

document.cosmicCat.Account.checkLogin();

const OBJ_STYLE_DARK = `* {--dark-noise: url(${document.cosmicCat.data.darkNoiseBg}); --shadow-color: #110f0f; --nero-color-primary: #201e1e; --nero-color-secondary: #242323; --gray-color: #a2a2a2; --silver-color: #bfbfbf; --night-rider-color: #2f2f2f; --white-color: #fff; --black-color: #000;}
body, #masthead-container
{background: var(--dark-noise) !important}

#masthead-search-terms input
{background: var(--black-color) !important; color: var(--white-color);}

#feed, #feed-background, .yt-tile-static, .yt-tile-visible, .yt-tile-default:hover, .yt-tile-default.video-list-item a:hover, #watch-sidebar .video-list-item a:hover
{ background: var(--nero-color-primary) !important; border-bottom-color: var(--nero-color-primary) !important; }

.feed-item-container:hover
{background: var(--nero-color-secondary) !important;}

#masthead-nav a, #masthead-user a, .metadata .view-count, .metadata .view-count, .feed-item-actions-line, .heading .header-container, .browse-item-content h3 a, #eow-title, .watch-view-count, #watch-uploader-info, .title, .yt-uix-button-content
{color: var(--silver-color) !important;}

.feed-item-container .feed-item-main, .feed-item-container:hover
{border-bottom: 1px solid var(--night-rider-color) !important;}

.feed-item-container:hover
{border-top: 1px solid var(--night-rider-color) !important;}

#footer ul {text-shadow: none;}

#masthead-user-expander .yt-uix-expander-head, #masthead-gaia-user-wrapper, #masthead-gaia-photo-wrapper
{border: 1px solid transparent;}

#watch-description .expand, #watch-description .collapse
{filter: invert();}

#search-btn .yt-uix-button-content
{filter: invert(); color: var(--gray-color);}

#masthead-expanded-container, #filter-dropdown
{box-shadow: inset 0 5px 5px var(--shadow-color) !important;}

img#logo
{background: url(${document.cosmicCat.data.darkyoutubelogo}) !important; background-size: 100px !important;}

#masthead-expanded-loading-message, #search-header h2, .yt-uix-button-content, label, .comment-text, #eow-description, #watch-description-extras, .num-results, #filter-dropdown, .enable-fancy-subscribe-button .yt-uix-button-subscription:hover .yt-uix-button-content, .yt-lockup-content *
{color: var(--white-color) !important}

#masthead-search-terms, #search-btn
{border-color: #262626 !important; background: none !important;}

.yt-uix-button-default, .yt-subscription-button-js-default, .yt-uix-button-panel:hover .yt-uix-button-text, body .yt-uix-button-default[disabled]
{box-shadow: none !important; text-shadow: 0 1px 0 #000; border-color: #262626; background-image: linear-gradient(to bottom,#000 0,#202020 100%) !important;}

.subscription-button-with-recommended-channels .yt-uix-button-content
{color: #555 !important;}

.metadata-inline .yt-uix-button-content
{color: var(--black-color) !important;}

.yt-horizontal-rule
{border-top-color: var(--black-color) !important; border-bottom-color: var(--nero-color-primary) !important;}
`;

function Ciulinations() {
    const obj = {
        setTranslation: function (params) {
            return fetch(document.cosmicCat.data.i18nfolder + `${params}.json`)
                .then((response) => response.json())
                .then((data) => {
                document.cosmicCat.Storage.add("i18n", data);
                window.location.reload();
                return true;
            })
                .catch((error) => {
                alert(params + " is not translated yet.\n\nContribute: https://github.com/ciulinuwu/ciulinations");
                console.error(error, "reverting to fallback.");
                return false;
                //document.cosmicCat.func.addToStorage("i18n", this.useFallback());
            });
        },
        useFallback: function() {
            //return document.cosmicCat.func.getFromStorage("i18n.fallback");
        },
        getTranslation: function () {
            return document.cosmicCat.Storage.get("i18n").value;
        }
    };
    const STORAGE = document.cosmicCat.Storage.get("i18n.setup");
    if(STORAGE.value !== "1") {
        obj.setTranslation("en");
        document.cosmicCat.Storage.add("i18n.setup", "1");
    }

    return obj;
}

const localizeString = (varr, DOM) => {
    const lang = Ciulinations().getTranslation();
    var i18n;
    try {
        i18n = varr.split('.').reduce((o,i)=> o[i]||"", lang.json) || "<\bno i18n string>";
    } catch {
        // Attempt to refetch missing translations.
        Ciulinations().setTranslation("en");
    }

    // really need to get rid of this and simplify the process.
    switch (varr) {
        case "watch.uploaderinfo":
            i18n = i18n.replace(/%s/g, `<a href="https://www.youtube.com${DOM?.secondary.owner.url}/videos" class="yt-uix-sessionlink yt-user-name author" rel="author" dir="ltr">${DOM?.secondary.owner.name}</a>`);
            i18n = i18n.replace(/%r/g, `<span id="eow-date" class="watch-video-date">${DOM?.primary.upload}</span>`);
            break;
        case "home.feed.uploadedavideo":
            i18n = i18n.replace(/%s/g, `<span class="feed-item-owner"><a href="${DOM?.url}/videos" class="yt-uix-sessionlink yt-user-name" dir="ltr">${DOM?.name}</a></span>`);
            break;
        case "watch.from":
            i18n = i18n.replace(/%s/g, `<span id="playnav-curvideo-channel-name"><a href="${window.location.href}">${DOM}</a></span>`);
            break;
        case "home.feed.islive":
            i18n = i18n.replace(/%s/g, `<span class="feed-item-owner"><a href="${DOM?.url}" class="yt-uix-sessionlink yt-user-name" dir="ltr">${DOM?.name}</a></span>`);
            break;
        case "watch.by":
            i18n = i18n.replace(/%s/g, `<span class="yt-user-name" dir="ltr">${DOM}</span>`);
            break;
        case "search.channels.by":
            i18n = i18n.replace(/%s/g, `<a href="https://www.youtube.com${DOM?.url}" class="yt-uix-sessionlink yt-user-name" dir="ltr">${DOM?.name}</a>`);
            break;
        case "stats.likesdislikes":
            i18n = i18n.replace(/%s/g, `<span class="likes"></span>`);
            i18n = i18n.replace(/%r/g, `<span class="dislikes"></span>`);
            break;
        case "playlists.body.primaryPane.items.video.by":
            i18n = i18n.replace(/%s/g, `${DOM}`);
            break;
        case "search.playlists.by":
            i18n = i18n.replace(/%s/g, `<a href="${DOM?.url}" class="yt-user-name" dir="ltr">${DOM?.name}</a>`);
            break;
        case "playlists.body.secondaryPane.aboutSection.about":
            i18n = i18n.replace(/%s/g, `${DOM}`);
            break;
        case "playlists.body.secondaryPane.aboutSection.creatorLinks.playlists":
            i18n = i18n.replace(/%s/g, `All`);
            i18n = i18n.replace(/%r/g, `${DOM}`);
            break;
        case "playlists.header.channelAuthor":
            i18n = i18n.replace(/%s/g, `<a href="${DOM?.url}">${DOM?.name}</a>`);
            break;
        case "channels.3.body.secondaryPane.userProfile.about":
            i18n = i18n.replace(/%s/g, `${DOM}`);
            break;
        case "channels.3.body.secondaryPane.userProfile.createdBy.by":
            i18n = i18n.replace(/%s/g, `<span class="yt-user-name" dir="ltr">${DOM}</span>`);
            break;
        case "watch.comments.charactersremain":
            i18n = i18n.replace(/%s/g, `<span class="comments-remaining-count" data-max-count="500">500</span>`);
            break;
    }

    return i18n;
};

if(window.location.pathname.match(/\/feed\/explore/i)) {
    let obj = ["trending", "music", "film", "gaming", "sports"];
    for (let i = 0; i < obj.length; i++) {
        Promise.all([
            document.cosmicCat.Ajax.Fetch(`https://www.youtube.com${document.cosmicCat.Utils.listCategories(obj[i]).href}`, document.cosmicCat.Browse._Data)
        ]).then(res => {
            let videos = "";
            for (let i = 0; i < res[0].length; i++) {
                videos += document.cosmicCat.Template.Browse.Content.Video(res[0][i]);
            }

            let categories = document.cosmicCat.Template.Browse.Content.Category(document.cosmicCat.Utils.listCategories(obj[i]), videos);
            document.cosmicCat.pageRenderer.add("#browse-main-column", categories);
        });
    }
}

if ("onbeforescriptexecute" in document) {
    document.addEventListener("beforescriptexecute", (e) => {
        let t = e.target;
        (t.src.search("base.js") > -1 ||
         t.src.search("desktop_polymer.js") > -1 ||
         t.src.search("network.vflset") > -1 ||
         t.src.search("spf") > -1) &&
            (e.preventDefault(), t.remove());
    });
} else {
    (document.cosmicCat.Utils.waitForElm("script#base-js").then(function (e) {
        e.remove();
    }),
     document.cosmicCat.Utils.waitForElm('script[src*="js/th"]').then(function (e) {
        e.remove();
    }),
     document.cosmicCat.Utils.waitForElm('script[src*="s/player"]').then(function (e) {
        e.remove();
    }),
     document.cosmicCat.Utils.waitForElm('script[src*="cast_sender"]').then(function (e) {
        e.remove();
    }),
     document.cosmicCat.Utils.waitForElm('script[src*="network.vflset"]').then(function (e) {
        e.remove();
    }),
     document.cosmicCat.Utils.waitForElm("script[src*=spf]").then(function (e) {
        e.remove();
    }));
}

document.cosmicCat.Utils.waitForElm("ytd-app").then(async (e) => {
    e.remove();
    document.querySelector("body").setAttribute("ytdataloaded", "");

    var t = document.createElement("head");
    t.setAttribute("litterbox", "");
    document.querySelector("html").prepend(t);
    document.querySelector("html head:not([litterbox])").remove();

    var y = document.createElement("script");
    y.setAttribute("id", "www-searchbox");
    y.setAttribute("src", "//s.ytimg.com/yts/jsbin/www-searchbox-vflOEotgN.js");
    document.querySelector("head").append(y);

    var o = document.createElement("title");
    o.innerText = "YouTube - Broadcast Yourself.";
    document.querySelector("head").append(o);

    var x = document.createElement("link");
    x.setAttribute("rel", "icon");
    x.setAttribute("href", "//s.ytimg.com/yt/favicon-refresh-vfldLzJxy.ico");
    document.querySelector("head").append(x);

    var u = document.createElement("link");
    u.setAttribute("rel", "shortcut icon");
    u.setAttribute("href", "//s.ytimg.com/yt/favicon-refresh-vfldLzJxy.ico");
    document.querySelector("head").append(u);

    document.cosmicCat.Utils.addStyle("//s.ytimg.com/yts/cssbin/www-player-vfluwFMix.css");
    document.cosmicCat.Utils.addStyle("//s.ytimg.com/yts/cssbin/www-core-vfleLhVpH.css");

    if (window.location.pathname == "/") {document.cosmicCat.Utils.addStyle("//s.ytimg.com/yts/cssbin/www-guide-vfljovH6N.css");}
    if (document.cosmicCat.Channels.isChannelsPage()) {
        let style = {
            3: ["//s.ytimg.com/yts/cssbin/www-channels3-vflIpog6R.css", "//s.ytimg.com/yts/cssbin/www-watch-inlineedit-vflg-l3kd.css"],
            2: ["//s.ytimg.com/yt/cssbin/www-refresh-vflzVUPsm.css", "//s.ytimg.com/yt/cssbin/www-the-rest-vflNb6rAI.css", "//s.ytimg.com/yt/cssbin/www-channel_new-vflrWkVe_.css"],
            1: ["//ciulinuwu.github.io/lib/www-channel.css", "//ciulinuwu.github.io/lib/base_all-vfl42963.css"]
        };
        let boop = style[document.cosmicCat.Storage.get("channel_mode").value];
        for (let i = 0; i < boop.length; i++) {
            document.cosmicCat.Utils.addStyle(boop[i]);
        }
        (document.cosmicCat.Storage.get("channel_mode").value == "2") && document.querySelector("#www-core-css").remove();
    }
    if (window.location.pathname.split("/")[1].match(/playlist/i)) {document.cosmicCat.Utils.addStyle("//s.ytimg.com/yts/cssbin/www-playlist-vflWjxI-w.css");}
    if(window.location.pathname.match(/\/feed\/explore/i)) {document.cosmicCat.Utils.addStyle("//s.ytimg.com/yts/cssbin/www-videos-nav-vflWHHWFS.css"); document.cosmicCat.Utils.addStyle("//s.ytimg.com/yts/cssbin/www-browse-new-vflUr2lEG.css");}

    document.body.setAttribute("class", "date-20121030 ltr ytg-old-clearfix guide-feed-v2");

    document.body.setAttribute("cosmic-cat", "");

    if (document.cosmicCat.Storage.get("dark").value == "1") {
        var p = document.createElement("style");
        p.setAttribute("id", "www-yt-dark");
        p.innerText = OBJ_STYLE_DARK;

        document.querySelector("head").append(p);
    }

    setTimeout(async function () {
        document.querySelector("body").setAttribute("ythtmlloaded", "");

        if (!document.cosmicCat.Account.isLoggedIn()) {
            await document.cosmicCat.Account.fetch();
        }

        /* Render main body */
        const bodyDOM = document.createElement("div");
        bodyDOM.setAttribute("id", "page");

        document.cosmicCat.data.lang = document.cosmicCat.data.lang[document.cosmicCat.Storage.get("lang").value];
        document.cosmicCat.data.country = window.yt?.config_?.GL;

        let OBJ_MASTH = "";
        let OBJ_USER = "";
        if(document.cosmicCat.Account.isLoggedIn()) {
            OBJ_USER = document.cosmicCat.Template.Masthead.User.loggedIn();
            OBJ_MASTH = document.cosmicCat.Template.Masthead.Expander();
        } else {
            OBJ_USER = document.cosmicCat.Template.Masthead.User.loggedOut();
        }

        var OBJ_MASTHEAD = document.cosmicCat.Template.Masthead.Main();
        var OBJ_FOOTER = document.cosmicCat.Template.Footer();

        bodyDOM.innerHTML += `<div id="masthead-container">
${OBJ_MASTHEAD}
</div>
<div id="content-container">
</div>
${OBJ_FOOTER}
<style id="fix-hid">.hid {display: none !important;}</style>`;
        document.querySelector("body").appendChild(bodyDOM);

        document.cosmicCat.pageRenderer.set("#masthead-user", OBJ_USER);
        document.cosmicCat.pageRenderer.add("#masthead-container", OBJ_MASTH);

        document.cosmicCat.Utils.waitForElm2().then(() => {
            (!0 === update) && document.cosmicCat.Alert(0, "An update is available to Cosmic Cat! <a href=\"https://raw.githubusercontent.com/thistlecafe/cosmic-cat/main/cosmic-cat.user.js\">Click to install it.</a>");
        });

        (() => {
            try {
                yt.www.masthead.searchbox.init();
            } catch(err) {
                try {
                    setTimeout(() => yt.www.masthead.searchbox.init(), 1000);
                } catch(err) {
                    console.error("[Searchbox] Couldn't init!\n", err, "\nTrying again one last time.");
                    try {
                        setTimeout(() => yt.www.masthead.searchbox.init(), 1000);
                    } catch(err) {
                        console.error("[Searchbox] Couldn't init!\n", err);
                    }
                }
                console.error("[Searchbox] Couldn't init!\n", err, "\nTrying again in 1 second.");
            }
        })();
        if(window.location.pathname == "/cosmic_cat") {
            document.querySelector("body").setAttribute("cosmic_cat_settings", "");
            document.querySelector("body").classList.add("guide-feed-v2");

            document.querySelector("title").innerText = "Cosmic Cat Settings";

            const guidecss = document.createElement("link");
            guidecss.setAttribute("id", "www-guide");
            guidecss.setAttribute("rel", "stylesheet");
            guidecss.setAttribute("href", "//s.ytimg.com/yts/cssbin/www-guide-vfljovH6N.css");

            document.querySelector("head").appendChild(guidecss);

            YabaiComponent.addHandler("input", "cosmic-cat-settings", document.cosmicCat.Actions.handleSettingsButton);

            document.cosmicCat.pageRenderer.set("#content-container", document.cosmicCat.Template.Settings.Main() + document.cosmicCat.Template.Settings.Stylesheet());

            $(document).ready(function() {
                $("#channelMode").val(document.cosmicCat.Storage.get("channel_mode").value);
                $("#mainFeed").val(document.cosmicCat.Storage.get("greeting_feed").value);
            });

            document.documentElement.setAttribute("transition", "");
        }
        if(window.location.pathname == "/") {
            document.cosmicCat.pageRenderer.set("#content-container", document.cosmicCat.Template.Homepage.Main());

            let guidebuilder = "";
            let subsbuilder = "";

            if(document.cosmicCat.Storage.get("accountInfo").exists) {
                guidebuilder = document.cosmicCat.Template.Homepage.Guide.Builder.loggedIn();
                subsbuilder = document.cosmicCat.Template.Homepage.Guide.Personal();
            } else {
                guidebuilder = document.cosmicCat.Template.Homepage.Guide.Builder.loggedOut();
            }

            document.cosmicCat.pageRenderer.set("#guide-builder-promo", guidebuilder);
            document.cosmicCat.pageRenderer.set(".guide", subsbuilder);
            document.cosmicCat.pageRenderer.add(".guide", document.cosmicCat.Template.Homepage.Guide.Categories.Main());

            try {
                for (let i = 0; i < document.cosmicCat.data.homeCategories.length; i++) {
                    let caties = document.cosmicCat.Utils.listCategories(document.cosmicCat.data.homeCategories[i]);
                    document.cosmicCat.pageRenderer.add(".cockie", document.cosmicCat.Template.Homepage.Guide.Categories.Channel(caties));
                }
            } catch(err) {
                console.error("[Home] Could not parse categories:\n", err);
            }

            try {
                if (window.location.search == "?c=subscriptions") {
                    document.cosmicCat.Home.Feed.load(document.querySelector("[data-feed-name='subscriptions']"));
                } else {
                    document.cosmicCat.Home.Feed.load(document.querySelector(`[data-feed-name='${document.cosmicCat.Storage.get("greeting_feed").value}']`));
                }
            } catch(err) {
                console.error("[Home] Could not load feed data:\n", err);
            }

            try {
                if(document.cosmicCat.Storage.get("accountInfo").exists) {
                    let subsarr = await document.cosmicCat.Subscriptions.getChannelInfo();
                    for (let i = 0; i < subsarr.length; i++) {
                        document.cosmicCat.pageRenderer.add("#guide-subscriptions", document.cosmicCat.Template.Homepage.Guide.Channel(subsarr[i]));
                    }
                } else {

                }
            } catch(err) {
                console.error("[Home] Could not load subscriptions:\n", err);
            }
        }
        if(window.location.pathname.split("/")[1].match(/watch/i)) {
            await document.cosmicCat.Utils.waitForElm2().then(async () => {
                await new Promise((a,b) => setTimeout(a, 500));
                let data = {
                    primary: document.cosmicCat.Utils.Sort.videoData(ytInitialData.contents.twoColumnWatchNextResults.results?.results?.contents[0]?.videoPrimaryInfoRenderer),
                    secondary: document.cosmicCat.Utils.Sort.videoData(ytInitialData.contents.twoColumnWatchNextResults.results?.results?.contents[1]?.videoSecondaryInfoRenderer),
                    alternative: document.cosmicCat.Utils.Sort.videoData(ytInitialPlayerResponse)
                };

                document.cosmicCat.pageRenderer.set("#content-container", document.cosmicCat.Template.Watch.Content.Main(data));

                document.querySelector("#page").classList.add("watch");

                fetch("https://returnyoutubedislikeapi.com/Votes?videoId=" + data.alternative.id)
                    .then((response) => response.json())
                    .then((result) => {
                    var likes = result.likes;
                    var dislikes = result.dislikes;
                    var rating = likes + dislikes > 0 ? (likes / (likes + dislikes)) * 100 : 50;
                    document.querySelector(".video-extras-sparkbar-likes").style.width = rating + "%";
                    document.querySelector(".likes").innerText = likes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    document.querySelector(".dislikes").innerText = dislikes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }).catch((err) => {
                    console.error("[ReturnYouTubeDislikes] Something went wrong with fetching api:\n", err);
                });

                try {
                    for (let i = 0; i < data.alternative.tags.length; i++) {
                        document.cosmicCat.pageRenderer.add("#eow-tags", document.cosmicCat.Template.Watch.Content.tag(data, i));
                    }
                } catch(err) {
                    console.error("[Watch] Failed to load video tags.\n", err);
                }

                try {
                    if (ytInitialData.contents.twoColumnWatchNextResults.playlist.playlist) {
                        let data = document.cosmicCat.Utils.Sort.playlistData(ytInitialData.contents.twoColumnWatchNextResults.playlist.playlist)
                        document.cosmicCat.pageRenderer.add("#page", document.cosmicCat.Template.Watch.Content.playlistBar.Main(
                            data)
                        );

                        for (let i = 0; i < data.videos.videos.length; i++) {
                            document.cosmicCat.pageRenderer.add("ol.video-list", document.cosmicCat.Template.Watch.Content.playlistBar.barTray.trayContent.video(document.cosmicCat.Utils.Sort.videoData(data.videos.videos[i].playlistPanelVideoRenderer), data));
                        }
                    }
                } catch(err) {
                    console.error("[Playlists] No playlist loaded. Ignoring error.\n", err);
                }

                try {
                    const obj_sug = ytInitialData.contents.twoColumnWatchNextResults.secondaryResults?.secondaryResults?.results?.[1]?.itemSectionRenderer?.contents || ytInitialData.contents.twoColumnWatchNextResults.secondaryResults?.secondaryResults?.results;

                    for (let i = 0; i < obj_sug.length; i++) {
                        if(obj_sug[i].compactVideoRenderer) {
                            let videoData = document.cosmicCat.Utils.Sort.videoData(obj_sug[i].compactVideoRenderer);
                            document.cosmicCat.pageRenderer.add("#watch-related", document.cosmicCat.Template.Watch.Content.mainCon.sideBar.suggestedVideo(videoData));
                        }
                        if (obj_sug[i].continuationItemRenderer) {
                            document.cosmicCat.data.tokenSlot1 = obj_sug[i].continuationItemRenderer.continuationEndpoint.continuationCommand.token;
                        }
                    }
                } catch(err) {
                    console.error("[Watch] Failed to load suggestions.\n", err);
                }

                try {
                    if (ytInitialData.contents.twoColumnWatchNextResults.results.results.contents.filter(b => b.itemSectionRenderer)[1]) {
                        document.cosmicCat.toggleElm("#comments-view");
                        let con = ytInitialData.contents.twoColumnWatchNextResults.results.results.contents.filter(b => b.itemSectionRenderer)[1].itemSectionRenderer.contents[0].continuationItemRenderer.continuationEndpoint.continuationCommand.token;
                        document.cosmicCat.Comments.init(con);
                    }
                } catch(err) {
                    console.error("[Comments] Failed to load the comments section.\n\nUseful errors, if any:", err);
                }

                if (!data.alternative.id) {
                    document.querySelector("#player").remove();
                }

                document.head.querySelector("title").innerText = `${data.primary.title} - YouTube`;

                document.cosmicCat.player.Create();

                document.querySelector("body").addEventListener("submit", async (e) => {
                    e.preventDefault();

                    let comm = document.querySelector(".comments-textarea").value;
                    if(comm.length < 1) return;

                    document.cosmicCat.Ajax.post("/youtubei/v1/comment/create_comment", `createCommentParams: "${document.querySelector("input#session").value}", commentText: "${comm}"`).then(async api => {
                        if(api.actionResult.status == "STATUS_SUCCEEDED") {
                            let re = api.actions[0].runAttestationCommand.ids;

                            let comments = document.querySelector("ul.comment-list.all");
                            let comment = document.createElement("li");
                            comment.setAttribute("class", "comment yt-tile-default");
                            comment.setAttribute("data-author-id", re[2].externalChannelId);
                            comment.setAttribute("data-id", re[0].commentId);
                            comment.setAttribute("data-score", "-1");

                            let json = {authorText: {simpleText: document.cosmicCat.Storage.get("accountInfo").value.name}, commentId: re[0].commentId, contentText: {runs: [{text: comm}]}, publishedTimeText: {runs: [{text: "Just now"}]}, authorEndpoint: {browseEndpoint: {canonicalBaseUrl: document.cosmicCat.Storage.get("accountInfo").value.link}}};
                            let newc = document.cosmicCat.Template.Comments.Comment(document.cosmicCat.Utils.Sort.commentData(json));

                            comment.innerHTML = newc;
                            comments.insertBefore(comment, comments.children[0]);

                            document.cosmicCat.Comments.Form.uninit();

                            await document.cosmicCat.Ajax.post("/youtubei/v1/att/get", `engagementType: "ENGAGEMENT_TYPE_COMMENT_POST", ids: ${JSON.stringify(re)}`);
                        }
                    });
                    return false;
                });
            });
        }
        if(window.location.pathname.split("/")[1].match(/shorts/i)) {
            window.location.href = "https://www.youtube.com/watch?v=" + window.location.pathname.split("/")[2];
        }
        if(document.cosmicCat.Channels.isChannelsPage()) {
            (!/^featured|videos|playlists|community$/g.test(window.location.pathname.split("/").splice(document.cosmicCat.Channels.isUsertag() ? 2 : 3).join("/"))) && window.location.replace(window.location.pathname.split("/").slice(0, document.cosmicCat.Channels.isUsertag() ? 2 : 3).join("/") + "/featured");
            await document.cosmicCat.Utils.waitForElm2().then(async () => {
                //if (!ytData?.header?.c4TabbedHeaderRenderer) return;
                let revision = document.cosmicCat.Storage.get("channel_mode").value;
                const naviHash = document.cosmicCat.Channels.getNaviHash();

                (revision == "3") && document.querySelector("#page").setAttribute("class", "branded-page channel");

                (revision == "2" && /playlists/.test(window.location.pathname.split("/").splice(2).join("/"))) && window.location.replace(window.location.pathname.split("/").slice(0,2).join("/") + "/videos");

                let data = {
                    info: await document.cosmicCat.Ajax.Fetch(`https://www.youtube.com${window.location.pathname.split("/").slice(0, -1).join("/")}/about`, document.cosmicCat.Channels._Data.Info),
                    header: document.cosmicCat.Channels.Local.Header(),
                    content: document.cosmicCat.Channels.Local.Videos() || document.cosmicCat.Channels.Local.Playlists() || document.cosmicCat.Channels.Local.Community()
                };

                document.head.querySelector("title").innerText = `${data.header.name}'s ${localizeString("global.channel")} - YouTube`;

                revision = "Channels" + document.cosmicCat.Storage.get("channel_mode").value;
                const tab = document.cosmicCat.Channels.getCurrentChannelTab();

                document.cosmicCat.pageRenderer.set("#content-container", document.cosmicCat.Template.Channel[revision].Main(data));

                const list = {
                    "Channels3": {
                        "contentList": ".channels-browse-content-grid",
                        "contentListAddr": "primaryPane.browseVideos.listItem"
                    },
                    "Channels2": {
                        "contentList": ".scrollbox-page",
                        "contentListAddr": "playlistNavigator.Content.PlayPanel.Holder"
                    },
                    "Channels1": {
                        "contentList": "#profileVideos [style=\"border-bottom:none;\"]",
                        "contentListAddr": "mainCon.userVideos"
                    }
                };

                (revision == "Channels2") && document.cosmicCat.pageRenderer.add("body", document.cosmicCat.Template.Channel.Channels2.Stylesheet());
                (revision == "Channels2") && document.cosmicCat.Channels.load2Modules(data.info);

                if (revision == "Channels3") {
                    try {
                        document.cosmicCat.pageRenderer.add(".tab-content-body", document.cosmicCat.Template.Channel.Channels3.primaryPane[
                            document.cosmicCat.Channels.isCurrentChannelTab("featured") ? "featured" : "browseVideos"
                        ].Main(data));
                    } catch {}

                    try {
                        document.cosmicCat.pageRenderer.add(".tab-content-body", document.cosmicCat.Template.Channel.Channels3.secondaryPane.Main(data));
                    } catch {}

                    try {
                        for (let i = 0; i < data.info?.links?.length; i++) {
                            document.cosmicCat.pageRenderer.add(".profile-socials", document.cosmicCat.Template.Channel.Channels3.secondaryPane.firstSection.socialLink(data.info.links[i]));
                        }
                    } catch(err) {
                        console.error("[Channels] Failed to parse social links:\n, err");
                    }

                    try {
                        var a = document.cosmicCat.Utils.Sort.videoData(ytInitialData.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents.find(a => a.itemSectionRenderer.contents[0].channelVideoPlayerRenderer).itemSectionRenderer.contents[0].channelVideoPlayerRenderer);
                        document.cosmicCat.pageRenderer.add(".primary-pane", document.cosmicCat.Template.Channel.Channels3.primaryPane.featured.featuredVideo(a, data.header));
                        console.log(a);
                    } catch {}
                }

                data.content = (data.content.length == 0) && await document.cosmicCat.Ajax.Fetch(`https://www.youtube.com${window.location.pathname.split("/").slice(0, -1).join("/")}/${tab}`, document.cosmicCat.Channels._Data[tab.charAt(0).toUpperCase() + tab.slice(1)]) || data.content;

                try {
                    // shit doesn't work >:c
                    //document.cosmicCat.Ajax.post("/youtubei/v1/creator/get_creator_channels", `"channelIds":["${data.header.id}"],"mask":{"channelId":true,"contentOwnerAssociation":{"all":true},"features":{"all":true},"metric":{"all":true},"monetizationDetails":{"all":true},"monetizationStatus":true,"permissions":{"all":true},"settings":{"coreSettings":{"featureCountry":true}}}`)
                    (revision == "Channels1") && (document.querySelector("[name^=\"channel-box-item-count\"]").innerText = data.content.length);
                } catch(err) {}

                try {
                    for (let i = 0; i < data.content.length; i++) {
                        document.cosmicCat.pageRenderer.add(list[revision].contentList, list[revision].contentListAddr.split('.').reduce((o,i)=> o[i]||"", document.cosmicCat.Template.Channel[revision])[document.cosmicCat.Channels.getCurrentChannelTab()](data.content[i], data.content.length));
                    }
                } catch(err) {
                    console.error("[Channels] Failed to parse local content data:\n", err);
                }

                (revision == "Channels2") && (document.querySelector("#playnav-play-loading").style.display = "none");

                (revision == "Channels3" && data.content.length == 30) && (
                    document.cosmicCat.Channels.Channels3.Pagination.load()
                );

                document.cosmicCat.Utils.waitForElm("#video-player").then(() => {
                    document.cosmicCat.player.Create();
                });
            });
        }
        if(window.location.pathname.split("/")[1].match(/results/i)) {
            document.cosmicCat.Utils.waitForElm("#watch-page-skeleton").then(async () => {
                var searchpar = document.cosmicCat.Utils.escapeHtml((new URL(document.location)).searchParams.get("search_query"));

                document.querySelector("#page").classList.add("search-base");
                var results = ytInitialData?.contents?.twoColumnSearchResultsRenderer?.primaryContents?.sectionListRenderer?.contents[0]?.itemSectionRenderer?.contents || [];

                document.cosmicCat.pageRenderer.set("#content-container", document.cosmicCat.Template.Search.Main(searchpar));

                for(let i = 0; i < results.length; i++) {
                    if(results[i].videoRenderer) {
                        let videoData = document.cosmicCat.Utils.Sort.videoData(results[i].videoRenderer);
                        document.cosmicCat.pageRenderer.add("#search-results", document.cosmicCat.Template.Search.videoRender(videoData));
                    }
                    if(results[i].channelRenderer) {
                        let channelData = document.cosmicCat.Utils.Sort.channelData(results[i].channelRenderer);
                        document.cosmicCat.pageRenderer.add("#search-results", document.cosmicCat.Template.Search.channelRender(channelData));
                    }
                    if(results[i].playlistRenderer) {
                        let playlistData = document.cosmicCat.Utils.Sort.playlistData(results[i].playlistRenderer);
                        document.cosmicCat.pageRenderer.add("#search-results", document.cosmicCat.Template.Search.playlistRender(playlistData));
                    }
                }

                var a = ytInitialData.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.subMenu.searchSubMenuRenderer.groups;

                var temF = (data, b) => document.cosmicCat.Template.Search.dropdownFilter.Con(data, b, searchpar);

                for (const b in a) {
                    var temC = ``;
                    for (const c in a[b].searchFilterGroupRenderer.filters) {
                        temC += temF(a[b]?.searchFilterGroupRenderer?.filters[c]?.searchFilterRenderer?.navigationEndpoint?.searchEndpoint?.params, a[b].searchFilterGroupRenderer.filters[c].searchFilterRenderer.label.simpleText);
                    }

                    document.cosmicCat.pageRenderer.add("#filter-dropdown", document.cosmicCat.Template.Search.dropdownFilter.Main(a, b, temC));
                }
            });
        }
        if(window.location.pathname.split("/")[1].match(/playlist/i)) {
            await document.cosmicCat.Utils.waitForElm("[id=\"watch-page-skeleton\"").then(async () => {
                let data = {
                    header: document.cosmicCat.Playlists.Local.Header(),
                    content: document.cosmicCat.Playlists.Local.Videos()
                };

                if(data.header.owner.id) {
                    data.creatorInfo = await document.cosmicCat.Ajax.Fetch(`https://www.youtube.com/channel/${data?.header?.owner?.id}/about`, document.cosmicCat.Channels._Data.Info);
                }

                document.cosmicCat.pageRenderer.set("#content-container", document.cosmicCat.Template.Playlist.Main(data));

                try {
                    for (let i = 0; i < data.content.length; i++) {
                        document.cosmicCat.pageRenderer.add("ol", document.cosmicCat.Template.Playlist.primaryPane.listItem.video(data.content[i], data.header.id, i+1));
                    }
                } catch(err) {
                    console.error("[Playlists] Failed to parse playlist content:\n", err);
                }
            });
        }
        if(window.location.pathname.match(/\/feed\/explore/i)) {
            document.body.setAttribute("class", "ytg-old-clearfix guide-feed-v2");
            document.head.querySelector("title").innerText = "Videos - YouTube";

            document.cosmicCat.Utils.waitForElm("#watch-page-skeleton").then(() => {
                document.cosmicCat.Browse.Renderer.render();
            });
        }

        console.info("Loaded page in: ", startTime - new Date().getTime(), "ms" );
    }, 1);
});

// Need to merge handleButton and handleSubscribeButton together
YabaiComponent.addHandler("click", "yt-uix-button-default", document.cosmicCat.Actions.handleButton);
YabaiComponent.addHandler("click", "yt-uix-button-text", document.cosmicCat.Actions.handleButton);
YabaiComponent.addHandler("click", "yt-subscription-button", document.cosmicCat.Actions.handleSubscribeButton);
YabaiComponent.addHandler("click", "subscribe-button", document.cosmicCat.Actions.handleSubscribeButton);
YabaiComponent.addHandler("click", "masthead-user-menu-expander", document.cosmicCat.Actions.handleExpander);
YabaiComponent.addHandler("click", "guide-item-container", document.cosmicCat.Actions.handleGuideItem);
})();