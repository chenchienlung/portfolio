<template>
  <div v-if="icons?.length" class="skill-marquee overflow-hidden py-4">
    <ul class="flex w-max items-center gap-10 animate-marquee">
      <li v-for="(icon, i) in duplicatedIcons" :key="i" class="shrink-0">
        <img
          :src="isDark && icon.dark ? icon.dark : icon.src"
          alt=""
          width="40"
          height="40"
          fetchpriority="high"
          class="w-10 h-10 object-contain"
          aria-hidden="true"
        />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { SkillIcon } from '../data/about'

const props = defineProps<{
  icons: SkillIcon[]
  isDark?: boolean
}>()

const duplicatedIcons = computed(() => [...props.icons, ...props.icons])
</script>

<style scoped>
.skill-marquee {
  mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
}

@keyframes marquee-ltr {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

.animate-marquee {
  animation: marquee-ltr 40s linear infinite;
  will-change: transform;
}

.skill-marquee:hover .animate-marquee {
  animation-play-state: paused;
}
@media (prefers-reduced-motion: reduce) {
  .animate-marquee {
    animation: none;
  }
}
</style>
