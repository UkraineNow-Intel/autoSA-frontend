<template>
  <div class="dashboard-item">
    <div class="dashboard-image">
      <img src="/image.jfif" />
    </div>
    <div class="dashboard-meta">
      <div v-if="source"><span>Posted:</span> <span>{{ source }}</span> <span v-if="sourceInterface">({{ sourceInterface }})</span></div>
      <div v-if="timestamp"><span>Time:</span> <span>{{ timestamp }}</span></div>
    </div>
    <div class="dashboard-text">
      {{ text }}
    </div>
    <div class="dashboard-actions">
      <el-button v-if="source">View Source</el-button>
      <el-button>Pin</el-button>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { ElButton } from 'element-plus'

defineProps({
  image: { type: String, required: false, default: undefined },
  source: { type: String, required: false, default: undefined },
  sourceInterface: { type: String, required: false, default: undefined },
  timestamp: { type: Number, required: false, default: undefined },
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