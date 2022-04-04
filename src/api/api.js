import http from "./client";
// import sourceData from "./mockdata"

class AutoSaApi {
    /**
     * @param {String} sourceLang: either uk, ru or en
     * @param {String} targetLang: either uk, ru or en
     * @param {String} stringToTranslate: text you want to translate
     */
    getTranslation(sourceLang, targetLang, stringToTranslate) {
        return http.get(`/translation/${sourceLang}/${targetLang}/${encodeURIComponent(stringToTranslate)}`)
    }

    /**
     * returns a list of all sources
     */
    getSources() {
        // return sourceData
        return http.get(`/api/sources`)
    }

    /**
     * create new source providing data
     * @param {Object} data: e.g. {"tags": [], "interface": "website", "source": "@Blah", "headline": "", "text": "Щось трапилося", "language": "ua", "timestamp": "2022-04-01T20:25:00Z", "pinned": "true", "translations": []}
     */
     createSource(data) {
        // return sourceData
        return http.post(`/api/sources`, data)
    }

    /**
     * changes information of source with ID
     * @param {Number} id: ID of the source to change
     * @param {Object} data: e.g. {'pinnend': true}
     */
    changeSource(id, data){
        return http.patch(`/api/sources/${id}`, data)
    }
}
export default new AutoSaApi();
