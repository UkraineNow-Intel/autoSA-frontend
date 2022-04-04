<template>
  <el-row :gutter="10" style="margin: 10px">
    <el-col :xs="24">
      <div class="dashboard-item border-2 rounded border-yellow-600">
        Manually enter new source:
        <el-form ref="form" class="source-item-form" :model="model" @submit.prevent="createSource">
          <el-form-item prop="interface">
            <el-select v-model="model.interface" placeholder="Select">
              <el-option label="Website" value="website" />
              <el-option label="Twitter" value="twitter" />
              <el-option label="API" value="api" />
            </el-select>
          </el-form-item>
          <el-form-item prop="source">
            <el-input v-model="model.source" placeholder="Source (e.g. @ukrainenow)"></el-input>
          </el-form-item>
          <el-form-item prop="headline">
            <el-input v-model="model.headline" placeholder="Headline"></el-input>
          </el-form-item>
          <el-form-item prop="text">
            <el-input
              v-model="model.text"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4 }"
              placeholder="Text..."
            />
          </el-form-item>
          <el-form-item prop="language">
            <el-select v-model="model.language" placeholder="Select">
              <el-option label="Ukrainian" value="ua" />
              <el-option label="Russian" value="ru" />
              <el-option label="English" value="en" />
            </el-select>
          </el-form-item>
          <el-form-item prop="timestamp">
            <el-date-picker
              v-model="model.timestamp"
              type="datetime"
              placeholder="Select date and time"
            />
          </el-form-item>

          <el-form-item>
            <el-button
              :loading="loading"
              class="login-button"
              type="primary"
              native-type="submit"
              block
            >Create</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-col>
    <hr />
  </el-row>
</template>

<script setup>
import { ref, defineProps } from 'vue'
import { useSource } from '@/stores/sources'
const sourceStore = useSource()

const loading = ref(false)
const model = ref({
  "interface": "website",
  "source": "@testtweet",
  "headline": "",
  "text": "This is a new source",
  "language": "ua",
  "timestamp": "2022-04-01T20:25:00Z",
  "pinned": "true",
  "translations": [],
  "tags": [],
})

async function createSource() {
  loading.value = true
  await sourceStore.createSource(model.value)
  loading.value = false
}

defineProps({
  default: { type: Object, required: false, default: () => { } }
})

</script>

<style scoped>
.dashboard-item {
  @apply bg-slate-200 p-5 m-3;
  width: 100%;
}
</style>