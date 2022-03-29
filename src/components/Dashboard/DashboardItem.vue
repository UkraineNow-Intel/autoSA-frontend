<template>
  <div class="dashboard-item"
    @mouseover="updateHovered(sourceId)"
    @mouseleave="updateHovered(-1)"
    :class="hoveredSourceId == sourceId ? 'border-2 rounded border-yellow-600' : 'border-2 rounded'">
    <div class="dashboard-image">
      <img src="https://placekitten.com/500/300" />
    </div>
    <div class="dashboard-meta">
      <div v-if="source"><span>Posted:</span> <span>{{ source }}</span> <span v-if="sourceInterface">({{ sourceInterface }})</span></div>
      <div v-if="timestamp"><span>Time:</span> <span>{{ timestamp }}</span></div>
      <div v-if="sourceId"><span>Id:</span> <span>{{ sourceId }}</span></div>
    </div>
    <div class="dashboard-text">
      {{ text }}
    </div>
    <div class="dashboard-actions">
      <el-button v-if="source">Show on Map</el-button>
      <el-button>Pin</el-button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import { ElButton } from 'element-plus'

const emit = defineEmits(['hovered'])

function updateHovered(id) {
  emit('hovered', id)
}

defineProps({
  sourceId: { type: Number, required: true },
  image: { type: String, required: false, default: undefined },
  source: { type: String, required: false, default: undefined },
  sourceInterface: { type: String, required: false, default: undefined },
  timestamp: { type: Number, required: false, default: undefined },
  hoveredSourceId: { type: Number, required: false, default: () => -1 },
  text: { type: String, required: true }
})
</script>

<style scoped>

.dashboard-item {
  @apply bg-slate-200 p-5 m-3;
  max-width: 600px;
}
.dashboard-image img {
  width: 100%
}

.dashboard-meta {
  padding: 10px 0;
  font-size: small;
  color: #333333;
}

.dashboard-actions {
  padding: 10px 0;
}

</style>