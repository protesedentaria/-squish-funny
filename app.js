


let saved = {};
try { const value=JSON.parse(localStorage.getItem('squishFunnyState') || '{}'); if(value && typeof value==='object' && !Array.isArray(value)) saved=value; } catch {}
const hasSavedLanguage=['pt','en','es','zh'].includes(saved.language);
for (const key of ['points','made','achievements','earnedPoints']) saved[key]=Number.isSafeInteger(saved[key])&&saved[key]>=0?saved[key]:0;
if(!['pt','en','es','zh'].includes(saved.language)) saved.language='pt';
let points=saved.points||0, made=saved.made||0, achievements=saved.achievements||0, language=saved.language||'pt';
let earnedPoints=Math.max(saved.earnedPoints||0,points);
let inventory=saved.inventory&&typeof saved.inventory==='object'&&!Array.isArray(saved.inventory)?saved.inventory:{};
const materialCatalog={
  'paper-white':{name:'Papel branco',icon:'paper',price:10},
  'paper-colors':{name:'Papel colorido',icon:'paper',price:20},
  'filling-soft':{name:'Enchimento macio',icon:'filling',price:15},
  'filling-cloud':{name:'Enchimento nuvem',icon:'filling',price:25},
  'markers-basic':{name:'Canetinhas de 12 cores',icon:'markers',price:30},
  'markers-rainbow':{name:'Canetinhas arco-íris',icon:'markers',price:50}
};

function updateShop(){
  document.querySelectorAll('[data-shop-balance]').forEach(el=>el.textContent=points+' pontos');
  document.querySelectorAll('[data-buy-item]').forEach(button=>{
    const id=button.dataset.buyItem, item=materialCatalog[id], owned=inventory[id]===true;
    button.disabled=owned||points<item.price;
    button.textContent=owned?'✓ Adquirido':points<item.price?'Faltam '+(item.price-points)+' pontos':'Comprar por '+item.price+' pontos';
  });
  const container=document.getElementById('materialInventory');
  container.replaceChildren();
  const owned=Object.keys(materialCatalog).filter(id=>inventory[id]===true);
  if(!owned.length){container.textContent='Você ainda não tem materiais. Ganhe pontos nos desafios e escolha seus primeiros itens na loja.';return;}
  const list=document.createElement('ul');list.className='inventory-list';
  owned.forEach(id=>{const li=document.createElement('li');li.innerHTML=iconSVG(materialCatalog[id].icon);li.append(document.createTextNode(' '+materialCatalog[id].name));list.append(li);});
  container.append(list);
}
function buyMaterial(id){
  const item=materialCatalog[id];
  if(!item||inventory[id]===true||points<item.price) return;
  points-=item.price;inventory[id]=true;
  try{saveState();}catch(error){
    points+=item.price;delete inventory[id];
    document.querySelectorAll('.shop-feedback').forEach(el=>el.textContent='Não foi possível salvar a compra. Seus pontos foram mantidos. Tente novamente.');
    return;
  }
  updateProfile();
  document.querySelectorAll('.shop-feedback').forEach(el=>el.textContent=item.name+' adquirido! Está em Meus materiais no seu perfil.');
}


