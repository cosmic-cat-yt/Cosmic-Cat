// ==UserScript==
// @name         Ciulin's YouTube
// @namespace    https://www.youtube.com/*
// @version      0.5.35
// @description  Broadcast Yourself
// @author       CiulinUwU
// @updateURL    https://github.com/ciulinuwu/ciulin-s-youtube/raw/main/Ciulin's%20YouTube.user.js
// @downloadURL  https://github.com/ciulinuwu/ciulin-s-youtube/raw/main/Ciulin's%20YouTube.user.js
// @match        https://www.youtube.com/*
// @exclude      https://www.youtube.com/tv
// @exclude      https://www.youtube.com/signin_prompt*
// @icon         https://www.google.com/s2/favicons?domain=youtube.com
// @require      https://github.com/ciulinuwu/ciulin-s-youtube/raw/main/modules/yabai_component.js
// @require      https://github.com/ciulinuwu/ciulin-s-youtube/raw/main/modules/open_uix_components.js
// @require      https://github.com/ciulinuwu/ciulin-s-youtube/raw/main/modules/translations.js?v=1
// @require      https://github.com/ciulinuwu/ciulin-s-youtube/raw/main/translations/english.js?v=1
// @require      https://github.com/ciulinuwu/ciulin-s-youtube/raw/main/translations/dansk.js?v=1
// @require      https://github.com/ciulinuwu/ciulin-s-youtube/raw/main/translations/polski.js?v=1
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
// @run-at document-load
// ==/UserScript==
/* jshint esversion: 10 */

