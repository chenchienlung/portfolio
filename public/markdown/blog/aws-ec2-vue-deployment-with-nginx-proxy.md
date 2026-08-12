# 前後端分離部署:EC2 + Nginx + Render | Chris's Frontend & UI/UX Portfolio | 陳仟龍的作品集網站

> 用反向代理讓前後端共用同一個網域


這是在商研院前端班團隊專題 WanTrip 前端部署經驗（我們前端放 AWS EC2、後端放 Render）這篇紀錄 EC2 端的 Nginx 設定 + 反向代理串接後端的完整流程。


這篇紀錄在商研院前端班團隊專題 **WanTrip** 採用的部署架構：前端 Vue 放在 **AWS EC2**，後端放在 **Render** ，再用 **Nginx** 反向代理讓兩邊共用同一個網域。

## 整體架構

```
使用者 ──HTTPS──> 你的網域(wantrip.store) ──> EC2 (Nginx)
                                ├─ /         → /var/www/dist (Vue 靜態檔)
                                └─ /api/*    → 後端URL/*
```


## 需要的東西

- AWS 帳號（新帳號通常會有一筆免費額度，額度依當時方案而定）
- 已註冊的網域（本篇 DNS 設定以 GoDaddy 為例）
- 後端服務已部署完成，有後端的 URL（本篇以 Render 為例）
- 前端 Vue 專案的 GitHub repo

## Step 1：開一台 EC2 執行個體 (Instance)

EC2 是 AWS 提供的雲端主機 — 你可以選在哪裡開機(選地區)、作業系統、硬體規格，AWS 開好之後給你一個 IP，用 SSH + 金鑰對登入就能開始安裝軟體。

