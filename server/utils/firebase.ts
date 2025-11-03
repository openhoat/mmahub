import { type App, cert, getApps, initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { useLogger } from '../utils/logger'

let firestoreInstance: ReturnType<typeof getFirestore> | null = null

/**
 * Initialise Firebase Admin SDK avec support de l'émulateur
 * @returns Instance Firestore
 */
export const initializeFirebase = () => {
  const logger = useLogger()
  try {
    // Vérifier si Firebase est déjà initialisé
    if (getApps().length > 0) {
      logger.info('Firebase already initialized')
      return getFirestore()
    }

    // Vérifier si nous devons utiliser l'émulateur
    const useEmulator = process.env.NUXT_FIREBASE_USE_EMULATOR === 'true'

    if (useEmulator) {
      logger.info('Using Firebase Emulator')

      // Initialiser Firebase avec une configuration minimale pour l'émulateur
      const app = initializeApp({
        projectId: process.env.NUXT_FIREBASE_PROJECT_ID || 'mmahub-dev',
      })

      // Initialiser Firestore
      firestoreInstance = getFirestore(app)

      // Connecter à l'émulateur
      const emulatorHost =
        process.env.NUXT_FIRESTORE_EMULATOR_HOST || 'localhost:8080'
      firestoreInstance.settings({
        host: emulatorHost,
        ssl: false,
      })

      logger.info(`Connected to Firestore Emulator at ${emulatorHost}`)
      return firestoreInstance
    }

    // Si l'émulateur n'est pas activé, initialiser Firebase avec les credentials appropriés
    // Vérifier si les variables d'environnement du compte de service sont définies
    const clientEmail = process.env.NUXT_FIREBASE_SERVICE_ACCOUNT_CLIENT_EMAIL
    const privateKey = process.env.NUXT_FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY
    const projectId =
      process.env.NUXT_FIREBASE_PROJECT_ID ||
      process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID

    let app: App
    if (clientEmail && privateKey && projectId) {
      // Utiliser les credentials du compte de service
      logger.info('Initializing Firebase with service account credentials')
      app = initializeApp({
        credential: cert({
          clientEmail,
          privateKey: privateKey.replace(/\\n/g, '\n'),
          projectId,
        }),
      })
    } else {
      // Initialiser Firebase avec les credentials par défaut
      // Cela permettra d'utiliser les variables d'environnement du système ou le fichier de credentials par défaut
      logger.info('Initializing Firebase with default credentials')
      app = initializeApp()
    }

    // Initialiser Firestore
    firestoreInstance = getFirestore(app)
    logger.info('Firebase initialized successfully with project ID:', projectId)

    return firestoreInstance
  } catch (error) {
    logger.error('Error initializing Firebase:', error)
    return null
  }
}

/**
 * Récupère l'instance Firestore
 * @returns Instance Firestore ou null si non initialisée
 */
export const getFirestoreInstance = () => {
  if (firestoreInstance) {
    return firestoreInstance
  }

  return initializeFirebase()
}
