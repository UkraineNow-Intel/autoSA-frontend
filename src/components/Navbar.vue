<template>
  <div class="bg-slate-900 px-5 h-[60px]">
    <div class="max-w-5xl mx-auto flex justify-between items-center h-full">
      <router-link :to="{ name: 'home' }">
        <div class="text-4xl font-semibold align-middle">
          <span class="text-yellow-300">Auto</span><span class="text-blue-500">SA</span>
          <span class="text-lg text-white ml-2 font-light hidden sm:inline-block">Auto Situational Awareness</span>
        </div>
      </router-link>
      
      <div>
        <router-link class="nav-link" :to="{ name: 'home' }">Research</router-link>
        <router-link class="nav-link" :to="{ name: 'translator' }">Translator</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>

<style scoped>

.nav-link {
  @apply text-white hover:text-yellow-300 transition-colors p-3
}

</style>