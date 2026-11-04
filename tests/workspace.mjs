import assert from 'node:assert/strict';
import {seed,getState,update,resetState,decide} from '../dist/modules/store.js';
import {initializeWorkspace,initWorkspace,renderWorkbench,renderInterventions,renderKnowledge,handleWorkspace,handleWorkspaceFile,selectAgent} from '../dist/modules/workspace.js';

let modal=null,route=null;const messages=[],downloads=[],inputs=new Map();
globalThis.document={getElementById:id=>inputs.get(id),createElement:()=>({click(){downloads.push({name:this.download,url:this.href});}})};
const ctx={getState,update,modal:value=>modal=value,toast:message=>messages.push(message),navigate:value=>route=value,render:()=>{},closeDrawer:()=>{}};
const click=(action,id='',extra={})=>handleWorkspace(action,{dataset:{id,...extra}},ctx);
const form=values=>{const fd=new FormData();for(const [key,value] of Object.entries(values))for(const item of Array.isArray(value)?value:[value])fd.append(key,item);return fd;};
const fresh=()=>{resetState();initWorkspace();modal=null;inputs.clear();messages.length=0;};
const workspace=()=>getState().workspace;
const email=()=>workspace().threads['a-quill'].find(m=>m.artifact?.type==='email');
const emailInputs=(changes={})=>{const m=email(),a={...m.artifact,...changes};inputs.set('artifact-to-'+m.id,{value:a.to});inputs.set('artifact-subject-'+m.id,{value:a.subject});inputs.set('artifact-body-'+m.id,{value:a.text});return m.id;};

// Additive workspace migration fills partial nested records without erasing content.
fresh();const baselineAudit=getState().audit.length;initWorkspace();assert.equal(getState().audit.length,baselineAudit,'Reinitialization must not add audit noise');
update(s=>{s.workspace={actorId:'h-sophie',customSetting:{preserved:true},knowledge:[{id:'doc-policy',name:'Custom policy',content:'Kept',agentIds:[],status:'draft',version:4}],agentConfig:{'a-quill':{permissions:{send:'never'},memories:[],reports:[]}},threads:{'a-quill':[]}};},'Ancien espace');
initWorkspace();assert.equal(workspace().actorId,'h-sophie');assert.equal(workspace().customSetting.preserved,true);
assert.equal(workspace().knowledge.filter(d=>d.id==='doc-policy').length,1,'Migration must not duplicate seeded records');
assert.equal(workspace().knowledge.find(d=>d.id==='doc-policy').content,'Kept');
assert.equal(workspace().agentConfig['a-quill'].permissions.send,'never');assert.equal(workspace().agentConfig['a-quill'].permissions.read,'allow');
assert.deepEqual(workspace().threads['a-quill'],[]);assert.deepEqual(workspace().agentConfig['a-quill'].memories,[]);
assert.ok(Array.isArray(workspace().groups));
for(const tab of ['chat','overview','setup']){update(s=>s.workspace.agentTab=tab,'Vue');assert.ok(renderWorkbench(getState()).length>500);}
const auditAfterMigration=getState().audit.length;initWorkspace();assert.equal(getState().audit.length,auditAfterMigration);
update(s=>s.agents.push({...structuredClone(s.agents.find(a=>a.id==='a-nova')),id:'new-agent',name:'Nouvel agent'}),'Ajout');initWorkspace();assert.ok(workspace().agentConfig['new-agent']);assert.ok(workspace().threads['new-agent']);

// Fresh initialization assigns responsibility and reset starts a new local session.
const previousSession=workspace().sessionId;fresh();assert.notEqual(workspace().sessionId,previousSession);assert.equal(workspace().customSetting,undefined);
assert.equal(getState().decisions.find(d=>d.id==='d-rfp').assignedTo,'Julien Moreau');
for(const render of [renderWorkbench,renderInterventions,renderKnowledge]){const html=render(getState());assert.ok(html.length>500);assert.ok(!/\b(?:undefined|NaN)\b/.test(html));}
selectAgent('a-nova',ctx);assert.equal(route,'workbench');assert.equal(workspace().selectedAgentId,'a-nova');
update(s=>s.agents.find(a=>a.id==='a-nova').role='<img src=x onerror=alert(1)>','Texte hostile');assert.ok(!renderWorkbench(getState()).includes('<img src=x onerror=alert(1)>'));
fresh();update(s=>s.decisions.forEach(d=>d.status='rejected'),'Décisions traitées');assert.ok(renderInterventions(getState()).includes('Aucune demande en attente'),'The OS inbox excludes standalone agent proposals');assert.ok(!renderInterventions(getState()).includes('AMÉLIORATION PROPOSÉE'));

// Reassignment and requests for changes use current human authority, including at submit time.
fresh();update(s=>s.workspace.actorId='h-lea','Profil');click('ws-reassign','d-rfp');assert.equal(modal,null);click('ws-request-change','d-rfp');assert.equal(modal,null);
update(s=>s.workspace.actorId='h-matthieu','Profil');click('ws-reassign','d-rfp');assert.ok(modal);const reassign=modal.onSubmit;
update(s=>s.workspace.actorId='h-lea','Profil');assert.equal(reassign(form({reviewer:'Léa Bernard'})),false);assert.equal(getState().decisions.find(d=>d.id==='d-rfp').assignedTo,'Julien Moreau');
update(s=>s.workspace.actorId='h-julien','Profil');click('ws-request-change','d-rfp');modal.onSubmit(form({value:'Ajouter les engagements validés'}));assert.equal(getState().decisions.find(d=>d.id==='d-rfp').revisionRequest,'Ajouter les engagements validés');
assert.ok(workspace().threads['a-quill'].some(m=>m.text.includes('Modification demandée')));
click('ws-decision','d-rfp',{outcome:'approve'});const submitDecision=modal.onSubmit;update(s=>s.workspace.actorId='h-lea','Profil');assert.equal(submitDecision(form({comment:'Acteur changé'})),false);

