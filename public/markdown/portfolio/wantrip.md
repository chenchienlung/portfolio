# [產業新尖兵專題] WanTrip｜國內旅遊訂房網站｜Chris's Frontend & UI/UX Portfolio | 陳仟龍的作品集網站

產業新尖兵專題。4人團隊在2個月內完成具備訂房、比較飯店、AI問答功能的旅遊平台。個人在本專案負責網站介面設計、切版、金流、資料庫串接與前端部署。


## 重點

- 4 人團隊在 2 個月內完成具備訂房、住宿比較、會員與付款流程的旅遊平台
- 個人主導 UI/UX 設計與全站 RWD 切版，建立團隊共用的介面風格
- 專案使用 Supabase 串接會員、收藏與訂單資料，完成前端資料存取
- 共串接綠界與 LINE Pay Sandbox，模擬從預訂到付款結果的完整流程

## 標籤

- 網站開發
- UI/UX
- RWD
- 團隊專案

## 技能與工具

- Figma
- GitHub
- Git
- HTML
- CSS
- TypeScript
- Tailwind
- Vue
- Vite
- Supabase
- Pinia
- Node.js
- Express.js
- Cloudinary

## 詳細說明

- 產業新尖兵專題
- 4 人團隊、開發期程 2 個月，打造具備完整前後端架構之旅遊訂房訂票網站。
- 個人負責項目：
- - 使用 Supabase 建立票券資料庫。
- - 主導網站 UI/UX 設計，制定介面風格、色彩設定，並完成全站 RWD 前端切版。
- - 整合 LINE Pay 與綠界金流 (皆為 Sandbox 環境)，開發訂單付款流程，並串聯 Supabase 儲存歷史訂單資料。
- - 專案部署在 AWS EC2，並設定 Nginx 反向代理，完成上線測試。(因免費方案到期，目前部署在 Vercel)
- - 註冊網域並設定 DNS。
- 我們建構了一個國內各大景點及飯店的資料庫，可以模擬預訂、結帳、會員收藏。也另外設計了幾個亮點功能：住宿比較、旅遊趣味測驗以及AI問答機器人等。完成串接綠界金流和LINE Pay Sandbox來模擬結帳流程，並連結會員系統儲存歷史訂單資料。另外，我們也在 GitHub 流程中導入 Gemini 進行 AI Code Review，加速 PR 審查、提高開發效率。此團隊專案也讓我累積從 UI 設計、前端開發、資料庫到部署的完整協作經驗。

## 成果

- 完成住宿瀏覽、比較、收藏、預訂、付款與歷史訂單等核心流程
- 透過 Figma、Notion、GitHub Issue 與 Pull Request 建立團隊協作流程
- 實際處理第三方金流回傳、訂單狀態與會員資料串接
- 前後端分離部署，並設定 Nginx
- AI 輔助開發

## 開發過程

### Function Map

開發前期我們先在Miro上發想網站功能，再依時間限制及我們能力範圍來刪減，規劃整個專案大約流程及功能架構。