1. 右上角切換**區域**。預設是美國維吉尼亞州北部 (`us-east-1`)，建議切到**東京** (`ap-northeast-1`) 或**台北** (`ap-east-2`)。

   ![Select Region](https://res.cloudinary.com/dtzgfwzwf/image/upload/f_auto,q_auto/v1778689662/region_1_a0tts0.png)

2. AWS Console → EC2 → **啟動執行個體**

   ![Launch Instance](https://res.cloudinary.com/dtzgfwzwf/image/upload/f_auto,q_auto/v1778689664/step1_1_w2rmrh.png)

3. 「快速入門」選擇作業系統 **Ubuntu**

   ![Server](https://res.cloudinary.com/dtzgfwzwf/image/upload/f_auto,q_auto/v1778689665/step2_1_twbppy.png)

   > **為什麼選 Ubuntu**：教學資源最多、踩雷時 Google 最快找到答案，而且 22.04 LTS 支援到 2027 年，長期不用煩惱換系統。Amazon Linux 也是常見選項，跟 AWS 整合更深但社群小、套件偏舊。

4. 「執行個體類型」選 **t3.micro**（屬於免費方案範圍）

5. 設定「金鑰對」：**新建一組**，輸入金鑰名稱，下載 `.pem` 檔（這是之後 SSH 連線用的鑰匙，放在不容易誤刪的位置）

   ![Key](https://res.cloudinary.com/dtzgfwzwf/image/upload/f_auto,q_auto/v1778689667/step3_1_xbmkac.png)

6. 「安全群組」設定：
   - SSH (22) — 你的 IP
   - HTTP (80) — `0.0.0.0/0`
   - HTTPS (443) — `0.0.0.0/0`

   ![Security Group](https://res.cloudinary.com/dtzgfwzwf/image/upload/f_auto,q_auto/v1778689670/step4_1_bscc7b.png)

7. 點擊 **啟動執行個體**，等狀態變綠燈。

## Step 2：申請彈性 IP (Elastic IP)

EC2 預設用動態 IP，**重啟後 IP 會改變**，DNS 就會失聯。申請一個彈性 IP 綁定就解決。

1. 左側列表找到 **彈性 IP（Elastic IPs）**
2. **配置彈性 IP 位址**

   ![Elastic IPs](https://res.cloudinary.com/dtzgfwzwf/image/upload/f_auto,q_auto/v1778689672/step5_1_ufomyv.png)

3. 點選剛配置好的彈性 IP → **動作** → **與彈性 IP 位址建立關聯** → 選剛開好的執行個體

   ![Elastic IP Link](https://res.cloudinary.com/dtzgfwzwf/image/upload/f_auto,q_auto/v1778689675/step6_1_hkd477.png)

完成後，你的 EC2 就有一個固定不變的 public IP。

## Step 3：使用 SSH 連線到雲端主機

在電腦打開**終端機(Terminal)**，並輸入：
```bash
# 改 pem 權限為 600，否則 ssh 會拒絕讀
chmod 600 ~/downloads/[your-key.pem]

# 連線（IP 用 Step 2 綁好的彈性 IP）
ssh -i ~/downloads/[your-key.pem] ubuntu@[綁定好的彈性IP]
```

首次連線會問 `Are you sure you want to continue connecting? (yes/no)`，輸入 `yes`。

連進去後先更新系統：

```bash
sudo apt update && sudo apt upgrade -y
```

## Step 4：安裝 Nginx + Git

```bash
sudo apt install -y nginx git
sudo systemctl start nginx
sudo systemctl enable nginx
```

打開瀏覽器輸入 EC2 的彈性 IP，應該看到 Nginx 預設歡迎頁。

> 💡 這裡 **不裝 Node**：t3.micro 只有 1GB RAM，跑 `npm install + build` 容易記憶體不足(這會導致 build 這一步要等很久)。改成 **在本機 build 完之後上傳 `dist/`**，EC2 只負責 serve。

## Step 5：在本機 build 並上傳到 EC2

### 5-1. 設定環境變數

`.env.production` 加一行：

```env
VITE_API_BASE=/api
```

注意 **不是寫死後端網址**。前端只要打 `/api/...`，等下 Nginx 會幫你轉到 Render。程式碼裡這樣呼叫：

```js
// 例如：
fetch(`${import.meta.env.VITE_API_BASE}/hotels`)
// 實際請求路徑：/api/hotels
```

> ⚠️ Vite 環境變數是 **build-time 注入**，每次改 `.env.production` 都要重新 build，不能改完直接 push。

### 5-2. 本機 build

```bash
npm run build
```

這會在專案根目錄產生 `dist/`，就是要上傳的靜態檔案。

### 5-3. 用 scp 上傳到 EC2

先在 EC2 上建好目標資料夾：

```bash
# 在 EC2 上執行
mkdir -p /home/ubuntu/xxx-frontend
```

回到本機 Terminal：

```bash
# 在本機執行
scp -i ~/Downloads/your-key.pem -r ./dist ubuntu@彈性IP:/home/ubuntu/xxx-frontend/
```

上傳完，EC2 上 `/home/ubuntu/xxx-frontend/dist/` 就是 Nginx 等下要 serve 的目錄。

## Step 6：Nginx 反向代理設定

這是這篇的重點。目標：

- `https://yourdomain.com/` → Nginx serve `dist/`
- `https://yourdomain.com/api/*` → 轉發到 Render

在 EC2 上建立 Nginx 設定檔：

```bash
sudo nano /etc/nginx/sites-available/xxx-frontend
```

整個檔案內容換成：

```nginx
server {
  listen 80;
  server_name yourdomain.com www.yourdomain.com;

  root /home/ubuntu/xxx-frontend/dist;
  index index.html;

  # SPA fallback：所有路徑都讓 index.html 接，由 Vue Router 處理
  location / {
    try_files $uri $uri/ /index.html;
  }

  # API 反向代理：/api/* → Render 上的後端
  location /api/ {
    proxy_pass https://xxx.onrender.com/;
    proxy_http_version 1.1;
    proxy_ssl_server_name on;
    proxy_set_header Host xxx.onrender.com;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

### 幾個關鍵點

**1. `proxy_pass` 結尾斜線決定路徑改寫**

| 寫法 | 前端打 `/api/hotels` 會打到 |
|------|---------------------------|
| `proxy_pass https://xxx.onrender.com/;` ✅ | `https://xxx.onrender.com/hotels` |
| `proxy_pass https://xxx.onrender.com;` ❌ | `https://xxx.onrender.com/api/hotels` |

要看後端的路由設計來選。我們的後端路由是 `/hotels`（沒有 `/api` 前綴），所以用第一種，把 `/api` 前綴吃掉。

**2. `proxy_ssl_server_name on` 必加**

連 HTTPS 後端時，Nginx 要送 SNI 給對方，告訴對方「我要連的是 `xxx.onrender.com`」。Render 是 multi-tenant，沒送 SNI 它不知道要回哪個服務的憑證，就會 502。

**3. `proxy_set_header Host` 要設成後端的 host**

如果不設，Nginx 預設會帶你網域的 Host header 給 Render，Render 看不懂會 404。

## Step 7：啟用 Nginx 設定

```bash
# sites-available 是「可用」，sites-enabled 是「啟用中」
# 用 symlink 把設定啟用
sudo ln -s /etc/nginx/sites-available/xxx-frontend /etc/nginx/sites-enabled/

# 移除預設歡迎頁面，避免衝突
sudo rm /etc/nginx/sites-enabled/default

# 測試語法
sudo nginx -t

# Reload 讓設定生效（reload 不會中斷現有連線）
sudo systemctl reload nginx
```

打開瀏覽器 `http://你的彈性IP/` 應該看到前端；打 `/api/...` 應該看到後端回的資料。

## Step 8：DNS + HTTPS

### DNS 設定（以 GoDaddy 為例）

到 GoDaddy → 網域 → DNS 紀錄 → 新增紀錄，加入：

| 類型 | 名稱 | 值 |
|------|------|----|
| A | `@` | 你的彈性 IP |
| CNAME | `www` | `yourdomain.com` |

![GoDaddy Domain DNS](https://res.cloudinary.com/dtzgfwzwf/image/upload/f_auto,q_auto/v1778727192/domain_jyiyqi.png)

等 5–30 分鐘 DNS Propagation，可以用 `dig yourdomain.com` 確認。

### 申請 SSL（Certbot + Let's Encrypt）

```bash
sudo apt install -y certbot python3-certbot-nginx

sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Certbot 會自動：

- 申請 Let's Encrypt 憑證
- 在 Nginx config 加 `listen 443 ssl;` 區塊
- 設定 HTTP → HTTPS 自動跳轉
- 註冊 cron 自動續憑證（90 天到期前自動更新）

裝完 `https://yourdomain.com` 綠色鎖頭就會出現。

## Step 9：用 GitHub Actions 自動部署

每次更新都要 scp 一次太麻煩。設定 GitHub Actions，**push 到 main 就自動 build + 上傳**。

### 9-1. 在 GitHub repo 加 Secrets

GitHub → Settings → Secrets and variables → Actions → **Repository secrets**，新增：

| Secret 名稱 | 內容 |
|-------------|------|
| `EC2_HOST` | 你的彈性 IP |
| `EC2_USERNAME` | `ubuntu` |
| `EC2_SSH_KEY` | 你的 `.pem` **全部內容**（下方說明） |
| `VITE_ENV` | 專案環境變數（依需求） |
| `VITE_ENV_KEY` | 同上 |

#### 怎麼拿到 `EC2_SSH_KEY`

在**本機終端機 (Terminal)**（不是 EC2，`.pem` 鑰匙在本機）：

```bash
cat ~/Downloads/your-key.pem
```

複製**全部**內容，包含 header / footer：

```
-----BEGIN RSA PRIVATE KEY-----
...  ...
-----END RSA PRIVATE KEY-----
```

整段貼進 `EC2_SSH_KEY` 的值。

### 9-2. 新增 workflow 檔案

在專案根目錄建立 `.github/workflows/deploy.yml`：

```yaml
name: Deploy Frontend to AWS EC2

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v3

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20' # 專案node版本
          cache: 'npm'

      - name: Install Dependencies
        run: npm install

      - name: Create .env.production
        run: |
          echo "VITE_API_BASE=/api" > .env.production
          echo "VITE_SUPABASE_URL=${{ secrets.VITE_SUPABASE_URL }}" >> .env.production
          echo "VITE_SUPABASE_ANON_KEY=${{ secrets.VITE_SUPABASE_ANON_KEY }}" >> .env.production

      - name: Build Project
        run: npm run build

      - name: Deploy to EC2 via SCP
        uses: appleboy/scp-action@master
        with:
          host: ${{ secrets.EC2_HOST }}
          username: ${{ secrets.EC2_USERNAME }}
          key: ${{ secrets.EC2_SSH_KEY }}
          source: 'dist/*'
          target: '/home/ubuntu/wantrip-frontend/dist'
          strip_components: 1
          overwrite: true
```

push 到 main 之後，GitHub Actions 會自動 build + scp 上 EC2，30 秒內網站更新完成。

3. 完成!......

---

- 網頁版：https://chenchienlung.com/blog/aws-ec2-vue-deployment-with-nginx-proxy
- 分類：frontend, deploy
- 標籤：AWS, EC2, Ubuntu, Nginx, Render, 部署, 反向代理
- 發布時間：2026-05-12
- 閱讀時間：約 未提供 分鐘
