<template>
  <main class="min-h-screen max-w-6xl mx-auto mb-4">
    <div class="mx-5 flex flex-col gap-50">
      <section
        class="h-[calc(100vh-168px)] flex flex-col justify-center"
        data-aos="fade-up"
        data-aos-duration="800"
      >
        <h2 class="text-5xl flex flex-col justify-center text-black">
          哈囉!<br />我是陳仟龍<br />目前正在尋找<br /><span class="text-sky-600 font-bold"
            >前端工程師<span class="text-2xl text-gray-600 mx-2">/</span>UI/UX設計師</span
          >的職缺
          <div class="mt-20 flex flex-row gap-2">
            <a
              href="mailto:[EMAIL_ADDRESS]"
              class="px-6 py-3 text-base text-white bg-sky-800 hover:bg-sky-700 rounded-full transition-all duration-200"
            >
              <font-awesome-icon icon="fa-solid fa-envelope" class="mr-1" />
              <span class="mx-1 text-sm after:content-['_↗']">聯絡我</span>
            </a>
            <a
              href="#about"
              class="px-6 py-3 text-base text-sky-800 border border-sky-700 hover:bg-sky-50 hover:text-sky-700 hover:border-sky-700 rounded-full transition-all duration-200"
            >
              <font-awesome-icon icon="fa-solid fa-user" class="mr-1" />
              <span class="mx-1 text-sm after:content-['_↓']">關於我</span>
            </a>
          </div>
        </h2>
      </section>
      <section
        class="min-h-[calc(100vh-168px)] md:h-[calc(100vh-168px)]"
        data-aos="fade-up"
        data-aos-duration="800"
      >
        <div class="text-2xl text-sky-600 flex flex-row justify-between mb-20">
          <h2 class="w-20 font-bold pb-2 border-b border-gray-400">作品</h2>
          <RouterLink
            to="/project"
            class="w-11 h-11 flex justify-center items-center rounded-full hover:bg-gray-200 transition-all duration-200"
            >→</RouterLink
          >
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
          <ProjectCard v-for="project in displayedProjects" :key="project.title" v-bind="project" />
        </div>
      </section>
      <section
        id="about"
        class="min-h-[calc(100vh-168px)] md:h-[calc(100vh-168px)] md:pb-50"
        data-aos="fade-up"
        data-aos-duration="800"
      >
        <div class="text-2xl text-sky-600 flex flex-row justify-between mb-20">
          <h2 class="w-20 font-bold pb-2 border-b border-gray-400">關於我</h2>
          <RouterLink
            to="/about"
            class="w-11 h-11 flex justify-center items-center rounded-full hover:bg-gray-200 transition-all duration-200"
            >→</RouterLink
          >
        </div>
        <div class="flex flex-col gap-20">
          <div data-aos="fade-up" data-aos-duration="800" data-aos-delay="200">
            <h3 class="w-50 text-gray-800 pb-2 mb-8 border-b border-gray-400">經歷</h3>
            <p class="text-black text-lg font-semibold font-mono mb-1 delay-600">
              2025.10.01~2026.01.29
              <span class="text-gray-600 font-normal ml-2">
                參加商研院產業新尖兵前端應用開發工程師實戰養成班
              </span>
            </p>
            <p class="text-gray-600 text-lg delay-600">
              4個月，510小時進一步學習前端技術，包括HTML、CSS、JavaScript 及前端框架
              Vue.js，也學習Git版本控制與團隊協作、後端技術Node.js與Express.js以及串接API等，
              並在2個月內與3位團隊成員共同完成
              <a
                href="https://wantrip.store"
                target="_blank"
                class="hover:text-sky-600 underline transition-all duration-200"
                alt="WanTrip:國內旅遊訂房網站"
              >
                國內旅遊訂房網站 </a
              >專題， 主要負責UI設計、切版、金流串接、票券資料庫串接與前端部署等。
            </p>
          </div>
          <div data-aos="fade-up" data-aos-duration="800" data-aos-delay="400">
            <h3 class="w-50 text-gray-800 pb-2 mb-8 border-b border-gray-400">技能</h3>
            <div class="flex flex-row flex-wrap gap-5">
              <img
                v-for="skillicon in skillicons"
                :src="skillicon"
                alt="skillicon"
                class="w-8 h-8"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import ProjectCard from '../components/ProjectCard.vue'
import { fetchProjects, type Project } from '../data/projects'

const projects = ref<(Project & { link: string })[]>([])
const loading = ref(true)
const error = ref('')

const skillicons = [
  'https://thesvg.org/icons/figma/default.svg',
  'https://thesvg.org/icons/illustrator/default.svg',
  'https://thesvg.org/icons/photoshop/default.svg',
  'https://thesvg.org/icons/github/mono.svg',
  'https://thesvg.org/icons/git/default.svg',
  'https://res.cloudinary.com/dtzgfwzwf/image/upload/v1776085140/html-5_ca2gul.png',
  'https://res.cloudinary.com/dtzgfwzwf/image/upload/v1776085139/css-3_knrvpc.png',
  'https://res.cloudinary.com/dtzgfwzwf/image/upload/v1776085141/js_ujk0ox.png',
  'https://thesvg.org/icons/tailwind-css/default.svg',
  'https://thesvg.org/icons/bootstrap/default.svg',
  'https://thesvg.org/icons/vue/default.svg',
  'https://thesvg.org/icons/vite/default.svg',
  'https://thesvg.org/icons/supabase/default.svg',
  'https://thesvg.org/icons/nodedotjs/default.svg',
]

onMounted(async () => {
  try {
    const data = await fetchProjects()
    projects.value = data.map((project) => ({ ...project, link: `/project/${project.id}` }))
  } catch (err) {
    error.value = err instanceof Error ? err.message : '載入失敗'
  } finally {
    loading.value = false
  }
})

const displayedProjects = computed(() => projects.value.slice(0, 3))
</script>
