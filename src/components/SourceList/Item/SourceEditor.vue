<template>
  <el-row :gutter="10" style="margin: 10px">
    <el-col :xs="24">
      <div class="dashboard-item border-2 rounded border-yellow-600">
        Manually enter new source:
        <el-form
          ref="form" class="source-item-form" :model="model" @submit.prevent="createSource"
          @keydown.enter.prevent=""
        >
          <el-form-item prop="interface">
            <el-select v-model="model.interface" placeholder="Select Interface">
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
              v-model="model.text" type="textarea" :autosize="{ minRows: 2, maxRows: 4 }"
              placeholder="Text..."
            />
          </el-form-item>
          <el-form-item prop="language">
            <el-select v-model="model.language" placeholder="Language">
              <el-option label="Ukrainian" value="ua" />
              <el-option label="Russian" value="ru" />
              <el-option label="English" value="en" />
            </el-select>
          </el-form-item>
          <el-form-item prop="timestamp">
            <el-date-picker v-model="model.timestamp" type="datetime" placeholder="Select date and time" />
          </el-form-item>

          <el-form-item>
            <map-picker v-model="location" style="width: 100%;" height="40vh"></map-picker>
          </el-form-item>

          <el-form-item>
            <el-button :loading="loading" type="info" block @click="emit('cancel')">Cancel</el-button>
            <el-button :loading="loading" type="primary" native-type="submit" block>Create</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-col>
    <hr /></el-row>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import { useSource } from '@/stores/sources'
import MapPicker from '@/components/MapPicker.vue'
const sourceStore = useSource()

const emit = defineEmits(['cancel', 'submit'])

const location = ref({
  name: "",
  lat: undefined,
  lng: undefined
})
const loading = ref(false)
/*
const model = ref({
  "interface": "",
  "source": "",
  "headline": "",
  "text": "",
  "language": "",
  "timestamp": "",
  "pinned": "false",
  "locations": [],
  "translations": [],
  "tags": [],
})
*/
const model = ref({
  "interface": "website",
  "source": "https://example.com",
  "headline": "Test headline",
  "text": "Test text",
  "language": "en",
  "timestamp": "2021-12-08 00:00:00",
  "pinned": "false",
  "locations": [],
  "translations": [],
  "tags": [],
})


async function createSource() {
  model.value.locations[0] = {
    name: location.value.name,
    point: "POINT (" + location.value.lat + " " + location.value.lng + ")"
  }
  loading.value = true
  await sourceStore.createSource(model.value)
  loading.value = false
  //emit('submit')
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