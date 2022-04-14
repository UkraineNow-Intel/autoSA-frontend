<template>
  <div>
    <el-input
      v-model="data.name" placeholder="Please enter location name" @keyup.enter="handleInputConfirm"
    ></el-input>
    <l-map
      ref="mapinstance" v-model:zoom="zoom" :style="{width: '100%', height: height}" :center="center"
      @update:center="setCenter" @click="updateMarkerPosition"
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base" name="OpenStreetMap"
        :max-zoom="10"
      />
      <l-marker v-if="data.lat != undefined" :lat-lng="[data.lat, data.lng]">
        <l-icon :icon-url="MarkerIcon" :icon-size="[45, 45]" :icon-anchor="[13.5, 40]" />
      </l-marker>
    </l-map>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, defineExpose, computed } from 'vue'
import "leaflet/dist/leaflet.css"
import { LMap, LTileLayer, LMarker, LIcon } from "@vue-leaflet/vue-leaflet";
import MarkerIcon from '@/assets/map_icon.svg'
import { coordinatesByAdress, addressByCoordinates } from '@/api/nominatim.js'
const mapinstance = ref(null)

const data = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit('update:modelValue', val)
  }
});

const emit = defineEmits(['update', 'update:modelValue'])
defineExpose({ setCenter, invalidateSize })

async function handleInputConfirm() {
  const result = await coordinatesByAdress(data.value.name)
  center.value = [result.lat, result.lon]
  data.value.lat = parseFloat(result.lat)
  data.value.lng = parseFloat(result.lon)
  data.value.name = result.display_name
}

function setCenter(newCenter) {
  center.value = newCenter
}

function invalidateSize() {
  window.setTimeout(() => {
    mapinstance.value.leafletObject.invalidateSize()
  }, 1000)
}

const props = defineProps({
  modelValue: {
    type: Object, required: false, default: () => {
      return {
        name: "",
        lat: undefined,
        lng: undefined
      }
    }
  },
  height: {type: String, required: false, default: "30vh"}
})

const zoom = ref(6)
const center = ref([48.5, 32.2])

async function updateMarkerPosition(e) {
  if ("latlng" in e && e.latlng != undefined) {
    data.value.lat = e.latlng.lat
    data.value.lng = e.latlng.lng
    const newname = await addressByCoordinates(e.latlng.lat, e.latlng.lng)
    data.value.name = newname.display_name
  }
}

</script>

<style>
</style>