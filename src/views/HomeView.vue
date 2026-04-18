<template>
  <main class="min-h-screen max-w-6xl mx-auto mb-4">
    <div class="mx-5 flex flex-col gap-32">
      <section
        class="h-screen flex flex-col justify-center"
        data-aos="fade-up"
        data-aos-duration="800"
      >
        <h2 class="text-5xl text-black leading-tight">
          哈囉!<br />我是陳仟龍<br />目前正在尋找<br />
          <span class="text-sky-600 md:text-nowrap font-bold">
            前端工程師<span class="text-gray-400 text-2xl"> & </span>UI/UX設計師
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
              href="#about"
              class="px-6 py-3 text-base text-sky-800 border border-sky-700 hover:bg-sky-50 hover:text-sky-700 hover:border-sky-700 rounded-full transition-all duration-200"
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
        <p
          class="hidden md:block w-full text-gray-200 text-[180px] text-center font-black absolute bottom-20"
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
            <h2 class="text-sky-600 text-2xl w-20 font-bold pb-2 border-b border-gray-400">
              關於我
            </h2>
            <p class="text-black text-lg font-semibold font-mono">陳仟龍 Chris</p>
            <div
              class="text-gray-600 font-mono flex flex-col md:flex-row items-start gap-1 md:gap-6 delay-600 mt-2 md:mt-0"
              data-aos-duration="800"
              data-aos-delay="100"
            >
              <a
                href="mailto:[EMAIL_ADDRESS]"
                class="hover:text-sky-600 hover:underline transition-all duration-200"
              >
                <font-awesome-icon icon="fa-solid fa-envelope" class="mb-px" />
                chris27805850@gmail.com
              </a>
              <a
                href="https://github.com/chenchienlung"
                target="_blank"
                class="hover:text-sky-600 hover:underline transition-all duration-200"
              >
                <font-awesome-icon icon="fa-brands fa-github" class="mb-px" />
                chenchienlung
              </a>
            </div>
          </div>

          <div class="flex flex-col gap-20 text-base">
            <div data-aos="fade-up" data-aos-duration="800" data-aos-delay="200">
              <h3 class="w-50 text-gray-800 pb-2 mb-8 border-b border-gray-400">經歷</h3>
              <p class="text-black font-semibold font-mono mb-4 md:mb-2 delay-600">
                2025.10.01~2026.01.29
                <span class="text-gray-600 text-nowrap font-normal md:ml-6">
                  商研院｜前端應用開發工程師實戰養成班
                </span>
              </p>
              <p class="text-gray-600 delay-600">
                4個月，510小時密集訓練，涵蓋 Vue.js、Node.js、Express.js、Git 團隊協作與 API
                串接。並在最後 2個月內與3位成員共同完成
                <a
                  href="https://wantrip.store"
                  target="_blank"
                  class="hover:text-sky-600 text-nowrap underline transition-all duration-200"
                  alt="WanTrip:國內旅遊訂房網站"
                >
                  WanTrip : 國內旅遊訂房網站 ↗ </a
                >， 本人負責 UI 設計、切版、金流串接、票券資料庫串接與前端部署。
              </p>
              <div class="flex flex-col md:flex-row delay-600 mt-10">
                <p class="text-black text-nowrap font-semibold font-mono mb-4 md:mb-2 row-span-2">
                  其他資源
                </p>
                <div class="flex flex-col gap-2 md:ml-6">
                  <p class="text-gray-600">
                    hahow好學校線上課程：
                    <a
                      href="https://hahow.in/courses/5ee4d65789dc7e4854909ba1?utm_source=share&utm_medium=link"
                      target="_blank"
                      class="hover:text-sky-600 text-nowrap hover:underline transition-all duration-200"
                    >
                      產品設計實戰：用Figma打造絕佳UI/UX ↗
                    </a>
                  </p>
                  <p class="text-gray-600">六角學院線上課程學HTML、CSS、Bootstrap等前端基礎</p>
                  <div class="text-gray-600 flex flex-row gap-2">
                    <img
                      src="https://thesvg.org/icons/mdn-web-docs/default.svg"
                      alt=""
                      width="16px"
                    />
                    <a
                      href="https://developer.mozilla.org/zh-TW/"
                      target="_blank"
                      class="hover:text-sky-600 hover:underline transition-all duration-200"
                      >MDN Web Docs ↗
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div data-aos="fade-up" data-aos-duration="800" data-aos-delay="300">
              <h3 class="w-50 text-gray-800 pb-2 mb-8 border-b border-gray-400">技能</h3>
              <div class="flex flex-row flex-wrap gap-5">
                <img
                  v-for="skillicon in skillicons"
                  :src="skillicon"
                  alt="skillicon"
                  class="w-8 h-8"
                />
              </div>
              <div class="flex flex-wrap gap-2 mt-8">
                <span
                  v-for="skilltext in skilltexts"
                  class="text-gray-600 text-sm text-nowrap px-3 py-1.5 bg-gray-50 border border-gray-300 rounded-full"
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
  'https://thesvg.org/icons/html5/default.svg',
  'https://thesvg.org/icons/css/default.svg',
  'https://thesvg.org/icons/javascript/default.svg',
  'https://thesvg.org/icons/tailwind-css/default.svg',
  'https://thesvg.org/icons/bootstrap/default.svg',
  'https://thesvg.org/icons/vue/default.svg',
  'https://thesvg.org/icons/vite/default.svg',
  'https://thesvg.org/icons/supabase/default.svg',
  'https://thesvg.org/icons/nodedotjs/default.svg',
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
