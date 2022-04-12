<template>
  <div>
    <l-map
      ref="mapinstance" v-model:zoom="zoom" style="width: 100%; height: 100%" :center="center"
      @update:center="setCenter"
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base" name="OpenStreetMap"
        :max-zoom="10"
      />
      <l-marker
        v-for="marker in markers" :key="marker.id" :lat-lng="marker.coordinates"
        @mouseover="updateHovered(marker.id)" @mouseleave="updateHovered(-1)" @click="markerClicked(marker.id)"
      >
        <l-icon :icon-url="MarkerIcon" :icon-size="marker.size" :icon-anchor="marker.anchor" />
        <l-tooltip>
          <p style="max-width: 15rem; overflow: hidden; text-overflow: ellipsis;">{{ marker.text }}</p>
        </l-tooltip>
      </l-marker>
    </l-map>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, defineExpose, computed } from 'vue'
import "leaflet/dist/leaflet.css"
import { LMap, LTileLayer, LMarker, LIcon, LTooltip } from "@vue-leaflet/vue-leaflet";
import MarkerIcon from '@/assets/map_icon.svg'
const mapinstance = ref(null)

const emit = defineEmits(['hovered', 'markerClicked'])

function updateHovered(id) {
  emit('hovered', id)
}

function markerClicked(id) {
  emit('markerClicked', id)
}

function setCenter(id) {
  center.value = id
}

const props = defineProps({
  sources: { type: Array, required: false, default: () => [] },
  hoveredSourceId: { type: Number, required: false, default: () => -1 },
})

const zoom = ref(6)
const center = ref([48.5, 32.2])

function zoomToId(id) {
  const locations = getSourceLocations(id)
  if (locations.length > 0) {
    center.value = [locations[0].point.coordinates[0], locations[0].point.coordinates[1]]
    zoom.value = 10
  } else {
    console.log("Location with id " + id + " was not found!")
  }
}

function invalidateSize() {
  window.setTimeout(() => {
    mapinstance.value.leafletObject.invalidateSize()
  }, 20)
}

defineExpose({ zoomToId, invalidateSize })

function getSourceLocations(id) {
  for (var i = 0; i < props.sources.length; i++) {
    if (props.sources[i]["id"] == id) {
      return props.sources[i]["locations"]
    }
  }
  return
}

const markers = computed(() => {
  if (props.sources) {
    let allDataPoints = []
    props.sources.forEach(source => {
      if ("locations" in source) {
        source["locations"].forEach(loc => {
          allDataPoints.push({
            id: source.id,
            text: source.text,
            coordinates: loc.point.coordinates,
            size: props.hoveredSourceId == source.id ? [45, 45] : [25, 25],
            anchor: props.hoveredSourceId == source.id ? [13.5, 40] : [7.5, 22.2]
          })
        });
      }
    });
    return allDataPoints
  }
  return []
})

</script>

<style>
</style>