(async () => {
    'use strict';
    function debug(a) {
        return console.debug(`[Ciulin's YouTube] ${a}`);
    }
    function error(a) {
        return console.error(`[Ciulin's YouTube] ${a}`);
    }
    var BOOL_LOGIN;
    var BOOL_SUBSCRIBE;
    var commCount = 1;
    document.ciulinYT = {data: {}, func: {}, load: {}};
    const translations = Ciulinations.listTranslations();

    const localizeString = (varr) => {
        if(!varr) return "";
        let lang = document.documentElement.getAttribute("lang");
        if(!lang || lang.length !== 2) return "";
        varr = varr.split(".");

        if(!translations[lang] || !translations[lang].json[varr[0]] || !translations[lang].json[varr[0]][varr[1]]) return translations.en.json[varr[0]][varr[1]];
        return translations[lang].json[varr[0]][varr[1]];
    };

    document.ciulinYT.data = {
        version: 1,
        loggedin: false,
        playerSettingsSheet: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAANCAIAAADntZOlAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAlSURBVBhXY/j//z/Tv39/gfgfnP7/H8GGif8H0r9//WT69uUTAPDNJqPDjzoaAAAAAElFTkSuQmCC",
        playbarScrub: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAD5SURBVChTjZHNjkRQEIUP4p+dVe/EC9iJhQgvLlYsvQC2JFaIIOH21G09s5CZnpNclZz66kdKwKVt21hd1xiG4XJechwHnudBVVXO8s88zyzPcxzHAUH47sHFGIMkSYjjGJZlCQJ1LooC+75D0zSs63qLJEVREIYhxKZpeGcyoiiCLMu3+LUOzvMEsWLXdTAMg5u/iXLE9H0PkXYk468Cmk6Ppoj0Q58K3nli+Ur/LSBW1HWdj/pUQAyxYpqmqKqKm+M44vF43CLliCGWX6ltW0ZGEAQwTZN3fWtZFpRlCd/34bruz1np2lmWYZqmy3nJtm0kScKvDABP3bl3Ot4gE8wAAAAASUVORK5CYII=",
        playbarSheet: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAZCAIAAAB/8tMoAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAhSURBVBhXY7h69SoTCDAzMxNNMzAwgNmMjIyEMMP///8BIN0GJrVyhfoAAAAASUVORK5CYII=",
        playerSheetB: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAADLCAYAAACYqDZvAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAABaOSURBVHhe7Z0J1FVT+8D3vYq8bxpJ6C3RKM2Tpq9oklqEUn2t8CeLaDCUhcoyfFmL9PmoKGItlimfEhJJ6JMopAlFkwyZEmVKOP/9ezr7du7tvufec4fX7d79W+tZ7xn23ue9+zl7fPZ+jurXr58zbtw4p2fPno7KEJdcconz+OOPO0OGDMlYmoVCaOLEic7evXtV5cqV1ZdffqkWLVqk1q9fH3Lvp8SSJUucww47TCHvvPOOmjp1qlq7dm1aaRYK4V27dqlffvlFbd++XVWsWFFdeOGFqnv37mm92Ycccoj6448/1M8//6yaNWumZsyYoQYPHmxLSxKE//rrL+U4jshPP/0kitEKUVdccYVTv379lDKRNI38/vvv6s8//1Rjx45FMU6TJk2sYnwIG2UYIfOoukxp6datW+AMjE0TobQ0bdpUzZw5U5133nlWKaUQdv8eABn49ddfK93YS2k58cQTk87EeApBaKtQuO5EqHvvvddp3LixVUwMB5QQr5jSUlxcrC666CLVtWtXp1atWgkz0VtlxQpp7t69W0rLfffdpwYMGOCUlJRYxbj4KsSIaVt69OihDj/8cDdq6cRLI1ZoW1AQbUu1atXcmJakFILwZm/ZskV6ZImIFz+eoBAUTU/Pso+kFfL555+rp59+WtqBRMSLH0/ef/99NWLEiKSUXCiU2qgb9uzZo95880310ksvqUMPPVSFQonHd942I578+OOPavr06Wr8+PFS8pJJs1AIXXrppaU2qF988QWjbslE3etKOte08kpNc/Xq1equu+6SdkmL1UQMcaus3377TUrFwoULVfny5QMpA+KlSTvBiH3ChAlS7VllxOcAhVAq5s6dKw24zrjQ999/HzjjYquoVatWqVGjRsk8GWnu2LHDKqMUZC4LRVAqli1bJqUiHA4HLhVe6DmRJuMNRuYTJ06UtiidNAuG6tWrO61atXKOOOIIR48xMjJAO+GEE2Tq/eijj3aKiorsoC8IFStWZKpcFOJeShvSqlChglOpUiWrDIvFYrFYLBZLDhAaP368U7NmTTn56quv1KRJkyKDN7978Zg3bx6WRTnetGmT6t+/fyS83z3LfsKMoD/55BMRjr343YtHjRo1ZCYX4diL3z3LfkQhZh4rnkJKuxcPlv6Y+SuOvfjds+zngMlFL3734uEX3u+eZT8JDVRB8Mt0v3uW/WS0hJgqyYgXv3uW/dgqK8ewCskxrEJyjIw26n7thN89y35sCckxrEJyjIwqxK9a8rtn2Y8tITlGqFq1arIf0LB9+/bILKzfvXjUrVvXYeuCYd26dZHwfvcs+wmx6sT7xnrXTvndiwerTbzhvasT/e5ZLBaLxWJJn1IbVtb74t0BMLuuXLkyo41wp06dnKOOOkqOv/nmGxZ620ZeU2omjBo1yqldu7Ycb9u2DfcYGc2wWbNmOW3btpVj3G8MHz7cKkQTd3KxUaNGLL6WvSIIx1xzb6fNySef7OByQ3ejRTjmmnu7oBGFtGvXzmnRokUkQ1iuQ0YxbkA45hrOAxDCEscNnhB8p5xyyimR8PpYdlGZ9DnmmoGw6fpbOViRauLWW29lH4esBvn222/Fiw+bbbxQ39OW8LdcuXKyc/bRRx9VGzZs8K1qePNxEFCpUiVR7ObNm9Vxxx0nW+W8VKhQAS9E7C0RRwVsJGKHbqGN6MMDBw50UMLWrVvFawO7p1CGeXuN0PByjzCEJQ5VTSL69esn8VEmCq9bt654C4qdbETB3CMMYYlD3EIjzFZnMoQMYIsyGYN8+OGHav78+bLfECGTuE4YwhKHuImoU6eOhDdChvP2v/DCC+qGG25Qo0ePFkHR3POGJW6hEX7uuefkbfeiqyH19ttvS0mhfkfoCXlhTyJxE8Gu248//jgqo9nzPm3aNKmiUATyyCOPRIVBacQtNMLU7ZQEU00gn376qfgfwa8J7QmCZyBvhj377LPSLiSCtgHvP/TWTPXE3vfY9HkBzH3kqquukriFRlhnVIgBIG+8yWzvsREafe853hf4mwjSJ663XYpVLhKbPiWkED08SLe3d+/e6sgjj4xkRr169aIyBzn++OOjzk8//fSkM4w2wptmhw4dotJC2rRpE3VOCeFvoXHIsGHD2L4ctZi6pKREznfs2CGZwhikVatW0qAbqlevLi6WtmzZcrN7KS633Xab07Fjx6i49KZ++OEHcWhD+npMg5c5KSUGXoDvvvsO55m+6ecboR49eji8vV4YZ7BlADd/gF8Sur30grzQ69KNsW8xwQUtfra80H0m881YhE4DadF2eGEbxMiRIwuq3grhOGDAgAHuaTDmzZtHe+CbYbVr13buv/9+9ywYVHW6h1Z4CqH6AbqfVENdu3aVasUL99577z05PvbYY6WRpru8c+dO3wwj/ZYtW8rxmjVrZLR+9dVXK6oxL3gJeuyxx+SYAScNP89LlH6+IT8Wezd/qUJwNoNLjDPPPJNLEejmmnaGKobRtlZKUpkVm36DBg0cXDR5ufLKK6VahKDp5xPSy+KHI8bzD91e45QG4Rhl6LFKCNH1vYQnbDLEps/bbxzUIByjjFTTzydK/dG6l+MY55Q6I5m/ymgGMaNrqkVcQemBYUEqIJZSM6G4uNgxXVWqD133ZzTDsp2+xWKxWCyFRlRD2qVLF+zlMh1uoLuLE8s33njDNrplQCSTL7jgAuekk06SST/vnBLzTlWqVBEL4sMPP2yVkmVkYNinTx9Zg8XsKxOJTPTdfvvt8pdzrnOfcBLLkjXCDNCYV9q5c2dk5IygAO859wlHeDeuJQuEmzdvLlMZsaCEWAhHeEv2CGPz8JaERGJsJJbsEP7111/jZnxpQnhL9jhg06dXmIGNd92SPcLGrh0rvXr1UgsWLBAjlPc64S3ZI/zRRx+5h9FgUz/ttNNEKd4FEKWFt2SGEP7ZMbE2atTIvbQftiGw8sQsGWWlIZ8p2rVrlx0gZgnJWBznN2nSRLVu3VouemEFCqtNsG9/8MEHWBOtMrJIJHOLiopkixn7NLxLRDHfssyTtgTTqnvZUhbgKCAcDtONigjnXOe+xWKxWCwWi8VycBJi3zmmWwaFyXya28CsL5+w4GORmzZtsuOTDBEaOnSo061bN8nc2P0ffjCCZ2pl3bp1uMmwCskQoeuuu85hiwAwk7tixQo5BqyD7J5iQ+jSpUsjk4xs/G/fvr0cszFz8uTJViEZIszSfzO1/sorr8hUCTBVwjnXly9fHpl25z5KM7YS71Y1S/ocotuOmzhAAVQ/p556qmJvSIMGDaRNoQTw5ej69eurYcOGSanBjMvyIOa8UIhWUEHtA8wmEYshe0LYScWGT5TDWizaFtoJFIOCuE47ww6rWrVqRUqWJXNEFMIbz7YAfGNx/tlnn4n7C9oPNmiy8Z/rnLO3kPsmriVzRBTCvkG2nNE+IGxhw3MPJYRuMdUZ13GLgZsN72oVS+YIG68NtAVnn322bMp89913pWoaOHCg3PvHP/4h7QXX6R73799fzrlHfEvmCPXu3TuytYxvFvLms0qRDKdnRS+MxdcNGzaUaov2BCWwqR/YjrZw4ULb7c0Q4tnauNYICuOS559/Hru7VUim0O2GWAZTFT1i568lQ4RptJkGSQWczxDfYrFYLBaLxWLJA/A617x58zIbbwwePNhp3759QY5vfEfYDRs2dIwzM1bAX3PNNVkdkeOW/OKLL5a5M2aeW7RoUXAzALItOh6tW7d2zjnnHJlSwZsc7sWzSbdu3ZxbbrlFFnszwWksl4VGXIWcddZZzqBBg2SuioyJnWZnQhJxT1XLli0dvJu6p4G5/PLLnSlTpoijf1wMxj4PpwaIe4qBzLnppptSfl4uE+rcubPDNLsXZnvNbK6XadOmhTp27Oj06dNHzvGIjdKYtmdWGC+is2fP9q1mdKlzbrzxRvdsH6QRbzOpLjUhnbZz/fXXyznxcGZASWIG+sUXX+Q4r6o1cTWOb3avYKo1b6lXgL3qVF/YRZglxjZCeJSYzHY3HBLgoc4rVFFeN+NGALfnuADEo8S1116rbr75ZrmHAvHBkm+E+aHxMj+ewO7du+W7Iaw6YbsbyuCtffLJJ8WsmwjCxks7ngA2maFDh8qLwjWUQTU6fPhwHOJImHwijGUwNiNKE9CKCOF1mlle8yZTfXBNl5KE1Qfh46UdT4DnYULG+7a5jhGNfZHJPO9gw3efeqxA48aNHdyC0w3GcmhMwPiCp7GVQD4EVQjjkUmTJokSKBmmk4FbWcYrEiiPCFOHUy14JTZjjAALIaiaUATfDzHfH6ETwL1EYPJlJ69XTEmLFWA5EitdkLFjx4pQfVH1YXLON2RbdGwPh7EHDbbXkRnMnDlTwpuMN5mGctjXTrui0/KtRipXruyQmV7Ykk0PKtbYpUsdn9KIeN7GlxdQzVKN4Q070fMONsK6CgjpLmuUkGFz5sw5oLcFhDdvMHU4wrotelnJZI5+0w94HiVu5MiR0m2OfR7hUQSiS7M4Y6a6pEeXb8qAuANDMgGzLmuzcBbgzSAwinBPZZEDinJPA6MzG8XIN0MWLlwYVWWBUYR7SvUoHrDd07wi4Y/Sb6Nj6upt27ZlPRN0NSl+H2H58uV5melpgxdqxD3NOixNQtxTi8VisVgsmcKacMsO326lNeGWPdaEm2OkZMLNNIlMuIVEYBOue5gyQU247mHBENiEmy5BTbiFRmATbroENeEWGoFNuOnCmx8v7XhSiAQ24aaLVYg/gU246RLUhFtoBDbhuocpE9SE6x4WDIFNuOkS1IRbaKRkws00iUy4hUTCKsGacHMQa8K1WCwWiyVPsCbcssO3W2lNuGWPNeHmGIFNuO6GHb7sxhemM1Kt+JlweTHGjRvn6FLj1KlTJ++rscAmXMLzfUPmu2bPns3mnUDVSlAT7pAhQ5wxY8bIJiFdZZbJbMHfSWATLp/OY6MMhi32/dWqVSvQWxvUhMvcFp61KT044iwpKcnrUhLYhMu+kI0bN0rVYjZiBiGoCVcrLLR48WJxY8uuKXM9X0nZhMs5VVvs9UTw5nvT9BMDM8GcU5K81/ORlEy4bdq0kXOcB5iqJVlSUQieIjhfu3Zt4OcdbAQy4eoqysG1Bu0O7UwqJSSICbdmzZp0OBw+BEDbZgxY+UwgE+7cuXPFaT+frCAjQSsmUK8niAn3/PPPl/3peHJ44oknpAuOIwH3dl4S98eRabyhPXv2FOUYnnnmGWlc6QgUFxeLv9+gColHlSpVHJQ/YcIEVa9ePfeqeAE64HkFqRCoWrWqwxvZqVMn6W7CAw88kLXMqFatmjwP2zovAvTt2zevMz8eCX+wNeHmINaEa7FYLBZL7pNULwYTLiPz1atXR4XHqMQ0ypIlS8TdH2zevDntnhEmXEb0sb2sQYMGOXxj8cEHHxRfjJBv3+H1/TGJTLi9evXCUCWj6aeeekoGcDojU86gRCbcMWPGiOGMwSK2EWw2mXgBsgnGPi2qTp067pV98EKxVFdL1P9f6o/BUqczXL6ig+NLmDp1alR4RvS4jMV5GTOxfKpVPyilDKK0jR49Wh1zzDEyuwtaMVFpMaK/88475SOXfLpP/z+YllN6XrZp1qyZWEF5of2gduHlWrNmjfyOtEy4WiHqtddek4lADEg4MkuFZE24PA+FcK9Dhw7yZdJchBeVGqNz585Smv2EMIQlDnHDmGTvvvvuKKEa4oufZE4sZAKTgd27d49kGjPEVFd4Jk0EJtxVq1ZFCXNWlEL+QaMMkzal4dxzz1WjRo2Sa3iWW7lypfxv7dq1kzC5xowZM+TTtLGZX5oQljiQtgkX/4vYRbhPW5KIdE24PE8Xb7nP10lzDV7wvn37Rv2OX3Uts/T229WyO+4QWfqf/6gfdB4z623CEIe4GTHhMn1v7iciEyZclMhfXqZcY+qQIVFv/x+6PZyjG/XNt96qtt1yi8jmCRPU3DPOUOXLlYsKS9yMmHBNJtPmJIK3waSXSAyxJlxTgvnfc40ap58elcn/+9e/lO6BKFq7qq5wXP6jj9Sb//53VFjiZsSEW7VqVTmntCUiFYXEmnCpqjjn+blGOV1tmwzmf/1Gd20x8/Hq8NVghGOurdXKIowJT9yMmHDNt9Vx1J+ITJhw9XhF7vMF61wj9jcwfqPeYODgFa6hFH6PN3zaJlwaWUbPxtM1db7cKAW6d+mYcCtUqKB0T1CqK4xZ+iXIqXHIxx984BTp7jkwhlt7221q3fTpch5L3QEDVId77hFFwC8//hh8Fy71+euvvx6pv9u2bSsJ0vPhH0hE0F24Ory6Q/dMKMnA5zFQijEn5xrrdY/QVEHkUYOLL1Z7dI1yQAnR11pcf72EMeGJG2gXrlaQODTWPSxxpFxSUiJvN5lGzyvVr0aXtgsX+zlp6s6CPLdVq1YMWmXx98svvywOld0kcoYV//1vJIORQ2vUUP+nq9Y6550XUUb1005TF+r2sEi3hV6FEDfhD/Iz4TZt2tRBKcuXL5cMREnurZTxM+HqvrqDjZ/JRUpMJp6XaQboZuEyXXUfr7voBqp52hLjM5+Xj2GDqapg64cfqhm66k/qBxnzre52RoUvKipySJiP3uuRdsYyx5hvda8tKk3+D7rWTNFQ1bqXc4pDy5d3ah5zjFT5yY6TaBuZjfhq+/bkFGIJRof27Z29uiq6bMQIpXul7tX4LFu2TM247z4ZJL6lawSrkCxQv359qTkozWzdYAKxS5cu7t198LmmpUuXqldffVV6s1RpulNjFZItUAoNNYoxDbfpOdIbxd5DxwlFcIwy5J6EsGSFevXqyQpQxCjDgFJo7BHdQ43oITRt2rTokBo9JkhKUanE1aPrA+LokXdSz0sn7sFCmMFYrCRLKnEZs8RKsqQT92AhNHr0aHnr7tFDeA/JvnWRNxbzK+h0fOPqhkzi0NB5CPw8GkTQ6eRXCTGjcA0/zEiyROJ40vHF1KmatJ7nSSev8CokLZJNp6yf93fD+oSHHnrIWbx4cZRwjXtusCi4mIlflmw6Zf28vwVWnSxatIjxiK8QhrButEDVhSVJMDEwvxe7Fqs0WKPVvn17OimhUl1rWFInnVUntoRkGFaOLFiwwD3bB23dhpUr1S8//yznRcXFqmGrVgfYj8444wyrkEzz/vTpzvH//Kd7tk8ZL8+Zo/ZWqCBTJECpKP/bb6r3gAFybtj6+ONWIZnmi02bnMNcEy58tW2b+njrVrFyMk0CdNcxm9eqWVOd6O7fhD16oBueMmUKyzjT7q0km86KFSscxD1NmUylk2liV51s3bhR7DdMIjKZaCYU2VXMjgHCmPCy6mTDhg0KSZdk0+GfMFsX0iFT6WQaM2A1UnzEEaKEWLjGPao0b/gyHxiaB6dLptLJNLu//z7yxiM1XPN3PKpWqRIVlrih4cOHSy6avegwbty4pNqWyZMnRzRgSsesWbN8486fP1/ieFeud+jQIannvfXWW5HnmdLRr1+/nGoHn7v/fqd5797umaxJUBvXr1d7dIZ7Obx8eVWvUSMxYpkXefXChftXnZgqJ5lqx5BKHFOS2GxjJFm8cZItkWVN7KoT1qvVb9xYHVm1qirWbQnCMcqgYY+36iTer0r2rUslblk/r0wpk1UnluRJd9WJnTrJML/v3Rs6TitkxGWXyUIGb/UVTwhDWOIQ15aQLGBXneQgdtVJDhJ81YlS/w/H7AjFAOLO5QAAAABJRU5ErkJggg==",
        playbarShadow: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAZCAIAAACZ2xhsAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAA6SURBVChTY1y2bJm4uLiAgAA3NzcTAxgwggGIA2UBwWCRgQAMZXCA0AMECBkEB8gCkthkIIB0AxgZAbxaA1A95vt3AAAAAElFTkSuQmCC",
        playbarSeeker: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAaCAYAAAB2BDbRAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABQSURBVBhXbYqxDYAwEANP7kkmyDBZiDYTsUK2oosUpTK8oEK4OFu22UsxB1gJ0HaDs3eHQ2vNqrWinDNKKU6htZZlmy9ifNIYA8053+4fcAGeySL/5lJgnAAAAABJRU5ErkJggg==",
        playbarSeek: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAECAIAAADAusJtAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZSURBVBhXYzhy5AiToKAgw5s3bxi+f/8OADiwCCtHhAKiAAAAAElFTkSuQmCC",
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
    };
    document.ciulinYT.load = {
        recent_feed: async () => {
            var test = new Promise(async resolve => {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", `https://www.youtube.com${window.location.pathname}/community`);
                xhr.onload = async () => {
                    let a = JSON.parse(xhr.response.split("var ytInitialData = ")[1].split(";</script>")[0]).contents.twoColumnBrowseResultsRenderer.tabs.find(b => b.tabRenderer ? b.tabRenderer.endpoint.commandMetadata.webCommandMetadata.url.split("/")[3] === 'community' : {});
                    if(!a.tabRenderer) return resolve({});
                    let sortImages = async (img) => {
                        let stor = "";
                        for (let i = 0; i < img.images.length; i++) {
                            stor += `<img src="${img.images[i].backstageImageRenderer.image.thumbnails[0].url}"/>`;
                        }
                        return stor;
                    };
                    let video = async (vid) => {
                        let {id, title, time} = await document.ciulinYT.func.organizeVideoData(vid);
                        return `<div class="playnav-item playnav-video">
<div style="display:none" class="encryptedVideoId">${id}</div>
<div class="selector"></div>
<div class="content">
<div class="playnav-video-thumb">
<a href="https://www.youtube.com/watch?v=${id}" onclick="document.ciulinYT.func.loadPlaynavVideo('${id}');return false;" class="ux-thumb-wrap">
<span class="video-thumb ux-thumb-96 ">
<span class="clip">
<img src="//i1.ytimg.com/vi/${id}/default.jpg" alt="Thumbnail" class="" onclick="document.ciulinYT.func.loadPlaynavVideo('${id}');return false;" title="${title}">
</span>
</span>
<span class="video-time">${time}</span>
</a>
</div>
<div class="playnav-video-info">
<a href="https://www.youtube.com/watch?v=${id}" class="playnav-item-title ellipsis" onclick="document.ciulinYT.func.loadPlaynavVideo('${id}');return false;">
<span dir="ltr">${title}</span>
</a>
<div style="display:none" id="playnav-video-play-uploads-12">${id}</div>
</div>
</div>
</div>`;
                    };
                    let filter = async (j) => {
                        let img = j.backstageAttachment;
                        if(!img) return '';
                        let stor = "";
                        for (const obj in img) {
                            switch (obj) {
                                case 'postMultiImageRenderer':
                                    stor = await sortImages(img.postMultiImageRenderer);
                                    break;
                                case 'backstageImageRenderer':
                                    stor = '<img src="' + img.backstageImageRenderer.image.thumbnails[0].url + '">';
                                    break;
                                case 'videoRenderer':
                                    stor = await video(img.videoRenderer);
                                    break;
                            }
                        }
                        return stor;
                    };
                    let b = a.tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents;
                    let j;
                    let data = [];
                    for (j = 0; j < b.length; j++) {
                        if(!b[j].continuationItemRenderer && !b[j].messageRenderer) {
                            data[j] = {};
                            let post = b[j].backstagePostThreadRenderer.post.sharedPostRenderer ? b[j].backstagePostThreadRenderer.post.sharedPostRenderer.originalPost.backstagePostRenderer : b[j].backstagePostThreadRenderer.post.backstagePostRenderer;
                            data[j].text = post.contentText.runs ? post.contentText.runs[0].text : "";
                            data[j].images = await filter(post);
                            data[j].author = post.authorText.runs[0].text;
                            data[j].timestamp = post.publishedTimeText.runs[0].text;
                        }
                    }
                    resolve(data);
                };
                xhr.onerror = () => {
                    console.error("** An error occurred during the XMLHttpRequest");
                };
                xhr.send();
            });

            let a = await test;

            return a;
        },
        channel_videos: async () => {
            var test = new Promise(async resolve => {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", `https://www.youtube.com${window.location.pathname}/videos`);
                xhr.onload = async () => {
                    let a = JSON.parse(xhr.response.split("var ytInitialData = ")[1].split(";</script>")[0]).contents.twoColumnBrowseResultsRenderer.tabs.find(b => b.tabRenderer.endpoint.commandMetadata.webCommandMetadata.url.split("/")[3] === 'videos');

                    if(!a.tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].gridRenderer) return resolve([]);

                    let b = a.tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].gridRenderer.items;
                    let data = [];
                    for (let j = 0; j < b.length; j++) {
                        if(!b[j].continuationItemRenderer) {
                            let videoData = await document.ciulinYT.func.organizeVideoData(b[j].gridVideoRenderer);
                            data[j] = videoData;
                        }
                    }
                    resolve(data);
                };
                xhr.onerror = () => {
                    console.error("** An error occurred during the XMLHttpRequest");
                };
                xhr.send();
            });

            let a = await test;

            return a;
        },
        channel_subscriptions: async () => {
            var test = new Promise(async resolve => {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", `https://www.youtube.com${window.location.pathname}/channels?view=56&shelf_id=0`);
                xhr.onload = async () => {
                    let a = JSON.parse(xhr.response.split("var ytInitialData = ")[1].split(";</script>")[0]).contents.twoColumnBrowseResultsRenderer.tabs.find(b => b.tabRenderer.endpoint.commandMetadata.webCommandMetadata.url.split("/")[3] === 'channels');
                    let master = {array: [], length: 0};
                    if(!a.tabRenderer || !a.tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].gridRenderer) return resolve(master);
                    let list = a.tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].gridRenderer.items;

                    let fetch = async (url) => {
                        let a = await document.ciulinYT.func.getApi("/youtubei/v1/browse", `continuation: "${url}"`);
                        await loop(a.onResponseReceivedActions[0].appendContinuationItemsAction.continuationItems);
                        return a;
                    };

                    let loop = async (obj) => {
                        for (let i = 0; i < obj.length; i++) {
                            if(obj[i].continuationItemRenderer) {
                                let te = obj[i].continuationItemRenderer.continuationEndpoint.continuationCommand.token;
                                await fetch(te);
                            }
                            if(obj[i].gridChannelRenderer) {
                                master.array.push(obj[i].gridChannelRenderer);
                                master.length += 1;
                            }
                        }
                    };

                    await loop(list);
                    resolve(master);
                };
                xhr.onerror = () => {
                    console.error("** An error occurred during the XMLHttpRequest");
                };
                xhr.send();
            });

            let a = await test;

            return a;
        },
        channel_info: async () => {
            let test = new Promise(async resolve => {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", `https://www.youtube.com${window.location.pathname}/about`);
                xhr.onload = async () => {
                    let a = JSON.parse(xhr.response.split("var ytInitialData = ")[1].split(";</script>")[0]).contents.twoColumnBrowseResultsRenderer.tabs.find(b => b.tabRenderer ? b.tabRenderer.endpoint.commandMetadata.webCommandMetadata.url.split("/")[3] === 'about' : {});
                    if(!a.tabRenderer) return resolve({});
                    let b = a.tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].channelAboutFullMetadataRenderer;
                    let collection = {name: {}, string: {}};
                    collection.string.BIO = b.artistBio ? "<br/><br/>" + b.artistBio.simpleText.replace(/(?:\r\n|\r|\n)/g, "<br/>") : "";
                    collection.name.COUNTRY = b.countryLabel ? b.countryLabel.runs[0].text.replace(/(?:\r\n|\r|\n)|( )|:/g, "") : undefined;
                    collection.string.COUNTRY = b.country ? b.country.simpleText : undefined;
                    collection.name.JOIN = b.joinedDateText ? b.joinedDateText.runs[0].text.split(" ")[0] : undefined;
                    collection.string.JOIN = b.joinedDateText ? b.joinedDateText.runs[1].text : undefined;
                    collection.name.VIEWS = b.viewCountText ? b.viewCountText.simpleText.split(" ")[1].charAt(0).toUpperCase() + b.viewCountText.simpleText.split(" ")[1].slice(1) : undefined;
                    collection.string.VIEWS = b.viewCountText ? b.viewCountText.simpleText.split(" ")[0] : undefined;
                    resolve(collection);
                };
                xhr.onerror = () => {
                    console.error("** An error occurred during the XMLHttpRequest");
                };
                xhr.send();
            });

            let a = await test;

            return a;
        },
        home_category: async(category) => {
            if(!category || window.location.pathname !== "/") {
                window.location.href = "/?c=subscriptions";
                return;
            }
            var guide = document.querySelector(".guide");
            if(guide.getAttribute("data-last-clicked-item") == category.getAttribute("data-feed-name")) return;
            guide.setAttribute("data-last-clicked-item", category.getAttribute("data-feed-name"));
            document.querySelector(".selected-child").classList.remove("selected-child");
            document.querySelector(".selected").classList.remove("selected");
            category.parentNode.classList.add("selected-child");
            category.classList.add("selected");
            document.querySelector("#feed-loading-template").classList.remove("hid");
            document.querySelector("#feed-main-youtube").classList.add("hid");
            document.querySelector("#feed-error").classList.add("hid");
            var url = category.getAttribute("data-feed-url");
            var xhr = new XMLHttpRequest();
            xhr.open("GET", `https://www.youtube.com${url}`);
            xhr.timeout = 4000;
            xhr.ontimeout = () => {
                console.error("** An error occurred during the XMLHttpRequest");
                document.querySelector("#feed-loading-template").classList.add("hid");
                document.querySelector("#feed-error").classList.remove("hid");
            };
            xhr.onload = async (e) => {
                document.querySelector(".feed-header-info").innerText = category.querySelector(".display-name").innerText;
                let json = JSON.parse(xhr.response.split("var ytInitialData = ")[1].split(";</script>")[0]);
                let template = async(a) => {
                    let {owner, time, views, title, id, url, description, upload, icon} = await document.ciulinYT.func.organizeVideoData(a);
                    let string_uploadedorlive;
                    if(views[1].length > 1) {
                        string_uploadedorlive = localizeString("watch.uploadedavideo");
                    } else {
                        string_uploadedorlive = localizeString("watch.islive");
                    };
                    let o = `<li>
<div class="feed-item-container first" data-channel-key="UCBE-FO9JUOghSysV9gjTeHw">
<div class="feed-author-bubble-container">
<a href="${url}" class="feed-author-bubble">
<span class="feed-item-author">
<span class="video-thumb ux-thumb yt-thumb-square-28">
<span class="yt-thumb-clip">
<span class="yt-thumb-clip-inner">
<img src="${icon}" alt="${owner.text}" data-thumb="${icon}" width="28">
<span class="vertical-align"></span>
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
<a href="${url}" class="yt-uix-sessionlink yt-user-name" dir="ltr">${owner.text}</a>
</span> ${string_uploadedorlive} <span class="feed-item-time">${views[1]}</span>
</span>
</div>
<div class="feed-item-content-wrapper clearfix context-data-item" data-context-item-actionverb="uploaded" data-context-item-title="Steam for Linux a Bad Idea? - This Week in Linux Gaming" data-context-item-type="video" data-context-item-time="5:21" data-context-item-user="nixiedoeslinux" data-context-item-id="7LVtbTurdCk" data-context-item-views="25,816 views" data-context-item-actionuser="nixiedoeslinux">
<div class="feed-item-thumb">
<a class="ux-thumb-wrap contains-addto yt-uix-contextlink yt-uix-sessionlink" href="/watch?v=${id}">
<span class="video-thumb ux-thumb yt-thumb-default-185">
<span class="yt-thumb-clip"><span class="yt-thumb-clip-inner">
<img src="//i2.ytimg.com/vi/${id}/hqdefault.jpg" alt="Thumbnail" width="185">
<span class="vertical-align"></span>
</span>
</span>
</span>
<span class="video-time">${time}</span>
<button onclick=";return false;" title="Watch Later" type="button" class="addto-button video-actions addto-watch-later-button yt-uix-button yt-uix-button-default yt-uix-button-short yt-uix-tooltip" data-video-ids="7LVtbTurdCk" role="button">
<span class="yt-uix-button-content">
<img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Watch Later">
</span>
</button>
</a>
</div>
<div class="feed-item-content">
<h4>
<a class="feed-video-title title yt-uix-contextlink yt-uix-sessionlink" href="/watch?v=${id}">${title}</a>
</h4>
<div class="metadata">
<span class="view-count">${views[0]}</span>
<div class="description">
<p>${description}</p>
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

                    return o;
                };
                let fetch = await document.ciulinYT.func.handleCategory(json, "0", "22", template, [[], []]);
                document.querySelector(".feed-header-thumb .feed-header-icon").classList.remove(document.querySelector(".feed-header-thumb .feed-header-icon").classList[1]);
                document.querySelector(".feed-header-thumb .feed-header-icon").classList.add(document.querySelector(".selected .system-icon").classList[2]);
                document.querySelector(".context-data-container").innerHTML = fetch;
                document.querySelector("#feed-loading-template").classList.add("hid");
                document.querySelector("#feed-main-youtube").classList.remove("hid");
            };
            xhr.send();
        },
        settings_tab: async(dataName) => {
            if (!dataName) return;
            let DOM = document.querySelector("video-settings");
            let CON = DOM.querySelector(".playmenu-content");
            CON.innerHTML = "";
            document.querySelector(".playmenu-button.selected").classList.remove("selected");
            document.querySelector(`[data-name="${dataName}"]`).classList.add("selected");

            let loadSubtitles = async () => {
                let HTML = [];
                let subtitlesSTORAGE = await document.ciulinYT.func.getFromStorage("subtitles");
                let jSON = [{disabled: "", languageCode: "", name: {simpleText: "No subtitles"}}];
                let posiShort = (ytInitialPlayerResponse) ? (ytInitialPlayerResponse.captions) ? ytInitialPlayerResponse.captions.playerCaptionsTracklistRenderer.captionTracks : jSON : jSON;
                let posiSubtitles = ``;
                let value = subtitlesSTORAGE.value;

                for (let i = 0; i < posiShort.length; i++) {
                    let _value = (posiShort[i].languageCode == subtitlesSTORAGE.value) ? 'selected=""' : "";
                    posiSubtitles += `<option value="${posiShort[i].languageCode}" ${_value}>${posiShort[i].name.simpleText}</option>`;
                }

                let chck_toggle = (posiShort[0].disabled == "") ? 'disabled=""' : '';

                let _toggle = `<span class="playmenu-text">Subtitles</span><div class="settings-toggle"><input type="checkbox" class="settings-toggle" id="settings-subtitles" ${chck_toggle}><label for="settings-subtitles" class="playmenu-text">Enable Subtitles</label></div><div class="settings-selecter"><select class="settings-selecter" id="settings-subtitles" disabled="">${posiSubtitles}</select></div>`;

                HTML.push(_toggle);

                for (let i = 0; i < HTML.length; i++) {
                    CON.innerHTML += HTML[i];
                }

                document.querySelector(".settings-toggle#settings-subtitles").addEventListener("click", e => {
                    if(e.srcElement.checked == true) {
                        document.querySelector(".settings-selecter#settings-subtitles").removeAttribute("disabled");
                    } else {
                        document.querySelector(".settings-selecter#settings-subtitles").setAttribute("disabled", "");
                    }

                    document.ciulinYT.player.toggleSubtitles();
                });

                document.querySelector(".settings-selecter#settings-subtitles").addEventListener("change", e => {
                    document.ciulinYT.func.addToStorage("subtitles", "value", e.srcElement.value);
                    document.ciulinYT.player.setOption("captions", "track", {"languageCode": e.srcElement.value});
                });
            };

            let loadQuality = async () => {
                let HTML = [];
                let qualitySTORAGE = await document.ciulinYT.func.getFromStorage("quality");
                let qualShort = document.ciulinYT.player.getAvailableQualityLevels();
                let qualShorter = document.ciulinYT.player.getPlaybackQuality();
                let qualQuality = ``;
                let value = qualitySTORAGE.value;

                for (let i = 0; i < qualShort.length; i++) {
                    let _value = (qualShort[i] == qualShorter) ? 'selected=""' : (qualShort[i] == qualitySTORAGE.value) ? 'selected=""' : "";
                    qualQuality += `<option value="${qualShort[i]}" ${_value}>${qualShort[i]}</option>`;
                }

                let _select = `<span class="playmenu-text">Video Quality</span><div class="settings-selecter"><select class="settings-selecter" id="settings-quality">${qualQuality}</select><span class="playmenu-text">Technically doesn't do anything since YouTube deprecated <a href="https://developers.google.com/youtube/iframe_api_reference#october-24,-2019" target="_blank">setPlaybackQuality</a></span></div>`;

                HTML.push(_select);

                for (let i = 0; i < HTML.length; i++) {
                    CON.innerHTML += HTML[i];
                }
            };

            let loadPlayback = async () => {
                let HTML = [];
                let playbackSTORAGE = await document.ciulinYT.func.getFromStorage("playback");
                let playShort = document.ciulinYT.player.getAvailablePlaybackRates();
                let playShorter = document.ciulinYT.player.getPlaybackRate();
                let playRate = ``;
                let value = playbackSTORAGE.value;

                for (let i = 0; i < playShort.length; i++) {
                    let _value = (playShort[i] == playShorter) ? 'selected=""' : (playShort[i] == playbackSTORAGE.value) ? 'selected=""' : "";
                    playRate += `<option value="${playShort[i]}" ${_value}>${playShort[i]}</option>`;
                }

                let _select = `<span class="playmenu-text">Playback Rate</span><div class="settings-selecter"><select class="settings-selecter" id="settings-play">${playRate}</select></div>`;

                HTML.push(_select);

                for (let i = 0; i < HTML.length; i++) {
                    CON.innerHTML += HTML[i];
                }

                document.querySelector(".settings-selecter#settings-play").addEventListener("change", e => {
                    document.ciulinYT.func.addToStorage("playback", "value", Number(e.srcElement.value));
                    document.ciulinYT.player.setPlaybackRate(Number(e.srcElement.value));
                });
            };

            let loadLoop = async () => {
                let _select = `<span class="playmenu-text">Loop Video</span><div class="settings-toggle"><input type="checkbox" class="settings-toggle" id="settings-loop"><label for="settings-loop" class="playmenu-text">Enable Loop</label></div>`;
                CON.innerHTML += _select;
                document.querySelector(".settings-toggle#settings-loop").addEventListener("click", e => {
                    let id = document.ciulinYT.player.getVideoUrl().split("v=")[1];
                    let l = document.ciulinYT.player.getCurrentTime();
                    if(e.srcElement.checked == true) {
                        document.ciulinYT.player.loadPlaylist(id, 0, l);
                        document.ciulinYT.player.setLoop(true);
                    } else {
                        document.ciulinYT.player.loadVideoById(id, l);
                    }
                });
            };

            switch (dataName) {
                case "subtitles":
                    loadSubtitles();
                    break;
                case "quality":
                    loadQuality();
                    break;
                case "playback":
                    loadPlayback();
                    break;
                case "loop":
                    loadLoop();
                    break;
            }
        },
        browse_category: async (category) => {
            if(!category) return;
            let obj = {class: category};
            let string = "";
            let template = async(current) => {
                let {owner, time, views, title, id, url} = await document.ciulinYT.func.organizeVideoData(current);
                let a = `<div class="browse-item yt-tile-default">
<a href="https://www.youtube.com/watch?v=${id}" class="ux-thumb-wrap">
<span class="video-thumb ux-thumb ux-thumb-184">
<span class="clip">
<span class="clip-inner"><img alt="Thumbnail" src="//i2.ytimg.com/vi/${id}/hqdefault.jpg" data-group-key="thumb-group-0"><span class="vertical-align"></span></span>
</span>
</span>
<span class="video-time">${time}</span>
</a>
<div class="browse-item-content">
<h3 dir="ltr">
<a href="https://www.youtube.com/watch?v=${id}" title="${title}">${title}</a>
</h3>
<div class="browse-item-info">
<div class="metadata-line">
<span class="viewcount">${views[0]}</span>
<span class="metadata-separator">|</span>
<span class="video-date-added">${views[1]}</span>
</div>
<a class="yt-user-name" dir="ltr" href="https://www.youtube.com${url}">${owner.text}</a>
</div>
</div>
</div>`;
                return a;
            };
            switch (category) {
                case "most-viewed":
                    obj.name = localizeString("browse.mostviewed");
                    obj.html = await document.ciulinYT.func.handleCategory(ytInitialData, 4, 8, template, ['<div class="browse-item-row ytg-box">', '</div>']);
                    return obj;
                case "recommended":
                    string = "/";
                    obj.name = localizeString("browse.recommended");
                    break;
                case "music":
                    obj.name = localizeString("guide.music");
                    string = "/channel/UC-9-kyTW8ZkZNDHQJ6FgpwQ";
                    break;
                case "film":
                    obj.name = "Film";
                    string = "/feed/storefront";
                    break;
                case "live":
                    obj.name = localizeString("guide.live");
                    string = "/channel/UC4R8DWoMoI7CAwX8_LjQHig";
                    break;
                case "gaming":
                    obj.name = localizeString("guide.gaming");
                    string = "/gaming";
                    break;
                case "news":
                    obj.name = localizeString("guide.news");;
                    string = "/channel/UCYfdidRxbB8Qhf0Nx7ioOYw";
                    break;
                case "sports":
                    obj.name = localizeString("guide.sports");
                    string = "/channel/UCEgdi0XIXXZ-qJOFPf4JSKw";
                    break;
                case "edu":
                    obj.name = localizeString("guide.education");;
                    string = "/channel/UCtFRv9O2AHqOZjjynzrv-xg";
                    break;
                case "howto":
                    obj.name = localizeString("guide.howto");
                    string = "/channel/UCrpQ4p1Ql_hG8rKXIKM1MOQ";
                    break;
            }
            var test = new Promise(async resolve => {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", `https://www.youtube.com${string}`);
                xhr.onload = async () => {
                    let json = JSON.parse(xhr.response.split("var ytInitialData = ")[1].split(";</script>")[0]);
                    let CONTENTS = await document.ciulinYT.func.handleCategory(json, 4, 8, template, ['<div class="browse-item-row ytg-box">', '</div>']);
                    resolve(CONTENTS);
                };
                xhr.onerror = () => {
                    console.error("** An error occurred during the XMLHttpRequest");
                };
                xhr.send();
            });
            obj.html = await test;
            return obj;
        },
        homepage_list: async (category) => {
            if(!category) return;
            let obj = {class: category};
            let string = "";
            switch (category) {
                case "trending":
                    obj.name = localizeString("guide.trending");
                    string = "/feed/trending";
                    break;
                case "popular":
                    obj.name = localizeString("guide.popular");
                    string = "/channel/UCF0pVplsI8R5kcAqgtoRqoA";
                    break;
                case "music":
                    obj.name = localizeString("guide.music");
                    string = "/channel/UC-9-kyTW8ZkZNDHQJ6FgpwQ";
                    break;
                case "live":
                    obj.name = localizeString("guide.live");
                    string = "/channel/UC4R8DWoMoI7CAwX8_LjQHig";
                    break;
                case "gadgets":
                    obj.name = localizeString("guide.gaming");
                    string = "/gaming";
                    break;
                case "news":
                    obj.name = localizeString("guide.news");
                    string = "/channel/UCYfdidRxbB8Qhf0Nx7ioOYw";
                    break;
                case "sports":
                    obj.name = localizeString("guide.sports");
                    string = "/channel/UCEgdi0XIXXZ-qJOFPf4JSKw";
                    break;
                case "education":
                    obj.name = localizeString("guide.education");
                    string = "/channel/UCtFRv9O2AHqOZjjynzrv-xg";
                    break;
                case "howto":
                    obj.name = localizeString("guide.howto");
                    string = "/channel/UCrpQ4p1Ql_hG8rKXIKM1MOQ";
                    break;
                case "technoblade":
                    obj.name = "Technoblade";
                    string = "/c/technoblade";
                    break;
            }
            obj.url = string;
            return obj;
        },
        subscriptions: async () => {
            let test = new Promise(async resolve => {
                let subs = await document.ciulinYT.func.getApi("/youtubei/v1/guide");
                let org = await document.ciulinYT.func.organizeSubscriptionsData(subs);
                resolve(org);
            });

            let a = await test;
            return a;
        },
        picker: async (pickie) => {
            if(!pickie) return;
            document.querySelector("#picker-loading").removeAttribute("style");
            let api = await document.ciulinYT.func.getApi("/youtubei/v1/account/account_menu");
            console.debug(api);
            let sum = api.actions[0].openPopupAction.popup.multiPageMenuRenderer.sections[2].multiPageMenuSectionRenderer.items;
            let ij, ik, ia, io, iu, pp;
            let fixArr = [];
            for (let i = 0; i < sum.length; i++) {
                if(sum[i].compactLinkRenderer) {
                    fixArr.push(sum[i].compactLinkRenderer);
                }
            }

            switch (pickie) {
                case "LANGUAGE":
                    sum = fixArr.find(a => a.icon.iconType == "TRANSLATE");
                    ij = "selectLanguageCommand";
                    ik = "hl";
                    pp = "lang";
                    ia = "language-picker";
                    io = "Choose your language";
                    iu = "Choose the language in which you want to view YouTube. This will only change the interface, not any text entered by other users.";
                    break;
                case "COUNTRY":
                    sum = fixArr.find(a => a.icon.iconType == "LANGUAGE");
                    ij = "selectCountryCommand";
                    ik = "gl";
                    pp = "country";
                    ia = "region-picker";
                    io = "Choose your content location";
                    iu = "Choose which country or region's content (videos and channels) you would like to view. This will not change the language of the site.";
                    break;
            }

            let test = sum.serviceEndpoint.signalServiceEndpoint.actions[0].getMultiPageMenuAction.menu.multiPageMenuRenderer.sections[0].multiPageMenuSectionRenderer.items;
            let result = "";

            let outArray = [ [], [], [], [], [], [], [], [], [] ];
            let bh = (ik == "gl") ? ['<div class="flag-list">', "</div>"] : ["", ""];
            let bi = (ik == "gl") ? `<div class="flag-list first"><div class="flag-div"><img id="flag_en_US" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" class="flag_en_US" alt="" width="17" height="11"> <span class="selected">Worldwide (All)</span></div></div>` : ``;
            for (let i = 0; i < test.length; i++) {
                outArray[Math.floor(i/12)].push({name: test[i].compactLinkRenderer.title.simpleText, lang: test[i].compactLinkRenderer.serviceEndpoint.signalServiceEndpoint.actions[0][ij][ik]});
            }
            for (let i = 0; i < outArray.length; i++) {
                let aaa = ``;
                for (let I = 0; I < outArray[i].length; I++) {
                    console.debug(outArray[i][I].name + " " + outArray[i][I].lang);
                    let im = (ik == "gl") ? `<a href="#" onclick="(async() => {await document.ciulinYT.func.addToStorage('${pp}', 'value', '${outArray[i][I].lang}');})(); window.location.reload(); return false;"><img id="flag_${outArray[i][I].lang.toLowerCase()}_${outArray[i][I].lang}" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" class="flag_${outArray[i][I].lang.toLowerCase()}_${outArray[i][I].lang}" alt="" width="17" height="11"> </a>` : ``;
                    aaa += `<div class="flag-div">${im}
<a href="#" onclick="(async() => {await document.ciulinYT.func.addToStorage('${pp}', 'value', '${outArray[i][I].lang}');})(); window.location.reload(); return false;">${outArray[i][I].name}</a>
</div>`;
                }
                result += `<div class="flag-bucket">${aaa}</div>`;
            }
            let html = `<div id="${ia}" style="" class="yt-tile-static">
<div class="picker-top">
<div class="box-close-link">
<img onclick="_hidediv('${ia}');" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Close">
</div>
<h2>${io}</h2>
<p>${iu}</p>
<div class="clearR"></div>
</div>
<div>${bi}${bh[0]}${result}${bh[1]}<div class="spacer">&nbsp;</div></div>
</div>`;

            document.querySelector("#picker-container").innerHTML = html;
            document.querySelector("#picker-loading").classList.add("hid");
        },
        comments: async (continuation, number) => {
            let dd = ".all";
            let stopLoad = () => {
                document.querySelector(".comment-list" + dd).classList.remove("hid");
                document.querySelector("#comments-loading").classList.add("hid");
            };
            if(!continuation) {
                return stopLoad();
            }
            document.querySelector("#comments-loading").classList.remove("hid");
            let api = await document.ciulinYT.func.getApi("/youtubei/v1/next", `continuation: "${continuation}"`);
            let collection = api.onResponseReceivedEndpoints[1] ? api.onResponseReceivedEndpoints[1].reloadContinuationItemsCommand.continuationItems ? api.onResponseReceivedEndpoints[1].reloadContinuationItemsCommand.continuationItems : false : api.onResponseReceivedEndpoints[0].appendContinuationItemsAction.continuationItems ? api.onResponseReceivedEndpoints[0].appendContinuationItemsAction.continuationItems : [];
            if(api.responseContext.mainAppWebResponseContext.loggedOut == false && document.querySelector("#session").getAttribute("data-yes") !== "yes") {
                document.querySelector("#session").setAttribute("data-yes", "yes");
                document.querySelector("#session").value = api.onResponseReceivedEndpoints[0].reloadContinuationItemsCommand.continuationItems[0].commentsHeaderRenderer.createRenderer.commentSimpleboxRenderer.submitButton.buttonRenderer.serviceEndpoint.createCommentEndpoint.createCommentParams;
            }
            if(number == 0) {
                dd = ".top";
                let tt = api.onResponseReceivedEndpoints[0].reloadContinuationItemsCommand.continuationItems[0].commentsHeaderRenderer.sortMenu.sortFilterSubMenuRenderer.subMenuItems[1].serviceEndpoint.continuationCommand.token;
                document.ciulinYT.load.comments(tt, 1);
                collection = collection.splice(0, 2);
            }
            if(collection.length == 0 || collection == false) return stopLoad();
            let result = {result: "", con: ""};
            let ana = () => {
                document.querySelector(".yt-uix-button-toggled").classList.remove("yt-uix-button-toggled");
                document.querySelector(`[data-page='${number}']`).classList.add("yt-uix-button-toggled");
            };
            if (document.querySelector(`.yt-pp[data-page='${number}']`)) {
                commCount = number;
                ana();
            } else {
                let abc = document.querySelector(".yt-uix-pager");
                let bcd = document.querySelector(".yt-uix-button-toggled");
                let def = document.createElement("a");
                let ded = document.querySelector("#next-btn");
                def.setAttribute("class", "yt-uix-button yt-uix-sessionlink yt-uix-pager-button yt-uix-button-toggled yt-uix-button-default yt-pp");
                def.setAttribute("data-page", commCount);
                def.setAttribute("onclick", "document.ciulinYT.load.comments(this.getAttribute('data-token'), this.getAttribute('data-page'))");
                def.setAttribute("aria-label", `Go to page ${commCount}`);
                def.setAttribute("data-token", continuation);
                def.innerHTML = `<span class="yt-uix-button-content">${commCount}</span>`;
                ded.setAttribute("data-page", commCount);
                if (bcd) {
                    bcd.classList.remove("yt-uix-button-toggled");
                }
                abc.insertBefore(def, document.querySelector("#next-btn"));
            }
            for (let i = 0; i < collection.length; i++) {
                if (collection[i].commentThreadRenderer) {
                    if (number == 0 || collection[i].commentThreadRenderer.renderingPriority !== "RENDERING_PRIORITY_PINNED_COMMENT"){
                        let ap = await document.ciulinYT.func.organizeCommentData(collection[i].commentThreadRenderer.comment.commentRenderer);
                        result.result += ap;
                    }
                }
                if (collection[i].continuationItemRenderer) {
                    commCount++;
                    document.querySelector("#next-btn").setAttribute("data-page", commCount);
                    document.querySelector("#next-btn").classList.remove("hid");
                    document.querySelector("#next-btn").setAttribute("data-token", collection[i].continuationItemRenderer.continuationEndpoint.continuationCommand.token);
                    result.con += `${collection[i].continuationItemRenderer.continuationEndpoint.continuationCommand.token}`;
                }
            }
            document.querySelector(".comment-list" + dd).innerHTML = result.result;
            stopLoad();
        }
    };
    document.ciulinYT.func = {
        buildPlayer: (videoId, time) => {
            var ELEMENT = document.querySelector("#video-player");
            var TEMP = document.createElement("div");
            TEMP.setAttribute("class", "player");
            ELEMENT.setAttribute("tabindex", 0);
            ELEMENT.append(TEMP);
            var DOM = ELEMENT.querySelector(".player");
            (() => {
                var DOM_menu = document.createElement("video-settings");
                DOM_menu.setAttribute("class", "hid");
                DOM_menu.setAttribute("data-state", "0");
                DOM_menu.innerHTML = `<div class="playmenu-container"><a class="playmenu-text">YouTube Player Settings</a><div class="playmenu-content"></div><ul class="playmenu-buttons"><li class="playmenu-button selected" data-name="subtitles"></li><li class="playmenu-button" data-name="quality"></li><li class="playmenu-button" data-name="playback"></li><li class="playmenu-button" data-name="loop"></li><div class="playmenu-button_exit"><span>Close</span></div></ul></div>`;
                DOM.appendChild(DOM_menu);
                document.ciulinYT.load.settings_tab("subtitles");
            })();
            (() => {
                var DOM_topBar = document.createElement("div");
                DOM_topBar.setAttribute("class", "video-topbar");
                DOM_topBar.innerHTML = `<div class="video-topbar-container"><div class="video-title"><span id="video-title-text">Hi</span></div></div>`;
                DOM.appendChild(DOM_topBar);
            })();
            (() => {
                var DOM_embedVideo = document.createElement("div");
                DOM_embedVideo.setAttribute("class", "video-container");
                DOM_embedVideo.innerHTML = `<div id="video-main-content"></div><div class="video-blank"></div>`;
                DOM.appendChild(DOM_embedVideo);
            })();
            (() => {
                var DOM_scrubBar = document.createElement("div");
                DOM_scrubBar.setAttribute("class", "video-scrubbar");
                DOM_scrubBar.setAttribute("role", "progressbar");
                DOM_scrubBar.innerHTML = `<div class="seek-tooltip hid" id="seek-tooltip"></div><span class="scrubbar_track_played"></span><span class="scrubbar_track_handle"></span>`;
                DOM.appendChild(DOM_scrubBar);
            })();
            (() => {
                var DOM_playBar = document.createElement("div");
                DOM_playBar.setAttribute("class", "video-playbar");
                DOM_playBar.innerHTML = `<ul class="playbar-controls left">
<li class="playbar-controls_icon playbar-controls_play" data-state="0">
<i class="playbar-icon playbar-icon_play"></i>
</li><div class="playbar-volume_container" data-name="volume" data-type="tooltip" data-tooltip="${localizeString("player.mute")}">
<li class="playbar-controls_icon playbar-controls_volume" data-state="3">
<i class="playbar-icon playbar-icon_volume"></i>
</li>
<div class="playbar-volume-container volume-movable">
<div class="playbar-volume-slider volume-movable" role="progressbar" aria-valuemin="0" aria-valuemax="100">
<span class="playbar-volume playbar-volume-played volume-movable"></span>
<span class="playbar-volume playbar-volume-notplayed volume-movable"></span>
<span class="playbar-volume-handle volume-movable"></span>
</div>
</div>
</div>
</ul>
<div class="playbar-timestamp_container">
<span class="playbar-timestamp">
<a id="timestamp_current">0:00</a> / <a id="timestamp_total">9:99</a>
</span>
</div>
<ul class="playbar-controls right">
<li class="playbar-controls_icon playbar-controls_cc">
<i class="playbar-icon playbar-icon_cc"></i>
</li><li class="playbar-controls_icon playbar-controls_settings" data-name="settings" data-type="tooltip" data-tooltip="${localizeString("player.quality")}">
<i class="playbar-icon playbar-icon_settings"></i>
</li><li class="playbar-controls_icon playbar-controls_watchlater" data-name="watchlater" data-type="tooltip" data-tooltip="${localizeString("personal.watchlater")}">
<i class="playbar-icon playbar-icon_watchlater"></i>
</li><li class="playbar-controls_icon playbar-controls_fullscreen" data-name="fullscreen" data-state="0" data-type="tooltip" data-tooltip="${localizeString("player.fullscreen")}">
<i class="playbar-icon playbar-icon_fullscreen"></i>
</li>
</ul>`;
                DOM.appendChild(DOM_playBar);
            })();
            (() => {
                var a = document.createElement("style");
                a.setAttribute("class", "player-style");
                let script = `body {margin:0}
* {
    --lld: linear-gradient(0deg, rgba(10,10,10,1) 0%, rgba(39,39,39,1) 100%);
    --lll: linear-gradient(0deg, rgba(29,29,29,1) 0%, rgba(49,49,49,1) 100%);
    --llr: linear-gradient(0deg, rgba(9,9,9,1) 0%, rgba(29,29,29,1) 100%);
    --llRED: linear-gradient(0deg, rgba(195,0,0,1) 0%, rgba(108,0,0,1) 100%);
    --texture-playbar: url(${document.ciulinYT.data.playerSheetB}) no-repeat;
}
.playmenu-container {
    display: none;
}
#video-player {
    display: block;
    width: 640px;
    height: 390px;
    background-color: black;
}
#video-player .player {
    width: inherit;
    height: inherit;
}
#video-player .video-topbar {
width: inherit;
overflow: hidden;
position: absolute;
z-index: 1;
height: 28px;
user-select: none;
}
#video-player:hover .video-topbar-container {
top: 0px;
transition: top 0s ease-in;
}
#video-player .video-topbar-container {
background: linear-gradient(0deg, rgba(31,31,31,0) 0%, rgba(31,31,31,1) 100%);
width: inherit;
top: -28px;
transition: top 1s ease-out;
position: absolute;
}
#video-player .video-title {
float: left;
padding: 8px 13px;
color: white;
}
#video-player .video-topbar-buttons {
display: flex;
height: 25px;
line-height: 25px;
overflow: hidden;
position: relative;
user-select: none;
border-top: 1px solid #484646;
border-bottom: 1px solid #0b0b0b;
background: var(--lld);
z-index: 3;
}
#video-player .video-container {
    height: 359px;
    width: inherit;
    position: relative;
    z-index: 0;
}
#video-player:fullscreen .video-container {
    height: 97%;
}
#video-player:fullscreen #video-main-content {
    height: 100%;
}
#video-player #video-main-content {
    position: relative;
    z-index: -1;
    width: inherit;
}
#video-player .video-blank {
    width: 100%;
    height: 100%;
    background-color: black;
    position: absolute;
    top: 0;
    z-index: -1;
}
#video-player .video-scrubbar {
    z-index: 4;
    background-color: #222;
    position: relative;
    cursor: pointer;
    height: 3px;
    user-select: none;
    border-bottom: 1px solid black;
    border-top: 1px solid #323232;
}
#video-player:hover .video-scrubbar {
    height: 7px;
    margin-top: -4px;
    position: relative;
    transition: 0.1s;
}
#video-player:hover .video-scrubbar .scrubbar_track_played {
    max-height: 7px;
    transition: max-height 0s;
}
#video-player:hover .video-scrubbar .scrubbar_track_handle {
    transform: scale(1);
    opacity: 1;
    transition: transform 0s, opacity 0s;
}
#video-player .scrubbar_track_played {
    max-height: 3px;
    background: var(--llRED);
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    transition: max-height 1s;
}
#video-player .scrubbar_track_handle {
    background: var(--texture-playbar);
    background-position: -84px -185px;
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    width: 16px;
    height: 16px;
    margin: -5px -7.5px;
    border-radius: 9px;
    opacity: 0;
    transition: transform 1s, opacity 1s;
    transform: scale(0.3);
    z-index: 100;
}
#video-player .scrubbar_track_handle:hover {
background-position: -84px -163px;
}
#video-player #seek-tooltip {
position: absolute;
top: -25px;
z-index: 1000;
color: white;
background: black;
width: max-content;
padding: 0px 5px;
text-align: center;
border: 1px solid white;
border-radius: 6px;
font-size: 10px;
height: 17px;
justify-content: center;
align-items: center;
user-select: none;
}
#video-player #seek-tooltip::after {
content: " ";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: black transparent transparent transparent;
}
#video-player .video-playbar {
    display: flex;
    height: 25px;
    line-height: 25px;
    overflow: hidden;
    user-select: none;
    border-top: 1px solid #484646;
    border-bottom: 1px solid #0b0b0b;
    background: var(--lld);
    z-index: 3;
    width: inherit;
}
#video-player .playbar-controls {
    list-style-type: none;
    margin: 0;
    padding: 0;
    height: inherit;
    line-height: inherit;
    display: flex;
}
#video-player .playbar-controls_icon {
    width: 30px;
    display: inline-block;
    text-align: center;
    font-size: 2em;
    height: inherit;
    margin: 0 1px;
    border: 0;
    position: relative;
    cursor: pointer;
    background: var(--lld);
    z-index: 1;
}
#video-player .playbar-controls_icon::before, #video-player .playbar-controls_icon::after {
    content: ' ';
    position: absolute;
    top: 0;
    width: 1px;
    height: inherit
}
#video-player .playbar-controls_icon::before {
    left: -1px;
    background: var(--lll);
    height: 25px;
}
#video-player .playbar-controls_icon::after {
    right: -1px;
    background: var(--llr);
    height: 25px;
}
#video-player .playbar-icon {
    background: var(--texture-playbar);
    display: inline-block;
    margin-left: auto;
}
#video-player .playbar-controls_play .playbar-icon.playbar-icon_play {
    height: 16px;
    margin-right: auto;
}
#video-player .playbar-controls_play[data-state^="0"] .playbar-icon.playbar-icon_play {
width: 13px;
height: 17px;
}
#video-player .playbar-controls_play[data-state^="1"] .playbar-icon.playbar-icon_play {
background-position: 0px -22px;
width: 11px;
padding-top: 1px;
padding-left: 2px;
}
#video-player .playbar-controls_play[data-state^="0"]:hover .playbar-icon.playbar-icon_play {
    background-position: -21px -0px;
}
#video-player .playbar-controls_play[data-state^="1"]:hover .playbar-icon.playbar-icon_play {
    background-position: -19px -22px;
}
#video-player .playbar-controls_volume[data-state^="0"] .playbar-icon.playbar-icon_volume {
    background-position: 6px -105px;
}
#video-player .playbar-volume_container:hover .playbar-controls_volume[data-state^="0"] .playbar-icon.playbar-icon_volume {
    background-position: -22px -105px;
}
#video-player .playbar-controls_volume[data-state^="1"] .playbar-icon.playbar-icon_volume {
    background-position: 6px -124px;
}
#video-player .playbar-volume_container:hover .playbar-controls_volume[data-state^="1"] .playbar-icon.playbar-icon_volume {
    background-position: -22px -124px;
}
#video-player .playbar-controls_volume[data-state^="2"] .playbar-icon.playbar-icon_volume {
    background-position: 6px -143px;
}
#video-player .playbar-volume_container:hover .playbar-controls_volume[data-state^="2"] .playbar-icon.playbar-icon_volume {
    background-position: -22px -143px;
}
#video-player .playbar-controls_volume[data-state^="3"] .playbar-icon.playbar-icon_volume {
    background-position: 6px -162px;
}
#video-player .playbar-volume_container:hover .playbar-controls_volume[data-state^="3"] .playbar-icon.playbar-icon_volume {
    background-position: -22px -162px;
}
#video-player .playbar-icon.playbar-icon_settings {
    background-position: 0px -42px;
    height: 20px;
    width: 16px;
    margin-right: auto;
}
#video-player .playbar-controls_settings:hover .playbar-icon.playbar-icon_settings {
background-position: -24px -42px;
}
#video-player .playbar-icon.playbar-icon_watchlater {
    background-position: 0px -66px;
    height: 14px;
    width: 13px;
    margin-right: auto;
    top: -2px;
    position: relative;
}
#video-player .playbar-icon.playbar-icon_cc {
    background-position: 0px -85px;
    height: 13px;
    width: 17px;
    margin-right: auto;
}
#video-player .playbar-icon.playbar-icon_fullscreen {
    background-position: 0px -180px;
    height: 17px;
    width: 20px;
    margin-right: auto;
}
#video-player .playbar-controls_fullscreen:hover .playbar-icon.playbar-icon_fullscreen {
background-position: -28px -180px;
}
#video-player .slider_track_played {
background: red;
border-radius: 4px;
height: inherit;
display: block;
}
#video-player .slider_track_handle {
height: 15px;
width: 6px;
display: block;
border-radius: 4px;
background: white;
margin: -10px 0px;
position: relative;
margin-left: -3px;
}
#video-player .playbar-timestamp_container {
    margin: 0 1px;
    border: 0;
    position: relative;
    height: inherit;
    z-index: 2;
    background: var(--lld);
    width: 80px;
}
#video-player .playbar-timestamp_container::before {
    content: ' ';
    position: absolute;
    top: 0;
    width: 1px;
    height: inherit
}
#video-player .playbar-timestamp_container::before {
    background: var(--lll);
    left: -1px;
}
#video-player a {
    color: white;
    cursor: default;
    text-decoration: none;
}
#video-player .playbar-volume-container {
display: inline-block;
width: 66px;
height: 25px;
line-height: 25px;
-webkit-transition: margin .2s cubic-bezier(0.4,0,1,1),width .2s cubic-bezier(0.4,0,1,1);
transition: margin .2s cubic-bezier(0.4,0,1,1),width .2s cubic-bezier(0.4,0,1,1);
cursor: pointer;
outline: 0;
}
#video-player .playbar-volume_container {
display: flex;
width: 32px;
transition: width 0.8s;
}
#video-player .playbar-volume_container:hover {
width: 98px;
transition: width 0.1s;
}
#video-player .playbar-volume-slider {
width: 53px;
height: 25px;
border-radius: 4px;
display: flex;
margin: 0px 6px;
}
#video-player .playbar-volume {
border-radius: 4px;
height: 4px;
display: block;
position: relative;
top: 50%;
transform: translate(0, -50%);
}
#video-player .playbar-volume-played {
background: red;
width: 100%;
}
#video-player .playbar-volume-notplayed {
background: black;
}
#video-player .playbar-volume-handle {
height: 15px;
width: 6px;
display: block;
border-radius: 4px;
background: white;
position: relative;
margin-left: -55px;
margin-top: 4px;
left: 100%;
}
#video-player .playbar-controls_play {
    width: 55px;
}
#video-player .playbar-icon_volume {
    height: 16px;
    width: 30px;
}
#video-player #playbar-seek {
    -webkit-appearance: none;
    width: inherit;
    height: 4px;
    outline: none;
    max-width: 53px;
}
#video-player .playbar-controls_play::before {
    background: none;
}
#video-player .playbar-controls_cc::before {
    background: none;
}
#video-player .playbar-controls_fullscreen {
    width: 29px;
}
#video-player .playbar-controls_fullscreen::after {
    background: none;
}
#video-player .playbar-timestamp {
    font-size: 10px;
    padding: 6px;
    color: gray;
    position: relative;
    top: -7px;
    float: left;
}
#video-player #timestamp_total {
    color: gray;
}

.hid {
    display: none !important;
}
.deez::after {
margin-left: 15px !important;
}
.right {
    margin-left: auto !important;
}`;
                script = script.replace(/(?:\r\n|\r|\n)/g, "");
                a.innerText = script;
                ELEMENT.appendChild(a);
            })();
            (() => {
                var tag = document.createElement('script');
                tag.src = "https://www.youtube.com/iframe_api";
                DOM.append(tag);
                var timm = time ? `'time':` + time + "," : ``;
                var a = document.createElement("script");
                var script = `
var progress;
let canMouse = false;
let dur = 0;
var onYouTubeIframeAPIReady = () => {
document.ciulinYT.player = new YT.Player('video-main-content', {
height: '360',
width: '640',
videoId: '${videoId}',
playerVars: {
'enablejsapi': 1,
'rel': 0,
'controls': '0',
'cc_load_policy': '0'
},
events: {
'onReady': onPlayerReady,
'onStateChange': onStateChange
}
});
};
let toolTipOver = (e) => {
let list = {
"volume": [55, 35],
"settings": [519, 82],
"watchlater": [558, 70],
"fullscreen": [572, 64]
};
let text = e.target.getAttribute("data-tooltip");
let tooltip = document.querySelector("#seek-tooltip");
let pos = e.target.getAttribute("data-name");
if(pos == "fullscreen") {tooltip.classList.add("deez");};
tooltip.classList.remove("hid");
const rect = document.querySelector("#video-player").getBoundingClientRect();
tooltip.style.left = list[pos][0] + "px";
tooltip.style.top = "-15px";
tooltip.style.display = "flex";
tooltip.innerText = text;
};
let toolTipEnd = (e) => {
let tooltip = document.querySelector("#seek-tooltip");
tooltip.style = "";
tooltip.classList.add("hid");
tooltip.classList.remove("deez");
};
let doCU = document.querySelectorAll("[data-type='tooltip']");
for (let i = 0; i < doCU.length; i++) {
doCU[i].addEventListener("mouseenter", toolTipOver);
doCU[i].addEventListener("mouseleave", toolTipEnd);
}
document.querySelector("#video-player").addEventListener("keydown", (e) => {
if (!e) return;
e.preventDefault();
switch (e.key) {
case " ":
document.querySelector(".playbar-controls_play").click();
break;
case "f":
document.querySelector(".playbar-controls_fullscreen").click();
break;
case "ArrowRight":
document.ciulinYT.player.seekBy(5);
break;
case "ArrowLeft":
document.ciulinYT.player.seekBy(-5);
break;
case "ArrowUp":
document.ciulinYT.func.setVolume(document.ciulinYT.player.getVolume() + 5);
break;
case "ArrowDown":
document.ciulinYT.func.setVolume(document.ciulinYT.player.getVolume() - 5);
break;
};
});
document.querySelector(".video-container").addEventListener("click", () => {
document.ciulinYT.func.exitPlayerSettings();
document.ciulinYT.func.playPause(document.querySelector(".playbar-controls_play").getAttribute("data-state"));
});
document.querySelectorAll(".playmenu-button").forEach(a => {
a.addEventListener("click", e => {
document.ciulinYT.load.settings_tab(e.srcElement.getAttribute("data-name"));
})});
document.querySelector(".playmenu-button_exit").addEventListener("click", () => {
document.ciulinYT.func.exitPlayerSettings();
});
document.querySelector(".playbar-controls_play").addEventListener("click", () => {
document.ciulinYT.func.playPause(document.querySelector(".playbar-controls_play").getAttribute("data-state"));
});
document.querySelector(".playbar-controls_volume").addEventListener("click", () => {
document.ciulinYT.func.mutePlayer(document.querySelector(".playbar-controls_volume").getAttribute("data-state"));
});
document.querySelector(".playbar-controls_fullscreen").addEventListener("click", () => {
document.ciulinYT.func.fullscreenPlayer(document.querySelector(".playbar-controls_fullscreen").getAttribute("data-state"));
});
document.querySelector(".video-scrubbar").addEventListener("mouseenter", e => {
document.querySelector("#seek-tooltip").classList.remove("hid");
});
document.querySelector(".video-scrubbar").addEventListener("mouseleave", e => {
document.querySelector("#seek-tooltip").classList.add("hid");
});
document.querySelector(".video-scrubbar").addEventListener('mousedown', e => {
clearInterval(progress);
canMouse = true;
});
document.querySelector(".video-scrubbar").addEventListener('mouseup', e => {
document.ciulinYT.player.seekTo(dur);
progress = setInterval(document.ciulinYT.func.preProPos);
canMouse = false;
});
const offset = function(e) {
var value = e[0].target.getAttribute("aria-valuenow");

document.querySelector(".playbar-volume-played").style.width = value + "%";
document.querySelector(".playbar-volume-notplayed").style.width = (100 - value) + "%";
document.querySelector(".playbar-volume-handle").style.left = value + "%";
};
new MutationObserver(offset).observe(document.querySelector(".playbar-volume-slider"), { attributes: true });
document.querySelector(".video-scrubbar").addEventListener("mousemove", e => {
dur = ((e.pageX - e.currentTarget.offsetLeft) / document.querySelector("#video-player").clientWidth * document.ciulinYT.player.getDuration());
const rect = document.querySelector("#video-player").getBoundingClientRect();
document.querySelector("#seek-tooltip").style.left = (e.pageX - rect.left) - 16 + "px";
document.querySelector("#seek-tooltip").innerText = document.ciulinYT.func.calculateLength(dur);
if(canMouse !== true) return;
let offset = ((e.pageX - e.currentTarget.offsetLeft) / e.currentTarget.offsetWidth * 100);
document.querySelector(".scrubbar_track_played").style.width = offset + "%";
document.querySelector(".scrubbar_track_handle").style.left = offset + "%";
});
document.querySelector(".playbar-volume-slider").addEventListener("mousemove", e => {
if(canMouse !== true) return;
let offset = Math.round((e.pageX - e.currentTarget.offsetLeft) / e.currentTarget.offsetWidth * 100);
if(offset > 100 || offset < 0) return e.preventDefault();
document.querySelector(".playbar-volume-slider").setAttribute("aria-valuenow", offset);
document.ciulinYT.func.setVolume(offset);
});
document.querySelector(".playbar-volume-slider").addEventListener('mousedown', e => {
canMouse = true;
});
document.querySelector(".playbar-volume-slider").addEventListener('mouseup', e => {
canMouse = false;
});
document.querySelector("movie-player").addEventListener("mouseout", e => {
if (!e.target.classList.contains("volume-movable")) canMouse = false;
});
var playVideo = () => {
document.querySelector(".playbar-controls_play").setAttribute("data-state", "1");
};
var onPlayerReady = async () => {
document.querySelector("#timestamp_total").innerText = document.ciulinYT.func.calculateLength(parseInt(document.ciulinYT.player.getDuration()));
document.querySelector("#video-title-text").innerText = document.ciulinYT.player.videoTitle;
progress = setInterval(document.ciulinYT.func.preProPos);
setInterval(document.ciulinYT.func.trackCurrent);
let speed = await document.ciulinYT.func.getFromStorage("playback");
document.ciulinYT.player.setPlaybackRate(Number(speed.value));
document.querySelector(".video-blank").style = "background: none;";
};
var onStateChange = (e) => {
switch (e.data) {
case 1:
playVideo();
break;
case 0:
document.querySelector(".playbar-controls_play").setAttribute("data-state", "0");
};
};`;
                script = script.replace(/(?:\r\n|\r|\n)/g, "");
                a.innerText = script;
                DOM.append(a);
            })();
        },
        handleCategory: async (yt, divide, maxAmount, func, ex) => {
            if(!yt || !divide || !maxAmount || !func || !ex) return;
            divide = Number(divide);
            maxAmount = Number(maxAmount);
            var CONTENTS = "";
            let TAB = [];
            let p = yt.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content;
            let b = p.sectionListRenderer ? p.sectionListRenderer.contents : p.richGridRenderer.contents;
            for (let i = 0; i < b.length; i++) {
                let b_a = b[i].itemSectionRenderer ? b[i].itemSectionRenderer.contents[0] : b[i].richItemRenderer;
                b_a = b_a ? b_a : {};
                if(b_a.shelfRenderer && b_a.shelfRenderer.content.gridRenderer) {
                    let b_b = b_a.shelfRenderer.content.gridRenderer.items;
                    for (let i_ = 0; i_ < b_b.length; i_++) {
                        TAB.push(b_b[i_].gridVideoRenderer);
                    }
                }
                if(b_a.shelfRenderer && b_a.shelfRenderer.content.expandedShelfContentsRenderer) {
                    let b_b = b_a.shelfRenderer.content.expandedShelfContentsRenderer.items;
                    for (let i_ = 0; i_ < b_b.length; i_++) {
                        TAB.push(b_b[i_].videoRenderer);
                    }
                }
                if(b_a.content && b_a.content.videoRenderer) {
                    TAB.push(b_a.content.videoRenderer);
                }
                if(b_a.shelfRenderer && b_a.shelfRenderer.content.horizontalListRenderer && b_a.shelfRenderer.content.horizontalListRenderer.items) {
                    let b_c = b_a.shelfRenderer.content.horizontalListRenderer.items;
                    for (let e = 0; e < b_c.length; e++) {
                        if(b_c[e].gridVideoRenderer){
                            let b_b = b_c[e].gridVideoRenderer;
                            if((b_b.thumbnailOverlays ? b_b.thumbnailOverlays.find(c => c.thumbnailOverlayTimeStatusRenderer).thumbnailOverlayTimeStatusRenderer.text.simpleText : undefined) !== "SHORTS") {
                                TAB.push(b_b);
                            }
                        }
                    }
                }
                if(b_a.horizontalCardListRenderer && b_a.horizontalCardListRenderer.cards) {
                    let b_c = b_a.horizontalCardListRenderer.cards;
                    for (let e = 0; e < b_c.length; e++) {
                        if(b_c[e].videoCardRenderer){
                            let b_b = b_c[e].videoCardRenderer;
                            TAB.push(b_b);
                        }
                    }
                }
            }
            var anal = TAB;
            var work = [];
            if(TAB[0] && TAB[0][0]) {
                anal = [].concat(TAB[0], TAB[1]);
            }
            for (let i = 0; i < anal.length; i++) {
                if(i < maxAmount) {
                    work.push(anal[i]);
                }
            }
            if(divide == 4) {
                let outArray = [ [], [] ];
                for (let i = 0; i < work.length; i++) {
                    outArray[Math.floor(i/4)].push(work[i]);
                }
                work = outArray;
            }
            for (let i = 0; i < work.length; i++) {
                let bitch = "";
                if(divide == 4) {
                    for (let I = 0; I < work[i].length; I++) {
                        bitch += await func(work[i][I]);
                    }
                } else {
                    bitch += await func(work[i]);
                }
                CONTENTS += `${ex[0]}${bitch}${ex[1]}`;
            }
            return CONTENTS;
        },
        playerSettings: () => {
            let DOM = document.querySelector("video-settings");
            let state = Number(DOM.getAttribute("data-state"));
            if(state !== 0) return;
            DOM.classList.remove("hid");
            switch (state) {
                case 0:
                    document.ciulinYT.func.playPause(1);
                    document.querySelector("video-settings").setAttribute("data-state", "1");
                    break;
            }
        },
        organizeVideoData: async (da) => {
            if(!da) return {};
            let regEx = /(Premiere[ |s|d])|(in progress.)|Started|less than/g;
            let owner = (da.owner) ? da.owner.videoOwnerRenderer.title.runs[0] : da.bylineText ? da.bylineText.runs[0] : da.shortBylineText ? da.shortBylineText.runs[0] : da.ownerText ? da.ownerText.runs[0] : da.videoDetails ? da.videoDetails.author : "";
            let time = da.thumbnailOverlays ? da.thumbnailOverlays.find(c => c.thumbnailOverlayTimeStatusRenderer) ? da.thumbnailOverlays.find(c => c.thumbnailOverlayTimeStatusRenderer).thumbnailOverlayTimeStatusRenderer.text.simpleText ? da.thumbnailOverlays.find(c => c.thumbnailOverlayTimeStatusRenderer).thumbnailOverlayTimeStatusRenderer.text.simpleText : da.thumbnailOverlays.find(c => c.thumbnailOverlayTimeStatusRenderer).thumbnailOverlayTimeStatusRenderer.text.runs[0].text : da.lengthText ? da.lengthText.simpleText : "" : "";
            let upload = (da.dateText) ? da.dateText.simpleText.replace(regEx, "") : (da.publishedTimeText) ? (da.publishedTimeText.simpleText) ? da.publishedTimeText.simpleText.replace(regEx, "") : da.publishedTimeText.runs[0].text.replace(regEx, "") : da.microformat ? da.microformat.playerMicroformatRenderer.publishDate : "";
            let vi = da.viewCount ? da.viewCount.videoViewCountRenderer.viewCount : da.viewCountText ? da.viewCountText : "";
            let view = (vi.simpleText) ? vi.simpleText : (vi.runs) ? (vi.runs[1]) ? vi.runs[0].text + vi.runs[1].text : vi.runs[0].text : da.videoDetails ? da.videoDetails.viewCount : false;
            let meta = da.metadataText ? da.metadataText.simpleText.split(" · ") : [[],[]];
            view = view.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            let views = view ? [view, upload] : meta;
            let title = da.title ? (da.title.simpleText) ? da.title.simpleText : (da.title.runs) ? da.title.runs[0].text : false : da.videoDetails ? da.videoDetails.title : "";
            let videoId = da.videoId ? da.videoId : da.videoDetails ? da.videoDetails.videoId : "";
            let url = owner.navigationEndpoint ? owner.navigationEndpoint.browseEndpoint.canonicalBaseUrl : da.videoDetails ? "/channel/" + da.videoDetails.channelId : "";
            let description = da.detailedMetadataSnippets ? da.detailedMetadataSnippets[0].snippetText.runs[0].text : da.descriptionSnippet ? da.descriptionSnippet.runs[0].text : da.videoDetails ? da.videoDetails.shortDescription : "";
            let icon = da.channelThumbnailSupportedRenderers ? da.channelThumbnailSupportedRenderers.channelThumbnailWithLinkRenderer.thumbnail.thumbnails[0].url : "";
            let tags = da.videoDetails ? da.videoDetails.keywords ? da.videoDetails.keywords : false : [];
            let category = "";
            if (window.location.pathname.split("/")[1] == "watch") {
                category = ytInitialPlayerResponse.microformat.playerMicroformatRenderer.category;
            }

            description = description.replace(/(?:\r\n|\r|\n)/g, '<br>');
            let up = upload.split("-");
            let m = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
            let vv = up[1] ? up[1].toString().replace(/0/, "") : "";
            upload = `${m[vv - 1]} ${up[2]}, ${up[0]}`;
            let links = description.matchAll(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi);
            let tag = description.matchAll(/(#[a-z\d-]+)/gi);
            let stamp = description.matchAll(/[0-5]?\d(?::[0-5]?\d){1,2}/g);
            for (const an of links) {
                description = description.replace(an[0] + "<br>", `<a href="${an[0]}" target="_blank" title="${an[0]}" rel="nofollow" dir="ltr" class="yt-uix-redirect-link">${an[0]}</a><br>`);
            }
            for (const an of tag) {
                description = description.replace(an[0], `<a href="https://www.youtube.com/results?search_query=${an[0].slice(1)}&search=tag" target="_blank" title="${an[0]}" rel="nofollow" dir="ltr" class="yt-uix-redirect-link">${an[0]}</a>`);
            }
            for (const an of stamp) {
                let a = an[0].split(":");
                let s = 0, m = 1;

                while (a.length > 0) {
                    s += m * parseInt(a.pop(), 10);
                    m *= 60;
                }
                description = description.replace(an[0], `<a data-watchtime="${s}" onclick="document.ciulinYT.player.seekTo(this.getAttribute('data-watchtime'))">${an[0]}</a>`);
            }

            return {
                owner: owner,
                time: time,
                views: views,
                title: title,
                id: videoId,
                url: url,
                description: description,
                upload: upload,
                icon: icon,
                tags: tags,
                category: category
            };
        },
        escapeHtml: (unsafe) => {
            return unsafe
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
        },
        organizeCommentData: async (da) => {
            if(!da) return {};
            let author = da.authorText.simpleText;
            let id = da.commentId;
            let text = document.ciulinYT.func.escapeHtml(da.contentText.runs[0].text);
            let time = da.publishedTimeText.runs[0].text;
            let url = da.authorEndpoint.browseEndpoint.canonicalBaseUrl;
            let authorId = da.authorEndpoint.browseEndpoint.browseId;

            let __a = [[], []];

            if(da.cum !== "a") {
                __a[0] = `<li class="comment yt-tile-default" data-author-id="${authorId}" data-id="${id}" data-score="-1">`;
                __a[1] = `</li>`;
            }

            let result = `${__a[0]}<div class="comment-body">
<div class="content-container">
<div class="content">
<div class="comment-text" dir="ltr">
<p>${text}</p>
</div>
<p class="metadata">
<span class="author">
<a href="${url}" class="yt-uix-sessionlink yt-user-name" data-sessionlink="" dir="ltr">${author}</a>
</span>
<span class="time" dir="ltr">
<a dir="ltr" href="https://www.youtube.com/watch?v=${id}&lc=${id}">${time}</a>
</span>
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
${__a[1]}`;

            return result;
        },
        organizeSubscriptionsData: async (da) => {
            if(!da) return {};
            if(!da.items.find(b => b.guideSubscriptionsSectionRenderer)) return [];
            let a = da.items.find(b => b.guideSubscriptionsSectionRenderer).guideSubscriptionsSectionRenderer.items;
            let TAB = [];
            for (let i = 0; i < a.length; i++) {
                if(a[i].guideEntryRenderer && a[i].guideEntryRenderer.entryData) {
                    let de = a[i].guideEntryRenderer;
                    TAB.push({
                        title: de.formattedTitle.simpleText,
                        id: de.entryData.guideEntryData.guideEntryId,
                        icon: de.thumbnail.thumbnails[0].url
                    });
                }
            }

            return TAB;
        },
        secret: () => { return alert("Exception occurred at 6F 77 6F 20 66 75 72 72 79"); },
        createStorage: async (a) => {
            if(a !== "SUPERSECRETROOTKEY") return error("Permission denied to this function. Reason: Tempering with this can break the script.");
            await GM.setValue("helloworld", "Hello World");
            await GM.setValue("storageVer", document.ciulinYT.data.version);
            await GM.setValue("subtitles", {"value": ""});
            await GM.setValue("quality", {"value": ""});
            await GM.setValue("playback", {"value": 1});
            await GM.setValue("loop", {"value": false});
            await GM.setValue("lang", {"value": "en"});
        },
        prepareStorage: async () => {
            let STORAGE = await GM.getValue("storageVer");
            if(!STORAGE) return document.ciulinYT.func.createStorage("SUPERSECRETROOTKEY");
            if(STORAGE !== document.ciulinYT.data.version) return document.ciulinYT.func.createStorage("SUPERSECRETROOTKEY");
        },
        addToStorage: async (a, b, c) => {
            if(!a && !b && !c) return error();
            await document.ciulinYT.func.prepareStorage();
            let STORAGE = GM.getValue(a);
            if(!STORAGE) {
                await document.ciulinYT.func.createStorage("SUPERSECRETROOTKEY");
                return error(`Storage: ${a} does not exist in storage`);
            }
            STORAGE[b] = c;
            await GM.setValue(a, STORAGE);
        },
        getFromStorage: async (a) => {
            if(!a) return error();
            await document.ciulinYT.func.prepareStorage();
            let STORAGE = await GM.getValue(a);
            if(!STORAGE) {
                await document.ciulinYT.func.createStorage("SUPERSECRETROOTKEY");
                return error(`Storage: ${a} does not exist in storage`);
            }
            return STORAGE;
        },
        setPref: async (a, b) => {
            if(!a || !b) return;
            let parseCookie = str => str.split('&').map(v => v.split('=')).reduce((acc, v) => {acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());return acc;}, {});
            let PREF = parseCookie(document.ciulinYT.func.getCookie("PREF"));
            //if(!PREF[b]) return error();
            PREF[b] = a;
            let hell = `tz=${PREF.tz}&f6=${PREF.f6}&gl=${PREF.gl}&f5=${PREF.f5}&hl=${PREF.hl}`;
            await document.ciulinYT.func.setCookie("PREF", hell, 800);
            window.location.reload();
        },
        getPref: (a) => {
            if(!a) return;
            let parseCookie = str => str.split('&').map(v => v.split('=')).reduce((acc, v) => {acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());return acc;}, {});
            let PREF = parseCookie(document.ciulinYT.func.getCookie("PREF"));
            return PREF[a];
        },
        exitPlayerSettings: () => {
            let DOM = document.querySelector("video-settings");
            DOM.classList.add("hid");
            document.querySelector("video-settings").setAttribute("data-state", "0");
        },
        fullscreenPlayer: (e) => {
            let target = Number(e);
            let $ = document.querySelector("#video-player");
            let requestFullScreen = $.requestFullScreen || $.mozRequestFullScreen || $.webkitRequestFullScreen;
            if(!requestFullScreen) return;
            let makeFullscreen = () => {
                document.querySelector(".playbar-controls_fullscreen").setAttribute("data-state", "1");
                requestFullScreen.bind($)();
            };
            let unmakeFullscreen = () => {
                document.querySelector(".playbar-controls_fullscreen").setAttribute("data-state", "0");
                document.exitFullscreen();
            };
            switch (target) {
                case 0:
                    makeFullscreen();
                    break;
                case 1:
                    unmakeFullscreen();
                    break;
            }
        },
        trackLength: () => {
            document.querySelector("#playbar-progressbar").style.width = document.ciulinYT.player.getCurrentTime() / document.ciulinYT.player.getDuration() * 100 + "%";
        },
        trackCurrent: () => {
            document.querySelector("#timestamp_current").innerText = document.ciulinYT.func.calculateLength(parseInt(document.ciulinYT.player.getCurrentTime()));
        },
        playPause: (e) => {
            let target = Number(e);
            switch (target) {
                case 0:
                    document.ciulinYT.player.playVideo();
                    document.querySelector(".playbar-controls_play").setAttribute("data-state", 1);
                    break;
                case 1:
                    document.ciulinYT.player.pauseVideo();
                    document.querySelector(".playbar-controls_play").setAttribute("data-state", 0);
                    break;
            }
        },
        calculateLength: (length) => {
            if(typeof(length) !== 'number') return error(`calculateLength: '${length}' is not a valid number.`);
            var hours = "";
            var thours = Math.floor(length / 3600);
            var tminutes = Math.floor(length % 3600 / 60);
            var tseconds = Math.floor(length % 3600 % 60);
            tseconds = ('0' + tseconds).slice(-2);
            if(length > 3600) {
                tminutes = ('0' + tminutes).slice(-2);
            }
            hours = length >= 3600 ? (thours + ":") : "";
            return hours + "" + tminutes + ":" + tseconds;
        },
        Modal: (DOM) => {
            DOM = document.querySelector(DOM);
            if (!DOM.classList.contains("hid")) {
                DOM.classList.add("hid");
                DOM.style = "display:none;";
                return;
            }
            DOM.classList.remove("hid");
            DOM.style = "display:block";
        },
        mutePlayer: (state) => {
            state = Number(state);
            let seek = 0;
            let data = 0;
            switch (state) {
                case 0:
                    seek = 100;
                    data = 3;
                    document.querySelector("#video-player").querySelector(".playbar-volume_container").setAttribute("data-tooltip", localizeString("player.mute"));
                    document.ciulinYT.player.unMute();
                    break;
                default:
                    document.querySelector("#video-player").querySelector(".playbar-volume_container").setAttribute("data-tooltip", localizeString("player.unmute"));
                    document.ciulinYT.player.mute();
                    break;
            }
            document.querySelector(".playbar-volume-slider").setAttribute("aria-valuenow", seek);
            document.querySelector("#video-player").querySelector(".playbar-controls_volume").setAttribute("data-state", data);
        },
        toggleExpandedMasthead: () => {
            let a = document.querySelector("#masthead-expanded");
            if(a.classList.contains("hid")) {
               a.classList.remove("hid");
            } else {
                a.classList.add("hid");
            }
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
        getSubscription: () => {
            if(BOOL_LOGIN !== true) return false;
            if(window.location.pathname.split("/")[1].match(/channel|user|^c{1}$/i)) {
                return ytInitialData.header.c4TabbedHeaderRenderer.subscribeButton ? ytInitialData.header.c4TabbedHeaderRenderer.subscribeButton.subscribeButtonRenderer ? ytInitialData.header.c4TabbedHeaderRenderer.subscribeButton.subscribeButtonRenderer.subscribed : false : false;
            }
            if(window.location.pathname.split("/")[1].match(/watch/i)) {
                return ytInitialData.contents.twoColumnWatchNextResults.results ? ytInitialData.contents.twoColumnWatchNextResults.results.results.contents.find(a => a.videoSecondaryInfoRenderer).videoSecondaryInfoRenderer.subscribeButton.subscribeButtonRenderer ? ytInitialData.contents.twoColumnWatchNextResults.results.results.contents.find(a => a.videoSecondaryInfoRenderer).videoSecondaryInfoRenderer.subscribeButton.subscribeButtonRenderer.subscribed : false : false;
            }
        },
        buildChannelTheme: async (arg, data) => {
            if(typeof(arg) !== "number") return error("buildChannelTheme: Supply valid number between 0-2");
            let channel1 = () => {
            };
            let channel2 = async() => {
                document.head.innerHTML += '<link rel="stylesheet" href="//s.ytimg.com/yt/cssbin/www-channel_new-vflrWkVe_.css">';
                let thelegend = "";
                if (window.location.pathname.split("/")[2].match(/technoblade/gi)) {
                    thelegend = `<div id="the-blood-king">Long live the blood king🐷❤️</div>`;
                }
                let {owner, time, views, title, id, url, description} = await document.ciulinYT.func.organizeVideoData(data.HOMEVIDEO);
                let tags = {age: undefined, occupation: undefined};
                let TAGS = data.DESCRIPTION.matchAll(/\[\+\w\+="(\d+|.+)"]/g);
                data.DESCRIPTION = data.DESCRIPTION.replace(/\[\+\w\+="(\d+|.+)"]/g, "");
                for (const tag of TAGS) {
                    if(tag[0].split(/\+/g)[1] == "a" && tag[0].match(/"\d+"/g) && tag[0].split(/"/g)[1] < 101) {
                        tags.age = tag[0].split(/"/g)[1];
                    }
                    if(tag[0].split(/\+/g)[1] == "o" && tag[0].match(/"\w+/g)) {
                        tags.occupation = tag[0].split(/"/g)[1];
                    }
                }
                let OBJ_age = "";
                if(tags.age !== undefined) {
                    OBJ_age = `<div class="show_info outer-box-bg-as-border"><div class="profile-info-label">${localizeString("customtag.age")}:</div><div class="profile-info-value" id="profile_show_age">${tags.age}</div><div class="cb"></div></div>`;
                }
                let OBJ_occu = "";
                if(tags.occupation !== undefined) {
                    OBJ_occu = `<div class="show_info outer-box-bg-as-border"><div class="profile-info-label">${localizeString("customtag.occupation")}:</div><div class="profile-info-value" id="profile_show_age">${tags.occupation}</div><div class="cb"></div></div>`;
                }
                let videos = "";
                for (let i = 0; i < data.VIDEOS.length; i++) {
                    let {owner, time, views, title, id, url} = data.VIDEOS[i];
                    videos += `<div id="playnav-video-play-uploads-12-${id}" class="playnav-item playnav-video">
<div style="display:none" class="encryptedVideoId">${id}</div>
<div id="playnav-video-play-uploads-12-${id}-selector" class="selector"></div>
<div class="content">
<div class="playnav-video-thumb">
<a href="https://www.youtube.com/watch?v=${id}" onclick="document.ciulinYT.func.loadPlaynavVideo('${id}');return false;" class="ux-thumb-wrap contains-addto">
<span class="video-thumb ux-thumb-96 ">
<span class="clip">
<img src="//i1.ytimg.com/vi/${id}/default.jpg" alt="Thumbnail" class="" onclick="document.ciulinYT.func.loadPlaynavVideo('${id}');return false;" title="${title}">
</span>
</span>
<span class="video-time">${time}</span>
<span dir="ltr" class="yt-uix-button-group addto-container short video-actions">
<button type="button" class="master-sprite start yt-uix-button yt-uix-button-short yt-uix-tooltip" onclick=";return false;" title="" role="button" aria-pressed="false">
<img class="yt-uix-button-icon-addto" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
<span class="yt-uix-button-content">
<span class="addto-label">${localizeString("buttons.addto")}</span>
</span>
</button>
<button type="button" class="end yt-uix-button yt-uix-button-short yt-uix-tooltip" onclick=";return false;" title="" role="button" aria-pressed="false">
<img class="yt-uix-button-arrow" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
</button>
</span>
</a>
</div>
<div class="playnav-video-info">
<a href="https://www.youtube.com/watch?v=${id}" class="playnav-item-title ellipsis" onclick="document.ciulinYT.func.loadPlaynavVideo('${id}');return false;" id="playnav-video-title-play-uploads-12-${id}">
<span dir="ltr">${title}</span>
</a>
<div class="metadata">
<span dir="ltr">${views[0]}  -  ${views[1]}</span>
</div>
<div style="display:none" id="playnav-video-play-uploads-12">${id}</div>
</div>
</div>
</div>`;
                }
                console.debug(videos);
                let recentfeed = "";
                for (let i = 0; i < data.RECENTFEED.length; i++) {
                    let u = '<tr id="feed_divider"><td colspan="3" class="outer-box-bg-as-border divider">&nbsp;</td>';
                    recentfeed += `
<tr id="feed_item" valign="top">
<td class="feed_icon">
<img class="master-sprite icon-BUL" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
</td>
<td>
<div class="feed_title">
<div dir="ltr">
<span dir="ltr">${data.RECENTFEED[i].author}</span>
<span dir="ltr"></span>
<span class="bulletin_message">${data.RECENTFEED[i].text}</span>
</div>
<div>
${data.RECENTFEED[i].images}
</div>
<div>
<span class="timestamp">(${data.RECENTFEED[i].timestamp})</span>
</div>
</div>
</td>
</tr>
${u}</tr>`;
                }
                let OBJ_SUBS = ``;
                if(data.SUBSCRIPTIONS.array.length > 1) {
                    let peeps = "";
                    let pei = [[], []];
                    for (let i = 0; i < data.SUBSCRIPTIONS.array.length; i++) {
                        let name = data.SUBSCRIPTIONS.array[i].title.simpleText.slice(0, 7) + "...";
                        let string = `<div class="user-peep" style="width:33%;">
<center>
<div class="user-thumb-large link-as-border-color">
<div>
<a href="https://www.youtube.com/channel/${data.SUBSCRIPTIONS.array[i].channelId}"><img src="${data.SUBSCRIPTIONS.array[i].thumbnail.thumbnails[0].url}"></a>
</div>
</div>
<a href="https://www.youtube.com/channel/${data.SUBSCRIPTIONS.array[i].channelId}" title="${data.SUBSCRIPTIONS.array[i].title.simpleText}" rel="following">${name}</a>
</center>
</div>`;
                        if(i < 6) {
                            pei[0].push(string);
                        } else {
                            pei[1].push(string);
                        }
                    }
                    let ueu = "";
                    let uwu = "";
                    for (let i = 0; i < pei[1].length; i++) {
                        ueu += pei[1][i];
                    }
                    for (let i = 0; i < pei[0].length; i++) {
                        uwu += pei[0][i];
                    }

                    let to = `<div class="hid">${ueu}</div>`;

                    peeps = uwu + to;

                    OBJ_SUBS = `<div class="inner-box" id="user_subscriptions" style="background-color: rgb(238, 238, 255); color: rgb(51, 51, 51);">
<div style="zoom:1">
<div class="box-title title-text-color">${localizeString("personal.subscriptions")} (<a href="?view=subscriptions" class="headersSmall" name="channel-box-item-count">${data.SUBSCRIPTIONS.length}</a>)</div>
<div class="box-editor">
<div style="float:right"></div>
</div>
<div class="cb"></div>
</div>
<div id="user_subscriptions-messages" class="hid"></div>
<div id="user_subscriptions-body">
<div style="zoom:1;margin: 0 -12px">
${peeps}
<div style="clear:both;font-height:1px"></div>
</div>
<div>
<div style="font-size: 12px; text-align: right; margin-top: 7px;">
<b><a name="channel-box-see-all" href="?view=subscriptions">${localizeString("global.seeall")}</a></b>
</div>
</div>
</div>
<div class="clear"></div>
</div>`;
                }
                let OBJ_views = "";
                if(data.INFO.string.VIEWS !== undefined) {
                    OBJ_views = `<div class="show_info outer-box-bg-as-border"><div class="profile-info-label">${(Number(data.INFO.string.VIEWS.replace(/,/g, "")) > 1) ? localizeString("about.viewedcounts") : localizeString("about.viewedcount")}</div><div class="profile-info-value" id="profile_show_viewed_count">${data.INFO.string.VIEWS}</div><div class="cb"></div></div>`;
                }
                let OBJ_join = "";
                if(data.INFO.string.JOIN !== undefined) {
                    OBJ_join = `<div class="show_info outer-box-bg-as-border"><div class="profile-info-label">${localizeString("about.membersince")}</div><div class="profile-info-value" id="profile_show_member_since">${data.INFO.string.JOIN}</div><div class="cb"></div></div>`;
                }
                let OBJ_subcount = "";
                if(data.SUBCOUNT !== undefined) {
                    OBJ_subcount = `<div class="show_info outer-box-bg-as-border"><div class="profile-info-label">${(Number(data.SUBCOUNT.replace(/,/g, "")) > 1) ? localizeString("about.subs") : localizeString("about.sub")}</div><div class="profile-info-value" id="profile_show_subscriber_count">${data.SUBCOUNT}</div><div class="cb"></div></div>`;
                }
                let OBJ_country = "";
                if(data.INFO.string.COUNTRY !== undefined) {
                    OBJ_country = `<div class="show_info outer-box-bg-as-border"><div class="profile-info-label">${localizeString("about.country")}</div><div class="profile-info-value" id="profile_show_country">${data.INFO.string.COUNTRY}</div><div class="cb"></div></div>`;
                }
                var OBJ_USERPROFILE = `<div id="user_profile" class="inner-box" style="background-color: rgb(238, 238, 255); color: rgb(51, 51, 51);">
<div class="box-title title-text-color">Profile</div>
<div class="cb"></div>
<div id="user_profile-body">
<div class="profile_info vcard">
${OBJ_views}
${OBJ_age}
${OBJ_join}
${OBJ_subcount}
${OBJ_country}
${OBJ_occu}
<div class="show_info outer-box-bg-as-border" style="border-bottom-width:1px;margin-bottom:4px;line-height:140%" dir="ltr">${data.DESCRIPTION}${data.INFO.string.BIO}</div>
</div>
</div>
<div class="cb"></div>
</div>`;
                var OBJ_PLAYNAVA = `<div id="playnav-body" style="position: inherit;">
<div id="playnav-player" class="playnav-player-container" style="visibility: visible; left: 0px;position: inherit;">
<movie-player id="video-player"></movie-player>
</div>
<div id="playnav-playview" class="" style="display: block;position: absolute;height: 0;">
<div id="playnav-left-panel" style="display: block;">
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
<div class="playnav-panel-tab-icon" id="panel-icon-info" onclick="playnav.selectPanel('info')"></div>
<div class="playnav-bottom-link" id="info-bottom-link">
<a href="javascript:;" onclick="playnav.selectPanel('info')">Info</a>
</div>
<div class="spacer">&nbsp;</div>
</td>
</tr>
<tr>
<td class="panel-tab-indicator-cell inner-box-opacity">
<div class="panel-tab-indicator-arrow" style="border-bottom-color: rgb(238, 238, 255) !important;"></div>
</td>
</tr>
</tbody>
</table>
</tr>
</tbody>
</table>
</div>
<div class="cb"></div>
<div class="playnav-video-panel inner-box-colors border-box-sizing" style="background-color: rgb(238, 238, 255); color: rgb(51, 51, 51);">
<div id="playnav-video-panel-inner" class="playnav-video-panel-inner border-box-sizing" style="overflow: auto;">
<div id="playnav-panel-info" class="scrollable" style="display: block;">
<div id="channel-like-action">
<div id="channel-like-buttons">
<button title="I like this" type="button" class="master-sprite yt-uix-button yt-uix-tooltip" data-watchid="${id}" onclick="document.ciulinYT.func.likeThis(this.getAttribute('data-watchid'));return false;" id="watch-like" role="button" aria-pressed="false">
<img class="yt-uix-button-icon-watch-like" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
<span class="yt-uix-button-content">Like</span>
</button>
&nbsp;
<button title="I dislike this" type="button" class="master-sprite yt-uix-button yt-uix-tooltip" data-watchid="${id}" onclick="document.ciulinYT.func.dislikeThis(this.getAttribute('data-watchid'));return false;" id="watch-unlike" role="button" aria-pressed="false">
<img class="yt-uix-button-icon-watch-unlike" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
</button>
</div>
<div id="channel-like-logged-out" class="hid">
<strong>
<a href="${document.ciulinYT.data.loginUrl}">Sign in</a> or <a href="https://www.youtube.com/signup">sign up</a> now!
</strong>
</div>
</div>
<div id="playnav-curvideo-title" class="inner-box-link-color" dir="ltr">
<a style="cursor:pointer;margin-right:7px" href="/watch?v=${id}" onmouseover="this.style.textDecoration='underline'" onmouseout="this.style.textDecoration='none'">
${title}
</a>
</div>
<div id="playnav-curvideo-info-line">
${localizeString("watch.from")} <span id="playnav-curvideo-channel-name"><a href="${window.location.href}">${data.CHANNELNAME}</a></span>&nbsp;|
<span dir="ltr">${views[1]}</span>
&nbsp;|
<span id="playnav-curvideo-view-count">${views[0]}</span>
</div>
<div class="cb"></div>
<div id="channel-like-result" class="hid">
<div id="watch-actions-area" class="yt-rounded">&nbsp;</div>
</div>
<div id="channel-like-loading" class="hid">${localizeString("global.loading")}</div>
<div class="cb"></div>
<div id="playnav-curvideo-description-container">
<div id="playnav-curvideo-description" dir="ltr">${description}</div>
</div>
<a href="https://www.youtube.com/watch?v=${id}" id="playnav-watch-link" onclick="playnav.goToWatchPage()">View comments, related videos, and more</a>
<div id="playnav-curvideo-controls"></div>
<div class="cb"></div>
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
</div>
<div id="playnav-play-panel" style="margin-top: -400px;height: 0;">
<div id="playnav-play-content" style="height: 601px;">
<div class="playnav-playlist-holder" id="playnav-play-playlist-uploads-holder">
<div id="playnav-play-uploads-scrollbox" style="background-color: rgb(238, 238, 255); color: rgb(51, 51, 51);" class="scrollbox-wrapper inner-box-colors">
<div class="scrollbox-content playnav-playlist-non-all">
<div class="scrollbox-body" style="height: 514px;">
<div class="outer-scrollbox">
<div id="playnav-play-uploads-items" class="inner-scrollbox">
<div id="playnav-play-uploads-page-0" class="scrollbox-page loaded videos-rows-50">
${videos}
<div id="uploads-cb" class="cb"></div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>`;
                var OBJ_PLAYNAV = `<div id="user_playlist_navigator" style="background-color: rgb(153, 153, 153); color: rgb(0, 0, 0);position: inherit;" class="outer-box yt-rounded">
<div id="playnav-channel-header" class="inner-box-bg-color" style="background-color: rgb(238, 238, 255); color: rgb(51, 51, 51);">
<div id="playnav-title-bar">
<div id="playnav-channel-name" style="background-color: rgb(153, 153, 153); color: rgb(0, 0, 0);" class="outer-box-bg-color">
<div class="channel-thumb-holder outer-box-color-as-border-color"><div class="user-thumb-semismall">
<div>
<img src="${data.CHANNELICON}">
</div>
</div>
</div>
<div class="channel-title-container">
<div class="channel-title outer-box-color" id="channel_title" dir="ltr">${data.CHANNELNAME}</div>
<div class="channel-title outer-box-color" style="font-size:11px" id="channel_base_title">${data.CHANNELNAME}'s ${localizeString("global.channel")}</div>
</div>
<div id="subscribe-buttons">
<span class="subscription-container">
<button type="button" class="subscribe-button yt-uix-button yt-uix-button-urgent yt-uix-tooltip" onclick="document.ciulinYT.func.subscribe();return false;" title="Click to be notified of new videos from this channel" role="button" data-tooltip-text="Click to be notified of new videos from this channel">
<span class="yt-uix-button-content">${data.SUBSCRIBE ? localizeString("buttons.subscribed") : localizeString("buttons.subscribe")}</span>
</button>
<span class="subscription-subscribed-container hid">
<span class="subscription-options-button subscription-expander yt-uix-expander yt-uix-expander-collapsed">
<span class="yt-uix-expander-head yt-rounded">
<button class="yt-uix-expander-arrow" onclick="return false;">
</button>
<span class="yt-alert yt-alert-success yt-alert-small yt-alert-naked yt-rounded">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" class="icon" alt="Alert icon">
<span class="yt-alert-content">${localizeString("buttons.subscribed")}</span>
</span>
</span>
</span>
</span>
</span>
</div>
</div>
<div id="playnav-chevron" style="border-left-color: rgb(153, 153, 153);">&nbsp;</div>
</div>
<div id="playnav-navbar">
<table>
<tbody>
<tr>
<td>
<a class="navbar-tab inner-box-link-color navbar-tab-selected" id="playnav-navbar-tab-playlists">Uploads</a>
</td>
</tr>
</tbody>
</table>
</div>
<div class="cb"></div>
</div>
<div id="subscription-button-module-menu" class="hid subscription-menu-expandable subscription-menu">
<div class="subscription-menu-not-logged-in">
<strong>
<a href="${document.ciulinYT.data.loginUrl}">Sign in</a> or <a href="https://www.youtube.com/signup">sign up</a> now!
</strong>
</div>
</div>
${(videos.length > 0) ? OBJ_PLAYNAVA : ""}
</div>`;
                var OBJ_RECENTACT;
                var OBJ_LEFTCOLL = `<div class="left-column" id="main-channel-left">
<div class="inner-box" style="background-color: rgb(238, 238, 255); color: rgb(51, 51, 51);">
<div style="float:left;padding:0 4px 4px 0" class="link-as-border-color">
<div class="user-thumb-xlarge">
<div>
<a href="${data.CHANNELURL}"><img src="${data.CHANNELICON}"></a>
</div>
</div>
</div>
<div style="float:left;width:170px">
<div class="box-title title-text-color" title="${data.CHANNELNAME}" style="float:none;padding-left:4px;margin-top:-2px;width:170px;overflow:hidden;font-size:111%">
<span class="yt-user-name" dir="ltr">${data.CHANNELNAME}</span>
</div>
<div style="whitespace:no-wrap;position:relative;width:170px;">
<div>
<span class="subscription-container">
<button type="button" class="subscribe-button yt-uix-button yt-uix-button-urgent yt-uix-tooltip" onclick="document.ciulinYT.func.subscribe();return false;" title="Click to be notified of new videos from this channel" role="button">
<span class="yt-uix-button-content">${data.SUBSCRIBE ? localizeString("buttons.subscribed") : localizeString("buttons.subscribe")}</span>
<img class="yt-uix-button-arrow" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
</button>
</span>
</div>
</div>
${thelegend}
</div>
<div class="cb"></div>
</div>
${OBJ_USERPROFILE}
${OBJ_SUBS}
</div>`;
                var OBJ_RIGHTCOLL = `<div class="right-column" id="main-channel-right">
<div class="inner-box" id="user_recent_activity" style="background-color: rgb(238, 238, 255); color: rgb(51, 51, 51);">
<div style="zoom:1">
<div class="box-title title-text-color">Recent Activity</div>
<div class="cb"></div>
</div>
<div id="user_recent_activity-body">
<div id="feed_table">
<div class="text-field recent-activity-content outer-box-bg-as-border" style="_width:610px">
<table width="97%" cellspacing="0" cellpadding="0" border="0">
<tbody>${recentfeed}</tbody>
</table>
</div>
</div>
</div>
</div>
<div class="clear"></div>
</div>`;
                var OBJ_CHANCON = `<div class="outer-box" id="main-channel-content" style="z-index: 0;background-color: rgb(153, 153, 153); color: rgb(0, 0, 0);">
${OBJ_LEFTCOLL}${OBJ_RIGHTCOLL}
<div class="cb"></div>
</div>`;
                return `<div id="channel-body" style="background-color: rgb(204, 204, 204)" class="jsloaded">
<div id="channel-base-div">
${OBJ_PLAYNAV}
${OBJ_CHANCON}
</div>
</div>
<div class="cb">
<div class="clear"></div>
</div>`;
            };
            let channel3 = () => {
            };
            switch (arg) {
                case 0:
                    return channel1();
                case 1:
                    return channel2();
                case 2:
                    return channel3();
                default:
                    return error("buildChannelTheme: Supply valid number between 0-2");
            }
        },
        setVolume: (vol) => {
            let volume = 0;
            switch (true) {
                case (vol == 0):
                    document.ciulinYT.func.mutePlayer();
                    break;
                case (vol < 20):
                    volume = 1;
                    break;
                case (vol < 80):
                    volume = 2;
                    break;
                case (vol < 100):
                    volume = 3;
                    break;
                default:
                    volume = 3;
                    break;
            }
            document.querySelector("#video-player").querySelector(".playbar-controls_volume").setAttribute("data-state", volume);
            if(document.ciulinYT.player.isMuted() == true) {document.ciulinYT.player.unMute();}
            document.ciulinYT.player.setVolume(vol);
        },
        waitForElm: (selector) => {
            return new Promise((resolve, reject) => {
                var el = document.querySelector(selector);
                if (el) {
                    return resolve(el);
                }
                new MutationObserver((mutationRecords, observer) => {
                    Array.from(document.querySelectorAll(selector)).forEach((element) => {
                        resolve(element);
                        observer.disconnect();
                    });
                }).observe(document.documentElement, {
                    childList: true,
                    subtree: true
                });
            });
        },
        likeThis: (ml) => {
            if(BOOL_LOGIN !== true) {
                if (window.location.pathname.split("/")[1] !== "watch") {
                    document.querySelector("#channel-like-logged-out").classList.remove("hid");
                }
                return;
            }
            var update = (math) => {
                if (window.location.pathname.split("/")[1] == "watch") {
                    var equ = parseInt(document.querySelector("span.likes").innerText.replace(/,/g, ""));
                    var equ2 = parseInt(document.querySelector("span.dislikes").innerText.replace(/,/g, ""));
                    switch (math) {
                        case 0:
                            equ -= 1;
                            equ2 += 1;
                            break;
                        case 1:
                            equ += 1;
                            equ2 -= 1;
                            break;
                    }
                    document.querySelector("span.likes").innerText = equ.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    if(document.querySelector("#watch-unlike").classList.contains("unliked")) {
                        document.querySelector("span.dislikes").innerText = equ2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    }
                }
            };
            if(document.querySelector("#watch-like").classList.contains("liked")) {
                update(0);
                document.ciulinYT.func.getApi("/youtubei/v1/like/removelike", `target:{videoId: "${ml}"}`);
                return document.querySelector("#watch-like").classList.remove("liked");
            }
            update(1);
            document.ciulinYT.func.getApi("/youtubei/v1/like/like", `target:{videoId: "${ml}"}`);
            document.querySelector("#watch-like").classList.add("liked");
            document.querySelector("#watch-unlike").classList.remove("unliked");
        },
        dislikeThis: (ml) => {
            if(BOOL_LOGIN !== true) {
                if (window.location.pathname.split("/")[1] !== "watch") {
                    document.querySelector("#channel-like-logged-out").classList.remove("hid");
                }
                return;
            }
            var update = (math) => {
                if (window.location.pathname.split("/")[1] == "watch") {
                    var equ = parseInt(document.querySelector("span.dislikes").innerText.replace(/,/g, ""));
                    var equ2 = parseInt(document.querySelector("span.likes").innerText.replace(/,/g, ""));
                    switch (math) {
                        case 0:
                            equ -= 1;
                            equ2 += 1;
                            break;
                        case 1:
                            equ += 1;
                            equ2 -= 1;
                            break;
                    }
                    document.querySelector("span.dislikes").innerText = equ.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    if(document.querySelector("#watch-like").classList.contains("liked")) {
                        document.querySelector("span.likes").innerText = equ2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    }
                }
            };
            if(document.querySelector("#watch-unlike").classList.contains("unliked")) {
                update(0);
                document.ciulinYT.func.getApi("/youtubei/v1/like/removelike", `target:{videoId: "${ml}"}`);
                return document.querySelector("#watch-unlike").classList.remove("unliked");
            }
            update(1);
            document.ciulinYT.func.getApi("/youtubei/v1/like/dislike", `target:{videoId: "${ml}"}`);
            document.querySelector("#watch-unlike").classList.add("unliked");
            document.querySelector("#watch-like").classList.remove("liked");
        },
        loadPlaynavVideo: (id) => {
            if(!id) return error("loadPlaynavVideo: No ID was specified");
            var data = new Promise(async resolve => {
                let xhr = new XMLHttpRequest();
                xhr.open("GET", "https://www.youtube.com/watch?v=" + id);
                xhr.onload = () => {
                    let a = JSON.parse(xhr.response.split("var ytInitialPlayerResponse = ")[1].split(";var")[0]).videoDetails;
                    if(!a) return resolve(undefined);
                    return resolve({description: a.shortDescription, timestamp: a.lengthSeconds});
                };
                xhr.send();
            });
            let xhr = new XMLHttpRequest();
            xhr.open("GET", `https://www.youtube.com/${window.location.pathname}/videos`);
            xhr.onload = async(e) => {
                var a = JSON.parse(xhr.response.split("var ytInitialData = ")[1].split(";</script>")[0]).contents.twoColumnBrowseResultsRenderer.tabs;
                try {
                    a = a.find(a => a.tabRenderer.endpoint.commandMetadata.webCommandMetadata.url.split("/")[3] === 'videos');
                } catch(err) {
                    return error("loadPlaynavVideo: Can't find video tab");
                }
                if(!a.tabRenderer) return;
                var b = a.tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].gridRenderer.items;
                try {
                    b = b.find(a => a.gridVideoRenderer.videoId === id);
                    b = await document.ciulinYT.func.organizeVideoData(b.gridVideoRenderer);
                } catch(err) {
                    return error("loadPlaynavVideo: Video does not exist or can't be found");
                }
                let d = await data;
                document.querySelector("#playnav-curvideo-title a").removeAttribute("onclick");
                document.querySelector("#playnav-curvideo-title a").setAttribute("href", "/watch?v=" + b.id);
                document.querySelector("#playnav-curvideo-title a").innerText = b.title;
                document.querySelector("#playnav-curvideo-info-line span[dir='ltr']").innerText = b.views[1];
                document.querySelector("#playnav-curvideo-description").innerText = d.description;
                document.querySelector("#playnav-curvideo-view-count").innerText = b.views[0];
                document.querySelector("#watch-like").setAttribute("data-watchid", b.id);
                document.querySelector("#watch-unlike").setAttribute("data-watchid", b.id);
                document.querySelector("#timestamp_total").innerText = document.ciulinYT.func.calculateLength(parseInt(d.timestamp));
                document.querySelector("#playnav-watch-link").href = "https://www.youtube.com/watch?v=" + b.id;
                document.querySelector(".playbar-controls_play").setAttribute("data-state", "1");
                document.ciulinYT.player.loadVideoById(b.id, 1);
            };

            xhr.onerror = () => {
                console.error("** An error occurred during the XMLHttpRequest");
            };

            xhr.send();
        },
        subscribe: async() => {
            if(BOOL_LOGIN !== true) {
                if (window.location.pathname.split("/")[1] !== "watch") {
                    document.querySelector("#subscription-button-module-menu").classList.remove("hid");
                }
                return;
            }
            if((ytInitialData.metadata ? ytInitialData.metadata.channelMetadataRenderer.title : "") == document.ciulinYT.data.name) return document.ciulinYT.func.showModal("No need to subscribe to yourself!");
            if((ytInitialPlayerResponse ? ytInitialPlayerResponse.videoDetails.author : "") == document.ciulinYT.data.name) return document.ciulinYT.func.showModal("No need to subscribe to yourself!");
            if(BOOL_SUBSCRIBE == null) BOOL_SUBSCRIBE = ytInitialData.header.c4TabbedHeaderRenderer.subscribeButton.subscribeButtonRenderer.subscribed;

            let ytapi = ytInitialData.metadata ? ytInitialData.metadata.channelMetadataRenderer.externalId : (ytInitialPlayerResponse) ? ytInitialPlayerResponse.videoDetails.channelId : "";
            var sub = BOOL_SUBSCRIBE;
            var button = document.querySelector(".yt-subscription-button") ? ".yt-subscription-button" : ".subscribe-button";
            var text = "";

            switch(sub) {
                case false:
                    await document.ciulinYT.func.getApi("/youtubei/v1/subscription/subscribe", `channelIds: ["${ytapi}"]`);
                    text = localizeString("buttons.subscribed");
                    document.querySelector(button).classList.add("subscribed");
                    BOOL_SUBSCRIBE = true;
                    break;
                case true:
                    await document.ciulinYT.func.getApi("/youtubei/v1/subscription/unsubscribe", `channelIds: ["${ytapi}"]`);
                    text = localizeString("buttons.subscribe");
                    document.querySelector(button).classList.remove("subscribed");
                    BOOL_SUBSCRIBE = false;
                    break;
            }

            document.querySelectorAll(`${button} .yt-uix-button-content`).forEach((a) => { a.innerText = text;});
        },
        uninitCommentsForm: () => {
            if(!document.querySelector(".comments-post").classList.contains("has-focus")) return;
            let _dom = document.querySelector(".comments-post");
            let _com = document.querySelector(".comments-textarea");
            document.querySelector(".comments-remaining-count").innerText = "500";
            _dom.classList.remove("has-focus");
            _com.value = "";
            _com.textContent = "";
        },
        initCommentsForm: () => {
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
        preProPos: () => {
            let track = (document.ciulinYT.player.getCurrentTime() / document.ciulinYT.player.getDuration() * 100) + "%";
            document.querySelector(".scrubbar_track_played").style.width = track;
            document.querySelector(".scrubbar_track_handle").style.left = track;
        },
        showModal: (text) => {
            alert(text);
        },
        getSApiSidHash: async () => {
            function sha1(str) {
                return window.crypto.subtle.digest("SHA-1", new TextEncoder("utf-8").encode(str)).then(buf => {
                    return Array.prototype.map.call(new Uint8Array(buf), x=>(('00'+x.toString(16)).slice(-2))).join('');
                });
            }

            const MS = Date.now().toString();
            const TIMESTAMP = MS.substring(0, MS.length - 3);
            const digest = await sha1(`${TIMESTAMP} ${document.ciulinYT.func.getCookie("SAPISID")} https://www.youtube.com`);

            return `SAPISIDHASH ${TIMESTAMP}_${digest}`;
        },
        getApi: async(url, json) => {
            var test = new Promise(async resolve => {
                let xhr = new XMLHttpRequest();
                xhr.open("POST", "https://www.youtube.com" + url + "?key=" + yt.config_.INNERTUBE_API_KEY + "&prettyPrint=false");
                xhr.setRequestHeader("Content-Type", "application/json");
                xhr.setRequestHeader("TE", "trailers");
                xhr.setRequestHeader("Sec-Fetch-Mode", "same-origin");
                xhr.setRequestHeader("Accept-Encoding", "gzip, deflate, br");
                xhr.setRequestHeader("Accept-Language", "en-US,en;q=0.5");
                xhr.setRequestHeader("X-Goog-AuthUser", "0");
                xhr.setRequestHeader("X-Goog-Visitor-Id", yt.config_.INNERTUBE_CONTEXT.client.visitorData);
                xhr.setRequestHeader("X-Youtube-Client-Version", yt.config_.INNERTUBE_CONTEXT.client.clientVersion);
                xhr.setRequestHeader("X-Youtube-Bootstrap-Logged-In", "true");
                xhr.setRequestHeader("X-Youtube-Client-Name", "1");
                xhr.setRequestHeader("X-Origin", "https://www.youtube.com");
                if (document.ciulinYT.func.getCookie("SAPISID")) {
                    xhr.setRequestHeader("Authorization", await document.ciulinYT.func.getSApiSidHash());
                }
                xhr.onload = async () => {
                    resolve(xhr.response);
                };
                json = json ? json + "," : "";
                let click = JSON.stringify(yt.config_.INNERTUBE_CONTEXT.clickTracking),
                    client = JSON.stringify(yt.config_.INNERTUBE_CONTEXT.client),
                    request = JSON.stringify(yt.config_.INNERTUBE_CONTEXT.request),
                    user = JSON.stringify(yt.config_.INNERTUBE_CONTEXT.user);
                let jso = `{${json} context: {clickTracking: ${click}, client: ${client}, clientScreenNonce: "${yt.config_["client-screen-nonce"]}", user: ${user}, request: ${request}}}`;

                xhr.send(jso);
            });

            let a = await test;

            return JSON.parse(a);
        },
        checkLogin: async() => {
            if(document.ciulinYT.data.name > 1) return true;
            if(!document.ciulinYT.func.getCookie("APISID")) return false;
            let isLoggedIn = await document.ciulinYT.func.getApi("/youtubei/v1/account/account_menu");
            let r = isLoggedIn.responseContext.mainAppWebResponseContext.loggedOut ? false : true;

            if(r == true) {
                let popup = isLoggedIn.actions[0].openPopupAction.popup.multiPageMenuRenderer;
                document.ciulinYT.data.loggedin = true;
                document.ciulinYT.data.name = popup.header.activeAccountHeaderRenderer.accountName.simpleText;
                document.ciulinYT.data.pfp = popup.header.activeAccountHeaderRenderer.accountPhoto.thumbnails[0].url;
                document.ciulinYT.data.link = popup.sections[0].multiPageMenuSectionRenderer.items[0].compactLinkRenderer.navigationEndpoint ? popup.sections[0].multiPageMenuSectionRenderer.items[0].compactLinkRenderer.navigationEndpoint.commandMetadata.webCommandMetadata.url : popup.sections[0].multiPageMenuSectionRenderer.items[0].compactLinkRenderer.serviceEndpoint.commandMetadata.webCommandMetadata.url;
            }
            return r;
        },
        parseLang: (la) => {
            return document.ciulinYT.data.lang[la];
        },
        parseCoun: (cc) => {
            let list = {
                "DK": "Danmark"
            };
            return list[cc];
        }
    };
    if(window.location.pathname.split("/")[1] == "embed"){
        document.ciulinYT.func.waitForElm(".ytp-show-cards-title").then((elm) => {elm.parentNode.removeChild(elm);});
        document.ciulinYT.func.waitForElm(".ytp-watermark").then((elm) => {elm.parentNode.removeChild(elm);});
        document.ciulinYT.func.waitForElm(".html5-endscreen").then((elm) => {elm.parentNode.removeChild(elm);});
        document.ciulinYT.func.waitForElm(".ytp-pause-overlay").then((elm) => {elm.parentNode.removeChild(elm);});
        return;
    }
    if(window.location.pathname.split("/")[1] == "watch"){
        let elm = document.querySelector(".video-stream.html5-main-video");
        elm.pause();
        elm.src = "";
        elm.play();
        elm.parentNode.removeChild(elm);
    }
    async function buildYouTube() {
        var DOMHTML = document.querySelector("html");
        var TIMEDATE = new Date();
        var ARR_MONTH = (TIMEDATE.getMonth() < 10) ? "0" + TIMEDATE.getMonth() : TIMEDATE.getMonth();
        var ARR_DATE = (TIMEDATE.getDate() < 10) ? "0" + TIMEDATE.getDate() : TIMEDATE.getDate();
        var VALUE_DATE = TIMEDATE.getFullYear() + "" + ARR_MONTH + "" + ARR_DATE;
        var VALUE_LANG = await document.ciulinYT.func.getFromStorage("lang");
        var VALUE_TITLE = "YouTube - Broadcast Yourself.";
        DOMHTML.removeAttribute("style");
        DOMHTML.removeAttribute("standardized-themed-scrollbar");
        DOMHTML.setAttribute("dir", "ltr");
        DOMHTML.setAttribute("xmlns:og", "https://opengraphprotocol.org/schema/");
        DOMHTML.setAttribute("lang", VALUE_LANG.value);
        document.querySelector("head").innerHTML = "<title></title>";
        var DOMHEAD = document.querySelector("head");
        document.title = VALUE_TITLE;
        DOMHEAD.innerHTML += '<link rel="icon" href="//s.ytimg.com/yt/favicon-refresh-vfldLzJxy.ico">';
        DOMHEAD.innerHTML += '<link rel="shortcut icon" href="//s.ytimg.com/yt/favicon-refresh-vfldLzJxy.ico">';
        DOMHEAD.innerHTML += '<link rel="stylesheet" href="//s.ytimg.com/yts/cssbin/www-core-vfleLhVpH.css"><link rel="stylesheet" class="refresh" href="//s.ytimg.com/yt/cssbin/www-refresh-vflzVUPsm.css"><link rel="stylesheet" href="//s.ytimg.com/yt/cssbin/www-the-rest-vflNb6rAI.css">';
        document.body.innerHTML = "";
        await document.ciulinYT.func.checkLogin().then(afs => {BOOL_LOGIN = afs;});
        var DOMBODY = document.body;
        var SUPERDOM = document.createElement("div");
        SUPERDOM.setAttribute("id", "page");
        DOMBODY.setAttribute("class", `date-${VALUE_DATE} ${VALUE_LANG.value} ltr ytg-old-clearfix guide-feed-v2 gecko gecko-16`);
        DOMBODY.setAttribute("dir", "ltr");
        DOMHTML.appendChild(DOMBODY);

        let OBJ_MASTH = "";
        let OBJ_USER = "";
        if(BOOL_LOGIN === true) {
            OBJ_MASTH = `<div id="masthead-expanded" class="hid">
<div id="masthead-expanded-container" class="with-sandbar">
<div id="masthead-expanded-menus-container">
<span id="masthead-expanded-menu-shade"></span>
<div id="masthead-expanded-google-menu">
<span class="masthead-expanded-menu-header">Google account</span>
<div id="masthead-expanded-menu-google-container">
<img id="masthead-expanded-menu-gaia-photo" alt="" src="${document.ciulinYT.data.pfp}">
<div id="masthead-expanded-menu-account-info">
<p>${document.ciulinYT.data.name}</p>
<p id="masthead-expanded-menu-email"><img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""></p>
</div>
<div id="masthead-expanded-menu-google-column1">
<ul>
<li class="masthead-expanded-menu-item"><a href="https://profiles.google.com?authuser=0">Profile</a></li>
<li class="masthead-expanded-menu-item"><a href="https://plus.google.com/u/0/stream">Google+</a></li>
<li class="masthead-expanded-menu-item"><a href="https://plus.google.com/u/0/settings/privacy">Privacy</a></li>
</ul>
</div>
<div id="masthead-expanded-menu-google-column2">
<ul>
<li class="masthead-expanded-menu-item">
<a href="https://plus.google.com/u/0/settings">Settings</a>
</li>
<li class="masthead-expanded-menu-item">
<a class="end" href="/logout">Sign out</a>
</li>
<li class="masthead-expanded-menu-item">
<a href="#" onclick="yt.www.masthead.accountswitch.toggle(); return false;">Switch account</a>
</li>
</ul>
</div>
</div>
</div>
<div id="masthead-expanded-menu">
<span class="masthead-expanded-menu-header">YouTube</span>
<ul id="masthead-expanded-menu-list">
<li class="masthead-expanded-menu-item">
<a href="${document.ciulinYT.data.link}?feature=mhee">${localizeString("personal.mychannel")}</a>
</li>
<li class="masthead-expanded-menu-item">
<a href="/my_videos?feature=mhee">${localizeString("personal.videomanager")}</a>
</li>
<li class="masthead-expanded-menu-item">
<a href="/?c=subscriptions" onclick="document.ciulinYT.load.home_category(document.querySelector('[data-feed-name=subscriptions]')); return false;">${localizeString("personal.subscriptions")}</a>
</li>
<li class="masthead-expanded-menu-item">
<a href="/account?feature=mhee">${localizeString("personal.settings")}</a>
</li>
</ul>
</div>
</div>
<div id="masthead-expanded-sandbar">
<div id="masthead-expanded-lists-container">
<div id="masthead-expanded-loading-message">${localizeString("global.loading")}</div>
</div>
</div>
<div class="clear"></div>
</div>
</div>`;
            OBJ_USER = `<span id="masthead-gaia-user-expander" class="masthead-user-menu-expander masthead-expander" onclick="document.ciulinYT.func.toggleExpandedMasthead()">
<span id="masthead-gaia-user-wrapper" class="yt-rounded" tabindex="0">${document.ciulinYT.data.name}</span></span>
<span id="masthead-gaia-photo-expander" class="masthead-user-menu-expander masthead-expander" onclick="document.ciulinYT.func.toggleExpandedMasthead()">
<span id="masthead-gaia-photo-wrapper" class="yt-rounded">
<span id="masthead-gaia-user-image">
<span class="clip">
<span class="clip-center">
<img src="${document.ciulinYT.data.pfp}" alt="">
<span class="vertical-center"></span>
</span>
</span>
</span>
<span class="masthead-expander-arrow"></span>
</span>
</span>`;
        } else {
            OBJ_USER = `<a class="start" href="https://www.youtube.com/signup">Create Account</a><span class="masthead-link-separator">|</span><a class="end" href="${document.ciulinYT.data.loginUrl}">Sign In</a>`;
        }
        var OBJ_MASTHEAD;
        var OBJ_FOOTER;
        var OBJ_CHANNEL = "";

        document.ciulinYT.data.lang = document.ciulinYT.func.parseLang(VALUE_LANG.value);
        document.ciulinYT.data.country = document.ciulinYT.func.parseCoun(yt.config_.GL);

        if(window.location.pathname == "/") {
            let FUNC = (async () => {
                let guidebuilder = "";
                let subsbuilder = "";
                let c = "";
                if(BOOL_LOGIN === true) {
                    let subsarr = await document.ciulinYT.load.subscriptions();
                    let mhtml = ``;
                    for (let i = 0; i < subsarr.length; i++) {
                        let html = `<li class="guide-item-container">
<a class="guide-item" data-feed-name="${subsarr[i].title}" href="/channel/${subsarr[i].id}">
<span class="thumb">
<img class="system-icon" src="${subsarr[i].icon}" alt="">
</span><span class="display-name">${subsarr[i].title}</span>
</a>
</li>`;
                        mhtml += html;
                    }
                    subsbuilder = `<div class="guide">
<div id="channel">
<span id="channel-thumb">
<a href="${document.ciulinYT.data.link}" class="yt-user-photo">
<span class="video-thumb ux-thumb yt-thumb-square-77">
<span class="yt-thumb-clip">
<span class="yt-thumb-clip-inner">
<img src="${document.ciulinYT.data.pfp}" alt="${document.ciulinYT.data.name}" width="77">
<span class="vertical-align"></span>
</span>
</span>
</span>
</a>
</span>
<div id="personal-feeds">
<ul>
<li class="guide-item-container">
<a class="guide-item guide-item-action" href="${document.ciulinYT.data.link}?feature=guide">${localizeString("personal.mychannel")}<img src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" class="see-more-arrow" alt=""></a>
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
<h3 class="guide-item-container selected-child">
<a class="guide-item" data-feed-name="subscriptions" data-feed-url="/feed/subscriptions" data-feed-display="Subscriptions" data-feed-icon="subscriptions" onclick="document.ciulinYT.load.home_category(this)">
<span class="thumb">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="" class="system-icon category">
</span><span class="display-name">${localizeString("personal.subscriptions")}</span>
</a>
</h3>
<ul>
${mhtml}
</ul>
</div>
</div>`;
                    guidebuilder = `<div id="guide-builder-promo">
<div id="guide-builder-promo-buttons">
<button type="button" class="yt-uix-button yt-uix-button-primary">
<span class="thumb">
<img class="yt-uix-button-icon-add" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
</span><span class="yt-uix-button-content">Browse channels</span>
</button>
</div>
</div>`;
                } else {
                    guidebuilder = `<div id="guide-builder-promo">
<h2>Sign in to customize your homepage</h2>
<div id="guide-builder-promo-buttons" class="signed-out">
<button href="${document.ciulinYT.data.loginUrl}" type="button" class="yt-uix-button yt-uix-button-dark" onclick=";window.location.href=this.getAttribute('href');return false;" role="button">
<span class="yt-uix-button-content">Sign In </span>
</button>
<button href="/signup?next=%2Fchannels%3Ffeature%3Dsignup" type="button" class="yt-uix-button yt-uix-button-primary" onclick=";window.location.href=this.getAttribute('href');return false;" role="button">
<span class="yt-uix-button-content">Create Account </span>
</button>
</div>
</div>`;
                }
                document.ciulinYT.func.waitForElm("#page").then(async elm => {
                    let categories = ["technoblade", "trending", "popular", "music", "live", "gadgets", "news", "sports", "education", "howto"];
                    for (let i = 0; i < categories.length; i++) {
                        let caties = await document.ciulinYT.load.homepage_list(categories[i]);
                        let html = `<li class="guide-item-container">
<a class="guide-item" data-feed-name="${caties.class}" data-feed-url="${caties.url}" onclick="document.ciulinYT.load.home_category(this)">
<span class="thumb">
<img class="system-icon system ${caties.class}" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
</span><span class="display-name">${caties.name}</span>
</a>
</li>`;
                        c += html;
                    }
                    document.querySelector(".cockie").innerHTML = c;
                });
                document.ciulinYT.func.waitForElm("#page").then(async () => {
                    let w;
                    if(window.location.search == "?c=subscriptions") {
                        w = document.querySelector("[data-feed-name='subscriptions']");
                    } else
                        w = document.querySelector("[data-feed-name='youtube']");
                    document.ciulinYT.load.home_category(w);
                });
                DOMHEAD.innerHTML += '<link rel="stylesheet" href="//s.ytimg.com/yts/cssbin/www-guide-vfljovH6N.css">';
                return `<div id="content">
<div class="guide-layout-container enable-fancy-subscribe-button">
<div class="guide-container">
${guidebuilder}
<div class="guide">
${subsbuilder}
<div class="guide-section yt-uix-expander">
<h3 class="guide-item-container selected-child">
<a class="guide-item selected" data-feed-name="youtube" data-feed-url="" onclick="document.ciulinYT.load.home_category(this)">
<span class="thumb">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="" class="system-icon category">
</span><span class="display-name">${localizeString("guide.fromyt")}</span>
</a>
</h3>
<ul class="cockie">
${c}
</ul>
</div>
</div>
</div>
<div class="guide-background"></div>
<div id="feed" style="width: 790px;">
<div id="feed-main-youtube" class="individual-feed">
<div class="feed-header no-metadata before-feed-content">
<div class="feed-header-thumb">
<img class="feed-header-icon youtube" alt="" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
</div>
<div class="feed-header-details">
<h2 class="feed-header-info">${localizeString("guide.fromyt")}</h2>
</div>
</div>
<div class="feed-container">
<div class="feed-page">
<ul class="context-data-container">
</ul>
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
${localizeString("global.loading")}
</p>
</div>
</div>
</div>
<div id="feed-background" style="width: 790px;"></div>
</div>
</div>`;
            })();
            OBJ_CHANNEL = await FUNC;
        }
        if(window.location.pathname.split("/")[1].match(/watch/i)) {
            let FUNC = (async () => {
                document.querySelector(".refresh").parentNode.removeChild(document.querySelector(".refresh"));
                let commen = "";
                if (BOOL_LOGIN == true) {
                    commen = `<form class="comments-post" method="post">
<input type="text" id="session" hidden="">
<div class="yt-alert yt-alert-default yt-alert-error hid comments-post-message">
<div class="yt-alert-icon">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" class="icon master-sprite" alt="Alert icon">
</div>
<div class="yt-alert-buttons"></div><div class="yt-alert-content" role="alert"></div></div>
<a href="${document.ciulinYT.data.link}" class="yt-user-photo comments-post-profile">
<span class="video-thumb ux-thumb yt-thumb-square-46">
<span class="yt-thumb-clip">
<span class="yt-thumb-clip-inner">
<img src="${document.ciulinYT.data.pfp}" alt="${document.ciulinYT.data.name}" width="46"><span class="vertical-align"></span>
</span>
</span>
</span>
</a>
<div class="comments-textarea-container" onclick="document.ciulinYT.func.initCommentsForm();">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="" class="comments-textarea-tip">
<label class="comments-textarea-label" data-upsell="comment">Respond to this video...</label>  <div class="yt-uix-form-input-fluid yt-grid-fluid ">
<textarea id="" class="yt-uix-form-textarea comments-textarea" onfocus="document.ciulinYT.func.initCommentsForm();" data-upsell="comment" name="comment"></textarea>
</div>
</div>
<p class="comments-remaining">
<span class="comments-remaining-count" data-max-count="500">500</span> ${localizeString("comments.charactersremain")}
</p>
<p class="comments-threshold-countdown hid">
<span class="comments-threshold-count"></span> ${localizeString("comments.secondsremain")}
</p>
<p class="comments-post-buttons">
<button type="submit" class="comments-post yt-uix-button yt-uix-button-default" onclick=";return true;" role="button">
<span class="yt-uix-button-content">${localizeString("buttons.post")} </span>
</button>
</p>
</form>`;
                } else {
                    commen = `<div class="comments-post-alert">
<a href="${document.ciulinYT.data.loginUrl}">Sign In</a> or <a href="https://www.youtube.com/signup">Sign Up</a><span class="comments-post-form-rollover-text"> now to post a comment!</span>
</div>`;
                }
                let {id, views, title, upload, url, tags, owner, description, category} = await document.ciulinYT.func.organizeVideoData(ytInitialPlayerResponse);
                BOOL_SUBSCRIBE = document.ciulinYT.func.getSubscription();
                var VALUE_SUGGVIDLOG = (BOOL_LOGIN == true) ? "addto-watch-later-button": "addto-watch-later-button-sign-in";
                var VALUE_VIDEOTAGS = "";
                var OBJ_SUGGESTEDVIDEO = ytInitialData.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results[1].itemSectionRenderer ? ytInitialData.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results[1].itemSectionRenderer.contents : ytInitialData.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results;
                var OBJ_SUGGESTEDVIDEOS = "";
                var VALUE_SUBBUTTON = document.ciulinYT.func.getSubscription() ? "subscribed" : "subscribe";
                var isLiked = ytInitialData.contents.twoColumnWatchNextResults.results ? ytInitialData.contents.twoColumnWatchNextResults.results.results.contents.find(a => a.videoPrimaryInfoRenderer).videoPrimaryInfoRenderer.videoActions.menuRenderer.topLevelButtons[0].toggleButtonRenderer.isToggled ? "liked" : false : "";
                var isDisliked = ytInitialData.contents.twoColumnWatchNextResults.results? ytInitialData.contents.twoColumnWatchNextResults.results.results.contents.find(a => a.videoPrimaryInfoRenderer).videoPrimaryInfoRenderer.videoActions.menuRenderer.topLevelButtons[1].toggleButtonRenderer.isToggled ? "unliked" : false : "";
                for (let i = 0; i < tags.length; i++) {
                    VALUE_VIDEOTAGS += `<li><a href="https://www.youtube.com/results?search_query=${tags[i]}&amp;search=tag">${tags[i]}</a></li>`;
                }
                for (let i = 0; i < OBJ_SUGGESTEDVIDEO.length; i++) {
                    if(OBJ_SUGGESTEDVIDEO[i].compactVideoRenderer) {
                        let {owner, time, views, title, id, url} = await document.ciulinYT.func.organizeVideoData(OBJ_SUGGESTEDVIDEO[i].compactVideoRenderer);
                        OBJ_SUGGESTEDVIDEOS += `<li class="video-list-item">
<a href="https://www.youtube.com/watch?v=${id}" class="related-video yt-uix-contextlink yt-uix-sessionlink">
<span class="ux-thumb-wrap contains-addto">
<span class="video-thumb ux-thumb yt-thumb-default-120">
<span class="yt-thumb-clip">
<span class="yt-thumb-clip-inner">
<img src="//i1.ytimg.com/vi/${id}/default.jpg" alt="Thumbnail"><span class="vertical-align"></span>
</span>
</span>
</span>
<span class="video-time">${time}</span>
<button type="button" class="addto-button video-actions spf-nolink ${VALUE_SUGGVIDLOG} yt-uix-button yt-uix-button-default yt-uix-button-short yt-uix-tooltip" onclick=";return false;" role="button">
<span class="yt-uix-button-content">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="${localizeString("personal.watchlater")}">
</span>
<img class="yt-uix-button-arrow" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
</button>
</span>
<span dir="ltr" class="title" title="${title}">${title}</span>
<span class="stat attribution">${localizeString("watch.by")} <span class="class="yt-user-name" dir="ltr">${owner.text}</span></span>
<span class="stat view-count">${views[0]}</span>
</a>
</li>`;
                    }
                }
                document.ciulinYT.func.waitForElm(".video-stream.html5-main-video").then((elm) => elm.parentNode.removeChild(elm));
                document.ciulinYT.func.waitForElm("#video-player").then((elm) => {
                    document.ciulinYT.func.buildPlayer(id, window.location.href.split("t=")[1] ? window.location.href.split("t=")[1].split("s")[0] : 1);
                    var xhr = new XMLHttpRequest();
                    xhr.open("GET", "https://returnyoutubedislikeapi.com/Votes?videoId=" + id);
                    xhr.send();
                    xhr.onload = (e) => {
                        var result = JSON.parse(e.target.response);
                        var likes = result.likes;
                        var dislikes = result.dislikes;
                        var rating = likes + dislikes > 0 ? (likes / (likes + dislikes)) * 100 : 50;
                        document.querySelector(".video-extras-sparkbar-likes").style.width = rating + "%";
                        document.querySelector(".likes").innerText = likes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        document.querySelector(".dislikes").innerText = dislikes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    };
                });
                document.ciulinYT.func.waitForElm(".comments-post").then(() => {
                    document.querySelector(".comments-post").addEventListener("submit", async (e) => {
                        e.preventDefault();
                        let comm = document.querySelector(".comments-textarea").value;
                        let api = await document.ciulinYT.func.getApi("/youtubei/v1/comment/create_comment", `createCommentParams: "${document.querySelector("input#session").value}", commentText: "${comm}"`);
                        if(api.actionResult.status == "STATUS_SUCCEEDED") {
                            let re = api.actions[0].runAttestationCommand.ids;
                            let comments = document.querySelector("ul.comment-list");
                            let comment = document.createElement("li");
                            comment.setAttribute("class", "comment yt-tile-default");
                            comment.setAttribute("data-author-id", re[2].externalChannelId);
                            comment.setAttribute("data-id", re[0].commentId);
                            comment.setAttribute("data-score", "-1");
                            let json = {cum: "a", authorText: {simpleText: document.ciulinYT.data.name}, commentId: re[0].commentId, contentText: {runs: [{text: comm}]}, publishedTimeText: {runs: [{text: "Just now"}]}, authorEndpoint: {browseEndpoint: {canonicalBaseUrl: document.ciulinYT.data.link}}};
                            let newc = await document.ciulinYT.func.organizeCommentData(json);
                            comment.innerHTML = newc;
                            comments.insertBefore(comment, comments.children[0]);
                            document.ciulinYT.func.uninitCommentsForm();
                            let pp = await document.ciulinYT.func.getApi("/youtubei/v1/att/get", `engagementType: "ENGAGEMENT_TYPE_COMMENT_POST", ids: ${JSON.stringify(re)}`);
                        }
                        return false;
                    });
                });
                document.ciulinYT.func.waitForElm(".comment-list").then(async (elm) => {
                    if (ytInitialData.contents.twoColumnWatchNextResults.results.results.contents.filter(b => b.itemSectionRenderer)[1]) {
                        document.querySelector("#comments-view").classList.remove("hid");
                        let con = ytInitialData.contents.twoColumnWatchNextResults.results.results.contents.filter(b => b.itemSectionRenderer)[1].itemSectionRenderer.contents[0].continuationItemRenderer.continuationEndpoint.continuationCommand.token;
                        let comments = await document.ciulinYT.load.comments(con, 0);
                    }
                });
                return `<div id="content" class="">
<div id="watch-container" itemscope="" itemtype="https://schema.org/VideoObject">
<div id="watch-headline-container">
<div id="watch-headline" class="watch-headline">
<h1 id="watch-headline-title">
<span id="eow-title" class="" dir="ltr" title="${title}">
${title}
</span>
</h1>
<div id="watch-headline-user-info">
<span class="yt-uix-button-group">
<button href="https://www.youtube.com${url}?feature=watch" type="button" class="start yt-uix-button yt-uix-button-default" onclick=";window.location.href=this.getAttribute('href');return false;" role="button">
<span class="yt-uix-button-content">${owner}</span>
</button><div class="yt-subscription-button-hovercard yt-uix-hovercard">
<span class="yt-uix-button-context-light yt-uix-button-subscription-container">
<button href="" type="button" class="yt-subscription-button yt-subscription-button-js-default end yt-uix-button yt-uix-button-subscription yt-uix-tooltip ${VALUE_SUBBUTTON}" onclick="document.ciulinYT.func.subscribe();return false;" role="button">
<span class="yt-uix-button-icon-wrapper">
<img class="yt-uix-button-icon yt-uix-button-icon-subscribe" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
</span><span class="yt-uix-button-content">
<span class="subscribe-label">${localizeString("buttons.subscribe")}</span>
<span class="subscribed-label">${localizeString("buttons.subscribed")}</span>
<span class="unsubscribe-label">${localizeString("buttons.unsubscribe")}</span>
</span>
</button>
<span class="yt-subscription-button-disabled-mask"></span>
</span>
<div class="yt-uix-hovercard-content hid">
<p class="loading-spinner">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
${localizeString("global.loading")}
</p>
</div>
</div>
</span>
</div>
<div id="watch-more-from-user" class="collapsed">
<div id="watch-channel-discoverbox" class="yt-rounded">
<span id="watch-channel-loading">${localizeString("global.loading")}</span>
</div>
</div>
</div>
</div>
<div id="watch-video-container">
<div id="watch-video" style="position:inherit">
<div id="watch-player" class="flash-player player-root wm-videoplayer" style="position:inherit;">
<movie-player id="video-player"></movie-player>
</div>
</div>
</div>
<div id="watch-main-container">
<div id="watch-main">
<div id="watch-panel">
<div id="watch-actions">
<div id="watch-actions">
<div id="watch-actions-right">
<span class="watch-view-count">
<strong>${views[0]}</strong>
</span>
<button onclick=";return false;" title="Show video statistics" type="button" id="watch-insight-button" class="yt-uix-tooltip yt-uix-tooltip-reverse yt-uix-button yt-uix-button-default yt-uix-tooltip yt-uix-button-empty" role="button"><span class="yt-uix-button-icon-wrapper"><img class="yt-uix-button-icon yt-uix-button-icon-watch-insight" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Show video statistics"><span class="yt-valign-trick"></span></span></button>
</div>
<span id="watch-like-unlike" class="yt-uix-button-group"><button onclick="document.ciulinYT.func.likeThis('${id}');return false;" title="${localizeString("tooltip.ilikethis")}" type="button" class="start yt-uix-tooltip-reverse yt-uix-button yt-uix-button-default yt-uix-tooltip" id="watch-like" role="button" data-tooltip-text="${localizeString("tooltip.ilikethis")}"><span class="yt-uix-button-icon-wrapper"><img class="yt-uix-button-icon yt-uix-button-icon-watch-like" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="${localizeString("tooltip.ilikethis")}"><span class="yt-valign-trick"></span></span><span class="yt-uix-button-content">${localizeString("buttons.like")} </span></button><button onclick="document.ciulinYT.func.dislikeThis('${id}');return false;" title="${localizeString("tooltip.idislikethis")}" type="button" class="end yt-uix-tooltip-reverse yt-uix-button yt-uix-button-default yt-uix-tooltip yt-uix-button-empty" id="watch-unlike" role="button" data-tooltip-text="${localizeString("tooltip.idislikethis")}"><span class="yt-uix-button-icon-wrapper"><img class="yt-uix-button-icon yt-uix-button-icon-watch-unlike" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="${localizeString("tooltip.idislikethis")}"><span class="yt-valign-trick"></span></span></button></span>
<button type="button" class="yt-uix-tooltip-reverse yt-uix-button yt-uix-button-default yt-uix-tooltip" onclick=";return false;" title="${localizeString("tooltip.addto")}" role="button" data-tooltip-text="${localizeString("tooltip.addto")}"><span class="yt-uix-button-content"><span class="addto-label">${localizeString("buttons.addto")}</span> </span></button>
<button onclick=";return false;" title="Share or embed this video" type="button" class="yt-uix-tooltip-reverse yt-uix-button yt-uix-button-default yt-uix-tooltip" id="watch-share" data-button-action="yt.www.watch.actions.share" role="button" data-tooltip-text="${localizeString("tooltip.share")}"><span class="yt-uix-button-content">${localizeString("buttons.share")} </span></button>
<button onclick=";return false;" title="Flag as inappropriate" type="button" class="yt-uix-tooltip-reverse yt-uix-button yt-uix-button-default yt-uix-tooltip yt-uix-button-empty" id="watch-flag" data-button-action="yt.www.watch.actions.flag" role="button" data-tooltip-text="${localizeString("tooltip.flag")}"><span class="yt-uix-button-icon-wrapper"><img class="yt-uix-button-icon yt-uix-button-icon-watch-flag" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="${localizeString("tooltip.flag")}"><span class="yt-valign-trick"></span></span></button>
<button onclick=";return false;" title="Interactive Transcript" type="button" class="yt-uix-tooltip-reverse yt-uix-button yt-uix-button-default yt-uix-tooltip yt-uix-button-empty" id="watch-transcript" data-button-action="yt.www.watch.actions.transcript" role="button"><span class="yt-uix-button-icon-wrapper"><img class="yt-uix-button-icon yt-uix-button-icon-transcript" src="//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif" alt="Interactive Transcript"><span class="yt-valign-trick"></span></span></button>
</div>
</div>
<div id="watch-actions-area-container" class="hid">
<div id="watch-actions-area" class="yt-rounded">
<div id="watch-actions-loading" class="watch-actions-panel hid">${localizeString("global.loading")}</div>
<div id="watch-actions-logged-out" class="watch-actions-panel hid">
<div class="yt-alert yt-alert-warn yt-alert-small yt-alert-naked yt-rounded">
<span class="yt-alert-icon">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" class="icon master-sprite" alt="Alert icon">
</span>
<div class="yt-alert-content">
<strong>
<a href="${document.ciulinYT.data.loginUrl}">Sign In</a> or <a href="https://www.youtube.com/signup">Sign Up</a> now!
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
<div id="watch-actions-share" class="watch-actions-panel hid"></div>
<div id="watch-actions-ajax" class="watch-actions-panel hid"></div>
<div class="close">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" class="close-button" onclick="yt.www.watch.actions.hide();">
</div>
</div>
</div>
<div id="watch-info">
<div id="watch-description" class="yt-uix-expander-collapsed yt-uix-expander">
<div id="watch-description-clip">
<p id="watch-uploader-info">${localizeString("watch.uploadby")} <a href="https://www.youtube.com${url}" class="yt-uix-sessionlink yt-user-name author" rel="author" dir="ltr">${owner}</a> ${localizeString("watch.on")} <span id="eow-date" class="watch-video-date">${upload}</span></p>
<div id="watch-description-text">
<p id="eow-description">${description}</p>
</div>
<div id="watch-description-extras">
<h4>${localizeString("watch.category")}:</h4>
<p id="eow-category"><a href="//www.youtube.com/videos">${category}</a></p>
<h4>${localizeString("watch.tags")}:</h4>
<ul id="eow-tags" class="watch-info-tag-list">
${VALUE_VIDEOTAGS}
</ul>
<h4>${localizeString("watch.license")}:</h4>
<p id="eow-reuse">Standard YouTube License</p>
</div>
</div>
<ul id="watch-description-extra-info">
<li>
<div class="video-extras-sparkbars" style="background-color:red">
<div class="video-extras-sparkbar-likes"></div>
</div>
<span class="video-extras-likes-dislikes">
<span class="likes"></span> ${localizeString("stats.likes")}, <span class="dislikes"></span> ${localizeString("stats.dislikes")}
</span>
</li>
</ul>
<div class="horizontal-rule">
<span class="first"></span>
<span class="second"></span>
<span class="third"></span>
</div>
<div id="watch-description-toggle" class="yt-uix-expander-head">
<div id="watch-description-expand" class="expand">
<button type="button" class="metadata-inline yt-uix-button yt-uix-button-text" onclick="return false;" role="button">
<span class="yt-uix-button-content">${localizeString("buttons.showmore")} <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Show more"></span>
</button>
</div>
<div id="watch-description-collapse" class="collapse">
<button type="button" class="metadata-inline yt-uix-button yt-uix-button-text" onclick="return false;" role="button">
<span class="yt-uix-button-content">${localizeString("buttons.showless")} <img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="Show less"></span>
</button>
</div>
</div>
</div>
</div>
<div id="comments-view" data-type="highlights" class="hid">
<div class="comments-section">
<h4><strong>${localizeString("comments.topcomments")}</strong></h4>
<ul class="comment-list top hid"></ul>
</div>
<div class="comments-section">
<h4><strong>${localizeString("comments.allcomments")}</strong> (${ytInitialData.contents.twoColumnWatchNextResults.results ? ytInitialData.contents.twoColumnWatchNextResults.results.results.contents.find(b => b.itemSectionRenderer) ? ytInitialData.contents.twoColumnWatchNextResults.results.results.contents.find(b => b.itemSectionRenderer).itemSectionRenderer.contents[0].commentsEntryPointHeaderRenderer ? ytInitialData.contents.twoColumnWatchNextResults.results.results.contents.find(b => b.itemSectionRenderer).itemSectionRenderer.contents[0].commentsEntryPointHeaderRenderer.commentCount ? ytInitialData.contents.twoColumnWatchNextResults.results.results.contents.find(b => b.itemSectionRenderer).itemSectionRenderer.contents[0].commentsEntryPointHeaderRenderer.commentCount.simpleText : "0" : "0" : "0" : "0"}) <a class="comments-section-see-all" href="https://www.youtube.com/all_comments?v=${id}">${localizeString("global.seeall")}</a></h4>
<div class="comments-post-container clearfix">
${commen}
</div>
<ul class="comment-list all hid"></ul>
</div>
<div class="comments-section">
<div class="comments-pagination" data-ajax-enabled="true">
<div class="yt-uix-pager" role="navigation">
<a id="next-btn" onclick="document.ciulinYT.load.comments(this.getAttribute('data-token'), this.getAttribute('data-page'))" class="yt-uix-button yt-uix-sessionlink yt-uix-pager-button yt-uix-button-default hid" data-page="2"><span class="yt-uix-button-content">Next »</span></a>
</div>
</div>
</div>
<ul>
<li class="hid" id="parent-comment-loading"> ${localizeString("comments.loading")}</li>
</ul>
<div id="comments-loading">${localizeString("global.loading")}</div>
</div>
</div>
<div id="watch-sidebar">
<div class="watch-sidebar-section">
<div id="watch-related-container">
<ul id="watch-related" class="video-list watch-sidebar-body">
${OBJ_SUGGESTEDVIDEOS}
</ul>
<p class="content"></p>
</div>
</div>
<span class="vertical-rule-main"></span>
<span class="vertical-rule-corner-top"></span>
<span class="vertical-rule-corner-bottom"></span>
</div>
<div class="clear"></div>
</div>
<div style="visibility: hidden; height: 0px; padding: 0px; overflow: hidden;">
<div id="baseDiv"></div>
</div>
</div>
</div>
</div>`;
            })();
            OBJ_CHANNEL = await FUNC;
        }
        if(window.location.pathname.split("/")[1].match(/shorts/i)) {
            window.location.href = "https://www.youtube.com/watch?v=" + window.location.pathname.split("/")[2];
        }
        if(window.location.pathname.split("/")[1].match(/channel|user|^c{1}$/i)) {
            if (/community|videos|about|channels|playlists|membership|store/.test(window.location.pathname.split("/")[3])) window.location.href = window.location.pathname.split("/").slice(0,3).join("/");
            let FUNC = (async () => {
                let collection = {name: {}};
                collection.CHANNELNAME = ytInitialData.metadata ? ytInitialData.metadata.channelMetadataRenderer.title : ytInitialData.header.interactiveTabbedHeaderRenderer.title.simpleText;
                collection.CHANNELICON = ytInitialData.metadata ? ytInitialData.metadata.channelMetadataRenderer.avatar.thumbnails[0].url : ytInitialData.header.interactiveTabbedHeaderRenderer.boxArt.thumbnails[0].url;
                collection.CHANNELURL = window.location.href;
                collection.DESCRIPTION = ytInitialData.metadata ? ytInitialData.metadata.channelMetadataRenderer.description.replace(/\n/g, "<br />") : (ytInitialData.header.interactiveTabbedHeaderRenderer) ? ytInitialData.header.interactiveTabbedHeaderRenderer.description.simpleText.replace(/\n/g, "<br />") : "";
                collection.SUBCOUNT = ytInitialData.header.c4TabbedHeaderRenderer ? ytInitialData.header.c4TabbedHeaderRenderer.subscriberCountText ? ytInitialData.header.c4TabbedHeaderRenderer.subscriberCountText.simpleText.split(" ")[0] : undefined : undefined;
                collection.name.SUBCOUNT = ytInitialData.header.c4TabbedHeaderRenderer ? ytInitialData.header.c4TabbedHeaderRenderer.subscriberCountText ? ytInitialData.header.c4TabbedHeaderRenderer.subscriberCountText.simpleText.split(" ")[1].charAt(0).toUpperCase() + ytInitialData.header.c4TabbedHeaderRenderer.subscriberCountText.simpleText.split(" ")[1].slice(1) : undefined : undefined;
                switch (true) {
                    case /K/.test(collection.SUBCOUNT):
                        collection.SUBCOUNT = collection.SUBCOUNT.replace(/\./, "").replace(/K/, "000").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        break;
                    case /\d{3}/.test(collection.SUBCOUNT):
                        collection.SUBCOUNT = collection.SUBCOUNT.replace(/\./, "").replace(/M/, "000000").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        break;
                    case /\d{2,3}\.\d{1,2}/.test(collection.SUBCOUNT):
                        collection.SUBCOUNT = collection.SUBCOUNT.replace(/\./, "").replace(/M/, "00000").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        break;
                    case /\d{1,3}/.test(collection.SUBCOUNT):
                        collection.SUBCOUNT = collection.SUBCOUNT.replace(/\./, "").replace(/M/, "0000").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        break;
                }
                let ihomev = ytInitialData.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer ? ytInitialData.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].channelVideoPlayerRenderer ? true : false : false;
                collection.DEC = "";
                collection.VIDEOS = await document.ciulinYT.load.channel_videos();
                collection.SUBSCRIPTIONS = await document.ciulinYT.load.channel_subscriptions();
                collection.RECENTFEED = await document.ciulinYT.load.recent_feed();
                collection.INFO = await document.ciulinYT.load.channel_info();
                collection.HOMEVIDEO = (ihomev == true) ? ytInitialData.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].channelVideoPlayerRenderer : {};
                collection.SUBSCRIBE = document.ciulinYT.func.getSubscription();
                setInterval(() => {document.head.querySelector("title").innerText = `${collection.CHANNELNAME}'s ${localizeString("global.channel")} - YouTube`;}, 100);
                document.ciulinYT.func.waitForElm("#video-player").then(() => {
                    let id = (ihomev == true) ? ytInitialData.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].channelVideoPlayerRenderer.videoId : "";
                    document.ciulinYT.func.buildPlayer(id);
                });
                return document.ciulinYT.func.buildChannelTheme(1, collection);
            })();
            OBJ_CHANNEL = await FUNC;
        }
        if(window.location.pathname.split("/")[1].match(/results/i)) {
            let FUNC = (async () => {
                var searchpar = (new URL(document.location)).searchParams.get("search_query");
                searchpar = document.ciulinYT.func.escapeHtml(searchpar);
                var results = ytInitialData.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0].itemSectionRenderer.contents;
                var parse = "";
                DOMHEAD.innerHTML += '<link rel="stylesheet" href="//s.ytimg.com/yt/cssbin/www-refresh-vflj_nHFo.css">';
                for(let i = 0; i < results.length; i++) {
                    if(results[i].videoRenderer) {
                        let {owner, time, views, title, id, url, description} = await document.ciulinYT.func.organizeVideoData(results[i].videoRenderer);
                        let main = `<div class="result-item yt-uix-tile yt-tile-default *sr">
<div class="thumb-container">
<a href="https://www.youtube.com/watch?v=${id}" class="ux-thumb-wrap contains-addto result-item-thumb">
<span class="video-thumb ux-thumb ux-thumb-128">
<span class="clip" style="height: auto;width: auto;">
<span class="clip-inner"><img alt="Thumbnail" src="//i1.ytimg.com/vi/${id}/default.jpg" data-group-key="thumb-group-1" style="position: static"><span class="vertical-align"></span></span>
</span>
</span>
<span class="video-time">${time}</span>
<button onclick=";return false;" title="${localizeString("personal.watchlater")}" type="button" class="addto-button video-actions addto-watch-later-button-sign-in yt-uix-button yt-uix-button-default yt-uix-button-short yt-uix-tooltip" role="button">
<span class="yt-uix-button-content">
<span class="addto-label">${localizeString("personal.watchlater")}</span>
<span class="addto-label-error">Error</span>
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
</span>
<img class="yt-uix-button-arrow" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""></button>
</a>
</div>
<div class="result-item-main-content">
<h3>
<a href="https://www.youtube.com/watch?v=${id}" class="yt-uix-tile-link" dir="ltr" title="${title}">${title}</a>
</h3>
<p id="video-description-${id}" class="description" dir="ltr">${description}</p>
<ul class="single-line-lego-list"><li><a href="https://www.youtube.com/results?search_query=${searchpar}%2C+hd" class="yt-badge-std">hd</a>
</li>
</ul>
<p class="facets">
<span class="username-prepend">${localizeString("watch.by")}</span>
<a href="https://www.youtube.com${url}" class="yt-user-name" dir="ltr">${owner.text}</a> <span class="metadata-separator">|</span>  <span class="date-added">${views[1]}</span> <span class="metadata-separator">|</span>  <span class="viewcount">${views[0]}</span>
</p>
</div>
</div>`;
                        parse += main;
                    }
                    if(results[i].channelRenderer) {
                        let description = results[i].channelRenderer.descriptionSnippet ? results[i].channelRenderer.descriptionSnippet.runs[0].text : "";
                        let title = results[i].channelRenderer.title.simpleText;
                        let link = "https://www.youtube.com" + results[i].channelRenderer.shortBylineText.runs[0].navigationEndpoint.browseEndpoint.canonicalBaseUrl;
                        let thumbnail = results[i].channelRenderer.thumbnail.thumbnails[0].url;
                        let video = results[i].channelRenderer.videoCountText ? results[i].channelRenderer.videoCountText.runs : [];
                        let videos = video[1] ? video[0].text + video[1].text : video.text;
                        let subs = results[i].channelRenderer.subscriberCountText ? results[i].channelRenderer.subscriberCountText.simpleText : "No subscribers";

                        let main = `<div class="result-item yt-uix-tile yt-tile-default *sr channel">
<div class="thumb-container">
<a href="${link}" class="ux-thumb-wrap result-item-thumb">
<span class="video-thumb ux-thumb ux-thumb-profile-77">
<span class="clip" style="position:unset;">
<span class="clip-inner"><img onload="" alt="Thumbnail" src="${thumbnail}"><span class="vertical-align"></span></span>
</span>
</span>
</a>
</div>
<div class="result-item-main-content">
<h3>
<a href="${link}" class="yt-uix-tile-link" dir="ltr" title="${title}">${title}</a>
</h3>
<p id="video-description-" class="description" dir="ltr">${description}</p>
<ul class="single-line-lego-list">
<li>
<a href="https://www.youtube.com/results?search_type=search_users" class="yt-badge-std">CHANNEL</a>
</li>
</ul>
<p class="facets">
<span class="username-prepend">${localizeString("watch.by")}</span> <a href="${link}" class="yt-user-name" dir="ltr">${title}</a><span class="metadata-separator"> | </span><span class="video-count">${videos}</span><span class="metadata-separator"> | </span><span class="channel-subscriber-count">${subs}</span>
</p>
</div>
</div>`;
                        parse += main;
                    }
                    if(results[i].playlistRenderer) {}
                }
                return `<div id="content">
<div id="search-header">
<div id="search-header-inner">
<p class="num-results">About <strong>${ytInitialData.estimatedResults.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</strong> results</p>
<h2>Search results for <strong class="query"><span class="search-title-lego">${searchpar}</span></strong>
</h2>
</div>
<hr class="yt-horizontal-rule" style="border: 1px solid #ebebeb;">
</div>
<div id="search-refinements">
<div id="lego-refine-block">
<div class="sort-by floatR">
<span class="sort-by-title" style="color: #555">Sort by:</span>
<button type="button" class="yt-uix-button yt-uix-button-text" onclick="document.ciulinYT.func.Modal('ul.yt-uix-button-menu');return false;" role="button">
<span class="yt-uix-button-content">Relevance </span>
<img class="yt-uix-button-arrow" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
<ul class="yt-uix-button-menu yt-uix-button-menu-text hid" role="menu" aria-haspopup="true" style="min-width: 92px; left: 902.467px; top: 210px; display: none;">
<li role="menuitem" id="aria-id-68537613644">
<span href="https://www.youtube.com/results?search_query=${searchpar}&amp;sp=CAI%253D" class=" yt-uix-button-menu-item" onclick=";window.location.href=this.getAttribute('href');return false;">Upload date</span>
</li>
<li role="menuitem" id="aria-id-52246167700">
<span href="https://www.youtube.com/results?search_query=${searchpar}&amp;sp=CAMSAhAB" class=" yt-uix-button-menu-item" onclick=";window.location.href=this.getAttribute('href');return false;">View count</span>
</li>
<li role="menuitem" id="aria-id-43856570253">
<span href="https://www.youtube.com/results?search_query=${searchpar}&amp;sp=CAESAhAB" class=" yt-uix-button-menu-item" onclick=";window.location.href=this.getAttribute('href');return false;">Rating</span>
</li>
</ul>
</button>
</div>
<button type="button" id="lego-refine-toggle" onclick="document.ciulinYT.func.Modal('#search-lego-refinements');return false;" class="yt-uix-button yt-uix-button-text" data-button-toggle="true" role="button">
<span class="yt-uix-button-content">Filter </span>
<img class="yt-uix-button-arrow" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
</button>
<div id="search-lego-refinements" class="hid" style="display: none;">
<div class="search-refinements-block search-refinements-links">
<div class="search-refinements-block-title">Sort by</div>
<ul>
<li>
<a href="https://www.youtube.com/results?search_query=${searchpar}&amp;sp=CAASBAgCEAE%253D">Relevance</a>
</li>
<li>
<a href="https://www.youtube.com/results?search_query=${searchpar}&amp;sp=CAI%253D">Upload date</a>
</li>
<li>
<a href="https://www.youtube.com/results?search_query=${searchpar}&amp;sp=CAMSAhAB">View count</a>
</li>
<li>
<a href="https://www.youtube.com/results?search_query=${searchpar}&amp;sp=CAESAhAB">Rating</a>
</li>
</ul>
</div>
<div class="search-refinements-block filters">
<div class="search-refinements-block-title">Filter</div>
<ul>
<li>
<span class="lego lego-property  append-lego" data-lego-name="last hour">
<a class="lego-action" title="Search for ${searchpar}, last hour" href="https://www.youtube.com/results?search_query=${searchpar}&amp;sp=EgQIARAB">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif"></a>
<a class="lego-action-placeholder" title="Search for ${searchpar}, last hour" href="https://www.youtube.com/results?search_query=${searchpar}&amp;sp=EgQIARAB">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif"></a>
<a class="lego-content" title="Search for ${searchpar}, last hour" href="https://www.youtube.com/results?search_query=${searchpar}&amp;sp=EgQIARAB">last hour</a>
</span>
</li>
<li>
<span class="lego lego-property  append-lego" data-lego-name="today">
<a class="lego-action" title="Search for ${searchpar}, today" href="https://www.youtube.com/results?search_query=${searchpar}&amp;sp=EgIIAg%253D%253D">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif"></a>
<a class="lego-action-placeholder" title="Search for ${searchpar}, today" href="https://www.youtube.com/results?search_query=${searchpar}&amp;sp=EgIIAg%253D%253D">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif"></a>
<a class="lego-content" title="Search for ${searchpar}, today" href="https://www.youtube.com/results?search_query=${searchpar}&amp;sp=EgIIAg%253D%253D">uploaded today</a>
</span>
</li>
<li>
<span class="lego lego-property  append-lego" data-lego-name="this week">
<a class="lego-action" title="Search for ${searchpar}, this week" href="https://www.youtube.com/results?search_query=${searchpar}&amp;sp=EgQIAxAB">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif"></a>
<a class="lego-action-placeholder" title="Search for ${searchpar}, this week" href="https://www.youtube.com/results?search_query=${searchpar}&amp;sp=EgQIAxAB">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif"></a>
<a class="lego-content" title="Search for ${searchpar}, this week" href="https://www.youtube.com/results?search_query=${searchpar}&amp;sp=EgQIAxAB">uploaded this week</a>
</span>
</li>
<li>
<span class="lego lego-property  append-lego" data-lego-name="this month">
<a class="lego-action" title="Search for ${searchpar}, this month" href="https://www.youtube.com/results?search_query=${searchpar}&amp;sp=EgQIBBAB">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
</a>
<a class="lego-action-placeholder" title="Search for ${searchpar}, this month" href="https://www.youtube.com/results?search_query=${searchpar}&amp;sp=EgQIBBAB">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
</a>
<a class="lego-content" title="Search for ${searchpar}, this month" href="https://www.youtube.com/results?search_query=${searchpar}&amp;sp=EgQIBBAB">uploaded this month</a>
</span>
</li>
<li>
<span class="lego lego-property  append-lego" data-lego-name="this year">
<a class="lego-action" title="Search for ${searchpar}, this year" href="https://www.youtube.com/results?search_query=${searchpar}&amp;sp=EgQIBRAB">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
</a>
<a class="lego-action-placeholder" title="Search for ${searchpar}, this year" href="https://www.youtube.com/results?search_query=${searchpar}&amp;sp=EgQIBRAB">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
</a>
<a class="lego-content" title="Search for ${searchpar}, this year" href="https://www.youtube.com/results?search_query=${searchpar}&amp;sp=EgQIBRAB">uploaded this year</a>
</span>
</li>
</ul>
</div>
<div class="search-refinements-block filters">
<div class="search-refinements-block-title">&nbsp;</div>
<ul>
<li>
<span class="lego lego-property  append-lego" data-lego-name="channel">
<a class="lego-action" title="Search for ${searchpar}, channel" href="https://www.youtube.com/results?search_query=${searchpar}&amp;sp=EgIQAg%253D%253D">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
</a>
<a class="lego-action-placeholder" title="Search for ${searchpar}, channel" href="https://www.youtube.com/results?search_query=${searchpar}&amp;sp=EgIQAg%253D%253D">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
</a>
<a class="lego-content" title="Search for ${searchpar}, channel" href="https://www.youtube.com/results?search_query=${searchpar}&amp;sp=EgIQAg%253D%253D">channel</a>
</span>
</li>
<li>
<span class="lego lego-property  append-lego" data-lego-name="playlist">
<a class="lego-action" title="Search for ${searchpar}, playlist" href="https://www.youtube.com/results?search_query=${searchpar}&amp;sp=EgIQAw%253D%253D">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
</a>
<a class="lego-action-placeholder" title="Search for ${searchpar}, playlist" href="https://www.youtube.com/results?search_query=${searchpar}&amp;sp=EgIQAw%253D%253D">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
</a>
<a class="lego-content" title="Search for ${searchpar}, playlist" href="https://www.youtube.com/results?search_query=${searchpar}&amp;sp=EgIQAw%253D%253D">playlist</a>
</span>
</li>
<li>
<span class="lego lego-property  append-lego" data-lego-name="movie">
<a class="lego-action" title="Search for ${searchpar}, movie" href="https://www.youtube.com/results?search_query=${searchpar}&amp;sp=EgIQBA%253D%253D">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
</a>
<a class="lego-action-placeholder" title="Search for ${searchpar}, movie" href="https://www.youtube.com/results?search_query=${searchpar}&amp;sp=EgIQBA%253D%253D">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
</a>
<a class="lego-content" title="Search for ${searchpar}, movie" href="https://www.youtube.com/results?search_query=${searchpar}&amp;sp=EgIQBA%253D%253D">movie</a>
</span>
</li>
<li>
<span class="lego lego-property  append-lego" data-lego-name="show">
<a class="lego-action" title="Search for ${searchpar}, show" href="https://www.youtube.com/results?search_query=${searchpar}%2C+show">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
</a>
<a class="lego-action-placeholder" title="Search for ${searchpar}, show" href="https://www.youtube.com/results?search_query=${searchpar}%2C+show">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
</a>
<a class="lego-content" title="Search for ${searchpar}, show" href="https://www.youtube.com/results?search_query=${searchpar}%2C+show">show</a>
</span>
</li>
<li>
<span class="lego lego-property  append-lego" data-lego-name="3d">
<a class="lego-action" title="Search for ${searchpar}, 3d" href="https://www.youtube.com/results?search_query=${searchpar}%2C+3d">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
</a>
<a class="lego-action-placeholder" title="Search for ${searchpar}, 3d" href="https://www.youtube.com/results?search_query=${searchpar}%2C+3d">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
</a>
<a class="lego-content" title="Search for ${searchpar}, 3d" href="https://www.youtube.com/results?search_query=${searchpar}%2C+3d">3D</a>
</span>
</li>
</ul>
</div>
<div class="search-refinements-block filters">
<div class="search-refinements-block-title">&nbsp;</div>
<ul>
<li>
<span class="lego lego-property  append-lego" data-lego-name="hd">
<a class="lego-action" title="Search for ${searchpar}, hd" href="https://www.youtube.com/results?search_query=${searchpar}%2C+hd">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
</a>
<a class="lego-action-placeholder" title="Search for ${searchpar}, hd" href="https://www.youtube.com/results?search_query=${searchpar}%2C+hd">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
</a>
<a class="lego-content" title="Search for ${searchpar}, hd" href="https://www.youtube.com/results?search_query=${searchpar}%2C+hd">HD (high definition)</a>
</span>
</li>
<li>
<span class="lego lego-property  append-lego" data-lego-name="cc">
<a class="lego-action" title="Search for ${searchpar}, cc" href="https://www.youtube.com/results?search_query=${searchpar}%2C+cc">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif"></a>
<a class="lego-action-placeholder" title="Search for ${searchpar}, cc" href="https://www.youtube.com/results?search_query=${searchpar}%2C+cc">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
</a>
<a class="lego-content" title="Search for ${searchpar}, cc" href="https://www.youtube.com/results?search_query=${searchpar}%2C+cc">CC (closed caption)</a>
</span>
</li>
<li>
<span class="lego lego-property  append-lego" data-lego-name="long">
<a class="lego-action" title="Search for ${searchpar}, long" href="https://www.youtube.com/results?search_query=${searchpar}%2C+long">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
</a>
<a class="lego-action-placeholder" title="Search for ${searchpar}, long" href="https://www.youtube.com/results?search_query=${searchpar}%2C+long">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
</a>
<a class="lego-content" title="Search for ${searchpar}, long" href="https://www.youtube.com/results?search_query=${searchpar}%2C+long">longer than 20 min</a>
</span>
</li>
<li>
<span class="lego lego-property  append-lego" data-lego-name="partner">
<a class="lego-action" title="Search for ${searchpar}, partner" href="https://www.youtube.com/results?search_query=${searchpar}%2C+partner">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
</a>
<a class="lego-action-placeholder" title="Search for ${searchpar}, partner" href="https://www.youtube.com/results?search_query=${searchpar}%2C+partner">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
</a>
<a class="lego-content" title="Search for ${searchpar}, partner" href="https://www.youtube.com/results?search_query=${searchpar}%2C+partner">partner video</a>
</span>
</li>
<li>
<span class="lego lego-property  append-lego" data-lego-name="creativecommons">
<a class="lego-action" title="Search for ${searchpar}, creativecommons" href="https://www.youtube.com/results?search_query=${searchpar}%2C+creativecommons">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
</a>
<a class="lego-action-placeholder" title="Search for ${searchpar}, creativecommons" href="https://www.youtube.com/results?search_query=${searchpar}%2C+creativecommons">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
</a>
<a class="lego-content" title="Search for ${searchpar}, creativecommons" href="https://www.youtube.com/results?search_query=${searchpar}%2C+creativecommons">creative commons</a>
</span>
</li>
<li>
<li>
<span class="lego lego-property  append-lego" data-lego-name="live">
<a class="lego-action" title="Search for ${searchpar}, live" href="https://www.youtube.com/results?search_query=${searchpar}%2C+live">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
</a>
<a class="lego-action-placeholder" title="Search for ${searchpar}, live" href="https://www.youtube.com/results?search_query=${searchpar}%2C+live">
<img src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
</a>
<a class="lego-content" title="Search for ${searchpar}, live" href="https://www.youtube.com/results?search_query=${searchpar}%2C+live">live</a>
</span>
</li>
</li>
</ul>
</div>
<div class="clearL"></div>
</div>
</div>
</div>
<div class="yt-horizontal-rule" style="border-top: 2px solid #ddd;border-bottom: 2px solid #fff;">
<span class="first"></span>
<span class="second"></span>
<span class="third"></span>
</div>
<div id="search-base-div">
<div id="search-main" class="ytg-4col new-snippets">
<div id="results-main-content">
<div id="search-results">
${parse}
</div>
</div>
</div>
</div>
</div>`;
            })();
            OBJ_CHANNEL = await FUNC;
        }
        if(window.location.pathname.match(/\/feed\/explore/i)) {
            let FUNC = (async () => {
                let CSS1 = `<link rel="stylesheet" href="//s.ytimg.com/yt/cssbin/www-videos-nav-vfl8KBBHC.css"/>`;
                let CSS2 = `<link rel="stylesheet" href="//s.ytimg.com/yt/cssbin/www-refresh-browse-vflPUlXqz.css"/>`;
                document.querySelector(".refresh").href = "//s.ytimg.com/yt/cssbin/www-refresh-vflAbAPqe.css";
                document.head.innerHTML += CSS1 + CSS2;
                document.title = "Videos - YouTube";
                var c = "";
                document.ciulinYT.func.waitForElm("#page").then(async elm => {
                    elm.setAttribute("class", "browse-base browse-videos");
                    let categories = ["most-viewed", "recommended", "music", "live", "gaming", "news", "sports", "edu", "howto"];
                    for (let i = 0; i < categories.length; i++) {
                        let videos = await document.ciulinYT.load.browse_category(categories[i]);
                        let html = `<div class="browse-collection">
<div class="ytg-box collection-header with-icon">
<a class="heading ytg-box" href="">
<img class="header-icon ${videos.class}" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif">
<div class="header-container">
<h2>${videos.name} »</h2>
</div>
</a>
<a class="yt-playall-link" href="">
<img class="small-arrow" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
Play all
</a>
</div>
${videos.html}
</div>`;
                        c += html;
                    }
                    document.querySelector(".load-more-content").innerHTML = c;
                    document.querySelector("#feed-loading-template").classList.add("hid");
                });
                return `<div id="baseDiv" class="date-${VALUE_DATE} video-info browse-base browse-videos">
<div id="masthead-subnav" class="yt-nav yt-nav-dark">
<ul>
<li class="selected">
<span class="yt-nav-item"class="yt-nav-item">Videos</span>
</li>
<li>
<span class="yt-nav-item">Music</span>
</li>
<li>
<span class="yt-nav-item">Movies</span>
</li>
<li>
<span class="yt-nav-item">Shows</span>
</li>
<li>
<span class="yt-nav-item">Trailers</span>
</li>
<li>
<span class="yt-nav-item">Live</span>
</li>
<li>
<span class="yt-nav-item">Sports</span>
</li>
<li>
<span class="yt-nav-item">Education</span>
</li>
<li class="last">
<span class="yt-nav-item">News</span>
</li>
</ul>
</div>
<div class="ytg-fl browse-header">
</div>
<div class="browse-container ytg-box no-stage browse-bg-gradient">
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
${localizeString("global.loading")}
</p>
</div>
</div>
<div class="load-more-content">
${c}
</div>
</div>
</div>
</div>
</div>
<div class="clear"></div>
</div>`;
            })();
            OBJ_CHANNEL = await FUNC;
        }
        OBJ_MASTHEAD = `<div id="masthead" class="" dir="ltr">
<a id="logo-container" href="https://www.youtube.com/" title="YouTube home">
<img id="logo" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="YouTube home">
</a>
<div id="masthead-user-bar-container">
<div id="masthead-user-bar">
<div id="masthead-user">
${OBJ_USER}
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
<div id="guide-builder-promo-buttons">
<span class="yt-uix-button-content">${localizeString("global.browsechannels")}</span>
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
${OBJ_MASTH}`;
        OBJ_FOOTER = `<div id="footer-container">
<div id="footer">
<div class="horizontal-rule">
<span class="first"></span>
<span class="second"></span>
<span class="third"></span>
</div>
<div id="footer-logo">
<a href="https://www.youtube.com/" title="YouTube home">
<img id="logo" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="YouTube home">
</a>
<span id="footer-divider"></span>
</div>
<div id="footer-main">
<ul id="footer-links-primary">
<li>
<a href="https://support.google.com/youtube/#topic=9257498">${localizeString("global.help")}</a>
</li>
<li>
<a href="https://www.youtube.com/about">${localizeString("global.about")}</a>
</li>
<li>
<a href="https://www.youtube.com/press/">Press &amp; Blogs</a>
</li>
<li>
<a href="https://www.youtube.com/copyright">${localizeString("global.copyright")}</a>
</li>
<li>
<a href="https://www.youtube.com/creators">Creators &amp; Partners</a>
</li>
<li>
<a href="https://www.youtube.com/ads">Advertising</a>
</li>
</ul>
<ul class="pickers yt-uix-button-group" data-button-toggle-group="true">
<li>
<button type="button" class="yt-uix-button yt-uix-button-text" onclick="document.ciulinYT.load.picker('LANGUAGE');return false;" data-button-toggle="true" data-button-menu-id="arrow" role="button">
<span class="yt-uix-button-content">${document.ciulinYT.data.lang} </span>
<img class="yt-uix-button-arrow" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
</button></li><li><button type="button" class="yt-uix-button yt-uix-button-text" onclick="document.ciulinYT.load.picker('COUNTRY');return false;" data-button-toggle="true" data-button-menu-id="arrow" role="button">
<span class="yt-uix-button-content">${document.ciulinYT.data.country} </span>
<img class="yt-uix-button-arrow" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt="">
</button></li><li><button type="button" class="yt-uix-button yt-uix-button-text" onclick="document.ciulinYT.load.picker('safetymode-picker');return false;" data-button-toggle="true" data-button-menu-id="arrow" role="button">
<span class="yt-uix-button-content">Safety: <span class="yt-footer-safety-value">Off</span></span><img class="yt-uix-button-arrow" src="//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif" alt=""></button>
</li>
</ul>
<div id="picker-container"></div>
<div id="picker-loading" style="display: none">${localizeString("global.loading")}</div>`;

        let final = `<div id="masthead-container">
${OBJ_MASTHEAD}
</div>
<div id="content-container">
${OBJ_CHANNEL}
</div>
${OBJ_FOOTER}`;
        SUPERDOM.innerHTML += final;
        document.body.appendChild(SUPERDOM);

    }
    (async () => {
        if(document.ciulinYT.func.getCookie("APISID")) {
            return buildYouTube();
        }
        if(!document.ciulinYT.func.getCookie("CONSENT")) return;
        if(document.ciulinYT.func.getCookie("CONSENT").indexOf("YES") !== 0) {
            await document.ciulinYT.func.waitForElm("#dialog");
            await document.ciulinYT.func.waitForElm(".ytd-consent-bump-v2-lightbox").then((elm) => document.querySelector("#dialog").querySelectorAll("ytd-button-renderer")[3].querySelector("#button").addEventListener("click", () => {window.location.href = '';}));
            return;
        }
        buildYouTube();
    })();
})();