function applyLanguage(){
  document.documentElement.lang={pt:'pt-BR',en:'en',es:'es',zh:'zh-CN'}[language];
  document.getElementById('languageSelect').value=language;
  localizePage();
}
function saveState(){
  Object.assign(saved,{points,earnedPoints,made,achievements,language,inventory});
  try { localStorage.setItem('squishFunnyState', JSON.stringify(saved)); }
  catch { notify('Não foi possível salvar neste navegador. Seu progresso ficará apenas nesta sessão.'); }
}
function chooseLanguage(lang,goHome=true){
  if(!['pt','en','es','zh'].includes(lang)) return;
  language=lang; applyLanguage(); saveState();
  if(goHome) show('home');
}
function show(id){
  if(!document.getElementById(id)?.classList.contains('screen')) id='home';
  if(location.hash !== '#'+id) location.hash=id;
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  const nav=document.getElementById('bottomNav');
  nav.style.display = id==='language' ? 'none':'flex';
  const navId=id.startsWith('shop-')?'shop':['collection','friend','collection-print'].includes(id)?'play':['tutorial','printables','print-detail','plus','custom-print'].includes(id)?'create':id;
  document.querySelectorAll('.nav').forEach(n=>n.classList.toggle('active',n.getAttribute('href')==='#'+navId));
  document.getElementById(id).scrollTop=0;
  document.querySelectorAll('.nav').forEach(n=>n.setAttribute('aria-current',n.classList.contains('active')?'page':'false'));
  const heading=document.querySelector('#'+id+' h2');
  if(heading){heading.tabIndex=-1;heading.focus({preventScroll:true});}
  localizePage();
}
function syncScreen(){
  const id=location.hash.slice(1)||(hasSavedLanguage?'home':'language');
  show(id);
}
window.addEventListener('hashchange',syncScreen);
window.addEventListener('hashchange',()=>{if(location.hash==='#challenges')updateChallengeButtons();});
// Initial navigation runs after content has been restored.
function nav(el,id){ show(id); }
function selectModel(name,emoji,difficulty,time,restore=false){
  const title=document.getElementById('tutorialTitle');title.textContent=name+' ';title.insertAdjacentHTML('beforeend',iconSVG(emoji));
  document.getElementById('tutorialMeta').textContent=difficulty+' • '+time;
  document.getElementById('tutorialDraw').textContent='Desenhe o contorno de '+name+' duas vezes, espelhando o verso. Deixe espaço para a fita.';
  saved.model={name,emoji,difficulty,time};
  if(!restore)saved.projectComplete=false;
  updateProjectButton();saveState();
}
function addPoints(n){
  if(n!==20&&n!==35)return;
  const day=new Date().toLocaleDateString('en-CA');
  if(!saved.claims||typeof saved.claims!=='object'||Array.isArray(saved.claims))saved.claims={};
  if(saved.claims[n]===day)return;
  saved.claims[n]=day;
  points+=n; earnedPoints+=n; achievements+=1; updateProfile(); saveState();
  updateChallengeButtons();
  notify('Desafio concluído! +'+n+' pontos');
}
function completeSquish(){
  if(saved.projectComplete)return;
  saved.projectComplete=true;updateProjectButton();
  points+=25; earnedPoints+=25; made+=1; achievements+=1; updateProfile(); saveState();
  notify('Você conseguiu! +25 pontos');
  show('profile');
}
function updateProjectButton(){
  const button=document.getElementById('completeSquishButton');
  if(button){button.disabled=!!saved.projectComplete;button.textContent=saved.projectComplete?'Projeto concluído':'Consegui fazer!';}
  const restart=document.getElementById('restartTutorial');if(restart)restart.hidden=!saved.projectComplete;
}
function restartTutorial(){saved.projectComplete=false;updateProjectButton();saveState();}
function updateChallengeButtons(){
  const day=new Date().toLocaleDateString('en-CA');
  document.querySelectorAll('[data-challenge]').forEach(button=>{
    const done=saved.claims?.[button.dataset.challenge]===day;
    button.disabled=done;button.textContent=done?'Hoje já concluído':button.dataset.challenge==='20'?'Concluir desafio':'Marcar como concluído';
  });
}
function updateProfile(){
  let level='Iniciante';
  if(earnedPoints>=250) level='Mestre do Squish';
  else if(earnedPoints>=100) level='Criador';
  document.getElementById('levelText').textContent=level+' • '+earnedPoints+' pontos ganhos';
  document.getElementById('madeCount').textContent=made+' feitos';
  document.getElementById('achievementCount').textContent=achievements+' conquistas';
  const progress=earnedPoints>=250?100:earnedPoints>=100?(earnedPoints-100)/150*100:earnedPoints;
  document.getElementById('progressBar').style.width=progress+'%';
  document.getElementById('homeLevel').textContent=level+' • '+earnedPoints+' pontos ganhos';
  updateShop();
}


