// Local, offline play: no accounts, purchases, ads or remote score service.
const SQUISH_FRIENDS=[
  {id:'mochi',name:'Mochi',at:0,shape:'round',color:'#ff9fc6',eyes:'●|●',mouth:'◡',detail:'',story:'Um amigo macio para começar sua aventura.'},
  {id:'pingo',name:'Pingo',at:20,shape:'cloud',color:'#7cc8ff',eyes:'^|^',mouth:'ω',detail:'',story:'Uma nuvem que adora brincar de esconder.'},
  {id:'lumi',name:'Lumi',at:60,shape:'star',color:'#ffd66b',eyes:'✦|✦',mouth:'◡',detail:'sparkles',story:'Uma estrelinha que coleciona ideias brilhantes.'},
  {id:'flora',name:'Flora',at:120,shape:'heart',color:'#8ee7cf',eyes:'♡|♡',mouth:'ᴗ',detail:'flower',story:'Espalha flores e carinho por onde passa.'},
  {id:'berry',name:'Berry',at:200,shape:'butter',color:'#b69cff',eyes:'•|◡',mouth:'ω',detail:'strawberry',story:'Adora inventar receitas e fazer caretas.'},
  {id:'aurora',name:'Aurora',at:300,shape:'cloud',color:'#ffad7a',eyes:'♡|♡',mouth:'◡',detail:'bow',story:'Guarda todas as cores de um pôr do sol.'}
];
let gameState=saved.game&&typeof saved.game==='object'&&!Array.isArray(saved.game)?saved.game:{};
if(!SQUISH_FRIENDS.some(f=>f.id===gameState.selected&&earnedPoints>=f.at))gameState.selected='mochi';
if(!Number.isInteger(gameState.sparkles)||gameState.sparkles<0||gameState.sparkles>8)gameState.sparkles=0;
if(!Number.isInteger(gameState.rounds)||gameState.rounds<0)gameState.rounds=0;
if(!['stars','memory'].includes(gameState.mode))gameState.mode='stars';
let memoryBusy=false,memoryTimer;
const MEMORY_ICONS=['strawberry','donut','cloud','star'];
function shuffledDeck(){
  const deck=[...MEMORY_ICONS,...MEMORY_ICONS];
  for(let i=deck.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[deck[i],deck[j]]=[deck[j],deck[i]];}
  return deck;
}
function validMemory(value){
  return value&&Array.isArray(value.deck)&&value.deck.length===8&&MEMORY_ICONS.every(id=>value.deck.filter(x=>x===id).length===2)&&Array.isArray(value.matched)&&value.matched.every(id=>MEMORY_ICONS.includes(id))&&new Set(value.matched).size===value.matched.length;
}
if(!validMemory(gameState.memory))gameState.memory={deck:shuffledDeck(),matched:[],open:[],rewarded:false};
gameState.memory.open=[];
gameState.memory.rewarded=gameState.memory.matched.length===4;
saved.game=gameState;
function persistGame(){saved.game=gameState;saveState();}
function friendById(id){return SQUISH_FRIENDS.find(friend=>friend.id===id)||SQUISH_FRIENDS[0];}
function friendSVG(friend,back=false){
  const [left,right]=friend.eyes.split('|');
  return `<g${back?' transform="translate(500 0) scale(-1 1)"':''}><path d="${customShapePath(friend.shape)}" fill="${friend.color}" stroke="#7652a1" stroke-width="4"/><ellipse cx="206" cy="325" rx="17" ry="8" fill="#ff77b7" opacity=".4"/><ellipse cx="294" cy="325" rx="17" ry="8" fill="#ff77b7" opacity=".4"/><text x="222" y="300" text-anchor="middle" font-family="Arial" font-size="38" fill="#44394f">${left}</text><text x="278" y="300" text-anchor="middle" font-family="Arial" font-size="38" fill="#44394f">${right}</text><text x="250" y="349" text-anchor="middle" font-family="Arial" font-size="40" fill="#44394f">${friend.mouth}</text>${printIconSVG(friend.detail,325,205,47)}</g>`;
}
function friendPortrait(friend){return `<svg viewBox="35 65 440 440" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">${friendSVG(friend)}</svg>`;}
function renderCollection(){
  const count=SQUISH_FRIENDS.filter(friend=>earnedPoints>=friend.at).length;
  document.getElementById('collectionCount').textContent=count+' de 6 amigos na coleção';
  document.getElementById('homeCollectionCount').textContent=count+' de 6 amigos na coleção';
  const next=SQUISH_FRIENDS.find(friend=>earnedPoints<friend.at);
  document.getElementById('nextFriend').textContent=next?'Faltam '+(next.at-earnedPoints)+' pontos para conhecer '+next.name+'.':'Você encontrou todos os amigos! Agora invente novos Squishes.';
  const grid=document.getElementById('collectionGrid');grid.replaceChildren();
  for(const friend of SQUISH_FRIENDS){
    const unlocked=earnedPoints>=friend.at,card=document.createElement('button');
    card.className='friend-card'+(unlocked?'':' locked');
    card.innerHTML=friendPortrait(friend);
    const name=document.createElement('strong');name.textContent=friend.name;card.append(name);
    const caption=document.createElement('small');caption.textContent=unlocked?'Brincar, montar e imprimir':'Desbloqueia com '+friend.at+' pontos ganhos';card.append(caption);
    card.setAttribute('aria-disabled',String(!unlocked));
    card.addEventListener('click',()=>{
      if(!unlocked){notify('Faltam '+(friend.at-earnedPoints)+' pontos para conhecer '+friend.name+'.');return;}
      gameState.selected=friend.id;persistGame();renderFriend();show('friend');
    });
    grid.append(card);
  }
}
function renderFriend(){
  const friend=friendById(gameState.selected);
  document.getElementById('friendName').textContent=friend.name;
  document.getElementById('friendStory').textContent=friend.story;
  document.getElementById('friendArt').innerHTML=friendPortrait(friend);
  renderGame();
}
function selectGame(mode){gameState.mode=mode;persistGame();renderGame();}
function renderGame(){
  const friend=friendById(gameState.selected);
  document.getElementById('playFriendName').textContent=friend.name;
  document.getElementById('squeezeToy').innerHTML=friendPortrait(friend);
  document.getElementById('starsMode').hidden=gameState.mode!=='stars';
  document.getElementById('memoryMode').hidden=gameState.mode!=='memory';
  for(const mode of ['stars','memory'])document.getElementById(mode+'Tab').setAttribute('aria-pressed',String(mode===gameState.mode));
  const finished=gameState.sparkles===8;
  document.getElementById('sparkleCount').textContent=gameState.sparkles+' de 8 brilhos';
  document.getElementById('sparkleProgress').value=gameState.sparkles;
  document.getElementById('sparkleTarget').hidden=finished;
  document.getElementById('starsResult').hidden=!finished;
  const positions=[[12,17],[80,65],[73,9],[10,69],[44,5],[81,36],[43,76],[8,41]];
  const [x,y]=positions[gameState.sparkles%8];
  Object.assign(document.getElementById('sparkleTarget').style,{left:x+'%',top:y+'%'});
  renderMemory();
  localizePage();
}
function squeezeToy(){
  const toy=document.getElementById('squeezeToy');toy.classList.remove('squished');
  // Restart the tactile animation without timers affecting game state.
  void toy.offsetWidth;toy.classList.add('squished');
}
function awardPlay(amount){
  const before=earnedPoints;
  points+=amount;earnedPoints+=amount;gameState.rounds++;achievements++;
  persistGame();updateProfile();renderCollection();
  const unlocked=SQUISH_FRIENDS.filter(friend=>friend.at>before&&friend.at<=earnedPoints);
  document.getElementById('newFriendMessage').textContent=unlocked.length?'Novo amigo: '+unlocked.map(friend=>friend.name).join(', ')+'!':'Mais uma brincadeira para sua coleção!';
  notify(unlocked.length?'Novo amigo: '+unlocked.map(friend=>friend.name).join(', ')+'!':'Você ganhou '+amount+' pontos!');
}
function catchSparkle(){
  if(gameState.sparkles>=8)return;
  gameState.sparkles++;
  if(gameState.sparkles===8)awardPlay(20);else persistGame();
  renderGame();squeezeToy();
}
function newStarRound(){gameState.sparkles=0;document.getElementById('newFriendMessage').textContent='';persistGame();renderGame();document.getElementById('sparkleTarget').focus();}
function renderMemory(){
  const state=gameState.memory,grid=document.getElementById('memoryGrid');grid.replaceChildren();
  state.deck.forEach((icon,index)=>{
    const matched=state.matched.includes(icon),open=state.open.includes(index),card=document.createElement('button');
    card.className='memory-card'+(matched?' matched':open?' flipped':'');
    card.disabled=matched;card.setAttribute('aria-label',translateCopy('Carta '+(index+1)+(matched?' • par encontrado':open?' • '+memoryName(icon):' • virar')));
    card.setAttribute('aria-pressed',String(open||matched));
    card.innerHTML=open||matched?iconSVG(icon):'<span aria-hidden="true">?</span>';
    card.addEventListener('click',()=>flipMemory(index));grid.append(card);
  });
  document.getElementById('memoryCount').textContent=state.matched.length+' de 4 pares';
  document.getElementById('memoryResult').hidden=state.matched.length!==4;
}
function memoryName(icon){return {strawberry:'Morango',donut:'Donut fofo',cloud:'Nuvem',star:'Estrela'}[icon];}
function flipMemory(index){
  const state=gameState.memory;
  if(memoryBusy||!Number.isInteger(index)||index<0||index>=8||state.open.includes(index)||state.matched.includes(state.deck[index]))return;
  state.open.push(index);
  if(state.open.length===2){
    const [a,b]=state.open;
    if(state.deck[a]===state.deck[b]){
      state.matched.push(state.deck[a]);state.open=[];
      if(state.matched.length===4&&!state.rewarded){state.rewarded=true;awardPlay(30);}
    }else{
      memoryBusy=true;
      memoryTimer=setTimeout(()=>{state.open=[];memoryBusy=false;persistGame();renderMemory();localizePage();},850);
    }
  }
  persistGame();renderMemory();localizePage();
}
function newMemoryRound(){clearTimeout(memoryTimer);memoryBusy=false;document.getElementById('newFriendMessage').textContent='';gameState.memory={deck:shuffledDeck(),matched:[],open:[],rewarded:false};persistGame();renderMemory();localizePage();}
function customizeFriend(){
  const friend=friendById(gameState.selected);if(earnedPoints<friend.at)return;
  for(const key of Object.keys(customOptions))customSquish[key]=friend[key];
  saved.plusDemo=true;unlockPlus();show('plus');
}
function collectionPrintable(){
  const friend=friendById(gameState.selected);if(earnedPoints<friend.at)return;
  document.getElementById('collectionPrintTitle').textContent=friend.name;
  document.getElementById('collectionSheet').innerHTML=`<svg viewBox="0 0 1123 794" xmlns="http://www.w3.org/2000/svg"><rect width="1123" height="794" fill="white"/><text x="561" y="50" text-anchor="middle" font-family="Arial" font-size="24" fill="#44394f">${friend.name} • Squish Funny</text><text x="561" y="80" text-anchor="middle" font-family="Arial" font-size="14" fill="#44394f">Recorte as duas peças, una as bordas e deixe uma abertura para colocar enchimento</text><g transform="translate(15 30)">${friendSVG(friend)}</g><g transform="translate(570 30)">${friendSVG(friend,true)}</g><text x="561" y="740" text-anchor="middle" font-family="Arial" font-size="16" fill="#44394f">Um amigo do jogo para montar em casa!</text></svg>`;
  localizePage();show('collection-print');
}
function makeFriendAtHome(){const friend=friendById(gameState.selected);selectModel(friend.name,friend.detail||'sparkles','Fácil','20 min');show('tutorial');}
document.getElementById('starsTab').addEventListener('click',()=>selectGame('stars'));
document.getElementById('memoryTab').addEventListener('click',()=>selectGame('memory'));
document.getElementById('sparkleTarget').addEventListener('click',catchSparkle);
document.getElementById('squeezeToy').addEventListener('click',squeezeToy);
document.getElementById('languageSelect').addEventListener('change',()=>{renderMemory();localizePage();});
window.addEventListener('hashchange',()=>{
  if(location.hash==='#collection'||location.hash==='#home')renderCollection();
  if(location.hash==='#play')renderGame();
  if(location.hash==='#friend')renderFriend();
});
renderCollection();renderFriend();
if(location.hash==='#collection-print')collectionPrintable();
persistGame();localizePage();
