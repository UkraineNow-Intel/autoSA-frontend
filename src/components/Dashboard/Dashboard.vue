<template>
  <el-row :gutter="10">
    <el-col :xs="24" :sm="6" :md="4" :lg="4" :xl="4">
      <div class="affix-container-settings">
        <el-affix
          target=".affix-container-settings"
          :offset="10"
          style="text-align: left; width: 100%"
        >
          <dashboard-settings @add-source="addSource"></dashboard-settings>
        </el-affix>
      </div>
    </el-col>
    <el-col :xs="24" :sm="18" :md="10" :lg="12" :xl="12">
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
        <el-affix target=".affix-container-map" style="width: 100%;" :offset="10">
          <el-tabs
            v-model="currentTab"
            type="border-card"
            style="margin: 1em;"
            @tab-click="invalidateMap"
          >
            <el-tab-pane label="Pinned" name="pinned">
              <div class="sticky-source-list">
                <dashboard-list
                  :hovered-source-id="hoveredSourceId"
                  :sources="sourceStore.getPinnedSources()"
                  single-column
                  @hovered="updateHovered"
                  @show-on-map="showIdOnMap"
                ></dashboard-list>
              </div>
            </el-tab-pane>
            <el-tab-pane label="Tags" name="tags">
              <div class="sticky-source-list-filter">
                <dashboard-list-quick-filter v-model="quickFilter"></dashboard-list-quick-filter>
              </div>
              <div class="sticky-source-list with-borders">
                <dashboard-list
                  :hovered-source-id="hoveredSourceId"
                  :sources="sourceStore.getSourcesWithTags(quickFilter.tags)"
                  single-column
                  @hovered="updateHovered"
                  @show-on-map="showIdOnMap"
                ></dashboard-list>
              </div>
            </el-tab-pane>
            <el-tab-pane label="Map" name="map">
              <auto-sa-map
                ref="mapinstance"
                style="width: 100%; max-width: 1000px; height: 60vh;"
                :sources="filteredSources"
                :hovered-source-id="hoveredSourceId"
                @hovered="updateHovered"
                @marker-clicked="scrollSourceIntoView"
              ></auto-sa-map>
            </el-tab-pane>
          </el-tabs>
        </el-affix>
      </div>
    </el-col>
  </el-row>
</template>



<script setup>
import { ref, onMounted, computed, defineProps } from 'vue'
import AutoSaMap from '@/components/AutoSaMap.vue'
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
  pinned: 'na',
  tags: []
})

const currentTab = ref('pinned')

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

function invalidateMap(tabname) {
  if (tabname.paneName == "map") {
    mapinstance.value.invalidateSize()
  }
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

</script>

<style scoped>
.affix-container-settings,
.affix-container-map {
  text-align: center;
  height: 100%;
  border-radius: 4px;
}
.sticky-source-list-filter {
  padding: 0.2rem 1rem;
  border: 1px solid lightgrey;
  border-radius: 5px 5px 0 0;
}
.sticky-source-list {
  max-height: 70vh;
  overflow-y: scroll;
  overflow-x: hidden;
}

.sticky-source-list.with-borders {
  border: 1px solid lightgrey;
  border-top: 0;
  border-radius: 0 0 5px 5px;
}
</style>