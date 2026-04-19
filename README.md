# 個人作品集 Portfolio

這是一個使用 Vue 3、Vite 與 Tailwind CSS 開發的個人作品集網站，並透過 Supabase 進行資料庫的串接管理。用於展示個人的專案作品介紹、設計理念與網站等作品相關連結。

**網站:** https://chenchienlung.com

![PORTFOLIO](https://res.cloudinary.com/dtzgfwzwf/image/upload/v1775113920/favicon_jl5wvk.png)

---

## 使用到的技術

<img src="https://thesvg.org/icons/html5/default.svg" style="width: 32px; height: 32px;" hspace="5"><img src="https://thesvg.org/icons/css/default.svg" style="width: 32px; height: 32px;" hspace="5"><img src="https://thesvg.org/icons/tailwind-css/default.svg" style="width: 32px; height: 32px;" hspace="5"><img src="https://thesvg.org/icons/vue/default.svg" style="width: 32px; height: 32px;" hspace="5"><img src="https://thesvg.org/icons/typescript/default.svg" style="width: 32px; height: 32px;" hspace="5"><img src="https://thesvg.org/icons/vite/default.svg" style="width: 32px; height: 32px;" hspace="5"><img src="https://thesvg.org/icons/supabase/default.svg" style="width: 32px; height: 32px;" hspace="5"><img src="https://thesvg.org/icons/nodedotjs/default.svg" style="width: 32px; height: 32px;" hspace="5"><img src="https://thesvg.org/icons/cloudflare/default.svg" style="width: 32px; height: 32px;" hspace="5"><img src="https://thesvg.org/icons/cloudflare-pages/default.svg" style="width: 32px; height: 32px;" hspace="5">

- **前端框架**: [Vue 3](https://vuejs.org/)
- **建構工具**: [Vite](https://vitejs.dev/)
- **CSS框架**: [Tailwind CSS](https://tailwindcss.com/)
- **作品資料庫**: [Supabase](https://supabase.com/)
- **作品圖庫**: [Cloudinary](https://cloudinary.com/)
- **路由管理**: [Vue Router](https://router.vuejs.org/)
- **型別定義**: [TypeScript](https://www.typescriptlang.org/)
- **圖示庫**: [FontAwesome](https://fontawesome.com/) [theSVG](https://www.thesvg.org/)
- **動態效果**: AOS - Animate On Scroll Library
- **部署**: [Cloudflare Pages](https://pages.cloudflare.com/)

## 特色與架構

- **動態內容讀取**: 所有的專案內容，包括標題、設計理念介紹 (支援圖文左右交錯排版)、標籤以及各式外部連結等，皆由 Supabase 動態請求並渲染。
- **模組化元件**: 利用 Vue 元件化特性將介面拆分 (例如 `ProjectCard.vue`, `ProjectDetail.vue`, `ProjectLinks.vue` 等)，達到高重用性與易維護性。
- **響應式設計 (RWD)**: 透過 Tailwind CSS 實作各種螢幕尺寸的響應式介面，確保手機及桌面端的良好瀏覽體驗。
- **深色模式**: 支援 light / dark 模式切換。

## 截圖

### Desktop

#### light

<img src="https://res.cloudinary.com/dtzgfwzwf/image/upload/v1776576421/deaktop_Project_light_mllzap.png" style="width: 480px; height: auto;" hspace="5"><img src="https://res.cloudinary.com/dtzgfwzwf/image/upload/v1776576419/deaktop_Detail_light_yv2dkr.png" style="width: 480px; height: auto;" hspace="5">

#### dark

<img src="https://res.cloudinary.com/dtzgfwzwf/image/upload/v1776576419/deaktop_Project_dark_fbz3fu.png" style="width: 480px; height: auto;" hspace="5"><img src="https://res.cloudinary.com/dtzgfwzwf/image/upload/v1776576418/deaktop_Detail_dark_d3hbqu.png" style="width: 480px; height: auto;" hspace="5">

### Mobile

#### light

<img src="https://res.cloudinary.com/dtzgfwzwf/image/upload/v1776576428/mobile_Portfolio_light_ntzuh0.png" style="width: 240px; height: auto;"><img src="https://res.cloudinary.com/dtzgfwzwf/image/upload/v1776576424/mobile_Detail_light_ajxihe.png" style="width: 240px; height: auto;">

#### dark

<img src="https://res.cloudinary.com/dtzgfwzwf/image/upload/v1776576426/mobile_Portfolio_dark_hql9i3.png" style="width: 240px; height: auto;"><img src="https://res.cloudinary.com/dtzgfwzwf/image/upload/v1776576602/mobile_Detail_dark_k3bk4t.png" style="width: 240px; height: auto;">
