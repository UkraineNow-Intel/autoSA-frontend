<template>
  <l-map ref="map" v-model:zoom="zoom" style="width: 100%; height: 100%" :center="[48.5, 32.2]">
    <l-tile-layer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      layer-type="base"
      name="OpenStreetMap"
      :max-zoom="10"
    />
    <l-marker v-for="marker in markers" :key="marker.id" :lat-lng="marker.coordinates">
      <l-icon :icon-url="Logo" :icon-size="[30, 30]" />
      <l-tooltip>
        {{ marker.text }}
      </l-tooltip>
    </l-marker>
  </l-map>
</template>

<script setup>
import { ref, defineProps, computed } from 'vue'
import "leaflet/dist/leaflet.css"
import { LMap, LTileLayer, LMarker, LIcon, LTooltip } from "@vue-leaflet/vue-leaflet";
import Logo from '@/assets/logo.png'


const props = defineProps({
  sources: { type: Object, required: false, default: () => {} },
})

const zoom = ref(6)

const markers = computed(() => {
  if (props.sources){
    let allDataPoints = []
    let i = 0
    props.sources["sources"].forEach(source => {
      source["locations"].forEach(loc => {
        allDataPoints.push({id: i, text: source.text, coordinates: [loc.lat, loc.lng]})
        i += 1
      });
    });
    return allDataPoints
  }
  return []
})

</script>

<style></style>