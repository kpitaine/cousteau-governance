# Guide produit — Cousteau Governance

Cousteau Governance permet à un responsable humain de relier les objectifs de son organisation aux agents qui travaillent sous sa délégation. La démonstration utilise Northstar AM, une organisation fictive de gestion d’actifs, sans connexion à des systèmes réels.

[Accéder à la démonstration](https://alto-govern-matthieu.keip.chatgpt.site)

## Les dix écrans

| Écran | Question du manager | Actions disponibles dans la démonstration |
| --- | --- | --- |
| Vue d’ensemble | Qu’est-ce qui avance et où dois-je intervenir ? | Lire la synthèse, ouvrir un objectif, une décision, les blocages ou le journal |
| Objectifs | Quels résultats attendons-nous ? | Créer ou modifier un objectif, examiner ses résultats clés, ses responsables et ses processus |
| Mes décisions | Qu’est-ce qui exige mon arbitrage ? | Filtrer les demandes, examiner les preuves, approuver, refuser avec motif, réaffecter |
| Équipes & agents | Qui fait quoi et sous quelle responsabilité ? | Filtrer par équipe ou type, ouvrir les fiches, ajouter un agent |
| Mandats | Que peut faire chaque agent ? | Modifier mission, responsable, autonomie, outils, limites et échéance ; suspendre ou réactiver |
| Points de blocage | Pourquoi un objectif prend-il du retard ? | Filtrer les causes, examiner les éléments, retenir un plan d’action et le documenter |
| Processus | Comment le travail est-il réparti ? | Inspecter les étapes et responsables, créer un brouillon, mettre en service, suspendre et simuler un dossier |
| Règles de gouvernance | Quel cadre commun s’applique ? | Consulter, modifier ou créer une règle ; changer son statut avec un motif |
| Journal & coûts | Qu’avons-nous décidé et consommé ? | Consulter les traces, exporter le journal, lire les coûts fictifs, ajuster le budget du scénario |
| Intégrations | Comment relier le cockpit aux moteurs ? | Lire les contrats cibles Temporal et Mastra, exporter une description JSON ; aucune connexion active |

## Parcours conseillé en dix minutes

### 1. Lire la situation

Depuis **Vue d’ensemble**, regarder les objectifs, les décisions prioritaires et le collectif. Les chiffres appartiennent au jeu de démonstration. Ouvrir « Répondre aux appels d’offres en 3 jours » pour examiner le responsable, les résultats clés et le processus associé.

### 2. Examiner une délégation

Dans **Équipes & agents**, sélectionner Quill, spécialiste des appels d’offres. Sa fiche relie mission, compétences, responsable et objectif. Ouvrir **Modifier le mandat** pour voir les limites et les ressources autorisées.

Les quatre niveaux sont :

| Niveau | Comportement attendu |
| --- | --- |
| 0 — Observation | L’agent analyse ; le lancement d’une action simulée est bloqué |
| 1 — Validation humaine | Le résultat ou l’action attend un arbitrage |
| 2 — Autonomie supervisée | Travail dans le périmètre du mandat, avec escalade des exceptions |
| 3 — Délégation étendue | Périmètre plus large, toujours soumis aux règles et aux étapes humaines explicites |

Augmenter un niveau ne supprime pas les contrôles de l’organisation. Les noms et nombres des niveaux sont un modèle de démonstration à préciser avec les métiers pour un produit réel.

### 3. Simuler un dossier

Dans **Processus**, ouvrir « Réponse aux appels d’offres », puis **Simuler un dossier**. Le scénario vérifie les conditions prévues, prépare des événements fictifs et crée une demande humaine. Aucune réponse n’est envoyée, aucun modèle n’est appelé.

Le détail du processus expose les étapes, les agents affectés et les exécutions récentes. Le dossier créé apparaît en attente de décision.

### 4. Arbitrer et retrouver la preuve

Dans **Mes décisions**, ouvrir la nouvelle demande. Lire le contexte, les éléments disponibles et la recommandation. Choisir **Approuver** ou **Refuser** ; le refus nécessite un motif. Une approbation met à jour le dossier simulé ; un refus le marque comme refusé.

Une demande traitée ne peut pas être approuvée une seconde fois. Si le mandat associé à une nouvelle simulation a changé, l’ancienne demande ne vaut plus pour cette action : la refuser puis relancer une simulation permet d’examiner le nouveau contexte. Un agent suspendu, en observation ou dont le mandat est expiré ne peut pas reprendre son action.

Ouvrir ensuite **Journal & coûts** pour retrouver la décision et son commentaire. Le journal est local, exportable et réinitialisable ; ce n’est pas un audit de production.

### 5. Choisir une action de management

Dans **Points de blocage**, examiner « Les validations commerciales ralentissent les réponses ». Les preuves expliquent le problème ; les options proposent un changement de responsabilité ou une clarification de mandat. Choisir une option et ajouter une note de suivi.

Le blocage rejoint **Plans engagés**. Les changements prévus sont appliqués au scénario, mais les progrès d’objectif ne sont pas artificiellement augmentés : l’effet reste à mesurer.

## Autres parcours utiles

### Ajouter un agent

Utiliser **Ajouter un agent**, préciser son identité, son équipe, son responsable, sa mission et son objectif. Le nouvel agent commence dans le cadre proposé par le formulaire ; vérifier ensuite son mandat avant de l’affecter à un processus. La création locale ne provisionne ni compte technique ni accès à un outil.

### Tester la suspension

Suspendre un agent depuis sa fiche ou son mandat, puis tenter de simuler un processus auquel il participe. Le lancement doit être refusé. Réactiver l’agent pour continuer le scénario. Dans cette version, aucun travail externe ne doit être interrompu : tout se passe dans le navigateur.

### Écrire une règle

Dans **Règles de gouvernance**, utiliser **Nouvelle règle** pour préciser la limite, son propriétaire, son périmètre et le traitement attendu. Une règle rédigée reste déclarative tant qu’aucun contrôle logiciel n’est associé. Le changement de son statut dans l’interface ne crée pas ce contrôle.

### Rechercher et naviguer

La recherche globale retrouve objectifs, agents et processus. Elle s’ouvre avec le bouton de recherche ou `Ctrl+K` / `⌘K`. La touche `Échap` ferme un panneau ou une boîte de dialogue. Sur écran étroit, le menu se replie.

## Conserver ou réinitialiser la démonstration

Les modifications sont propres au navigateur et à l’origine du site. Elles ne sont pas synchronisées avec un autre appareil ou utilisateur. Dans les paramètres de l’espace, **Exporter l’espace en JSON** conserve un instantané ; **Réinitialiser la démonstration** restaure le scénario initial après confirmation.

L’export ne comprend pas de mécanisme d’import depuis l’interface. Pour repartir sans perdre les modifications, exporter avant la réinitialisation.

## Lire correctement les indicateurs

La qualité, les coûts, les heures et les délais initiaux sont fictifs. Les simulations modifient certains compteurs pour rendre le parcours observable ; elles ne constituent pas un calcul financier ni une mesure d’efficacité réelle. Les objectifs et résultats clés peuvent être modifiés manuellement dans le prototype. Une version opérationnelle devra indiquer la source, la date et la méthode de calcul de chaque indicateur.

## Captures du produit

- [Vue d’ensemble](screenshots/01-overview.jpg)
- [Équipes et agents](screenshots/02-organization.jpg)
- [Décisions humaines](screenshots/03-decisions.jpg)
- [Points de blocage](screenshots/04-gaps.jpg)
- [Processus](screenshots/05-processes.jpg)
