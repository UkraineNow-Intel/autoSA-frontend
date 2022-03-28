import http from "./client";
import sourceData from "./mockdata"

class AutoSaApi {
    /**
     * @param {string} sourceLang: either uk, ru or en
     * @param {string} targetLang: either uk, ru or en
     * @param {string} stringToTranslate: text you want to translate
     */
    getTranslation(sourceLang, targetLang, stringToTranslate) {
        return http.get(`/translation/${sourceLang}/${targetLang}/${encodeURIComponent(stringToTranslate)}`)
    }

    /**
     * returns a list of recent information from all sources
     */
     getSources() {
        return sourceData
    }
}
export default new AutoSaApi();
