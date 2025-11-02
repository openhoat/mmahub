import { setGlobalOptions } from 'firebase-functions/v2'
import { onRequest } from 'firebase-functions/v2/https'

// Définir les options globales
setGlobalOptions({
  region: 'europe-west1', // Région européenne comme demandé
  memory: '1GiB',
  timeoutSeconds: 30,
})

// Créer la fonction Firebase
export const nuxtApp = onRequest(async (req, res) => {
  try {
    // Importer dynamiquement le handler Nuxt
    const { handler } = await import('./.output/server/index.mjs')
    // Ajouter les headers CORS si nécessaire
    res.set('Access-Control-Allow-Origin', '*')
    res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    // Gérer les requêtes OPTIONS pour CORS
    if (req.method === 'OPTIONS') {
      res.status(204).send('')
      return
    }
    // Appeler le handler Nuxt
    return handler(req, res)
  } catch (error) {
    console.error('Error loading Nuxt app:', error)
    res.status(500).send('Internal Server Error')
  }
})
