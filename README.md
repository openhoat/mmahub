# MMA Hub

Application pour suivre les classements UFC et autres informations sur les arts martiaux mixtes.

## Configuration requise

- Node.js 22.15.0
- pnpm 10.10.0

## Setup

Assurez-vous d'installer les dépendances :

```bash
# pnpm
pnpm install
```

## Configuration Firebase

### Utilisation de Firestore déployé (par défaut)

Pour utiliser Firestore déployé lors du développement :

1. Créez un compte de service Firebase en suivant les instructions dans [doc/firebase-service-account-setup.md](doc/firebase-service-account-setup.md)
2. Configurez les variables d'environnement dans `.env.local` :
   ```
   NUXT_FIREBASE_USE_EMULATOR=false
   NUXT_FIREBASE_PROJECT_ID=votre-project-id
   NUXT_FIREBASE_SERVICE_ACCOUNT_CLIENT_EMAIL=votre-email@votre-project-id.iam.gserviceaccount.com
   NUXT_FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY='-----BEGIN PRIVATE KEY-----\nvotre-clé-privée\n-----END PRIVATE KEY-----\n'
   ```

### Utilisation de l'émulateur Firestore

Pour utiliser l'émulateur Firestore lors du développement :

```bash
# Démarrer l'émulateur et le serveur de développement
pnpm run dev:emulator
```

## Development Server

Démarrez le serveur de développement sur `http://localhost:3000` :

```bash
# pnpm
pnpm dev
```

## Production

Construisez l'application pour la production :

```bash
# pnpm
pnpm run build:firebase
```

Déployez l'application sur Firebase :

```bash
# pnpm
pnpm run deploy
```

Prévisualisez la version de production localement :

```bash
# pnpm
pnpm preview
```

Consultez la [documentation de déploiement](https://nuxt.com/docs/getting-started/deployment) pour plus d'informations.
