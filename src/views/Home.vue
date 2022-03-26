<template>
  <div class="bg-cover bg-center" style="background-image: url('./image.jfif')">

    <section class="min-h-[50vh] py-10 flex items-center">
      <div class="container mx-auto max-w-5xl text-center">
        <form action="">
          <input
            class="p-3 text-lg rounded-l shadow-md hover:shadow-xl border hover:border-cyan-400 transition-shadow w-full max-w-md" 
            placeholder="Enter location or phrase."
            type="text"
          >
          <button class="text-lg inline-flex items-center justify-center text-white px-5 py-3 bg-black/70 hover:bg-black/90 transition-colors rounded-r">
            Search
          </button>
        </form>
      </div>
    </section>

  </div>
</template>

<script setup>

import Navbar from '@/components/Navbar.vue'

</script>