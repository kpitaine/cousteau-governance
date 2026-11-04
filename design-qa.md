# QA — Cousteau Governance v2 / Wand OS

Date : 4 novembre 2026. Cible : parcours publics de **Wand OS**, espaces **Teams** et **Governance**, réimplémentés avec l’identité visuelle Cousteau. Il ne s’agit pas d’une comparaison pixel à pixel ni d’une certification du backend Wand.

## Références et preuves

Référence ouverte et inspectée : [https://wand.ai/os.html](https://wand.ai/os.html), démonstration interactive agrandie. Les captures de référence de la session sont `/workspace/scratch/wand-audit-teams.jpg`, `/workspace/scratch/wand-audit-designer.jpg`, `/workspace/scratch/wand-audit-runs.jpg` et `/workspace/scratch/wand-audit-skills.jpg`. Ces captures du produit tiers n’ont pas été redistribuées dans le dépôt.

Implémentation rendue dans Chrome via la prévisualisation locale gérée. Captures de cette version :

| Écran et état | Preuve |
| --- | --- |
| Designer RFP, cinq phases, treize étapes, version publiée après édition | [06-os-designer.jpg](docs/screenshots/06-os-designer.jpg) |
| Mon équipe, périmètre directeur, objectifs et sous-équipes | [07-os-teams.jpg](docs/screenshots/07-os-teams.jpg) |
| Dossier version 6 conservé après publication de la version 7, seconde demande humaine | [08-os-runs.jpg](docs/screenshots/08-os-runs.jpg) |
| Transformation, phase Expansion maîtrisée et critères | [09-os-transformation.jpg](docs/screenshots/09-os-transformation.jpg) |
| Compétence, méthode, accès et tests déterministes | [10-os-skills.jpg](docs/screenshots/10-os-skills.jpg) |
| Designer mobile, quatre onglets visibles, canevas défilant | [11-os-mobile.jpg](docs/screenshots/11-os-mobile.jpg) |

Les données métier diffèrent intentionnellement : Northstar AM, responsables et agents de démonstration, objectifs d’asset management. La capture source du designer est un brouillon ; la capture finale Cousteau est publiée. Cette différence d’état explique l’absence du bandeau de diff sur la capture finale. Le bandeau a été vérifié pendant l’édition, l’annulation et la publication.

## Dimensions et comparaison

Les références source mesurent 1363 × 936 pixels. Les captures desktop Cousteau mesurent 1348 × 926 pixels hors les bandes de défilement capturées par cette surface ; la compétence et le support mobile mesurent 1363 × 936. Aucune mise à l’échelle raster n’a été appliquée. L’écart de surface d’environ 1 % n’a pas été traité comme un défaut de grille ou de densité.

Les références et les rendus ont été présentés ensemble dans le même appel de comparaison visuelle pour **Mon équipe** puis **Designer**. L’examen a porté sur les régions lisibles de navigation, titre, phases, cartes, connexions et statuts. Des captures complémentaires ont vérifié le détail d’intervention et le tiroir de compétence. Les différences de marque, police, couleurs et géométrie sont intentionnelles ; la structure des tâches et contrôles est la cible.

Le test mobile utilise un iframe de 390 × 844 pixels CSS, avec 375 pixels de largeur utile après la barre de défilement native. Mesure DOM : largeur du document 375, largeur utile 375, donc aucun débordement horizontal de la page. Le canevas conserve son défilement interne. La page d’encadrement temporaire a été supprimée avant livraison.

## Corrections et comparaison successive

| Priorité | Constat initial | Correction | Vérification après correction |
| --- | --- | --- | --- |
| P1 | La première version ne comportait pas de designer comparable, ni de navigation liée aux interventions. | Studio de processus, phases, branches, versions et file contextuelle dans le panneau gauche. | Designer et exécutions capturés ; le libellé gauche change après une approbation. |
| P1 | Le suivi sur canevas pouvait utiliser la version publiée récente au lieu du snapshot d’un ancien dossier. | Sélection du snapshot du run pour le canevas et l’inspecteur. | Version 6 affichée après publication de v7 ; test de régression ajouté à `tests/workflows.mjs`. |
| P2 | Textes secondaires trop pâles et cartes trop petites pour les titres longs. | Contraste renforcé, titres de nœuds agrandis, hauteur des cartes et espacement des rangées augmentés. | Nouvelle comparaison visuelle : titres et badges contenus dans les cartes, sans collision avec la rangée suivante. |
| P2 | Le déclencheur n’apparaissait que dans Configuration. | Déclencheur visible et éditable au-dessus du graphe, délai global et temps humain/agent par phase. | Présents dans les captures finales desktop et mobile. |
| P2 | Le quatrième onglet du processus était hors écran sur mobile. | Grille de quatre onglets en deux rangées. | Les quatre destinations sont visibles dans la capture mobile finale. |
| P2 | La vue d’équipe manquait de profondeur et de lisibilité. | Sous-équipes explorables, agrégats, cascade d’objectifs, table hiérarchique, barres de répartition et texte secondaire renforcé. | Exploration de l’équipe Opérations puis retour au périmètre directeur ; nouvelle capture. |

## Cinq surfaces visuelles vérifiées

- **Typographie** : titres serif Cousteau et interface sans-serif système ; poids et tailles hiérarchisés. Titres de nœuds ajustés pour deux lignes. Cette famille diffère volontairement de Wand.
- **Espacement / disposition** : navigation fixe, zones défilantes indépendantes, cartes de phase, formulaires et tiroirs. Le studio montre cinq phases à 80 % sur desktop ; son zoom et son ajustement restent disponibles sous le canevas. Aucun contrôle permanent n’est perdu sur mobile.
- **Couleurs** : palette Cousteau mauve, blanc et gris, vert pour validation, ambre pour demande humaine. Les textes secondaires ont été assombris. La revue n’est pas une certification WCAG exhaustive.
- **Images / assets** : aucun raster de Wand intégré au produit, aucun logo ou mascotte Wand réutilisé. Logo Cousteau et icônes vectorielles du projet ; captures réelles, non générées.
- **Contenu** : libellés français, responsables visibles, branches et preuves explicites, chiffres fictifs signalés. La publication d’un processus et l’autorisation d’une action sont décrites comme locales.

## Parcours exécutés dans le navigateur

1. Accueil Processus → RFP par le panneau gauche → inspecteur et formulaire d’une étape.
2. Modification du critère d’acceptation → brouillon → annuler → rétablir → publier v7.
3. Dossier existant v6 conservé → approbation unique → arrêt au contrôle suivant, compteur d’étapes 4/13 puis 6/13 et libellé gauche actualisé.
4. Exécutions → Voir sur le canevas : affichage explicite de l’instantané v6, même après publication v7.
5. Mon équipe → sous-équipe Opérations → retour au périmètre directeur.
6. Compétence brouillon → exécuter les tests → deux résultats exacts obtenus et bouton de publication rendu disponible.
7. Navigation Transformation, Politiques, Sécurité, Dépenses, Administration ; ouverture des permissions d’un rôle et catalogue de modèles.
8. Menu mobile → processus RFP → vérification du défilement interne et des quatre onglets.
9. Rechargements : version publiée, décisions et résultats de tests conservés.

Console applicative contrôlée via le filtre `terminal.local` : aucune erreur relevée. Les messages d’une extension Chrome de métadonnées ont été distingués des erreurs de l’application.

Sept suites `npm test` réussies. Elles vérifient notamment les cycles du graphe, versions et snapshots, autorité, jetons périmés, refus, réaffectation, révocation, budgets, qualification, certification, hiérarchie, échappement et migrations.

## Limites et suites

La recette couvre les parcours décrits et les principaux états, pas chaque combinaison possible. La parité opérationnelle reste hors du périmètre actuel : identité serveur, concurrence, Temporal, Mastra, OAuth, modèles, métriques réelles et audit immuable sont absents. Voir l’[inventaire fonctionnel](docs/wand-feature-parity.md).

Aucun P0/P1/P2 restant n’a été identifié dans les parcours et captures de cette recette. Les prochaines améliorations de présentation sont une typographie métier plus homogène dans les tiroirs et des vues de comparaison plus riches ; elles n’empêchent pas les parcours testés.

final result: passed
