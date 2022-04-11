<template>
  <div>
    <l-map
      ref="mapinstance" v-model:zoom="zoom" style="width: 100%; height: 100%" :center="center"
      @update:center="setCenter" @click="updateMarkerPosition"
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base"
        name="OpenStreetMap" :max-zoom="10"
      />
      <l-marker v-if="markerPosition != undefined" :lat-lng="markerPosition">
        <l-icon :icon-url="MarkerIcon" :icon-size="[45, 45]" :icon-anchor="[13.5, 40]" />
      </l-marker>
    </l-map>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import "leaflet/dist/leaflet.css"
import { LMap, LTileLayer, LMarker, LIcon } from "@vue-leaflet/vue-leaflet";
import MarkerIcon from '@/assets/map_icon.svg'
const mapinstance = ref(null)

const emit = defineEmits(['mapClicked'])

function setCenter(id) {
    center.value = id
}

defineProps({
    markerPosition: { type: Object, required: false, default: () => undefined },
})

const zoom = ref(6)
const center = ref([48.5, 32.2])

function updateMarkerPosition(e) {
    if (e.latlng != undefined) {
        emit('mapClicked', e.latlng)
    }
}

</script>

<style>
</style>