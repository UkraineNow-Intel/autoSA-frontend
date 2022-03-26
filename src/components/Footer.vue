<template>
  <footer class="bg-slate-900 text-white py-4">
    <div class="grid lg:grid-cols-3 justify-items-center items-center gap-4">
      <div class="font-semibold text-3xl">
        <span class="text-yellow-300">Auto</span>
        <span class="text-blue-400">SA</span>
        <span class="inline-block text-sm ml-2">by UkraineNow</span>
      </div>
      <div>Built to help save Ukrainians from Russian aggression.</div>
      <div>
        <router-link class="nav-link" :to="{ name: 'home' }">Research</router-link>
        <router-link class="nav-link" :to="{ name: 'translator' }">Translator</router-link>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { RouterLink } from "vue-router"
</script>

<style scoped>

.nav-link {
  @apply text-white hover:text-yellow-300 transition-colors p-3
}


/* .items {
  display: grid;
  grid-auto-flow: column;
  grid-gap: 10px;
  margin: 30px;
  overflow: auto;
}
.navlinks {
  text-align: right;
}
.navlinks a {
  font-size: 1.2em;
  margin: 1em;
}
 */
</style>