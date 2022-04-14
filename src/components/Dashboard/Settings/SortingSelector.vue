<template>
  <div>
    <div style="display: inline-block; text-align: left; margin-bottom: 20px; width: 100%;">
      <p style="padding: 5px; display: inline-block">Sort by</p>
      <el-select v-model="currentValue.by" style="display: inline-block; width: 160px;" placeholder="Sort by">
        <el-option label="ID" value="id" />
        <el-option label="Time" value="time" />
      </el-select>
      <el-switch v-model="currentValue.reverse" style="margin: 5px" active-text="Reverse" />
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps, defineEmits } from 'vue'

const currentValue = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit('update:modelValue', val)
  }
});

const props = defineProps({
  modelValue: {
    type: Object, required: false, default: () => {
      return {
        by: "",
        reverse: true
      }
    }
  }
})

const emit = defineEmits(['update:modelValue'])
</script>

<style scoped>
</style>