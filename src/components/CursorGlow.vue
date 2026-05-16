<template>
  <div
    v-if="isDark && active"
    class="cursor-glow pointer-events-none fixed inset-0 z-30"
    :style="{
      background: `radial-gradient(200px circle at ${x}px ${y}px, rgba(255, 250, 230, 0.07), transparent 45%)`,
    }"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useDarkMode } from '../composables/useDarkMode'

const { isDark } = useDarkMode()

const x = ref(0)
const y = ref(0)
const active = ref(false)

const EASING = 0.25

let rafId = 0
let running = false
let nextX = 0
let nextY = 0

const tick = () => {
  const dx = nextX - x.value
  const dy = nextY - y.value

  x.value += dx * EASING
  y.value += dy * EASING

  if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) {
    x.value = nextX
    y.value = nextY
    running = false
    return
  }

  rafId = requestAnimationFrame(tick)
}

const startLoop = () => {
  if (!running) {
    running = true
    rafId = requestAnimationFrame(tick)
  }
}

const handleMouseMove = (e: MouseEvent) => {
  nextX = e.clientX
  nextY = e.clientY

  if (!active.value) {
    x.value = nextX
    y.value = nextY
    active.value = true
  }

  startLoop()
}

// 一旦偵測到 touch 就永久停用，避免混合裝置上被觸控誤觸發
const handleTouchStart = () => {
  active.value = false
  running = false
  cancelAnimationFrame(rafId)
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('touchstart', handleTouchStart)
}

onMounted(() => {
  // 觸控裝置（手機 / 平板）不掛 listener，避免 iOS 的「幽靈 mousemove」讓光暈卡住
  const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  if (!hasFinePointer) return

  window.addEventListener('mousemove', handleMouseMove, { passive: true })
  window.addEventListener('touchstart', handleTouchStart, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('touchstart', handleTouchStart)
  cancelAnimationFrame(rafId)
})
</script>

<style scoped>
.cursor-glow {
  transition: opacity 0.3s ease;
}
</style>