const printableData = {
  butter:{name:'Pink Guava Butter',kind:'box',c1:'#dff7a7',c2:'#ff9fbd',accent:'#e64d78',label:'PINK GUAVA',title:'BUTTER',sub:'4 oz • NET WT. 113 g',fruit:'GUAVA'},
  strawmilk:{name:'Strawberry Milk',kind:'box',c1:'#fff0f4',c2:'#ffadc8',accent:'#d94673',label:'STRAWBERRY',title:'MILK',sub:'sweet & soft',fruit:'BERRY'},
  peachjuice:{name:'Peach Juice',kind:'box',c1:'#fff0b0',c2:'#ffb694',accent:'#e86a50',label:'PEACH',title:'JUICE',sub:'fresh & cute',fruit:'PEACH'},
  meloncube:{name:'Melon Cube',kind:'box',c1:'#e0f7a8',c2:'#a8ebd1',accent:'#4c9f7f',label:'MELON',title:'CUBE',sub:'soft melon squish',fruit:'MELON'},
  blueyogurt:{name:'Blueberry Yogurt',kind:'box',c1:'#d8e5ff',c2:'#cab5ff',accent:'#6858be',label:'BLUEBERRY',title:'YOGURT',sub:'berry cream',fruit:'BERRY'},
  lemoncandy:{name:'Lemon Candy',kind:'box',c1:'#fff5a7',c2:'#ffd8a3',accent:'#d59f16',label:'LEMON',title:'CANDY',sub:'sweet & sour',fruit:'LEMON'},
  watergum:{name:'Watermelon Gum',kind:'box',c1:'#d7f4b3',c2:'#ff9bb2',accent:'#df4b68',label:'WATERMELON',title:'GUM',sub:'bubble & smile',fruit:'MELON'},
  mangocream:{name:'Mango Cream',kind:'box',c1:'#fff0a8',c2:'#ffc083',accent:'#e27e27',label:'MANGO',title:'CREAM',sub:'tropical soft',fruit:'MANGO'},
  grapesoda:{name:'Grape Soda',kind:'box',c1:'#e7dcff',c2:'#bba2f2',accent:'#6d50a8',label:'GRAPE',title:'SODA',sub:'fizzy cute',fruit:'GRAPE'},
  cherrycereal:{name:'Cherry Cereal',kind:'box',c1:'#ffe3ed',c2:'#ffadc2',accent:'#d34a6e',label:'CHERRY',title:'CEREAL',sub:'happy breakfast',fruit:'CHERRY'},
  bananapud:{name:'Banana Pudding',kind:'box',c1:'#fff4b7',c2:'#ffe0a0',accent:'#c89722',label:'BANANA',title:'PUDDING',sub:'creamy & soft',fruit:'BANANA'},
  kiwicookies:{name:'Kiwi Cookies',kind:'box',c1:'#e8f5b8',c2:'#b6d98f',accent:'#6c944e',label:'KIWI',title:'COOKIES',sub:'tiny treats',fruit:'KIWI'},
  orangejelly:{name:'Orange Jelly',kind:'box',c1:'#ffe2a9',c2:'#ffb77e',accent:'#df7b2b',label:'ORANGE',title:'JELLY',sub:'juicy squish',fruit:'ORANGE'},
  pinechips:{name:'Pineapple Snack',kind:'box',c1:'#fff0a4',c2:'#c8eda5',accent:'#aa8a1b',label:'PINEAPPLE',title:'SNACK',sub:'crispy cute',fruit:'PINE'},
  appletea:{name:'Apple Tea',kind:'box',c1:'#e5f1b1',c2:'#ffb1b1',accent:'#c74e55',label:'APPLE',title:'TEA',sub:'fruity & calm',fruit:'APPLE'},
  coconutmilk:{name:'Coconut Milk',kind:'box',c1:'#f9f2df',c2:'#cfeadf',accent:'#688e84',label:'COCONUT',title:'MILK',sub:'smooth & sweet',fruit:'COCO'},
  donutbox:{name:'Donut Box',kind:'box',c1:'#ffe0ec',c2:'#d8c3ff',accent:'#9c5f96',label:'STRAWBERRY',title:'DONUT',sub:'sprinkle joy',fruit:'DONUT'},
  cupcakemix:{name:'Cupcake Mix',kind:'box',c1:'#d9ecff',c2:'#ffd1e7',accent:'#6d7ab8',label:'VANILLA',title:'CUPCAKE',sub:'bake a smile',fruit:'CUP'},
  rainbowcandy:{name:'Rainbow Candy',kind:'box',c1:'#e3f4ff',c2:'#ffd2ea',accent:'#6f6ab8',label:'RAINBOW',title:'CANDY',sub:'colorful treats',fruit:'RAINBOW'},
  vanillacream:{name:'Vanilla Cream',kind:'box',c1:'#fff7d8',c2:'#f0d8ff',accent:'#9872a5',label:'VANILLA',title:'CREAM',sub:'soft cloud',fruit:'VANILLA'}
};

