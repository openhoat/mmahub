# Exécution de commandes shell

## Utilisation de npx avec pnpm

**Recommandation** : Pour éviter les problèmes de sortie vide avec les commandes `pnpm`, utiliser systématiquement `npx pnpm` au lieu de `pnpm` directement.

**Exemples** :
- ❌ `pnpm run build`
- ✅ `npx pnpm run build`

- ❌ `pnpm run check`
- ✅ `npx pnpm run check`

- ❌ `pnpm test`
- ✅ `npx pnpm test`

Cette approche garantit une meilleure compatibilité avec l'outil d'exécution de commandes et évite les problèmes de sortie non visible.

## Résultat des commandes

**Important** : Malgré l'utilisation de `npx pnpm`, il peut arriver que tu ne parviennes pas toujours à voir la sortie des commandes du terminal avec l'outil d'exécution de commandes standard.

Dans ce cas, il faut appliquer une solution de contournement.

Solutions de contournement à essayer en priorité dans cet ordre :

1. Utiliser l'outil MCP `intellij` qui offre une intégration de l'IDE, incluant le terminal.
2. Utiliser l'outil MCP `shell`.
3. Dans le cas de l'utilisation de variables d'environnement, qui peut générer des erreurs, emballer la commande avec
   `bash -c` peut être une solution.

## Commandes trop longues

Systématiquement limiter la durée d'une commande à quelques secondes (par exemple 30s) et la forcer à s'arrêter à
expiration du timeout.
