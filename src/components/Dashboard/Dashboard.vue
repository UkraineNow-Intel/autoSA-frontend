<template>
  <el-row :gutter="10">
    <el-col :xs="6" :sm="6" :md="4" :lg="4" :xl="4">
      <div class="affix-container-settings">
        <el-affix
          target=".affix-container-settings"
          :offset="80"
          style="text-align: left; width: 100%"
        >
          <dashboard-settings @add-source="addSource"></dashboard-settings>
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
    <el-col :xs="24" :sm="24" :md="10" :lg="8" :xl="8" style="border-left: 1px solid lightgray;">
      <dashboard-list-quick-filter @update-filter="(options) => quickFilter = options"></dashboard-list-quick-filter>
      <dashboard-list
        ref="dashboardlistinstance"
        :hovered-source-id="hoveredSourceId"
        :sources="pinnedSources"
        @hovered="updateHovered"
        @show-on-map="showIdOnMap"
      ></dashboard-list>
      <!--<div class="affix-container-map">
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
      </div>-->
    </el-col>
  </el-row>
</template>



<script setup>
import { ref, onMounted, computed, defineProps } from 'vue'
// import AutoSaMap from '@/components/AutoSaMap.vue'
import DashboardList from '@/components/Dashboard/DashboardList.vue';
import { storeToRefs } from 'pinia'
import { useSource } from '@/stores/sources'
import DashboardItemEditor from './DashboardItemEditor.vue'
import DashboardListQuickFilter from './DashboardListQuickFilter.vue'
import moment from 'moment'
import DashboardSettings from './Settings/DashboardSettings.vue';

const hoveredSourceId = ref(1)
const mapinstance = ref(null)
const timeFilter = ref(null)
const dashboardlistinstance = ref(null)
const sourceStore = useSource()
const { sources } = storeToRefs(sourceStore)
const showEditor = ref({
  display: false,
  default: {}
})
const quickFilter = ref({
  pinned: 'include',
  tags: []
})

function updateHovered(id) {
  hoveredSourceId.value = parseInt(id)
}

/*
function scrollSourceIntoView(id) {
  dashboardlistinstance.value.scrollSourceIntoView(id)
}*/

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
  if (sources.value && sources.value.length > 0) {
    let allDataPoints = []
    sources.value.forEach(source => {
      const currentQuery = props.searchQuery.toLowerCase()
      if (
        (
          currentQuery == ''
          || source["text"].toLowerCase().includes(currentQuery)
          || source["tags"].includes(currentQuery)
          || source["headline"].toLowerCase().includes(currentQuery)
          || source["source"].toLowerCase().includes(currentQuery)
        ) && (
          !timeFilter.value
          || (
            moment(timeFilter.value[0]).isBefore(moment(source["timestamp"]))
            && moment(timeFilter.value[1]).isAfter(moment(source["timestamp"]))
          )
        )
      ) {
        allDataPoints.push(source)
      }
    });
    return allDataPoints
  }
  return []
})

const pinnedSources = computed(() => {
  if (sources.value && sources.value.length > 0) {
    let allDataPoints = []
    sources.value.forEach(source => {
      if (
        (quickFilter.value.pinned == 'include' && source["pinned"])
        || (quickFilter.value.tags.length > 0 && source["tags"].filter(value => quickFilter.value.tags.includes(value)).length > 0)
      ) {
        if (!(quickFilter.value.pinned == 'exclude' && source["pinned"])) {
          allDataPoints.push(source)
        }
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