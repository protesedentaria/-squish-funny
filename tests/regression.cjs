const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const read=name=>fs.readFileSync(path.join(root,name),'utf8');
function appContext(initial='{}',blocked=false){
  const elements=new Map(),values=new Map([['squishFunnyState',initial]]);
  const element=id=>{
    if(!elements.has(id)) elements.set(id,{id,textContent:'',innerHTML:'',style:{},dataset:{},classList:{add(){},remove(){},toggle(){},contains(){return true;}},setAttribute(){},getAttribute(){return '';},append(){},replaceChildren(){},insertAdjacentHTML(){},focus(){},addEventListener(){},querySelectorAll(){return []}});
    return elements.get(id);
  };
  const ctx=vm.createContext({console,NodeFilter:{SHOW_TEXT:4},setTimeout:()=>1,clearTimeout(){},location:{hash:'#home'},MutationObserver:class{observe(){}},window:{addEventListener(){}},localStorage:{getItem:key=>{if(blocked)throw Error('blocked');return values.get(key)},setItem:(key,value)=>{if(blocked)throw Error('blocked');values.set(key,value)}},document:{documentElement:{},getElementById:element,querySelector:()=>null,querySelectorAll:()=>[],createTreeWalker:()=>({nextNode:()=>null}),createElement:()=>element('new'),createTextNode:text=>text}});
  for(const file of ['ui-icons.js','i18n.js','app.js']) vm.runInContext(read(file),ctx,{filename:file});
  return {ctx,values,elements,run:code=>vm.runInContext(code,ctx)};
}
test('locale dictionary has all four columns and preserves template placeholders',()=>{
  const {run}=appContext();
  const rows=JSON.parse(run('JSON.stringify(COPY)'));
  for(const [key,row] of Object.entries(rows)) for(const lang of ['pt','en','es','zh']){
    assert.ok(row[lang],key+' / '+lang);
    assert.deepEqual([...row[lang].matchAll(/\{\w+\}/g)].map(m=>m[0]).sort(),[...key.matchAll(/\{\w+\}/g)].map(m=>m[0]).sort(),key);
  }
  for(const [lang,expected] of [['en','Need 15 more points'],['es','Faltan 15 puntos'],['zh','还需 15 积分'],['pt','Faltam 15 pontos']]){
    run('language='+JSON.stringify(lang));assert.equal(run("translateCopy('Faltam 15 pontos')"),expected);
  }
  run("language='zh'");assert.equal(run("translateCopy('Médio • 20 min')"),'中等 • 20 分钟');
  assert.equal(run("translateCopy('Papel branco adquirido! Está em Meus materiais no seu perfil.')"),'已获得白纸！可在个人资料的“我的材料”中查看。');
});
test('corrupt, null and blocked storage do not prevent startup',()=>{
  for(const initial of ['{bad','null','[]','{"points":-99,"language":"invalid"}']){
    const {run}=appContext(initial);assert.equal(run('points'),0);assert.equal(run('language'),'pt');
  }
  const {run,elements}=appContext('{}',true);run('completeSquish()');assert.equal(run('made'),1);assert.equal(run('points'),25);
  assert.ok(elements.get('toast').textContent);
});
test('progress and virtual purchases survive reload and cannot overspend',()=>{
  const app=appContext();app.run('completeSquish();buyMaterial("paper-white");buyMaterial("paper-white");buyMaterial("markers-rainbow")');
  assert.equal(app.run('points'),15);assert.equal(app.run('earnedPoints'),25);assert.equal(app.run('made'),1);
  assert.equal(app.run('inventory["paper-white"]'),true);assert.equal(app.run('inventory["markers-rainbow"]'),undefined);
  const restored=appContext(app.values.get('squishFunnyState'));assert.equal(restored.run('points'),15);assert.equal(restored.run('inventory["paper-white"]'),true);
});
test('creator persists validated choices and uses mirrored back geometry',()=>{
  const app=appContext();app.run("buyPlus();setCustom('shape','cloud');setCustom('color','#7cc8ff');setCustom('color','<script>')");
  assert.equal(app.run('customSquish.color'),'#7cc8ff');assert.equal(app.run('saved.plusDemo'),true);
  const restored=appContext(app.values.get('squishFunnyState'));assert.equal(restored.run('customSquish.shape'),'cloud');
  for(const shape of ['butter','heart','cloud','round','star']){
    app.run('setCustom("shape",'+JSON.stringify(shape)+')');
    assert.match(app.run('customPrintableSVG()'),/translate\(1075 0\) scale\(-1 1\)/);
    assert.match(app.elements.get('customPreview').innerHTML,/<svg viewBox=/);
  }
});
test('all existing print templates have complete rectangular box nets',()=>{
  const {run}=appContext();assert.equal(run('Object.keys(printableData).length'),20);
  const keys=JSON.parse(run('JSON.stringify(Object.keys(printableData))'));
  for(const key of keys){
    const svg=run('boxNetSVG(printableData['+JSON.stringify(key)+'])');
    // Four panels: 120/160/120/160; two 120x160 end faces.
    assert.match(svg,/M185 270 H305 V150 H594 V270 H714 V430 H594 V830 H305 V430 H185 Z/);
    assert.match(svg,/M305 270H594 M305 430H594 M305 550H594 M305 710H594/);
    assert.ok(!svg.includes('undefined'));
  }
});
test('manifest, icons and GitHub Pages relative asset paths are valid',()=>{
  const manifest=JSON.parse(read('manifest.webmanifest'));assert.equal(manifest.scope,'./');assert.equal(manifest.id,'./');assert.equal(manifest.start_url,'./index.html');
  for(const icon of manifest.icons){
    const png=fs.readFileSync(path.join(root,icon.src));assert.equal(png.subarray(1,4).toString(),'PNG');
    const [w,h]=icon.sizes.split('x').map(Number);assert.equal(png.readUInt32BE(16),w);assert.equal(png.readUInt32BE(20),h);
  }
  for(const [,src] of read('index.html').matchAll(/(?:src|href)="(\.\/[^"#]+)"/g)) assert.ok(fs.existsSync(path.join(root,src)),src);
  assert.ok(!/https?:\/\//.test(read('app.js').replaceAll('http://www.w3.org/2000/svg','')));
});
test('offline cache includes the complete app, isolates scope and never returns HTML for missing assets',async()=>{
  const handlers={},stores=new Map();const scope='https://example.test/-squish-funny/';
  const resolve=value=>new URL(typeof value==='string'?value:value.url,scope).href;
  const cache=()=>({items:new Map(),async addAll(paths){for(const p of paths){const file=p==='./'?'index.html':p;assert.ok(fs.existsSync(path.join(root,file)));this.items.set(resolve(p),{body:file});}},async match(p){return this.items.get(resolve(p))}});
  stores.set('unrelated-cache',cache());stores.set('squish-funny-/another-app/-old',cache());stores.set('squish-funny-v4',cache());
  const context=vm.createContext({URL,self:{registration:{scope},location:{origin:'https://example.test'},addEventListener:(name,fn)=>handlers[name]=fn,skipWaiting:async()=>{},clients:{claim:async()=>{}}},caches:{open:async key=>{if(!stores.has(key))stores.set(key,cache());return stores.get(key);},keys:async()=>[...stores.keys()],delete:async key=>stores.delete(key)},fetch:async()=>{throw Error('offline')}});
  vm.runInContext(read('sw.js'),context);
  let pending;handlers.install({waitUntil:p=>pending=p});await pending;handlers.activate({waitUntil:p=>pending=p});await pending;
  assert.ok(stores.has('unrelated-cache'));assert.ok(stores.has('squish-funny-/another-app/-old'));assert.ok(!stores.has('squish-funny-v4'));
  async function request(url,mode='cors'){let response;handlers.fetch({request:{url,mode,method:'GET'},respondWith:p=>response=p});return response?await response:undefined;}
  assert.equal((await request(scope+'index.html','navigate')).body,'./index.html');
  for(const file of ['app.js','game.js','game.css','i18n.js','pwa.js','app.css','ui-icons.js'])assert.equal((await request(scope+file)).body,'./'+file);
  assert.equal(await request(scope+'missing.js'),undefined);assert.equal(await request('https://another.test/file.js'),undefined);
});
function withGame(initial){const app=appContext(initial);vm.runInContext(read('game.js'),app.ctx,{filename:'game.js'});return app;}
test('sparkle rounds unlock friends, reward once and persist between sessions',()=>{
  const app=withGame();for(let i=0;i<8;i++)app.run('catchSparkle()');
  assert.equal(app.run('points'),20);assert.equal(app.run('SQUISH_FRIENDS.filter(f=>earnedPoints>=f.at).length'),2);
  app.run('catchSparkle()');assert.equal(app.run('points'),20);
  const restored=withGame(app.values.get('squishFunnyState'));restored.run('catchSparkle()');assert.equal(restored.run('points'),20);
  restored.run('newStarRound();catchSparkle()');assert.equal(restored.run('gameState.sparkles'),1);
  restored.run('buyMaterial("paper-white")');assert.equal(restored.run('points'),10);assert.equal(restored.run('SQUISH_FRIENDS.filter(f=>earnedPoints>=f.at).length'),2);
});
test('memory rewards only four matched pairs, once per shuffled round',()=>{
  const app=withGame();const deck=JSON.parse(app.run('JSON.stringify(gameState.memory.deck)'));
  app.run('flipMemory(0);flipMemory(0)');assert.equal(app.run('gameState.memory.open.length'),1);assert.equal(app.run('points'),0);
  for(const icon of new Set(deck)){const pair=deck.map((x,i)=>x===icon?i:-1).filter(i=>i>=0);app.run('flipMemory('+pair[0]+');flipMemory('+pair[1]+')');}
  assert.equal(app.run('gameState.memory.matched.length'),4);assert.equal(app.run('points'),30);app.run('flipMemory(0)');assert.equal(app.run('points'),30);
  const restored=withGame(app.values.get('squishFunnyState'));assert.equal(restored.run('gameState.memory.rewarded'),true);assert.equal(restored.run('points'),30);
  restored.run('newMemoryRound()');assert.equal(restored.run('gameState.memory.matched.length'),0);assert.equal(restored.run('gameState.memory.rewarded'),false);
});
test('daily challenges and a completed craft cannot award twice accidentally',()=>{
  const app=appContext();app.run('addPoints(20);addPoints(20);addPoints(999)');assert.equal(app.run('points'),20);
  app.run('completeSquish();completeSquish()');assert.equal(app.run('points'),45);assert.equal(app.run('made'),1);
  app.run('restartTutorial();completeSquish()');assert.equal(app.run('made'),2);
});
