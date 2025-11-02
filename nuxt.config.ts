// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig: {
    // Configuration du niveau de log via variables d'environnement
    logLevel: process.env.NUXT_LOG_LEVEL || 'info',
    // Format des logs (pretty ou json)
    logFormat: process.env.NUXT_LOG_FORMAT || 'pretty',
    // Configuration Firebase
    firebase: {
      useEmulator: process.env.NUXT_FIREBASE_USE_EMULATOR === 'true',
      projectId: process.env.NUXT_FIREBASE_PROJECT_ID || 'mmahub-dev',
      emulatorHost: process.env.NUXT_FIRESTORE_EMULATOR_HOST || 'localhost:8080'
    }
  },
  nitro: {
    firebase: {
      gen: 2,
      httpsOptions: {
        maxInstances: 3,
        region: 'europe-west1'
      }
    },
    output: {
      dir: 'dist/nuxt'
    }
  }
})
