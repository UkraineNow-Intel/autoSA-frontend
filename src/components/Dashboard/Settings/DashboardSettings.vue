<template>
  <div>
    <p style="padding: 5px; font-weight: bold; font-size: 1.2em;">Filter</p>
    <!--<dashboard-settings-box
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
    ></dashboard-settings-box>-->
    <!--<hr style="max-width: 50%; margin: 10px auto;" />-->
    <time-selector v-model="currentOptions.filters.time" />
    <hr style="max-width: 80%; margin: 10px auto; border-top-width: 2px;" />
    <p style="padding: 5px; font-weight: bold; font-size: 1.2em;">Sort</p>
    <sorting-selector v-model="currentOptions.sorting" />

    <hr v-if="authStore.hasPermission('add_source')" style="max-width: 80%; margin: 10px auto; border-top-width: 2px;" />
    <div v-if="authStore.hasPermission('add_source')">
      <p style="padding: 5px; font-weight: bold; font-size: 1.2em;">Actions</p>
      <el-button @click="(x) => emit('addSource', x)">Add Source</el-button>
    </div>
  </div>
</template>



<script setup>
import { defineEmits, defineProps, computed } from 'vue'
// import DashboardSettingsBox from './DashboardSettingsBox.vue';
import TimeSelector from './TimeSelector.vue';
import SortingSelector from './SortingSelector.vue';
import { useAuth } from '@/stores/auth'

const authStore = useAuth()
const emit = defineEmits(['update:modelValue', 'addSource'])

const currentOptions = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit('update:modelValue', val)
  }
});

const props = defineProps({
  modelValue: {type: Object, required: true}
})

</script>

<style scoped>
</style>