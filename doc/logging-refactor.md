# Refactorisation du système de logging

## Introduction

Ce document décrit les changements apportés au système de logging de l'application MMA Hub pour remplacer tous les `console.log` par le logger centralisé et mettre en place un système d'injection de dépendances cohérent.

## Objectifs

1. Remplacer tous les `console.log`, `console.error`, `console.warn` et `console.info` par le logger centralisé
2. Mettre en place un système d'injection de dépendances pour le logger
3. Assurer une cohérence dans l'utilisation du logger à travers l'application
4. Maintenir la traçabilité des logs avec des niveaux de log appropriés

## Changements effectués

### 1. Fichiers modifiés

#### `server/utils/env.helper.ts`
- Ajout de l'import du logger
- Remplacement de `console.log` par `logger.info`

#### `server/crawlers/fightmatrix.ts`
- Ajout de l'import du logger
- Remplacement de `console.error` par `logger.error`

#### `server/crawlers/ufc.ts`
- Ajout de l'import du logger
- Remplacement de `console.error` par `logger.error`

#### `server/services/firestore.service.ts`
- Modification de la signature des fonctions pour accepter un logger en paramètre
- Remplacement des appels à `getFirestoreInstance()` par `getFirestoreInstance(logger)`
- Mise à jour de tous les appels aux fonctions du service pour passer le logger

#### `server/api/weight-classes.ts`
- Création d'une instance de logger locale dans le handler
- Mise à jour des appels aux fonctions du service Firestore pour passer le logger

#### `server/tasks/ufc-crawler.task.ts`
- Modification de la signature de la fonction `runUfcCrawlerTask` pour accepter un logger en paramètre
- Mise à jour des appels aux fonctions du service Firestore pour passer le logger
- Mise à jour de l'appel direct pour passer le logger

#### `server/tasks/cron.ts`
- Modification de la signature de la fonction `setupCronJobs` pour accepter un logger en paramètre
- Mise à jour des appels à `runUfcCrawlerTask` pour passer le logger

#### `server/plugins/cron.plugin.ts`
- Création d'une instance de logger locale
- Mise à jour des appels à `initializeFirebase` et `setupCronJobs` pour passer le logger

#### `server/utils/firebase.ts`
- Modification des signatures des fonctions `initializeFirebase` et `getFirestoreInstance` pour accepter un logger en paramètre

### 2. Pattern d'injection de dépendances

Le pattern d'injection de dépendances utilisé est le suivant :

```typescript
// Pour les fonctions
export const maFonction = async (param1: Type1, logger: Logger) => {
  // Utilisation du logger
  logger.info('Message de log');
  // ...
}

// Pour les appels
const logger = buildLogger({ logLevel: process.env.LOG_LEVEL ?? 'info' });
await maFonction(param1, logger);
```

### 3. Niveaux de log utilisés

- `logger.info()` : Pour les messages d'information générale
- `logger.warn()` : Pour les avertissements et situations non critiques
- `logger.error()` : Pour les erreurs et exceptions

## Avantages de la refactorisation

1. **Cohérence** : Utilisation uniforme du même logger à travers toute l'application
2. **Traçabilité** : Possibilité de configurer le niveau de log via les variables d'environnement
3. **Maintenabilité** : Injection de dépendances facilitant les tests et la maintenance
4. **Flexibilité** : Possibilité d'ajouter des transports de log supplémentaires si nécessaire

## Configuration

Le niveau de log peut être configuré via la variable d'environnement `LOG_LEVEL` dans le fichier `.env` :

```env
LOG_LEVEL=info
```

Les niveaux disponibles sont : `fatal`, `error`, `warn`, `info`, `debug`, `trace`, `silent`

## Tests effectués

Les tests effectués comprennent :
1. Vérification de la compilation sans erreurs
2. Vérification du bon fonctionnement des crawlers
3. Vérification de l'affichage des logs dans la console
4. Vérification du niveau de log configurable

## Prochaines étapes

1. Étendre ce pattern à d'autres parties de l'application si nécessaire
2. Ajouter des transports de log supplémentaires (fichiers, services externes, etc.)
3. Mettre en place un système de rotation des logs si nécessaire
