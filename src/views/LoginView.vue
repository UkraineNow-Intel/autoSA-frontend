<template>
  <div>
    <section
      class="bg-cover bg-center bg-slate-700 min-h-[50vh] py-10 px-5 flex items-center"
      style="background-image: url('./image.jfif')"
    >
      <div class="container mx-auto max-w-5xl text-center bg-white">
        <el-card>
          <h2>Login</h2>
          <el-form ref="form" class="login-form" :model="model" @submit.prevent="login">
            <el-form-item prop="username">
              <el-input v-model="model.username" placeholder="Username"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="model.password" placeholder="Password" type="password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                :loading="loading"
                type="primary"
                native-type="submit"
                block
              >Login</el-button>
            </el-form-item>
          </el-form>
          {{ error }}
        </el-card>
      </div>
    </section>
  </div>
</template>



<script setup>
import AutoSaApi from "@/api/api";
import { ref, onMounted } from 'vue'
import router from "@/plugins/router";
import { useAuth } from '@/stores/auth'
const authStore = useAuth()

const model = ref({
  username: '',
  password: ''
})

const loading = ref(false)
const error = ref('')

async function login() {
  loading.value = true;
  error.value = ''
  let response = await authStore.login(model.value.username, model.value.password)
  if (response.success) {
    router.push({ name: 'home' })
  } else {
    error.value = response.detail
    loading.value = false;
  }
}

onMounted(() => {
  AutoSaApi.get_csrf()
})

</script>