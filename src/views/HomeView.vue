<template>
  <main class="min-h-screen max-w-6xl mx-auto mb-4">
    <div class="mx-5 flex flex-col gap-32">
      <section
        class="relative h-screen flex flex-col justify-center"
        data-aos="fade-up"
        data-aos-duration="800"
      >
        <div class="flex flex-col gap-10 text-black dark:text-white pb-20 md:pb-0">
          <div class="flex flex-col gap-2 font-mono">
            <span class="text-sky-700 text-sm md:text-xl">Frontend Engineer | UI/UX Designer</span>
            <h2 class="text-5xl md:text-6xl font-mono mb-5">Hello! I'm Chris.</h2>
          </div>
          <p class="text-4xl leading-[1.2em]">
            我目前正在尋找<br />
            <span class="text-sky-600 md:text-nowrap font-bold">
              前端工程師<span class="text-gray-400 dark:text-gray-500 text-2xl"> 或 </span
              >UI/UX設計師 </span
            ><br />
            相關職缺
          </p>
          <div class="mt-6 md:mt-12 flex flex-row flex-wrap gap-2">
            <a
              href="https://github.com/chenchienlung"
              target="_blank"
              rel="noopener noreferrer"
              class="px-4 h-11 flex items-center justify-center text-center text-nowrap text-white bg-sky-800 hover:bg-sky-700 rounded-full transition-all duration-200"
            >
              <font-awesome-icon icon="fa-brands fa-github" />
              <span class="ml-1.5 text-sm">GitHub ↗</span>
            </a>
            <a
              href="#about"
              class="px-4 h-11 flex items-center justify-center text-center text-nowrap text-sky-800 dark:text-sky-400 border border-sky-700 dark:border-sky-500 hover:bg-sky-50 dark:hover:bg-sky-900/30 hover:text-sky-700 dark:hover:text-sky-300 hover:border-sky-700 rounded-full transition-all duration-200"
            >
              <font-awesome-icon icon="fa-solid fa-user" />
              <span class="ml-1.5 text-sm">關於我 ↓</span>
            </a>
          </div>
        </div>
        <StatusBadge
          v-if="about?.job_status"
          class="absolute top-10 md:top-50 right-0"
          :label="about.job_status"
          :color="about.job_status_color"
          size="md"
        />
      </section>
      <section
        class="relative min-h-[calc(100vh-168px)]"
        data-aos="fade-up"
        data-aos-duration="800"
      >
        <h2
          class="w-20 text-2xl text-sky-600 font-bold pb-2 border-b border-gray-400 dark:border-gray-600 mb-10"
        >
          技能
        </h2>
        <SkillsCard v-if="about?.skill_groups?.length" :groups="about.skill_groups" />
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
            class="w-11 h-11 flex justify-center items-center rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 inset-shadow-white inset-shadow-sm/20 hover:bg-gray-200 dark:hover:bg-white/15 transition-all duration-200"
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
        <RouterLink
          to="/portfolio"
          class="md:hidden w-full h-10 flex justify-center items-right mt-10 text-lg text-gray-600 dark:text-gray-300"
        >
          查看更多作品 →
        </RouterLink>
        <p
          class="hidden md:block w-full text-gray-200 dark:text-gray-800 text-[180px] text-center font-black absolute bottom-20"
        >
          PORTFOLIO
        </p>
      </section>
      <section
        id="about"
        class="min-h-[calc(100vh-168px)] pt-10 md:pt-0"
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
            <div class="flex flex-row items-center gap-5 mt-6">
              <p class="text-black dark:text-white text-lg font-semibold font-mono">陳仟龍 Chris</p>
              <StatusBadge
                v-if="about?.job_status"
                :label="about.job_status"
                :color="about.job_status_color"
                size="sm"
              />
            </div>

            <p v-if="about?.location" class="text-gray-600 dark:text-gray-300 font-mono">
              <font-awesome-icon icon="fa-solid fa-location-dot" class="mb-px" />
              {{ about.location }}
            </p>
            <div
              v-if="about?.contacts?.length"
              class="text-gray-600 dark:text-gray-300 font-mono flex flex-col md:flex-row flex-wrap items-start gap-1 md:gap-6"
              data-aos-duration="800"
              data-aos-delay="100"
            >
              <a
                v-for="(contact, i) in about.contacts"
                :key="i"
                :href="contact.url"
                :target="isExternalUrl(contact.url) ? '_blank' : undefined"
                :rel="isExternalUrl(contact.url) ? 'noopener noreferrer' : undefined"
                class="flex items-center gap-1.5 hover:text-sky-600 dark:hover:text-sky-400 hover:underline transition-all duration-200"
              >
                <font-awesome-icon
                  v-if="contact.iconType === 'fa'"
                  :icon="contact.icon"
                  class="mb-px"
                />
                <img
                  v-else
                  :src="isDark && contact.iconDark ? contact.iconDark : contact.icon"
                  :alt="contact.label"
                  width="16"
                  height="16"
                  class="shrink-0"
                />
                {{ contact.label }}
              </a>
            </div>
          </div>

          <div v-if="about" class="flex flex-col gap-20 text-base">
            <div data-aos="fade-up" data-aos-duration="800" data-aos-delay="200">
              <h3
                class="w-50 text-gray-800 dark:text-gray-200 pb-2 mb-8 border-b border-gray-400 dark:border-gray-600"
              >
                經歷
              </h3>
              <div
                v-for="(exp, i) in about.experiences"
                :key="i"
                class="flex flex-col gap-4"
                :class="{ 'mt-10': i > 0 }"
              >
                <h4 class="text-black dark:text-white font-semibold">
                  {{ exp.date }}
                  <span class="text-nowrap md:ml-6">{{ exp.title }}</span>
                </h4>
                <p class="text-gray-600 dark:text-gray-300">
                  {{ exp.description_before }}
                  <a
                    v-if="exp.link"
                    :href="exp.link.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="hover:text-sky-600 dark:hover:text-sky-400 text-nowrap underline transition-all duration-200"
                    :alt="exp.link.alt"
                  >
                    {{ exp.link.text }} ↗
                  </a>
                  {{ exp.description_after }}
                </p>
              </div>
              <div v-if="about.resources.length" class="flex flex-col mt-10 gap-4">
                <h4 class="text-black dark:text-white text-nowrap font-semibold">其他資源</h4>
                <div class="flex flex-col gap-2">
                  <ResourceItem
                    v-for="(item, i) in about.resources"
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
            <!-- <div
              v-if="about.educations.length"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="300"
            >
              <h3
                class="w-50 text-gray-800 dark:text-gray-200 pb-2 mb-8 border-b border-gray-400 dark:border-gray-600"
              >
                學歷
              </h3>
              <div
                v-for="(edu, i) in about.educations"
                :key="i"
                class="flex flex-col gap-4"
                :class="{ 'mt-6': i > 0 }"
              >
                <p class="text-black dark:text-white font-semibold">{{ edu.year }}</p>
                <p class="text-gray-600 dark:text-gray-300 text-nowrap font-normal">
                  {{ edu.description }}
                </p>
              </div>
            </div> -->
            <!-- <div data-aos="fade-up" data-aos-duration="800" data-aos-delay="400">
              <h3
                class="w-50 text-gray-800 dark:text-gray-200 pb-2 mb-8 border-b border-gray-400 dark:border-gray-600"
              >
                技能
              </h3>
              <div class="flex flex-row flex-wrap gap-5">
                <img
                  v-for="(skillicon, i) in about.skill_icons"
                  :key="skillicon.src"
                  :src="isDark && skillicon.dark ? skillicon.dark : skillicon.src"
                  alt="skillicon"
                  class="w-8 h-8"
                  data-aos="fade-up"
                  data-aos-duration="800"
                  :data-aos-delay="(i + 1) * 50"
                />
              </div>
              <div class="flex flex-wrap gap-2 mt-8">
                <span
                  v-for="skilltext in about.skill_texts"
                  :key="skilltext"
                  class="text-gray-600 dark:text-gray-300 text-sm text-nowrap px-3 py-1.5 bg-gray-50 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-full"
                >
                  {{ skilltext }}
                </span>
              </div>
            </div> -->
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
import SkillsCard from '../components/SkillsCard.vue'
import StatusBadge from '../components/StatusBadge.vue'
import { fetchProjects, type Project } from '../data/projects'
import { fetchAbout, type About } from '../data/about'
import { useDarkMode } from '../composables/useDarkMode'

const { isDark } = useDarkMode()

const projects = ref<(Project & { link: string })[]>([])
const loading = ref(true)
const error = ref('')

const about = ref<About | null>(null)

onMounted(async () => {
  try {
    loading.value = true
    const [projectData, aboutData] = await Promise.all([fetchProjects(), fetchAbout()])

    projects.value = projectData.map((project) => ({
      ...project,
      link: `/portfolio/${project.slug}`,
    }))

    about.value = aboutData
  } catch (err) {
    console.error('Fetch error:', err)
    error.value = err instanceof Error ? err.message : '載入失敗'
  } finally {
    loading.value = false
  }
})

const displayedProjects = computed(() => projects.value.slice(0, 3))

// 只有 http/https 開頭的連結才需要 target="_blank"
// mailto:、tel: 等 scheme 應該在原分頁開啟
const isExternalUrl = (url: string) => /^https?:\/\//i.test(url)
</script>
