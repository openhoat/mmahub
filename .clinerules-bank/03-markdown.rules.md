# Règles à appliquer pour la génération et la validation de fichiers markdown

## Règle principale : Espacement des listes

Les listes à puces (-, *, +) et numérotées (1., 2., etc.) doivent **TOUJOURS** être précédées d'une ligne vide.

### ✅ Format correct

```markdown
Texte descriptif précédant la liste.

- Premier élément
- Deuxième élément
```

### ❌ Format incorrect

```markdown
Texte descriptif précédant la liste.

- Premier élément
- Deuxième élément
```

## Méthode de vérification

Pour analyser un fichier markdown :

1. **Scanner les lignes** commençant par `- `, `* `, `+ ` ou des chiffres suivis de `.` ou `) `
2. **Vérifier la ligne précédente** : doit être vide
3. **Si la ligne précédente contient du texte → VIOLATION**

## Action requise

**Pour l'analyse de fichiers existants :**

- Signaler TOUTES les violations avec numéro de ligne
- Proposer le format correct
- Ne jamais considérer l'analyse terminée si des violations existent

**Pour la génération de contenu :**

- Insérer TOUJOURS une ligne vide avant chaque liste

## Cas particuliers

- Listes après titres, paragraphes, code, tableaux : même règle
- Listes imbriquées : seule la liste parente nécessite une ligne vide

---

## Règle secondaire : Espacement des entêtes

Les entêtes Markdown (`#`, `##`, `###`, etc.) doivent **TOUJOURS** être suivies d'une ligne vide.

### ✅ Format correct

```markdown
# Titre principal

Contenu du titre principal.

## Sous-titre

Contenu du sous-titre.

### Titre de niveau 3

Contenu du niveau 3.
```

### ❌ Format incorrect

```markdown
# Titre principal

Contenu du titre principal.

## Sous-titre

Contenu du sous-titre.

### Titre de niveau 3

Contenu du niveau 3.
```

## Méthode de vérification

Pour analyser un fichier markdown :

1. **Scanner les lignes** commençant par `# ` (un ou plusieurs # suivi d'un espace)
2. **Vérifier la ligne suivante** : doit être vide
3. **Si la ligne suivante contient du texte → VIOLATION**

## Action requise

**Pour l'analyse de fichiers existants :**

- Signaler TOUTES les violations avec numéro de ligne
- Proposer le format correct
- Ne jamais considérer l'analyse terminée si des violations existent

**Pour la génération de contenu :**

- Insérer TOUJOURS une ligne vide après chaque entête

## Cas particuliers

- Entêtes suivies de listes : la règle des listes (ligne vide avant) s'applique également
- Blocs de code : la règle s'applique également après les entêtes qui introduisent du code
- Entêtes consécutifs : chaque entête doit être suivie d'une ligne vide
