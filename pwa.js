(()=>{
  let prompt=null;
  const button=document.getElementById('installBtn'),help=document.getElementById('installHelp'),card=document.getElementById('installCard');
  const status=document.createElement('p');status.id='offlineStatus';status.setAttribute('role','status');card.after(status);
  if(matchMedia('(display-mode: standalone)').matches||navigator.standalone===true)card.hidden=true;
  window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();prompt=event;});
  window.addEventListener('appinstalled',()=>{card.hidden=true;prompt=null;});
  button.addEventListener('click',async()=>{
    if(prompt){const current=prompt;prompt=null;await current.prompt();await current.userChoice;return;}
    const ios=/iPhone|iPad|iPod/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
    help.style.display='block';
    help.textContent=ios?'No iPhone/iPad: abra no Safari → Compartilhar → Adicionar à Tela de Início.':'No Android: abra o menu do navegador → Instalar app ou Adicionar à tela inicial. No computador, procure o ícone de instalação na barra de endereço.';
    localizePage();
  });
  let ready=false;
  function updateStatus(){status.textContent=!navigator.onLine?'Sem internet. Usando a versão salva.':ready?'Pronto para usar sem internet.':'';localizePage();}
  window.addEventListener('online',updateStatus);window.addEventListener('offline',updateStatus);
  if('serviceWorker' in navigator){
    let controlled=!!navigator.serviceWorker.controller;
    navigator.serviceWorker.addEventListener('controllerchange',()=>{if(controlled) location.reload();controlled=true;});
    navigator.serviceWorker.register('./sw.js',{scope:'./',updateViaCache:'none'}).then(()=>navigator.serviceWorker.ready).then(()=>{ready=true;updateStatus();}).catch(()=>{status.textContent='Não foi possível preparar o modo offline. Tente novamente com internet.';localizePage();});
  }
  updateStatus();
})();
