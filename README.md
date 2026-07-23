# 🏏 16-0 | Cricket Squad Draft Challenge

![16-0 Cricket Squad Draft Banner](./docs/images/banner.svg)

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/Framework-React%2019-cyan.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue.svg)](https://www.typescriptlang.org/)
[![Capacitor](https://img.shields.io/badge/Mobile-Android%20Capacitor-purple.svg)](https://capacitorjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-teal.svg)](https://tailwindcss.com/)
[![Vercel Ready](https://img.shields.io/badge/Hosting-Vercel%20%2F%20Netlify-black.svg)](https://vercel.com/)

**Spin historic rosters, draft a rigid 11-player squad, balance team chemistry, and chase a flawless 16-0 undefeated season!**

[Live Web Demo](https://github.com/rakibyte/16-0-cricket-draft) &bull; [Android Build Guide](#-android-apk--aab-bundling) &bull; [Features](#-game-features)

</div>

---

## 🌟 Game Features

### 🎰 1. Reel Slot Drafting Engine
- **Spin Roster Pools**: Spin through historical franchise and country rosters across 17+ seasons.
- **Strict Unique Player Rules**: No player can be duplicated or featured twice in the XI!
- **Position & Role Strictness**: Openers, Wicketkeepers, Spinners, and Fast Bowlers must be drafted in their assigned pitch positions.

### 🏆 2. 16-Match Tournament Campaign & Playoffs
- **14 League Matches**: Win match points to top the points table.
- **Playoff Qualifiers & Grand Final**: Qualify for Qualifier 1, Eliminator, Qualifier 2, and the Grand Final trophy match!
- **Points Table & NRR**: Full net run rate (NRR) and detailed match scorecard simulations.

### 👑 3. All-Time XI Club & Country Multi-Season Mode
- Select your target Franchise or Country (*Chennai Super Kings*, *Mumbai Indians*, *Team India*, *Australia*, etc.).
- Spin exclusively through **all historical season rosters of that selected club/country** (`CSK 2008` $\rightarrow$ `CSK 2011` $\rightarrow$ `CSK 2018` $\rightarrow$ `CSK 2021`) to assemble your ultimate All-Time XI!

### 🎮 4. Live 3-Minute Multiplayer Rooms
- **Create & Join Private Rooms**: Generate a 6-digit Room Code (`CRIC-8492`) with customizable timers (3 Minutes / 180s).
- **Live Draft Countdown**: Ticking countdown timer banner during drafting.
- **Blind Simulation & Head-to-Head Opponents Scoreboard**: Players simulate in secret, then reveal final standings to crown the Room Champion 🏆!

### ✉️ 5. Personal Account & Guest Play Gate
- **2 Free Guest Seasons**: New players can play up to 2 guest draft runs without logging in.
- **Email Registration**: Register with email to save career stats, unlock unlimited runs, and sync across devices.

### 💰 6. Rewarded Video Ads & Monetization
- Watch 10-second sponsor video ads to earn +3 Re-spin Tokens or +100 Coins.
- Built-in monetization hooks ready for Google AdMob and Unity Ads SDKs.

---

## 📸 Image Showcase

| Feature | Preview |
| :--- | :--- |
| **38-0 Style Home Hub** | Clean landing menu with league selector & account profile |
| **Reel Slot Spinner** | Spin historic rosters & draft position-locked stars |
| **Cricket Pitch XI** | 11-player squad grid with chemistry rating calculation |
| **Multiplayer Room** | Live countdown timer & head-to-head opponent scoreboards |

---

## 🚀 Quick Start (Local Web Development)

```bash
# 1. Clone the repository
git clone https://github.com/rakibyte/16-0-cricket-draft.git

# 2. Navigate to project directory
cd 16-0-cricket-draft

# 3. Install dependencies
npm install

# 4. Start local Vite development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📱 Android APK & AAB Bundling

Build native Android APK / AAB bundles using **Capacitor**:

```bash
# 1. Build production web distribution bundle
npm run build

# 2. Add Capacitor Android platform (first time)
npx cap add android

# 3. Sync web assets with native Android project
npx cap sync android

# 4. Open in Android Studio to build APK or signed AAB
npx cap open android
```

In **Android Studio**:
1. Go to **Build > Build Bundle(s) / APK(s) > Build APK(s)**.
2. Output location: `android/app/build/outputs/apk/debug/app-debug.apk`.

---

## 🌐 One-Click Live Web Hosting

### Deploy to Vercel
1. Push your repository to GitHub.
2. Import the repo into **[Vercel](https://vercel.com)**.
3. Vercel automatically detects Vite & `vercel.json` SPA routing!

### Deploy to Netlify
1. Import the repo into **[Netlify](https://netlify.com)**.
2. Build Command: `npm run build`
3. Publish Directory: `dist` (`public/_redirects` handles SPA routes automatically).

---

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS, Lucide Icons, Canvas Confetti
- **State Management**: Zustand
- **Mobile Runtime**: Capacitor 7 (Android & iOS ready)
- **Deployment**: Vercel, Netlify, Cloudflare Pages

---

## 📄 License

This project is licensed under the **MIT License**.
