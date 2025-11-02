# Application MMA Hub

## Objectif

Créer une application fullstack web qui permet de :

1. __Crawler des données sur le web__ concernant les combattants MMA
2. __Stocker ces données__ dans Firestore
3. __Présenter les données__ de manière synthétique, efficace et clean

## Plan de développement de l'application MMA Hub

### 1. Configuration du projet

- Installation des dépendances Firebase/Firestore
- Configuration de Firebase dans le projet Nuxt
- Mise en place de la structure pour les services Firestore

### 2. Système de crawling

- Création d'un service de crawling (côté serveur avec Nitro)
- Implémentation de crawlers spécifiques pour fightmatrix.com
- Implémentation de crawlers spécifiques pour tapology.com
- Planification des tâches de crawling (cron jobs avec Nitro)
- Stockage des données brutes et traitées dans Firestore

### 3. Backend (Nitro API)

- Création d'API endpoints pour gérer les données des combattants
- Endpoints pour récupérer, filtrer et trier les données des combattants
- Authentification pour les opérations d'administration
- Mise en place de middlewares de sécurité

### 4. Modèle de données

- Définition du schéma pour les données des combattants
- Structure pour les statistiques et les performances
- Gestion des événements et des combats
- Système de mise à jour des données

### 5. Interface utilisateur (Frontend)

- Page d'accueil avec vue d'ensemble des dernières données
- Pages détaillées pour chaque combattant
- Système de recherche et de filtrage avancé
- Tableaux de bord pour les statistiques synthétiques
- Design clean et responsive

### 6. Fonctionnalités avancées

- Système de notification pour les nouveaux combats
- Comparaison entre combattants
- Historique des performances
- Intégration des sources fightmatrix et tapology

### 7. Documentation

- Création d'un fichier markdown documentant le projet
- Inclusion de toutes les décisions et spécifications
- Stockage dans le répertoire /doc

### 8. Déploiement Firebase

- Configuration du déploiement Firebase Hosting
- Configuration des règles de sécurité Firestore
- Optimisation des performances
