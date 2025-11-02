import { fetchWeightClasses } from '../crawlers/ufc'
import { 
  storeWeightClasses, 
  getStoredWeightClassesWithCacheInfo,
  isCacheExpired
} from '../services/firestore.service'
import { useLogger } from '~/server/utils/logger'

export default defineEventHandler(async (event) => {
  const logger = useLogger()
  
  try {
    // Récupérer les données depuis Firestore avec informations de cache
    const cachedData = await getStoredWeightClassesWithCacheInfo()
    
    // Vérifier si les données en cache existent et ne sont pas expirées
    if (cachedData && !isCacheExpired(cachedData.lastUpdated)) {
      logger.info('Using cached UFC weight classes data from Firestore')
      
      // Définir le type de contenu comme JSON
      event.node.res.setHeader('Content-Type', 'application/json')
      return {
        success: true,
        data: cachedData.weightClasses,
        source: 'cache',
        lastUpdated: cachedData.lastUpdated.toISOString(),
        cacheExpiration: cachedData.cacheExpiration.toISOString()
      }
    } else {
      logger.info('Fetching fresh UFC weight classes data from source')
      
      try {
        // Récupérer les données depuis la source
        const weightClasses = await fetchWeightClasses()
        
        // Stocker les données dans Firestore
        const storeSuccess = await storeWeightClasses(weightClasses)
        
        if (!storeSuccess) {
          logger.warn('Failed to store weight classes in Firestore, but returning fresh data')
        }
        
        // Définir le type de contenu comme JSON
        event.node.res.setHeader('Content-Type', 'application/json')
        
        // Retourner les données fraîches avec informations de cache
        const cachedData = await getStoredWeightClassesWithCacheInfo()
        return {
          success: true,
          data: weightClasses,
          source: 'fresh',
          lastUpdated: cachedData ? cachedData.lastUpdated.toISOString() : new Date().toISOString(),
          cacheExpiration: cachedData ? cachedData.cacheExpiration.toISOString() : new Date(Date.now() + parseInt(process.env.UFC_DATA_CACHE_DURATION_HOURS || '24', 10) * 60 * 60 * 1000).toISOString()
        }
      } catch (error: any) {
        // Si le cache existe mais est expiré, et qu'on ne peut pas récupérer de nouvelles données
        if (cachedData) {
          logger.warn('Failed to fetch fresh data, returning expired cache')
          event.node.res.setHeader('Content-Type', 'application/json')
          return {
            success: true,
            data: cachedData.weightClasses,
            source: 'cache-expired',
            lastUpdated: cachedData.lastUpdated.toISOString(),
            cacheExpiration: cachedData.cacheExpiration.toISOString(),
            warning: 'Data is expired, failed to fetch fresh data'
          }
        } else {
          // Aucune donnée en cache et échec du crawling
          logger.error('API Error - Failed to fetch data:', error)
          event.node.res.setHeader('Content-Type', 'application/json')
          return {
            success: false,
            error: error.message || 'Failed to fetch weight classes from source',
            lastAttempt: new Date().toISOString()
          }
        }
      }
    }
  } catch (error: any) {
    logger.error('API Error:', error)
    // Définir le type de contenu comme JSON en cas d'erreur aussi
    event.node.res.setHeader('Content-Type', 'application/json')
    return {
      success: false,
      error: error.message || 'Failed to fetch weight classes'
    }
  }
})
