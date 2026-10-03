# Squish Funny

Versão de teste instalável como PWA (Progressive Web App).

## Teste no celular

Depois de publicar este repositório em HTTPS (por exemplo, GitHub Pages):

- **iPhone/iPad:** abra a URL no Safari → Compartilhar → **Adicionar à Tela de Início**.
- **Android:** abra a URL no Chrome → **Instalar app** / **Adicionar à tela inicial**.

O aplicativo abre em modo standalone e possui cache básico para continuar abrindo após a primeira visita.

## Publicar com GitHub Pages

Este projeto já inclui `.github/workflows/pages.yml`. Após enviar ao GitHub, abra **Settings → Pages** e selecione **GitHub Actions** como fonte, se o repositório ainda não estiver configurado dessa forma. O workflow publica o conteúdo estático automaticamente a cada push na branch `main`.

## Arquivos

- `index.html` — aplicativo Squish Funny
- `manifest.webmanifest` — configuração de instalação
- `sw.js` — service worker/cache
- `icons/` — ícones do app
- `.github/workflows/pages.yml` — publicação no GitHub Pages

## Importante sobre o Plus

A compra de R$ 5,00 ainda é uma **simulação de protótipo**. Para receber pagamentos reais, será necessário integrar um meio de pagamento e, se o app for distribuído por App Store/Google Play, avaliar as regras de compra dentro do aplicativo dessas lojas.
