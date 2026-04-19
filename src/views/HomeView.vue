<template>
  <main class="min-h-screen max-w-6xl mx-auto mb-4">
    <div class="mx-5 flex flex-col gap-32">
      <section
        class="h-screen flex flex-col justify-center"
        data-aos="fade-up"
        data-aos-duration="800"
      >
        <h2 class="text-5xl text-black dark:text-white leading-tight pb-20 md:pb-0">
          哈囉!<br />我是陳仟龍<br />目前正在尋找<br />
          <span class="text-sky-600 md:text-nowrap font-bold">
            前端工程師<span class="text-gray-400 dark:text-gray-500 text-2xl"> & </span>UI/UX設計師
          </span>
          的職缺
          <div class="mt-6 md:mt-12 flex flex-row gap-2">
            <a
              href="mailto:[EMAIL_ADDRESS]"
              class="px-6 py-3 text-base text-white bg-sky-800 hover:bg-sky-700 rounded-full transition-all duration-200"
            >
              <font-awesome-icon icon="fa-solid fa-envelope" class="mr-1" />
              <span class="mx-1 text-sm">聯絡我↗</span>
            </a>
            <a
              href="https://github.com/chenchienlung"
              target="_blank"
              rel="noopener noreferrer"
              class="px-6 py-3 text-base text-white bg-sky-800 hover:bg-sky-700 rounded-full transition-all duration-200"
            >
              <font-awesome-icon icon="fa-brands fa-github" class="mr-1" />
              <span class="mx-1 text-sm">GitHub↗</span>
            </a>
            <a
              href="#about"
              class="px-6 py-3 text-base text-sky-800 dark:text-sky-400 border border-sky-700 dark:border-sky-500 hover:bg-sky-50 dark:hover:bg-sky-900/30 hover:text-sky-700 dark:hover:text-sky-300 hover:border-sky-700 rounded-full transition-all duration-200"
            >
              <font-awesome-icon icon="fa-solid fa-user" class="mr-1" />
              <span class="mx-1 text-sm">關於我↓</span>
            </a>
          </div>
        </h2>
      </section>
      <section
        class="relative min-h-[calc(100vh-168px)]"
        data-aos="fade-up"
        data-aos-duration="800"
      >
        <div class="text-2xl text-sky-600 flex flex-row justify-between">
          <h2 class="w-20 font-bold pb-2 border-b border-gray-400 dark:border-gray-600">作品</h2>
          <RouterLink
            to="/portfolio"
            class="w-11 h-11 flex justify-center items-center rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 inset-shadow-white inset-shadow-sm/20 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
            >→</RouterLink
          >
        </div>
        <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
          <div
            v-for="n in 3"
            :key="n"
            class="animate-pulse rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-gray-800 overflow-hidden"
          >
            <div class="aspect-3/2 bg-gray-200 dark:bg-gray-700" />
            <div class="p-4 space-y-3">
              <div class="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/5" />
              <div class="flex gap-2">
                <span class="h-5 w-14 bg-gray-200 dark:bg-gray-700 rounded-full" />
                <span class="h-5 w-14 bg-gray-200 dark:bg-gray-700 rounded-full" />
              </div>
              <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
              <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-4/5" />
            </div>
          </div>
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
          <ProjectCard v-for="project in displayedProjects" :key="project.title" v-bind="project" />
        </div>
        <p
          class="hidden md:block w-full text-gray-200 dark:text-gray-800 text-[180px] text-center font-black absolute bottom-20"
        >
          PORTFOLIO
        </p>
      </section>
      <section
        id="about"
        class="min-h-[calc(100vh-168px)]"
        data-aos="fade-up"
        data-aos-duration="800"
      >
        <div class="flex flex-col gap-20 mb-20">
          <div class="flex flex-col gap-4">
            <h2
              class="text-sky-600 text-2xl w-20 font-bold pb-2 border-b border-gray-400 dark:border-gray-600"
            >
              關於我
            </h2>
            <p class="text-black dark:text-white text-lg font-semibold font-mono mt-6">
              陳仟龍 Chris
            </p>
            <p class="text-gray-600 dark:text-gray-300 font-mono">
              <font-awesome-icon icon="fa-solid fa-location-dot" class="mb-px" />
              新北．林口
            </p>
            <div
              class="text-gray-600 dark:text-gray-300 font-mono flex flex-col md:flex-row items-start gap-1 md:gap-6"
              data-aos-duration="800"
              data-aos-delay="100"
            >
              <a
                href="mailto:[EMAIL_ADDRESS]"
                class="hover:text-sky-600 dark:hover:text-sky-400 hover:underline transition-all duration-200"
              >
                <font-awesome-icon icon="fa-solid fa-envelope" class="mb-px" />
                chris27805850@gmail.com
              </a>
              <a
                href="https://github.com/chenchienlung"
                target="_blank"
                class="hover:text-sky-600 dark:hover:text-sky-400 hover:underline transition-all duration-200"
              >
                <font-awesome-icon icon="fa-brands fa-github" class="mb-px" />
                chenchienlung
              </a>
            </div>
          </div>

          <div class="flex flex-col gap-20 text-base">
            <div data-aos="fade-up" data-aos-duration="800" data-aos-delay="200">
              <h3
                class="w-50 text-gray-800 dark:text-gray-200 pb-2 mb-8 border-b border-gray-400 dark:border-gray-600"
              >
                經歷
              </h3>
              <div class="flex flex-col gap-4">
                <h4 class="text-black dark:text-white font-semibold">
                  2025.10.01~2026.01.29
                  <span class="text-nowrap md:ml-6"> 商研院｜前端應用開發工程師實戰養成班 </span>
                </h4>
                <p class="text-gray-600 dark:text-gray-300">
                  4個月，510小時密集訓練，涵蓋 Vue.js、Node.js、Express.js、Git 團隊協作與 API
                  串接。並在最後 2個月內與3位成員共同完成
                  <a
                    href="https://wantrip.store"
                    target="_blank"
                    class="hover:text-sky-600 dark:hover:text-sky-400 text-nowrap underline transition-all duration-200"
                    alt="WanTrip:國內旅遊訂房網站"
                  >
                    WanTrip : 國內旅遊訂房網站 ↗ </a
                  >， 本人負責 UI 設計、切版、金流串接、票券資料庫串接與前端部署。
                </p>
              </div>
              <div class="flex flex-col mt-10 gap-4">
                <h4 class="text-black dark:text-white text-nowrap font-semibold">其他資源</h4>
                <div class="flex flex-col gap-2">
                  <ResourceItem
                    v-for="(item, i) in resources"
                    :key="i"
                    v-bind="item"
                    :is-dark="isDark"
                    data-aos="fade-right"
                    data-aos-duration="800"
                    :data-aos-delay="(i + 1) * 50"
                  />
                </div>
              </div>
            </div>
            <div data-aos="fade-up" data-aos-duration="800" data-aos-delay="300">
              <h3
                class="w-50 text-gray-800 dark:text-gray-200 pb-2 mb-8 border-b border-gray-400 dark:border-gray-600"
              >
                學歷
              </h3>
              <div class="flex flex-col gap-4">
                <p class="text-black dark:text-white font-semibold">2022</p>
                <p class="text-gray-600 dark:text-gray-300 text-nowrap font-normal">
                  大同大學媒體設計學系數位遊戲設計組 畢業
                </p>
              </div>
            </div>
            <div data-aos="fade-up" data-aos-duration="800" data-aos-delay="400">
              <h3
                class="w-50 text-gray-800 dark:text-gray-200 pb-2 mb-8 border-b border-gray-400 dark:border-gray-600"
              >
                技能
              </h3>
              <div class="flex flex-row flex-wrap gap-5">
                <img
                  v-for="skillicon in skillicons"
                  :key="skillicon.src"
                  :src="isDark && skillicon.dark ? skillicon.dark : skillicon.src"
                  alt="skillicon"
                  class="w-8 h-8"
                  data-aos="fade-up"
                  data-aos-duration="800"
                  :data-aos-delay="(skillicons.indexOf(skillicon) + 1) * 50"
                />
              </div>
              <div class="flex flex-wrap gap-2 mt-8">
                <span
                  v-for="skilltext in skilltexts"
                  :key="skilltext"
                  class="text-gray-600 dark:text-gray-300 text-sm text-nowrap px-3 py-1.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full"
                >
                  {{ skilltext }}
                </span>
              </div>
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
import ResourceItem from '../components/ResourceItem.vue'
import { fetchProjects, type Project } from '../data/projects'
import { useDarkMode } from '../composables/useDarkMode'

