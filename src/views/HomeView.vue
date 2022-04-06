<template>
  <div>
    <section
      class="bg-cover bg-center bg-slate-700 min-h-[50vh] py-10 px-5 flex items-center"
      style="background-image: url('/image.jfif')"
    >
      <div class="container mx-auto max-w-5xl text-center">
        <form class="flex justify-center homeview-searchbar-form">
          <el-autocomplete
            v-model="searchQuery"
            :fetch-suggestions="querySearch"
            clearable
            placeholder="Enter tag or text"
            @keydown.enter.prevent="submitSearch"
          />
          <button
            class="text-lg inline-flex items-center justify-center text-white px-5 py-3 bg-black/70 focus:bg-black/90 hover:bg-black/90 transition-colors rounded-r"
            @click.prevent="submitSearch"
          >Search</button>
        </form>
      </div>
    </section>
    <section class="p-2 md:p-6">
      <dashboard :search-query="searchQuery"></dashboard>
    </section>
  </div>
</template>



<script setup>
import Dashboard from '@/components/Dashboard/Dashboard.vue';
import { ref } from 'vue'
import { useSource } from '@/stores/sources'
const sourceStore = useSource()

const searchQuery = ref('')

function querySearch(queryString, cb) {
  const results = queryString
    ? sourceStore.tags.filter(createFilter(queryString))
    : sourceStore.tags
  let resultObjects = results.map((x) => { return { 'value': x } })
  cb(resultObjects)
}

function createFilter(queryString) {
  return (x) => {
    return (
      x.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    )
  }
}

function submitSearch() {
  console.log("Searching for...", searchQuery.value)
}

</script>


<style>
.homeview-searchbar-form .el-autocomplete {
  @apply p-3 flex-1 text-lg rounded-l shadow-lg shadow-black/70 placeholder-neutral-500 focus:placeholder-cyan-400 hover:placeholder-cyan-400  max-w-md outline-none transition-colors;
  line-height: 1.75rem;
  padding: 0;
}

.homeview-searchbar-form .el-autocomplete .el-input {
  height: 100%;
  border-radius: 0;
}
.homeview-searchbar-form .el-autocomplete input {
  height: 100%;
  border-radius: 0;
}
</style>