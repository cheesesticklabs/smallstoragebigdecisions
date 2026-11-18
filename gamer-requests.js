// Each brief is a concrete design target, separate from the resource limits.
const gamerRequests=[
 {text:'I want at least 4 levels with 2 different enemy types.',check:l=>[{text:'4 or more levels',met:l.levels>=4},{text:'2 enemy types',met:new Set(l.tiles.filter(t=>['slime','bat'].includes(t.type)).map(t=>t.type)).size>=2}]},
 {text:'I want detailed artwork and music.',check:l=>[{text:'Extra detail artwork',met:l.detail==='rich'},{text:'Music',met:l.music}]},
 {text:'I want 2 short levels with music.',check:l=>[{text:'2 short levels',met:l.levels===2&&l.length===1},{text:'Music',met:l.music}]},
 {text:'I want at least 6 levels to explore.',check:l=>[{text:'6 or more levels',met:l.levels>=6}]},
 {text:'I want music and at least 4 levels.',check:l=>[{text:'Music',met:l.music},{text:'4 or more levels',met:l.levels>=4}]},
 {text:'I want at least 4 long levels.',check:l=>[{text:'4 or more levels',met:l.levels>=4},{text:'Long levels',met:l.length===3}]}
];
function gamerRequestMet(){return gamerRequests[state.lab.audience].check(state.lab).every(item=>item.met)}
function gamerRequestHTML(){const request=gamerRequests[state.lab.audience];return `<div class="gamer-request"><strong>YOUR GAMER’S REQUEST</strong><p>${request.text}</p><ul>${request.check(state.lab).map(item=>`<li class="${item.met?'request-met':''}"><span aria-hidden="true">${item.met?'✓':'○'}</span>${item.text}</li>`).join('')}</ul></div>`}
const requestBudgetPage=budgetPage;
budgetPage=function(){return requestBudgetPage().replace('Make a game your gamer wants to buy. Choose features they enjoy. Stay within your storage limit and $1,500 budget. Set a price they can afford. Be ready to explain what you gave up.','Build one game per group. Choose one device to build your game. Meet your gamer’s request within your storage and money limits. Be ready to explain what you chose, what you gave up, and why.').replace('<p>${a.want}</p>','<p>${a.want}</p>').replace('<div class="audience-profile">',`<p class="gamer-brief">${gamerRequests[state.lab.audience].text}</p><div class="audience-profile">`).replace('<div class="level-budget-controls">','<div id="gamer-request-status">'+gamerRequestHTML()+'</div><div class="level-budget-controls">').replace('What did you give up to stay within budget?','We wanted ___. It put us over the limit, so we changed ___. We kept ___ because our gamer needed it.')};
const requestUpdateBudget=updateLabBudget;
updateLabBudget=function(){requestUpdateBudget();if($('#gamer-request-status'))$('#gamer-request-status').innerHTML=gamerRequestHTML();if($('#lab-budget-note')&&labCosts().space<=platforms[state.lab.platform].space&&gamePrice().total<=1500&&!audienceIssue())$('#lab-budget-note').textContent=gamerRequestMet()?'Request met. Within your limits.':'Within your limits. Meet your gamer’s request.'};
const requestLabValid=labValid;
labValid=function(){return requestLabValid()&&gamerRequestMet()};
const requestUpdateFinish=updateFinish;
updateFinish=function(){requestUpdateFinish();if($('#finish-note')&&!gamerRequestMet())$('#finish-note').textContent='Return to Game Lab and meet your gamer’s request.'};
