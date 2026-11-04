# Cousteau Governance implementation contract
Buildless ES modules in dist/. All UI in French. Fictitious asset-management group Northstar AM. Main user Matthieu (MK), directeur transformation. No real bank data.
Visual: Wand-inspired warm offwhite background #f8f9fc, white cards, thin #e7e8ee borders, purple #7050e8 accents, ink #202438, green #27866e. Editorial serif headings (Georgia) + system sans UI. Clean quiet enterprise product.

## Data store.js
Exports getState(), update(mutator, label, detail=''), resetState(), subscribe(fn), seed, simulateProcess(id), decide(id, outcome, comment=''), setAutonomy(agentId,level), resolveGap(id,option), exportState(). All sync. update writes JSON localStorage with safe fallback, appends audit, notifies subscriber. render triggered by subscriber.
State:
- agents [{id,name,initials,role,type:'agent'|'human',team:'Opérations'|'Investissement'|'Conformité'|'Distribution',manager,status:'active'|'paused'|'pilot',autonomy:0|1|2|3,quality:number,hours:number,cost:number,skills:string[],objectiveId,mandate:{mission,tools:string[],limits,expires,reviewer}}]
- goals [{id,title,owner,team,status:'on-track'|'at-risk'|'off-track',progress:number,targetDate,description,krs:[{label,current,target,unit}],processIds:string[]}]
- decisions [{id,title,agentId,processId,goalId,type:'approval'|'exception'|'budget',priority:'high'|'medium',status:'pending'|'approved'|'rejected',summary,evidence:string[],recommendation,createdAt,dueAt,amount:number,comment?}]
- gaps [{id,title,category:'capacity'|'capability'|'authority'|'data'|'adoption',team,goalId,processId,impact:'high'|'medium',status:'open'|'resolved',summary,evidence:string[],options:[{id,label,description,impact,action}],resolvedOption?}]
- processes [{id,name,description,owner,team,agentIds:string[],goalId,status:'live'|'draft'|'paused',cases,autonomousRate,medianTime,steps:[{name,actor,kind:'agent'|'human'|'control'}]}]
- policies [{id,title,category:'Données'|'Autorité'|'Budget'|'Sécurité',scope,rule,mode:'block'|'ask'|'log',owner,enabled:boolean}]
- runs [{id,processId,status:'running'|'waiting'|'completed'|'rejected',startedAt,events:[{title,detail,time,status}]}]
- audit [{id,time,actor,action,detail}]
- settings {budget:8000,workspace:'Northstar AM',period:'Novembre 2026'}
All ids strings; seed minimum 10 actors, 5 goals, 4 decisions, 5 gaps, 5 processes, 6 policies. Initial figures coherent; functions enforce paused agents prevent simulation, decisions resolve related waiting run with audit. No remote calls. Demo constants clearly identified.

## ui.js exports
esc(value), icon(name,size=20), badge(text,tone='neutral'), avatar(person,size=''), progress(value,tone='purple'), empty(title,description), fmt(number), money(number). icon names: grid,target,inbox,users,shield,alert,workflow,sliders,history,plug,search,bell,chevron,arrow,plus,check,x,more,play,pause,download,refresh,external,clock,activity,bot,user,arrowUp,settings,send,lock,menu,close,info,edit,filter.
No external dependencies/assets.

## Views modules
organization.js exports renderOrganization(s),renderMandates(s),renderProcesses(s),renderIntegrations(s),handleOrganization(action,el,ctx).
governance.js exports renderGoals(s),renderDecisions(s),renderGaps(s),renderPolicies(s),handleGovernance(action,el,ctx).
Root implements overview, audit, shell, CSS, ui, app routing.
Handlers event delegation: buttons data-action='unique-action' data-id='id' data-value='value'. Prefix actions org-/gov-.
ctx: {getState,update,simulateProcess,decide,setAutonomy,resolveGap,navigate,toast,render,modal,closeModal,drawer,closeDrawer}.
modal({title,subtitle?,body,submitLabel='Enregistrer',onSubmit:(FormData)=>boolean|void}) inserts FORM body HTML, standard cancel/save. Return false keeps open. required form controls honored. Drawer({title,subtitle?,body}) has standard close and delegated button clicks. ctx.render rerenders current main.
Handlers return true when handled, false otherwise. Form labels accessible; validate numeric and text. Escape all dynamic values. No inline handlers. Root delegates clicks from modal/drawer too. Get state fresh in handlers. Root decides view via hash; supported: overview,goals,decisions,organization,mandates,gaps,processes,policies,audit,integrations.
CSS shared classes: page-head,eyebrow,page-title,page-description,head-actions,btn,btn-primary,btn-ghost,btn-sm,card,card-head,card-title,muted,small,pill/tone-*,grid-2,grid-3,stat-grid,stat-card,stat-label,stat-value,stat-foot,section-title,table-wrap,data-table,filter-bar,filter-btn,active,avatar,avatar-agent,person,person-copy,progress-track,progress-fill,stack,gap-card,evidence,option-row,form-grid,field,form-help,detail-grid,detail-item,timeline,timeline-item,empty,separator,tag-list,tag,row,between,icon-box,notice,metric-inline,kr-row,status-dot,decision-card.
Module may use additional semantic classes; inform root to style them. Focus complete functional paths; no decorative dead action buttons. Exports use standard JS.
