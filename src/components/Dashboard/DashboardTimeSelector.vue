<template>
  <div>
    <div style="display: inline-block; text-align: left; margin-bottom: 20px; max-width: 100%;">
      <p style="padding: 5px">Time</p>
      <el-date-picker
        v-model="value2"
        type="datetimerange"
        :shortcuts="shortcuts"
        range-separator="To"
        start-placeholder="Start date"
        end-placeholder="End date"
        style="width: 100%"
        disabled
      />
    </div>
  </div>
</template>

<script setup>
import {ref } from 'vue'
import { ElDatePicker } from 'element-plus'

const value2 = ref('')

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