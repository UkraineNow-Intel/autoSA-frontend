<template>
  <el-row :gutter="10">
    <el-col v-for="source in sources['sources']" :key="source['id']" :xs="24" :sm="24" :md="12" :lg="12" :xl="8">
      <dashboard-item
        @hovered="(a) => emit('hovered', a)"
        :sourceId="source['id']"
        :sourceInterface="source['interface']"
        :source="source['source']"
        :timestamp="source['timestamp']"
        :text="source['text']"
        :headline="source['headline']"
        :hoveredSourceId="hoveredSourceId"
        style="display: inline-block"
      ></dashboard-item>
    </el-col>
  </el-row>


  <div class="dashboard-list">
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import DashboardItem from '@/components/Dashboard/DashboardItem.vue';
import { ElRow, ElCol } from 'element-plus'

const emit = defineEmits(['hovered'])

defineProps({
  sources: { type: Object, required: false, default: () => { } },
  hoveredSourceId: { type: Number, required: false, default: () => -1 },
})

</script>

<style scoped>
.dashboard-list div {
  vertical-align: top;
}
</style>