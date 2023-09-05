# TITOUTHESE

Pour mette à jour la donnée affichée sur le graph:

Ouvrir dans un éditeur de code qui supporte le TypeScript (Visual Studio Code par exemple) le fichier `./utils/graph.ts`

Ligne `#21` il y'a la constante `GRAPH_DATA` qui est initialisée sous forme de tableau. C'est cette constante qui contient tout la donnée du graph. Chaque entrée du tableau correspond à un noeud du graph.

```ts
{
  id: number // L'ID unique du Node
  cellParent: number | null // l'ID du Node parent de ce Node (null pour le Node racine)
  cellTitle: string // Le contenu affiché au hover sur le Node
}
```

Pour le moment je ne supporte que cette donnée, mais on peut en rajouter si on veut.

## Ajouter de la donnée (un nouveau Node)

1. Copier la dernière ligne du tableau
2. Incrémenter la valeur `id` de 1
3. Mettre dans `cellParent` l'id du Node dont on veut hériter
4. Mettre dans `cellTitle` le texte qu'on veut afficher au survol
5. Vérifier que l'éditeur ne lève pas d'erreur (pas de petit red squigly)
6. Commit les changements sur git
7. Push sur la branch `main` de Github
8. Attendre quelques minutes
9. Check sur [le site](https://resonant-stroopwafel-034262.netlify.app/) que tout va bien et que la donnée est bien à jour

## Mettre à jour la donnée (un Node existant)

1. Trouver la ligne que tu veux modifier
2. ⚠️ NE PAS TOUCHER A L'ID EVER
3. Modifier les valeurs que tu veux dans `cellParent` (changera le Node vers lequel ce Node pointe) ou dans `cellTitle` (changera le contenu affiché au survol)
4. Vérifier que l'éditeur ne lève pas d'erreur (pas de petit red squigly)
5. Commit les changements sur git
6. Push sur la branch `main` de Github
7. Attendre quelques minutes
8. Check sur [le site](https://resonant-stroopwafel-034262.netlify.app/) que tout va bien et que la donnée est bien à jour

Si t'as un doute sur le fait que t'as bien fait le taffe tu peux aussi commit et push sur une autre branche git et me faire une PR pour que je vérifie, mais au pire si ça pète le site je peux corriger rapidement.