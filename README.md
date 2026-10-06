# Squish Funny

Um jogo de criar, brincar e colecionar Squishes, com atividades para montar no aplicativo ou fazer em casa.

**App:** https://protesedentaria.github.io/-squish-funny/

## Brincar e criar

- **Caça aos brilhos:** colete oito brilhos e aperte o personagem. Cada rodada completa vale 20 pontos, sem cronômetro ou penalidade por errar.
- **Memória fofinha:** encontre quatro pares para ganhar 30 pontos. As cartas são embaralhadas a cada nova rodada.
- **Coleção:** Mochi, Pingo, Lumi, Flora, Berry e Aurora são desbloqueados com 0, 20, 60, 120, 200 e 300 pontos acumulados. Gastar pontos na loja não bloqueia amigos já conquistados.
- **Do jogo para casa:** personalize um amigo no criador ou imprima seu molde com frente e verso espelhados. Os tutoriais originais e as 20 embalagens continuam disponíveis.
- **Desafios e progresso:** desafios rendem pontos uma vez por dia; cada projeto concluído rende 25 pontos. Use “Recomeçar tutorial” para iniciar outro projeto.
- **Loja:** os materiais são itens virtuais, trocados por pontos do jogo. Não são compras ou entregas de materiais físicos.

O progresso, idioma, inventário, partida e criação ficam no navegador. Não há conta ou sincronização entre aparelhos. Limpar os dados do site remove esse progresso. Quando o navegador bloqueia armazenamento, o app continua funcionando durante a sessão e mostra um aviso.

## Instalação e modo offline

Abra o app com internet pela primeira vez. Em **Perfil → Idioma e instalação**, espere a mensagem “Pronto para usar sem internet”. Depois, jogos, tutoriais, criador e moldes funcionam sem conexão.

- **iPhone/iPad:** Safari → Compartilhar → Adicionar à Tela de Início.
- **Android:** Chrome → Instalar app / Adicionar à tela inicial. O botão de instalação usa a opção nativa quando disponível.

O manifest usa caminhos relativos e identidade dentro do repositório. Os ícones PNG incluem 192 e 512 pixels, versão maskable e Apple Touch Icon. A orientação não é bloqueada. O cache guarda uma versão completa do app e é atualizado ao voltar à internet.

## Idiomas e impressão

Português, inglês, espanhol e chinês simplificado podem ser trocados no cabeçalho de qualquer tela. O catálogo central `i18n.js` inclui instruções, pontuação, avisos, acessibilidade e textos gerados. Nomes dos personagens e letras decorativas das embalagens são parte da identidade visual.

Imprima as embalagens em **A4 retrato** e os personagens/criações em **A4 paisagem**, escala **100%**, sem cabeçalhos ou rodapés. A página imprime apenas o molde aberto. O download SVG permite levar o desenho a outro aparelho. Use fita para unir as faces; crianças devem pedir ajuda a um adulto para recortar.

## Plus: somente demonstração

**R$ 5 é um preço ilustrativo.** “Experimentar Plus grátis” abre o criador sem cobrança, assinatura ou dados de pagamento. Não existe integração financeira. Qualquer implementação de pagamento real depende de consulta e autorização da proprietária.

## Desenvolvimento e publicação

Site estático, sem dependências de produção ou build. Sirva a pasta por HTTP local para testar o service worker; abrir o HTML por `file://` não testa a PWA.

```sh
node --test tests/regression.cjs
node scripts/version-cache.cjs
git diff --check
```

Execute `version-cache.cjs` após mudar arquivos do app, antes do commit. Ele atualiza a versão do cache a partir dos arquivos publicados. O repositório está configurado em **Settings → Pages → Deploy from a branch → main → /(root)**; o push em `main` publica o app. `.nojekyll` mantém os arquivos estáticos sem processamento adicional.

Arquivos principais: `index.html` (telas), `app.js` (criador/progresso/moldes), `game.js` (jogos/coleção), `i18n.js` (idiomas), `app.css` e `game.css` (layout/impressão), `pwa.js`, `manifest.webmanifest`, `sw.js` e os ícones na raiz.

Consulte `TESTING.md` para a validação e seus limites.
