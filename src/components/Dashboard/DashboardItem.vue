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
        <div v-if="source"><span>Posted:</span> <span>{{ source }}</span> <span v-if="sourceInterface">({{ sourceInterface }})</span></div>
        <div v-if="timestamp"><span>Time:</span> <span>{{ timestamp }}</span></div>
        <div v-if="sourceId"><span>Id:</span> <span>{{ sourceId }}</span></div>
      </div>
      <div class="dashboard-text grow">
        {{ text }}
      </div>
      <div class="dashboard-actions flex-none">
        <el-button v-if="source">Show on Map</el-button>
        <el-button>Pin</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import { ElButton, ElImage } from 'element-plus'

const emit = defineEmits(['hovered'])

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
  text: { type: String, required: true }
})
</script>

<style scoped>

.dashboard-item {
  @apply bg-slate-200 p-5 m-3;
  width: 100%;
  height: 500px;
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
.dashboard-text {
  height: 100%;
  overflow: auto;
}

.dashboard-actions {
  padding: 10px 0;
}

</style>