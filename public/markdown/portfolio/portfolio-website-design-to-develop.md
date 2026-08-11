# 個人作品集網站｜從規劃、設計到開發

從資訊架構、UI 設計到 Vue 前端實作獨立完成的個人作品集網站，整合 Supabase 動態內容與 Cloudinary 圖片管理，用於呈現前端開發、UI/UX 設計作品及技術文章。


## 重點

- 為求職情境設計，讓面試方快速理解我的定位、技能與專案經驗。
- 作品與文章採用不同內容模型，兼顧資料一致性與排版彈性。
- 從 Figma 規劃、Vue 3 開發、Supabase 資料管理到 Cloudflare Pages 部署皆獨立完成。

## 標籤

- 網站開發
- RWD
- Figma

## 技能與工具

- https://thesvg.org/icons/figma/default.svg
- https://thesvg.org/icons/github/mono.svg
- https://thesvg.org/icons/git/default.svg
- https://thesvg.org/icons/html5/default.svg
- https://thesvg.org/icons/css/default.svg
- https://thesvg.org/icons/typescript/default.svg
- https://thesvg.org/icons/tailwind-css/default.svg
- https://thesvg.org/icons/vue/default.svg
- https://thesvg.org/icons/vite/default.svg
- https://thesvg.org/icons/supabase/default.svg
- https://thesvg.org/icons/cloudinary/default.svg

## 詳細說明

- 本專案以求職瀏覽情境為核心，目標是讓面試方能快速理解我的前端能力、UI/UX 經驗與專案角色。從資訊架構、Figma 設計、Vue 3 開發到部署皆獨立完成。
- 作品與文章資料由 Supabase 管理，圖片儲存在 Cloudinary ，CDN抓取圖片提升網站效能。作品使用固定 Schema 呈現專案背景、技術與開發過程；文章則使用 Markdown 保留不同主題需要的排版彈性。
- 開發過程特別處理響應式布局、深色模式、動態路由、頁面標題與內容維護性，並將前台網站與內容管理 Dashboard 分離。

## 成果

- 從資訊架構、UI 設計到 Vue 3 開發獨立完成
- 使用 TypeScript 與元件化架構管理作品、文章及共用介面
- 以 Supabase 管理作品與文章資料，Cloudinary 管理媒體資源
- 針對作品與文章設計 Schema / Markdown 兩種內容呈現方式
- 支援響應式布局、深色模式、動態路由與 SEO
- 部署至 Cloudflare Pages，並以自訂網域公開作品

## 開發過程

### AI 輔助我哪些任務？

AI 用於協助檢查元件一致性、分析錯誤訊息、產生重複性程式碼初稿與提供重構方向。網站架構、程式碼驗收與最終修改由我負責。所有 AI 產出都會經過理解、測試與調整後才納入專案。
- 檢查重複程式碼、不必要的邏輯與可重構區塊。
- 更快速解決bug、遇到的各種問題。

![AI 輔助我哪些任務？](https://res.cloudinary.com/dtzgfwzwf/image/upload/v1785480686/5_detail_img_06_tf5ach.webp)

### 部署工具選擇

前端部署於 Cloudflare Pages，利用 Cloudflare 內建自動部署與全球 CDN；Supabase 負責結構化內容資料；Cloudinary 負責圖片資源與轉換。將前端、資料與媒體服務分離，方便獨立維護與擴充。

![部署工具選擇](https://res.cloudinary.com/dtzgfwzwf/image/upload/v1785480689/5_detail_img_07_e9kzly.webp)

### 動態內容與資料

作品內容具有固定的專案背景、技術、圖片與開發流程，因此使用結構化欄位儲存；文章段落與程式碼排版差異較大，則使用 Markdown。兩種資料模型分開設計，避免為了共用欄位而犧牲內容彈性。

![動態內容與資料](https://res.cloudinary.com/dtzgfwzwf/image/upload/v1785733153/5_detail_img_08_y0r3rf.webp)

### 元件化與響應式設計

將作品卡片、作品詳情、文章內容、導航與共用按鈕拆成獨立元件，降低頁面重複程式碼。響應式設計以桌面與行動裝置的閱讀順序為基礎，不只縮小尺寸，也調整導航、卡片欄數與圖文排列方式。

![元件化與響應式設計](https://res.cloudinary.com/dtzgfwzwf/image/upload/v1785733154/5_detail_img_09_nndrh7.webp)

### 路由與動態頁面標題

作品與文章使用 slug 建立動態路由，詳細頁面載入資料後再更新瀏覽器標題。其他固定頁面則由路由 metadata 管理名稱，使頁面標題能依目前內容調整。

![路由與動態頁面標題](https://res.cloudinary.com/dtzgfwzwf/image/upload/v1785733156/5_detail_img_10_kzzkrz.webp)

## 設計理念

### 網站架構

網站以求職瀏覽情境為核心，主要分為首頁、作品列表、作品詳情、文章列表與文章詳情。首頁負責快速建立個人定位並引導至精選作品；列表頁提供分類瀏覽；詳情頁則呈現完整的設計與開發過程。

![網站架構](https://res.cloudinary.com/dtzgfwzwf/image/upload/v1785480674/5_detail_img_01_jarbcx.webp)

### 首頁

首頁依序安排 Hero、精選作品、專業技能與關於我。先用 Hero 說明求職定位，再讓面試方直接看到作品證據，接著補充技能與個人背景，降低理解成本。
- Hero：說明目前的狀態、描述我能做到什麼、主力技術、主力工具。
- 最新作品區塊：展示三個最新的作品。
- 專業技能：前端、UI/UX、開發工具、AI工具使用情況等，共4張卡片詳細介紹專業技能、專案經驗。
- 關於我：包含求職狀態、經驗、技能與聯絡方式等不同資訊，因此採用 Bento Grid，利用不同卡片尺寸建立資訊層級。

![首頁](https://res.cloudinary.com/dtzgfwzwf/image/upload/v1785480676/5_detail_img_02_mjiejm.webp)

### 作品列表、內容

作品詳情使用固定 Schema，統一管理專案背景、使用技術、開發流程、成果、連結與反思。固定結構方便面試方比較不同作品，也能避免每個案例的資訊完整度差異過大。

![作品列表、內容](https://res.cloudinary.com/dtzgfwzwf/image/upload/v1785480679/5_detail_img_03_trkknt.webp)

### 文章列表、內容

技術文章的段落、程式碼、圖片與引用結構會依主題改變，因此使用 Markdown 儲存內容，兼顧排版彈性與後續維護。文章的標題、摘要、分類、標籤與發布狀態則保留為結構化欄位。

![文章列表、內容](https://res.cloudinary.com/dtzgfwzwf/image/upload/v1785480683/5_detail_img_04_ubs0zb.webp)

### 未來規劃

- 增加作品與文章搜尋、篩選功能。
- 持續整理開發過程與技術文章。

![未來規劃](https://res.cloudinary.com/dtzgfwzwf/image/upload/v1785516294/5_detail_img_05_spcga2.webp)

## 連結

- 網站：https://chenchienlung.com/
- GitHub：https://github.com/chenchienlung/portfolio.git
- Figma：https://www.figma.com/design/xExe7iH3l3iTA1VFC8Z4ib/%E4%BD%9C%E5%93%81%E9%9B%86%E7%B6%B2%E7%AB%99%E8%A6%8F%E5%8A%83?node-id=119-621&t=1kz5yjXaGEpGeDlo-1
- 網頁版：https://chenchienlung.com/portfolio/portfolio-website-design-to-develop
