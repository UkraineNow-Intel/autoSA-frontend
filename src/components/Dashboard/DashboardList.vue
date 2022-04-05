<template>
  <el-row :gutter="10" style="margin: 10px">
    <el-col v-for="source in sources" :key="source['id']" :xs="24" :sm="24" :md="12" :lg="12" :xl="8">
      <dashboard-item
        :ref="setItemRef"
        :source="source"
        :hovered-source-id="hoveredSourceId"
        style="display: inline-block"
        @hovered="(a) => emit('hovered', a)"
        @show-on-map="(a) => emit('showOnMap', a)"
      ></dashboard-item>
    </el-col>
    <el-col v-if="sources.length == 0" :xs="24">
      <el-alert title="Sorry, this list is empty. Maybe you should change the filters?" type="info" center show-icon :closable="false"/>
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
  sources: { type: Array, required: false, default: () => [] },
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
  var index = props.sources.map((e) => { return e.id; }).indexOf(id);
  dashboarditemRefs.value[index].scrollToElement()
}

defineExpose({ scrollSourceIntoView })


</script>

<style scoped>
.dashboard-list div {
  vertical-align: top;
}
</style>