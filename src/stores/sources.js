import { defineStore } from 'pinia'
import AutoSaApi from "@/api/api";
import moment from 'moment'

function sortList(listOfSources, sorting = { by: 'time', reverse: false }) {
  if (sorting.by == "id") {
    listOfSources.sort((a, b) => (a.id > b.id) ? 1 : -1)
  } else {
    listOfSources.sort((a, b) => (moment(a.timestamp) < moment(b.timestamp)) ? 1 : -1)
  }
  if (sorting.reverse) {
    listOfSources.reverse()
  }
  return listOfSources
}

function filterSourcesByDate(sources, dateOptions) {
  if (sources.length > 0) {
    let allDataPoints = []
    sources.forEach(source => {
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

function filterSourceByBoolean(sources, field, value) {
  if (value == "any") {
    return sources
  }
  console.log(value)
  return sources.filter((source) => {
    return source[field] == value
  })
}

export const useSource = defineStore('source', {
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      sources: [],
      sourceIdDict: {},
      includes: {
        deleted: false
      }
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
    getSources(state) {
      return (options) => {
        if (options.filters.includeArchived == true && state.includes.deleted == false) {
          state.includes.deleted = true
          this.getSourcesFromApi({ deleted: true })
        }
        let deletedOption = false
        if (options) {
          deletedOption = options.filters.includeArchived ? 'any' : false
        }
        let currentSources = filterSourceByBoolean(state.sources, 'deleted', deletedOption)
        currentSources = filterSourcesByDate(currentSources, options.filters.time)
        sortList(currentSources, options.sorting)
        return currentSources
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
    async getSourcesFromApi(options = {}) {
      const data = await AutoSaApi.getSources(options).then((response) => { return response.data })
      data.results.forEach(element => {
        if (element.id in this.sourceIdDict) {
          this.sources[this.sourceIdDict[element.id]] = element
        } else {
          this.sources.push(element)
        }
      });
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