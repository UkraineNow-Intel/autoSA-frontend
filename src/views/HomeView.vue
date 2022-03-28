<template>
  <div>

    <section 
      class="bg-cover bg-center bg-slate-700 min-h-[50vh] py-10 px-5 flex items-center"
      style="background-image: url('./image.jfif')"
    >
      <div class="container mx-auto max-w-5xl text-center">
        <form class="flex justify-center">
          <input
            class="p-3 flex-1 text-lg rounded-l shadow-lg shadow-black/70 placeholder-neutral-500 focus:placeholder-cyan-400 hover:placeholder-cyan-400  max-w-md outline-none transition-colors" 
            placeholder="Enter location or phrase."
            type="text"
          >
          <button class="text-lg inline-flex items-center justify-center text-white px-5 py-3 bg-black/70 focus:bg-black/90 hover:bg-black/90 transition-colors rounded-r">
            Search
          </button>
        </form>
      </div>
    </section>
    <section>
      <auto-sa-map style="width: 100vw; max-width: 1000px; height: 60vh; margin: 3em auto;" :sources="sources"></auto-sa-map>
    </section>

  </div>
</template>



<script setup>
import { ref, onMounted } from 'vue'
import AutoSaApi from "../api/api";
import AutoSaMap from '@/components/AutoSaMap.vue'

let sources = ref({})

onMounted(() => {
  sources.value = AutoSaApi.getSources()
})
</script>