// A changed draft supersedes its pending request and is reviewed by its manager.
fresh();update(s=>s.workspace.actorId='h-lea','Profil');const artifactId=emailInputs();click('ws-submit-artifact',artifactId);
let pending=getState().decisions.find(d=>d.artifactId===artifactId&&d.status==='pending');assert.ok(pending.actionFingerprint);assert.equal(pending.assignedTo,'Julien Moreau');
const firstId=pending.id;const count=getState().decisions.length;click('ws-submit-artifact',artifactId);assert.equal(getState().decisions.length,count,'Repeated submission must not duplicate an active request');
emailInputs({to:'new@example.test',text:'Version corrigée'});click('ws-submit-artifact',artifactId);
assert.equal(getState().decisions.find(d=>d.id===firstId).status,'cancelled');pending=getState().decisions.find(d=>d.artifactId===artifactId&&d.status==='pending');assert.notEqual(pending.id,firstId);assert.equal(pending.actionSnapshot.to,'new@example.test');
assert.equal(decide(firstId,'approved','',{actorId:'h-julien'}).ok,false);assert.equal(decide(pending.id,'approved','Vérifié',{actorId:'h-julien'}).ok,true);assert.equal(email().artifact.reviewStatus,'approved');
emailInputs({text:'Autre version après revue'});click('ws-save-artifact',artifactId);assert.equal(email().artifact.reviewStatus,'draft');assert.equal(email().artifact.reviewedBy,undefined);
click('ws-submit-artifact',artifactId);const withdrawn=getState().decisions.find(d=>d.artifactId===artifactId&&d.status==='pending').id;click('ws-discard-artifact',artifactId);assert.equal(getState().decisions.find(d=>d.id===withdrawn).status,'cancelled');assert.equal(workspace().threads['a-quill'].find(m=>m.id===artifactId).artifact,null);

// Group artifacts use the group message list rather than an unrelated individual thread.
fresh();update(s=>{const g=s.workspace.groups[0];g.messages.push({id:'group-artifact',role:'agent',text:'Synthèse',time:new Date().toISOString(),artifact:{type:'text',name:'Groupe.txt',text:'Résultat de groupe'}});s.workspace.selectedGroupId=g.id;s.workspace.selectedAgentId=g.members[0];},'Groupe');
click('ws-download-artifact','group-artifact');assert.equal(downloads.at(-1).name,'Groupe.txt');click('ws-discard-artifact','group-artifact');assert.equal(workspace().groups[0].messages[0].artifact,null);

// Draft sources are not presented as approved evidence in responses or screen traces.
fresh();update(s=>{s.workspace.knowledge.push({id:'draft-source',name:'SOURCE NON APPROUVÉE',status:'draft',content:'À revoir',agentIds:['a-quill'],version:1});s.workspace.watchScreen=true;},'Brouillon');
inputs.set('ws-message',{value:'Prépare une synthèse sourcée'});click('ws-send');const generated=workspace().threads['a-quill'].at(-1).artifact;assert.ok(!generated.text.includes('SOURCE NON APPROUVÉE'));assert.ok(!renderWorkbench(getState()).includes('SOURCE NON APPROUVÉE'));
update(s=>s.workspace.actorId='h-lea','Profil');click('ws-proposal-test','prop-quill');click('ws-proposal-approve','prop-quill');assert.equal(workspace().proposals[0].status,'pending','An unrelated human cannot promote a strategy');
update(s=>{s.workspace.actorId='h-julien';s.workspace.agentConfig['a-quill'].strategyVersion=9;},'Version suivante');click('ws-proposal-approve','prop-quill');assert.equal(workspace().proposals[0].status,'pending','A stale proposal cannot overwrite a newer strategy');

// A pending file read must not repopulate a freshly reset workspace.
fresh();let finishRead;const pendingRead=handleWorkspaceFile({target:{id:'ws-file',files:[{name:'delayed.txt',size:30,text:()=>new Promise(resolve=>finishRead=resolve)}]}},ctx);
fresh();finishRead('Old workspace content');await pendingRead;assert.ok(!workspace().knowledge.some(d=>d.name==='delayed.txt'));
await handleWorkspaceFile({target:{id:'ws-file',files:[{name:'source.txt',size:10,text:async()=>'Local text'}]}},ctx);assert.equal(workspace().knowledge.find(d=>d.name==='source.txt').status,'draft');
const beforeInvalid=workspace().knowledge.length;handleWorkspaceFile({target:{id:'ws-file',files:[{name:'binary.exe',size:10,text:async()=>'No'}]}},ctx);assert.equal(workspace().knowledge.length,beforeInvalid);
fresh();
console.log('Workspace verification passed: additive initialization, reset, authority, draft bindings, group artifacts, source status, uploads and rendering.');
