/* jshint esversion: 10 */
const NAMESPACE_MODULE_CIULINATIONS = "Ciulinations";

window[NAMESPACE_MODULE_CIULINATIONS] = {};
(function module_Ciulinations(exports) {
    class CiulinationsException extends Error {}

    var handlers = {};

    function addTranslation(lang, json, author)
    {
        if (!lang || !json || !author) throw CiulinationsException;
        if ( !(lang in handlers) )
        {
            handlers[lang] = {};
        }

        handlers[lang].json = json;
        handlers[lang].author = author;
    }

    function listTranslations()
    {
        return handlers;
    }

    exports.addTranslation = addTranslation;
    exports.listTranslations = listTranslations;
})(window[NAMESPACE_MODULE_CIULINATIONS]);