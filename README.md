# 🏏 16-0: Modern Cricket Squad Draft Challenge

> **16-0** is a high-performance, web-based cricket squad drafting game inspired by the viral 38-0 football draft mechanics. Draft an unbeatable XI using historical & modern franchise cricket teams (IPL 2008–Present, Big Bash League, World Cricket) and chase an undefeated 16-0 season!

![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.1-646CFF?logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?logo=tailwindcss&logoColor=white)
![Zustand](https://img.shields.io/badge/State-Zustand-764ABC)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 🌟 Key Features

### 🎰 1. [CLUB] × [SEASON] Reel Slot Spinner
- **Dual Slot Reel Engine**: Tapping **Spin** or pressing <kbd>Space</kbd> spins two digital slot reels: **[ CLUB / TEAM ]** × **[ SEASON / YEAR ]**.
- **Massive Roster Scope**:
  - **IPL Mode**: Draft from seasons spanning 2008 to present (RR 2008, Deccan Chargers 2009, CSK 2011/2018, KKR 2012/2024, MI 2013/2020, SRH 2016/2024, RCB 2016, DC 2020, GT 2022).
  - **Big Bash (BBL) Mode**: Draft from BBL|01 to BBL|13 (Sydney Sixers, Perth Scorchers, Adelaide Strikers, Melbourne Stars, Brisbane Heat).
  - **World Cricket Mode**: Iconic international rosters (West Indies 1979, India 1983, Australia 1999, India 2007 T20, India 2011 WC, England 2019, India 2024 T20).
- **Strict Roster Rule**: Zero PSL / Pakistani teams or players across all datasets.

### 🔒 2. Unique Player Constraint
- Once a player (e.g., *MS Dhoni*, *Virat Kohli*, *Jasprit Bumrah*) is locked into an XI slot, they are globally tracked for that run and **cannot be selected again** in subsequent spins.

### 🧠 3. Easy Mode vs Hard Mode
- **Easy Mode (Guided)**: Displays all numeric player OVR ratings, role fit percentages (100%, 85%, 35%), chemistry bars, and win probability hints.
- **Hard Mode (Purist / Hardcore)**: Hides numeric ratings and fit percentages (`???`), testing your authentic cricket IQ!

### 🏆 4. Tournament Campaign, 8-Team Points Table & Playoff Knockout
- **14 League Matches + Playoffs**: Real-time match-by-match ticker with audio and haptic feedback.
- **Live 8-Team Points Table**: Track P, W, L, T, NRR, and PTS alongside 7 AI opponent franchises.
- **IPL / BBL Playoff Format**: **Qualifier 1** (1st vs 2nd), **Eliminator** (3rd vs 4th), **Qualifier 2**, and **Grand Final** trophy match!

### 🥇 5. Global XI Hall of Fame Leaderboard
- Pick your gamer handle/username and submit your completed squad to the global leaderboard.
- **Algorithmic Squad Ranking Formula**:
  $$\text{Score} = (\text{Wins} \times 100) + (\text{Squad OVR} \times 10) + (\text{Chemistry} \times 5) + (\text{IsChampion} ? 500 : 0)$$

### 📊 6. Viral Emoji Grid & Card Export
- Auto-generates a 16-match emoji result grid (`🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩`) formatted for WhatsApp and X (Twitter), plus a one-click PNG image exporter.

---

## 🛠️ Technology Stack

| Component | Technology |
|---|---|
| **Framework** | React 19 + TypeScript (Vite 8) |
| **Styling** | Tailwind CSS v4 + Glassmorphic UI Tokens |
| **State Management** | Zustand (Persistent local state) |
| **Animations & Haptics** | Framer Motion + Web Haptics API (`navigator.vibrate`) |
| **Audio Synthesizer** | Web Audio API (Procedural sound synthesis, zero MP3 assets) |
| **Image Export** | `html-to-image` (Canvas PNG rendering) |
| **Confetti** | `canvas-confetti` |

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/16-0-cricket-draft.git

# 2. Navigate to project directory
cd 16-0-cricket-draft

# 3. Install dependencies
npm install

# 4. Launch development server
npm run dev
```

The application will be available at `http://localhost:5173/`.

### Production Build

```bash
# Type check and build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 📂 Project Structure

```
16-0-cricket-draft/
├── src/
│   ├── components/
│   │   ├── common/         # Header, Modal, AdRewardModal
│   │   ├── draft/          # ReelSpinner, PlayerPickerModal
│   │   ├── pitch/          # CricketPitch, SquadSlotCard, ChemistryBar
│   │   ├── meta/           # TrophyCabinetModal, LeaderboardModal
│   │   ├── simulation/     # MatchSimulator, MatchScorecardModal
│   │   └── share/          # ShareModal
│   ├── data/
│   │   ├── mockTeams.ts    # Historical IPL, BBL & World Cricket Roster Dataset
│   │   ├── slotsConfig.ts  # 11 Rigid Squad Slot Definitions
│   │   └── achievements.ts # Trophy Cabinet Definitions
│   ├── store/
│   │   └── useGameStore.ts # Zustand Central Store & Persistence
│   ├── types/
│   │   └── game.ts         # TypeScript Interfaces
│   ├── utils/
│   │   ├── chemistry.ts   # Synergy & Position Mismatch Calculator
│   │   ├── simEngine.ts   # Weighted RNG Match Simulator & Points Table Generator
│   │   ├── soundEngine.ts # Web Audio API Synthesizer
│   │   └── hapticEngine.ts# Web Haptics Wrapper
│   ├── App.tsx             # Main Layout
│   └── main.tsx            # Entry Point
├── public/
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
