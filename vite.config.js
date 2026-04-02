import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      includeAssets: ['zoro.jpg'],
      devOptions: {
        enabled: true,
        type: 'module',
      },
      manifest: {
        name: 'Flux Payments',
        short_name: 'Flux',
        description: 'Flux Payments - Handle Expenses with Ease',
        theme_color: '#FAFAFA',
        background_color: '#FAFAFA',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: 'zoro.jpg',
            sizes: '192x192',
            type: 'image/jpeg'
          },
          {
            src: 'zoro.jpg',
            sizes: '512x512',
            type: 'image/jpeg'
          }
        ]
      }
    })
  ],
})
