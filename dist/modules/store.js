/* Cousteau Governance — local demonstration domain. No external execution or real financial data. */
const STORAGE_KEY = 'alto-govern-demo-v1';
const VERSION = 2;
const clone = value => JSON.parse(JSON.stringify(value));
const date = '2026-11-04T09:00:00.000Z';
const approvedTools = ['Documents internes','Référentiel fonds','Données marché','CRM','Comptabilité','Messagerie interne','Contrôles conformité'];
const mandate = (mission, reviewer, tools, limits) => ({mission,reviewer,tools,limits,expires:'2026-12-31'});

export const seed = {
  version: VERSION,
  settings: {budget:8000,workspace:'Northstar AM',period:'Novembre 2026',demo:true},
  agents: [
    {id:'h-matthieu',name:'Matthieu Keip',initials:'MK',role:'Directeur de la transformation',type:'human',team:'Opérations',manager:'Direction générale',status:'active',autonomy:3,quality:0,hours:18,cost:0,skills:['Stratégie','Gouvernance'],objectiveId:'g-autonomy',mandate:mandate('Piloter la transformation et arbitrer les délégations.','Direction générale',approvedTools,'Politiques de l’organisation applicables.')},
    {id:'h-claire',name:'Claire Martin',initials:'CM',role:'Responsable des opérations',type:'human',team:'Opérations',manager:'Matthieu Keip',status:'active',autonomy:3,quality:0,hours:32,cost:0,skills:['Clôture','Contrôle'],objectiveId:'g-operations',mandate:mandate('Garantir une clôture fiable et dans les délais.','Matthieu Keip',['Comptabilité','Référentiel fonds'],'Validation des exceptions de rapprochement.')},
    {id:'h-sophie',name:'Sophie Laurent',initials:'SL',role:'Responsable conformité',type:'human',team:'Conformité',manager:'Matthieu Keip',status:'active',autonomy:3,quality:0,hours:28,cost:0,skills:['Conformité','Validation'],objectiveId:'g-compliance',mandate:mandate('Superviser la conformité des communications.','Matthieu Keip',['Contrôles conformité','Documents internes'],'Revue des communications externes.')},
    {id:'h-julien',name:'Julien Moreau',initials:'JM',role:'Responsable distribution',type:'human',team:'Distribution',manager:'Matthieu Keip',status:'active',autonomy:3,quality:0,hours:24,cost:0,skills:['Appels d’offres','Relation clients'],objectiveId:'g-rfp',mandate:mandate('Améliorer les délais de réponse aux appels d’offres.','Matthieu Keip',['CRM','Documents internes'],'Engagement externe soumis à validation.')},
    {id:'h-alexandre',name:'Alexandre Dubois',initials:'AD',role:'Responsable recherche',type:'human',team:'Investissement',manager:'Matthieu Keip',status:'active',autonomy:3,quality:0,hours:30,cost:0,skills:['Recherche','Analyse'],objectiveId:'g-research',mandate:mandate('Encadrer les analyses et vérifier leurs sources.','Matthieu Keip',['Données marché','Documents internes'],'Aucune exécution d’ordre de marché.')},
    {id:'h-lea',name:'Léa Bernard',initials:'LB',role:'Analyste opérations',type:'human',team:'Opérations',manager:'Claire Martin',status:'active',autonomy:2,quality:0,hours:26,cost:0,skills:['Rapprochement','Contrôle qualité'],objectiveId:'g-operations',mandate:mandate('Examiner les exceptions et documenter les écarts.','Claire Martin',['Comptabilité'],'Escalade des écarts non résolus.')},
    {id:'a-atlas',name:'Atlas',initials:'AT',role:'Coordinateur des opérations',type:'agent',team:'Opérations',manager:'Claire Martin',status:'active',autonomy:2,quality:97,hours:112,cost:1260,skills:['Rapprochement','Synthèse','Coordination'],objectiveId:'g-operations',mandate:mandate('Préparer les rapprochements et remonter les écarts avec leurs justificatifs.','Claire Martin',['Comptabilité','Référentiel fonds'],'Aucune correction comptable sans validation humaine.')},
    {id:'a-prism',name:'Prism',initials:'PR',role:'Analyste de recherche',type:'agent',team:'Investissement',manager:'Alexandre Dubois',status:'active',autonomy:2,quality:94,hours:86,cost:980,skills:['Recherche','Sources','Synthèse'],objectiveId:'g-research',mandate:mandate('Préparer des notes sourcées à destination des analystes.','Alexandre Dubois',['Données marché','Documents internes'],'Usage interne uniquement ; aucune recommandation publiée automatiquement.')},
    {id:'a-sentinel',name:'Sentinel',initials:'SE',role:'Contrôleur des communications',type:'agent',team:'Conformité',manager:'Sophie Laurent',status:'active',autonomy:1,quality:98,hours:74,cost:740,skills:['Conformité','Détection','Traçabilité'],objectiveId:'g-compliance',mandate:mandate('Contrôler les documents et préparer les avis de conformité.','Sophie Laurent',['Contrôles conformité','Documents internes'],'L’avis final reste signé par la conformité.')},
    {id:'a-quill',name:'Quill',initials:'QU',role:'Spécialiste appels d’offres',type:'agent',team:'Distribution',manager:'Julien Moreau',status:'active',autonomy:2,quality:91,hours:64,cost:620,skills:['Rédaction','Appels d’offres','Recherche'],objectiveId:'g-rfp',mandate:mandate('Assembler des réponses aux appels d’offres à partir de contenus approuvés.','Julien Moreau',['CRM','Documents internes','Référentiel fonds'],'Aucun envoi externe ni engagement commercial sans revue.')},
    {id:'a-beacon',name:'Beacon',initials:'BE',role:'Veille des risques',type:'agent',team:'Investissement',manager:'Alexandre Dubois',status:'pilot',autonomy:1,quality:89,hours:38,cost:410,skills:['Veille','Risques','Classification'],objectiveId:'g-research',mandate:mandate('Détecter et qualifier les événements susceptibles d’affecter les analyses.','Alexandre Dubois',['Données marché','Documents internes'],'Phase pilote : validation de chaque synthèse.')},
    {id:'a-nova',name:'Nova',initials:'NO',role:'Assistant de reporting',type:'agent',team:'Opérations',manager:'Claire Martin',status:'active',autonomy:2,quality:96,hours:58,cost:520,skills:['Reporting','Qualité','Documents'],objectiveId:'g-operations',mandate:mandate('Assembler les rapports de suivi et vérifier leur complétude.','Claire Martin',['Référentiel fonds','Documents internes','Messagerie interne'],'Diffusion interne dans le périmètre de l’équipe uniquement.')}
  ],
  goals: [
    {id:'g-operations',title:'Clôturer les contrôles avant 10 h',owner:'Claire Martin',team:'Opérations',status:'on-track',progress:78,targetDate:'2026-12-31',description:'Fiabiliser les rapprochements quotidiens et réduire le temps passé sur les exceptions.',krs:[{label:'Contrôles terminés avant 10 h',current:94,target:98,unit:'%'},{label:'Rapprochements automatiques',current:88,target:95,unit:'%'},{label:'Rapports complets au premier passage',current:96,target:99,unit:'%'}],processIds:['p-reconcile','p-reporting']},
    {id:'g-rfp',title:'Répondre aux appels d’offres en 3 jours',owner:'Julien Moreau',team:'Distribution',status:'off-track',progress:42,targetDate:'2026-12-31',description:'Coordonner les experts, réutiliser les réponses approuvées et réduire l’attente de validation.',krs:[{label:'Dossiers remis dans les délais',current:72,target:95,unit:'%'},{label:'Réponses réutilisables et validées',current:64,target:90,unit:'%'}],processIds:['p-rfp']},
    {id:'g-compliance',title:'Revoir chaque communication sous 24 h',owner:'Sophie Laurent',team:'Conformité',status:'at-risk',progress:56,targetDate:'2026-12-31',description:'Concentrer le temps de la conformité sur les écarts significatifs tout en conservant une validation humaine.',krs:[{label:'Documents revus sous 24 h',current:79,target:95,unit:'%'},{label:'Constats accompagnés de preuves',current:96,target:100,unit:'%'}],processIds:['p-compliance']},
    {id:'g-research',title:'Doubler la couverture de recherche',owner:'Alexandre Dubois',team:'Investissement',status:'on-track',progress:71,targetDate:'2026-12-31',description:'Augmenter la couverture tout en maintenant la qualité et la traçabilité des sources.',krs:[{label:'Émetteurs couverts',current:142,target:200,unit:''},{label:'Notes avec sources vérifiées',current:97,target:100,unit:'%'}],processIds:['p-research']},
    {id:'g-autonomy',title:'Déléguer 40 % du travail, sous contrôle',owner:'Matthieu Keip',team:'Opérations',status:'at-risk',progress:63,targetDate:'2026-12-31',description:'Déployer des agents responsables, mesurer les résultats acceptés et maîtriser la charge de supervision.',krs:[{label:'Part du travail délégué',current:31,target:40,unit:'%'},{label:'Résultats acceptés sans reprise',current:94,target:97,unit:'%'},{label:'Décisions humaines dans les délais',current:82,target:95,unit:'%'}],processIds:['p-reconcile','p-rfp','p-compliance','p-research','p-reporting']}
  ],
  decisions: [
    {id:'d-rfp',title:'Valider la réponse à l’appel d’offres Horizon',agentId:'a-quill',processId:'p-rfp',goalId:'g-rfp',type:'approval',priority:'high',status:'pending',summary:'Le dossier est complet. Deux engagements de service demandent une validation avant tout envoi externe.',evidence:['18 réponses issues de la bibliothèque approuvée','2 engagements nouveaux signalés et surlignés','Aucun envoi externe effectué'],recommendation:'Valider le contenu après confirmation des engagements de service.',createdAt:'2026-11-04T08:20:00Z',dueAt:'2026-11-04T16:00:00Z',amount:0,runId:'run-rfp'},
    {id:'d-reconcile',title:'Arbitrer un écart de rapprochement',agentId:'a-atlas',processId:'p-reconcile',goalId:'g-operations',type:'exception',priority:'high',status:'pending',summary:'Atlas a isolé un écart de date de valeur dans le lot de démonstration NS-042. Il propose une correction documentée.',evidence:['Toutes les lignes concernées ont été identifiées','Deux sources concordantes sur la date attendue','Correction proposée, jamais appliquée automatiquement'],recommendation:'Faire confirmer la date par l’équipe opérations avant correction.',createdAt:'2026-11-04T08:45:00Z',dueAt:'2026-11-04T12:00:00Z',amount:0,runId:'run-reconcile'},
    {id:'d-compliance',title:'Signer l’avis de conformité du reporting',agentId:'a-sentinel',processId:'p-compliance',goalId:'g-compliance',type:'approval',priority:'medium',status:'pending',summary:'Sentinel a terminé les contrôles. Une formulation sur les performances a été corrigée et attend la signature du responsable.',evidence:['12 contrôles documentaires effectués','Avertissements présents sur les 6 pages','Formulation corrigée visible dans la proposition'],recommendation:'Valider la version corrigée après lecture du passage concerné.',createdAt:'2026-11-04T07:50:00Z',dueAt:'2026-11-05T10:00:00Z',amount:0,runId:'run-compliance'},
    {id:'d-budget',title:'Autoriser une analyse complémentaire',agentId:'a-prism',processId:'p-research',goalId:'g-research',type:'budget',priority:'medium',status:'pending',summary:'Prism propose un lot d’analyse supplémentaire de 24 émetteurs. Le coût estimé dépasse son budget de mission.',evidence:['24 émetteurs supplémentaires à couvrir','Coût estimé : 120 € dans ce scénario fictif','Budget de l’organisation disponible'],recommendation:'Autoriser ce lot plafonné à 120 € et contrôler le résultat.',createdAt:'2026-11-04T09:10:00Z',dueAt:'2026-11-05T17:00:00Z',amount:120,runId:'run-research'}
  ],
  gaps: [
    {id:'gap-authority',title:'Les validations commerciales ralentissent les réponses',category:'authority',team:'Distribution',goalId:'g-rfp',processId:'p-rfp',impact:'high',status:'open',summary:'Les réponses attendent 11 heures en moyenne avant de trouver leur validateur. La responsabilité existe, mais le circuit reste implicite.',evidence:['7 dossiers sur 12 ont attendu une affectation','La validation représente 46 % du délai de réponse','Julien Moreau a validé 5 dossiers sans modification'],options:[{id:'route',label:'Nommer un valideur à chaque étape',description:'Affecter explicitement Julien Moreau aux validations commerciales.',impact:'Attente réduite, estimation : −4 h par dossier',action:'assign-reviewer'},{id:'clarify',label:'Clarifier le mandat de Quill',description:'Formaliser les préparations autorisées et conserver une revue avant l’envoi.',impact:'Moins d’escalades ambiguës',action:'clarify-mandate'}]},
    {id:'gap-capacity',title:'La conformité concentre trop de décisions',category:'capacity',team:'Conformité',goalId:'g-compliance',processId:'p-compliance',impact:'high',status:'open',summary:'La file de revue de Sophie Laurent augmente. Un second regard humain peut absorber les dossiers courants sans retirer le contrôle.',evidence:['19 documents attendent une revue','Délai médian observé : 29 h','82 % des dossiers n’ont qu’une correction mineure'],options:[{id:'backup',label:'Affecter un renfort à la préparation',description:'Confier à Léa Bernard la vérification de complétude avant la revue de conformité.',impact:'Préparation plus rapide ; signature inchangée',action:'capacity-reassign'},{id:'batch',label:'Créer une revue quotidienne dédiée',description:'Ajouter une étape humaine de revue quotidienne explicitement affectée.',impact:'Traitement régulier de la file',action:'review-stage'}]},
    {id:'gap-data',title:'Nova manque de données de coût détaillées',category:'data',team:'Opérations',goalId:'g-autonomy',processId:'p-reporting',impact:'medium',status:'open',summary:'Le suivi de valeur utilise des estimations. Le coût par résultat ne pourra être fiabilisé qu’avec une source approuvée et intégrée.',evidence:['Les coûts des agents sont renseignés pour la démonstration','Aucune connexion comptable réelle dans cette version','Le temps humain de revue reste à mesurer'],options:[{id:'request',label:'Créer une demande de raccordement',description:'Ouvrir une décision pour Claire Martin ; aucun accès externe n’est accordé.',impact:'Responsable et demande tracés',action:'data-request'}]},
    {id:'gap-skill',title:'Beacon doit renforcer la vérification des sources',category:'capability',team:'Investissement',goalId:'g-research',processId:'p-research',impact:'medium',status:'open',summary:'En pilote, Beacon trouve les signaux pertinents mais sa qualification des sources nécessite encore une revue systématique.',evidence:['Qualité du pilote : 89 % sur les exemples fictifs','3 erreurs de qualification sur les 28 derniers cas du scénario','Les notes restent soumises à validation'],options:[{id:'training',label:'Ouvrir un plan de qualification',description:'Ajouter une compétence en cours de validation et maintenir le statut pilote.',impact:'Aucune promotion automatique d’autonomie',action:'training'}]},
    {id:'gap-adoption',title:'Le reporting préparé reste peu utilisé',category:'adoption',team:'Opérations',goalId:'g-operations',processId:'p-reporting',impact:'medium',status:'open',summary:'L’équipe reconstruit certains rapports à la main, faute de critères explicites pour accepter ceux de Nova.',evidence:['4 rapports sur 10 sont repris intégralement','Les critères de complétude ne sont pas formalisés','Nova atteint 96 % de qualité dans le scénario'],options:[{id:'criteria',label:'Définir une revue de complétude',description:'Ajouter une vérification humaine explicite avant diffusion interne.',impact:'Une même définition du résultat accepté',action:'acceptance-stage'}]}
  ],
  processes: [
    {id:'p-reconcile',name:'Rapprochement quotidien',description:'Contrôler les positions, expliquer les écarts et faire valider les corrections.',owner:'Claire Martin',team:'Opérations',agentIds:['a-atlas'],goalId:'g-operations',status:'live',cases:148,autonomousRate:88,medianTime:'18 min',steps:[{name:'Collecter les positions',actor:'Atlas',kind:'agent'},{name:'Rapprocher et documenter',actor:'Atlas',kind:'agent'},{name:'Contrôler le mandat',actor:'Gouvernance',kind:'control'},{name:'Valider les exceptions',actor:'Claire Martin',kind:'human'}]},
    {id:'p-rfp',name:'Réponse aux appels d’offres',description:'Assembler un dossier sourcé, contrôler son contenu et obtenir la validation finale.',owner:'Julien Moreau',team:'Distribution',agentIds:['a-quill','a-sentinel'],goalId:'g-rfp',status:'live',cases:12,autonomousRate:67,medianTime:'4,2 j',steps:[{name:'Qualifier le dossier',actor:'Quill',kind:'agent'},{name:'Rédiger les réponses',actor:'Quill',kind:'agent'},{name:'Contrôler le contenu',actor:'Sentinel',kind:'control'},{name:'Valider la proposition',actor:'Julien Moreau',kind:'human'}]},
    {id:'p-compliance',name:'Revue des communications',description:'Vérifier les mentions et préparer un avis pour le responsable conformité.',owner:'Sophie Laurent',team:'Conformité',agentIds:['a-sentinel'],goalId:'g-compliance',status:'live',cases:46,autonomousRate:74,medianTime:'29 h',steps:[{name:'Analyser le document',actor:'Sentinel',kind:'agent'},{name:'Vérifier les mentions',actor:'Sentinel',kind:'control'},{name:'Signer l’avis',actor:'Sophie Laurent',kind:'human'}]},
    {id:'p-research',name:'Note de recherche augmentée',description:'Préparer une note argumentée et vérifier les sources avant acceptation.',owner:'Alexandre Dubois',team:'Investissement',agentIds:['a-prism','a-beacon'],goalId:'g-research',status:'live',cases:28,autonomousRate:82,medianTime:'42 min',steps:[{name:'Identifier les signaux',actor:'Beacon',kind:'agent'},{name:'Rédiger la synthèse',actor:'Prism',kind:'agent'},{name:'Vérifier les sources',actor:'Gouvernance',kind:'control'},{name:'Accepter la note',actor:'Alexandre Dubois',kind:'human'}]},
    {id:'p-reporting',name:'Reporting de gouvernance',description:'Assembler les résultats et produire une synthèse de pilotage interne.',owner:'Claire Martin',team:'Opérations',agentIds:['a-nova'],goalId:'g-operations',status:'live',cases:34,autonomousRate:91,medianTime:'12 min',steps:[{name:'Collecter les indicateurs',actor:'Nova',kind:'agent'},{name:'Vérifier la complétude',actor:'Gouvernance',kind:'control'},{name:'Préparer le rapport interne',actor:'Nova',kind:'agent'}]}
  ],
  policies: [
    {id:'pol-identity',title:'Une identité et un responsable pour chaque agent',category:'Sécurité',scope:'Tous les agents',rule:'Chaque agent agit sous son identité, avec un responsable humain identifié.',mode:'block',owner:'Matthieu Keip',enabled:true,check:'identity'},
    {id:'pol-data',title:'Utiliser uniquement les sources approuvées',category:'Données',scope:'Tous les processus',rule:'Les outils du mandat doivent appartenir au catalogue approuvé de l’organisation.',mode:'block',owner:'Sophie Laurent',enabled:true,check:'approved-tools'},
    {id:'pol-external',title:'Revue humaine avant engagement externe',category:'Autorité',scope:'Distribution',rule:'Toute communication engageante externe nécessite une validation humaine préalable.',mode:'ask',owner:'Julien Moreau',enabled:true,check:'external-approval'},
    {id:'pol-budget',title:'Respecter l’enveloppe budgétaire',category:'Budget',scope:'Tous les agents',rule:'Les nouvelles missions sont bloquées si le budget mensuel d’exécution est atteint.',mode:'block',owner:'Claire Martin',enabled:true,check:'budget'},
    {id:'pol-mandate',title:'Le mandat limite toujours l’autonomie',category:'Autorité',scope:'Tous les agents',rule:'Une délégation ne supprime ni les limites organisationnelles ni les étapes de validation humaine.',mode:'block',owner:'Matthieu Keip',enabled:true,check:'mandate'},
    {id:'pol-audit',title:'Tracer chaque décision et chaque action',category:'Sécurité',scope:'Toute l’organisation',rule:'Conserver l’auteur, la décision, son contexte et l’issue de l’exécution.',mode:'log',owner:'Sophie Laurent',enabled:true,check:'audit'}
  ],
  runs: [
    {id:'run-rfp',processId:'p-rfp',status:'waiting',startedAt:'2026-11-04T08:00:00Z',decisionId:'d-rfp',events:[{title:'Dossier préparé',detail:'Quill a assemblé les contenus approuvés.',time:'2026-11-04T08:12:00Z',status:'completed'},{title:'Validation attendue',detail:'Julien Moreau doit confirmer les engagements.',time:'2026-11-04T08:20:00Z',status:'waiting'}]},
    {id:'run-reconcile',processId:'p-reconcile',status:'waiting',startedAt:'2026-11-04T08:30:00Z',decisionId:'d-reconcile',events:[{title:'Écart documenté',detail:'Atlas a isolé les lignes concernées.',time:'2026-11-04T08:40:00Z',status:'completed'},{title:'Arbitrage demandé',detail:'Aucune correction appliquée.',time:'2026-11-04T08:45:00Z',status:'waiting'}]},
    {id:'run-compliance',processId:'p-compliance',status:'waiting',startedAt:'2026-11-04T07:30:00Z',decisionId:'d-compliance',events:[{title:'Contrôles terminés',detail:'Sentinel a préparé son avis.',time:'2026-11-04T07:45:00Z',status:'completed'},{title:'Signature attendue',detail:'L’avis final revient à Sophie Laurent.',time:'2026-11-04T07:50:00Z',status:'waiting'}]},
    {id:'run-research',processId:'p-research',status:'waiting',startedAt:'2026-11-04T09:00:00Z',decisionId:'d-budget',events:[{title:'Lot complémentaire proposé',detail:'24 émetteurs ; coût estimé : 120 €.',time:'2026-11-04T09:05:00Z',status:'completed'},{title:'Budget à autoriser',detail:'La mission attend la décision humaine.',time:'2026-11-04T09:10:00Z',status:'waiting'}]}
  ],
  audit: [
    {id:'audit-1',time:'2026-11-04T09:10:00Z',actor:'Prism',action:'Budget soumis à validation',detail:'Note de recherche augmentée · lot fictif de 120 €.'},
    {id:'audit-2',time:'2026-11-04T08:45:00Z',actor:'Atlas',action:'Exception remontée',detail:'Rapprochement NS-042 · correction en attente de Claire Martin.'},
    {id:'audit-3',time:'2026-11-04T08:20:00Z',actor:'Quill',action:'Validation humaine demandée',detail:'Appel d’offres Horizon · aucun envoi externe effectué.'},
    {id:'audit-4',time:'2026-11-03T16:30:00Z',actor:'Matthieu Keip',action:'Mandat renouvelé',detail:'Atlas · autonomie supervisée · échéance au 31 décembre 2026.'},
    {id:'audit-5',time:'2026-11-03T14:00:00Z',actor:'Sophie Laurent',action:'Politique confirmée',detail:'Sources approuvées uniquement · applicable à tous les processus.'}
  ]
};

