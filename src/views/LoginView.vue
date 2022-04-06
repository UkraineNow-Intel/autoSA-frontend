<template>
  <div>
    <section
      class="bg-cover bg-center bg-slate-700 min-h-[50vh] py-10 px-5 flex items-center"
      style="background-image: url('./image.jfif')"
    >
      <div class="container mx-auto max-w-5xl text-center bg-white">
        <Login></Login>
      </div>
    </section>
  </div>
</template>



<script setup>
import Login from "../components/Login.vue";
</script>