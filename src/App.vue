<template>
<Navbar />
<div id="content-wrapper">
    <router-view></router-view>
</div>
<Footer />
</template>

<script setup>

import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

</script>

<style>
#content-wrapper {
  width: 100%;
  margin: auto;
  min-height: 80vh;
}
</style>
