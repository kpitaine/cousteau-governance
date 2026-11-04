import assert from 'node:assert/strict';
import {seed} from '../dist/modules/store.js';
import * as organization from '../dist/modules/organization.js';
import * as governance from '../dist/modules/governance.js';
const renderers=Object.entries({...organization,...governance}).filter(([name])=>name.startsWith('render'));
assert.equal(renderers.length,8);
for(const [name,render] of renderers){
 const html=render(structuredClone(seed));
 assert.equal(typeof html,'string',name);
 assert.ok(html.length>100,`${name}: substantive HTML`);
 assert.ok(!/\b(?:undefined|NaN)\b/.test(html),`${name}: no unresolved data`);
}
const hostile=structuredClone(seed);
const payload='<script>alert("xss")</script>';
hostile.agents[0].name=payload;
hostile.goals[0].title=payload;
hostile.decisions[0].title=payload;
hostile.gaps[0].title=payload;
hostile.policies[0].title=payload;
hostile.processes[0].name=payload;
for(const [name,render] of renderers){
 const html=render(hostile);
 assert.ok(!html.includes(payload),`${name}: user-entered content escaped`);
}
console.log('Rendering smoke verification passed: 8 views, seeded data, HTML escaping.');
