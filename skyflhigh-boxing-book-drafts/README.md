# 🥊 SkyFlHigh: Interactive Boxing Book Components (Drafts)

This folder contains premium, visual, and highly interactive React + Tailwind CSS components designed for your digital boxing book. Once you set up your project on your laptop, you can drop these files directly into your repository.

## 📁 File Structure & Where to Put Them

*   `README.md` (This guide)
*   `ReadingLayout.tsx` ➡️ Put in `src/components/ReadingLayout.tsx`
    *   *The shell UI including sidebar navigation, dark athletic theme, reading controls, and chapter progress indicators.*
*   `StanceSelector.tsx` ➡️ Put in `src/components/StanceSelector.tsx`
    *   *An interactive SVG stance selector allowing users to switch between Orthodox and Southpaw, visually detailing foot placement, weight distribution, and stance angle.*

## 🚀 How to Run Them Locally

1.  **Initialize Next.js App**:
    In your terminal, run:
    ```bash
    npx create-next-app@latest skyflhigh-boxing-book --typescript --tailwind --app --src-dir --import-alias "@/*"
    cd skyflhigh-boxing-book
    ```

2.  **Install animation and icon dependencies**:
    ```bash
    npm install framer-motion lucide-react clsx tailwind-merge
    ```

3.  **Configure Tailwind Colors**:
    In your `tailwind.config.ts` or `tailwind.config.js`, add these custom athletic colors:
    ```javascript
    theme: {
      extend: {
        colors: {
          boxing: {
            bg: '#121212',
            card: '#1E1E1E',
            red: '#FF3B30',
            gold: '#FFD60A',
            gray: '#8E8E93',
          }
        }
      }
    }
    ```

4.  **Copy the Components**:
    Copy these draft files into your `src/components/` directory and import them into your main `src/app/page.tsx` file to see them live!
