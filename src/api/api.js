import http from "./client";

class AutoSaApi {
    /**
     * @param {string} sourceLang: either uk, ru or en
     * @param {string} targetLang: either uk, ru or en
     * @param {string} stringToTranslate: text you want to translate
     */
    getTranslation(sourceLang, targetLang, stringToTranslate) {
        return http.get(`/translation/${sourceLang}/${targetLang}/${encodeURIComponent(stringToTranslate)}`)
    }
}
export default new AutoSaApi();
