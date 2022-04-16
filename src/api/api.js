import http from "./client";
import { ElNotification } from 'element-plus'

class AutoSaApi {
    whoami() {
        return http.get('/api/whoami/', {})
    }

    // gets csrf cookie
    get_csrf() {
        return http.get('/api/csrf/', {})
    }

    login(username, password) {
        return http.post('/api/login/', {
            username: username,
            password: password
        })
    }

    logout() {
        return http.post('/api/logout/').then(() => {
            ElNotification({
                title: 'Logout successfull',
                message: `You are successfully logged out!`,
                type: 'info',
            })
        })
    }

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
    getSources(options = {}) {
        // return sourceData
        return http.get(`/api/sources/`, { params: options })
    }

    /**
     * create new source providing data
     * @param {Object} data: e.g. {"tags": [], "interface": "website", "origin": "@Blah", "headline": "", "text": "Щось трапилося", "language": "ua", "timestamp": "2022-04-01T20:25:00Z", "pinned": "true", "translations": []}
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
    changeSource(id, data) {
        return http.patch(`/api/sources/${id}/?deleted=any`, data)
    }

    /**
     * deletes a source with ID
     * @param {Number} id: ID of the source to delete
     */
    deleteSource(id) {
        return http.delete(`/api/sources/${id}`)
    }

    /**
     * triggers the backend to get new sources from e.g. twitter, telegram etc.
     */
    refreshSources(overwriteExisting = false) {
        // return info on refresh process
        return http.get(`/api/refresh/`, { params: { "overwrite": overwriteExisting } }).then((response) => {
            return response.data
        })
    }
}
export default new AutoSaApi();
