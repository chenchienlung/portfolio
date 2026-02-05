<script setup lang="ts">
import { useRoute } from 'vue-router'
import AppNavbar from './components/AppNavbar.vue'
import AppFooter from './components/AppFooter.vue'

const route = useRoute()
</script>

<template>
  <header>
    <AppNavbar />
  </header>
  <main>
    <router-view />
  </main>
  <AppFooter />
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100..900&family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap');

body {
  background-color: #f5f5f5;
  font-family: 'Arial', 'Noto Sans', 'Noto Sans TC', sans-serif;
}
</style>
