import { consola } from 'consola'

/**
 * Récupère l'instance du logger configuré
 * @returns Logger configuré
 */
export const useLogger = () => {
  // Configurer le niveau de log depuis les variables d'environnement
  const logLevel = process.env.NUXT_LOG_LEVEL || 'info'
  consola.level = getLogLevel(logLevel)
  
  return consola
}

/**
 * Convertit le niveau de log en niveau numérique pour consola
 * @param level Niveau de log en chaîne
 * @returns Niveau de log numérique
 */
function getLogLevel(level: string): number {
  switch (level.toLowerCase()) {
    case 'fatal': return 0
    case 'error': return 1
    case 'warn': return 2
    case 'info': return 3
    case 'debug': return 4
    case 'trace': return 5
    case 'silent': return -1
    default: return 3 // info par défaut
  }
}

// Exporter les types pour la compatibilité
export type Logger = typeof consola
