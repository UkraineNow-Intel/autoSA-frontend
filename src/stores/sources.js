import { defineStore } from 'pinia'
import AutoSaApi from "@/api/api";
import moment from 'moment'

function sortList(listOfSources, sorting = {by: 'time', reverse: false}){
  if (sorting.by == "id"){
    listOfSources.sort((a, b) => (a.id > b.id) ? 1 : -1)
  } else {
    listOfSources.sort((a, b) => (moment(a.timestamp) < moment(b.timestamp)) ? 1 : -1)
  }
  if (sorting.reverse){
    listOfSources.reverse()
  }
  return listOfSources
}

export const useSource = defineStore('source', {
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      sources: [],
      sourceIdDict: {}
    }
  },
  getters: {
    tags(state) {
      let alltags = new Set()
      state.sources.forEach(element => {
        element.tags.forEach(tag => {
          alltags.add(tag)
        });
      });
      return Array.from(alltags)
    },
    getSourcesByDate(state) {
      return (dateOptions) => {
        if (state.sources.length > 0) {
          let allDataPoints = []
          state.sources.forEach(source => {
            if (
              !dateOptions
              || (
                moment(dateOptions[0]).isBefore(moment(source["timestamp"]))
                && moment(dateOptions[1]).isAfter(moment(source["timestamp"]))
              )
            ) {
              allDataPoints.push(source)
            }
          });
          return allDataPoints
        }
        return []
      }
    },
    getSources() {
      return (options) => {
        let resultSources = this.getSourcesByDate(options.filters.time)
        sortList(resultSources, options.sorting)
        return resultSources
      }
    },
    getSourcesWithTags(state) {
      return (tags) => {
        let listOfSources = state.sources.filter((source) => {
          return source.tags.filter(tag => tags.includes(tag)).length > 0
        })
        return sortList(listOfSources)

      }
    },
    getPinnedSources(state) {
      return () => {
        return sortList(state.sources.filter((x) => x.pinned));
      }
    }
  },
  actions: {
    clearStore() {
      this.sources = []
      this.sourceIdDict = {}
    },
    async getSourcesFromApi() {
      const data = await AutoSaApi.getSources().then((response) => { return response.data })
      this.sources = data.results
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
          this.sourceIdDict[r.data.id] = newPosition - 1
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
    },
    async addTag(id, tag) {
      const IdPosition = this.sourceIdDict[id]
      let currentTags = [...this.sources[IdPosition]["tags"]] // copy list of tags
      currentTags.push(tag)
      return this.changeSource(id, { 'tags': currentTags })
    },
    async deleteTag(id, tag) {
      const IdPosition = this.sourceIdDict[id]
      let currentTags = [...this.sources[IdPosition]["tags"]] // copy list of tags
      if (currentTags.indexOf(tag) != -1) {
        currentTags.splice(currentTags.indexOf(tag), 1)
      }
      return this.changeSource(id, { 'tags': currentTags })
    }
  },
})