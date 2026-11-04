import assert from 'node:assert/strict';
import {seed} from '../dist/modules/store.js';
import {ensureCapabilities,createAgent,testAgent,advanceAgent,runPilot,createSkill,reviseSkill,runSkillTests,publishSkill,assignLearners,evaluateLearner,certifyLearner,setSharing,installConnection,buildConnection,configureConnection,testConnection,approveConnection,revokeConnection,availableConnection,agentTemplates} from '../dist/modules/capabilities-store.js';
import {renderAgents,renderSkills,renderConnections,handleCapabilities} from '../dist/modules/capabilities.js';
const fresh=()=>{const s=structuredClone(seed);ensureCapabilities(s);return s};
const s=fresh();
const first=JSON.stringify(s.capabilities);ensureCapabilities(s);assert.equal(JSON.stringify(s.capabilities),first,'initialization is idempotent');
assert.equal(s.capabilities.profiles['a-beacon'].stage,'pilot');
assert.equal(s.capabilities.profiles['a-atlas'].stage,'production');

// A hired profile must pass qualification and a supervised pilot before production.
const t=agentTemplates[0];
const agent=createAgent(s,{...t,manager:t.manager,templateId:t.id});
assert.ok(s.agents.some(x=>x.id===agent.id));
assert.equal(s.capabilities.profiles[agent.id].stage,'qualification');
assert.equal(agent.autonomy,1);
assert.throws(()=>advanceAgent(s,agent.id),/tests/);
assert.throws(()=>createAgent(s,{...t}),/déjà/);
assert.throws(()=>createAgent(s,{name:'Missing',mission:'Test',manager:'a-atlas'}),/humain/);
assert.ok(testAgent(s,agent.id).every(t=>t.passed));
assert.equal(s.capabilities.profiles[agent.id].stage,'testing');
assert.equal(advanceAgent(s,agent.id),'pilot');
assert.throws(()=>advanceAgent(s,agent.id),/pilote/);
agent.status='paused';
assert.throws(()=>runPilot(s,agent.id),/Réactivez/);
assert.throws(()=>advanceAgent(s,agent.id),/Réactivez/);
agent.status='pilot';runPilot(s,agent.id);
assert.equal(advanceAgent(s,agent.id),'production');
assert.equal(agent.status,'active');

// Missing apps cannot be bypassed by retrying tests or advancing the stage.
const climate=createAgent(s,{...agentTemplates[3],templateId:'catalog-climate'});
assert.ok(testAgent(s,climate.id).some(t=>!t.passed));
assert.throws(()=>advanceAgent(s,climate.id),/réussir/);
const satellite=installConnection(s,'app-satellite');
assert.equal(satellite.status,'needs-review');
assert.throws(()=>approveConnection(s,satellite.id,true),/Testez/);
testConnection(s,satellite.id);
assert.throws(()=>approveConnection(s,satellite.id,false),/revue/);
approveConnection(s,satellite.id,true);
assert.ok(availableConnection(s,satellite.id));
testAgent(s,climate.id);advanceAgent(s,climate.id);runPilot(s,climate.id);
revokeConnection(s,satellite.id);
assert.equal(availableConnection(s,satellite.id),undefined);
assert.throws(()=>advanceAgent(s,climate.id),/approuvé/);

// Configuration changes revoke approval and invalidate prior tests.
const connector=buildConnection(s,{name:'Expositions',description:'Consulter les positions de démonstration'});
testConnection(s,connector.id);approveConnection(s,connector.id,true);
configureConnection(connector,{owner:'Claire Martin',scopes:['records:read','drafts:write']});
assert.equal(connector.status,'needs-review');
assert.equal(connector.testedRevision,null);
assert.throws(()=>approveConnection(s,connector.id,true),/Testez/);
assert.throws(()=>configureConnection(connector,{scopes:['secret:admin']}),/reconnu/);
testConnection(s,connector.id);approveConnection(s,connector.id,true);
assert.ok(connector.simulation);

