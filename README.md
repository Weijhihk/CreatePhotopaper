<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# CreatePhotopaper Project

This repository contains a React application built with Vite, designed for developing and managing photopapers, and ready for deployment to GitHub Pages.

## Run Locally

**Prerequisites:** Node.js (v20+ recommended)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Variables:**
   - Copy the `.env.example` template to a new file named `.env` locally.
   - Fill in your `GEMINI_API_KEY` inside `.env`.
   - *Security Note: Never commit `.env` files to the repository. They are ignored by `.gitignore` by default to prevent leaking secrets.*

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   The application will be accessible at `http://localhost:3000`.

## Deployment to GitHub Pages

This project is configured to automatically deploy to GitHub Pages using GitHub Actions.

1. **Automatic Triggers:** Any push to the `main` branch triggers the deployment workflow located in `.github/workflows/deploy.yml`.
2. **Build Process:** The workflow automatically installs dependencies, runs `npm run build`, and safely deploys the generated site.
3. **Check Status:** You can view the deployment progress under the **Actions** tab in your GitHub repository. Once successful, your application is live!

### Configuration Details
- **Base Path:** The `base` property in `vite.config.ts` has been set to `'/CreatePhotopaper/'` to match this repository's structure on GitHub Pages. If the repository name changes in the future, ensure this configuration is updated accordingly.
- **Ignored Files:** The `.gitignore` file guarantees that `node_modules/`, `dist/`, `out/`, and private environment files (`.env*`) remain out of the repository.
---

# CreatePhotopaper 專案

本儲存庫包含一個使用 Vite 構建的 React 應用程式，專為開發與管理施工照片報表而設計，並已配置好可部署至 GitHub Pages。

## 本地運行

**前置條件：** 建議安裝 Node.js (v20+)

1. **安裝依賴項目：**
   ```bash
   npm install
   ```

2. **環境變數：**
   - 在本地將 `.env.example` 範本複製並重新命名為 `.env`。
   - 在 `.env` 中填入您的 `GEMINI_API_KEY`。
   - *安全提示：請勿將 `.env` 檔案提交至儲存庫。預設情況下，`.gitignore` 會忽略這些檔案以防止金鑰外洩。*

3. **啟動開發伺服器：**
   ```bash
   npm run dev
   ```
   應用程式可透過 `http://localhost:3000` 存取。

## 部署至 GitHub Pages

本專案已配置為使用 GitHub Actions 自動部署至 GitHub Pages。

1. **自動觸發：** 任何對 `main` 分支的推送（Push）都會觸發位於 `.github/workflows/deploy.yml` 的部署工作流。
2. **構建流程：** 工作流會自動安裝依賴項目、執行 `npm run build`，並安全地部署生成的網站。
3. **檢查狀態：** 您可以在 GitHub 儲存庫的 **Actions** 分頁中查看部署進度。成功後，您的應用程式即會上線！

### 配置詳情
- **基本路徑（Base Path）：** `vite.config.ts` 中的 `base` 屬性已設定為 `'/CreatePhotopaper/'`，以符合此儲存庫在 GitHub Pages 上的結構。如果未來更名儲存庫，請確保更新此配置。
- **忽略檔案：** `.gitignore` 確保了 `node_modules/`、`dist/`、`out/` 以及私有環境變數檔案 (`.env*`) 不會被提交至儲存庫。
