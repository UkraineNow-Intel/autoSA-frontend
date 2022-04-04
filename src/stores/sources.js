import { defineStore } from 'pinia'
import AutoSaApi from "@/api/api";

export const useSource = defineStore('source', {
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      sources: [],
      sourceIdDict: {}
    }
  },
  actions: {
    async getSourcesFromApi() {
      const data = await AutoSaApi.getSources().then((response) => { return response.data })
      this.sources = data
      let newDict = {}
      for (let i = 0; i < this.sources.length; i++) {
        newDict[this.sources[i]["id"]] = i
      }
      this.sourceIdDict = newDict
    },
    async changeSource(id, data) {
      const IdPosition = this.sourceIdDict[id]
      //this.sources[IdPosition] = Object.assign(this.sources[IdPosition], data);
      return AutoSaApi.changeSource(id, data).then((r) => {
        if (r) {
          this.sources[IdPosition] = r.data
        }
      })
    },
  },
})