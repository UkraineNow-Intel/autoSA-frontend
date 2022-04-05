<template>
  <div class="bg-slate-900 px-5 h-[60px]">
    <div class="max-w-5xl mx-auto flex justify-between items-center h-full">
      <router-link :to="{ name: 'home' }">
        <div class="text-4xl font-semibold align-middle">
          <span class="text-yellow-300">Auto</span>
          <span class="text-blue-500">SA</span>
          <span
            class="text-lg text-white ml-2 font-light hidden sm:inline-block"
          >Auto Situational Awareness</span>
        </div>
      </router-link>
      <div>
        <router-link class="nav-link" :to="{ name: 'home' }">Research</router-link>
        <router-link class="nav-link" :to="{ name: 'translator' }">Translator</router-link>
        <router-link v-if="!authStore.isLoggedIn" class="nav-link" :to="{ name: 'login' }">Login</router-link>
        <a v-if="authStore.isLoggedIn" style="cursor:pointer" type="info" class="nav-link" @click="confirmLogout">Logout</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { useAuth } from '@/stores/auth'
import { ElMessageBox } from 'element-plus'
const authStore = useAuth()

function confirmLogout() {
  ElMessageBox.confirm(
    'Do you really want to logout?',
    'Logout',
    {
      confirmButtonText: 'Logout',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  ).then(() => {
      logout()
    })
}


async function logout() {
  authStore.logout()
}
</script>

<style scoped>
.nav-link {
  @apply text-white hover:text-yellow-300 active-class:text-yellow-300 p-3 active-class:underline underline-offset-2 decoration-yellow-300 transition-colors duration-100;
}
</style>