<template>
  <div>
    <el-row :gutter="10">
      <el-col :xs="24" :sm="6" :md="4" :lg="4" :xl="4">
        <div class="affix-container-settings">
          <el-affix target=".affix-container-settings" :offset="10" style="text-align: left; width: 100%">
            <dashboard-settings v-model="dashboardOptions" @add-source="showSourceEditor"></dashboard-settings>
          </el-affix>
        </div>
      </el-col>
      <el-col :xs="24" :sm="18" :md="10" :lg="12" :xl="12">
        <source-list
          ref="sourcelistinstance" :hovered-source-id="hoveredSourceId" :sources="filteredSources"
          @hovered="updateHovered" @show-on-map="showIdOnMap" @tag-clicked="tagClicked"
        ></source-list>
      </el-col>
      <el-col :xs="24" :sm="24" :md="10" :lg="8" :xl="8">
        <div class="affix-container-map">
          <el-affix target=".affix-container-map" style="width: 100%;" :offset="10">
            <el-tabs v-model="currentTab" type="border-card" style="margin: 1em;" @tab-click="invalidateMap">
              <el-tab-pane label="Pinned" name="pinned">
                <div v-if="currentTab == 'pinned'" class="sticky-source-list">
                  <source-list
                    :hovered-source-id="hoveredSourceId" :sources="sourceStore.getPinnedSources()"
                    single-column @hovered="updateHovered" @show-on-map="showIdOnMap"
                  ></source-list>
                </div>
              </el-tab-pane>
              <el-tab-pane label="Tags" name="tags">
                <div v-if="currentTab == 'tags'" class="sticky-source-list-filter">
                  <source-list-quick-filter v-model="sidenavOptions"></source-list-quick-filter>
                </div>
                <div class="sticky-source-list with-borders">
                  <source-list
                    :hovered-source-id="hoveredSourceId"
                    :sources="sourceStore.getSourcesWithTags(sidenavOptions.tags)" single-column
                    @hovered="updateHovered" @show-on-map="showIdOnMap"
                  ></source-list>
                </div>
              </el-tab-pane>
              <el-tab-pane label="Map" name="map">
                <div>
                  <auto-sa-map
                    ref="mapinstance" style="width: 100%; max-width: 1000px; height: 60vh;"
                    :sources="filteredSources" :hovered-source-id="hoveredSourceId" @hovered="updateHovered"
                    @marker-clicked="scrollSourceIntoView"
                  ></auto-sa-map>
                </div>
              </el-tab-pane>
            </el-tabs>
          </el-affix>
        </div>
      </el-col>
    </el-row>
    <el-dialog v-model="sourceEditorOptions.display" title="Create Source">
      <source-editor
        :loading="sourceEditorOptions.loading" @submit="createSource"
        @cancel="sourceEditorOptions.display = false"
      ></source-editor>
    </el-dialog>
  </div>
</template>



<script setup>
import { ref, onMounted, computed, defineProps } from 'vue'
import { useSource } from '@/stores/sources'
import AutoSaMap from '@/components/AutoSaMap.vue'
import SourceList from '@/components/SourceList/SourceList.vue';
import SourceEditor from '@/components/SourceList/Item/SourceEditor.vue'
import SourceListQuickFilter from '@/components/SourceList/SourceListQuickFilter.vue'
import DashboardSettings from './Settings/DashboardSettings.vue';

const hoveredSourceId = ref(1)
const mapinstance = ref(null)
const currentTab = ref('pinned')
const sourcelistinstance = ref(null)
const sourceEditorOptions = ref({
  display: false,
  loading: false
})
const sidenavOptions = ref({
  pinned: 'na',
  tags: []
})

const dashboardOptions = ref({
  filters: {
    time: null
  },
  sorting: {
    by: "time",
    reverse: false
  }
})


const sourceStore = useSource()

function updateHovered(id) {
  hoveredSourceId.value = parseInt(id)
}

function scrollSourceIntoView(id) {
  sourcelistinstance.value.scrollSourceIntoView(id)
}

function showSourceEditor() {
  sourceEditorOptions.value = {
    display: true,
    loading: false
  }
}

function tagClicked(tag) {
  currentTab.value = "tags"
  sidenavOptions.value.tags = [tag]
}

async function createSource(sourceData) {
  sourceEditorOptions.value.loading = true
  await sourceStore.createSource(sourceData).then(() => {
    sourceEditorOptions.value.display = false
  })
  sourceEditorOptions.value.loading = false
}

function showIdOnMap(id) {
  currentTab.value = "map"
  invalidateMap({ paneName: "map" })
  window.setTimeout(() => {
    invalidateMap({ paneName: "map" })
    mapinstance.value.zoomToId(id)
    window.setTimeout(() => {
      mapinstance.value.zoomToId(id)
    }, 200)
  }, 100)
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
  const sources = sourceStore.getSources(dashboardOptions.value)
  if (sources && sources.length > 0) {
    let allDataPoints = []
    sources.forEach(source => {
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