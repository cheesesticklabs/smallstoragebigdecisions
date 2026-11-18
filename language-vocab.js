(() => {
  state.language = state.language === 'es' ? 'es' : 'en';
  state.vocabularyLanguage ??= state.language;
  const glossary = [
    ['Storage','Almacenamiento','Space used to keep game files and data.','Espacio para guardar archivos y datos del juego.'],
    ['Byte','Byte','A unit of data made of 8 bits.','Unidad de datos formada por 8 bits.'],
    ['Kilobyte (KB)','Kilobyte (KB)','In this lab, 1 KB means 1,024 bytes.','En este laboratorio, 1 KB equivale a 1.024 bytes.'],
    ['Megabyte (MB)','Megabyte (MB)','In this lab, 1 MB means 1,024 KB.','En este laboratorio, 1 MB equivale a 1.024 KB.'],
    ['Pixel','Píxel','One small square of color in a digital image.','Un pequeño cuadro de color en una imagen digital.'],
    ['Sprite','Sprite','A picture used for a game character or object.','Imagen que representa un personaje u objeto del juego.'],
    ['Resolution','Resolución','An image’s width and height measured in pixels.','Ancho y altura de una imagen, medidos en píxeles.'],
    ['Palette','Paleta','The set of colors available for an image.','Conjunto de colores disponibles para una imagen.'],
    ['Animation','Animación','A sequence of pictures that creates the appearance of movement.','Secuencia de imágenes que produce la apariencia de movimiento.'],
    ['Frame','Fotograma','One picture in an animation.','Una imagen de una animación.'],
    ['Asset','Recurso','An image, sound, or other piece of content used in a game.','Imagen, sonido u otro elemento de contenido que usa un juego.'],
    ['Reuse','Reutilización','Using an existing piece again instead of creating a new one.','Usar otra vez un recurso existente en lugar de crear uno nuevo.'],
    ['Compression','Compresión','Storing data in a form that uses less space.','Guardar datos en un formato que ocupa menos espacio.'],
    ['Engine','Motor','Software that provides tools and systems for building a game.','Software que ofrece herramientas y sistemas para crear un juego.'],
    ['Platform','Plataforma','The device or format chosen for a game’s release.','Dispositivo o formato elegido para lanzar un juego.'],
    ['Audience','Público','The people a game is designed for.','Personas para quienes se diseña un juego.'],
    ['Budget','Presupuesto','The amount of money, space, or time available.','Cantidad de dinero, espacio o tiempo disponible.'],
    ['Production cost','Costo de producción','Money needed to make and prepare the game.','Dinero necesario para crear y preparar el juego.'],
    ['Trade-off','Compromiso de diseño','Giving up one benefit to make another choice possible.','Renunciar a una ventaja para hacer posible otra decisión.'],
    ['RAM','RAM','Memory that holds data a running game is using right now.','Memoria que guarda los datos que un juego está usando en ese momento.'],
    ['CPU','CPU','The processor that carries out the game’s instructions.','Procesador que ejecuta las instrucciones del juego.']
  ];
  function translate(value) {
    const raw=String(value),key=raw.trim();
    if(state.language!=='es'||!key)return raw;
    let result=storageSpanish[key];
    if(result===undefined){
      let m;
      if((m=key.match(/^(\d+)\. (.+)$/))) result=`${m[1]}. ${translate(m[2])}`;
      else if((m=key.match(/^STAGE (\d+) \/ (\d+) · (.*)$/)))result=`ETAPA ${m[1]} / ${m[2]} · ${translate(m[3]).replace('GROUP STUDIO','ESTUDIO EN GRUPO')}`;
      else if((m=key.match(/^(\d+) of (\d+)$/)))result=`${m[1]} de ${m[2]}`;
      else if((m=key.match(/^Move (.+) (up|down)$/)))result=`Mover ${translate(m[1])} ${m[2]==='up'?'hacia arriba':'hacia abajo'}`;
      else if((m=key.match(/^First released (\d+)$/)))result=`Primer lanzamiento: ${m[1]}`;
      else if((m=key.match(/^≈ (.+) early 4 KB games$/)))result=`≈ ${m[1]} juegos antiguos de 4 KB`;
      else if((m=key.match(/^Up to (\d+) \((\d+) bits\/pixel\)$/)))result=`Hasta ${m[1]} (${m[2]} bits/píxel)`;
      else if((m=key.match(/^(Walking|Paused) · frame (\d+) of (\d+)$/)))result=`${m[1]==='Walking'?'Caminando':'En pausa'} · fotograma ${m[2]} de ${m[3]}`;
      else if((m=key.match(/^(.+) KB · (.+)% of a 4 KB game · (.+)% of Apollo program memory$/)))result=`${m[1]} KB · ${m[2]}% de un juego de 4 KB · ${m[3]}% de la memoria del programa Apolo`;
      else if((m=key.match(/^(\d+) (levels|players)$/)))result=`${m[1]} ${m[2]==='levels'?(m[1]==='1'?'nivel':'niveles'):'jugadores'}`;
      else if((m=key.match(/^(Short|Medium|Long) · (\d+) planned scenes$/)))result=`${({Short:'Corto',Medium:'Medio',Long:'Largo'})[m[1]]} · ${m[2]} escenas previstas`;
      else if((m=key.match(/^(.+) space · (.+) hours$/)))result=`${m[1]} espacio · ${m[2]} horas`;
      else if((m=key.match(/^(.+): (.+) space \/ (.+) hours for the first one$/)))result=`${translate(m[1])}: ${m[2]} de espacio / ${m[3]} horas para el primero`;
      else if((m=key.match(/^(.+) storage units over$/)))result=`${m[1]} unidades de almacenamiento de más`;
      else if((m=key.match(/^(.+) hours over$/)))result=`${m[1]} horas de más`;
      else if((m=key.match(/^(\$[\d,.]+) over$/)))result=`${m[1]} por encima del presupuesto`;
      else if((m=key.match(/^up to (\$[\d,.]+)$/)))result=`hasta ${m[1]}`;
      else if((m=key.match(/^(\d+[–-]\d+) minutes$/)))result=`${m[1]} minutos`;
      else if((m=key.match(/^(\$[\d,.]+) (audience budget|budget)$/)))result=`${m[1]} de presupuesto${m[2]==='audience budget'?' del público':''}`;
      else if((m=key.match(/^(\d+) \/ 5\. Try again\.\s*(.*)$/)))result=`${m[1]} / 5. Inténtalo de nuevo. ${translate(m[2])}`;
      else if((m=key.match(/^Playing (.+)$/)))result=`Jugando ${m[1]}`;
      else if((m=key.match(/^Loading (.+)$/)))result=`Cargando ${m[1]}`;
      else if((m=key.match(/^(.+) stars$/)))result=`${m[1]} estrellas`;
      else if(key.includes(' · ')&&key.split(' · ').every(v=>storageSpanish[v]||/over$/.test(v)))result=key.split(' · ').map(translate).join(' · ');
      else if(key.includes('bits ×')&&key.includes('frames ÷'))result=key.replace('frames ÷','fotogramas ÷');
      else {
        // Feedback can contain two known explanation sentences.
        const reasons=['Reusing artwork saves space.','The cover image uses about 23 times the space.','Storage can hold more assets. Other limits remain.','Design choices and the player’s experience still matter.','Twice the width × twice the height = four times the pixels.','Fewer colors need fewer bits per pixel in this model.'];
        if(reasons.some(v=>key.includes(v)))result=reasons.reduce((v,phrase)=>v.replace(phrase,storageSpanish[phrase]),key);
      }
    }
    return result===undefined?raw:raw.replace(key,result);
  }
  window.storageT=translate;
  const originalText=new WeakMap(),originalAttributes=new WeakMap();
  const skip='script,style,textarea,[data-no-translate],#vocabulary-dialog,.report p,.report h2';
  let queued=false;
  const observer=new MutationObserver(()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;localize()})});
  function translateNode(node){
    if(!node.parentElement||node.parentElement.closest(skip))return;
    const current=node.nodeValue;
    let record=originalText.get(node);
    if(!record||current!==record.en&&current!==record.es){record={en:current,es:null};originalText.set(node,record)}
    const next=state.language==='es'?translate(record.en):record.en;
    record.es=state.language==='es'?next:record.es;
    if(node.nodeValue!==next)node.nodeValue=next;
  }
  function translateDocument(doc){
    if(!doc?.body)return;
    doc.documentElement.lang=state.language;
    // Option text must never become the game-state value when translated.
    doc.querySelectorAll('option').forEach(option=>{if(!option.hasAttribute('value'))option.setAttribute('value',option.value)});
    const walker=doc.createTreeWalker(doc.body,NodeFilter.SHOW_TEXT);
    let node;while((node=walker.nextNode()))translateNode(node);
    doc.querySelectorAll('[aria-label],[title],[placeholder],[alt]').forEach(el=>{
      if(el.closest('[data-no-translate],#vocabulary-dialog'))return;
      let records=originalAttributes.get(el);if(!records){records={};originalAttributes.set(el,records)}
      for(const name of ['aria-label','title','placeholder','alt']){
        const value=el.getAttribute(name);if(value===null)continue;
        let r=records[name];if(!r||value!==r.en&&value!==r.es)r=records[name]={en:value,es:null};
        const next=state.language==='es'?translate(r.en):r.en;if(state.language==='es')r.es=next;if(value!==next)el.setAttribute(name,next);
      }
    });
  }
  function localize(){
    observer.disconnect();translateDocument(document);
    document.querySelectorAll('iframe').forEach(frame=>{try{translateDocument(frame.contentDocument);if(!frame.dataset.languageObserved){frame.dataset.languageObserved='true';frame.addEventListener('load',localize)}}catch{}});
    languageButton.textContent=state.language==='es'?'English':'Español';
    languageButton.setAttribute('aria-label',state.language==='es'?'Switch to English':'Cambiar a español');
    document.title='Small Storage, Big Decisions · Cheesestick Labs';
    const options={subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['aria-label','title','placeholder','alt']};
    observer.observe(document.body,options);
    document.querySelectorAll('iframe').forEach(frame=>{try{if(frame.contentDocument?.body)observer.observe(frame.contentDocument.body,options)}catch{}});
  }
  const languageButton=document.createElement('button');languageButton.id='language-mode';languageButton.type='button';languageButton.dataset.noTranslate='';
  languageButton.onclick=()=>{state.language=state.language==='es'?'en':'es';save();localize();if(vocabDialog.open)showVocabulary()};
  const vocabButton=document.createElement('button');vocabButton.type='button';vocabButton.id='open-vocabulary';vocabButton.className='vocab-tab';vocabButton.innerHTML=`<span>Vocabulary</span><span aria-hidden="true">${glossary.length}</span>`;vocabButton.setAttribute('aria-haspopup','dialog');vocabButton.setAttribute('aria-controls','vocabulary-dialog');vocabButton.setAttribute('aria-expanded','false');
  document.querySelector('.tools').prepend(languageButton);
  document.body.append(vocabButton);
  const vocabDialog=document.createElement('dialog');vocabDialog.id='vocabulary-dialog';vocabDialog.setAttribute('aria-labelledby','vocabulary-title');vocabDialog.dataset.noTranslate='';
  document.body.append(vocabDialog);
  const fold=s=>s.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  function vocabularyResults(){
    const value=fold(vocabDialog.querySelector('input').value),found=glossary.filter(item=>fold(item.join(' ')).includes(value));
    const es=state.vocabularyLanguage==='es';
    vocabDialog.querySelector('#vocabulary-results').innerHTML=found.length?found.map(([en,sp,enDef,spDef])=>`<article class="vocabulary-entry"><h3><span lang="${es?'es':'en'}">${esc(es?sp:en)}</span></h3><p lang="${es?'es':'en'}">${esc(es?spDef:enDef)}</p></article>`).join(''):`<p>${es?'No se encontraron palabras.':'No matching words.'}</p>`;
  }
  function showVocabulary(){
    const query=vocabDialog.querySelector('input')?.value||'',es=state.vocabularyLanguage==='es';
    vocabDialog.innerHTML=`<div class="vocabulary-top"><h2 id="vocabulary-title">${es?'Vocabulario':'Vocabulary'}</h2><button type="button" id="vocabulary-language" aria-label="${es?'Switch vocabulary to English':'Cambiar vocabulario a español'}">${es?'E / S ✓':'E ✓ / S'}</button><button type="button" id="close-vocabulary" aria-label="${es?'Cerrar vocabulario':'Close vocabulary'}">×</button></div><label for="vocabulary-search">${es?'Buscar una palabra':'Find a word'}</label><input type="search" id="vocabulary-search" placeholder="${es?'Buscar una palabra':'Search for a word'}" autocomplete="off" value="${esc(query)}"><div id="vocabulary-results" aria-live="polite"></div>`;
    vocabDialog.querySelector('#vocabulary-language').onclick=()=>{state.vocabularyLanguage=state.vocabularyLanguage==='es'?'en':'es';save();showVocabulary()};
    vocabDialog.querySelector('#close-vocabulary').onclick=()=>{vocabDialog.close();vocabButton.focus()};vocabDialog.querySelector('input').oninput=vocabularyResults;vocabularyResults();
  }
  vocabButton.onclick=()=>{if(vocabDialog.open){vocabDialog.close();return}showVocabulary();vocabDialog.show();vocabButton.setAttribute('aria-expanded','true')};
  vocabDialog.addEventListener('close',()=>vocabButton.setAttribute('aria-expanded','false'));
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&vocabDialog.open){vocabDialog.close();vocabButton.focus()}});
  const englishDownload=download;
  download=function(){if(state.language!=='es')return englishDownload();const l=state.lab,c=labCosts(),price=gamePrice();const labels={'game-name':'Nombre del juego',student:'Estudiante',surprise:'Predicción',timeline:'Historia del almacenamiento','atari-reflection':'Reflexión sobre Atari','sprite-notice':'Investigación del sprite',choice1:'Decisión para el público',choice2:'Lanzamiento y precio',cut:'Lo que eliminamos o reutilizamos',discussion:'Conversación',exit:'Reflexión final'};const text=`SMALL STORAGE, BIG DECISIONS · INFORME DE DISEÑO\n${state.answers.student||''}\n${state.answers['game-name']||''}\nPúblico: ${translate(audiences[l.audience].name)}\nPlataforma: ${translate(platforms[l.platform].name)}\nDuración: ${l.levels} niveles, ${l.length} escenas por nivel\nAlmacenamiento: ${c.space} / ${platforms[l.platform].space}\nCosto del juego: ${dollars(price.total)}\nPrecio para el público: ${dollars(l.price)}\n\n`+Object.entries(state.answers).filter(([,v])=>String(v).trim()).map(([k,v])=>`${labels[k]||k}\n${v}`).join('\n\n');downloadBlob(text,'Storage-Wars-informe.txt','text/plain;charset=utf-8')};
  const renderEnglish=render;
  render=function(){renderEnglish();localize()};
  localize();
})();
