<template>
  <el-tag
    v-for="tag in tags"
    :key="tag"
    closable
    :disable-transitions="false"
    @close="deleteTag(tag)"
  >{{ tag }}</el-tag>
  <el-input
    v-if="inputVisible"
    ref="InputRef"
    v-model="inputValue"
    size="small"
    @keyup.enter="handleInputConfirm"
    @blur="handleInputConfirm"
  />
  <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput">+ New Tag</el-button>
</template>

<script setup>
import { nextTick, ref, defineProps } from 'vue'
import { ElInput } from 'element-plus'
import { useSource } from '@/stores/sources'

const sourceStore = useSource()

const inputValue = ref('')
const inputVisible = ref(false)
const InputRef = ref()


const props = defineProps({
  sourceId: { type: Number, required: true },
  tags: { type: Array, required: true },
})

function deleteTag(tag) {
  sourceStore.deleteTag(props.sourceId, tag)
}

function showInput() {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value.focus()
  })
}

function handleInputConfirm() {
  if (inputValue.value) {
    sourceStore.addTag(props.sourceId, inputValue.value)
  }
  inputVisible.value = false
  inputValue.value = ''
}
</script>
