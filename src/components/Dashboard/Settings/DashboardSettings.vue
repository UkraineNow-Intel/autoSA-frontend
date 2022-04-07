<template>
  <div>
    <p style="padding: 5px; font-weight: bold; font-size: 1.2em;">Filter</p>
    <dashboard-settings-box
      name="Websites"
      :options="[
        { label: 'Factal', value: 'factal' },
        { label: 'Live UA Map', value: 'liveuamap' },
        { label: 'BBC', value: 'bbc' },
      ]"
    ></dashboard-settings-box>
    <dashboard-settings-box
      name="Socials"
      :options="[
        { label: 'Twitter', value: 'twitter' },
        { label: 'Telegram', value: 'telegram' },
        { label: 'Facebook', value: 'facebook' },
        { label: 'Other Sites', value: 'other' },
      ]"
    ></dashboard-settings-box>
    <!--<hr style="max-width: 50%; margin: 10px auto;" />-->
    <time-selector @change="(x) => { timeFilter = x }" />
    <hr v-if="authStore.hasPermission('add_source')" style="max-width: 80%; margin: 10px auto; border-top-width: 2px;" />
    <div v-if="authStore.hasPermission('add_source')">
      <p style="padding: 5px; font-weight: bold; font-size: 1.2em;">Actions</p>
      <el-button @click="(x) => emit('addSource', x)">Add Source</el-button>
    </div>
  </div>
</template>



<script setup>
import { ref, defineEmits} from 'vue'
import DashboardSettingsBox from './DashboardSettingsBox.vue';
import TimeSelector from './TimeSelector.vue';
import { useAuth } from '@/stores/auth'

const authStore = useAuth()
const emit = defineEmits(['addSource'])
const timeFilter = ref(null)

</script>

<style scoped>
</style>