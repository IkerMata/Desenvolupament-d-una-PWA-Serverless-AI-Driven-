export default defineNuxtConfig({
  runtimeConfig: {
    geminiApiKey: '', // Can be overridden by GEMINI_API_KEY env var
  },
  compatibilityDate: '2024-11-01',
  pwa: {
    workbox: {
      enabled: false // Desactiva el Service Worker en desarrollo para evitar errores de caché
    }
  },
  future: {
    compatibilityVersion: 4
  },
  devtools: { enabled: true },
  modules: ['@vite-pwa/nuxt'],
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'EstateFlow',
      short_name: 'EstateFlow',
      theme_color: '#4f46e5',
      icons: [
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png'
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable'
        }
      ]
    },
    workbox: {
      navigateFallback: '/'
    },
    devOptions: {
      enabled: true,
      type: 'module'
    }
  }
})
