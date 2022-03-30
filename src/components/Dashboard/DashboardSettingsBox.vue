<template>
  <div>
    <div style="display: inline-block; text-align: left; margin-bottom: 20px; max-width: 100%;">
      <p style="padding: 5px">{{ name }}</p>
      <el-select
        v-model="value1"
        multiple
        placeholder="Select"
        style="width: 100%;"
        disabled
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
  </div>
</template>

<script setup>
import {ref, defineProps, onMounted} from 'vue'


const value1 = ref([])
const props = defineProps({
  name: { type: String, required: true },
  options: { type: Object, required: true },
})


onMounted(() => {
    props.options.forEach(element => {
        value1.value.push(element.value)       
    });
})

</script>

<style scoped>
</style>