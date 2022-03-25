
<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="header">
    <div class="items">
      <h2>Auto Situational Awareness</h2>
      <h3>Set up with ♥ in a short time by UkraineNow</h3>
      <div class="navlinks">
        <RouterLink to="/">
          Research
        </RouterLink>
        <RouterLink to="/translator">
          Translator
        </RouterLink>
        <RouterLink to="/about">
          About
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header {
  width: 100%;
  background-color: lightgray;
  padding: 1em 0.5em;
}

.items {
  display: grid;
  grid-auto-flow: column;
  grid-gap: 10px;
  margin: 30px;
  overflow: auto;
}

.navlinks {
  text-align: right;
}
.navlinks a {
  font-size: 1.2em;
  margin: 1em;
}
</style>