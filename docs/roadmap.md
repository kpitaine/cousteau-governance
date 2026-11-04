# Feuille de route — Cousteau Governance

Le démonstrateur valide une expérience de gouvernance. La prochaine étape est un pilote opérationnel restreint, avec un responsable humain, un processus et des outils autorisés clairement identifiés. Cette feuille de route ne suppose aucune intégration déjà réalisée et ne constitue pas un engagement de délai.

## 1. Stabiliser le contrat métier

Définir avec les responsables concernés les objets, les rôles, les états et les règles : mandat versionné, délégation temporaire, demande de décision, preuve, résultat accepté, incident et arrêt.

Préciser la différence entre propriétaire d’un processus, responsable d’un agent et valideur d’une action. Choisir un premier processus à faible exposition, par exemple préparer un reporting interne sans le publier automatiquement.

**Critère de sortie :** un scénario nominal et ses exceptions sont décrits, avec l’action exacte attendue, les preuves nécessaires et la personne autorisée à décider.

## 2. Ajouter le backend et l’identité

Construire une API de gouvernance et une base persistante ; mettre en place migrations, sauvegardes et séparation des environnements. Connecter le fournisseur d’identité retenu. Les droits sont vérifiés côté serveur pour chaque lecture et mutation, avec isolation des organisations.

Remplacer les responsables saisis en texte libre par des identifiants stables. Versionner les mandats et les règles. Ajouter une gestion des conflits pour éviter l’écrasement d’un changement concurrent.

**Critère de sortie :** deux utilisateurs accèdent à un même état partagé, chacun selon ses droits ; les accès hors périmètre sont rejetés et tracés.

## 3. Rendre les décisions et l’audit fiables

Enregistrer les demandes, décisions et événements de publication de façon transactionnelle. Lier l’approbation à l’action exacte, à ses arguments, à ses ressources et aux versions applicables. Gérer expiration, réaffectation, retrait, doublons et décisions concurrentes.

Créer un journal serveur protégé en intégrité, avec rétention, droits de consultation et export. Les secrets et contenus sensibles doivent être exclus des traces inutiles ; les preuves sont référencées et protégées selon leur périmètre.

**Critère de sortie :** une décision ne peut être appliquée deux fois, modifiée silencieusement ou utilisée pour une autre action ; l’audit permet de reconstituer le dossier.

## 4. Raccorder Temporal

Créer un workflow pour le premier processus. Échanger demandes de décision, réponses et états avec des identifiants stables. Prévoir les attentes humaines, échéances, reprises, annulations et réconciliations après incident.

Traiter les messages dupliqués ou reçus dans le désordre. Reprendre un événement après panne sans le perdre ni appliquer deux fois son effet. La projection du cockpit doit afficher une date de fraîcheur et distinguer un état confirmé d’une commande en cours.

**Critère de sortie :** redémarrer les composants pendant une attente humaine ne perd ni la demande ni l’issue de l’arbitrage.

## 5. Raccorder Mastra et les outils

Implémenter un travail agentique borné. Charger son mandat, contrôler les sources et intercepter les appels d’outils avant tout effet externe. Les règles sont appliquées hors du modèle. Les identités techniques et secrets restent dans le périmètre serveur.

Commencer par un outil de lecture et un outil d’écriture de test. Associer une clé d’idempotence à chaque effet. Une modification du contenu à exécuter après approbation doit demander une nouvelle décision.

**Critère de sortie :** l’agent ne peut pas élargir ses droits, exécuter une action refusée ou utiliser une approbation pour des arguments différents, même après une reprise.

## 6. Mettre en œuvre révocation et supervision

Propager suspensions, expirations et réductions de mandat vers les exécutions actives. Revérifier l’autorité juste avant l’engagement d’une action. Définir le traitement des opérations déjà engagées et des compensations possibles.

Mesurer attente humaine, coût, qualité acceptée, reprise manuelle, erreurs et incidents. Définir des limites opérationnelles et une personne responsable des exceptions. Les seuils de confiance d’un modèle ne remplacent pas une autorisation.

**Critère de sortie :** une suspension empêche les prochaines actions, l’interface affiche ce qui est effectivement arrêté et un responsable peut traiter les situations ambiguës.

## 7. Tester avant le pilote métier

| Famille | Cas à vérifier |
| --- | --- |
| Droits | Mauvaise organisation, mauvais rôle, responsable révoqué, tentative d’auto-approbation interdite |
| Mandats | Expiration, réduction de périmètre, outil retiré, changement concurrent, version périmée |
| Décisions | Double clic, messages dupliqués, refus, expiration, réaffectation, arguments modifiés |
| Exécution | Panne après effet externe mais avant reçu, reprise, action déjà engagée, compensation |
| Intégrations | Timeout, indisponibilité, erreur métier, message désordonné, contrat incompatible |
| Données | Injection dans contenus ou instructions, fuite par outil, contrôle des preuves et des exports |
| Interface | Accessibilité clavier, contraste, mobile, états vides, erreurs et lenteur réseau |
| Mesures | Provenance des indicateurs, distinction prévision/résultat, coût de supervision humaine |
| Exploitation | Sauvegarde/restauration, disponibilité, journalisation, alertes et procédure d’incident |

Les sept suites actuelles vérifient la logique locale, les vues modulaires, les versions de graphe, les décisions successives, les droits du valideur, les révocations, les compétences et les migrations. Ils seront conservés, puis complétés par des tests d’API, de contrat, d’intégration Temporal / Mastra, de bout en bout et de sécurité.

## 8. Étendre après observation

Après un pilote mesuré, ajouter progressivement des processus, outils et équipes. Les extensions possibles comprennent les délégations avec suppléants, la double validation, le raccordement des versions de processus, propositions d’amélioration et évaluations déjà présentes dans le démonstrateur, puis la mesure des blocages issue des événements réels.

Le diagnostic automatique des causes et les recommandations d’organisation demandent leurs propres évaluations. Une corrélation entre attente et retard ne suffit pas à démontrer une cause, et un changement de staffing ne doit pas être appliqué automatiquement à partir d’une suggestion.

## Définition d’un premier pilote réussi

Un responsable attribue un mandat ; un agent prépare un résultat avec des outils autorisés ; une demande argumentée arrive au bon valideur ; sa décision survit aux incidents et s’applique une seule fois à l’action présentée ; une suspension bloque les actions suivantes ; le résultat et son coût sont observables. Ce parcours doit fonctionner sur un périmètre restreint avant toute généralisation.
