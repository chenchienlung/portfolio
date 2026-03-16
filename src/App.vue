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
