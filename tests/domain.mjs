import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const mem = new Map();
globalThis.localStorage = {getItem:k=>mem.get(k)||null,setItem:(k,v)=>mem.set(k,v)};
const source=await fs.readFile(new URL('../dist/modules/store.js',import.meta.url),'utf8');
const api=await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));
const {getState,update,resetState,simulateProcess,decide,setAutonomy,resolveGap}=api;
assert.equal(getState().decisions.filter(d=>d.status==='pending').length,4);
for(const outcome of ['constructor','__proto__','completed',null])assert.equal(decide('d-rfp',outcome).ok,false,'Only declared terminal outcomes are accepted');
let result=simulateProcess('p-rfp');assert.equal(result.ok,true);assert.ok(result.decisionId);
assert.equal(getState().runs.find(r=>r.id===result.runId).status,'waiting');
assert.equal(decide(result.decisionId,'approved','Documents examinés').ok,true);
assert.equal(getState().runs.find(r=>r.id===result.runId).status,'completed');
const cases=getState().processes.find(p=>p.id==='p-rfp').cases;
assert.equal(decide(result.decisionId,'approved').ok,false);
assert.equal(getState().processes.find(p=>p.id==='p-rfp').cases,cases,'Double approval must not double execute');
resetState();result=simulateProcess('p-reconcile');
update(s=>s.agents.find(a=>a.id==='a-atlas').status='paused','Suspension');
assert.equal(simulateProcess('p-reconcile').ok,false);
assert.equal(decide(result.decisionId,'approved').ok,false,'Suspension revokes pending execution');
assert.equal(decide(result.decisionId,'rejected','Agent suspendu').ok,true);
assert.equal(getState().runs.find(r=>r.id===result.runId).status,'rejected');
resetState();result=simulateProcess('p-rfp');
update(s=>s.agents.find(a=>a.id==='a-quill').mandate.limits='Nouveau périmètre','Mandat modifié');
assert.equal(decide(result.decisionId,'approved').ok,false,'Approval bound to unchanged action');
resetState();result=simulateProcess('p-rfp');setAutonomy('a-quill',3);
assert.equal(decide(result.decisionId,'approved').ok,false,'Changing delegation invalidates pending approval');
// A revoked or reconfigured required connection cannot be used by a queued run.
resetState();update(s=>{s.capabilities={profiles:{'a-atlas':{requiredApps:['app-ledger']}},connections:[{id:'app-ledger',status:'connected',reviewed:true,revision:1,testedRevision:1,scopes:['positions:read']}]};},'Accès requis');
result=simulateProcess('p-reconcile');assert.equal(result.ok,true);
update(s=>s.capabilities.connections[0].status='revoked','Accès révoqué');
assert.equal(simulateProcess('p-reconcile').ok,false);
assert.equal(decide(result.decisionId,'approved','',{actorId:'h-claire'}).ok,false,'Revocation applies before resume');
update(s=>Object.assign(s.capabilities.connections[0],{status:'connected',revision:2,testedRevision:2,scopes:['positions:read','transactions:read']}),'Nouveau périmètre approuvé');
assert.equal(decide(result.decisionId,'approved','',{actorId:'h-claire'}).ok,false,'Changed connection scope invalidates earlier request');
update(s=>s.capabilities.profiles['a-atlas'].stage='qualification','Qualification');
assert.equal(simulateProcess('p-reconcile').ok,false,'Unqualified profiles cannot execute');
resetState();update(s=>s.agents.find(a=>a.id==='a-nova').mandate.tools.push('Drive personnel'),'Source ajoutée');
assert.equal(simulateProcess('p-reporting').ok,false,'Disallowed tools are blocked');
resetState();update(s=>s.agents.find(a=>a.id==='a-nova').mandate.expires='2020-01-01','Échéance passée');
assert.equal(simulateProcess('p-reporting').ok,false,'Expired mandates cannot execute');
resetState();update(s=>s.settings.budget=1,'Budget');
assert.equal(simulateProcess('p-reporting').ok,false,'Budget enforced before starting');
resetState();assert.equal(setAutonomy('a-nova',0).ok,true);assert.equal(simulateProcess('p-reporting').ok,false);
assert.equal(setAutonomy('a-nova',4).ok,false);assert.equal(setAutonomy('a-nova',3).ok,true);
assert.equal(simulateProcess('p-reporting').ok,true);
resetState();assert.equal(resolveGap('gap-skill','training').ok,true);
assert.ok(getState().agents.find(a=>a.id==='a-beacon').skills.includes('Qualification des sources — en formation'));
assert.equal(getState().agents.find(a=>a.id==='a-beacon').autonomy,1,'Training cannot silently elevate authority');
assert.equal(resolveGap('gap-skill','training').ok,false);
assert.equal(getState().goals.find(g=>g.id==='g-research').progress,71,'Estimated improvements are not booked as achieved');
resetState();assert.equal(resolveGap('gap-data','request').ok,true);assert.equal(getState().decisions.length,5);
assert.ok(JSON.parse(api.exportState()).notice.includes('fictives'));
assert.ok(mem.size>0,'State persists');
// A process with two human checkpoints must resume at the next step, not finish early.
resetState();update(s=>{const p=s.processes.find(p=>p.id==='p-reconcile');p.steps=[
 {name:'Préparer',actor:'Atlas',kind:'agent'},
 {name:'Vérifier les écarts',actor:'Claire Martin',kind:'human'},
 {name:'Compléter les preuves',actor:'Atlas',kind:'agent'},
 {name:'Signer le résultat',actor:'Sophie Laurent',kind:'human'}];},'Deux validations');
