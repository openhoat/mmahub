# Mise à jour de la configuration de l'émulateur Firebase

## Introduction

Ce document explique les modifications apportées à la configuration de l'émulateur Firebase pour améliorer la gestion des variables d'environnement.

## Changements effectués

### 1. Variable d'environnement NUXT_FIREBASE_USE_EMULATOR

La variable `NUXT_FIREBASE_USE_EMULATOR` a été déplacée du fichier `.env` vers le script npm `dev:emulator` pour une meilleure gestion des environnements.

**Ancienne configuration (dans `.env`) :**
```env
NUXT_FIREBASE_USE_EMULATOR=true
```

**Nouvelle configuration (dans `package.json`) :**
```json
"dev:emulator": "concurrently 'npx firebase emulators:start' 'NUXT_FIREBASE_USE_EMULATOR=true nuxt dev' --names 'FIREBASE,Nuxt' --prefixColors 'bgBlue.bold,bgGreen.bold'"
```

### 2. Mise à jour des références dans le code

Les références à la variable d'environnement ont été mises à jour dans `nuxt.config.ts` pour utiliser le préfixe `NUXT_` de manière cohérente.

## Avantages de cette approche

1. **Séparation des préoccupations** : La variable est définie uniquement pour l'environnement d'émulation
2. **Clarté** : Il est évident que l'émulateur est utilisé lors du lancement du script `dev:emulator`
3. **Flexibilité** : Permet d'avoir différentes configurations pour différents environnements
4. **Simplicité** : Pas besoin de modifier le fichier `.env` pour basculer entre l'émulateur et un projet réel

## Utilisation

Pour lancer l'application avec l'émulateur Firebase, utilisez toujours la même commande :

```bash
npx pnpm run dev:emulator
```

Cette commande démarre :
1. L'émulateur Firebase Firestore sur le port 8080
2. L'interface utilisateur de l'émulateur sur le port 4000
3. L'application Nuxt sur le port 3000 avec la variable `NUXT_FIREBASE_USE_EMULATOR=true`

## Configuration pour un projet Firebase réel

Pour utiliser un projet Firebase réel au lieu de l'émulateur :

1. Utilisez le script `dev` standard :
   ```bash
   npx pnpm run dev
   ```

2. Assurez-vous que les variables d'environnement appropriées sont définies dans `.env` :
   ```env
   # NUXT_FIREBASE_USE_EMULATOR=false  # Cette variable n'est plus nécessaire
   # Configurez vos variables Firebase réelles ici
   ```

## Vérification

Pour vérifier que la configuration fonctionne correctement :

1. Lancez l'application avec `npx pnpm run dev:emulator`
2. Accédez à http://localhost:3000
3. Vérifiez que les données UFC sont récupérées et affichées
4. Accédez à l'interface de l'émulateur à http://localhost:4000 pour voir les données dans Firestore

## Problèmes connus

Aucun problème connu à ce jour. Si vous rencontrez des difficultés, vérifiez que :
1. Tous les services démarrent correctement
2. Les ports ne sont pas bloqués
3. Les variables d'environnement sont correctement définies
