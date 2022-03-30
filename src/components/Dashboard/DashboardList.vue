<template>
  <el-row :gutter="10" style="margin: 10px">
    <el-col v-for="source in sources['sources']" :key="source['id']" :xs="24" :sm="24" :md="12" :lg="12" :xl="8">
      <dashboard-item
        :source-id="source['id']"
        :source-interface="source['interface']"
        :source="source['source']"
        :timestamp="source['timestamp']"
        :text="source['text']"
        :headline="source['headline']"
        :image="source['image']"
        :hovered-source-id="hoveredSourceId"
        :has-locations="source['locations'].length > 0"
        style="display: inline-block"
        @hovered="(a) => emit('hovered', a)"
        @show-on-map="(a) => emit('showOnMap', a)"
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

const emit = defineEmits(['hovered', 'showOnMap'])

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