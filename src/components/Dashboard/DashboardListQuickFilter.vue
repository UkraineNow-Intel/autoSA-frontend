<template>
  <div style="margin: 1rem;">
    <div style="display: inline-block; text-align: left; width: 100%;">
      <div>
        <el-radio-group v-model="pinned" @change="emitupdate">
          <el-radio label="na">Show by tag</el-radio>
          <el-radio label="include">Include all pinned</el-radio>
          <el-radio label="exclude">Hide all pinned</el-radio>
        </el-radio-group>
      </div>
      <el-select v-model="selectedTags" multiple placeholder="Filter by tags" style="width: 100%;" @change="emitupdate">
        <el-option v-for="item in sourceStore.tags" :key="item" :label="item" :value="item" />
      </el-select>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue'
import { useSource } from '@/stores/sources'
const sourceStore = useSource()

const emit = defineEmits(['updateFilter'])

const selectedTags = ref([])
const pinned = ref('include')

function emitupdate() {
  emit('updateFilter', {
    "pinned": pinned.value,
    "tags": selectedTags.value
  })
}

</script>

<style scoped>
</style>