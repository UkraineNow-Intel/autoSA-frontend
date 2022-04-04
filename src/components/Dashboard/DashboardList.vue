<template>
  <el-row :gutter="10" style="margin: 10px">
    <el-col v-for="source in sources['sources']" :key="source['id']" :xs="24" :sm="24" :md="12" :lg="12" :xl="8">
      <dashboard-item
        :ref="setItemRef"
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
import { ref, onBeforeUpdate, defineProps, defineEmits, defineExpose } from 'vue'
import DashboardItem from '@/components/Dashboard/DashboardItem.vue';
import { ElRow, ElCol } from 'element-plus'

const dashboarditemRefs = ref([])

const emit = defineEmits(['hovered', 'showOnMap'])

const props = defineProps({
  sources: { type: Object, required: false, default: () => { } },
  hoveredSourceId: { type: Number, required: false, default: () => -1 },
})

function setItemRef (el) {
  if (el) {
    dashboarditemRefs.value.push(el)
  }
}

onBeforeUpdate(() => {
  dashboarditemRefs.value = []
})

function scrollSourceIntoView(id) {
  var index = props.sources['sources'].map((e) => { return e.id; }).indexOf(id);
  dashboarditemRefs.value[index].scrollToElement()
}

defineExpose({ scrollSourceIntoView })


</script>

<style scoped>
.dashboard-list div {
  vertical-align: top;
}
</style>