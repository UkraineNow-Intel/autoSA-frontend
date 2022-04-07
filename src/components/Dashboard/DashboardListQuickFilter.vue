<template>
  <div style="margin: 1rem;">
    <div style="display: inline-block; text-align: left; width: 100%;">
      <div v-if="showPinningOptions">
        <el-radio-group v-model="filters.pinned">
          <el-radio label="na">Filter by tag</el-radio>
          <el-radio label="include">Include all pinned</el-radio>
          <el-radio label="exclude">Hide all pinned</el-radio>
        </el-radio-group>
      </div>
      <el-select v-model="filters.tags" multiple placeholder="Filter by tags" style="width: 100%;">
        <el-option v-for="item in sourceStore.tags" :key="item" :label="item" :value="item" />
      </el-select>
    </div>
  </div>
</template>

<script setup>
import { defineEmits, defineProps, computed } from 'vue'
import { useSource } from '@/stores/sources'
const sourceStore = useSource()

const emit = defineEmits(['update:modelValue'])

const filters = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
});

const props = defineProps({
  modelValue: {
    type: Object, required: false, default: () => {
      return {
        pinned: 'na',
        tags: []
      }
    }
  },
  showPinningOptions: { type: Boolean, required: false, default: () => false },
})

</script>

<style scoped>
</style>