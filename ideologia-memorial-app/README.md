# Ideologia — Memorial do Rap

Base inicial independente em React + Vite.

## Como executar no computador
1. Instale o Node.js (versão LTS): https://nodejs.org/
2. Extraia este ZIP.
3. Abra a pasta no terminal e execute:
   - `npm install`
   - `npm run dev`
4. Abra o endereço local indicado pelo Vite.

## Publicar na Vercel
1. Envie esta pasta para um repositório GitHub.
2. Entre em https://vercel.com/new
3. Importe o repositório.
4. A Vercel detecta Vite automaticamente; use `npm run build` e `dist` se pedir configuração.

## O que já está implementado
- Dois álbuns com 13 posições de faixa cada.
- 52 posições de figurinhas.
- Regra: cada 2 figurinhas conquistadas liberam 1 música, sem depender da história.
- Seis capítulos independentes da coleção.
- Progresso local salvo no navegador.

## IMPORTANTE — ainda precisa inserir o conteúdo verdadeiro
Os nomes, dicas e palavras-chave das 52 figurinhas, os textos definitivos dos seis capítulos, títulos e arquivos de áudio das 26 faixas ainda estão como marcadores de posição. Não publique como versão final antes de substituir esses dados.
O progresso desta primeira versão fica salvo apenas no navegador. Para login real, coleção sincronizada entre aparelhos, administração segura e distribuição de pacotes, será necessário conectar um backend (por exemplo Supabase) e implementar regras de segurança no servidor.
