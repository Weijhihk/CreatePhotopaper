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
