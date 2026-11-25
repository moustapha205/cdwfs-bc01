# TP 2 — Migration TypeScript en mode `strict`

## Trois erreurs détectées par le compilateur (`tsc --strict`) et corrigées
1. **`Object is possibly 'null'` sur `document.querySelector(...)` :** Sans garde explicite (`if (!modale) throw ...`), l'accès à `.showModal()` pouvait planter à l'exécution si l'ID était absent du HTML.
2. **`Property 'value' does not exist on type 'Element'` :** `querySelector("#courriel")` renvoyait un `Element` générique ; corrigé avec le paramètre générique `querySelector<HTMLInputElement>("#courriel")`.
3. **Littéral de niveau non contrôlé (`string` au lieu de `Niveau`) :** Une faute de frappe sur `"debutant"` passait en JS pur ; le type union `"debutant" | "intermediaire" | "avance"` la bloque dès la frappe.
