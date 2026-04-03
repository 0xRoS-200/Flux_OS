# Flux Payments OS

A premium, modern, and offline-first personal finance dashboard built with React, Vite, TailwindCSS, and Zustand. It operates 100% locally on your machine, requiring zero cloud dependencies or backend servers.

<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/1d457839-5ffc-48cd-bd98-bd4fe9187989" />


## Features
- **Offline-First Storage:** Uses IndexedDB via Zustand for secure, persistent local caching. 
- **PWA Ready:** Installable as a native desktop/mobile application.
- **Responsive Theming:** Gorgeous, seamless support for system-native Light and Dark modes.
- **High-Performance UI:** Buttery smooth GSAP orchestrated layout animations.
- **Client-Side Data Portability:** Supports explicit local backup & restoration via CSV serialization and physical image-to-base64 uploads.
- **Zero Backend:** Fully local logic designed to keep your private financial data strictly on your physical device.

---

## 💡 Development Approach
This dashboard was built with an emphasis on **speed, privacy, and architectural scalability**.

- **Focus on Architecture:** Instead of building a complex backend stack, effort was intentionally directed toward creating a robust, zero-latency frontend state framework. Zustand was used with local persistence to handle data beautifully without API overhead.
- **Rapid Prototyping:** Modern developer tooling and component-driven workflows were utilized to rapidly scaffold the Tailwind UI boilerplate. This accelerated the development cycle, allowing more focus to be placed on UX details, seamless transitions (GSAP/Dark Mode), and data handling logic (local CSV bridging). 
- **Design Driven:** The UI actively avoids standard, generic templates in favor of a customized, premium "intelligence terminal" aesthetic designed to be highly responsive and intuitive.

---

## 🚀 Installation & Setup

### Prerequisites
Make sure you have **Node.js** and **Yarn** installed on your system.

### 1. Initialize Project
Navigate to the project directory and install the required dependencies:
```bash
cd Flux_OS
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
