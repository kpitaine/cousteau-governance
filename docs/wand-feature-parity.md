# Cousteau Governance — couverture fonctionnelle de la référence Wand OS

État de l’inventaire : **4 novembre 2026**. Référence produit demandée : [Wand OS](https://wand.ai/os.html). Le centre de Cousteau est **Teams / Governance** : objectifs, organisation, processus, interventions humaines, règles et pilotage. L’espace individuel Agents est complémentaire.

Ce document décrit ce que les fichiers présents permettent de vérifier. Il ne certifie pas une reproduction exhaustive de Wand OS, de ses services privés ou de son fonctionnement interne. Les informations et comportements non accessibles dans sa démonstration publique ne sont pas présumés connus.

Les statuts employés ont un sens précis :

- **Démontré** : parcours manipulable dans le code local, avec une modification d’état, une validation ou un calcul identifiable.
- **Simulation** : résultat produit par un scénario, une règle déterministe ou une donnée fictive ; aucun service métier n’est appelé.
- **À connecter** : composant nécessaire pour obtenir le comportement en production, absent de cette version.

Les modules sont raccordés à la navigation OS. La recette navigateur est documentée dans [design-qa.md](../design-qa.md), avec captures actualisées. Elle ne vaut pas validation des services de production absents.

## Teams et gouvernance : parcours principaux

| Parcours | Démontré dans le code | Simulation ou limite actuelle | À connecter pour la production |
| --- | --- | --- | --- |
| Vue d’ensemble de l’organisation | Agrégation des objectifs, décisions, agents, blocages et événements ; ouverture des dossiers associés. | Les indicateurs proviennent du scénario Northstar AM et des modifications locales. | Données opérationnelles, événements d’exécution et périmètre d’accès du lecteur. |
| Objectifs et résultats clés | Création et modification d’objectifs, sous-objectifs, résultats clés et associations à plusieurs processus ; contrôle des cycles de parenté. | Progression et historique sont saisis ou issus du scénario ; les effets d’un plan ne sont pas automatiquement comptés comme obtenus. | Sources de mesure, propriétaires authentifiés, calculs historisés et règles de consolidation. |
| Mon équipe | Résumé des heures humains/agents, séries hebdomadaires, sous-équipes, cascades d’objectifs, signaux d’attention et tableau hiérarchique dépliable ; filtres, tri et fiches de résultats. | Indicateurs fictifs ; aucune conversation privée dans les fiches de membres. | Périmètres authentifiés, données de travail et mesures réelles. |
| Équipes, registre et hiérarchie | Vues hiérarchie / registre, filtres, fiches personnes et agents, création de personnes, rattachement à un responsable humain, contrôle des cycles. | Les personnes représentent une organisation fictive. | Annuaire d’entreprise, synchronisation RH et règles d’administration du registre. |
| Mandats et autonomie | Édition de la mission, du responsable, des outils, des limites et de l’échéance ; niveaux d’autonomie ; suspension et réactivation. | Les consignes en texte libre sont documentaires. Les contrôles exécutés sont ceux explicitement codés. | Délégations signées, moteur central de permissions, enforcement sur chaque appel d’outil. |
| Points de blocage | Examen des preuves et options, ajout d’une proposition, choix d’un plan, suivi d’action, preuve de réalisation, classement et réouverture. | Coûts, délais et gains proposés sont des estimations. Une option peut ouvrir un parcours de formation, recrutement, connexion ou réaffectation sans effectuer une opération externe. | Détection sur événements réels, responsables de traitement, intégration aux processus RH / IT / métiers. |
| Interventions humaines | Demande contextualisée, preuves, motif, approbation ou refus ; poursuite du dossier au contrôle suivant ; réaffectation dans le Studio avec invalidation de l’ancien jeton. | Les reprises sont synchrones et locales ; aucun travailleur distant n’attend le navigateur. | File durable, notifications, échéances, relances et reprise Temporal. |
| Règles de gouvernance | Catalogue, création / modification, activation, mode de contrôle et périmètre. Des contrôles prédéfinis bloquent ou demandent une revue. | Une règle rédigée librement ne devient pas un programme. La couverture des contrôles dépend du moteur et de l’action concernés. | Moteur de politique commun, versionnement, validation et distribution aux exécutants. |
| Sécurité et revues d’accès | Événements fictifs filtrables, preuves, résolution / réouverture, enregistrement de revues d’accès et de connecteurs. | Les décisions de revue sont enregistrées localement. Les événements ne sont pas détectés par une plateforme de sécurité. | Collecte d’événements, IAM, SIEM, révocation dans les systèmes connectés. |
| Administration | CRUD de rôles, attribution compatible humain / agent, catalogue de permissions, périmètres, plafonds ; catalogue de modèles et revues de connecteurs. | La matrice de rôles est une configuration locale. Elle ne constitue pas encore un RBAC global appliqué à toutes les commandes. Choisir une persona n’est pas s’authentifier. | Authentification, sessions, tenants, moteur RBAC / ABAC, coffre de secrets et passerelle de modèles. |
| Transformation | Phases, critères et preuves, passage conditionné à la documentation des critères, maturité par équipe, parcours humains, budgets de formation et partage de valeur. | Les critères sont déclarés ; le produit ne vérifie pas leur réalité hors du scénario. Les financements ne déclenchent aucun paiement. | Preuves externes, gouvernance du programme, données RH / financières et suivi longitudinal. |
| Dépenses et valeur | Ventilation par équipe, agent, processus et modèle ; budgets et hypothèses modifiables ; calcul de temps et de valeur estimés. | Plusieurs ventilations sont proportionnelles ou hypothétiques. Les coûts fournisseurs, temps économisés et gains ne sont pas mesurés en production. | Mesure par appel / run, factures fournisseurs, coûts humains et méthode de mesure des bénéfices. |
| Journal et export | Historique local des mutations, acteur de décision, détails, export JSON et réinitialisation volontaire du scénario. | Journal modifiable avec les données du navigateur ; aucune garantie d’immutabilité, de conservation ou de non-répudiation. | Journal serveur append-only, horodatage fiable, conservation et export auditable. |

Implémentation : [governance.js](../dist/modules/governance.js), [governance-plus.js](../dist/modules/governance-plus.js), [teams.js](../dist/modules/teams.js), [organization.js](../dist/modules/organization.js), [store.js](../dist/modules/store.js) et [app.js](../dist/app.js). L’espace interventions et les personas complémentaires se trouvent dans [workspace.js](../dist/modules/workspace.js).

## Processus : conception, publication et exécution gouvernée

Le Studio est la couche la plus détaillée du démonstrateur. Les processus structurés et leurs exécutions sont dans `state.studio`. Les anciens dossiers restent dans `state.runs` ; ils ne sont pas transformés silencieusement en runs du Studio.

| Parcours | Démontré | Simulation ou limite | À connecter |
| --- | --- | --- | --- |
| Créer depuis un résultat attendu | Choix d’un modèle, description du résultat, création d’un brouillon. | Assemblage à partir de modèles prédéfinis ; aucune génération par LLM. | Génération Mastra encadrée par un schéma et revue humaine. |
| Concevoir le graphe | Déclencheur visible, phases et charge humaine/agent, branches, tâches agent / humain / outil, entrées, sorties, critères, dépendances, budgets et seuils ; ajout, duplication et suppression. | L’éditeur produit une définition locale. Il n’est pas un éditeur BPMN universel. | Schéma partagé avec l’orchestrateur, validation serveur et compatibilité de versions. |
| Vérifier la cohérence | Détection des cycles, identifiants dupliqués, dépendances absentes, incohérences entre liens et tâches, retours vers une phase précédente et paramètres invalides. | Contrôles structurels, sans preuve de validité métier du processus. | Analyse métier, tests d’intégration et contraintes propres aux outils. |
| Annuler / rétablir / comparer | Historique de brouillon, undo / redo, abandon et comparaison avec la version publiée. | Historique local, sans collaboration simultanée. | Stockage versionné et gestion de conflits multiutilisateur. |
| Publier | Validation du brouillon, version incrémentée, conservation des versions précédentes. | Publication dans l’état du navigateur. | Registre de définitions, permissions de publication et déploiement des workers. |
| Affecter le travail | Agent fixe ou candidat proposé, responsabilités humaines, compétences et scores de correspondance. | Scores de scénario et heuristiques simples. Le mode challenger ne lance pas deux modèles en parallèle. | Registre de capacités vérifiées, allocation et évaluation réelle des candidats. |
| Tester un brouillon | Exécution isolée sur la définition non publiée ; autorisations de test séparées des autorisations de runs publiés. | Jeu de données fictif et sorties déterministes. | Sandboxes d’outils et datasets représentatifs. |
| Lancer et suivre un dossier | Snapshot de la version, état de chaque étape, traces, preuves simulées, coûts estimés et arrêt du dossier. | Traversée locale du graphe. Les branches sont choisies par un scénario, sans parallélisme durable ni horloge d’exécution. | Temporal : activités, files, timers, retries, cancellation et reprise après incident. |
| Valider plusieurs contrôles | Arrêt à chaque contrôle humain ; reprise sans sauter le suivant ; refus terminal ; protection contre la réutilisation d’une demande traitée. | Identité sélectionnée dans la démonstration ; les jetons ne sont pas des justificatifs cryptographiques serveur. | Identité authentifiée, décision transactionnelle, idempotence et signal durable. |
| Autoriser une fois / de façon réutilisable | Autorisation réutilisable limitée aux cas éligibles et liée au processus, nœud, agent, action, mandat, politiques et contexte test / réel du scénario. | Une validation humaine explicite ou imposée par politique ne devient pas une autorisation permanente. Pas de délégation générale implicite. | Service d’autorisations, expirations et révocation centralisée. |
| Modifier en langage naturel | Quelques intentions reconnues, dont ajout d’une revue humaine, ajustement d’un délai et renforcement des preuves. Les intentions non prises en charge sont refusées. | Analyse par motifs de texte, pas compréhension générale d’un processus. | Assistant Mastra, proposition structurée, diff et validation. |
| Améliorer un processus | Propositions prédéfinies appliquées au brouillon puis publiées séparément. | Aucun apprentissage autonome, aucune preuve de gain réel. | Boucle d’évaluation sur exécutions et protocole d’expérimentation. |

Implémentation : [workflows.js](../dist/modules/workflows.js) et [workflow-store.js](../dist/modules/workflow-store.js). Tests : [workflows.mjs](../tests/workflows.mjs).

La suspension d’un **processus Studio** interdit les nouveaux dossiers ; ses dossiers déjà engagés restent attachés à leur version et peuvent terminer. La suspension d’un **agent**, l’expiration de son mandat ou la perte d’un accès requis bloque ses actions. Le moteur historique contrôle aussi le statut courant du processus avant une reprise : ces deux chemins ne doivent pas être assimilés à un moteur d’exécution unique.

## Capacités communes aux équipes

| Parcours | Démontré | Simulation ou limite | À connecter |
| --- | --- | --- | --- |
| Catalogue et recrutement d’agents | Consultation, création d’un profil, responsable humain, mission et applications requises. | Catalogue fictif ; aucun agent commercial ou worker n’est installé. | Catalogue approuvé, runtime Mastra et provisioning. |
| Qualification et pilote | Tests structurels, passage qualification → tests → pilote → production, preuve de cas pilote ; refus si accès requis révoqué ou agent suspendu. | Une preuve pilote est une sortie locale ; ce n’est pas une mesure de qualité d’un modèle réel. L’autonomie ne monte pas automatiquement. | Évaluations réelles, jeux de test, revue indépendante et critères de mise en service. |
| Compétences | Création, étapes, tests, révisions, publication après tests et revue ; règles de partage. | Trois évaluateurs déterministes : sources, rapprochement, complétude. Le texte des étapes n’est pas exécuté comme code. | Exécution de compétences Mastra, validation des outils et registre de versions. |
| Université / apprentissage | Inscription de personnes et agents, évaluation, score, certification humaine ; une révision invalide les certifications de la version précédente. | La certification est un état local sur les tests du scénario. Un libellé historique dans `agent.skills` n’est pas une certification à jour ; `skill.learners` fait foi. | Plateforme de formation, évaluations variées et preuve de compétence transférable. |
| Connexions | Installation d’un profil, configuration des scopes, test, revue, approbation et révocation ; modification de configuration invalidant les tests. | Tests de cohérence, sans réseau, OAuth, secrets ou accès aux services nommés. | Connecteurs réels, coffre de secrets, OAuth, contrôle des scopes et supervision. |

Implémentation : [capabilities.js](../dist/modules/capabilities.js), [capabilities-store.js](../dist/modules/capabilities-store.js). Tests : [capabilities.mjs](../tests/capabilities.mjs).

## Espace Agents : complément optionnel

Ces parcours aident à inspecter le travail d’un agent. Ils ne remplacent pas le centre Teams / Governance.

| Parcours | Démontré | Simulation ou limite | À connecter |
| --- | --- | --- | --- |
| Conversation et groupe | Messages locaux, réponses, traces, groupes d’agents et pièces textuelles. | Réponses par règles déterministes ; aucune conversation avec un modèle ou collaboration autonome entre agents. | Mastra, modèles, mémoire et autorisation des outils. |
| Brouillon et intervention | Préparation, modification, téléchargement et soumission d’un brouillon ; revue liée au contenu, destinataire, mandat et permissions. | L’approbation marque une revue locale. Aucun email ni document n’est envoyé ou publié. | Connecteur d’envoi, idempotence de l’effet et preuve du résultat. |
| Connaissances | Documents texte, versions, propriétaire, statut et agents associés ; fichiers texte locaux et téléchargement. | Pas d’index vectoriel, de RAG ni de DLP. Les règles d’accès restent locales. | Stockage documentaire, ingestion, recherche, provenance et droits serveur. |
| Tâches et horaires | Description et suivi local des tâches et de leur fréquence. | Aucune planification autonome quand la page est fermée. | Schedules Temporal, notifications et supervision. |
| Réglages et écran de travail | Permissions structurées, limites, règles, domaines, mémoire et représentation des traces. | Les domaines et consignes sont déclaratifs ; l’écran est une reconstitution, pas une session de navigateur distante. | Exécutant isolé, proxy d’outils et contrôle des accès. |
| Stratégies, rapports, expériences | Consultation, propositions, revue, adoption / retour à une version et rapports du scénario. | Scores illustratifs et comparaisons prédéfinies ; aucune optimisation automatique ni garantie statistique. | Évaluations versionnées, expériences contrôlées et critères de promotion. |

Implémentation : [workspace.js](../dist/modules/workspace.js) ; contrôle des demandes de brouillon dans [store.js](../dist/modules/store.js).

## Contrôles effectivement exercés

| Contrôle local | Preuve vérifiable | Limite à conserver visible |
| --- | --- | --- |
| Autorité d’une décision | Humain actif, responsable affecté ou ascendance de managers humains ; acteur réel et arbitrage hiérarchique enregistrés. | La persona est choisie librement. Ce contrôle ne remplace pas l’authentification. Le moteur historique garde une compatibilité sans workspace pour les anciens appels. |
| Version d’action | Snapshot du processus pour le run ; empreintes de mandat / action ; contenu et destinataire d’un brouillon figés à sa soumission. | Empreintes calculées en JavaScript local, sans signature ni protection contre un utilisateur modifiant son stockage. |
| Révocation | Agent suspendu, qualification incomplète, mandat expiré, accès requis absent / révoqué / non revalidé et budget global contrôlés dans les simulations. | La matrice de rôles d’administration et les revues `deniedPermissions` ne forment pas encore un contrôle universel commun à tous les chemins. |
| Validation répétée | Demande déjà traitée refusée ; jeton Studio renouvelé après réaffectation ; chaque étape humaine demeure distincte. | Pas de verrou transactionnel multiutilisateur. |
| Persistance | Migration additive des collections, conservation des espaces d’extension et des données utilisateur ; repli en mémoire si le stockage est indisponible. | `localStorage` propre au navigateur. Pas de serveur, de synchronisation, de sauvegarde automatique ou de tenant. |
| Texte utilisateur | Échappement HTML et tests de rendu sur plusieurs vues. | Les tests de rendu ne remplacent pas une recette complète de sécurité et d’accessibilité. |

## Vérification reproductible

Depuis la racine du dépôt :

```sh
npm test
```

Les fichiers de tests présents couvrent notamment :

- [domain.mjs](../tests/domain.mjs) : contrôles successifs, identité, hiérarchie, snapshot, révocation, budget, demandes de brouillon, migration et persistance.
- [workflows.mjs](../tests/workflows.mjs) : graphe, versions, undo / redo, demandes périmées, réaffectation, permissions limitées, séparation des tests et runs publiés.
- [capabilities.mjs](../tests/capabilities.mjs) : qualification, pilote, révocation, révisions de compétences, publication, certification, partage et actions de formulaire.
- [teams.mjs](../tests/teams.mjs) : périmètres hiérarchiques, agrégats, filtres, tri, repli et confidentialité des fiches.
- [governance-plus.mjs](../tests/governance-plus.mjs) : politiques typées, résultats clés, écarts, rôles, cycles et clôture d’événements.
- [workspace.mjs](../tests/workspace.mjs) : initialisation additive, reset, autorité, artefacts et contexte approuvé.
- [render.mjs](../tests/render.mjs) : rendu et échappement des vues du socle historique.

La recette navigateur a vérifié les routes principales, l’édition puis publication d’un processus, les validations successives, l’instantané d’un ancien dossier, les tests de compétences, les sous-équipes, l’administration et la navigation mobile. Les captures `06-os-*` à `11-os-*` correspondent à cette version ; les premières captures documentent la version antérieure. Voir le [rapport QA](../design-qa.md).

## Frontière actuelle de la livraison

Temporal et Mastra sont **la cible d’orchestration**, pas des intégrations actives. Le démonstrateur n’effectue aucun appel de modèle, workflow distant, envoi externe, écriture métier ou connexion à un compte d’entreprise. Les contrats cibles sont documentés dans [architecture.md](architecture.md), et les étapes de production dans [roadmap.md](roadmap.md).

Pour parler de parité opérationnelle, il reste à raccorder au minimum : identité et autorisation serveur, base persistante, API transactionnelle de décisions, historique durable, Temporal, Mastra, connecteurs autorisés, mesures réelles, isolation des organisations et tests de reprise / concurrence. La couverture d’une interface publique ne démontre pas ces propriétés.
