# 用 Cloudflare 一站搞定網域與部署 | Chris's Frontend & UI/UX Portfolio | 陳仟龍的作品集網站






在網路上比較了一下各種部署工具，最後決定將作品集網站部署在 Cloudflare ： **網域、DNS、CDN、部署** 全部在同一個 dashboard。這篇就記錄從註冊到部署的流程。

## 為什麼選 Cloudflare ?

我的個人網站規模很小，只有前端， Cloudflare 是一個可以一站完成網域註冊 + 部署的平台，小專案也只需負擔網域註冊的費用，也省略了 GitHub Actions 自動部署的設定和第三方 DNS 設定，又有完整的繁體中文化介面，非常容易完成。

| 項目 | Cloudflare | 一般組合 |
|------|------------|---------|
| 網域註冊 | 接近成本價，**無加價** | 通常加價 30~50% |
| SSL | 自動、免費、永久 | 多數免費 |
| CDN | 內建全球節點 | 需另外接 |
| 部署平台 | Cloudflare Pages | Vercel / Netlify / 自架 |
| 整合 | 全部在同一個 dashboard | 跨 3~4 個服務 |

Cloudflare 最大優勢是 **一站式** ，在一個 dashboard 完成所有設定。不用網域在 A 廠商、DNS 在 B 廠商、部署在 C 廠商，每換一個地方就要重新設定 CNAME、等 DNS Propagation (需要數分鐘到48小時的等待時間)。繁體中文化介面也降低操作門檻。

## Step 1：在 Cloudflare 註冊網域
如果還沒有 Cloudflare 帳號，先到 [cloudflare.com](https://cloudflare.com) 註冊一個（免費）。

1. 登入 Cloudflare Dashboard → 左側列表點擊 **網域**
![Cloudflare Dashboard Domain](https://res.cloudinary.com/dtzgfwzwf/image/upload/f_auto,q_auto/v1778727483/article_2_01_qbbr2z.png)
2. 搜尋想要的網域（如果還沒有想法，就先註冊自己的名字吧）
3. 結帳

> 💡 Cloudflare Registrar 註冊 `.com` 網域大約在10~11USD / 年，會開台灣的統一發票。

註冊完成後，DNS zone 會 **自動建立**，nameserver 也自動指向 Cloudflare 自家的（`xxx.ns.cloudflare.com`），不用手動改。

## Step 2：準備將專案部署到 Cloudflare

Cloudflare Pages 是從 GitHub repo 拉程式碼來 build，所以需要準備的是：

- 專案已經是一個 GitHub repo
- 主分支（`main` / `master`）可以正常跑 `npm run build`
- 該有的 build 設定（`vite.config.ts` 等）都已經 commit

> ⚠️ **SPA fallback 必加 `_redirects`**
>
> Vue Router 用 `history` mode 時，重新整理任何子路徑（例如直接打 `/portfolio/wantrip`）會 **404**，因為 Cloudflare 找不到實體檔案。
>
> 在 `public/_redirects` 加一行：
>
> ```
> /* /index.html 200
> ```
>
> Cloudflare Pages 看到這個檔案會自動處理 SPA fallback，所有不存在的路徑都導到 `index.html`，由 Vue Router 接手。

## Step 3：建立 Cloudflare Pages 專案

1. Dashboard → `Workers & Pages` 
![Workers and Pages](https://res.cloudinary.com/dtzgfwzwf/image/upload/f_auto,q_auto/v1778727771/article_2_02_iqch5w.png)

2. 右上角 **建立應用程式** 
3. 點擊底下小字「想要部署 Pages?」旁的 `開始使用`
![Click Pages](https://res.cloudinary.com/dtzgfwzwf/image/upload/f_auto,q_auto/v1778727820/article_2_03_dlmkxm.png)

4. 選擇 **匯入現有 GitHub 存放庫** 
![Contiune with GutHub](https://res.cloudinary.com/dtzgfwzwf/image/upload/f_auto,q_auto/v1778727829/article_2_04_nzghiu.png)
5. 首次連線要授權 Cloudflare GitHub App，選好要部署的 repo
![repo](https://res.cloudinary.com/dtzgfwzwf/image/upload/f_auto,q_auto/v1778727841/article_2_05_cozbnp.png)
6. 填 build 設定(包括環境變數)，例如：
![Build Setting](https://res.cloudinary.com/dtzgfwzwf/image/upload/f_auto,q_auto/v1778727851/article_2_06_fb6ym2.png)

5. 點 **儲存並部署** ，第一次 build 大約 1~3 分鐘。

build 完 Cloudflare 會給一個 `your-project.pages.dev` 暫時網址，可以先打開確認網站沒問題。

## Step 4：綁定自己的網域

回到 Pages 專案 → **自訂網域** → **設定自訂網域** → 輸入剛才註冊的網域。

因為網域已經在 Cloudflare 名下，DNS 設定 **會自動完成**，不用手動加 CNAME 也不用等 DNS Propagation(如果是在第三方網域商設定 DNS 可能要等數分鐘到48小時)。1 分鐘內就能將自訂網域連到網站。

想要 `www.yourdomain.com` 也能連，在 **Custom Domains** 再新增一個即可。

## Step 5：強制 HTTPS

- Dashboard → 左側列表 **SSL/TLS** → **Overview** 設為 **Full** 或 **Full (strict)** （預設應該已經是 Full）
- **Edge Certificates (邊緣憑證)** → 打開 **Always Use HTTPS**

這樣使用者連 `http://` 會自動跳轉 `https://`。


### 總結

完成以上步驟後續每次 `git push` 到 main 分支，Cloudflare 會自動 build + deploy。整套設定也省去 GitHub Actions 自動部署與 DNS 設定，個人專案只需負擔網域註冊費用，可以說是非常簡單上手。
依照我註冊網域和部署經驗， Cloudflare 不會像某些網域商一直推銷或寄 email 廣告。

Cloudflare Pages 免費方案包括：

- 每月無限次部署
- 自動 SSL
- 全球 CDN
- 無頻寬限制（個人專案）

---

- 網頁版：https://chenchienlung.com/blog/cloudflare-registrar-and-pages-deployment
- 分類：frontend, deploy
- 標籤：Cloudflare, Cloudflare Registrar, Cloudflare Pages, 部署
- 發布時間：2026-04-20
- 閱讀時間：約 未提供 分鐘
