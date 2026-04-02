# 個人作品集 (Portfolio)

這是一個使用 Vue 3、Vite 與 Tailwind CSS 4 開發的個人作品集網站，並透過 Supabase 進行資料庫的串接管理。用於展示個人的專案作品介紹、設計理念與網站相關連結。

**網站:** [https://chenchienlung.github.io/portfolio/](https://chenchienlung.github.io/portfolio/)

![PORTFOLIO](https://res.cloudinary.com/dtzgfwzwf/image/upload/v1775113920/favicon_jl5wvk.png)

---

## 使用到的技術

- **前端框架**: [Vue 3](https://vuejs.org/)
- **建構工具**: [Vite](https://vitejs.dev/)
- **CSS框架**: [Tailwind CSS](https://tailwindcss.com/)
- **資料庫**: [Supabase](https://supabase.com/)
- **路由管理**: [Vue Router](https://router.vuejs.org/)
- **型別定義**: [TypeScript](https://www.typescriptlang.org/)
- **圖示庫**: [FontAwesome](https://fontawesome.com/)

## 特色與架構

- **動態內容讀取**: 所有的專案內容，包括輪播圖、標題、設計理念介紹 (支援圖文左右交錯排版)、標籤以及各式外部連結等，皆由 Supabase 動態請求並渲染。
- **模組化元件**: 利用 Vue 元件化特性將介面拆分 (例如 `ProjectCard.vue`, `ProjectDetail.vue`, `ProjectLinks.vue` 等)，達到高重用性與易維護性。
- **響應式設計 (RWD)**: 透過 Tailwind CSS 實作各種螢幕尺寸的自適應介面，確保手機及桌面端的良好瀏覽體驗。

## 安裝

### 1. 安裝套件

建議使用 Node.js 版本 20.x 或 22+。

```bash
npm install
```

### 2. 環境變數設定

專案有使用到 Supabase，請在專案根目錄新增一個 `.env.local`，並加入您的 Supabase 資訊：

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. 運行

```bash
npm run dev
```

啟動後，開啟瀏覽器並造訪終端上顯示的本地位址（通常為 `http://localhost:5173/`）。

### 4. Build

```bash
npm run build
```

如果你想在本地端預覽打包出來的結果，可執行：

```bash
npm run preview
```

## 網站截圖

### 桌面版

![桌面版截圖](https://res.cloudinary.com/dtzgfwzwf/image/upload/v1775114759/README_2_pc_uqlgfi.png)
![桌面版截圖](https://res.cloudinary.com/dtzgfwzwf/image/upload/v1775114756/README_1_pc_na21qo.png)

### 手機版

![手機版截圖](https://res.cloudinary.com/dtzgfwzwf/image/upload/v1775114755/README_1_mobile_jxym8l.png)
![手機版截圖](https://res.cloudinary.com/dtzgfwzwf/image/upload/v1775114757/README_2_mobile_clfbpb.png)
