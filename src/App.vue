<template>
  <div class="flex flex-col min-h-screen">
    <Navbar />
    <router-view />
    <Footer class="mt-auto" />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import { useAuth } from '@/stores/auth'


const authStore = useAuth()
authStore.update()

</script>

<style>
.page-wrapper {
  max-width: 1200px;
  margin: auto;
  padding: 2em;
  background-color: lightgrey;
}
</style>
