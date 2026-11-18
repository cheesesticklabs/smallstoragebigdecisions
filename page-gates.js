(() => {
const codes=['','sun','moon','star','mars','orbit','comet','rocket','planet','saturn','earth'];
const normalize=value=>String(value).replace(/\s+/g,'').toLowerCase();
function destination(value){const code=normalize(value);return code==='phonehome'?stages.length-1:codes.findIndex((entry,index)=>index>0&&entry===code)}
state.pageAccess??={unlocked:Math.max(0,Math.min(stages.length-1,state.page))};
state.pageAccess.unlocked=Math.max(0,Math.min(stages.length-1,Number(state.pageAccess.unlocked)||0));
if(state.page>state.pageAccess.unlocked)state.page=state.pageAccess.unlocked;
const dialog=document.createElement('dialog');dialog.id='page-code-dialog';dialog.setAttribute('aria-labelledby','page-code-title');document.body.append(dialog);
function requestCode(page){dialog.innerHTML=`<form id="page-code-form"><h2 id="page-code-title">Teacher code</h2><p>Enter your group’s code to unlock its page.</p><label for="page-code-input">Code</label><input id="page-code-input" type="text" autocomplete="off" required><p id="page-code-error" role="status"></p><div class="row"><button type="submit" class="primary">Unlock page</button><button id="page-code-cancel" type="button">Cancel</button></div></form>`;$('#page-code-cancel').onclick=()=>dialog.close();$('#page-code-form').onsubmit=e=>{e.preventDefault();const target=destination($('#page-code-input').value);if(target<1){$('#page-code-error').textContent='That code does not match. Ask your teacher.';return}state.pageAccess.unlocked=Math.max(state.pageAccess.unlocked,target);save();dialog.close();go(target)};dialog.showModal()}
const ungatedGo=go;go=function(page){if(page>state.pageAccess.unlocked){requestCode(page);return}ungatedGo(page)};
const oldRender=render;render=function(){oldRender();document.querySelectorAll('#nav [data-page]').forEach(button=>{const locked=Number(button.dataset.page)>state.pageAccess.unlocked;button.classList.toggle('page-locked',locked);if(locked)button.insertAdjacentHTML('beforeend','<span class="page-lock" aria-hidden="true">⌑</span>')});const tools=document.querySelector('.tools');if(!$('#page-code-open')){const button=document.createElement('button');button.id='page-code-open';button.textContent='Enter code';button.onclick=()=>requestCode(state.page);tools.append(button)}};
window.STORAGE_PAGE_CODES={destination,normalize};render();
})();
