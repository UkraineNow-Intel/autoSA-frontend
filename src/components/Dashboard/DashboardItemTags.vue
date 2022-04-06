<template>
  <el-tag
    v-for="tag in tags"
    :key="tag"
    :closable="authStore.hasPermission('changeSource')"
    :disable-transitions="false"
    @close="deleteTag(tag)"
  >{{ tag }}</el-tag>

  <div v-if="authStore.hasPermission('changeSource')" style="display: inline-block">
    <el-autocomplete
      v-if="inputVisible"
      ref="InputRef"
      v-model="inputValue"
      size="small"
      :fetch-suggestions="queryTags"
      clearable
      placeholder="Enter tag"
      @keyup.enter="handleInputConfirm"
      @select="handleInputConfirm"
    />
    <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput">+ New Tag</el-button>
  </div>
</template>

<script setup>
import { nextTick, ref, defineProps } from 'vue'
import { useSource } from '@/stores/sources'
import { useAuth } from '@/stores/auth'

const sourceStore = useSource()
const authStore = useAuth()

const inputValue = ref('')
const inputVisible = ref(false)
const InputRef = ref()


const props = defineProps({
  sourceId: { type: Number, required: true },
  tags: { type: Array, required: true },
})

function queryTags(queryString, cb) {
  let availableTags = sourceStore.tags
  let excludedTags = [...props.tags]
  availableTags = availableTags.filter(n => !excludedTags.includes(n))
  const results = queryString
    ? availableTags.filter(createFilter(queryString))
    : availableTags
  let resultObjects = results.map((x) => { return { 'value': x } })
  cb(resultObjects)
}

function createFilter(queryString) {
  return (x) => {
    return (
      x.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    )
  }
}

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
