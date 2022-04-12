<template>
  <div>
    Manually enter new source:
    <el-form ref="form" class="source-item-form" :model="model" @submit.prevent="submitForm" @keydown.enter.prevent="">
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
        <el-input v-model="model.text" type="textarea" :autosize="{ minRows: 2, maxRows: 4 }" placeholder="Text..." />
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
        <map-picker ref="mappickerinstance" v-model="location" style="width: 100%;" height="40vh"></map-picker>
      </el-form-item>

      <el-form-item>
        <el-button :loading="loading" type="info" block @click="emit('cancel')">Cancel</el-button>
        <el-button :loading="loading" type="primary" native-type="submit" block>{{ buttonText }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, onMounted } from 'vue'
import MapPicker from '@/components/MapPicker.vue'

const emit = defineEmits(['cancel', 'submit'])
const mappickerinstance = ref(null)

const location = ref({
  name: "",
  lat: undefined,
  lng: undefined
})

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

async function submitForm() {
  if (location.value.lat != undefined) {
    model.value.locations[0] = {
      name: location.value.name,
      point: {
        type: "point",
        coordinates: [location.value.lat, location.value.lng]
      }
    }
  }
  emit('submit', model.value)
}


const props = defineProps({
  defaultData: { type: Object, required: false, default: () => undefined },
  loading: { type: Boolean, required: false, default: () => false },
  buttonText: { type: String, required: false, default: () => "Create Source" }
})

onMounted(() => {
  if (props.defaultData != undefined) {
    model.value = JSON.parse(JSON.stringify(props.defaultData))
    if (model.value.locations.length > 0) {
      location.value.name = model.value.locations[0].name
      location.value.lat = model.value.locations[0].point.coordinates[0]
      location.value.lng = model.value.locations[0].point.coordinates[1]
      console.log("done")

      mappickerinstance.value.invalidateSize()
      window.setTimeout(() => {
        mappickerinstance.value.invalidateSize()
        mappickerinstance.value.setCenter([location.value.lat, location.value.lng])
        window.setTimeout(() => {
          mappickerinstance.value.setCenter([location.value.lat, location.value.lng])
        }, 200)
      }, 100)
    }
  }
})

</script>

<style scoped>
</style>