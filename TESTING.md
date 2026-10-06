# Validação — 5 de outubro de 2026

## Antes das alterações

O app publicado foi aberto e testado. Os links de idioma não chamavam a seleção de idioma; a interface permanecia em português. O Plus parecia anunciar uma compra real. A inspeção encontrou traduções parciais, regras conflitantes de impressão, medidas incompatíveis no molde de embalagem e fallback offline que podia devolver HTML para arquivos ausentes.

## Testes executados

- `node --test tests/regression.cjs`: 10 testes aprovados. Cobertura de traduções e parâmetros, armazenamento corrompido/bloqueado, pontos/inventário, persistência do criador, geometria dos 20 moldes, manifest/PNG/caminhos relativos, cache e isolamento por escopo, recompensas e desbloqueios, memória e proteção contra recompensa duplicada.
- Fluxos no navegador: seleção de modelos; tutorial em inglês/chinês; conclusão e perfil; compra virtual em espanhol; persistência após recarregar; Plus gratuito; cinco grupos de personalização; geração do molde e manutenção da criação.
- Jogos no navegador: rodada de oito brilhos concluída; quatro pares da memória encontrados, incluindo tentativas incorretas; 20/30 pontos creditados; Lumi desbloqueada; coleção e molde do personagem abertos.
- Modo offline: servidor local encerrado, conexão recusada confirmada fora do navegador, página recarregada com sucesso pelo service worker e jogos/progresso restaurados.
- Layout: inspeção visual e verificação de largura de 320 pixels sem rolagem lateral nas telas examinadas; cabeçalho e navegação ficam separados da área de rolagem.
- Ícones: dimensões reais dos PNG verificadas e arte maskable inspecionada. Mantidos os ícones existentes, que já eram válidos.
- Sintaxe JavaScript e `git diff --check` sem erros.

## Limites e próxima validação em aparelhos

A instalação na tela inicial em iPhone/Android físicos e a impressão em uma impressora real não foram executadas. O navegador integrado não confirmou o evento de download SVG, embora o comando não tenha produzido erro JavaScript; verificar o salvamento em Safari/Chrome reais. As medidas dos moldes e as regras de impressão foram revisadas no código, com visualização dos SVG no app.

Os testes de lógica usam DOM e cache simulados; complementam os fluxos executados no navegador, mas não substituem testes de instalação em aparelhos. O jogo é local: pontuações e desbloqueios são recreativos, sem valor financeiro ou validação em servidor.