function boxNetSVG(d){
  const a=d.accent||'#d84a6c';
  return `
  <svg viewBox="0 0 794 1123" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Molde ${d.name}">
    <defs>
      <linearGradient id="printGradient" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0" stop-color="${d.c1}"/>
        <stop offset=".55" stop-color="#fff1df"/>
        <stop offset="1" stop-color="${d.c2}"/>
      </linearGradient>
      <style>
        .cut{stroke:${a};stroke-width:3;fill:none}
        .fold{stroke:${a};stroke-width:2;stroke-dasharray:12 9;fill:none;opacity:.72}
        .main{font-family:Arial,sans-serif;fill:${a}}
        .note{font-family:Arial,sans-serif;fill:#6f6575}
      </style>
    </defs>

    <rect width="794" height="1123" fill="#fff"/>
    <text x="397" y="48" text-anchor="middle" class="note" font-size="19" font-weight="700">${d.name}</text>
    <text x="397" y="76" text-anchor="middle" class="note" font-size="13">linha contínua = recortar • linha tracejada = dobrar</text>

    <path d="M185 270 H305 V150 H594 V270 H714 V430 H594 V830 H305 V430 H185 Z" fill="url(#printGradient)" stroke="${a}" stroke-width="3"/>
    <path d="M305 270H594 M305 430H594 M305 550H594 M305 710H594 M305 270V430 M594 270V430" class="fold"/>
    <!-- Front artwork, inspired by reference composition but original -->
    <text x="408" y="322" text-anchor="middle" class="main" font-size="25">${d.label}</text>
    <text x="408" y="365" text-anchor="middle" class="main" font-size="46" font-weight="900">${d.title}</text>
    <text x="242" y="342" text-anchor="middle" class="main" font-size="26" font-weight="700">4 oz.</text>
    <text x="242" y="371" text-anchor="middle" class="main" font-size="15">NET WT. (113 G)</text>

    <!-- Original little fruit badge -->
    <g transform="translate(530,308)">
      <ellipse cx="30" cy="34" rx="27" ry="30" fill="#ffffff" opacity=".82" stroke="${a}" stroke-width="2"/>
      <ellipse cx="30" cy="35" rx="17" ry="20" fill="${d.c2}" stroke="${a}" stroke-width="1.4"/>
      <path d="M27 13 Q30 3 37 13" fill="${d.c1}" stroke="${a}" stroke-width="1.5"/>
      <circle cx="25" cy="33" r="2" fill="${a}"/><circle cx="35" cy="38" r="2" fill="${a}"/>
      <circle cx="32" cy="28" r="1.6" fill="${a}"/>
    </g>

    <!-- Side/back decoration -->
    <text x="450" y="520" text-anchor="middle" class="main" font-size="18" opacity=".72">${d.sub}</text>
    <text x="450" y="635" text-anchor="middle" class="main" font-size="16" opacity=".62">SQUISH FUNNY • PAPER SQUISH</text>

    <!-- Scissor and fold legend -->
    <g transform="translate(170,920)">
      <rect x="0" y="0" width="454" height="108" rx="18" fill="#faf7fb" stroke="#e7dfe9"/>
      <text x="25" y="36" class="note" font-size="15" font-weight="700">1. Imprima em 100% / tamanho real</text>
      <text x="25" y="61" class="note" font-size="15">2. Recorte somente o contorno externo</text>
      <text x="25" y="86" class="note" font-size="15">3. Dobre nas linhas tracejadas e monte</text>
    </g>
  </svg>`;
}

