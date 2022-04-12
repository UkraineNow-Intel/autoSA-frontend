<template>
  <div>
    <div style="display: inline-block; text-align: left; margin-bottom: 20px; width: 100%;">
      <p style="padding: 5px">Time</p>
      <el-date-picker
        v-model="currentValue"
        type="datetimerange"
        :shortcuts="shortcuts"
        range-separator="To"
        start-placeholder="Start date"
        end-placeholder="End date"
        style="width: 100%"
      />
    </div>
  </div>
</template>

<script setup>
import {computed, defineProps, defineEmits } from 'vue'
import { ElDatePicker } from 'element-plus'

const currentValue = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit('update:modelValue', val)
  }
});

const props = defineProps({
  modelValue: {type: Array, required: false, default: () => []}
})

const emit = defineEmits(['update:modelValue'])


const shortcuts = [
  {
    text: 'Last 24h',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24)
      return [start, end]
    },
  },
  {
    text: 'Last week',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    },
  },
  {
    text: 'Last month',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    },
  },
  {
    text: 'Last 3 months',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    },
  },
]

</script>

<style scoped>
</style>