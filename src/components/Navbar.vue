<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="bg-slate-900 px-5 h-[60px]">
    <div class="max-w-5xl mx-auto flex justify-between items-center h-full">
      <RouterLink to="/">
        <div class="text-4xl font-semibold align-middle">
          <span class="text-yellow-300">Auto</span><span class="text-blue-500">SA</span>
          <span class="text-lg text-white inline-block ml-1 font-light">Auto Situational Awareness</span>
        </div>
      </RouterLink>
      
      <div class="navlinks">
        <RouterLink to="/">
          Research
        </RouterLink>
        <RouterLink to="/translator">
          Translator
        </RouterLink>
      </div>
    </div>
  </div>
</template>



<style scoped>
.navlinks {
  text-align: right;
  color: white;
}
.navlinks a {
  font-size: 1.0em;
  margin: 0.5em 1em;
}

</style>