function shapeSVG(d){
  const shapeMap={
    'strawberry':'M200 280 C145 205 90 278 110 390 C132 510 190 620 250 680 C310 620 368 510 390 390 C410 278 355 205 300 280 C270 240 230 240 200 280 Z',
    'watermelon':'M95 410 A155 155 0 0 0 405 410 L95 410 Z',
    'apple':'M112 400 C92 292 170 250 250 294 C330 250 408 292 388 400 C370 525 307 627 250 665 C193 627 130 525 112 400 Z',
    'orange':'M250 265 C355 265 415 345 400 455 C383 580 315 650 250 650 C185 650 117 580 100 455 C85 345 145 265 250 265 Z',
    'lemon':'M95 450 C118 332 192 275 250 248 C308 275 382 332 405 450 C382 568 308 625 250 652 C192 625 118 568 95 450 Z',
    'pear':'M250 255 C302 280 322 335 320 380 C395 415 392 540 330 612 C286 665 214 665 170 612 C108 540 105 415 180 380 C178 335 198 280 250 255 Z',
    'kiwi':'M250 260 C360 260 420 340 405 455 C390 570 325 645 250 645 C175 645 110 570 95 455 C80 340 140 260 250 260 Z',
    'pineapple':'M250 315 C335 315 370 395 360 500 C350 595 305 655 250 655 C195 655 150 595 140 500 C130 395 165 315 250 315 Z',
    'cherries':'M140 470 C95 405 140 345 205 365 C250 380 265 440 235 490 C205 540 160 535 140 470 Z M265 470 C220 405 265 345 330 365 C375 380 390 440 360 490 C330 540 285 535 265 470 Z',
    'grapes':'M250 300 C310 305 350 350 342 405 C390 425 388 490 350 515 C360 575 300 615 250 585 C200 615 140 575 150 515 C112 490 110 425 158 405 C150 350 190 305 250 300 Z'
  };
  const p=shapeMap[d.emoji]||shapeMap['strawberry'];
  function face(x){return `<g transform="translate(${x},0)"><path d="${p}" fill="url(#fruit)" stroke="#d84a6c" stroke-width="4"/>${printIconSVG(d.emoji,209,348,82)}<circle cx="225" cy="500" r="7" fill="#493f51"/><circle cx="275" cy="500" r="7" fill="#493f51"/><path d="M235 527 Q250 545 265 527" fill="none" stroke="#493f51" stroke-width="5"/><text x="250" y="590" text-anchor="middle" font-family="Arial" font-size="22" font-weight="700" fill="#8c3659">${d.name.toUpperCase()}</text></g>`}
  return `<svg viewBox="0 0 1123 794" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Molde ${d.name}"><defs><linearGradient id="fruit" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${d.c1}"/><stop offset="1" stop-color="${d.c2}"/></linearGradient></defs><rect width="1123" height="794" fill="#fff"/><text x="561" y="42" text-anchor="middle" font-family="Arial" font-size="20" font-weight="700" fill="#5d5366">${d.name} • FRENTE E VERSO PRONTOS</text><text x="561" y="68" text-anchor="middle" font-family="Arial" font-size="14" fill="#5d5366">Recorte as duas peças, una com fita deixando uma abertura e coloque enchimento</text>${face(20)}${face(575)}<text x="561" y="748" text-anchor="middle" font-family="Arial" font-size="14" fill="#5d5366">Linha rosa = recorte • deixe cerca de 1 cm sem fechar para colocar o enchimento</text></svg>`;
}

function openPrintable(key){
  const d=printableData[key]||printableData.butter;
  saved.printable=key;saveState();
  document.getElementById('printTitle').textContent=d.name;
  document.getElementById('printDesc').textContent='Use papel A4, escala 100% e desative cabeçalhos e rodapés. Recorte o contorno, dobre os tracejados e una as bordas com fita. Encha antes de fechar a última face.';
  document.getElementById('printSheet').innerHTML=boxNetSVG(d);
}
openPrintable(Object.hasOwn(printableData,saved.printable)?saved.printable:'butter');


