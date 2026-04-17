<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import AppNavbar from './components/AppNavbar.vue'
import AppFooter from './components/AppFooter.vue'

const route = useRoute()
const transitionName = ref('slide-up')

const getDepth = (name: any) => {
  if (name === 'home') return 0
  if (name === 'portfolio') return 1
  if (name === 'project-detail') return 2
  return 0
}

watch(
  () => route.name,
  (toName, fromName) => {
    if (toName === 'project-detail') {
      // 點進作品介紹頁面（上下）
      transitionName.value = 'slide-up'
    } else if (fromName === 'project-detail') {
      // 從作品介紹頁面離開（上下）
      transitionName.value = 'slide-down'
    } else {
      // 左右切換
      transitionName.value = getDepth(toName) > getDepth(fromName) ? 'slide-left' : 'slide-right'
    }

    setTimeout(() => {
      AOS.refresh()
    }, 600)
  },
)

import AOS from 'aos'
import 'aos/dist/aos.css'

onMounted(() => {
  setTimeout(() => {
    AOS.init({
      anchorPlacement: 'top',
      once: true,
      disable: 'mobile',
    })
    AOS.refresh()
  }, 600)
})
</script>

<template>
  <header>
    <AppNavbar />
  </header>
  <main>
    <router-view v-slot="{ Component }">
      <transition :name="transitionName" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
  <AppFooter />
</template>

<style>
/* 左右滑動 */
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.35s ease-in-out;
}

.slide-left-enter-from {
  opacity: 100;
  transform: translateX(200%);
}
.slide-left-leave-to {
  opacity: 100;
  transform: translateX(-200%);
}

.slide-right-enter-from {
  opacity: 100;
  transform: translateX(-200%);
}
.slide-right-leave-to {
  opacity: 100;
  transform: translateX(200%);
}

/* 上下滑動 */
.slide-up-enter-active,
.slide-up-leave-active,
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.5s ease-in-out;
}

.slide-up-enter-from {
  opacity: 100;
  transform: translateY(100%);
}
.slide-up-leave-to {
  opacity: 100;
  transform: translateY(-100%);
}

.slide-down-enter-from {
  opacity: 100;
  transform: translateY(-100%);
}
.slide-down-leave-to {
  opacity: 100;
  transform: translateY(100%);
}
</style>
