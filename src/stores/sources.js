import { defineStore } from 'pinia'
import AutoSaApi from "@/api/api";

export const useSource = defineStore('source', {
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      sources: [],
    }
  },
  actions: {
    async getSourcesFromApi() {
      const data = await AutoSaApi.getSources().then((response) =>  {return response.data })
      this.sources = data
    },
  },
})