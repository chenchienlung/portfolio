# 個人作品集 (Portfolio)

這是一個使用 Vue 3、Vite 與 Tailwind CSS 開發的個人作品集網站，並透過 Supabase 進行資料庫的串接管理。用於展示個人的專案作品介紹、設計理念與網站等作品相關連結。

**網站:** [https://chenchienlung.github.io/portfolio/](https://chenchienlung.github.io/portfolio/)

![PORTFOLIO](https://res.cloudinary.com/dtzgfwzwf/image/upload/v1775113920/favicon_jl5wvk.png)

---

## 使用到的技術

<img src="https://thesvg.org/icons/html5/default.svg" style="width: 32px; height: 32px;"><img src="https://thesvg.org/icons/css/default.svg" style="width: 32px; height: 32px;"><img src="https://thesvg.org/icons/tailwind-css/default.svg" style="width: 32px; height: 32px;"><img src="https://thesvg.org/icons/vue/default.svg" style="width: 32px; height: 32px;"><img src="https://thesvg.org/icons/typescript/default.svg" style="width: 32px; height: 32px;"><img src="https://thesvg.org/icons/vite/default.svg" style="width: 32px; height: 32px;"><img src="https://thesvg.org/icons/supabase/default.svg" style="width: 32px; height: 32px;"><img src="https://thesvg.org/icons/nodedotjs/default.svg" style="width: 32px; height: 32px;">

- **前端框架**: [Vue 3](https://vuejs.org/)
- **建構工具**: [Vite](https://vitejs.dev/)
- **CSS框架**: [Tailwind CSS](https://tailwindcss.com/)
- **資料庫**: [Supabase](https://supabase.com/)
- **作品圖庫**: [Cloudinary](https://cloudinary.com/)
- **路由管理**: [Vue Router](https://router.vuejs.org/)
- **型別定義**: [TypeScript](https://www.typescriptlang.org/)
- **圖示庫**: [FontAwesome](https://fontawesome.com/) [theSVG](https://www.thesvg.org/)

## 特色與架構

- **動態內容讀取**: 所有的專案內容，包括標題、設計理念介紹 (支援圖文左右交錯排版)、標籤以及各式外部連結等，皆由 Supabase 動態請求並渲染。
- **模組化元件**: 利用 Vue 元件化特性將介面拆分 (例如 `ProjectCard.vue`, `ProjectDetail.vue`, `ProjectLinks.vue` 等)，達到高重用性與易維護性。
- **響應式設計 (RWD)**: 透過 Tailwind CSS 實作各種螢幕尺寸的響應式介面，確保手機及桌面端的良好瀏覽體驗。

## 安裝

### 1. 安裝套件

建議使用 Node.js 24+。

```bash
npm install
```

### 2. 環境變數

專案有使用到 Supabase，請在專案根目錄新增一個 `.env.local`，並加入您的 Supabase 資訊：

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. 運行

```bash
npm run dev
```

啟動後，開啟瀏覽器並造訪終端上顯示的local位址（通常為 `http://localhost:5173/`），或`command + 滑鼠左鍵`點擊終端機上的local位址。

## 網站截圖

### 桌面版

<img src="https://res.cloudinary.com/dtzgfwzwf/image/upload/v1776148238/README_2_pc_uqlgfi.png" style="width: 480px; height: auto;"><img src="https://res.cloudinary.com/dtzgfwzwf/image/upload/v1776148229/README_1_pc_na21qo.png" style="width: 480px; height: auto;">

### 手機版

<img src="https://res.cloudinary.com/dtzgfwzwf/image/upload/v1776148478/README_1_mobile_jxym8l.png" style="width: 240px; height: auto;"><img src="https://res.cloudinary.com/dtzgfwzwf/image/upload/v1776148486/README_2_mobile_clfbpb.png" style="width: 240px; height: auto;">