const listeners = new Set();
let sequence = 0;
const uid = prefix => `${prefix}-${Date.now().toString(36)}-${(++sequence).toString(36)}`;
const now = () => new Date().toISOString();
const coreCollections = ['agents','goals','decisions','gaps','processes','policies','runs','audit'];
export function migrateState(saved) {
  const next = saved && typeof saved === 'object' && !Array.isArray(saved) ? clone(saved) : {};
  for (const key of coreCollections) if (!Array.isArray(next[key])) next[key] = clone(seed[key]);
  next.settings = {...seed.settings, ...(next.settings && typeof next.settings === 'object' && !Array.isArray(next.settings) ? next.settings : {})};
  next.version = Math.max(Number(next.version) || 0, VERSION);
  return next;
}
function load() {
  try {
    const stored = JSON.parse(globalThis.localStorage?.getItem(STORAGE_KEY) || 'null');
    return migrateState(stored || seed);
  } catch { return migrateState(seed); }
}
let state = load();
function persist() { try { globalThis.localStorage?.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { /* Current session remains functional. */ } }
function notify() { for (const callback of listeners) { try { callback(state); } catch (error) { console.error('Cousteau Governance render error', error); } } }
function person(s, value) {
  if (!value) return undefined;
  const needle=String(value).trim().toLowerCase();
  const exact=s.agents.find(a=>a.id===value||a.name?.toLowerCase()===needle);
  if(exact)return exact;
  const first=s.agents.filter(a=>a.name?.split(' ')[0].toLowerCase()===needle);
  return first.length===1?first[0]:undefined;
}
function currentActor(s, actorId) { return person(s,actorId||s.workspace?.actorId||'h-matthieu'); }
export function canReviewDecision(s,decision,actorId) {
  const actor=currentActor(s,actorId);
  if(!actor||actor.type!=='human'||actor.status==='paused')return false;
  if(!decision.assignedTo)return true;
  let owner=person(s,decision.assignedTo);const seen=new Set();
  while(owner?.type==='human'&&!seen.has(owner.id)){
    if(owner.id===actor.id)return true;
    seen.add(owner.id);owner=person(s,owner.managerId||owner.manager);
  }
  return false;
}
export function getState() { return state; }
export function subscribe(callback) { listeners.add(callback); return ()=>listeners.delete(callback); }
export function update(mutator, label='Mise à jour', detail='', options={}) {
  const next = clone(state);
  mutator(next);
  for(const d of next.decisions){
    if(d.status==='pending'&&!d.processId&&!state.decisions.some(old=>old.id===d.id)){
      const artifact=decisionArtifact(next,d);
      if(artifact&&!d.actionSnapshot)d.actionSnapshot=artifactSnapshot(d,artifact);
      if(!d.actionFingerprint)d.actionFingerprint=standaloneFingerprint(next,d);
    }
  }
  next.version = Math.max(Number(next.version)||0, VERSION);
  const actor=currentActor(next,options.actorId);
  next.audit.unshift({id:uid('audit'),time:now(),actor:actor?.name||'Matthieu Keip',actorId:actor?.id||'h-matthieu',action:String(label),detail:String(detail)});
  state = next;
  persist(); notify();
  return {ok:true};
}
export function resetState() { state=migrateState(seed);persist();notify();return {ok:true}; }
export function exportState() { return JSON.stringify({...state,exportedAt:now(),notice:'Démonstration locale — données fictives — aucune exécution distante.'},null,2); }

function checkRun(s,p) {
  if (!p) return 'Processus introuvable.';
  if (p.status !== 'live') return 'Ce processus doit être actif pour lancer une simulation.';
  const actors=(p.agentIds||[]).map(id=>s.agents.find(a=>a.id===id));
  if (!actors.length || actors.some(a=>!a||a.type!=='agent')) return 'Un agent affecté est absent du registre.';
  if (actors.some(a=>a.status==='paused')) return 'Un agent est suspendu. Réactivez-le avant toute nouvelle exécution.';
  if (actors.some(a=>['qualification','testing'].includes(s.capabilities?.profiles?.[a.id]?.stage))) return 'Un agent doit terminer sa qualification avant de participer à une exécution.';
  if (actors.some(a=>Number(a.autonomy)===0)) return 'Un agent est en observation seule : son mandat interdit l’exécution.';
  if (actors.some(a=>(s.capabilities?.profiles?.[a.id]?.requiredApps||[]).some(id=>!s.capabilities?.connections?.some(c=>c.id===id&&c.status==='connected'&&c.reviewed&&c.testedRevision===c.revision)))) return 'Une connexion requise est absente, révoquée ou doit être testée et approuvée à nouveau.';
  if (actors.some(a=>a.mandate?.expires && new Date(a.mandate.expires+'T23:59:59Z').getTime()<Date.now())) return 'Un mandat est arrivé à échéance. Renouvelez la délégation avant toute exécution.';
  const policies=s.policies.filter(x=>x.enabled);
  if (policies.some(x=>x.check==='identity'&&x.mode==='block') && actors.some(a=>person(s,a.manager)?.type!=='human')) return 'Politique d’identité : un responsable humain du registre est requis.';
  if (policies.some(x=>x.check==='approved-tools'&&x.mode==='block') && actors.some(a=>(a.mandate?.tools||[]).some(t=>!approvedTools.includes(t)))) return 'Politique de données : un outil du mandat ne figure pas dans le catalogue approuvé.';
  if (policies.some(x=>x.check==='budget'&&x.mode==='block') && s.agents.filter(a=>a.type==='agent').reduce((n,a)=>n+Number(a.cost||0),0)>=Number(s.settings.budget)) return 'Budget mensuel atteint : le lancement est bloqué par la politique budgétaire.';
  if (policies.some(x=>x.check==='mandate'&&x.mode==='block') && actors.some(a=>!a.mandate?.mission||!a.mandate?.reviewer)) return 'Le mandat doit préciser la mission et le responsable de revue.';
  if ((p.steps||[]).some(step=>step.kind==='human'&&person(s,step.actor)?.type!=='human')) return 'Chaque étape humaine doit désigner une personne du registre.';
  return '';
}
function fingerprint(s,p) { return JSON.stringify({id:p.id,steps:p.steps,agents:p.agentIds.map(id=>{const a=s.agents.find(a=>a.id===id);const connections=(s.capabilities?.profiles?.[id]?.requiredApps||[]).map(appId=>{const c=s.capabilities?.connections?.find(c=>c.id===appId);return {id:appId,revision:c?.revision,scopes:c?.scopes};});return {id,mandate:a?.mandate,autonomy:a?.autonomy,status:a?.status,connections};})}); }
function standaloneContext(s,d){const a=s.agents.find(a=>a.id===d.agentId);return {id:null,status:'live',agentIds:[d.agentId],steps:[],team:a?.team};}
function decisionArtifact(s,d){return s.workspace?.threads?.[d.agentId]?.find(m=>m.id===d.artifactId)?.artifact;}
function artifactSnapshot(d,a){return {artifactId:d.artifactId,to:a.to||'',subject:a.subject||'',body:a.text||''};}
function standaloneFingerprint(s,d){return JSON.stringify({context:fingerprint(s,standaloneContext(s,d)),amount:Number(d.amount||0),action:d.actionSnapshot||null,send:s.workspace?.agentConfig?.[d.agentId]?.permissions?.send});}
function blocked(action,detail,options={}) { update(()=>{},action,detail,options);return {ok:false,error:detail}; }
function createCheckpoint(s,run,step,index) {
  const p=run.definitionSnapshot;
  const actor=s.agents.find(a=>a.id===p.agentIds[0]);
  const reviewer=step?.actor||actor.mandate.reviewer;
  const decisionId=uid('decision');
  run.status='waiting';run.decisionId=decisionId;
  if(run.stepStates[index])run.stepStates[index].status='waiting';
  run.events.push({title:'Décision humaine requise',detail:`${reviewer} · ${step?.name||'Accepter le résultat final'}`,time:now(),status:'waiting',stepIndex:index});
  s.decisions.unshift({id:decisionId,title:`Valider · ${step?.name||p.name}`,agentId:actor.id,processId:p.id,goalId:p.goalId,type:'approval',priority:'medium',status:'pending',assignedTo:reviewer,summary:`L’exécution simulée de « ${p.name} » attend ${reviewer} pour ${step?.name||'accepter le résultat final'}.`,evidence:['Mandats et politiques vérifiés avant démarrage',`Version du processus figée pour le dossier ${run.id}`,'Aucun outil externe ni ordre réel exécuté'],recommendation:'Examiner les éléments proposés, puis approuver ou refuser cette étape.',createdAt:now(),dueAt:new Date(Date.now()+24*3600e3).toISOString(),amount:0,runId:run.id,stepIndex:index,actionFingerprint:fingerprint(s,p)});
}
function advanceLegacyRun(s,run) {
  const p=run.definitionSnapshot;
  run.status='running';run.decisionId=null;
  while(run.cursor<p.steps.length){
    const step=p.steps[run.cursor];
    if(step.kind==='human'){createCheckpoint(s,run,step,run.cursor);return;}
    const time=now();
    run.stepStates[run.cursor]={...run.stepStates[run.cursor],status:'completed',completedAt:time};
    run.events.push({title:step.name,detail:`${step.actor} · étape simulée`,time,status:'completed',stepIndex:run.cursor});
    run.cursor+=1;
  }
  if(run.finalReviewRequired&&!run.finalReviewApproved){createCheckpoint(s,run,null,p.steps.length);return;}
  run.status='completed';run.completedAt=now();
  run.events.push({title:'Résultat accepté dans le scénario',detail:'Toutes les étapes et validations du dossier sont terminées.',time:run.completedAt,status:'completed'});
  if(!run.counted){
    const process=s.processes.find(x=>x.id===p.id);if(process)process.cases=Number(process.cases||0)+1;
    const actor=s.agents.find(a=>a.id===p.agentIds[0]);if(actor){actor.hours=Number(actor.hours||0)+0.2;if(!run.requiresReview)actor.cost=Number(actor.cost||0)+2;}
    run.counted=true;
  }
}
export function simulateProcess(id) {
  const p=state.processes.find(p=>p.id===id); const error=checkRun(state,p);
  if(error)return blocked('Lancement de simulation bloqué',`${p?.name||id} · ${error}`);
  const actors=p.agentIds.map(id=>state.agents.find(a=>a.id===id));
  const hasHuman=p.steps.some(step=>step.kind==='human');
  const finalReviewRequired=!hasHuman&&(actors.some(a=>a.autonomy===1||a.status==='pilot')||state.policies.some(x=>x.enabled&&x.mode==='ask'&&['Tous les agents','Tous les processus',p.team].includes(x.scope)));
  if(!hasHuman&&!finalReviewRequired&&state.policies.some(x=>x.enabled&&x.check==='budget'&&x.mode==='block')&&state.agents.filter(a=>a.type==='agent').reduce((n,a)=>n+Number(a.cost||0),0)+2>Number(state.settings.budget))return blocked('Lancement de simulation bloqué','Le coût simulé de 2 € dépasserait le budget mensuel.');
  const runId=uid('run');
  update(s=>{
    const run={id:runId,engine:'legacy-v2',processId:id,status:'running',startedAt:now(),definitionSnapshot:clone(p),cursor:0,stepStates:p.steps.map((step,index)=>({index,title:step.name,actor:step.actor,kind:step.kind,status:'pending'})),finalReviewRequired,finalReviewApproved:false,requiresReview:hasHuman||finalReviewRequired,counted:false,events:[{title:'Simulation lancée',detail:'Jeu de données fictif ; version du processus conservée pour ce dossier.',time:now(),status:'completed'}]};
    s.runs.unshift(run);advanceLegacyRun(s,run);
  },'Simulation de processus lancée',`${p.name} · ${runId}`);
  const run=state.runs.find(r=>r.id===runId);
  return {ok:true,runId,decisionId:run.decisionId||undefined,status:run.status};
}
export function decide(id,outcome,comment='',options={}) {
  const normalized=['approve','approved'].includes(outcome)?'approved':['reject','rejected'].includes(outcome)?'rejected':null;
  if(!normalized)return {ok:false,error:'Décision invalide.'};
  const decision=state.decisions.find(d=>d.id===id);
  if(!decision)return {ok:false,error:'Décision introuvable.'};
  if(decision.status!=='pending')return {ok:false,error:'Cette décision a déjà été traitée.'};
  const actor=currentActor(state,options.actorId);
  if(!actor||actor.type!=='human'||actor.status==='paused')return {ok:false,error:'La décision nécessite une identité humaine active du registre.'};
  if((options.actorId||state.workspace?.actorId)&&!canReviewDecision(state,decision,actor.id))return {ok:false,error:`Cette demande est affectée à ${decision.assignedTo}. Seul ce responsable ou un supérieur humain peut décider ou la réaffecter.`};
  const hierarchicalOverride=Boolean(decision.assignedTo&&person(state,decision.assignedTo)?.id!==actor.id);
  const existingRun=state.runs.find(r=>r.id===decision.runId||r.decisionId===decision.id);
  if(existingRun&&existingRun.engine&&existingRun.engine!=='legacy-v2')return {ok:false,error:'Cette demande doit être traitée par le moteur de son processus.'};
  if(existingRun&&existingRun.status!=='waiting')return {ok:false,error:'Cette exécution n’attend plus de décision.'};
  if(existingRun?.engine==='legacy-v2'&&(existingRun.decisionId!==decision.id||decision.stepIndex!==existingRun.cursor))return {ok:false,error:'Cette demande ne correspond plus à l’étape active.'};
  if(normalized==='approved'){
    const currentProcess=state.processes.find(p=>p.id===decision.processId);
    const p=existingRun?.engine==='legacy-v2'?{...existingRun.definitionSnapshot,status:currentProcess?.status}:decision.processId?currentProcess:standaloneContext(state,decision);
    const error=checkRun(state,p);if(error)return blocked('Reprise d’exécution bloquée',error,{actorId:actor.id});
    if(decision.actionFingerprint&&decision.actionFingerprint!==(decision.processId?fingerprint(state,p):standaloneFingerprint(state,decision)))return {ok:false,error:'Le mandat ou l’action présentée a changé. Refusez cette demande et relancez une simulation pour examiner la nouvelle action.'};
    if(decision.artifactId){
      const artifact=decisionArtifact(state,decision);
      if(!artifact||JSON.stringify(decision.actionSnapshot)!==JSON.stringify(artifactSnapshot(decision,artifact)))return {ok:false,error:'Le contenu ou les destinataires du brouillon ont changé. Soumettez la nouvelle version à validation.'};
      if(state.workspace?.agentConfig?.[decision.agentId]?.permissions?.send==='never')return {ok:false,error:'Le mandat de cet agent interdit les communications.'};
      if(state.policies.some(pol=>pol.enabled&&pol.check==='external-approval'&&pol.mode==='block'&&['Tous les agents','Tous les processus',p.team].includes(pol.scope)))return {ok:false,error:'La politique de l’organisation interdit cet engagement externe.'};
    }
    const total=state.agents.filter(a=>a.type==='agent').reduce((n,a)=>n+Number(a.cost||0),0);
    if(total+Number(decision.amount||0)>Number(state.settings.budget))return {ok:false,error:'Cette approbation dépasserait le budget mensuel. Révisez d’abord l’enveloppe.'};
  }
  let nextDecisionId;
  update(s=>{
    const d=s.decisions.find(x=>x.id===id); d.status=normalized;d.comment=String(comment||'').trim();d.decidedAt=now();d.decidedBy=actor.name;d.decidedById=actor.id;d.hierarchicalOverride=hierarchicalOverride;
    const artifact=decisionArtifact(s,d);if(artifact){artifact.reviewStatus=normalized;artifact.reviewedAt=d.decidedAt;artifact.reviewedBy=actor.name;}
    const run=s.runs.find(r=>r.id===d.runId||r.decisionId===d.id);
    if(run){
      run.events.push({title:`${normalized==='approved'?'Approuvé':'Refusé'} par ${actor.name}`,detail:d.comment||'Décision humaine enregistrée dans la démonstration.',time:now(),status:normalized==='approved'?'completed':'rejected',stepIndex:d.stepIndex});
      if(run.engine==='legacy-v2'){
        if(normalized==='rejected'){run.status='rejected';if(run.stepStates[run.cursor])run.stepStates[run.cursor].status='rejected';}
        else{
          if(run.cursor<run.definitionSnapshot.steps.length){run.stepStates[run.cursor]={...run.stepStates[run.cursor],status:'completed',completedAt:now(),decidedBy:actor.id};run.cursor+=1;}
          else run.finalReviewApproved=true;
          advanceLegacyRun(s,run);nextDecisionId=run.decisionId||undefined;
        }
      }else run.status=normalized==='approved'?'completed':'rejected';
    }
    if(normalized==='approved'){
      if(run&&run.engine!=='legacy-v2'){
        const p=s.processes.find(p=>p.id===d.processId);if(p)p.cases=Number(p.cases||0)+1;
        const a=s.agents.find(a=>a.id===d.agentId);if(a)a.hours=Number(a.hours||0)+0.2;
      }
      const a=s.agents.find(a=>a.id===d.agentId);if(a)a.cost=Number(a.cost||0)+Number(d.amount||0);
    }
  },normalized==='approved'?'Décision approuvée':'Décision refusée',`${decision.title}${hierarchicalOverride?' · arbitrage hiérarchique pour '+decision.assignedTo:''}${comment?' · '+comment:''}`,{actorId:actor.id});
  return {ok:true,runId:existingRun?.id,decisionId:nextDecisionId,status:existingRun?state.runs.find(r=>r.id===existingRun.id)?.status:undefined};
}
export function setAutonomy(agentId,level) {
  const a=state.agents.find(a=>a.id===agentId);level=Number(level);
  if(!a||a.type!=='agent')return {ok:false,error:'Agent introuvable.'};
  if(!Number.isInteger(level)||level<0||level>3)return {ok:false,error:'Le niveau d’autonomie doit être compris entre 0 et 3.'};
  if(person(state,a.manager)?.type!=='human')return {ok:false,error:'Nommez un responsable humain avant de modifier la délégation.'};
  update(s=>{s.agents.find(x=>x.id===agentId).autonomy=level;},'Délégation modifiée',`${a.name} · niveau ${a.autonomy} → ${level} · politiques organisationnelles conservées`);
  return {ok:true};
}
export function resolveGap(id,option) {
  const gap=state.gaps.find(g=>g.id===id);const choice=gap?.options.find(o=>o.id===(typeof option==='string'?option:option?.id));
  if(!gap||!choice)return {ok:false,error:'Option de résolution introuvable.'};
  if(gap.status==='resolved')return {ok:false,error:'Ce point a déjà reçu un plan d’action.'};
  update(s=>{
    const g=s.gaps.find(x=>x.id===id);g.status='resolved';g.resolvedOption=choice.id;g.resolutionNote='Plan d’action engagé ; effet à mesurer sur les prochaines exécutions.';
    const p=s.processes.find(p=>p.id===g.processId);
    if(choice.action==='assign-reviewer'){p.owner='Julien Moreau';p.steps.filter(x=>x.kind==='human').forEach(x=>x.actor='Julien Moreau');s.agents.find(a=>a.id==='a-quill').mandate.reviewer='Julien Moreau';}
    if(choice.action==='clarify-mandate'){s.agents.find(a=>a.id==='a-quill').mandate.limits='Préparation des réponses depuis les contenus approuvés. Engagement et envoi externe après validation de Julien Moreau.';}
    if(choice.action==='capacity-reassign'){p.steps.unshift({name:'Vérifier la complétude du dossier',actor:'Léa Bernard',kind:'human'});}
    if(choice.action==='review-stage'){p.steps.push({name:'Revue quotidienne de la file',actor:'Sophie Laurent',kind:'human'});}
    if(choice.action==='training'){const a=s.agents.find(a=>a.id==='a-beacon');if(!a.skills.includes('Qualification des sources — en formation'))a.skills.push('Qualification des sources — en formation');a.status='pilot';a.autonomy=1;}
    if(choice.action==='acceptance-stage'){p.steps.push({name:'Accepter la complétude du rapport',actor:'Claire Martin',kind:'human'});}
    if(choice.action==='data-request'){s.decisions.unshift({id:uid('decision'),title:'Cadrer le raccordement des coûts',agentId:'a-nova',processId:'p-reporting',goalId:g.goalId,type:'approval',priority:'medium',status:'pending',summary:'Demande de cadrage pour Claire Martin. L’approbation enregistre l’accord de principe ; elle ne crée aucune connexion réelle.',evidence:['Source approuvée à sélectionner','Droits d’accès à définir','Intégration réelle à construire séparément'],recommendation:'Valider le cadrage et nommer un responsable de raccordement.',createdAt:now(),dueAt:new Date(Date.now()+48*3600e3).toISOString(),amount:0});}
  },'Plan d’action engagé',`${gap.title} · ${choice.label} · effet estimé, à vérifier`);
  return {ok:true};
}
