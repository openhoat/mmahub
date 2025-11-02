# Utilisation de l'émulateur Firebase

## Introduction

Ce document explique comment utiliser l'émulateur Firebase pour le développement local de l'application MMA Hub. L'émulateur permet de simuler les services Firebase localement sans avoir besoin d'une connexion Internet ou d'un projet Firebase réel.

## Configuration requise

- Node.js (déjà installé dans le projet)
- pnpm (déjà configuré)
- Dépendances du projet installées (`npx pnpm install`)

## Démarrage rapide

Pour lancer l'application avec l'émulateur Firebase, utilisez simplement :

```bash
npx pnpm run dev:emulator
```

Cette commande démarre :
1. L'émulateur Firebase Firestore sur le port 8080
2. L'interface utilisateur de l'émulateur sur le port 4000
3. L'application Nuxt sur le port 3000

## Structure des fichiers

```
firebase.json          # Configuration de l'émulateur
firestore.rules        # Règles de sécurité pour le développement
firestore.indexes.json # Configuration des index Firestore
```

## Variables d'environnement

Les variables d'environnement suivantes sont configurées dans le fichier `.env` pour utiliser l'émulateur :

```env
# ID du projet pour l'émulateur
NUXT_FIREBASE_PROJECT_ID=mmahub-dev

# Hôte de l'émulateur Firestore
NUXT_FIRESTORE_EMULATOR_HOST=localhost:8080
```

La variable `NUXT_FIREBASE_USE_EMULATOR` est définie directement dans le script npm `dev:emulator` pour une meilleure gestion des environnements. Voir `doc/firebase-emulator-update.md` pour plus de détails.

## Utilisation de l'émulateur

### Interface utilisateur

L'interface utilisateur de l'émulateur est accessible à l'adresse : http://localhost:4000

Via cette interface, vous pouvez :
- Visualiser les données stockées dans Firestore
- Explorer les requêtes effectuées
- Gérer les données de test

### Données de développement

Les données dans l'émulateur sont temporaires et ne persistent pas entre les sessions. À chaque redémarrage de l'émulateur, vous repartez avec une base de données vide.

## Scripts disponibles

### `dev:emulator`

Démarre l'émulateur Firebase et l'application Nuxt en parallèle :

```bash
npx pnpm run dev:emulator
```

### `firebase:emulators:start`

Démarre uniquement l'émulateur Firebase :

```bash
npx pnpm run firebase:emulators:start
```

## Dépannage

### Problèmes de ports

Si les ports par défaut (8080 pour Firestore, 4000 pour l'UI) sont déjà utilisés, vous pouvez les modifier dans le fichier `firebase.json` :

```json
{
  "emulators": {
    "firestore": {
      "port": 8081
    },
    "ui": {
      "enabled": true,
      "port": 4001
    }
  }
}
```

### Erreurs de connexion

Si l'application ne se connecte pas à l'émulateur :
1. Vérifiez que l'émulateur est bien démarré
2. Assurez-vous que les variables d'environnement sont correctement configurées
3. Vérifiez que les ports sont accessibles

### Réinitialisation des données

Pour réinitialiser les données de l'émulateur, il suffit de le redémarrer avec :

```bash
npx pnpm run dev:emulator
```

## Passage à un projet Firebase réel

Pour utiliser un projet Firebase réel au lieu de l'émulateur :

1. Modifiez les variables d'environnement dans `.env` :
   ```env
   FIREBASE_USE_EMULATOR=false
   # Décommentez et remplissez les variables de configuration Firebase
   ```

2. Suivez les instructions du fichier `doc/firebase-setup.md` pour configurer un projet Firebase réel

## Bonnes pratiques

1. Utilisez toujours l'émulateur pour le développement local
2. Ne commitez jamais de credentials Firebase réels dans le code
3. Testez toujours avec l'émulateur avant de déployer sur un projet réel
4. Utilisez des données de test représentatives dans l'émulateur
