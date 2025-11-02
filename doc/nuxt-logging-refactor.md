# Refactorisation du système de logging avec Nuxt Pino Log

## Introduction

Ce document décrit la refactorisation du système de logging de l'application MMA Hub pour utiliser le module Nuxt `nuxt-pino-log` et respecter les bonnes pratiques Nuxt pour la gestion des variables d'environnement.

## Objectifs

1. Remplacer le système de logging personnalisé par le module Nuxt standard `nuxt-pino-log`
2. Utiliser les variables d'environnement standard Nuxt
3. Supprimer le code personnalisé pour le logging et la gestion des variables d'environnement
4. Assurer une uniformité du logging serveur/frontend

## Changements effectués

### 1. Installation du module

Le module `nuxt-pino-log` a été installé via pnpm :
```bash
npx pnpm add nuxt-pino-log
```

### 2. Configuration dans nuxt.config.ts

Le module a été configuré dans `nuxt.config.ts` avec :
- Utilisation des variables d'environnement standard Nuxt (`NUXT_LOG_LEVEL`, `NUXT_LOG_FORMAT`)
- Configuration du format "pretty" par défaut pour le développement
- Intégration avec le système de configuration runtime de Nuxt

### 3. Mise à jour des variables d'environnement

Les variables d'environnement ont été migrées vers le format standard Nuxt :
```env
# Niveau de log (fatal, error, warn, info, debug, trace, silent)
NUXT_LOG_LEVEL=info

# Format des logs (pretty, json)
NUXT_LOG_FORMAT=pretty
```

### 4. Création d'un utilitaire de logging

Un nouveau fichier `server/utils/logger.ts` a été créé pour fournir une interface unifiée vers le logger :
```typescript
import { useLogger } from '#imports'

export const getLogger = () => {
  return useLogger()
}

export type Logger = ReturnType<typeof useLogger>
```

### 5. Mise à jour de tous les fichiers

Tous les fichiers utilisant l'ancien système de logging ont été mis à jour :
- Services Firestore
- API weight-classes
- Tâches de crawling
- Plugin Nitro
- Services Firebase
- Crawlers

### 6. Simplification de env.helper.ts

Le fichier `server/utils/env.helper.ts` a été simplifié pour utiliser le système standard Nuxt.

## Avantages de la refactorisation

### 1. Standardisation
- Utilisation d'un module Nuxt officiel et maintenu
- Respect des conventions et bonnes pratiques Nuxt
- Code plus lisible et maintenable

### 2. Configuration flexible
- Variables d'environnement standard Nuxt
- Configuration différente pour développement/production
- Format des logs configurable (pretty/json)

### 3. Performance
- Module optimisé et maintenu par la communauté
- Meilleure gestion des ressources
- Support des transports Pino

### 4. Uniformité
- Logging cohérent serveur/frontend
- Mêmes niveaux de log et formats
- Interface unifiée dans toute l'application

## Utilisation

### Configuration des niveaux de log

Le niveau de log peut être configuré via la variable d'environnement `NUXT_LOG_LEVEL` :
```env
NUXT_LOG_LEVEL=info  # fatal, error, warn, info, debug, trace, silent
```

### Configuration du format

Le format des logs peut être configuré via la variable d'environnement `NUXT_LOG_FORMAT` :
```env
NUXT_LOG_FORMAT=pretty  # pretty ou json
```

### Utilisation dans le code

Pour utiliser le logger dans le code :
```typescript
import { getLogger } from '../utils/logger'

export const maFonction = async () => {
  const logger = getLogger()
  logger.info('Message d\'information')
  logger.warn('Message d\'avertissement')
  logger.error('Message d\'erreur')
}
```

## Tests effectués

Les tests effectués comprennent :
1. Vérification de la compilation sans erreurs
2. Vérification du bon fonctionnement des crawlers
3. Vérification de l'affichage des logs dans la console
4. Vérification de la configuration via variables d'environnement
5. Test du format pretty/json

## Prochaines étapes

1. Étendre l'utilisation du logger à d'autres parties de l'application
2. Ajouter des transports de log supplémentaires si nécessaire (fichiers, services externes)
3. Configurer des niveaux de log différents pour développement/production
4. Ajouter des loggers spécifiques pour différents modules si nécessaire

## Migration depuis l'ancien système

### Ancien code :
```typescript
import { buildLogger } from '../utils/logger'
const logger = buildLogger({ logLevel: 'info' })
logger.info('Message')
```

### Nouveau code :
```typescript
import { getLogger } from '../utils/logger'
const logger = getLogger()
logger.info('Message')
```

La principale différence est que le logger est maintenant configuré automatiquement via le module Nuxt, et la configuration est centralisée dans `nuxt.config.ts`.
