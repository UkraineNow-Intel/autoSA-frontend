<template>
  <el-row :gutter="10" style="margin: 10px">
    <el-col
      v-for="source in sources"
      :key="source['id']"
      :xs="24"
      :sm="24"
      :md="singleColumn ? 24 : 12"
      :lg="singleColumn ? 24 : 12"
      :xl="singleColumn ? 24 : 8"
    >
      <source-item
        :ref="setItemRef"
        :fixed-height="!singleColumn"
        :source="source"
        :hovered-source-id="hoveredSourceId"
        style="display: inline-block"
        @hovered="(a) => emit('hovered', a)"
        @show-on-map="(a) => emit('showOnMap', a)"
        @tag-clicked="(tag) => emit('tagClicked', tag)"
      ></source-item>
    </el-col>
    <el-col v-if="sources.length == 0" :xs="24">
      <el-alert
        title="Sorry, this list is empty. Maybe you should change the filters?"
        type="info"
        center
        show-icon
        :closable="false"
      />
    </el-col>
  </el-row>
</template>

<script setup>
import { ref, onBeforeUpdate, defineProps, defineEmits, defineExpose } from 'vue'
import SourceItem from './Item/Source.vue';
import { ElRow, ElCol } from 'element-plus'

const sourceItemRefs = ref([])

const emit = defineEmits(['hovered', 'showOnMap', 'tagClicked'])

const props = defineProps({
  sources: { type: Array, required: false, default: () => [] },
  hoveredSourceId: { type: Number, required: false, default: () => -1 },
  singleColumn: { type: Boolean, required: false, default: () => false },
})

function setItemRef(el) {
  if (el) {
    sourceItemRefs.value.push(el)
  }
}

onBeforeUpdate(() => {
  sourceItemRefs.value = []
})

function scrollSourceIntoView(id) {
  var index = props.sources.map((e) => { return e.id; }).indexOf(id);
  sourceItemRefs.value[index].scrollToElement()
}

defineExpose({ scrollSourceIntoView })

</script>
