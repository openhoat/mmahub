import { getFirestoreInstance } from '../utils/firebase'
import { WeightClass } from '../crawlers/ufc'
import { useLogger } from '../utils/logger'

const COLLECTION_WEIGHT_CLASSES = 'weightClasses'

/**
 * Interface pour les catégories de poids avec informations de cache
 */
export interface CachedWeightClass extends WeightClass {
  lastUpdated: Date
  cacheExpiration: Date
}

/**
 * Calcule la date d'expiration du cache
 * @returns Date d'expiration
 */
function getCacheExpiration(): Date {
  const cacheDurationHours = parseInt(process.env.UFC_DATA_CACHE_DURATION_HOURS || '24', 10)
  const expiration = new Date()
  expiration.setHours(expiration.getHours() + cacheDurationHours)
  return expiration
}

/**
 * Vérifie si le cache est expiré
 * @param lastUpdated Date de dernière mise à jour
 * @returns true si le cache est expiré
 */
export function isCacheExpired(lastUpdated: Date): boolean {
  const cacheDurationHours = parseInt(process.env.UFC_DATA_CACHE_DURATION_HOURS || '24', 10)
  const expirationTime = new Date(lastUpdated.getTime() + cacheDurationHours * 60 * 60 * 1000)
  return new Date() > expirationTime
}

/**
 * Stocke les catégories de poids dans Firestore avec informations de cache
 * @param weightClasses Catégories de poids à stocker
 * @returns Promise résolue quand le stockage est terminé
 */
export const storeWeightClasses = async (weightClasses: WeightClass[]): Promise<boolean> => {
  const logger = useLogger()
  try {
    const firestore = getFirestoreInstance()
    if (!firestore) {
      logger.warn('Firestore not initialized. Skipping store operation.')
      return false
    }

    const batch = firestore.batch()
    const collectionRef = firestore.collection(COLLECTION_WEIGHT_CLASSES)

    // Supprimer les anciens documents
    const snapshot = await collectionRef.get()
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref)
    })

    // Ajouter les nouveaux documents avec informations de cache
    const timestamp = new Date()
    const cacheExpiration = getCacheExpiration()
    weightClasses.forEach((weightClass) => {
      const docRef = collectionRef.doc()
      batch.set(docRef, {
        ...weightClass,
        lastUpdated: timestamp,
        cacheExpiration: cacheExpiration
      })
    })

    // Exécuter le batch
    await batch.commit()
    logger.info(`Stored ${weightClasses.length} weight classes in Firestore with cache expiration at ${cacheExpiration.toISOString()}`)
    return true
  } catch (error) {
    logger.error('Error storing weight classes in Firestore:', error)
    return false
  }
}

/**
 * Récupère les catégories de poids depuis Firestore avec vérification du cache
 * @returns Promise avec les catégories de poids et informations de cache, ou null en cas d'erreur
 */
export const getStoredWeightClassesWithCacheInfo = async (): Promise<{weightClasses: WeightClass[], lastUpdated: Date, cacheExpiration: Date} | null> => {
  const logger = useLogger()
  try {
    const firestore = getFirestoreInstance()
    if (!firestore) {
      logger.warn('Firestore not initialized. Cannot retrieve weight classes.')
      return null
    }

    const snapshot = await firestore.collection(COLLECTION_WEIGHT_CLASSES).get()
    if (snapshot.empty) {
      return null
    }

    const weightClasses: WeightClass[] = []
    let lastUpdated: Date = new Date(0)
    let cacheExpiration: Date = new Date(0)

    snapshot.forEach((doc) => {
      const data = doc.data()
      weightClasses.push({
        name: data.name,
        url: data.url,
        champion: data.champion
      })
      
      // Utiliser les dates du premier document (tous ont la même date)
      if (data.lastUpdated && (!lastUpdated || data.lastUpdated.toDate() > lastUpdated)) {
        lastUpdated = data.lastUpdated.toDate()
      }
      if (data.cacheExpiration && (!cacheExpiration || data.cacheExpiration.toDate() > cacheExpiration)) {
        cacheExpiration = data.cacheExpiration.toDate()
      }
    })

    logger.info(`Retrieved ${weightClasses.length} weight classes from Firestore (last updated: ${lastUpdated.toISOString()})`)
    return { weightClasses, lastUpdated, cacheExpiration }
  } catch (error) {
    logger.error('Error retrieving weight classes from Firestore:', error)
    return null
  }
}
