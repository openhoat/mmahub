# Journal de bord - MMA Hub

## 02/11/2025

### 20:03 - Ajout du script npm deploy
- Ajout du script "deploy" au fichier package.json avec la commande `npx pnpm run build:firebase && npx firebase deploy`
- Configuration du script pour qu'il exécute d'abord "build:firebase" puis "firebase deploy"
- Testé le script pour vérifier qu'il fonctionne correctement
- Le script fonctionne correctement et permet de déployer l'application en une seule commande

Cette amélioration facilite le processus de déploiement Firebase en utilisant la commande `npx pnpm run deploy`.

## 02/11/2025

### 19:56 - Ajout du script npm build:firebase
- Ajout du script "build:firebase" au fichier package.json avec la commande `nuxt build --preset=firebase`
- Testé le script pour vérifier qu'il génère correctement les fichiers dans dist/nuxt
- Le script fonctionne correctement et génère tous les fichiers nécessaires pour le déploiement Firebase

Cette amélioration facilite le processus de build pour le déploiement Firebase en utilisant la commande `npx pnpm run build:firebase`.

## 02/11/2025

### 19:47 - Résolution des problèmes de déploiement Firebase et de l'erreur de parsing JSON
- Identifié les problèmes de configuration Firebase Hosting/Functions qui causaient l'erreur de parsing JSON
- Analysé le projet d'exemple `/home/openhoat/dev/code/nuxt-firebase-ddd` pour comprendre l'approche correcte
- Modifié `nuxt.config.ts` pour ajouter la configuration Firebase dans la section nitro
- Reconstruit l'application avec le preset Firebase : `nuxt build --preset=firebase`
- Mis à jour `firebase.json` pour pointer vers les répertoires de build corrects :
  - Functions : `dist/nuxt/server`
  - Hosting : `dist/nuxt/public`
  - Rewrites : toutes les requêtes vers la fonction "server"
- Supprimé le répertoire `functions` personnalisé inutile
- Déployé l'application avec la nouvelle configuration
- Vérifié que l'API `/api/weight-classes` retourne correctement les données JSON
- Vérifié que la page d'accueil est accessible

L'application est maintenant correctement déployée avec une configuration Firebase optimale qui suit les meilleures pratiques.

## 02/11/2025

### 19:05 - Résolution de l'erreur 403 sur l'application déployée
- Diagnostiqué l'erreur 403 sur https://mmahub-e96e9.web.app causée par une fonction "nuxtApp" manquante
- Créé la fonction Firebase "nuxtApp" dans functions/src/index.ts pour servir l'application Nuxt
- Découvert des problèmes de compatibilité avec les ports lors de l'utilisation de Firebase Functions
- Changé d'approche en utilisant le hosting statique Firebase au lieu de Firebase Functions
- Modifié la configuration Firebase dans firebase.json pour supprimer la redirection vers la fonction
- Généré l'application Nuxt en mode statique avec "nuxt generate"
- Déployé les fichiers statiques sur Firebase Hosting
- Vérifié que l'application est maintenant accessible avec un code HTTP 200

L'application est maintenant correctement déployée et accessible via Firebase Hosting.

## 02/11/2025

### 18:46 - Mise à jour de la documentation dans /doc
- Mise à jour de `doc/firebase-emulator.md` pour supprimer la référence obsolète à la variable d'environnement dans `.env`
- Mise à jour de `doc/firebase-setup.md` pour utiliser les variables d'environnement avec le préfixe `NUXT_`
- Mise à jour de `doc/project.md` pour refléter l'état actuel du projet
- Création de `doc/logging-refactor-obsolete.md` pour marquer l'ancienne documentation de logging comme obsolète
- Vérification de la cohérence de tous les documents de documentation

Cette mise à jour assure que la documentation dans `/doc` reflète fidèlement l'état actuel du projet et de son implémentation.

### 18:35 - Mise à jour de la configuration de l'émulateur Firebase
- Déplacement de la variable d'environnement `NUXT_FIREBASE_USE_EMULATOR` du fichier `.env` vers le script npm `dev:emulator`
- Mise à jour des références dans `nuxt.config.ts` pour utiliser le préfixe `NUXT_` de manière cohérente
- Création de la documentation (`doc/firebase-emulator-update.md`) pour expliquer les changements
- Vérification du bon fonctionnement de la configuration mise à jour

Cette mise à jour améliore la gestion des environnements en définissant la variable d'émulateur uniquement pour l'environnement d'émulation, ce qui rend la configuration plus claire et plus flexible.