// Skills start as drafts; failing and stale tests prevent publication.
const skill=createSkill(s,{name:'Tester les sources',description:'Qualifier une source',evaluator:'sources'});
assert.equal(skill.status,'draft');
assert.equal(skill.learners.length,0);
assert.throws(()=>publishSkill(s,skill.id,true),/tests/);
assert.throws(()=>assignLearners(s,skill.id,['a-beacon']),/Publiez/);
skill.tests[0].expected='WRONG';
assert.ok(runSkillTests(s,skill.id).some(t=>!t.passed));
assert.throws(()=>publishSkill(s,skill.id,true),/tests/);
reviseSkill(skill,{tests:skill.tests.map((t,i)=>({...t,expected:i===0?'VERIFIED':t.expected}))});
assert.ok(runSkillTests(s,skill.id).every(t=>t.passed));
assert.throws(()=>publishSkill(s,skill.id,false),/revue/);
publishSkill(s,skill.id,true);
assert.equal(skill.status,'published');
assignLearners(s,skill.id,['a-beacon','h-lea']);
assignLearners(s,skill.id,['a-beacon']);
assert.equal(skill.learners.length,2,'duplicate enrolment does not duplicate learners');
assert.equal(skill.learners[0].status,'learning');
assert.throws(()=>certifyLearner(s,skill.id,'a-beacon'),/évaluation/);
assert.equal(evaluateLearner(s,skill.id,'a-beacon').status,'review');
assert.equal(skill.learners[0].score,100);
revokeConnection(s,'app-docs');
assert.throws(()=>certifyLearner(s,skill.id,'a-beacon'),/approuvée/);
testConnection(s,'app-docs');approveConnection(s,'app-docs',true);
certifyLearner(s,skill.id,'a-beacon');
assert.equal(skill.learners[0].status,'certified');
assert.ok(s.agents.find(x=>x.id==='a-beacon').skills.includes(skill.name));
evaluateLearner(s,skill.id,'h-lea');certifyLearner(s,skill.id,'h-lea');
assert.equal(skill.learners[1].status,'certified','human learners follow the same review');
reviseSkill(skill,{steps:[...skill.steps,'Nouvelle vérification']});
assert.equal(skill.status,'draft');
assert.equal(skill.testedRevision,null);
assert.ok(skill.learners.every(x=>x.status==='learning'&&x.score===null));
assert.throws(()=>publishSkill(s,skill.id,true),/tests/);
assert.throws(()=>certifyLearner(s,skill.id,'a-beacon'),/évaluation/);
runSkillTests(s,skill.id);publishSkill(s,skill.id,true);
assert.equal(skill.version,2,'new published revision increments the version');

// The sharing ceiling and edit-within-use rule cannot be bypassed.
s.capabilities.settings.maximumShare='team';
assert.throws(()=>setSharing(s,skill,{canUse:'organization',canEdit:'private'}),/maximal/);
assert.throws(()=>setSharing(s,skill,{canUse:'private',canEdit:'team'}),/modification/);
setSharing(s,skill,{canUse:'team',canEdit:'private'});
assert.equal(skill.visibility,'team');

// Substantive rendering and hostile input escaping in all new views.
for(const render of [renderAgents,renderSkills,renderConnections]){
 const html=render(fresh());assert.ok(html.length>3000);assert.ok(!/\b(?:undefined|NaN)\b/.test(html));
}
const hostile=fresh(),payload='<img src=x onerror="alert(1)">';
hostile.agents.find(a=>a.type==='agent').name=payload;
hostile.capabilities.skills[0].name=payload;
hostile.capabilities.connections[0].name=payload;
for(const render of [renderAgents,renderSkills,renderConnections])assert.ok(!render(hostile).includes(payload));

// Primary UI actions persist through the shared store contract; modals have working submit handlers.
let state=fresh(),modal=null,drawer=null,messages=[];
const ctx={getState:()=>state,update:fn=>{const next=structuredClone(state);fn(next);state=next},render:()=>{},toast:t=>messages.push(t),modal:x=>{modal=x},drawer:x=>{drawer=x},closeModal:()=>{},closeDrawer:()=>{},navigate:()=>{}};
const click=(name,id='',extra={})=>handleCapabilities('cap-'+name,{dataset:{id,...extra}},ctx);
assert.ok(click('agent-create'));assert.ok(modal.onSubmit);
const fd=new FormData();fd.set('name','Créé via interface');fd.set('mission','Produire un résultat documenté');fd.set('role','Assistant');fd.set('manager','Claire Martin');modal.onSubmit(fd);
assert.ok(state.agents.some(a=>a.name==='Créé via interface'));
click('skill-detail','skill-sources');assert.ok(drawer.body.includes('cap-skill-test'));
click('connection-detail','app-docs');assert.ok(drawer.body.includes('cap-connection-configure'));
assert.equal(handleCapabilities('unrelated',{dataset:{}},ctx),false);
console.log('Capabilities verification passed: qualification/pilot gates, revoked access, skill revisions/tests/certification, sharing, render escaping and persistent UI actions.');