const casesBefore=getState().processes.find(p=>p.id==='p-reconcile').cases;
result=simulateProcess('p-reconcile');const firstDecision=result.decisionId;const sequentialRun=result.runId;
assert.equal(getState().runs.find(r=>r.id===sequentialRun).cursor,1);
assert.equal(decide(firstDecision,'approved','Premier contrôle',{actorId:'h-julien'}).ok,false,'Wrong human cannot approve assigned checkpoint');
const firstApproval=decide(firstDecision,'approved','Premier contrôle',{actorId:'h-claire'});
assert.equal(firstApproval.ok,true);assert.ok(firstApproval.decisionId);
assert.equal(firstApproval.status,'waiting');
assert.equal(getState().runs.find(r=>r.id===sequentialRun).cursor,3);
assert.equal(getState().processes.find(p=>p.id==='p-reconcile').cases,casesBefore,'Intermediate approval must not count completed work');
assert.equal(getState().decisions.find(d=>d.id===firstDecision).decidedBy,'Claire Martin');
assert.equal(decide(firstApproval.decisionId,'approved','Signature',{actorId:'h-sophie'}).ok,true);
assert.equal(getState().runs.find(r=>r.id===sequentialRun).status,'completed');
assert.equal(getState().processes.find(p=>p.id==='p-reconcile').cases,casesBefore+1);
assert.deepEqual(getState().runs.find(r=>r.id===sequentialRun).stepStates.map(x=>x.status),['completed','completed','completed','completed']);
// Editing the published definition must not rewrite an in-flight process snapshot.
resetState();result=simulateProcess('p-reconcile');
update(s=>s.processes.find(p=>p.id==='p-reconcile').steps.push({name:'Nouvelle étape pour prochains dossiers',actor:'Atlas',kind:'agent'}),'Version suivante');
assert.equal(decide(result.decisionId,'approved','Ancienne version',{actorId:'h-claire'}).ok,true);
assert.equal(getState().runs.find(r=>r.id===result.runId).definitionSnapshot.steps.length,4);
assert.ok(!getState().runs.find(r=>r.id===result.runId).events.some(e=>e.title==='Nouvelle étape pour prochains dossiers'));
// Reassignment and the active workspace identity affect who can decide.
resetState();result=simulateProcess('p-reconcile');
update(s=>{s.workspace={actorId:'h-julien',personaId:'manager'};s.decisions.find(d=>d.id===result.decisionId).assignedTo='Sophie Laurent';},'Réaffectation');
assert.equal(decide(result.decisionId,'approved').ok,false);
update(s=>s.workspace.actorId='h-sophie','Changement de profil');
assert.equal(decide(result.decisionId,'approved').ok,true);
assert.equal(getState().audit[0].actor,'Sophie Laurent');
// A registered human manager may arbitrate, with the actual actor retained in audit.
resetState();result=simulateProcess('p-reconcile');
assert.equal(api.canReviewDecision(getState(),getState().decisions.find(d=>d.id===result.decisionId),'h-matthieu'),true);
assert.equal(decide(result.decisionId,'approved','Arbitrage',{actorId:'h-matthieu'}).ok,true);
assert.equal(getState().decisions.find(d=>d.id===result.decisionId).hierarchicalOverride,true);
assert.ok(getState().audit[0].detail.includes('arbitrage hiérarchique'));
update(s=>{s.agents.find(a=>a.id==='h-claire').manager='Sophie Laurent';s.agents.find(a=>a.id==='h-sophie').manager='Claire Martin';},'Cycle de données ancien');
assert.equal(api.canReviewDecision(getState(),{assignedTo:'Claire Martin'},'h-lea'),false,'Corrupt manager cycles terminate safely');
// Standalone draft review pins recipient, subject, content, mandate and send scope.
const draftRequest=()=>{
 resetState();update(s=>{s.workspace={actorId:'h-julien',agentConfig:{'a-quill':{permissions:{send:'ask'}}},threads:{'a-quill':[{id:'artifact-message',artifact:{to:'client@example.test',subject:'Proposition',text:'Contenu à examiner'}}]}};s.decisions.unshift({id:'draft-review',agentId:'a-quill',processId:null,artifactId:'artifact-message',title:'Revoir le brouillon',assignedTo:'Julien Moreau',status:'pending',amount:0});},'Brouillon soumis');
};
draftRequest();assert.ok(getState().decisions[0].actionFingerprint);assert.equal(decide('draft-review','approved').ok,true);
assert.equal(getState().workspace.threads['a-quill'][0].artifact.reviewStatus,'approved');
assert.equal(getState().processes.find(p=>p.id==='p-rfp').cases,api.seed.processes.find(p=>p.id==='p-rfp').cases,'Standalone review never counts a completed process');
draftRequest();update(s=>s.workspace.threads['a-quill'][0].artifact.to='different@example.test','Brouillon modifié');assert.equal(decide('draft-review','approved').ok,false,'Recipient changes invalidate approval');
assert.equal(decide('draft-review','rejected').ok,true,'Changed drafts can still be refused');
draftRequest();update(s=>s.workspace.agentConfig['a-quill'].permissions.send='never','Envoi interdit');assert.equal(decide('draft-review','approved').ok,false,'Changed send scope revokes pending request');
// Refused or cancelled runs cannot be resumed with an orphan pending request.
resetState();result=simulateProcess('p-rfp');
update(s=>s.runs.find(r=>r.id===result.runId).status='rejected','Arrêt');
assert.equal(decide(result.decisionId,'approved').ok,false);
// The final policy review also works for processes without a human step.
resetState();setAutonomy('a-nova',1);result=simulateProcess('p-reporting');
assert.equal(result.status,'waiting');assert.ok(result.decisionId);
assert.equal(decide(result.decisionId,'approved','Revue finale',{actorId:'h-claire'}).status,'completed');
// Blocked attempts are visible in the journal and the budget includes the new simulated cost.
resetState();const total=getState().agents.filter(a=>a.type==='agent').reduce((n,a)=>n+a.cost,0);
update(s=>s.settings.budget=total+1,'Budget proche du plafond');
assert.equal(simulateProcess('p-reporting').ok,false);
assert.equal(getState().audit[0].action,'Lancement de simulation bloqué');
// Schema migration preserves custom content and independently owned extension namespaces.
const old={version:1,agents:[],goals:[{id:'custom',title:'Mon objectif'}],settings:{budget:9999},studio:{runs:[{id:'studio-run'}]},workspace:{actorId:'h-sophie'},customFeature:{value:42}};
const migrated=api.migrateState(old);
assert.equal(migrated.version,2);assert.equal(old.version,1,'Migration must not mutate its input');
assert.deepEqual(migrated.agents,[],'An intentionally empty collection must stay empty');
assert.equal(migrated.goals[0].id,'custom');assert.equal(migrated.settings.budget,9999);
assert.deepEqual(migrated.studio,old.studio);assert.deepEqual(migrated.customFeature,old.customFeature);
assert.ok(Array.isArray(migrated.decisions),'Missing core collection receives defaults');
resetState();
globalThis.localStorage.setItem=()=>{throw new Error('Storage denied')};
assert.equal(setAutonomy('a-nova',2).ok,true,'Storage unavailable keeps current session functional');
resetState();
console.log('Domain verification passed: sequential checkpoints, actor authority, pinned versions, approvals, revocation, policies, budget, migration, persistence.');