### 10:35 - Refactorisation du système de logging avec Nuxt Pino Log
- Installation du module Nuxt `nuxt-pino-log` pour une gestion standardisée du logging
- Configuration du module dans `nuxt.config.ts` avec variables d'environnement standard Nuxt
- Migration des variables d'environnement vers le format standard Nuxt (`NUXT_LOG_LEVEL`, `NUXT_LOG_FORMAT`)
- Création d'un utilitaire de logging unifié (`server/utils/logger.ts`)
- Mise à jour de tous les fichiers pour utiliser le nouveau logger
- Simplification de `server/utils/env.helper.ts` pour utiliser le système standard Nuxt
- Création de la documentation de la refactorisation (`doc/nuxt-logging-refactor.md`)

Le système de logging utilise maintenant le module Nuxt standard avec une configuration centralisée et des variables d'environnement standard Nuxt. Le logger est automatiquement configuré et disponible dans toute l'application.

### 10:00 - Refactorisation du système de logging pour utiliser le logger centralisé
- Remplacement de tous les `console.log`, `console.error`, `console.warn` et `console.info` par le logger centralisé
- Mise en place d'un système d'injection de dépendances pour le logger dans tous les services
- Mise à jour des services Firestore pour accepter le logger en paramètre
- Mise à jour de l'API `/api/weight-classes` pour créer une instance de logger locale
- Mise à jour des tâches planifiées pour utiliser l'injection de dépendances du logger
- Mise à jour du plugin Nitro pour créer une instance de logger locale
- Mise à jour du service Firebase pour accepter le logger en paramètre
- Création de la documentation de la refactorisation (`doc/logging-refactor.md`)

Le système de logging est maintenant cohérent à travers toute l'application avec une injection de dépendances propre et un niveau de log configurable via la variable d'environnement `LOG_LEVEL`.

### 09:35 - Configuration de l'émulateur Firebase pour le développement local
- Installation de `firebase-tools` et `concurrently` comme dépendances de développement
- Création de la configuration Firebase pour l'émulateur (`firebase.json`)
- Configuration des règles de sécurité pour le développement (`firestore.rules`)
- Configuration des index Firestore (`firestore.indexes.json`)
- Adaptation du service Firebase pour détecter et utiliser l'émulateur en développement
- Mise à jour des variables d'environnement pour activer l'émulateur par défaut
- Ajout de scripts de démarrage dans `package.json` pour lancer l'émulateur et l'application en parallèle
- Création de la documentation pour l'utilisation de l'émulateur (`doc/firebase-emulator.md`)

L'application peut maintenant être lancée avec l'émulateur Firebase en utilisant la commande `npx pnpm run dev:emulator`. Cela démarre l'émulateur Firestore localement ainsi que l'interface utilisateur de l'émulateur, permettant un développement complet sans connexion Internet ni projet Firebase réel.

### 09:25 - Implémentation du stockage Firestore et crawling planifié pour UFC
- Ajout des dépendances Firebase/Firestore (`firebase` et `firebase-admin`)
- Création du service d'initialisation Firebase (`server/utils/firebase.ts`)
- Création du service Firestore pour gérer les données (`server/services/firestore.service.ts`)
- Modification de l'API `/api/weight-classes` pour utiliser Firestore comme source de données
- Implémentation du crawling planifié avec tâches cron
- Création du service de crawling (`server/tasks/ufc-crawler.task.ts`)
- Configuration du système de tâches cron (`server/tasks/cron.ts`)
- Création du plugin Nitro pour l'initialisation (`server/plugins/cron.plugin.ts`)
- Configuration des variables d'environnement pour le crawling et Firebase
- Création de la documentation Firebase (`doc/firebase-setup.md`)

Les données UFC sont maintenant stockées dans Firestore et mises à jour automatiquement selon l'intervalle défini par la variable d'environnement `UFC_DATA_REFRESH_MINUTES`. Le système fonctionne avec un mécanisme de cache intelligent qui vérifie si les données doivent être rafraîchies avant de les récupérer depuis la source.

## 01/11/2025

### 17:49 - Création du journal de bord
- Initialisation du fichier journal.md
- Documentation des tâches effectuées jusqu'à présent

### 17:39 - Modification des noms des catégories de poids en anglais
- Mise à jour du service de crawling UFC pour utiliser les noms originaux en anglais
- Création d'un mapping français vers anglais pour les catégories de poids
- Ajout d'un User-Agent dans les requêtes pour éviter les blocages
- Validation du fonctionnement via l'API /api/weight-classes

### 17:09 - Correction de l'API des catégories de poids
- Ajout des en-têtes Content-Type appropriés
- Validation du fonctionnement correct de l'API /api/weight-classes

### 16:30 - Mise en place du crawling des catégories de poids UFC
- Création d'un service de crawling léger avec node-fetch et cheerio
- Développement d'un endpoint API /api/weight-classes
- Création d'un composant frontend WeightClasses.vue
- Intégration dans la page principale app.vue
- Récupération des champions pour chaque catégorie de poids

### 15:12 - Configuration initiale du projet
- Initialisation du projet Nuxt
- Configuration de base avec app.vue
- Mise en place des dépendances de base
