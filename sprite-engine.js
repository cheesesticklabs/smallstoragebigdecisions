// Original pixel artwork. Both views show the same stored pixels and animation frame.
const astronautPalette={O:'#17233b',H:'#edf5ed',S:'#37b6a3',V:'#26445d',G:'#8ce1e3',L:'#ffffff',B:'#ef9854',K:'#e27348',T:'#f5c768',D:'#188577',R:'#c0d8d5',A:'#c3723e'};
let spritePaused=false,spriteElapsed=0,spritePrevious=0,spriteShownFrame=0;
function astronautPixels(res,bpp,frame,frames){
  const bitmap=Array.from({length:32},()=>Array(32).fill('.'));
  const put=(x,y,key)=>{if(x>=0&&x<32&&y>=0&&y<32)bitmap[y][x]=key};
  const stamp=(rows,x,y)=>rows.forEach((row,dy)=>[...row].forEach((key,dx)=>{if(key!=='.')put(x+dx,y+dy,key)}));
  const phase=frames===1?0:(frame/frames+.25)*Math.PI*2;
  const stride=frames===1?0:Math.round(Math.sin(phase)*2);
  const bob=frames===1?0:Math.round((1-Math.abs(Math.sin(phase)))*.8);
  const leg=['.OOO.','OHSHO','OHSHO','OHSHO','OKKKO','OKKKO','.OOOO'];
  stamp(leg,11+stride,23-(stride>0?1:0));
  stamp(leg,18-stride,23-(stride<0?1:0));
  stamp(['.OOO.','OBBBO','OBABO','OBABO','OBABO','OBABO','OBABO','OBBBO','.OOO.'],6,14+bob);
  stamp(['.OOO','OSSO','OSSO','OHHO','OHHO','.OO.'],7,16+bob+(stride<0?-1:0));
  stamp(['OOO.','OSSO','OSSO','OHHO','OHHO','.OO.'],22,16+bob+(stride>0?-1:0));
  stamp(['.OOOOOOOOOO.','OHSSSSSSSSHO','OHSSSTTSSSHO','OHSSSTTSSSHO','OHSSSSSSSSHO','OHSSSTTSSSHO','OHSSSSSSSSHO','.OSSSSSSSSO.','..OOOOOOOO..'],10,14+bob);
  stamp(['....OOOOOO....','...OHHHHHHO...','..OHHHHHHHHO..','.OHHVVVVVVHHO.','.OHVVVVVVVVHO.','.OHVVGGVVVVHO.','.OHVVGLVVVVHO.','.OHVVVVVVVVHO.','.OHHVVVVVVHHO.','..OHHHHHHHHO..','...OHHHHHHO...','....OOOOOO....'],9,2+bob);
  stamp(['HHHH','HTTH'],14,13+bob);
  // Small sprites use deliberately placed pixels so the face and feet stay readable.
  const tiny=[
    ['..OOOO..','.OHVHHO.','.OVGVVO.','..HHHH..','.OSSSSO.','.OSSTSO.','..H..H..','.KK..KK.'],
    ['..OOOO..','.OHVHHO.','.OVGVVO.','..HHHH..','.OSSSSO.','HOSSTSO.','..H.H...','.KK.KK..']
  ];
  const rgba=new Uint8ClampedArray(res*res*4);
  const colors=new Map();
  function color(key,x,y){
    if(key==='.')return [0,0,0,0];
    if(bpp===1)return ['V','G','T'].includes(key)?[0,0,0,0]:[237,245,237,255];
    let hex=bpp===2?({O:'#17233b',V:'#17233b',H:'#edf5ed',G:'#edf5ed',L:'#edf5ed',S:'#37b6a3',D:'#37b6a3',T:'#edf5ed',B:'#37b6a3',A:'#37b6a3',K:'#17233b',R:'#edf5ed'})[key]:astronautPalette[key];
    const shade=bpp===8&&res>=32?((x%4===0&&y%3===0)?9:(x%4===3&&y%3===2)?-9:0):0;
    const cacheKey=key+shade;
    if(!colors.has(cacheKey)){const n=parseInt(hex.slice(1),16);colors.set(cacheKey,[Math.max(0,Math.min(255,(n>>16)+shade)),Math.max(0,Math.min(255,((n>>8)&255)+shade)),Math.max(0,Math.min(255,(n&255)+shade)),255])}
    return colors.get(cacheKey);
  }
  for(let y=0;y<res;y++)for(let x=0;x<res;x++){
    let key;
    if(res===8){const pose=frames>1&&stride>0?1:0;key=tiny[pose][y][x]}
    else{const sx=Math.min(31,Math.floor((x+.5)*32/res)),sy=Math.min(31,Math.floor((y+.5)*32/res));key=bitmap[sy][sx];if(res===64&&bpp>=4&&key==='H'&&x%2===1&&y%2===1)key='R';if(res===64&&bpp>=4&&key==='S'&&x%2===1)key='D'}
    rgba.set(color(key,x,y),(y*res+x)*4);
  }
  return rgba;
}
function paintSpriteView(canvas,pixels,res,fixed=false){
  if(!canvas)return;
  if(canvas.width!==512||canvas.height!==512){canvas.width=canvas.height=512}
  const c=canvas.getContext('2d'),step=fixed?8:512/res,extent=fixed?res*8:512;
  c.imageSmoothingEnabled=false;c.fillStyle='#b8cad8';c.fillRect(0,0,512,512);
  c.drawImage(pixels,0,0,extent,extent);
  if(!fixed)return;
  c.strokeStyle='rgba(47,73,99,.42)';c.lineWidth=1.25;c.beginPath();
  for(let i=0;i<=(fixed?64:res);i++){const p=Math.min(511.5,i*step+.5);c.moveTo(p,0);c.lineTo(p,512);c.moveTo(0,p);c.lineTo(512,p)}c.stroke();
  if(fixed){c.strokeStyle='#42617b';c.lineWidth=2;c.strokeRect(1,1,extent-2,extent-2)}
}
function drawSprite(frame){
  const cv=$('#sprite');if(!cv)return;
  const n=state.res,source=document.createElement('canvas');source.width=source.height=n;
  source.getContext('2d').putImageData(new ImageData(astronautPixels(n,state.bpp,frame,state.frames),n,n),0,0);
  paintSpriteView(cv,source,n);paintSpriteView($('#sprite-fixed'),source,n,true);
  if($('#sprite-frame-status'))$('#sprite-frame-status').textContent=state.frames===1?'1 frame · still pose':`${spritePaused?'Paused':'Walking'} · frame ${frame+1} of ${state.frames}`;
}
function updateSprite(){
  const b=spriteBytes();
  $('#res-out').textContent=`${state.res} × ${state.res}`;
  $('#bpp-out').textContent=`Up to ${2**state.bpp} (${state.bpp} bits/pixel)`;
  $('#frames-out').textContent=state.frames;
  $('#sprite-size').textContent=`${b.toLocaleString()} bytes`;
  $('#sprite-comparison').textContent=`${(b/1024).toFixed(2)} KB · ${(b/4096*100).toFixed(1)}% of a 4 KB game · ${(b/73728*100).toFixed(1)}% of Apollo program memory`;
  
  $('#formula').textContent=`${state.res} × ${state.res} × ${state.bpp} bits × ${state.frames} frames ÷ 8 = ${b.toLocaleString()} bytes`;
  spriteShownFrame=Math.min(state.frames-1,Math.floor((spriteElapsed%1200)/1200*state.frames));drawSprite(spriteShownFrame);
}
function bindSprite(){
  clearInterval(spriteTimer);spritePrevious=performance.now();
  for(const id of ['res','bpp','frames'])$('#'+id).oninput=e=>{state[id]=id==='res'?[8,16,32,64][Number(e.target.value)]:id==='bpp'?[1,2,4,8][Number(e.target.value)]:Number(e.target.value);save();updateSprite()};
  const pause=$('#sprite-pause');if(pause){pause.textContent=spritePaused?'Resume animation':'Pause animation';pause.setAttribute('aria-pressed',String(spritePaused));pause.onclick=()=>{spritePaused=!spritePaused;pause.textContent=spritePaused?'Resume animation':'Pause animation';pause.setAttribute('aria-pressed',String(spritePaused));drawSprite(spriteShownFrame)}}
  updateSprite();
  spriteTimer=setInterval(()=>{if(state.page!==5||!$('#sprite')){clearInterval(spriteTimer);return}const now=performance.now();if(!spritePaused&&!document.hidden)spriteElapsed+=Math.min(100,now-spritePrevious);spritePrevious=now;const frame=Math.min(state.frames-1,Math.floor((spriteElapsed%1200)/1200*state.frames));if(frame!==spriteShownFrame){spriteShownFrame=frame;drawSprite(frame)}},1000/30);
}
if(state.page===5&&$('#sprite'))bindSprite();
