<template>
  <main class="min-h-[calc(100dvh-168px)] max-w-6xl mx-auto mb-4">
    <h2 class="text-3xl font-bold text-center text-gray-900 mx-5 mt-12 mb-10 md:mt-28">關於我</h2>
    <div class="mx-5 px-5 md:px-10 py-10 bg-white rounded-4xl border border-black/15 shadow-xs/12">
      <div class="flex flex-col gap-10 md:gap-15 text-base">
        <section>
          <h3 class="text-black text-xl font-bold mb-1 delay-600">
            陳仟龍 Chris
            <!-- <span class="text-gray-600 text-base ml-2">前端工程師 | UI設計師</span> -->
          </h3>
          <div
            class="text-gray-600 font-bold flex flex-col md:flex-row items-start gap-1 md:gap-6 delay-600 mt-2 md:mt-0"
          >
            <a
              href="mailto:[EMAIL_ADDRESS]"
              class="hover:text-sky-600 hover:underline transition-all duration-200"
            >
              <font-awesome-icon icon="fa-solid fa-envelope" class="mr-1 mb-px" />
              chris27805850@gmail.com
            </a>
            <a
              href="https://github.com/chenchienlung"
              target="_blank"
              class="hover:text-sky-600 hover:underline transition-all duration-200"
            >
              <font-awesome-icon icon="fa-brands fa-github" class="mr-1 mb-px" />
              chenchienlung
            </a>
          </div>
        </section>
        <section>
          <h4 class="text-sky-700 font-semibold mb-1 delay-600">個人簡述</h4>
          <p class="text-gray-600 delay-600">
            在2022年6月畢業於大同大學媒體設計學系數位遊戲設計組，2023年2月役畢。
            2025年10月參加商研院前端應用開發工程師實戰養成班，在4個月期間進一步學
            習HTML、CSS、JavaScript及Vue.js等前端必備技能。參訓期間也製作旅遊
            網站團隊專題，主要負責UI設計、切版、金流及票券資料庫串接和前端部署(AWS EC2)等。
          </p>
        </section>
        <section>
          <h4 class="text-sky-700 font-semibold mb-1 delay-600">經歷</h4>
          <div class="flex flex-col gap-5">
            <div>
              <p class="text-black font-semibold font-mono mb-1 delay-600">
                2025.10.01~2026.01.29
                <span class="text-gray-600 font-normal ml-2">
                  參加商研院產業新尖兵前端應用開發工程師實戰養成班
                </span>
              </p>
              <p class="text-gray-600 delay-600">
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
            <div class="flex flex-row gap-5 delay-600">
              <p class="text-black text-nowrap font-semibold font-mono mb-1 row-span-2">其他資源</p>
              <div class="flex flex-col gap-2">
                <p class="text-gray-600 font-normal ml-2">
                  hahow好學校線上課程：
                  <a
                    href="https://hahow.in/courses/5ee4d65789dc7e4854909ba1?utm_source=share&utm_medium=link"
                    target="_blank"
                    class="hover:text-sky-600 hover:underline transition-all duration-200"
                  >
                    產品設計實戰：用Figma打造絕佳UI/UX ↗
                  </a>
                </p>
                <p class="text-gray-600 font-normal ml-2">
                  六角學院線上課程學HTML、CSS、Bootstrap等前端基礎
                </p>
                <div class="text-gray-600 font-normal ml-2 flex flex-row gap-2">
                  <img
                    src="https://thesvg.org/icons/mdn-web-docs/default.svg"
                    alt=""
                    width="20px"
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
        </section>
        <section>
          <h4 class="text-sky-700 font-semibold mb-1 delay-600">學歷</h4>
          <p class="text-gray-600 delay-600">
            <span class="text-black font-semibold font-mono mr-2">2022</span>
            大同大學媒體設計學系數位遊戲設計組 畢業
          </p>
        </section>
        <section>
          <h4 class="text-sky-700 font-semibold mb-2 delay-600">技能</h4>
          <div class="flex flex-col gap-4">
            <div class="flex flex-row flex-wrap gap-5">
              <img
                v-for="skillicon in skillicons"
                :src="skillicon"
                alt="skillicon"
                class="w-8 h-8"
              />
            </div>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="skilltext in skilltexts"
                class="text-gray-600 text-sm text-nowrap px-3 py-1.5 bg-gray-50 border border-gray-300 rounded-full"
              >
                {{ skilltext }}
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
const skillicons = [
  'https://thesvg.org/icons/figma/default.svg',
  'https://thesvg.org/icons/illustrator/default.svg',
  'https://thesvg.org/icons/photoshop/default.svg',
  'https://thesvg.org/icons/github/mono.svg',
  'https://thesvg.org/icons/git/default.svg',
  'https://thesvg.org/icons/visual-studio-code/default.svg',
  'https://thesvg.org/icons/google-antigravity/default.svg',
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

const skilltexts = ['RWD響應式網頁設計', 'API串接', 'AI 輔助開發']
</script>
