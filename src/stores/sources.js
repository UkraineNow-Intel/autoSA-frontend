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
      this.updateSourceIdDict()
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
    async createSource(data) {
      return AutoSaApi.createSource(data).then((r) => {
        if (r) {
          let newPosition = this.sources.push(r.data)
          this.sourceIdDict[r.data.id] = newPosition
        }
      })
    },
    async deleteSource(id) {
      return AutoSaApi.deleteSource(id).then((r) => {
        if (r) {
          for (var i = 0; i < this.sources.length; i++) {
            if (this.sources[i]["id"] === id) {
              this.sources.splice(i, 1);
            }
          }
          delete this.sourceIdDict[id]
          this.updateSourceIdDict()
        }
      })
    },
    updateSourceIdDict() {
      let newDict = {}
      for (let i = 0; i < this.sources.length; i++) {
        newDict[this.sources[i]["id"]] = i
      }
      this.sourceIdDict = newDict
    }
  },
})