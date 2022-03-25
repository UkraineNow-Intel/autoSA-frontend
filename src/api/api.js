import http from "./client";

class AutoSaDataService {
    getTranslation(stringToTranslate) {
        return http.get("/translation/en/uk/" + stringToTranslate)
        // return http.get("/translation/uk/en/%D0%A6%D0%B5%20%D1%82%D0%B5%D1%81%D1%82")
    }
}
export default new AutoSaDataService();
