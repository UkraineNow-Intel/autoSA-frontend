<template>
  <div
    ref="item"
    class="dashboard-item border-2 rounded"
    :class="{ 'border-yellow-600': hoveredSourceId == source.id, 'fixed-height': fixedHeight }"
    @mouseover="updateHovered(source.id)"
    @mouseleave="updateHovered(-1)"
  >
    <div class="flex flex-1 flex-col" style="height: 100%; text-align: left;">
      <div v-if="source.media_url" class="dashboard-image flex-none">
        <el-image :src="source.media_url" fit="cover" />
      </div>
      <div class="dashboard-meta flex-none">
        <div v-if="source.origin">
          <span>Posted:</span>
          <span>{{ source.origin }}</span>
          <span v-if="source.interface" style="padding-left: 3px;">({{ source.interface }})</span>
        </div>
        <div v-if="source.timestamp">
          <span>Time:</span>
          <span>{{ moment(source.timestamp).format("ddd MMM DD, YYYY [at] HH:mm a") }}</span>
        </div>
        <div v-if="source.id">
          <span>ID:</span>
          <span>{{ source.id }}</span>
        </div>
        <!--<div v-if="source.external_id">
          <span>External ID:</span>
          <span>{{ source.external_id }}</span>
        </div>
        <div v-if="source.timestamp_created">
          <span>Time:</span>
          <span>{{ moment(source.timestamp_created).format("ddd MMM DD, YYYY [at] HH:mm a") }}</span>
        </div>
        <div v-if="source.timestamp_updated">
          <span>Time:</span>
          <span>{{ moment(source.timestamp_updated).format("ddd MMM DD, YYYY [at] HH:mm a") }}</span>
        </div>
        -->
        <div v-if="source.url">
          <a :href="source.url" target="_blank">Link</a>
        </div>
      </div>
      <div v-if="source.headline" class="dashboard-headline flex-none">
        <b>{{ source.headline }}</b>
      </div>
      <div class="dashboard-text flex-none lg:flex-1 lg:grow">{{ source.text }}</div>
      <div class="dashboard-tags flex-none">
        <source-tags :source-id="source.id" :tags="source.tags" @tag-clicked="(tag) => emit('tagClicked', tag)" />
      </div>
      <div class="dashboard-actions flex-none">
        <el-button
          v-if="'locations' in source && source.locations.length > 0"
          @click="emit('showOnMap', source.id)"
        >Show on Map</el-button>
        <el-button
          v-if="authStore.hasPermission('change_source')"
          :loading="pinningLoading"
          @click="togglePin"
        >{{ source.pinned ? 'Unpin' : 'Pin' }}</el-button>
        <el-button
          v-if="authStore.hasPermission('change_source')"
          :loading="changeLoading"
          @click="showChangeDialog = !showChangeDialog"
        >Edit</el-button>
        <el-button
          v-if="authStore.hasPermission('change_source')"
          :loading="archiveLoading"
          disabled
          @click="confirmArchive"
        >{{ source.deleted ? 'Restore' : 'Archive' }}</el-button>
        <el-button
          v-if="authStore.hasPermission('delete_source')"
          :loading="deleteLoading"
          @click="confirmDelete"
        >Delete</el-button>
      </div>
    </div>
    <el-dialog v-model="showChangeDialog" title="Edit Item">
      <source-editor :default-data="source" :loading="editorLoading" button-text="Edit Source" @cancel="showChangeDialog = false" @submit="changeSource"></source-editor>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, defineExpose } from 'vue'
import { ElButton, ElImage } from 'element-plus'
import moment from 'moment'
import { useSource } from '@/stores/sources'
import { useAuth } from '@/stores/auth'
import SourceTags from './SourceTags.vue';
import { ElMessage, ElMessageBox } from 'element-plus'
import SourceEditor from './SourceEditor.vue'

const emit = defineEmits(['hovered', 'showOnMap', 'tagClicked'])

const item = ref(null)
const pinningLoading = ref(false)
const changeLoading = ref(false)
const archiveLoading = ref(false)
const deleteLoading = ref(false)
const showChangeDialog = ref(false)
const editorLoading = ref(false)
const sourceStore = useSource()
const authStore = useAuth()

function updateHovered(id) {
  emit('hovered', id)
}

const props = defineProps({
  source: { type: Object, required: true },
  hoveredSourceId: { type: Number, required: false, default: () => -1 },
  fixedHeight: { type: Boolean, required: false, default: () => true },
})

async function togglePin() {
  pinningLoading.value = true
  await sourceStore.changeSource(props.source["id"], { 'pinned': !props.source["pinned"] })
  pinningLoading.value = false
}

async function changeSource(sourceData) {
  editorLoading.value = true
  await sourceStore.changeSource(sourceData.id, sourceData).then(() => {
    showChangeDialog.value = false
  })
  editorLoading.value = false
}


async function confirmArchive() {
  ElMessageBox.confirm(
    'Do you really want to archive source ' + props.source["id"] + ' ?',
    'Archive Source',
    {
      confirmButtonText: 'Archive Source',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  )
    .then(archiveItem)
}

async function archiveItem() {
  archiveLoading.value = true
  await sourceStore.changeSource(props.source["id"], {"deleted": true})
  archiveLoading.value = false
  ElMessage({
    type: 'success',
    message: 'Source ' + props.source["id"] + ' archived',
  })
}

async function confirmDelete() {
  ElMessageBox.confirm(
    'Do you really want to delete source ' + props.source["id"] + ' ?',
    'Delete Source',
    {
      confirmButtonText: 'Delte Source',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  )
    .then(deleteItem)
}

async function deleteItem() {
  deleteLoading.value = true
  await sourceStore.deleteSource(props.source["id"], true)
  deleteLoading.value = false
  ElMessage({
    type: 'success',
    message: 'Source ' + props.source["id"] + ' deleted',
  })
}

function scrollToElement() {
  item.value.scrollIntoView({ 'behavior': 'smooth' })
}

defineExpose({ scrollToElement })


</script>

<style scoped>
.dashboard-item {
  @apply bg-slate-200 p-5 m-3;
  width: 100%;
  max-height: 90vh;
  min-width: 250px;
}

.dashboard-item.fixed-height {
  @apply lg:h-[28rem];
}

.dashboard-image .el-image {
  height: 100px;
  width: 100%;
}

.dashboard-meta {
  padding: 10px 0;
  font-size: small;
  color: #333333;
}

.dashboard-meta span:first-child {
  margin-right: 6px;
}
.dashboard-text {
  height: 100%;
  overflow: auto;
}

.dashboard-headline,
.dashboard-tags,
.dashboard-actions {
  padding: 5px 0;
  
}
</style>