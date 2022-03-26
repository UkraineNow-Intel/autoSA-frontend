<script setup>
import { ref, defineProps, defineEmits, onMounted, watch } from 'vue'

import { ElButton, ElInput, ElRadioGroup, ElRadio } from 'element-plus'

const emit = defineEmits(['submit', 'textUpdate', 'languageUpdate'])
const isDisabled = ref(false)
const currentLanguage = ref('')
const currentText = ref('')

const props = defineProps({
    language: {
            type: String,
            required: true
        },
    text: {
            type: String,
            required: true
        },
    disabled: {
            type: String,
            default: undefined,
            required: false
        }
})

// update internal state of currentLanguage and currentText when props change
watch(props, (props) => {
  currentLanguage.value = props.language
  currentText.value = props.text
})

// whenever the text get's updated -> forward to parent
function updateTextValue (newVal) {
    emit('textUpdate', newVal)
}

// whenever the language get's updated -> forward to parent
function updateLanguageValue (newVal) {
    emit('languageUpdate', newVal.target.value)
}

function onSubmit(){
  emit('submit', currentText.value)
}

onMounted(() => {
    // set all variables according to props
    isDisabled.value = props.disabled !== undefined
    currentLanguage.value = props.language
    currentText.value = props.text
})

</script>

<template>
  <div>
    <el-radio-group
      v-model="currentLanguage"
      @input="updateLanguageValue"
    >
      <el-radio label="en">
        English
      </el-radio>
      <el-radio label="uk">
        Ukrainian
      </el-radio>
      <el-radio label="ru">
        Russian
      </el-radio>
    </el-radio-group>
    <el-input
      v-model="currentText"
      class="textinput"
      :autosize="{ minRows: 2, maxRows: 4 }"
      type="textarea"
      :disabled="isDisabled"
      :placeholder="!isDisabled ? 'Please input text you want to translate' : 'Your translation will appear here...'"
      @input="updateTextValue"
      @keyup.enter="onSubmit"
    />
    <el-button
      v-if="!isDisabled"
      @click="onSubmit"
    >
      Submit
    </el-button>    
  </div>
</template>

<style scoped>
.textinput {
  margin: 1em 0;
}
</style>