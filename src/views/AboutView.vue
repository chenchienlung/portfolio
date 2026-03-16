<template>
  <main class="min-h-screen max-w-6xl mx-auto">
    <div class="mx-5 mt-12 md:mt-24 px-5 md:px-10 py-10 bg-white rounded-4xl border border-black/5">
      <h2 class="text-3xl font-bold text-gray-900 mb-6 border-b border-black/5 pb-4">關於我</h2>
      <div class="flex flex-col gap-6 md:gap-10 text-base">
        <section>
          <h3 class="text-black text-xl font-semibold mb-1">
            陳仟龍 Chris
            <!-- <span class="text-gray-600 text-base ml-2">前端工程師</span> -->
          </h3>
          <div class="text-gray-600 font-semibold flex flex-row items-center gap-6">
            <a
              href="mailto:[EMAIL_ADDRESS]"
              class="hover:text-sky-600 hover:underline transition-all duration-200"
            >
              <font-awesome-icon icon="fa-solid fa-envelope" class="mr-1" />
              chris27805850@gmail.com
            </a>
            <a
              href="https://github.com/chenchienlung"
              target="_blank"
              class="hover:text-sky-600 hover:underline transition-all duration-200"
            >
              <font-awesome-icon icon="fa-brands fa-github" class="mr-1" />
              chenchienlung
            </a>
          </div>
        </section>
        <section>
          <h4 class="text-sky-700 font-semibold mb-1">個人簡述</h4>
          <p class="text-gray-600">
            在2022年6月畢業於大同大學媒體設計學系數位遊戲設計組，2023年2月役畢。2025年10月參加商研院前端開發工程師實戰養成班，進一步學習HTML、CSS、JavaScript及Vue.js等前端必備技能。參訓期間也製作旅遊網站團隊專題，主要負責UI設計、票券頁面切版與金流及票券資料庫串接等。
          </p>
        </section>
        <section>
          <h4 class="text-sky-700 font-semibold mb-1">經歷</h4>
          <p class="text-black font-semibold mb-1">
            2025.10.01~2026.01.29
            <span class="text-gray-600 font-normal ml-2">
              參加商研院產業新尖兵前端應用開發工程師實戰養成班
            </span>
          </p>
          <p class="text-gray-600">
            4個月，510小時從零開始學習前端技術，包括HTML、CSS、JavaScript 及前端框架
            Vue.js，也學了Git版本控制與團隊協作、後端技術Node.js與Express.js以及如何串接API，
            並在2個月內與3位團隊成員共同完成
            <a
              href="https://wantrip.store"
              target="_blank"
              class="hover:text-sky-600 underline transition-all duration-200"
              alt="WanTrip:國內旅遊訂房網站"
            >
              國內旅遊訂房網站 </a
            >專題， 主要負責UI設計、票券頁面切版、金流串接、票券資料庫串接與前端部署等。
          </p>
        </section>
        <section>
          <h4 class="text-sky-700 font-semibold mb-1">學歷</h4>
          <p class="text-gray-600">
            <span class="text-black font-semibold mr-2">2022</span>
            大同大學媒體設計學系數位遊戲設計組 畢業
          </p>
        </section>
        <section>
          <h4 class="text-sky-700 font-semibold mb-1">技能</h4>
          <div class="text-gray-600 flex flex-row flex-wrap gap-2">
            <span
              v-for="skill in skills"
              :key="skill"
              class="px-2 py-0.5 bg-gray-100 border border-black/5 rounded-full text-gray-500"
            >
              {{ skill }}
            </span>
          </div>
        </section>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
const skills = [
  'Figma',
  'Adobe Illustrator',
  'Adobe Photoshop',
  'HTML',
  'CSS',
  'JavaScript',
  'Vue.js',
  'Git版本控制',
  'RWD響應式網頁設計/開發',
  'Tailwind CSS',
  'Bootstrap',
  'Vite',
  'Pinia',
  'Supabase',
  'Node.js',
  'Express.js',
  'API串接',
  'AWS部署',
]
</script>
