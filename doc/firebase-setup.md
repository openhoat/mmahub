# Configuration Firebase pour MMA Hub

## Introduction

Ce document explique comment configurer Firebase pour l'application MMA Hub afin d'utiliser Firestore comme base de données pour stocker les données crawlées.

## Étapes de configuration

### 1. Créer un projet Firebase

1. Rendez-vous sur [Firebase Console](https://console.firebase.google.com/)
2. Cliquez sur "Créer un projet"
3. Entrez un nom pour votre projet (ex: "mmahub")
4. Suivez les étapes de configuration

### 2. Créer un compte de service

1. Dans la console Firebase, cliquez sur l'icône d'engrenage en haut à gauche
2. Sélectionnez "Paramètres du projet"
3. Allez dans l'onglet "Comptes de service"
4. Cliquez sur "Générer une nouvelle clé privée"
5. Sélectionnez "JSON" comme type de clé
6. Téléchargez le fichier et gardez-le en sécurité

### 3. Activer Firestore

1. Dans la console Firebase, cliquez sur "Firestore Database" dans le menu de gauche
2. Cliquez sur "Créer une base de données"
3. Sélectionnez "Mode production" (ou "Mode test" pour le développement)
4. Choisissez une région proche de vos utilisateurs
5. Cliquez sur "Activer"

### 4. Configurer les variables d'environnement

Copiez les valeurs du fichier JSON téléchargé dans vos variables d'environnement avec le préfixe `NUXT_` :

```env
NUXT_FIREBASE_TYPE=service_account
NUXT_FIREBASE_PROJECT_ID=votre-project-id
NUXT_FIREBASE_PRIVATE_KEY_ID=votre-private-key-id
NUXT_FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nVotre clé privée ici\n-----END PRIVATE KEY-----\n"
NUXT_FIREBASE_CLIENT_EMAIL=votre-email@votre-projet.iam.gserviceaccount.com
NUXT_FIREBASE_CLIENT_ID=votre-client-id
NUXT_FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
NUXT_FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
NUXT_FIREBASE_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
NUXT_FIREBASE_CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/votre-email%40votre-projet.iam.gserviceaccount.com
```

### 5. Configurer les règles de sécurité Firestore

Pour le développement, vous pouvez utiliser ces règles simples dans l'onglet "Règles" de Firestore :

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

Pour la production, utilisez des règles plus restrictives :

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Les catégories de poids sont publiques en lecture
    match /weightClasses/{document} {
      allow read: if true;
      allow write: if false;
    }
    
    // Le statut du crawler est accessible en lecture
    match /crawlerStatus/{document} {
      allow read: if true;
      allow write: if false;
    }
    
    // Tous les autres accès nécessitent une authentification
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Variables d'environnement du crawler

```env
# Intervalle de rafraîchissement des données UFC en minutes (défaut: 60)
UFC_DATA_REFRESH_MINUTES=60

# Activer/désactiver le crawling UFC (défaut: true)
ENABLE_UFC_CRAWLING=true
```

## Structure des données dans Firestore

### Collection `weightClasses`

Chaque document représente une catégorie de poids UFC :

```javascript
{
  name: "Heavyweight",
  url: "https://www.ufc.com/rankings#Heavyweight",
  champion: "Jon Jones",
  lastUpdated: Timestamp
}
```

### Collection `crawlerStatus`

Document unique pour suivre le statut du crawler :

```javascript
{
  lastRun: Timestamp,
  nextRun: Timestamp,
  status: "idle" | "running" | "completed" | "error",
  errorMessage: "Message d'erreur si status = error"
}
```

## Dépannage

### Erreurs d'authentification

Si vous rencontrez des erreurs d'authentification :
1. Vérifiez que toutes les variables d'environnement Firebase sont correctement définies
2. Assurez-vous que la clé privée est correctement formatée avec les `\n` pour les retours à la ligne
3. Vérifiez que le compte de service a les permissions nécessaires

### Problèmes de connexion

Si Firestore ne se connecte pas :
1. Vérifiez que vous avez une connexion Internet active
2. Assurez-vous que les ports nécessaires ne sont pas bloqués par un pare-feu
3. Vérifiez les logs de l'application pour plus de détails
