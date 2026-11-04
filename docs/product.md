# Guide produit — Cousteau Governance

Cousteau Governance reconstruit les parcours observables de l’espace **Wand OS — Teams et Governance** dans un démonstrateur indépendant. Les équipes y organisent leur travail commun ; les responsables suivent les objectifs, les délégations, les capacités et les exceptions. Le catalogue d’agents, les compétences et les applications sont des ressources de cette organisation partagée.

La démonstration utilise Northstar AM, une organisation fictive de gestion d’actifs. Les réponses, évaluations, exécutions et connexions sont simulées localement. Il ne s’agit pas d’une reproduction du moteur privé de Wand ni d’une connexion à ses services.

[Accéder à la démonstration](https://alto-govern-matthieu.keip.chatgpt.site)

## Les espaces et leurs parcours

| Écran | Question du manager | Actions disponibles dans la démonstration |
| --- | --- | --- |
| Vue d’ensemble | Qu’est-ce qui avance et où dois-je intervenir ? | Lire la synthèse, ouvrir un objectif, une décision, les blocages ou le journal |
| Objectifs | Quels résultats attendons-nous ? | Créer ou modifier un objectif, examiner ses résultats clés, ses responsables et ses processus |
| Mes décisions | Qu’est-ce qui exige mon arbitrage ? | Filtrer les demandes, examiner les preuves, approuver, refuser avec motif, réaffecter |
| Équipes & agents | Qui fait quoi et sous quelle responsabilité ? | Filtrer par équipe ou type, ouvrir les fiches, ajouter un agent |
| Catalogue d’agents | Quelle capacité ajouter à mon équipe ? | Examiner les profils proposés, leurs tâches et accès ; créer un agent ; suivre sa qualification, son pilote et sa mise en production simulée |
| Université des compétences | Comment transmettre une méthode vérifiée ? | Créer un brouillon, modifier et ordonner les étapes, exécuter des tests, publier, partager et former des apprenants humains ou agents |
| Espace de travail d’un agent | Quel résultat prépare-t-il et où doit intervenir le manager ? | Consulter la conversation, les traces, les documents, les tâches et les propositions d’amélioration ; préparer un brouillon et demander sa validation |
| Connaissances | Sur quel contexte l’équipe travaille-t-elle ? | Consulter et rattacher les documents de démonstration, gérer le contexte utile aux agents |
| Mandats | Que peut faire chaque agent ? | Modifier mission, responsable, autonomie, outils, limites et échéance ; suspendre ou réactiver |
| Points de blocage | Pourquoi un objectif prend-il du retard ? | Filtrer les causes, examiner les éléments, retenir un plan d’action et le documenter |
| Processus | Comment le travail est-il réparti ? | Concevoir phases, tâches et dépendances ; affecter les responsabilités ; comparer un brouillon à la version publiée ; tester, publier et suivre une exécution |
| Règles de gouvernance | Quel cadre commun s’applique ? | Consulter, modifier ou créer une règle ; changer son statut avec un motif |
| Journal & coûts | Qu’avons-nous décidé et consommé ? | Consulter les traces, exporter le journal, lire les coûts fictifs, ajuster le budget du scénario |
| Intégrations | Quels outils sont disponibles et avec quels droits ? | Ajouter une application ou créer un connecteur fictif ; configurer, tester, examiner, approuver, partager ou révoquer ses accès ; consulter les contrats Temporal et Mastra |
| Registre des équipes | Comment les humains et les agents sont-ils rattachés ? | Examiner la hiérarchie et les fiches, modifier les rattachements avec contrôle des cycles |
| Transformation | Où investir dans les capacités de l’organisation ? | Examiner les pistes, leur coût et leurs effets attendus, puis suivre les plans du scénario |
| Sécurité | Quelles exceptions aux règles demandent une revue ? | Examiner les événements, leurs preuves et les revues d’accès du scénario |
| Administration | Quels plafonds encadrent les rôles et les ressources ? | Consulter et modifier les rôles, les permissions, les modèles et les demandes de revue des connecteurs |

Le sélecteur de persona permet d’explorer les points de vue d’un manager, d’un collaborateur, de la direction, de la sécurité ou de l’administration. Il s’agit de profils de démonstration, sans authentification d’entreprise. Les permissions affichées ne constituent pas une frontière de sécurité serveur.

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

Dans **Processus**, ouvrir « Réponse aux appels d’offres ». Le studio présente quatre onglets : **Conception**, **Exécutions**, **Vue d’ensemble** et **Configuration**. La carte de conception relie phases, tâches, responsabilités et dépendances. Les vues **En service** et **Performance** permettent de relire le scénario publié et ses résultats fictifs.

Modifier une tâche ou une phase prépare un brouillon. **Tester** utilise ce brouillon sans remplacer la version en service. Les changements peuvent être comparés, annulés, rétablis ou abandonnés avant publication. Une exécution conserve la version du processus utilisée au démarrage.

Lancer un dossier depuis les exécutions, puis ouvrir sa chronologie. Le scénario vérifie les affectations et les limites, produit des résultats fictifs et s’arrête si une intervention humaine est requise. Aucune réponse n’est envoyée et aucun modèle n’est appelé. Un agent en qualification, suspendu ou privé d’un accès requis ne peut pas exécuter une tâche du scénario.

### 4. Arbitrer et retrouver la preuve

Dans la boîte des interventions ou le détail de l’exécution, ouvrir la nouvelle demande. Lire le contexte, les éléments disponibles, le responsable et la portée de l’action. Choisir une autorisation ponctuelle ou un refus. Les demandes du studio peuvent proposer une autorisation réutilisable uniquement lorsque le contrôle prévoit explicitement ce cas ; une étape humaine obligatoire ne peut pas être supprimée par cet accord.

Une décision met à jour le dossier simulé. Les décisions historiques du premier scénario restent également consultables dans **Mes décisions**. Le commentaire et l’issue sont inscrits dans le journal local.

Une demande traitée ne peut pas être approuvée une seconde fois. Si le mandat associé à une nouvelle simulation a changé, l’ancienne demande ne vaut plus pour cette action : la refuser puis relancer une simulation permet d’examiner le nouveau contexte. Un agent suspendu, en observation ou dont le mandat est expiré ne peut pas reprendre son action.

Ouvrir ensuite **Journal & coûts** pour retrouver la décision et son commentaire. Le journal est local, exportable et réinitialisable ; ce n’est pas un audit de production.

### 5. Choisir une action de management

Dans **Points de blocage**, examiner « Les validations commerciales ralentissent les réponses ». Les preuves expliquent le problème ; les options proposent un changement de responsabilité ou une clarification de mandat. Choisir une option et ajouter une note de suivi.

Le blocage rejoint **Plans engagés**. Les changements prévus sont appliqués au scénario, mais les progrès d’objectif ne sont pas artificiellement augmentés : l’effet reste à mesurer.

## Autres parcours utiles

### Ajouter un agent

Dans le **Catalogue d’agents** de l’équipe, les fiches sont regroupées par responsable humain. Les filtres permettent de retrouver les agents en activité, à l’essai ou à suivre ; la recherche porte sur leur nom, rôle, compétences et responsable. L’étoile ajoute ou retire un profil de la sélection personnelle.

Deux chemins aboutissent au même registre :

1. **Créer un agent** : préciser son nom, sa responsabilité, son rôle et son responsable ; les suggestions de rapprochement, de recherche ou de conformité préremplissent une proposition locale.
2. **Explorer le catalogue** : examiner les tâches proposées, les capacités, les applications nécessaires, les scores et les cas fictifs, puis recruter le profil avec un responsable identifié.

Le nouvel agent rejoint réellement la liste partagée des acteurs du démonstrateur. Son parcours comporte quatre étapes : **Qualification → Tests → Pilote → Production**. Les tests vérifient la présence d’un responsable, d’une mission et de limites explicites, ainsi que les accès requis. Un test manquant ou en échec bloque le passage en pilote. La mise en production simulée exige ensuite un cas pilote et une validation humaine motivée. La création locale ne provisionne aucun compte technique ni droit externe.

Le profil expose la mission, le manager, les compétences, les accès et les résultats de qualification. Il permet également de partager le profil, de le suspendre et d’ouvrir son mandat. Une suspension bloque les prochaines qualifications, les cas pilotes et les exécutions concernés.

### Transmettre une compétence

Ouvrir **Université des compétences**, puis **Créer une compétence**. Décrire la méthode, choisir son responsable et son type d’évaluation locale : vérification de source, comparaison de montants ou présence d’un contenu. Le système prépare un brouillon d’étapes et de tests à examiner ; aucune IA distante n’est appelée.

La bibliothèque propose les vues **Bibliothèque**, **Créées par vous** et **Partagées**, ainsi qu’une recherche. Chaque fiche indique son propriétaire, sa version, son état, ses apprenants et ses usages fictifs.

Dans le détail de la compétence :

1. Relire les étapes ; ajouter, modifier ou déplacer une étape si nécessaire.
2. Examiner les applications utilisées et le périmètre maximal déclaré.
3. Modifier les cas de test : entrée JSON et résultat attendu. L’exécution affiche le résultat obtenu et la comparaison exacte, avec succès ou échec.
4. Exécuter tous les tests de la révision courante, puis confirmer la revue humaine pour publier.
5. Définir qui peut utiliser et modifier la compétence : privé, équipe ou organisation, dans le plafond de partage du scénario.
6. Inscrire des humains ou des agents. Chaque inscription commence en formation ; exécuter une évaluation, puis valider explicitement la certification fictive.

Une inscription ne certifie personne. Une modification remet la compétence en brouillon, invalide les tests et remet les apprenants en formation. Une application révoquée bloque les évaluations et certifications qui en dépendent. Les tests comparent des sorties déterministes ; ils ne mesurent pas la compétence d’un modèle réel.

### Préparer une application et ses accès

Dans **Intégrations**, les onglets distinguent les applications installées, les connecteurs créés par l’utilisateur et le catalogue. Une fiche présente les outils de lecture et de préparation, le responsable et l’état de revue. **Connecté · simulation** signifie que la configuration locale a été testée et approuvée ; aucune application externe n’est connectée.

Pour une nouvelle application :

1. L’ajouter depuis le catalogue ou décrire un connecteur sur mesure.
2. Configurer son responsable et les périmètres autorisés parmi les outils proposés.
3. Tester la cohérence de cette configuration sur le jeu fictif.
4. Examiner les outils et leurs droits, puis approuver dans la simulation.
5. Partager le connecteur dans le périmètre autorisé, ou révoquer ses accès.

Toute reconfiguration invalide le test et l’approbation précédents. La révocation est prise en compte par les prochaines qualifications d’agents, évaluations de compétences et exécutions liées. Aucun formulaire ne demande de secret, de jeton ou d’adresse de serveur.

Les contrats cibles **Temporal** et **Mastra** restent accessibles au bas de cette page. Ils décrivent le raccordement à construire ; ils n’exécutent aucun appel vers ces moteurs.

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
