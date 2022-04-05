<template>
  <el-row :gutter="10">
    <el-col :xs="6" :sm="6" :md="4" :lg="4" :xl="4">
      <div class="affix-container-settings">
        <el-affix
          target=".affix-container-settings"
          :offset="80"
          style="text-align: left; width: 100%"
        >
          <el-button @click="addSource">Add Source</el-button>
          <hr style="max-width: 50%; margin: 10px auto;" />
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
          <hr style="max-width: 50%; margin: 10px auto;" />
          <dashboard-time-selector></dashboard-time-selector>
        </el-affix>
      </div>
    </el-col>
    <el-col :xs="18" :sm="18" :md="10" :lg="12" :xl="12">
      <dashboard-item-editor
        v-if="showEditor.display"
        :default="showEditor.default"
        @submit="showEditor.display = false"
        @cancel="showEditor.display = false"
      ></dashboard-item-editor>
      <dashboard-list
        ref="dashboardlistinstance"
        :hovered-source-id="hoveredSourceId"
        :sources="filteredSources"
        @hovered="updateHovered"
        @show-on-map="showIdOnMap"
      ></dashboard-list>
    </el-col>
    <el-col :xs="24" :sm="24" :md="10" :lg="8" :xl="8">
      <div class="affix-container-map">
        <el-affix target=".affix-container-map" style="width: 100%" :offset="80">
          <auto-sa-map
            ref="mapinstance"
            style="width: 100%; max-width: 1000px; height: 60vh;"
            :sources="filteredSources"
            :hovered-source-id="hoveredSourceId"
            @hovered="updateHovered"
            @marker-clicked="scrollSourceIntoView"
          ></auto-sa-map>
        </el-affix>
      </div>
    </el-col>
  </el-row>
</template>



<script setup>
import { ref, onMounted, computed, defineProps } from 'vue'
import AutoSaMap from '@/components/AutoSaMap.vue'
import DashboardList from '@/components/Dashboard/DashboardList.vue';
import DashboardSettingsBox from './DashboardSettingsBox.vue';
import DashboardTimeSelector from './DashboardTimeSelector.vue';
import { storeToRefs } from 'pinia'
import { useSource } from '@/stores/sources'
import DashboardItemEditor from './DashboardItemEditor.vue'

const hoveredSourceId = ref(1)
const mapinstance = ref(null)
const dashboardlistinstance = ref(null)
const sourceStore = useSource()
const { sources } = storeToRefs(sourceStore)
const showEditor = ref({
  display: false,
  default: {}
})

function updateHovered(id) {
  hoveredSourceId.value = parseInt(id)
}

function scrollSourceIntoView(id) {
  dashboardlistinstance.value.scrollSourceIntoView(id)
}

function addSource() {
  showEditor.value = {
    display: true,
    default: {}
  }
}


function showIdOnMap(id) {
  mapinstance.value.zoomToId(id)
}

const props = defineProps({
  searchQuery: { type: String, required: false, default: () => "" },
})


onMounted(() => {
  sourceStore.getSourcesFromApi()
})

const filteredSources = computed(() => {
  if (props.searchQuery == '') {
    return sources.value
  }
  if (sources.value && sources.value.length > 0) {
    let allDataPoints = []
    sources.value.forEach(source => {
      const currentQuery = props.searchQuery.toLowerCase()
      if (
        currentQuery == ''
        || source["text"].toLowerCase().includes(currentQuery)
        || source["tags"].includes(currentQuery)
        || source["headline"].toLowerCase().includes(currentQuery)
        || source["source"].toLowerCase().includes(currentQuery)
        ) {
        allDataPoints.push(source)
      }
    });
    return allDataPoints
  }
  return []
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