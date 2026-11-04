import assert from 'node:assert/strict';
import {getState,update,resetState} from '../dist/modules/store.js';
import * as wf from '../dist/modules/workflow-store.js';
const reset=()=>{resetState();wf.initStudio();};
const p=id=>wf.studioProcess(getState(),id);
const run=id=>getState().studio.runs.find(r=>r.id===id);
const approve=(id,outcome='once',extra={})=>{const q=run(id).request;return wf.resolveApproval(id,{requestId:q.id,token:q.token,outcome,...extra});};
reset();
assert.equal(getState().studio.processes.length,getState().processes.length);
assert.equal(p('p-rfp').draft.nodes.length,13);
assert.ok(wf.validateDraft(p('p-rfp').draft).ok);
const audit=getState().audit.length;assert.equal(wf.initStudio().initialized,false);assert.equal(getState().audit.length,audit);
// Draft changes never mutate a published snapshot; history supports undo and redo.
const original=p('p-rfp').published.nodes[0].name;
assert.ok(wf.patchStep('p-rfp','rfp-read',{name:'Lire et qualifier le dossier'}).ok);
assert.equal(p('p-rfp').published.nodes[0].name,original);
assert.ok(wf.diffDraft('p-rfp').length);
assert.ok(wf.undoDraft('p-rfp').ok);assert.equal(p('p-rfp').draft.nodes[0].name,original);
assert.ok(wf.redoDraft('p-rfp').ok);assert.equal(p('p-rfp').draft.nodes[0].name,'Lire et qualifier le dossier');
assert.ok(wf.discardDraft('p-rfp').ok);assert.equal(wf.diffDraft('p-rfp').length,0);
// No cycles, dangling dependencies, backward-stage edges, or removed last step.
assert.equal(wf.setEdges('p-rfp',[...p('p-rfp').draft.edges,{from:'rfp-archive',to:'rfp-read',label:'loop'}]).ok,false);
assert.equal(wf.setEdges('p-rfp',[{from:'missing',to:'rfp-read'}]).ok,false);
assert.equal(wf.patchStep('p-rfp','rfp-read',{deps:['rfp-log']}).ok,false);
assert.equal(wf.patchStage('p-rfp','submit',{index:0}).ok,false);
assert.equal(wf.removeStage('p-rfp','draft').ok,false);
let added=wf.addStage('p-rfp',{name:'Après remise',deadlineHours:3});assert.ok(added.ok);assert.ok(wf.removeStage('p-rfp',added.stageId).ok);
let dup=wf.duplicateStep('p-rfp','rfp-answers');assert.ok(dup.ok);assert.ok(wf.removeStep('p-rfp',dup.nodeId).ok);
assert.ok(wf.removeStep('p-rfp','rfp-security').ok);assert.ok(wf.validateDraft(p('p-rfp').draft).ok);assert.ok(!p('p-rfp').draft.nodes.some(n=>n.deps.includes('rfp-security')));
wf.discardDraft('p-rfp');
// Sequential checkpoints: an approval does not skip later human tasks.
let started=wf.startRun('p-rfp',{title:'Test séquentiel'});assert.ok(started.ok);
let r=run(started.runId);assert.equal(r.status,'waiting');const first=r.request.nodeId;const pinned=JSON.stringify(r.snapshot);
let oldRequest={...r.request};assert.ok(approve(r.id).ok);r=run(r.id);assert.equal(r.status,'waiting');assert.notEqual(r.request.nodeId,first);
assert.equal(wf.resolveApproval(r.id,{requestId:oldRequest.id,token:oldRequest.token,outcome:'once'}).ok,false,'No double approval');
assert.ok(wf.patchStep('p-rfp','rfp-read',{name:'Version suivante'}).ok);assert.ok(wf.publishDraft('p-rfp').ok);
assert.equal(JSON.stringify(run(r.id).snapshot),pinned,'Running case pins original version');
let approvals=1;while(run(r.id).request&&approvals<30){assert.ok(approve(r.id).ok);approvals++;}
assert.equal(run(r.id).status,'completed');assert.ok(approvals>=3);assert.equal(run(r.id).version,6);assert.ok(run(r.id).steps.filter(st=>st.status==='completed').length>8);
// Reassignment rotates token and records the actual assignee; rejection ends the run.
reset();started=wf.startRun('p-rfp');r=run(started.runId);oldRequest={...r.request};assert.ok(wf.reassignApproval(r.id,'Claire Martin').ok);
assert.equal(run(r.id).request.owner,'Claire Martin');assert.equal(wf.resolveApproval(r.id,{requestId:oldRequest.id,token:oldRequest.token,outcome:'once'}).ok,false);
assert.ok(approve(r.id,'deny',{comment:'Source insuffisante'}).ok);assert.equal(run(r.id).status,'failed');assert.equal(run(r.id).request,null);assert.equal(wf.advanceRun(r.id).ok,false);
assert.equal(run(r.id).steps.find(x=>x.nodeId===oldRequest.nodeId).approvals[0].owner,'Claire Martin');
// Pausing the process blocks starts but does not revoke an existing request.
reset();started=wf.startRun('p-rfp');r=run(started.runId);assert.ok(wf.updateSetup('p-rfp',{status:'paused'}).ok);assert.equal(wf.startRun('p-rfp').ok,false);assert.ok(approve(r.id).ok);
// Agent suspension and mandate changes revoke pending approvals.
reset();started=wf.startRun('p-rfp');r=run(started.runId);update(s=>s.agents.find(a=>a.id===r.request.agentId).status='paused','Pause test');assert.equal(approve(r.id).ok,false);assert.ok(approve(r.id,'deny').ok);
reset();started=wf.startRun('p-rfp');r=run(started.runId);update(s=>s.agents.find(a=>a.id===r.request.agentId).mandate.limits+=' Modified','Mandat test');assert.equal(approve(r.id).ok,false);assert.ok(approve(r.id,'deny').ok);
// A scoped permission can be reused only for the same process, agent, action and mandate.
reset();
const single={...p('p-reporting').draft.nodes[0],id:'one',stageId:'intake',deps:[],kind:'agent',agentId:'a-nova',owner:'Claire Martin',action:'external.internal-test',external:'ask',confidence:.8,staffing:'fixed'};
assert.ok(wf.editDraft('p-reporting',d=>{d.nodes=[single];d.edges=[];}).ok);
assert.equal(wf.removeStep('p-reporting','one').ok,false);
assert.ok(wf.publishDraft('p-reporting').ok);
started=wf.startRun('p-reporting');r=run(started.runId);assert.ok(r.request.eligibleForAlways);assert.ok(approve(r.id,'always').ok);assert.equal(run(r.id).status,'completed');
started=wf.startRun('p-reporting');assert.equal(run(started.runId).status,'completed','Scoped permanent permission used');
update(s=>s.agents.find(a=>a.id==='a-nova').mandate.limits+=' renewed','Mandat');
started=wf.startRun('p-reporting');assert.equal(run(started.runId).status,'waiting','Mandate change invalidates grant');
assert.ok(approve(started.runId,'once').ok);
// Testing a draft does not authorize future published executions.
reset();assert.ok(wf.editDraft('p-reporting',d=>{d.nodes=[single];d.edges=[];}).ok);started=wf.startRun('p-reporting',{draft:true});assert.ok(approve(started.runId,'always').ok);wf.publishDraft('p-reporting');started=wf.startRun('p-reporting');assert.equal(run(started.runId).status,'waiting');
// Explicit human tasks cannot be transformed into permanent grants.
reset();started=wf.startRun('p-rfp');r=run(started.runId);assert.equal(approve(r.id,'always').ok,false);
// New processes, templates and deterministic changes remain draft until publication.
reset();let created=wf.createProcess('Préparer les dossiers de contrôle chaque matin','reconcile');assert.ok(created.ok);assert.equal(p(created.processId).status,'draft');assert.equal(wf.startRun(created.processId).ok,false);assert.ok(wf.startRun(created.processId,{draft:true}).ok);assert.ok(wf.publishDraft(created.processId).ok);assert.equal(p(created.processId).status,'live');assert.ok(getState().goals.some(g=>g.processIds.includes(created.processId)));
assert.ok(wf.naturalChange(created.processId,'Fixer un délai de 48 heures').ok);assert.equal(p(created.processId).draft.deadlineHours,48);assert.equal(wf.naturalChange(created.processId,'Dessiner un éléphant').ok,false);
assert.ok(wf.naturalChange(created.processId,'Ajouter une validation humaine').ok);assert.ok(wf.validateDraft(p(created.processId).draft).ok);
assert.ok(wf.applyImprovement('p-rfp','evidence').ok);assert.equal(wf.applyImprovement('p-rfp','evidence').ok,false);
assert.ok(wf.getFitCandidates(getState(),p('p-rfp').draft.nodes[0]).some(c=>c.source==='catalog'&&!c.verified));
// Effective human authority follows the selected profile and manager ancestry.
reset();started=wf.startRun('p-rfp');r=run(started.runId);
update(s=>s.workspace={...(s.workspace||{}),actorId:'h-lea'},'Profil');
assert.equal(approve(r.id).ok,false,'Unrelated human cannot impersonate the assigned owner');
assert.equal(wf.reassignApproval(r.id,'Léa Bernard').ok,false,'Cannot seize an unrelated intervention');
update(s=>s.workspace.actorId='a-quill','Profil');assert.equal(approve(r.id).ok,false,'Agent cannot approve');
update(s=>s.workspace.actorId='h-matthieu','Profil');assert.ok(approve(r.id).ok,'Director can arbitrate down manager ancestry');
const accepted=run(r.id).steps.flatMap(step=>step.approvals).find(a=>a.decidedById==='h-matthieu');assert.ok(accepted.override);assert.equal(accepted.decidedBy,'Matthieu Keip');
assert.ok(getState().audit[0].detail.includes('arbitrage hiérarchique'));
// Missing dependency and insufficient global budget block execution before effects.
reset();update(s=>{s.capabilities={profiles:{'a-quill':{requiredApps:['crm']}},connections:[{id:'crm',name:'CRM',status:'disconnected',reviewed:true,revision:1,testedRevision:1}]};},'Déconnexion');
assert.equal(wf.startRun('p-rfp').ok,false);
reset();update(s=>s.settings.budget=1,'Budget');assert.equal(wf.startRun('p-rfp').ok,false);
// Additive migration preserves existing studio draft while importing a legacy process.
reset();wf.patchStep('p-rfp','rfp-read',{name:'Brouillon préservé'});update(s=>s.processes.push({...s.processes[0],id:'legacy-new',name:'Nouveau processus'}),'Ajout');
assert.equal(wf.initStudio().added,1);assert.equal(p('p-rfp').draft.nodes[0].name,'Brouillon préservé');assert.ok(p('legacy-new'));
// Observation is a validated mode, explicitly testable without live starts.
reset();assert.equal(wf.updateSetup('p-reporting',{autonomy:'magic'}).ok,false);
assert.ok(wf.updateSetup('p-reporting',{autonomy:'observe'}).ok);assert.ok(wf.publishDraft('p-reporting').ok);
assert.equal(wf.startRun('p-reporting').ok,false);assert.ok(wf.startRun('p-reporting',{draft:true}).ok);
// Automatic staffing obeys the selected scope and never executes unqualified catalog profiles.
reset();const baseNode={...p('p-reporting').draft.nodes[0],id:'selection',stageId:'intake',deps:[],kind:'agent',staffing:'best',source:'shared',agentId:'a-nova',skills:[],confidence:0,external:'never'};
assert.ok(wf.editDraft('p-reporting',d=>{d.nodes=[baseNode];d.edges=[];}).ok);wf.publishDraft('p-reporting');started=wf.startRun('p-reporting');assert.ok(started.ok);
const selectedStep=run(started.runId).steps[0];assert.notEqual(getState().agents.find(a=>a.id===selectedStep.agentId).team,'Opérations');
assert.ok(wf.patchStep('p-reporting','selection',{source:'own'}).ok);wf.publishDraft('p-reporting');started=wf.startRun('p-reporting');assert.ok(started.ok);assert.equal(getState().agents.find(a=>a.id===run(started.runId).steps[0].agentId).team,'Opérations');
assert.ok(wf.patchStep('p-reporting','selection',{source:'catalog'}).ok);wf.publishDraft('p-reporting');assert.equal(wf.startRun('p-reporting').ok,false);
// Shadow challengers create comparison evidence without tool calls or action authority.
reset();assert.equal(wf.patchStep('p-rfp','rfp-answers',{challengerId:'a-quill'}).ok,false);assert.equal(wf.patchStep('p-rfp','rfp-answers',{challengerId:'catalog-rfp'}).ok,false);
started=wf.startRun('p-rfp');r=run(started.runId);while(run(r.id).request){assert.ok(approve(r.id).ok);}const comparison=run(r.id).steps.find(step=>step.nodeId==='rfp-answers');assert.ok(comparison.shadowComparison);assert.equal(comparison.shadowComparison.challengerId,'a-nova');assert.equal(comparison.shadowComparison.challengerActions,0);assert.ok(comparison.evidence.some(e=>e.includes('Comparaison fictive')));
// Qualification stages cannot execute even when the legacy status is pilot.
reset();update(s=>s.capabilities={profiles:{'a-quill':{stage:'testing'}}},'Qualification');assert.equal(wf.startRun('p-rfp').ok,false);
// A natural-language pre-submission review preserves predecessors and runs before submission.
reset();const priorDeps=[...p('p-rfp').draft.nodes.find(n=>n.id==='rfp-send').deps];
assert.ok(wf.naturalChange('p-rfp','Ajouter une validation humaine avant la remise').ok);const newReview=p('p-rfp').draft.nodes.find(n=>n.action==='human.review-before-submission');assert.ok(newReview);assert.deepEqual(newReview.deps,priorDeps);assert.deepEqual(p('p-rfp').draft.nodes.find(n=>n.id==='rfp-send').deps,[newReview.id]);
const order=wf.validateDraft(p('p-rfp').draft).order;assert.ok(order.indexOf(newReview.id)<order.indexOf('rfp-send'));
// Organization-wide external policies remain mandatory independent of step-local allow.
reset();update(s=>{const policy=s.policies.find(p=>p.check==='external-approval');policy.scope='Toute l’organisation';policy.mode='block';},'Interdiction');started=wf.startRun('p-rfp');r=run(started.runId);let safety=0;while(run(r.id).request&&safety++<20)approve(r.id);assert.equal(run(r.id).status,'failed');assert.ok(run(r.id).events.at(-1).detail.includes('bloque'));
reset();
// The live canvas and inspector must display the run snapshot, even after publication.
const ui=await import('../dist/modules/workflows.js');
const kept=getState().studio.runs.find(r=>r.processId==='p-rfp'&&r.status==='waiting');
const oldTitle=kept.snapshot.nodes[0].name;
assert.ok(wf.patchStep('p-rfp',kept.snapshot.nodes[0].id,{name:'Nouvelle étape réservée à la version suivante'}).ok);
assert.ok(wf.publishDraft('p-rfp').ok);
let openedDrawer;
const uiCtx={getState,render:()=>{},navigate:()=>{},closeDrawer:()=>{},toast:()=>{},drawer:v=>openedDrawer=v};
ui.openWorkflowRun(kept.id,uiCtx);
ui.handleWorkflows('wf-follow',{dataset:{id:kept.id}},uiCtx);
const canvas=ui.renderWorkflows(getState());
assert.ok(canvas.includes('instantané conservé'));
assert.ok(canvas.includes(oldTitle));
assert.ok(!canvas.includes('Nouvelle étape réservée à la version suivante'));
ui.handleWorkflows('wf-node',{dataset:{id:kept.snapshot.nodes[0].id}},uiCtx);
assert.equal(openedDrawer.title,oldTitle);
reset();
console.log('Workflow studio passed: DAG integrity, versioning, history, sequential approvals, stale tokens, reassignment, pause, mandates, scoped grants, draft isolation, templates and improvements.');
