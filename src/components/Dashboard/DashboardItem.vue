<template>
  <div
    class="dashboard-item"
    :class="hoveredSourceId == sourceId ? 'border-2 rounded border-yellow-600' : 'border-2 rounded'"
    @mouseover="updateHovered(sourceId)"
    @mouseleave="updateHovered(-1)"
  >
    <div class="flex flex-1 flex-col" style="height: 100%">
      <div v-if="image" class="dashboard-image flex-none">
        <el-image :src="image" fit="cover" />
      </div>
      <div class="dashboard-meta flex-none">
        <div v-if="source">
          <span>Posted:</span>
          <span>{{ source }}</span>
          <span v-if="sourceInterface"> ({{ sourceInterface }})</span>
        </div>
        <div v-if="timestamp">
          <span>Time:</span>
          <span>{{ moment(timestamp * 1000).format("ddd MMM DD, YYYY [at] HH:mm a") }}</span>
        </div>
        <div v-if="sourceId">
          <span>Id:</span>
          <span>{{ sourceId }}</span>
        </div>
      </div>
      <div class="dashboard-text flex-none lg:flex-1 lg:grow ">{{ text }}</div>
      <div class="dashboard-actions flex-none">
        <el-button v-if="hasLocations" @click="emit('showOnMap', sourceId)">Show on Map</el-button>
        <el-button>Pin</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import { ElButton, ElImage } from 'element-plus'
import moment from 'moment'

const emit = defineEmits(['hovered', 'showOnMap'])

function updateHovered(id) {
  emit('hovered', id)
}

defineProps({
  sourceId: { type: Number, required: true },
  source: { type: String, required: false, default: undefined },
  sourceInterface: { type: String, required: false, default: undefined },
  timestamp: { type: Number, required: false, default: undefined },
  hoveredSourceId: { type: Number, required: false, default: () => -1 },
  image: { type: String, required: false, default: () => null },
  text: { type: String, required: true },
  hasLocations: { type: Boolean, required: false, default: () => false }
})

</script>

<style scoped>
.dashboard-item {
  @apply bg-slate-200 p-5 m-3 lg:h-[28rem];
  width: 100%;
  max-height: 90vh;
}
.dashboard-image .el-image {
  height: 100px;
  width: 100%;
}

.dashboard-meta {
  padding: 10px 0;
  font-size: small;
  color: #333333;
}

.dashboard-meta span:first-child {
  margin-right: 6px;
}
.dashboard-text {
  height: 100%;
  overflow: auto;
}

.dashboard-actions {
  padding: 10px 0;
}
</style>