// --- Squish Funny Plus: criador personalizado ---
const customSquish={shape:'butter',color:'#ffd66b',eyes:'●|●',mouth:'◡',detail:''};
const customOptions={shape:['butter','heart','cloud','round','star'],color:['#ffd66b','#ff9fc6','#b69cff','#8ee7cf','#7cc8ff','#ffad7a'],eyes:['●|●','^|^','♡|♡','✦|✦','•|◡'],mouth:['◡','ᴗ','ω','○','﹏'],detail:['','bow','flower','sparkles','strawberry']};
for(const key of Object.keys(customOptions)) if(customOptions[key].includes(saved.custom?.[key])) customSquish[key]=saved.custom[key];
function buyPlus(){
  saved.plusDemo=true; saveState(); unlockPlus();
  notify('Demonstração Plus liberada. Nenhuma cobrança foi feita.');
}

function unlockPlus(){
  document.getElementById('plusGate').style.display='none';
  document.getElementById('plusBuilder').style.display='block';
  renderCustom();
}
function setCustom(type,value,el){
  if(!customOptions[type]?.includes(value)) return;
  customSquish[type]=value;
  const parent=el && el.parentElement;
  if(parent) parent.querySelectorAll('button').forEach(b=>b.classList.remove('selected'));
  if(el) el.classList.add('selected');
  renderCustom();
}
function renderCustom(){
  const p=document.getElementById('customPreview'); if(!p) return;
  p.innerHTML='<svg viewBox="40 70 440 440" role="img" aria-label="Seu Squish personalizado">'+customFaceSVG(0)+'</svg>';
  document.querySelectorAll('#plusBuilder button[onclick^="setCustom"]').forEach(button=>{
    const match=button.getAttribute('onclick').match(/setCustom\('([^']+)','([^']*)'/);
    const selected=!!match && customSquish[match[1]]===match[2];
    button.classList.toggle('selected',selected); button.setAttribute('aria-pressed',String(selected));
  });
  saved.custom={...customSquish}; saveState();
}
function randomCustom(){
  const shapes=['butter','heart','cloud','round','star'];
  const colors=['#ffd66b','#ff9fc6','#b69cff','#8ee7cf','#7cc8ff','#ffad7a'];
  const eyes=['●|●','^|^','♡|♡','✦|✦','•|◡'];
  const mouths=['◡','ᴗ','ω','○','﹏'];
  const details=['','bow','flower','sparkles','strawberry'];
  customSquish.shape=shapes[Math.floor(Math.random()*shapes.length)];
  customSquish.color=colors[Math.floor(Math.random()*colors.length)];
  customSquish.eyes=eyes[Math.floor(Math.random()*eyes.length)];
  customSquish.mouth=mouths[Math.floor(Math.random()*mouths.length)];
  customSquish.detail=details[Math.floor(Math.random()*details.length)];
  document.querySelectorAll('#plusBuilder .selected').forEach(b=>b.classList.remove('selected'));
  renderCustom();
}
function customShapePath(shape,xoff=0){
  const m={
    butter:`M${80+xoff} 170 Q${80+xoff} 125 ${125+xoff} 125 H${375+xoff} Q${420+xoff} 125 ${420+xoff} 170 V430 Q${420+xoff} 470 ${380+xoff} 470 H${120+xoff} Q${80+xoff} 470 ${80+xoff} 430 Z`,
    heart:`M${250+xoff} 465 C${210+xoff} 420 ${95+xoff} 340 ${95+xoff} 235 C${95+xoff} 145 ${205+xoff} 115 ${250+xoff} 195 C${295+xoff} 115 ${405+xoff} 145 ${405+xoff} 235 C${405+xoff} 340 ${290+xoff} 420 ${250+xoff} 465 Z`,
    cloud:`M${120+xoff} 410 C${65+xoff} 410 ${60+xoff} 325 ${120+xoff} 302 C${105+xoff} 220 ${200+xoff} 170 ${260+xoff} 225 C${315+xoff} 155 ${430+xoff} 225 ${415+xoff} 310 C${475+xoff} 330 ${460+xoff} 410 ${400+xoff} 410 Z`,
    round:`M${250+xoff} 110 A175 175 0 1 1 ${249+xoff} 110 Z`,
    star:`M${250+xoff} 105 L${292+xoff} 225 L${420+xoff} 228 L${317+xoff} 304 L${355+xoff} 430 L${250+xoff} 355 L${145+xoff} 430 L${183+xoff} 304 L${80+xoff} 228 L${208+xoff} 225 Z`
  }; return m[shape]||m.butter;
}
function customFaceSVG(x){
  const e=customSquish.eyes.split('|');
  return `<path d="${customShapePath(customSquish.shape,x)}" fill="${customSquish.color}" stroke="#8e63ee" stroke-width="4"/><text x="${220+x}" y="300" text-anchor="middle" font-family="Arial" font-size="42" fill="#44394f">${e[0]}</text><text x="${280+x}" y="300" text-anchor="middle" font-family="Arial" font-size="42" fill="#44394f">${e[1]||e[0]}</text><text x="${250+x}" y="355" text-anchor="middle" font-family="Arial" font-size="43" fill="#44394f">${customSquish.mouth}</text>${printIconSVG(customSquish.detail,335+x,135,50)}`;
}
function customPrintableSVG(){
  return `<svg viewBox="0 0 1123 794" xmlns="http://www.w3.org/2000/svg"><rect width="1123" height="794" fill="#fff"/><text x="561" y="48" text-anchor="middle" font-family="Arial" font-size="21" font-weight="700" fill="#5d5366">MEU SQUISH PLUS • FRENTE E VERSO</text><text x="561" y="76" text-anchor="middle" font-family="Arial" font-size="14" fill="#6f6575">Recorte as duas peças, una as bordas e deixe uma abertura para colocar enchimento</text>${customFaceSVG(15)}<g transform="translate(1075 0) scale(-1 1)">${customFaceSVG(0)}</g><line x1="561" y1="100" x2="561" y2="670" stroke="#eadff1" stroke-dasharray="9 8"/><text x="561" y="744" text-anchor="middle" font-family="Arial" font-size="14" fill="#6f6575">Exclusivo Squish Funny Plus • criado por você</text></svg>`;
}
function openCustomPrintable(){
  const el=document.getElementById('customPrintSheet');
  if(el) el.innerHTML=customPrintableSVG();
  localizePage();
  location.hash='custom-print';
}
renderCustom();

updateProfile();
if(saved.plusDemo) unlockPlus();
document.getElementById('customPrintSheet').innerHTML=customPrintableSVG();
if(saved.model && ['name','emoji','difficulty','time'].every(k=>typeof saved.model[k]==='string')) selectModel(saved.model.name,saved.model.emoji,saved.model.difficulty,saved.model.time,true);
updateProjectButton();updateChallengeButtons();
applyLanguage(); syncScreen();
document.getElementById('languageSelect').addEventListener('change',e=>chooseLanguage(e.target.value,false));
document.querySelectorAll('#language .lang').forEach((a,i)=>a.addEventListener('click',()=>chooseLanguage(['pt','en','es','zh'][i])));
new MutationObserver(()=>localizePage()).observe(document.querySelector('.app'),{childList:true,subtree:true,characterData:true});

function downloadTemplate(id){
  localizePage();
  const svg=document.querySelector('#'+id+' svg').cloneNode(true);
  svg.setAttribute('xmlns','http://www.w3.org/2000/svg');
  const landscape=id==='customPrintSheet'||id==='collectionSheet';
  svg.setAttribute('width',landscape?'268.7mm':'190mm');svg.setAttribute('height',landscape?'190mm':'269mm');
  const url=URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(svg)],{type:'image/svg+xml;charset=utf-8'}));
  const link=document.createElement('a');link.href=url;link.download=landscape?'squish-personalizado.svg':'squish-'+saved.printable+'.svg';
  document.body.append(link);link.click();link.remove();
  setTimeout(()=>URL.revokeObjectURL(url),30000);
}
