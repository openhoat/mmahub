# Configuration du compte de service Firebase

## Utilisation du compte de service existant

Le projet utilise déjà un fichier de compte de service Firebase :
`/home/openhoat/mmahub-e96e9-firebase-adminsdk-fbsvc-e376df059d.json`

Les valeurs de ce fichier sont déjà configurées dans `.env.local` :
- `NUXT_FIREBASE_SERVICE_ACCOUNT_CLIENT_EMAIL`
- `NUXT_FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY`

## Création d'un nouveau compte de service (si nécessaire)

Si vous avez besoin de créer un nouveau compte de service :

1. Accédez à la console Firebase : https://console.firebase.google.com/
2. Sélectionnez votre projet
3. Allez dans "Paramètres du projet" (icône roue dentée)
4. Cliquez sur l'onglet "Comptes de service"
5. Cliquez sur "Générer une nouvelle clé privée"
6. Sélectionnez "JSON" comme format de clé
7. Téléchargez le fichier

## Configuration des variables d'environnement

Si vous utilisez un nouveau fichier de compte de service, copiez les valeurs dans le fichier `.env.local` :

```env
NUXT_FIREBASE_USE_EMULATOR=false
NUXT_FIREBASE_PROJECT_ID=votre-project-id
NUXT_FIREBASE_SERVICE_ACCOUNT_CLIENT_EMAIL=votre-email@votre-project-id.iam.gserviceaccount.com
NUXT_FIREBASE_SERVICE_ACCOUNT_PRIVATE_KEY='-----BEGIN PRIVATE KEY-----\nvotre-clé-privée\n-----END PRIVATE KEY-----\n'
```

## Configuration des identifiants par défaut (alternative)

Si vous préférez utiliser les identifiants par défaut de Google Cloud :

1. Installez le SDK Google Cloud : https://cloud.google.com/sdk/docs/install
2. Authentifiez-vous avec votre compte Google :
   ```bash
   gcloud auth application-default login
   ```
3. Assurez-vous que votre compte a les autorisations nécessaires pour accéder à Firestore

## Sécurité

- Ne commitez jamais les clés privées dans le dépôt Git
- Assurez-vous que le fichier `.env.local` n'est pas committé (il est déjà dans le `.gitignore`)
