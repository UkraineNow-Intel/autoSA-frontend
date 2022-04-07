<template>
  <div class="page-wrapper">
    <div style="text-align: left;">
      Pick tag to display:
      <div style="margin-top: 10px;">
        <el-tag
          v-for="tag in sourceStore.tags"
          :key="tag"
          size="large"
          :class="route.params.tag == tag ? 'active' : ''"
          style="margin: 0 6px 6px 0; cursor: pointer;"
          @click="tagClicked(tag)"
        >{{ tag }}</el-tag>
        <div v-if="route.params.tag">
          <dashboard-list :sources="sourceStore.getSourcesWithTags([route.params.tag])"></dashboard-list>
        </div>
      </div>
    </div>
  </div>
</template>



<script setup>
import { onMounted } from 'vue';
import { useSource } from '@/stores/sources'
import router from "@/plugins/router";
import { useRoute } from 'vue-router'
import DashboardList from '../components/Dashboard/DashboardList.vue';

const route = useRoute()
const sourceStore = useSource()

onMounted(() => {
  sourceStore.getSourcesFromApi()
})

function tagClicked(tagName) {
  router.push({ name: 'tag', params: { tag: tagName }})
}

</script>


<style scoped>
.active {
  @apply border-2 rounded border-yellow-600
}
</style>
