# MTG Explorer

Aplicação SvelteKit para explorar cartas de Magic: The Gathering consumindo a API pública.

## Stack
- SvelteKit + Vite
- TypeScript estrito
- Pequeno cliente MTG em `$lib/api/mtg.ts`

## API Magic: The Gathering
Base usada: `https://api.magicthegathering.io/v1` (pode ser sobrescrita via env `PUBLIC_MTG_API_BASE`).

### Cliente
Funções principais:
```ts
import { getCards, getCard, getSets } from '$lib/api/mtg';
```

`getCards(fetch, { page, pageSize, name, set, type })` retorna lista filtrada. Cache simples em memória (TTL 60s) por URL.

### Exemplo em rota (`src/routes/cards/+page.ts`)
```ts
const cards = await getCards(fetch, { page: 1, pageSize: 20, name: 'Lotus' });
```

### Tipos
Definidos em `$lib/api/types.ts` para `Card` e `Set`.

## Rodando

## Creating a project

Se você está vendo isto, já criou o projeto base.

```sh
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Instale dependências e suba o servidor de desenvolvimento:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

Preview da build de produção: `npm run preview`.

## Próximos passos
- Adicionar paginação mais precisa lendo header `Link`
- Incluir filtros avançados (cores, raridade)
- Cache persistente (IndexedDB ou localStorage) opcional
- Componentização de card (exibir atributos completos)

## Referências
- https://docs.magicthegathering.io/
- https://svelte.dev/docs/kit

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
