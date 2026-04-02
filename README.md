# Flux Payments OS

A premium, modern, and offline-first personal finance dashboard built with React, Vite, TailwindCSS, and Zustand. It operates 100% locally on your machine, requiring zero cloud dependencies or backend servers.

![Flux Screenshot Placeholder](#)

## Features
- **Offline-First Storage:** Uses IndexedDB via Zustand for secure, persistent local caching. 
- **PWA Ready:** Installable as a native desktop/mobile application.
- **Responsive Theming:** Gorgeous, seamless support for system-native Light and Dark modes.
- **High-Performance UI:** Buttery smooth GSAP orchestrated layout animations.
- **Client-Side Data Portability:** Supports explicit local backup & restoration via CSV serialization and physical image-to-base64 uploads.
- **Zero Backend:** Fully local logic designed to keep your private financial data strictly on your physical device.

---

## 🚀 Installation & Setup

### Prerequisites
Make sure you have **Node.js** and **Yarn** installed on your system.

### 1. Initialize Project
Navigate to the project directory and install the required dependencies:
```bash
cd zorvyn-assessment
yarn install
```

### 2. Development Mode
To start the local Vite development server with Hot Module Replacement (HMR):
```bash
yarn dev
```
Open your browser and navigate to the address shown in your terminal (usually `http://localhost:5173`).

---

## 🛠️ Building for Production
To compile and generate a highly optimized production-ready bundle with full Progressive Web App (PWA) service worker generation:
```bash
yarn build
```

You can locally preview the built production app by running:
```bash
yarn preview
```

---

## 🏗️ Technology Stack
- **Core Engine:** React 18 + Vite
- **State Management:** Zustand (w/ Persistence Middleware)
- **Styling:** TailwindCSS
- **Animations:** GSAP (`@gsap/react`)
- **Icons:** Lucide React
- **PWA:** `vite-plugin-pwa`
