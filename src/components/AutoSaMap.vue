<template>
  <l-map ref="map" v-model:zoom="zoom" style="width: 100%; height: 100%" :center="[48.5, 32.2]">
    <l-tile-layer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      layer-type="base"
      name="OpenStreetMap"
      :max-zoom="10"
    />
    <l-marker
      v-for="marker in markers"
      :key="marker.id"
      :lat-lng="marker.coordinates"    
      @mouseover="updateHovered(marker.id)"
      @mouseleave="updateHovered(-1)"
    >
      <l-icon :icon-url="Logo" :icon-size="marker.size" />
      <l-tooltip>
        {{ marker.text }}
      </l-tooltip>
    </l-marker>
  </l-map>
</template>

<script setup>
import { ref, defineProps, defineEmits, computed } from 'vue'
import "leaflet/dist/leaflet.css"
import { LMap, LTileLayer, LMarker, LIcon, LTooltip } from "@vue-leaflet/vue-leaflet";
import Logo from '@/assets/logo.png'

const emit = defineEmits(['hovered'])

function updateHovered(id) {
  console.log(id)
  emit('hovered', id)
}

const props = defineProps({
  sources: { type: Object, required: false, default: () => {} },
  hoveredSourceId: { type: Number, required: false, default: () => -1 },
})

const zoom = ref(6)

const markers = computed(() => {
  if (props.sources){
    let allDataPoints = []
    props.sources["sources"].forEach(source => {
      source["locations"].forEach(loc => {
        allDataPoints.push({id: source.id, text: source.text, coordinates: [loc.lat, loc.lng], size: props.hoveredSourceId == source.id ? [45,45] : [25,25] })
      });
    });
    return allDataPoints
  }
  return []
})

</script>

<style></style>