![Function Map](https://res.cloudinary.com/dtzgfwzwf/image/upload/f_auto,q_auto,w_1200/v1777435578/4_detail_img_function_map_ovqmwq.jpg)

### Flow Chart

規劃每一個功能大概的流程，可以讓我們了解這個功能可能需要跳轉幾個頁面，並在Figma上設計此功能的每一個介面。也參考一些旅遊網站的設計及配色。

![Flow Chart](https://res.cloudinary.com/dtzgfwzwf/image/upload/f_auto,q_auto,w_1200/v1777435578/4_detail_img_flow_chart_prgdnc.jpg)

### Figma

為了避免在切版時每一頁風格不一致，我們先在 Figma 中完成每個頁面的設計稿，作為團隊溝通與切版的參考來源，減少團隊各個成員對 UI 的認知落差。

![Figma](https://res.cloudinary.com/dtzgfwzwf/image/upload/f_auto,q_auto,w_1200/v1777435577/4_detail_img_figma_hrtvfc.jpg)

### 團隊溝通

使用 Notion 規劃開發時程、儲存會議記錄與決策；透過 Discord Webhook 與 GitHub 串接，專案每次Commit、PR 開啟或合併都會自動推播到 Discord 頻道，讓團隊即時掌握進度；GitHub 則是專案協作核心，以 PR 進行 code review、Issue 追蹤待辦事項等。

![團隊溝通](https://res.cloudinary.com/dtzgfwzwf/image/upload/f_auto,q_auto,w_1200/v1777478811/4_detail_img_communicate_wznef3.jpg)

### 前端開發

使用 Vue 將 UI 拆成可重複使用的元件；搭配 Vue 官方推薦的 Pinia 進行狀態管理；以 TypeScript 固定型別、減少錯誤；透過 Tailwind CSS 維持樣式一致性、降低 CSS 命名負擔；採用 Vite 作為開發工具；並以 Git 進行版控。

![前端開發](https://res.cloudinary.com/dtzgfwzwf/image/upload/f_auto,q_auto,w_1200/v1777478812/4_detail_img_frontend_skills_pytz64.jpg)

### 後端

Node.js + Express 處理 API 邏輯，Supabase 一站搞定資料庫與身份驗證(網站會員與會員收藏)，圖片資源則交給 Cloudinary 託管並做壓縮優化，讓網站不會因為圖片而臃腫。

![後端](https://res.cloudinary.com/dtzgfwzwf/image/upload/f_auto,q_auto,w_1200/v1777533283/4_detail_img_backend_gpr7em.jpg)

### 金流串接

本專案共完成串接綠界、LINE Pay兩款線上支付系統(皆是sandbox環境)，可以模擬專案最核心的結帳流程。綠界涵蓋信用卡、ATM、Apple Pay、超商代碼等選項；LINE Pay 則是因為它是國內最熱門的行動支付，讓使用者能在熟悉的 App 內快速付款。
實作上完成了從「立即預定」按鈕到付款頁的串接、付款結果頁的導向，以及訂單狀態的同步顯示。

![金流串接](https://res.cloudinary.com/dtzgfwzwf/image/upload/f_auto,q_auto,w_1200/v1777821359/4_detail_img_online_pay_sandbox_simicz.png)

### 部署

前端部署在 AWS EC2，免費方案到期後(2026/07)改部署至 Vercel ；後端部署於 Render；在 GoDaddy 註冊網域。

![部署](https://res.cloudinary.com/dtzgfwzwf/image/upload/v1785677107/4_detail_img_deploy_foibkp.webp)

## 設計理念

### 設計風格

主視覺採用藍色系，藍色聯想到天空與海洋，傳達「開闊、放鬆、自由」，呼應旅遊網站的核心。
大量使用圓角設計則激發親和感，更貼合旅遊產品「放鬆、休閒」的情緒，也強化了「卡片」元件的隱喻，每張「卡片」都是可拿起挑選、比較的。並與現代手機螢幕的圓角邊框呼應，在 RWD 場景下視覺更和諧。

![設計風格](https://res.cloudinary.com/dtzgfwzwf/image/upload/f_auto,q_auto,w_1200/v1777438764/4_detail_img_style_mcy0lp.jpg)

### 半透明的Navbar

半透明的Navbar設計能讓使用者更聚焦在網站內容，視覺焦點不會被深色的Navbar搶走，同時也不會影響 Navbar 上內容的可讀性
手機版導航列仿照App置底，讓使用者輕鬆單手操作。

![半透明的Navbar](https://res.cloudinary.com/dtzgfwzwf/image/upload/f_auto,q_auto,w_1200/v1774850334/4_detail_img_01_hgw3da.png)

### 卡片

只顯示重點資訊：名稱、價格，hover展開後才顯示按鈕、詳細資訊，這樣能讓卡片簡潔不凌亂。
也與shadow搭配，讓卡片有拿起來並展開的感覺。

![卡片](https://res.cloudinary.com/dtzgfwzwf/image/upload/f_auto,q_auto,w_1200/v1774850336/4_detail_img_02_gzaxn7.png)

### 住宿比較

住宿比較功能需要同時保存多筆住宿資料，並限制最多三筆。前端需要處理加入、移除、重複選取與不同頁面間的比較狀態，最後將設施、服務與價格整理成相同欄位，方便使用者並排比較。

![住宿比較](https://res.cloudinary.com/dtzgfwzwf/image/upload/v1785675866/4_detail_img_favorite_n5jypd.webp)

### 會員與訂單資料

使用 Supabase 管理會員、收藏與歷史訂單資料。前端依登入狀態載入使用者資料，並在付款流程完成後更新訂單狀態，讓會員可以在個人頁面查看過去的預訂紀錄。

![會員與訂單資料](https://res.cloudinary.com/dtzgfwzwf/image/upload/v1785675866/4_detail_img_profile_zwfbkc.webp)

## 連結

- 網站：https://wantrip.store/
- GitHub：https://github.com/WanTrip-2026/WanTrip.git
- Figma：https://www.figma.com/site/cA7AIpY9wgtoErK0k7YwxC/%E5%B0%88%E9%A1%8C-WanTrip?node-id=0-1&t=YuZRf8Fg4QNDpDK7-1
- 網頁版：https://chenchienlung.com/portfolio/wantrip
