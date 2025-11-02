# Intégration de l'IDE IntelliJ

L'IDE IntelliJ propose des fonctionnalités avancées accessibles via l'outil MCP `intellij`.

Utiliser TOUJOURS cet outil pour maximiser l'efficacité des analyses et modifications du projet.

## 🏃‍♂️ __Exécution__

- __`get_run_configurations`__ : Liste toutes les configurations d'exécution (Jest, Node.js, npm scripts)
- __`execute_run_configuration`__ : Exécute une configuration spécifique avec timeout
- __`execute_terminal_command`__ : Exécute des commandes shell dans le terminal IntelliJ

## 🔍 __Recherche et Navigation__

- __`find_files_by_name_keyword`__ : Recherche ultra-rapide par nom de fichier (préférer aux outils CLI)
- __`find_files_by_glob`__ : Recherche par patterns (ex: `**/*.ts`, `*.test.js`)
- __`search_in_files_by_text`__ : Recherche textuelle dans tout le projet
- __`search_in_files_by_regex`__ : Recherche par expressions régulières
- __`list_directory_tree`__ : Affichage arborescence (équivalent `tree`)

## 🧠 __Analyse de Code__

- __`get_symbol_info`__ : Documentation détaillée d'un symbole (équivalent Quick Documentation)
- __`get_file_problems`__ : Analyse erreurs/warnings via inspections IntelliJ
- __`get_project_dependencies`__ : Liste des dépendances du projet
- __`get_project_modules`__ : Liste des modules avec leurs types

## 📝 __Édition et Refactoring__

- __`get_file_text_by_path`__ : Lecture de fichier avec options de troncature
- __`replace_text_in_file`__ : Remplacement ciblé (support regex)
- __`rename_refactoring`__ : Renommage intelligent dans tout le projet (OBLIGATOIRE pour les symboles)
- __`reformat_file`__ : Application du formatage selon les règles du projet
- __`create_new_file`__ : Création de fichiers avec contenu
- __`open_file_in_editor`__ : Ouverture dans l'éditeur

## ✨ __Avantages Critiques__

- __Performance__ : Utilise les index IntelliJ (1000x plus rapide que grep/find)
- __Intelligence__ : Comprend la sémantique du code et les dépendances
- __Sécurité__ : Le refactoring évite les erreurs de casse/scope
- __Intégration__ : Synchronisé avec l'état réel du projet dans l'IDE

## 📋 __Règles d'Usage__

1. __OBLIGATOIRE__ : Utiliser `rename_refactoring` pour renommer des symboles (jamais de simple replace).
2. __Performance__ : `find_files_by_name_keyword` est le plus rapide pour la recherche de fichiers.
3. __Validation__ : Utiliser `get_file_problems` pour vérifier la qualité du code.
4. __Paramètre projectPath__ : Toujours passer le répertoire de base du projet.
