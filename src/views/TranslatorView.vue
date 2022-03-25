
<script setup>
import AutoSaDataService from "../api/api";
import { ref } from 'vue'

const stringToTranslate = ref('')
const resultString = ref('')

function updateResult(response){
  console.log(response.data)
  resultString.value = response.data.translation
}

function onSubmit(){
  if (stringToTranslate.value !== '') {
    AutoSaDataService.getTranslation(stringToTranslate.value).then(updateResult)
  } 
}

</script>

<template>
  <div class="page-wrapper">
    <h2>Translator</h2>
    <input
      v-model="stringToTranslate"
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
      @keyup.enter="onSubmit"
      @input="event => text = event.target.value"
    >

    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      @click="onSubmit"
    >
      Submit
    </button>
    <div>Output: {{ resultString }}</div>
  </div>
</template>