const { isDark } = useDarkMode()

const projects = ref<(Project & { link: string })[]>([])
const loading = ref(true)
const error = ref('')

const skillicons: { src: string; dark?: string }[] = [
  { src: 'https://thesvg.org/icons/figma/default.svg' },
  { src: 'https://thesvg.org/icons/illustrator/default.svg' },
  { src: 'https://thesvg.org/icons/photoshop/default.svg' },
  {
    src: 'https://thesvg.org/icons/github/mono.svg',
    dark: 'https://thesvg.org/icons/github/default.svg',
  },
  { src: 'https://thesvg.org/icons/git/default.svg' },
  { src: 'https://thesvg.org/icons/html5/default.svg' },
  { src: 'https://thesvg.org/icons/css/default.svg' },
  { src: 'https://thesvg.org/icons/javascript/default.svg' },
  { src: 'https://thesvg.org/icons/tailwind-css/default.svg' },
  { src: 'https://thesvg.org/icons/bootstrap/default.svg' },
  { src: 'https://thesvg.org/icons/vue/default.svg' },
  { src: 'https://thesvg.org/icons/vite/default.svg' },
  { src: 'https://thesvg.org/icons/supabase/default.svg' },
  { src: 'https://thesvg.org/icons/nodedotjs/default.svg' },
]

const resources = [
  {
    iconType: 'fa' as const,
    icon: 'fa-solid fa-headphones',
    text: 'hahow好學校線上課程：產品設計實戰：用Figma打造絕佳UI/UX',
  },
  {
    iconType: 'fa' as const,
    icon: 'fa-solid fa-headphones',
    text: '六角學院線上課程學HTML、CSS、Bootstrap等前端基礎',
  },
  {
    iconType: 'fa' as const,
    icon: 'fa-solid fa-book',
    text: '網頁版面學-429個網頁設計要領，創造友善易用的版面',
  },
  {
    iconType: 'img' as const,
    icon: 'https://thesvg.org/icons/mdn-web-docs/default.svg',
    iconDark:
      'https://res.cloudinary.com/dtzgfwzwf/image/upload/v1776570197/mdn-web-docs_1_tiyobo.svg',
    text: 'MDN Web Docs',
  },
]

const skilltexts = [
  'Design → Code 一手包辦',
  'Git 團隊協作',
  'AI 輔助開發',
  'RWD 響應式設計',
  'API串接',
]

onMounted(async () => {
  try {
    loading.value = true
    const data: Project[] = await fetchProjects()

    projects.value = data.map((project) => ({
      ...project,
      link: `/portfolio/${project.slug}`,
    }))
  } catch (err) {
    console.error('Fetch error:', err)
    error.value = err instanceof Error ? err.message : '載入失敗'
  } finally {
    loading.value = false
  }
})

const displayedProjects = computed(() => projects.value.slice(0, 3))
</script>
