<template>
  <div class="page-wrapper">
    <TranslationTextArea
      :text="inputString"
      :language="sourceLanguage"
      @language-update="setSourceLanguage"
      @text-update="setInputText"
      @submit="onSubmit"
    />
    <hr class="m-4">
    <TranslationTextArea
      :text="resultString"
      :language="targetLanguage"
      disabled
      @language-update="setTargetLanguage"
      @submit="onSubmit"
    />
  </div>
</template>

<script setup>
import AutoSaApi from "../api/api";
import { ref } from 'vue'

import TranslationTextArea from '@/components/TranslationTextArea.vue'

const inputString = ref('')
const resultString = ref('')
const sourceLanguage = ref('en')
const targetLanguage = ref('uk')


// Event handelers
function setSourceLanguage(language){
  sourceLanguage.value = language
}
function setTargetLanguage(language){
  targetLanguage.value = language
}
function setInputText(language){
  inputString.value = language
}
function setResultText(response){
  resultString.value = response.data.translation
}

// On submit -> translate
function onSubmit(stringToTranslate){
  if (stringToTranslate.value !== '') {
    AutoSaApi.getTranslation(sourceLanguage.value, targetLanguage.value, stringToTranslate).then(setResultText)
  } 
}
</script>