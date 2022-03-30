<template>
  <el-row :gutter="10">
    <el-col :xs="6" :sm="6" :md="4" :lg="4" :xl="4">
      <div class="affix-container-settings">
        <el-affix target=".affix-container-settings" :offset="80">
          <dashboard-settings-box
            name="Websites"
            :options="[
              { label: 'Factal', value: 'factal' },
              { label: 'Live UA Map', value: 'liveuamap' },
              { label: 'BBC', value: 'bbc' },
            ]"
          ></dashboard-settings-box>
          <dashboard-settings-box
            name="Socials"
            :options="[
              { label: 'Twitter', value: 'twitter' },
              { label: 'Telegram', value: 'telegram' },
              { label: 'Facebook', value: 'facebook' },
              { label: 'Other Sites', value: 'other' },
            ]"
          ></dashboard-settings-box>
        </el-affix>
      </div>
    </el-col>
    <el-col :xs="18" :sm="18" :md="10" :lg="12" :xl="12">
      <dashboard-list
        :hovered-source-id="hoveredSourceId"
        :sources="filteredSources"
        @hovered="updateHovered"
      ></dashboard-list>
    </el-col>
    <el-col :xs="24" :sm="24" :md="10" :lg="8" :xl="8">
      <div class="affix-container-map">
        <el-affix target=".affix-container-map" :offset="80">
          <auto-sa-map
            style="width: 100%; max-width: 1000px; height: 60vh;"
            :sources="filteredSources"
            :hovered-source-id="hoveredSourceId"
            @hovered="updateHovered"
          ></auto-sa-map>
        </el-affix>
      </div>
    </el-col>
  </el-row>
</template>



<script setup>
import { ref, onMounted, computed, defineProps } from 'vue'
import AutoSaApi from "@/api/api";
import AutoSaMap from '@/components/AutoSaMap.vue'
import DashboardList from '@/components/Dashboard/DashboardList.vue';
import DashboardSettingsBox from './DashboardSettingsBox.vue';

let sources = ref({"sources": []})
let hoveredSourceId = ref(1)

function updateHovered(id) {
  hoveredSourceId.value = parseInt(id)
}

const props = defineProps({
  searchQuery: { type: String, required: false, default: () => "" },
})

onMounted(() => {
  sources.value = AutoSaApi.getSources()
})

const filteredSources = computed(() => {
  if (props.searchQuery == ''){
    return sources.value
  }
  if (sources.value){
    let allDataPoints = []
    sources.value["sources"].forEach(source => {
      const currentQuery = props.searchQuery.toLowerCase()
      if (currentQuery == '' || source["text"].toLowerCase().includes(currentQuery)){
        allDataPoints.push(source)
      }
    });
    return {'sources': allDataPoints}
  }
  return {'sources': []}
})

</script>

<style scoped>
.affix-container-settings,
.affix-container-map {
  text-align: center;
  height: 100%;
  border-radius: 4px;
}
</style>