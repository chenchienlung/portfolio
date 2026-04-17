import { fileURLToPath, URL } from 'node:url'
import { copyFileSync } from 'node:fs'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import vueDevTools from 'vite-plugin-vue-devtools'

import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  base: '/portfolio',
  plugins: [tailwindcss(), vue(), vueDevTools(), {
    name: 'copy-404',
    closeBundle() {
      copyFileSync('dist/index.html', 'dist/404.html')
    },
  }, cloudflare()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})