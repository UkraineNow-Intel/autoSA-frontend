import http from "./client";
// import sourceData from "./mockdata"
import { ElNotification } from 'element-plus'
import router from "@/plugins/router";

class AutoSaApi {
    whoami() {
        return http.get('/api/whoami/', {})
    }

    // gets csrf cookie
    get_csrf() {
        http.get('/api/csrf/', {})
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
    getSources() {
        // return sourceData
        return http.get(`/api/sources`).catch(e => {
            ElNotification({
                title: 'Error',
                message: `Could not get source list \n ${e}`,
                type: 'error',
            })
        })
    }

    /**
     * create new source providing data
     * @param {Object} data: e.g. {"tags": [], "interface": "website", "source": "@Blah", "headline": "", "text": "Щось трапилося", "language": "ua", "timestamp": "2022-04-01T20:25:00Z", "pinned": "true", "translations": []}
     */
    createSource(data) {
        // return sourceData
        return http.post(`/api/sources`, data).catch(e => {
            ElNotification({
                title: 'Error',
                message: `Could not create new source ${e}`,
                type: 'error',
            })
        })
    }

    /**
     * changes information of source with ID
     * @param {Number} id: ID of the source to change
     * @param {Object} data: e.g. {'pinnend': true}
     */
    changeSource(id, data) {
        return http.patch(`/api/sources/${id}`, data).catch(e => {
            if (e.response.status == 403){
                router.push({ name: 'login' })
            } else {
                ElNotification({
                    title: 'Error',
                    message: `Could not update source \n ${e}`,
                    type: 'error',
                })
            }
        })
    }
}
export default new AutoSaApi();
